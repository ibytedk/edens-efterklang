from edens_dm.ledger.store import EventLedger
from edens_dm.rules.dice import DeterministicRng
from edens_dm.rules.engine import RuleEngine
from edens_dm.rules.types import ActorSnapshot, GameState, RuleIntent


def test_event_ledger_replays_state_diff():
    initial = GameState(
        scene_id="scene-1",
        actors={
            "fighter-1": ActorSnapshot(actor_id="fighter-1", name="Avfor", ac=5, hp=18, max_hp=18, class_name="fighter", level=3, weapon_mastery={"battleaxe": "Skilled"}),
            "orc-1": ActorSnapshot(actor_id="orc-1", name="Ork 1", ac=6, hp=8, max_hp=8, class_name="monster", level=1),
        },
    )
    engine = RuleEngine(rng=DeterministicRng(scripted_rolls=[15, 6]))
    result = engine.apply(
        RuleIntent(kind="attack", actor_id="fighter-1", target_id="orc-1", params={"weapon_name": "battleaxe", "weapon_damage": "1d8"}),
        initial,
    )
    ledger = EventLedger()
    ledger.record_rule_result(result)
    replayed = ledger.project_state(initial)
    assert replayed.actors["orc-1"].hp == 2

