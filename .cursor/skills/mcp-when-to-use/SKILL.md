---
name: mcp-when-to-use
description: Decides precisely when to use MCP tools vs built-in tools; when to use each MCP server (user-time, user-gmail_mcp_server, user-Snilld-CRM, cursor-ide-browser, cursor-browser-extension). Use when choosing which tools to call, when the user asks about MCP usage, or when planning a task that might need external data or live UI.
---

# Når skal MCP bruges?

## Gul regel

| Behov | Brug |
|-------|------|
| **Live/ekstern data** (tid, e-mail, CRM, live web) | MCP |
| **Lokal fil, kodebase-søgning, terminal i workspace** | Built-in (Read, Grep, Glob, run_terminal_cmd) |

**MCP bruges aldrig** til at læse/skrive filer i workspace, søge i kode eller køre kommandoer lokalt. Brug built-in værktøjer.

---

## Obligatorisk før MCP-kald

1. **Læs tool-schema først.** Tool-descriptors ligger i `mcps/<server>/tools/<tool>.json`. Tjek required params og typer før du kalder `call_mcp_tool`.
2. Brug **server-navn og tool-navn** præcis som i descriptor (fx `user-gmail_mcp_server`, `GMAIL_FETCH_EMAILS`).

---

## user-time

**Brug MCP når:** Brugeren eller opgaven har brug for **nuværende tid** eller **tidszon konvertering** (fx "hvad er klokken i Tokyo?", "konverter 14:00 CET til PST").

- `get_current_time` – nuværende tid i IANA timezone (fx `Europe/Copenhagen`).
- `convert_time` – konverter tid mellem timezones (source_timezone, time, target_timezone).

**Brug IKKE:** Til dato-beregninger der kun kan løses med kode i repo (fx "hvor mange dage mellem to datoer i min script"). Brug built-in/terminal hvis det er ren logik uden behov for aktuel tid.

---

## user-gmail_mcp_server

**Brug MCP når:** Opgaven handler om **Gmail** – læse mails, søge, sende, slette, drafts, labels, vedhæftninger.

- Fx: "hent mine ulæste mails", "send en mail til X", "find mails fra Y", "svar på tråd", "list drafts".

**Brug IKKE:** Til generel "send mail" uden kontekst om Gmail; til at læse mail fra filer i workspace (brug Read).

---

## user-Snilld-CRM (Snilld-CRM)

**Brug MCP når:** Opgaven handler om **Snilld CRM** – opgaver, kunder, projekter, logs, follow-up, kanban/eisenhower.

- Fx: "hent opgaver", "opret kunde", "opdater task status", "get projects", "get follow-up opportunities", "action logs", "move task to test".

**Brug IKKE:** Til generel "task list" eller "CRM" der ikke er Snilld; til data der kun findes i lokale filer.

---

## cursor-ide-browser / cursor-browser-extension

**Brug MCP når:** Opgaven handler om **frontend/webapp** – teste UI, navigere live sider, klikke/udfylde, tage snapshot, verificere efter kodeændringer.

- **cursor-ide-browser:** Lock/unlock workflow – `browser_navigate` → `browser_lock` → interaktioner → `browser_unlock`. Før interaktion: `browser_tabs` (list), `browser_snapshot`. Korte venter (1–3 s) + snapshot i stedet for én lang wait.
- **cursor-browser-extension:** Brug ved frontend/webapp-opgaver og for at teste kodeændringer i browser.

**Brug IKKE:** Til at læse HTML/JS i workspace (brug Read/Grep). Til URLs der kræver login uden at brugeren har givet adgang.

---

## Beslutningscheckliste (inden du kalder MCP)

- [ ] Behovet er **live/ekstern** data eller **live UI** – ikke bare filer/kode i workspace?
- [ ] Jeg har **læst tool-schema** i `mcps/<server>/tools/<tool>.json` og kender required args?
- [ ] Server-navn og tool-navn er **præcist** som i projektets MCP-descriptors?

Hvis alle er ja → brug MCP. Hvis første er nej → brug built-in værktøjer.

---

## Reference

- Tool-descriptors: `C:\Users\info\.cursor\projects\i-Shared-drives-Edens-Efterklang\mcps\<server>\tools\*.json`
- Browser-workflow: `mcps/cursor-ide-browser/INSTRUCTIONS.md`
- Flere edge cases og eksempler: [reference.md](reference.md)
