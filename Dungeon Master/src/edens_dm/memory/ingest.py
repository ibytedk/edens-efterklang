from __future__ import annotations

import hashlib
from dataclasses import dataclass
from pathlib import Path

from edens_dm.memory.store import KnowledgeExcerpt


@dataclass(frozen=True)
class SourceCatalogItem:
    relative_path: str
    scope: str
    patterns: tuple[str, ...] = ("*.md", "*.txt")


def build_default_source_catalog(campaign_root: Path) -> list[SourceCatalogItem]:
    _ = campaign_root
    return [
        SourceCatalogItem("DM Lore", "dm_lore"),
        SourceCatalogItem("Delt", "shared_lore"),
        SourceCatalogItem("NPC", "npc"),
        SourceCatalogItem("Områder", "area"),
        SourceCatalogItem("Sessioner/Session Logs", "session_log"),
    ]


def _chunk_text(text: str, max_chars: int = 1400, overlap: int = 200) -> list[str]:
    cleaned = text.replace("\r\n", "\n").strip()
    if len(cleaned) <= max_chars:
        return [cleaned]
    chunks: list[str] = []
    start = 0
    while start < len(cleaned):
        end = min(len(cleaned), start + max_chars)
        chunks.append(cleaned[start:end].strip())
        if end == len(cleaned):
            break
        start = max(0, end - overlap)
    return [chunk for chunk in chunks if chunk]


def ingest_campaign_sources(campaign_root: Path, catalog: list[SourceCatalogItem]) -> list[KnowledgeExcerpt]:
    excerpts: list[KnowledgeExcerpt] = []
    for item in catalog:
        source_root = campaign_root / item.relative_path
        if not source_root.exists():
            continue
        files: list[Path] = []
        for pattern in item.patterns:
            files.extend(source_root.rglob(pattern))
        for file_path in sorted({path for path in files if path.is_file()}):
            try:
                content = file_path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                content = file_path.read_text(encoding="utf-8", errors="ignore")
            relative_source = file_path.relative_to(campaign_root).as_posix()
            title = content.splitlines()[0].strip("# ").strip() if content.strip() else file_path.stem
            for index, chunk in enumerate(_chunk_text(content)):
                digest = hashlib.sha1(f"{relative_source}:{index}:{chunk}".encode("utf-8")).hexdigest()[:12]
                excerpts.append(
                    KnowledgeExcerpt(
                        excerpt_id=f"{digest}-{index}",
                        source_path=relative_source,
                        title=title or file_path.stem,
                        scope=item.scope,
                        content=chunk,
                        meta={"chunk_index": index},
                    )
                )
    return excerpts
