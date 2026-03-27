from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, AsyncIterator

from pydantic import BaseModel, ConfigDict, Field


class ProviderError(RuntimeError):
    pass


class ProviderNotConfiguredError(ProviderError):
    pass


class ProviderDependencyError(ProviderError):
    pass


class TranscriptChunk(BaseModel):
    model_config = ConfigDict(extra="ignore")

    speaker_id: str
    text: str
    is_final: bool
    start_ms: int = 0
    end_ms: int = 0
    confidence: float | None = None
    language: str | None = None
    raw: dict[str, Any] = Field(default_factory=dict)


class AudioChunk(BaseModel):
    model_config = ConfigDict(extra="ignore")

    voice_id: str
    payload: bytes
    offset_ms: int
    format: str = "pcm_22050"
    final: bool = False


class NarrationRequest(BaseModel):
    state_summary: str
    narration_hints: list[str] = Field(default_factory=list)
    voice_tag: str = "dm_narrator"
    follow_up_question: str | None = None


class NarrationResponse(BaseModel):
    text: str
    voice_tag: str = "dm_narrator"
    raw: dict[str, Any] = Field(default_factory=dict)


class SttProvider(ABC):
    @abstractmethod
    async def transcribe_stream(self, audio_stream: AsyncIterator[bytes], speaker_id: str) -> AsyncIterator[TranscriptChunk]:
        raise NotImplementedError


class TtsProvider(ABC):
    @abstractmethod
    async def synthesize_stream(self, text: str, voice_id: str) -> AsyncIterator[AudioChunk]:
        raise NotImplementedError


class LlmProvider(ABC):
    @abstractmethod
    async def narrate(self, request: NarrationRequest) -> NarrationResponse:
        raise NotImplementedError

