# Google Docs → Markdown (Edens Efterklang)

Alle Google Docs i shared drive-mappen **Edens Efterklang** (folder id `0AC8yGz9gBVKQUk9PVA`) skal have en markdown-version i samme mappe som .gdoc-filen.

## Begrænsning

Google Docs MCP returnerer **ikke** dokumenter fra shared drive-mappen (søgning med `'0AC8yGz9gBVKQUk9PVA' in parents` og navnesøgning giver tomme resultater). Derfor kan vi ikke automatisk liste doc-id’er; de skal tilføjes manuelt.

## Sådan finder du document_id

1. Åbn dokumentet i browseren (Google Docs).
2. Kig i URL’en: `https://docs.google.com/document/d/**DOCUMENT_ID**/edit`
3. Kopiér **DOCUMENT_ID** (den lange streng mellem `/d/` og `/edit`).

## Sådan tilføjer du id’er til manifestet

1. Åbn `.cursor/gdoc-to-md-manifest.json`.
2. For hvert dokument du vil konvertere: indsæt `document_id` (fx `"1FV8Bwgl_1hbkMFpOflvLtzpeXel8AUBOKcRBJsSD52A"`) i den passende linje. Lad `document_id` være `""` for dokumenter du ikke har id til endnu.
3. Gem filen.

## Sådan kører du konverteringen

Når der er mindst ét dokument med udfyldt `document_id` i manifestet, kan du bede assistenten:

- *"Konverter alle Google Docs i .cursor/gdoc-to-md-manifest.json der har document_id til markdown"*

Assistenten henter derefter hvert dokument via MCP (`GOOGLEDOCS_GET_DOCUMENT_BY_ID`), laver en markdown-version og gemmer den på `md_path` (relativt til projektroden).

## Allerede konverteret

- `Sessioner/Spillernes Karakterer.md` (doc id i manifestet, markdown oprettet)
