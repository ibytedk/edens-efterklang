from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable

from edens_dm.providers.base import ProviderDependencyError


@dataclass
class DiscordSpeakerMap:
    discord_user_id: int
    speaker_id: str
    display_name: str


class PycordVoiceGateway:
    """Typer og runtime-kontrakt for Pycord-baseret voice receive."""

    def __init__(self, on_pcm_frame: Callable[[bytes, DiscordSpeakerMap], Any]) -> None:
        self.on_pcm_frame = on_pcm_frame

    @staticmethod
    def ensure_dependency() -> None:
        try:
            import discord  # noqa: F401
        except ImportError as exc:
            raise ProviderDependencyError(
                "Pycord er ikke installeret. Brug `pip install -e .[discord]`."
            ) from exc

    async def connect(self, token: str, guild_id: int, channel_id: int) -> None:
        self.ensure_dependency()
        if not token or not guild_id or not channel_id:
            raise ValueError("Discord-token, guild_id og channel_id er påkrævet.")
        return None

