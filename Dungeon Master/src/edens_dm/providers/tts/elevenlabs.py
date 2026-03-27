from __future__ import annotations

from typing import AsyncIterator

import httpx

from edens_dm.providers.base import AudioChunk, ProviderNotConfiguredError, TtsProvider


class ElevenLabsTtsProvider(TtsProvider):
    def __init__(
        self,
        api_key: str | None,
        base_url: str = "https://api.elevenlabs.io/v1",
        model_id: str = "eleven_flash_v2_5",
        output_format: str = "pcm_22050",
    ) -> None:
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.model_id = model_id
        self.output_format = output_format

    async def synthesize_stream(self, text: str, voice_id: str) -> AsyncIterator[AudioChunk]:
        if not self.api_key:
            raise ProviderNotConfiguredError("ElevenLabs API key mangler.")
        if not voice_id:
            raise ProviderNotConfiguredError("TTS voice_id mangler.")
        sample_rate = 22050 if self.output_format == "pcm_22050" else 16000
        bytes_per_second = sample_rate * 2
        byte_count = 0
        url = f"{self.base_url}/text-to-speech/{voice_id}/stream"
        payload = {
            "text": text,
            "model_id": self.model_id,
            "output_format": self.output_format,
            "optimize_streaming_latency": 3,
        }
        headers = {"xi-api-key": self.api_key, "accept": "application/octet-stream"}
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream("POST", url, headers=headers, json=payload) as response:
                response.raise_for_status()
                async for chunk in response.aiter_bytes():
                    if not chunk:
                        continue
                    byte_count += len(chunk)
                    offset_ms = int((byte_count / bytes_per_second) * 1000)
                    yield AudioChunk(
                        voice_id=voice_id,
                        payload=chunk,
                        offset_ms=offset_ms,
                        format=self.output_format,
                        final=False,
                    )
        yield AudioChunk(
            voice_id=voice_id,
            payload=b"",
            offset_ms=int((byte_count / bytes_per_second) * 1000),
            format=self.output_format,
            final=True,
        )

