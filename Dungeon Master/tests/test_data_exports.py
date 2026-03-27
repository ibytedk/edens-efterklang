from pathlib import Path

from edens_dm.config import get_settings


def test_exported_datasets_exist():
    settings = get_settings()
    root = settings.becmi_data_root
    assert (root / "encounter_monsters.json").exists()
    assert (root / "encounter_details.json").exists()
    assert (root / "treasure_tables.json").exists()

