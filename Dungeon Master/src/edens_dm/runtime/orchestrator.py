from __future__ import annotations

import asyncio
import multiprocessing as mp
from dataclasses import dataclass

from edens_dm.providers.base import NarrationRequest
from edens_dm.providers.llm.mock import TemplateChroniclerProvider
from edens_dm.rules.engine import RuleEngine
from edens_dm.rules.types import GameState, RuleIntent
from edens_dm.runtime.messages import NarrationEnvelope, ShutdownEnvelope, TranscriptEnvelope


@dataclass
class RuntimeBundle:
    voice_to_game: mp.Queue
    game_to_voice: mp.Queue
    game_to_memory: mp.Queue
    processes: list[mp.Process]


def _infer_intent_from_text(text: str) -> RuleIntent | None:
    lowered = text.lower()
    if "angriber" in lowered or "attack" in lowered:
        return RuleIntent(kind="attack", actor_id="fighter-1", target_id="orc-1", params={"weapon_name": "battleaxe", "weapon_damage": "1d8"})
    if "morale" in lowered:
        return RuleIntent(kind="morale_check", target_id="orc-1")
    return None


def game_runtime_main(inbound: mp.Queue, outbound: mp.Queue) -> None:
    engine = RuleEngine()
    chronicler = TemplateChroniclerProvider()
    state = GameState(scene_id="scene-1")
    while True:
        message = inbound.get()
        kind = message.get("kind")
        if kind == "shutdown":
            break
        if kind != "transcript":
            continue
        envelope = TranscriptEnvelope.model_validate(message)
        if not envelope.is_final:
            continue
        intent = _infer_intent_from_text(envelope.text)
        if intent is None:
            outbound.put(NarrationEnvelope(text="<voice:dm_narrator> Hvad gør du helt præcist?").model_dump())
            continue
        result = engine.apply(intent, state)
        narration = asyncio.run(
            chronicler.narrate(
                NarrationRequest(
                    state_summary=result.summary or "Situationen ændrer sig.",
                    narration_hints=result.narration_hints,
                    follow_up_question=result.follow_up_question,
                )
            )
        )
        outbound.put(NarrationEnvelope(text=narration.text, voice_tag=narration.voice_tag).model_dump())


def memory_worker_main(inbound: mp.Queue) -> None:
    while True:
        message = inbound.get()
        if message.get("kind") == "shutdown":
            break


class RuntimeOrchestrator:
    def __init__(self) -> None:
        self.ctx = mp.get_context("spawn")

    def build(self) -> RuntimeBundle:
        voice_to_game = self.ctx.Queue()
        game_to_voice = self.ctx.Queue()
        game_to_memory = self.ctx.Queue()
        processes = [
            self.ctx.Process(target=game_runtime_main, args=(voice_to_game, game_to_voice), name="game_runtime"),
            self.ctx.Process(target=memory_worker_main, args=(game_to_memory,), name="memory_worker"),
        ]
        return RuntimeBundle(
            voice_to_game=voice_to_game,
            game_to_voice=game_to_voice,
            game_to_memory=game_to_memory,
            processes=processes,
        )

    def shutdown(self, bundle: RuntimeBundle) -> None:
        for queue in (bundle.voice_to_game, bundle.game_to_memory):
            queue.put(ShutdownEnvelope().model_dump())
        for process in bundle.processes:
            if process.is_alive():
                process.join(timeout=2)
