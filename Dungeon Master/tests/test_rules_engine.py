from edens_dm.rules.dice import DeterministicRng
from edens_dm.rules.engine import RuleEngine
from edens_dm.rules.types import ActorSnapshot, GameState, RuleIntent


def build_state() -> GameState:
    return GameState(
        scene_id="scene-1",
        actors={
            "fighter-1": ActorSnapshot(
                actor_id="fighter-1",
                name="Avfor",
                kind="pc",
                level=3,
                class_name="fighter",
                ac=5,
                thac0=19,
                hp=18,
                max_hp=18,
                morale=9,
                abilities={"str": 16, "dex": 12, "con": 14, "int": 8, "wis": 9, "cha": 10},
                weapon_mastery={"battleaxe": "Skilled"},
                level_thresholds={1: 0, 2: 2000, 3: 4000, 4: 8000, 5: 16000},
            ),
            "orc-1": ActorSnapshot(
                actor_id="orc-1",
                name="Ork 1",
                kind="monster",
                level=1,
                class_name="monster",
                ac=6,
                thac0=19,
                hp=8,
                max_hp=8,
                morale=8,
                save_as="F1",
                abilities={"str": 12, "dex": 8, "con": 10, "int": 8, "wis": 7, "cha": 6},
            ),
        },
    )


def test_attack_applies_deterministic_damage():
    state = build_state()
    engine = RuleEngine(rng=DeterministicRng(scripted_rolls=[15, 6]))
    result = engine.apply(
        RuleIntent(kind="attack", actor_id="fighter-1", target_id="orc-1", params={"weapon_name": "battleaxe", "weapon_damage": "1d8"}),
        state,
    )
    assert result.applied is True
    assert result.state_diff["actors"]["orc-1"]["hp"] == 2
    assert result.summary == "Avfor rammer Ork 1 for 6 skade."


def test_morale_check_fails_when_roll_exceeds_score():
    state = build_state()
    engine = RuleEngine(rng=DeterministicRng(scripted_rolls=[5, 4]))
    result = engine.apply(RuleIntent(kind="morale_check", target_id="orc-1"), state)
    assert result.applied is True
    assert result.summary == "Morale fejlet for Ork 1."


def test_saving_throw_uses_save_as_table():
    state = build_state()
    engine = RuleEngine(rng=DeterministicRng(scripted_rolls=[12]))
    result = engine.apply(RuleIntent(kind="saving_throw", actor_id="orc-1", params={"category": "spell"}), state)
    assert result.summary == "Save vs spell: fejlet."


def test_xp_award_caps_to_one_level_gain():
    state = build_state()
    state.actors["fighter-1"].xp = 7900
    engine = RuleEngine()
    result = engine.apply(RuleIntent(kind="award_xp", actor_id="fighter-1", params={"amount": 10000}), state)
    assert result.state_diff["actors"]["fighter-1"]["level"] == 4
    assert result.state_diff["actors"]["fighter-1"]["xp"] == 15999


def test_encumbrance_sets_movement_penalty():
    state = build_state()
    engine = RuleEngine()
    result = engine.apply(RuleIntent(kind="encumbrance_check", actor_id="fighter-1", params={"encumbrance_cn": 1100}), state)
    assert result.state_diff["actors"]["fighter-1"]["movement_rate"] == 60

