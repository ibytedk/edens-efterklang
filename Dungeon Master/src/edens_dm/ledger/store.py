from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

from edens_dm.ledger.models import Base
from edens_dm.rules.engine import apply_state_diff_to_dump
from edens_dm.rules.types import GameState, RuleApplicationResult


def build_engine(url: str) -> Engine:
    return create_engine(url, future=True)


def create_database(url: str) -> Engine:
    engine = build_engine(url)
    with engine.begin() as connection:
        if engine.dialect.name == "postgresql":
            connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        Base.metadata.create_all(connection)
    return engine


@dataclass
class StoredEvent:
    kind: str
    payload: dict[str, Any]


@dataclass
class EventLedger:
    events: list[StoredEvent] = field(default_factory=list)

    def record_rule_result(self, result: RuleApplicationResult) -> None:
        for roll in result.rolls:
            self.events.append(
                StoredEvent(
                    kind="roll",
                    payload={
                        "label": roll.label,
                        "expression": roll.expression,
                        "total": roll.total,
                        "rolls": roll.rolls,
                    },
                )
            )
        if result.state_diff:
            self.events.append(StoredEvent(kind="state_diff", payload=result.state_diff))
        if result.summary:
            self.events.append(
                StoredEvent(kind="narration", payload={"summary": result.summary, "hints": result.narration_hints})
            )

    def project_state(self, initial_state: GameState) -> GameState:
        payload = initial_state.model_dump(mode="python")
        for event in self.events:
            if event.kind == "state_diff":
                payload = apply_state_diff_to_dump(payload, event.payload)
        return GameState.model_validate(payload)

