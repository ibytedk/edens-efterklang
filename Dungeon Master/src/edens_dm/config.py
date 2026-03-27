from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="EDENS_DM_",
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    env: str = "development"
    project_root: Path = Field(default_factory=lambda: Path(__file__).resolve().parents[2])
    campaign_root: Path | None = None
    db_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/edens_dm"
    log_level: str = "INFO"

    discord_token: str | None = None
    discord_guild_id: int | None = None
    discord_channel_id: int | None = None

    gladia_api_key: str | None = None
    gladia_base_url: str = "https://api.gladia.io/v2"

    elevenlabs_api_key: str | None = None
    elevenlabs_base_url: str = "https://api.elevenlabs.io/v1"
    default_tts_voice_id: str | None = None

    openai_api_key: str | None = None

    @property
    def effective_campaign_root(self) -> Path:
        if self.campaign_root is not None:
            return self.campaign_root
        return self.project_root.parent

    @property
    def becmi_data_root(self) -> Path:
        return self.project_root / "src" / "edens_dm" / "data" / "becmi"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()

