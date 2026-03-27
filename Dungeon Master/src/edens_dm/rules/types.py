from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


class RuleRoll(BaseModel):
    label: str
    expression: str
    total: int
    rolls: list[int] = Field(default_factory=list)


class ActorSnapshot(BaseModel):
    model_config = ConfigDict(extra="ignore")

    actor_id: str
    name: str
    kind: Literal["pc", "npc", "monster", "environment"] = "pc"
    level: int = 1
    class_name: str = "fighter"
    ac: int = 9
    thac0: int | None = None
    hp: int = 1
    max_hp: int = 1
    morale: int | None = None
    save_as: str | None = None
    saves: dict[str, int] = Field(default_factory=dict)
    abilities: dict[str, int] = Field(default_factory=dict)
    weapon_mastery: dict[str, str] = Field(default_factory=dict)
    encumbrance_cn: int = 0
    movement_rate: int | None = None
    xp: int = 0
    level_thresholds: dict[int, int] = Field(default_factory=dict)
    inventory: list[str] = Field(default_factory=list)
    effects: list[str] = Field(default_factory=list)


class GameState(BaseModel):
    model_config = ConfigDict(extra="ignore")

    scene_id: str
    actors: dict[str, ActorSnapshot] = Field(default_factory=dict)
    initiative_order: list[str] = Field(default_factory=list)
    round_number: int = 0
    notes: list[str] = Field(default_factory=list)


class RuleIntent(BaseModel):
    model_config = ConfigDict(extra="ignore")

    kind: str
    actor_id: str | None = None
    target_id: str | None = None
    params: dict[str, Any] = Field(default_factory=dict)


class RuleApplicationResult(BaseModel):
    model_config = ConfigDict(extra="ignore")

    intent: RuleIntent
    applied: bool
    validation: list[str] = Field(default_factory=list)
    rolls: list[RuleRoll] = Field(default_factory=list)
    state_diff: dict[str, Any] = Field(default_factory=dict)
    follow_up_question: str | None = None
    narration_hints: list[str] = Field(default_factory=list)
    summary: str | None = None

