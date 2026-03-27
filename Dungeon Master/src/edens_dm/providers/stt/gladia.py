from __future__ import annotations

from typing import Any, AsyncIterator

from edens_dm.providers.base import ProviderNotConfiguredError, SttProvider, TranscriptChunk


class GladiaLiveSttProvider(SttProvider):
    """Minimal Gladia-adapter med parsing af live websocket events."""

    def __init__(self, api_key: str | None, base_url: str = "https://api.gladia.io/v2") -> None:
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")

    @property
    def websocket_url(self) -> str:
        return f"{self.base_url}/live"

    def build_session_payload(self) -> dict[str, Any]:
        return {
            "encoding": "wav/pcm",
            "sample_rate": 16000,
            "bit_depth": 16,
            "channels": 1,
            "language_config": {"languages": ["da", "en"], "code_switching": True},
            "messages_config": {"receive_partial_transcripts": True},
            "diarization": True,
        }

    def parse_message(self, payload: dict[str, Any], fallback_speaker_id: str) -> TranscriptChunk | None:
        if payload.get("type") != "transcript":
            return None
        data = payload.get("data", {})
        utterance = data.get("utterance", {})
        speaker = utterance.get("speaker")
        speaker_id = fallback_speaker_id if speaker is None else f"speaker-{speaker}"
        return TranscriptChunk(
            speaker_id=speaker_id,
            text=utterance.get("text", ""),
            is_final=bool(data.get("is_final")),
            start_ms=int(float(utterance.get("start", 0)) * 1000),
            end_ms=int(float(utterance.get("end", 0)) * 1000),
            confidence=utterance.get("confidence"),
            language=utterance.get("language"),
            raw=payload,
        )

    async def transcribe_stream(self, audio_stream: AsyncIterator[bytes], speaker_id: str) -> AsyncIterator[TranscriptChunk]:
        if not self.api_key:
            raise ProviderNotConfiguredError("Gladia API key mangler.")
        async for _chunk in audio_stream:
            # Live websocket transporten ejes af voice_gateway-processen.
            break
        if False:
            yield TranscriptChunk(speaker_id=speaker_id, text="", is_final=False)

