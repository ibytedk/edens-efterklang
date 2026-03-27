from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any

from edens_dm.config import get_settings


def _read_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


@lru_cache(maxsize=8)
def load_json_dataset(name: str) -> Any:
    settings = get_settings()
    path = settings.becmi_data_root / name
    if not path.exists():
        raise FileNotFoundError(f"Dataset mangler: {path}")
    return _read_json(path)


def load_encounter_monsters() -> list[dict[str, Any]]:
    return load_json_dataset("encounter_monsters.json")


def load_encounter_details() -> dict[str, Any]:
    return load_json_dataset("encounter_details.json")


def load_treasure_tables() -> dict[str, Any]:
    return load_json_dataset("treasure_tables.json")

