from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any

from pgvector.sqlalchemy import Vector
from sqlalchemy import JSON, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


def _uuid() -> str:
    return str(uuid.uuid4())


class CampaignRecord(Base):
    __tablename__ = "campaigns"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class SessionRecord(Base):
    __tablename__ = "sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    campaign_id: Mapped[str] = mapped_column(ForeignKey("campaigns.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    started_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    ended_at: Mapped[datetime | None] = mapped_column(DateTime)


class SceneRecord(Base):
    __tablename__ = "scenes"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    session_id: Mapped[str] = mapped_column(ForeignKey("sessions.id"), nullable=False)
    label: Mapped[str] = mapped_column(String(255), nullable=False)
    state_blob: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)


class ActorRecord(Base):
    __tablename__ = "actors"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    scene_id: Mapped[str] = mapped_column(ForeignKey("scenes.id"), nullable=False)
    actor_key: Mapped[str] = mapped_column(String(128), nullable=False)
    actor_blob: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)


class InventoryItemRecord(Base):
    __tablename__ = "inventory_items"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    actor_id: Mapped[str] = mapped_column(ForeignKey("actors.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    meta: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)


class EffectRecord(Base):
    __tablename__ = "effects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    actor_id: Mapped[str] = mapped_column(ForeignKey("actors.id"), nullable=False)
    label: Mapped[str] = mapped_column(String(255), nullable=False)
    effect_blob: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)


class RollEventRecord(Base):
    __tablename__ = "roll_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    session_id: Mapped[str] = mapped_column(ForeignKey("sessions.id"), nullable=False)
    actor_key: Mapped[str | None] = mapped_column(String(128))
    label: Mapped[str] = mapped_column(String(255), nullable=False)
    expression: Mapped[str] = mapped_column(String(64), nullable=False)
    total: Mapped[int] = mapped_column(Integer, nullable=False)
    detail_blob: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class NarrationEventRecord(Base):
    __tablename__ = "narration_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    session_id: Mapped[str] = mapped_column(ForeignKey("sessions.id"), nullable=False)
    voice_tag: Mapped[str | None] = mapped_column(String(128))
    text: Mapped[str] = mapped_column(Text, nullable=False)
    meta: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class KnowledgeFactRecord(Base):
    __tablename__ = "knowledge_facts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    source_path: Mapped[str] = mapped_column(String(1024), nullable=False)
    excerpt_id: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    title: Mapped[str | None] = mapped_column(String(255))
    content: Mapped[str] = mapped_column(Text, nullable=False)
    scope: Mapped[str] = mapped_column(String(128), nullable=False)
    embedding: Mapped[list[float] | None] = mapped_column(Vector(1536), nullable=True)
    meta: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

