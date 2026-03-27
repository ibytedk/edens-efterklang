from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class TranscriptEnvelope(BaseModel):
    kind: Literal["transcript"] = "transcript"
    speaker_id: str
    text: str
    is_final: bool = False


class NarrationEnvelope(BaseModel):
    kind: Literal["narration"] = "narration"
    voice_tag: str = "dm_narrator"
    text: str


class MemoryEnvelope(BaseModel):
    kind: Literal["memory"] = "memory"
    query: str
    scope: dict[str, str | int] = Field(default_factory=dict)


class ShutdownEnvelope(BaseModel):
    kind: Literal["shutdown"] = "shutdown"

