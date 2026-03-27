from __future__ import annotations

from copy import deepcopy
from typing import Any

from edens_dm.rules.becmi_tables import (
    WEAPON_MASTERY_ATTACK_BONUS,
    lookup_thac0,
    parse_save_as,
    resolve_saving_throw_target,
)
from edens_dm.rules.dice import DeterministicRng
from edens_dm.rules.types import ActorSnapshot, GameState, RuleApplicationResult, RuleIntent


class RuleEngine:
    def __init__(self, rng: DeterministicRng | None = None) -> None:
        self.rng = rng or DeterministicRng()

    def apply(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        handlers = {
            "attack": self._handle_attack,
            "initiative_roll": self._handle_initiative,
            "morale_check": self._handle_morale,
            "reaction_roll": self._handle_reaction,
            "saving_throw": self._handle_saving_throw,
            "ability_check": self._handle_ability_check,
            "encumbrance_check": self._handle_encumbrance,
            "award_xp": self._handle_award_xp,
            "rest": self._handle_rest,
        }
        if intent.kind not in handlers:
            return RuleApplicationResult(
                intent=intent,
                applied=False,
                validation=[f"Ukendt intent-type: {intent.kind}"],
                follow_up_question="Hvilken regelprocedure skal anvendes?",
            )
        return handlers[intent.kind](intent, state)

    def _actor(self, state: GameState, actor_id: str | None) -> ActorSnapshot | None:
        if actor_id is None:
            return None
        return state.actors.get(actor_id)

    def _handle_attack(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        actor = self._actor(state, intent.actor_id)
        target = self._actor(state, intent.target_id)
        validation: list[str] = []
        if actor is None or target is None:
            return RuleApplicationResult(
                intent=intent,
                applied=False,
                validation=["Angreb kræver gyldig angriber og mål."],
                follow_up_question="Hvem angriber hvem?",
            )
        weapon_name = str(intent.params.get("weapon_name", "weapon"))
        if actor.inventory and weapon_name not in actor.inventory and weapon_name not in actor.weapon_mastery:
            validation.append(f"{actor.name} har ikke eksplicit {weapon_name} i inventory; fortsætter som ruling.")
        mastery = actor.weapon_mastery.get(weapon_name, "Basic")
        mastery_bonus = WEAPON_MASTERY_ATTACK_BONUS.get(mastery, 0)
        thac0 = actor.thac0 if actor.thac0 is not None else lookup_thac0(actor.class_name, actor.level)
        needed = thac0 - target.ac - mastery_bonus
        attack_roll = self.rng.roll(1, 20, "Attack roll")
        hit = attack_roll.total == 20 or (attack_roll.total != 1 and attack_roll.total >= needed)
        result = RuleApplicationResult(
            intent=intent,
            applied=True,
            validation=validation,
            rolls=[attack_roll],
            narration_hints=[
                f"{actor.name} angriber {target.name} med {weapon_name}.",
                f"THAC0 {thac0}, mål AC {target.ac}, mastery {mastery}.",
            ],
        )
        if not hit:
            result.summary = f"{actor.name} misser {target.name}."
            result.narration_hints.append(f"Angrebet misser; der skulle bruges {needed}+ på 1d20.")
            return result
        damage_expr = str(intent.params.get("weapon_damage", "1d6"))
        damage_bonus = int(intent.params.get("damage_bonus", 0))
        damage_roll = self.rng.roll_expression(damage_expr, "Damage roll")
        total_damage = damage_roll.total + damage_bonus
        result.rolls.append(damage_roll)
        new_hp = target.hp - total_damage
        result.state_diff = {"actors": {target.actor_id: {"hp": new_hp}}}
        result.summary = f"{actor.name} rammer {target.name} for {total_damage} skade."
        result.narration_hints.append(f"Skade {total_damage}; {target.name} går fra {target.hp} til {new_hp} HP.")
        if new_hp <= 0:
            result.narration_hints.append(f"{target.name} falder.")
        return result

    def _handle_initiative(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        player_roll = self.rng.roll(1, 6, "Party initiative")
        monster_roll = self.rng.roll(1, 6, "Opposition initiative")
        party_first = player_roll.total >= monster_roll.total
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            rolls=[player_roll, monster_roll],
            state_diff={
                "initiative_order": intent.params.get("player_side", []) + intent.params.get("monster_side", [])
                if party_first
                else intent.params.get("monster_side", []) + intent.params.get("player_side", []),
                "round_number": state.round_number + 1,
            },
            narration_hints=[f"Initiative: {'spillere' if party_first else 'modstandere'} handler først."],
            summary=f"Initiative {'vundet' if party_first else 'tabt'} af spiller-siden.",
        )

    def _handle_morale(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        subject = self._actor(state, intent.target_id or intent.actor_id)
        if subject is None or subject.morale is None:
            return RuleApplicationResult(
                intent=intent,
                applied=False,
                validation=["Morale check kræver et mål med morale-score."],
            )
        roll = self.rng.roll(2, 6, "Morale")
        holds = roll.total <= subject.morale
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            rolls=[roll],
            state_diff={"actors": {subject.actor_id: {"effects": [f"morale:{'holds' if holds else 'retreats'}"]}}},
            narration_hints=[f"{subject.name} {'holder stand' if holds else 'bryder og flygter'}."],
            summary=f"Morale {'bestået' if holds else 'fejlet'} for {subject.name}.",
        )

    def _handle_reaction(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        actor = self._actor(state, intent.actor_id)
        cha = (actor.abilities.get("cha", 9) if actor else 9) if actor else 9
        cha_mod = self._ability_modifier(cha)
        roll = self.rng.roll(2, 6, "Reaction")
        total = roll.total + cha_mod
        if total <= 5:
            outcome = "fjendtlig"
        elif total <= 8:
            outcome = "usikker"
        else:
            outcome = "venlig"
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            rolls=[roll],
            state_diff={"notes": [f"reaction:{outcome}"]},
            narration_hints=[f"Reaktionsrul giver {outcome} holdning."],
            summary=f"Reaktionsrul: {outcome} ({total}).",
        )

    def _handle_saving_throw(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        actor = self._actor(state, intent.actor_id)
        if actor is None:
            return RuleApplicationResult(intent=intent, applied=False, validation=["Saving throw kræver actor_id."])
        category = str(intent.params.get("category", "spell"))
        parsed_save_as = parse_save_as(actor.save_as)
        class_name = parsed_save_as[0] if parsed_save_as else actor.class_name
        level = parsed_save_as[1] if parsed_save_as else actor.level
        target = resolve_saving_throw_target(class_name, level, category, actor.saves)
        roll = self.rng.roll(1, 20, f"Save vs {category}")
        success = roll.total >= target
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            rolls=[roll],
            state_diff={"notes": [f"save:{category}:{'success' if success else 'failure'}"]},
            narration_hints=[f"{actor.name} {'består' if success else 'fejler'} save vs {category} ({target}+)."],
            summary=f"Save vs {category}: {'bestået' if success else 'fejlet'}.",
        )

    def _handle_ability_check(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        actor = self._actor(state, intent.actor_id)
        if actor is None:
            return RuleApplicationResult(intent=intent, applied=False, validation=["Ability check kræver actor_id."])
        ability = str(intent.params.get("ability", "str")).lower()
        difficulty = int(intent.params.get("difficulty_modifier", 0))
        score = actor.abilities.get(ability)
        if score is None:
            return RuleApplicationResult(
                intent=intent,
                applied=False,
                validation=[f"{actor.name} mangler ability score for {ability}."],
            )
        roll = self.rng.roll(1, 20, f"{ability.upper()} check")
        target = max(1, min(20, score + difficulty))
        success = roll.total <= target
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            rolls=[roll],
            state_diff={"notes": [f"ability:{ability}:{'success' if success else 'failure'}"]},
            narration_hints=[f"{actor.name} {'klarer' if success else 'fejler'} {ability.upper()}-check mod {target}."],
            summary=f"{ability.upper()}-check {'bestået' if success else 'fejlet'}.",
        )

    def _handle_encumbrance(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        actor = self._actor(state, intent.actor_id)
        if actor is None:
            return RuleApplicationResult(intent=intent, applied=False, validation=["Encumbrance check kræver actor_id."])
        total_cn = int(intent.params.get("encumbrance_cn", actor.encumbrance_cn))
        if total_cn <= 400:
            tier, movement = "light", 120
        elif total_cn <= 800:
            tier, movement = "moderate", 90
        elif total_cn <= 1200:
            tier, movement = "heavy", 60
        elif total_cn <= 1600:
            tier, movement = "severe", 30
        else:
            tier, movement = "immobile", 0
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            state_diff={"actors": {actor.actor_id: {"encumbrance_cn": total_cn, "movement_rate": movement}}},
            narration_hints=[f"{actor.name} er i encumbrance tier '{tier}' med movement {movement}'."],
            summary=f"Encumbrance: {tier}.",
        )

    def _handle_award_xp(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        actor = self._actor(state, intent.actor_id)
        if actor is None:
            return RuleApplicationResult(intent=intent, applied=False, validation=["XP-award kræver actor_id."])
        amount = int(intent.params.get("amount", 0))
        new_xp = actor.xp + amount
        new_level = actor.level
        capped = False
        thresholds = actor.level_thresholds
        next_level_threshold = thresholds.get(actor.level + 1)
        if next_level_threshold is not None and new_xp >= next_level_threshold:
            new_level = actor.level + 1
            cap_threshold = thresholds.get(actor.level + 2)
            if cap_threshold is not None and new_xp >= cap_threshold:
                new_xp = cap_threshold - 1
                capped = True
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            state_diff={"actors": {actor.actor_id: {"xp": new_xp, "level": new_level}}},
            narration_hints=[f"{actor.name} modtager {amount} XP.", "Et eventyr kan højst give ét level-up ad gangen."],
            summary=f"{actor.name} er nu level {new_level} med {new_xp} XP{', capped' if capped else ''}.",
        )

    def _handle_rest(self, intent: RuleIntent, state: GameState) -> RuleApplicationResult:
        actor = self._actor(state, intent.actor_id)
        if actor is None:
            return RuleApplicationResult(intent=intent, applied=False, validation=["Rest kræver actor_id."])
        hours = int(intent.params.get("hours", 8))
        if hours < 6:
            return RuleApplicationResult(
                intent=intent,
                applied=False,
                validation=["Hvile under 6 timer giver ingen standardrecovery."],
            )
        recovery_roll = self.rng.roll_expression(str(intent.params.get("recovery", "1d3")), "Recovery")
        new_hp = min(actor.max_hp, actor.hp + recovery_roll.total)
        return RuleApplicationResult(
            intent=intent,
            applied=True,
            rolls=[recovery_roll],
            state_diff={"actors": {actor.actor_id: {"hp": new_hp}}},
            narration_hints=[f"{actor.name} hviler {hours} timer og går til {new_hp}/{actor.max_hp} HP."],
            summary=f"{actor.name} restituerer {recovery_roll.total} HP.",
        )

    @staticmethod
    def _ability_modifier(score: int) -> int:
        if score <= 3:
            return -3
        if score <= 5:
            return -2
        if score <= 8:
            return -1
        if score <= 12:
            return 0
        if score <= 15:
            return 1
        if score <= 17:
            return 2
        return 3


def apply_state_diff_to_dump(payload: dict[str, Any], diff: dict[str, Any]) -> dict[str, Any]:
    updated = deepcopy(payload)
    for key, value in diff.items():
        if isinstance(value, dict) and isinstance(updated.get(key), dict):
            updated[key] = apply_state_diff_to_dump(updated[key], value)
        else:
            updated[key] = value
    return updated
