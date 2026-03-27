from __future__ import annotations

import subprocess
from pathlib import Path

import typer

from edens_dm.config import get_settings
from edens_dm.ledger.store import EventLedger
from edens_dm.memory.ingest import build_default_source_catalog, ingest_campaign_sources
from edens_dm.memory.store import LexicalMemoryStore
from edens_dm.rules.dice import DeterministicRng
from edens_dm.rules.engine import RuleEngine
from edens_dm.rules.types import ActorSnapshot, GameState, RuleIntent

app = typer.Typer(help="CLI til Edens DM MVP.")


@app.command("export-becmi-data")
def export_becmi_data() -> None:
    settings = get_settings()
    script_path = settings.project_root / "scripts" / "export_becmi_data.mjs"
    subprocess.run(["node", str(script_path)], check=True)
    typer.echo(f"Eksporterede BECMI-data til {settings.becmi_data_root}")


@app.command("ingest-lore")
def ingest_lore(limit: int = typer.Option(5, min=1, help="Antal preview-resultater.")) -> None:
    settings = get_settings()
    catalog = build_default_source_catalog(settings.effective_campaign_root)
    excerpts = ingest_campaign_sources(settings.effective_campaign_root, catalog)
    store = LexicalMemoryStore(excerpts)
    typer.echo(f"Ingestede {len(excerpts)} lore-excerpts.")
    for hit in store.search("Dalhulborg Baron Eirik", scope={"top_k": limit}):
        typer.echo(f"- {hit.source_path} [{hit.excerpt_id}] score={hit.score:.2f}")


@app.command("dry-run")
def dry_run() -> None:
    actor = ActorSnapshot(
        actor_id="fighter-1",
        name="Avfor",
        kind="pc",
        level=3,
        class_name="fighter",
        ac=5,
        thac0=19,
        hp=18,
        max_hp=18,
        morale=9,
        abilities={"str": 16, "dex": 12, "con": 14, "int": 8, "wis": 9, "cha": 10},
        weapon_mastery={"battleaxe": "Skilled"},
    )
    target = ActorSnapshot(
        actor_id="orc-1",
        name="Ork 1",
        kind="monster",
        level=1,
        class_name="monster",
        ac=6,
        thac0=19,
        hp=8,
        max_hp=8,
        morale=8,
        save_as="F1",
        abilities={"str": 12, "dex": 8, "con": 10, "int": 8, "wis": 7, "cha": 6},
    )
    state = GameState(scene_id="scene-1", actors={actor.actor_id: actor, target.actor_id: target})
    engine = RuleEngine(rng=DeterministicRng(seed=42, scripted_rolls=[15, 6]))
    result = engine.apply(
        RuleIntent(
            kind="attack",
            actor_id="fighter-1",
            target_id="orc-1",
            params={"weapon_name": "battleaxe", "weapon_damage": "1d8"},
        ),
        state,
    )
    ledger = EventLedger()
    ledger.record_rule_result(result)
    typer.echo(result.model_dump_json(indent=2))
    typer.echo(f"Ledger events: {len(ledger.events)}")


@app.command("init-db")
def init_db() -> None:
    from edens_dm.ledger.store import create_database

    settings = get_settings()
    create_database(settings.db_url)
    typer.echo("Database initialiseret.")


def main() -> None:
    app()


if __name__ == "__main__":
    main()

