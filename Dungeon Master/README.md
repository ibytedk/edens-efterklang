# Edens DM

`edens-dm` er et Python 3.12-projekt, der implementerer fundamentet for en cloud-first, stemmestyret BECMI Dungeon Master til Discord.

## Mål for denne version

- Modular monolit under én kodebase
- Deterministisk BECMI-regelkerne med seedede rul
- Event-sourcet ledger og Postgres/pgvector-skema
- Whitelistet kampagneingest fra lokale Edens Efterklang-kilder
- Provider-interfaces for Discord, STT, TTS og LLM
- Testbar runtime uden eksterne API-nøgler via mocks

## Projektstruktur

- `src/edens_dm/`: applikationskode
- `src/edens_dm/data/becmi/`: kanoniske JSON-udtræk fra eksisterende browserværktøjer
- `scripts/export_becmi_data.mjs`: eksporterer JS-baserede BECMI-data til JSON
- `tests/`: golden-, replay- og ingest-tests

## Hurtig start

1. Opret virtuelt miljø og installer pakken:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e .[dev]
```

2. Eksportér kanoniske BECMI-data:

```powershell
edens-dm export-becmi-data
```

3. Kør tests:

```powershell
pytest
```

4. Start en lokal dry-run uden Discord og uden cloud-providers:

```powershell
edens-dm dry-run
```

## Miljøvariabler

Se `.env.example` for de vigtigste variabler. Cloud-providers er valgfrie i denne kodebase; tests og dry-run bruger mocks.

## Datakilder

Kampagnelore ingestes kun fra:

- `../DM Lore/`
- `../Delt/`
- `../NPC/`
- `../Områder/`
- `../Sessioner/Session Logs/`

BECMI-regeldata eksporteres fra de eksisterende værktøjer i:

- `../tools/becmi-encounter-generator/`
- `../tools/becmi-treasure-generator/`

## Postgres

Der medfølger en `docker-compose.yml`, som starter en lokal `pgvector`-kompatibel Postgres-instans.

