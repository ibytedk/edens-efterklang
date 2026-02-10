# MCP When-to-Use – Reference

## Beslutningstræ

```
Opgave kræver data eller handling?
├── Data/handling findes KUN i workspace (filer, kode)
│   → Brug Read, Grep, Glob, run_terminal_cmd. IKKE MCP.
│
└── Data/handling er LIVE eller EKSTERN
    ├── Aktuel tid / tidszone → user-time (get_current_time, convert_time)
    ├── Gmail (læs, send, søg, drafts, labels) → user-gmail_mcp_server
    ├── Snilld CRM (tasks, kunder, projekter, logs) → user-Snilld-CRM
    └── Live web/UI (naviger, klik, snapshot, test frontend) → cursor-ide-browser / cursor-browser-extension
```

## Edge cases

| Situation | Anbefaling | Evidens |
|-----------|------------|---------|
| "Hvad er klokken nu?" | user-time, get_current_time (timezone fx Europe/Copenhagen) | Aktuel tid er live data |
| "Parse denne HTML-fil" | Read + kode/terminal. IKKE browser-MCP | Fil er i workspace |
| "Test om min localhost:3000 viser X" | cursor-ide-browser: navigate → lock → snapshot → klik | Live UI i browser |
| "Find mails med ord Y" | user-gmail_mcp_server, GMAIL_FETCH_EMAILS med query | Gmail er ekstern |
| "List alle tasks i CRM" | user-Snilld-CRM, get_tasks | CRM er ekstern |
| Bruger nævner "MCP" eller "hvornår bruger du X?" | Anvend denne skill; besvar med gul regel + relevant server | Eksplicit trigger |

## Tool-schema placering (verificeret)

- **Workspace MCP-sti:** `C:\Users\info\.cursor\projects\i-Shared-drives-Edens-Efterklang\mcps\`
- Under hver server: `tools/<toolname>.json` med `name`, `description`, `arguments` (required/optional).
- **Krav:** Læs den konkrete `.json` før `call_mcp_tool`; brug ingen navne eller parametre der ikke er i schema.

## Ikke-mål (scope)

- Denne skill ændrer ikke hvordan MCP-servere køres eller konfigureres (mcp.json).
- Den definerer ikke nye tools; den beskriver kun hvornår eksisterende MCP-tools skal bruges vs. built-in.
