from __future__ import annotations

import math
import re
from abc import ABC, abstractmethod
from typing import Any

from pydantic import BaseModel, ConfigDict, Field

TOKEN_RE = re.compile(r"[A-Za-zÆØÅæøå0-9\-]+")


class KnowledgeExcerpt(BaseModel):
    model_config = ConfigDict(extra="ignore")

    excerpt_id: str
    source_path: str
    title: str | None = None
    scope: str = "campaign"
    content: str
    meta: dict[str, Any] = Field(default_factory=dict)


class KnowledgeHit(KnowledgeExcerpt):
    score: float = 0.0


class MemoryStore(ABC):
    @abstractmethod
    def search(self, query: str, scope: dict[str, Any] | None = None) -> list[KnowledgeHit]:
        raise NotImplementedError


def _tokenize(text: str) -> set[str]:
    return {token.lower() for token in TOKEN_RE.findall(text)}


class LexicalMemoryStore(MemoryStore):
    def __init__(self, excerpts: list[KnowledgeExcerpt]) -> None:
        self._excerpts = excerpts
        self._index = {item.excerpt_id: _tokenize(f"{item.title or ''} {item.content}") for item in excerpts}

    def search(self, query: str, scope: dict[str, Any] | None = None) -> list[KnowledgeHit]:
        options = scope or {}
        top_k = int(options.get("top_k", 5))
        query_tokens = _tokenize(query)
        hits: list[KnowledgeHit] = []
        for excerpt in self._excerpts:
            haystack = self._index[excerpt.excerpt_id]
            intersection = len(query_tokens & haystack)
            if not intersection:
                continue
            denominator = math.sqrt(len(query_tokens) * max(1, len(haystack)))
            score = intersection / denominator
            hits.append(KnowledgeHit(**excerpt.model_dump(), score=score))
        hits.sort(key=lambda item: item.score, reverse=True)
        return hits[:top_k]

