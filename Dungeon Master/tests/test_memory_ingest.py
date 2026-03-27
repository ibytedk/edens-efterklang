from pathlib import Path

from edens_dm.memory.ingest import SourceCatalogItem, ingest_campaign_sources
from edens_dm.memory.store import LexicalMemoryStore


def test_ingest_and_search_returns_citable_paths(tmp_path: Path):
    lore_root = tmp_path / "NPC"
    lore_root.mkdir()
    (lore_root / "gileath.md").write_text("# Gileath\nGileath undersøger Baron Eiriks sommerhus i Dalhulborg.", encoding="utf-8")

    excerpts = ingest_campaign_sources(tmp_path, [SourceCatalogItem("NPC", "npc")])
    store = LexicalMemoryStore(excerpts)
    hits = store.search("Gileath Dalhulborg")

    assert hits
    assert hits[0].source_path == "NPC/gileath.md"
    assert hits[0].excerpt_id

