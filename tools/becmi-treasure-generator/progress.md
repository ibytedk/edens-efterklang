Original prompt: Ja becmi-treasure-generator skal også være engelsk

## 2026-03-06
- Oversat treasure-generatorens UI i `index.html` til engelsk.
- Oversat brugerrettede status-, fejl- og eksporttekster i `app.js` til engelsk.
- Skiftet formattering til `en-GB` for tal og tidsstempel i markdown-eksport.
- Oversat synlige verifikationsnoter i `data.js` til engelsk.
- Treasure-generatorens markdown-eksport bruger nu engelske sektionstitler og labels.

## Verificering
- Browser-smoketest gennemført:
  - `A x2` i treasure-generatoren viser engelske labels i summary og per-roll output.
  - Markdown-eksport virker og bruger engelske status- og sektionsnavne.
  - Ingen console errors.
- Regressionstest gennemført:
  - Encounter-generatoren kan stadig bruge treasure-motoren til carried treasure uden fejl.

## Noter
- Tilføjet versionsquery på treasure-scripts i både treasure- og encounter-generatorens `index.html`, så browser-cache ikke viser gamle danske scripts.
