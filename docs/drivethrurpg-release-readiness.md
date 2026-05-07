# DriveThruRPG Release Readiness

Internt udgiverark for `becmi-tournaments-and-jousting-sourcebook.md`.

Status: Manuskriptet er regelforbedret, men det er ikke endeligt upload-klar, for DriveThruRPGs aktuelle politik og klassisk D&D-kompatibilitet kræver menneskelig slutredaktion og licens/IP-kontrol.

## 1. Kritiske stop-punkter før upload

- **AI-tekst:** DriveThruRPGs generelle content guidelines siger aktuelt, at produkter på DriveThru Marketplaces ikke må indeholde tekst genereret af AI-sproggeneratorer. Hvis dette manuskript eller dele af det er AI-genereret eller AI-omskrevet, skal en menneskelig forfatter/redaktør omskrive, validere og eje slutteksten før kommerciel upload.
- **IP og kompatibilitet:** Manuskriptet refererer til BECMI, Rules Cyclopedia og RC-sidehenvisninger. Udgiver skal juridisk godkende titel, cover, trade dress, compatibility notice, markedsføringstekst og enhver reference til beskyttede navne/varemærker.
- **Kun PDF er ikke nok:** DriveThruRPG kræver en faktisk titelopsætning med metadata, pris, cover art og filopsætning. Denne Markdown-fil skal derfor layoutes og eksporteres korrekt.

## 2. Digital PDF-checkliste

Kildekrav fra DriveThruRPG/DriveThru Partners:

- PDF-format: `.pdf`.
- Alle billeder i RGB.
- Billeder mindst 150 dpi/ppi for digital PDF.
- Cover placeret korrekt og sidenummerering justeret.
- Ingen JPEG 2000-kompression.
- Ingen PDF-sikkerhed, password eller lås.
- Ikke PDF/A.
- PDF optimeret/preflightet.
- Metadata udfyldt: titel, forfatter, keywords.
- Filnavn med konsistent publisher-/produktprefix, kun læsbare alfanumeriske tegn, bindestreg eller underscore.

Foreslåede interne filnavne:

- `ee-classic-tournaments-jousting_v1_digital.pdf`
- `ee-classic-tournaments-jousting_v1_screen.pdf`
- `ee-classic-tournaments-jousting_v1_source.md`

## 3. Print-on-demand er separat

Hvis der ønskes POD, skal der laves særskilte printfiler:

- Cover-PDF og interior/book-block-PDF er separate filer.
- Cover template skal genereres via DriveThruRPGs template generator.
- Fonts skal være embedded.
- Output compliance: PDF/X-1a:2001 eller PDF/X-3:2002.
- Bleed: 0.125" på de tre ydre, ikke-bindende kanter.
- Ingen crop marks, printer marks eller registration marks.
- Tekst anbefales mindst 0.5" fra page edge.
- Non-bleeding art bør have safety på 0.25" fra ydre kanter og 0.5" fra binding.
- Ingen spine text ved under 48 sider.
- Sidetal skal passe til print-signatur; sidste side er enten blank eller interior-filen er en side kortere end cover-template page count.

## 4. Manuskriptkontrol

Udført:

- Nonlethal Combat præciseret, så formelle turneringsvåben tæller som blunted/rebated/practice weapons og derfor ikke får RC's -3 attack penalty.
- "Death's Door" gjort mere RC-præcist som **Keeping Characters Alive** ved 0 hp eller lavere.
- Compatibility notice indsat øverst i manuskriptet.
- Cover art og ni tematiske kapitelplader er tilføjet under `docs/art/tournaments-jousting/`.
- Art manifest oprettet: `docs/art/tournaments-jousting/ART-MANIFEST.md`.

Nuværende billedstatus:

- De indsatte finalbilleder ligger i `docs/art/tournaments-jousting/ai-clean-print-final/`.
- Billederne er genereret med ChatGPT/OpenAI image model og efterbehandlet lokalt til 300 dpi PNG med ekstra denoise/smoothing for renere printgengivelse.
- Stilretning: klassisk tidlig-1980'er fantasy RPG boxed-set illustration, håndtegnet linework og gouache/akvarel-farver; prompts undgik direkte imitation af navngivne kunstnere.
- Ingen eksterne stock assets er inkluderet i den endelige asset-mappe.
- DriveThruRPG-produktet skal markeres med `Contains AI-Generated Content`, fordi generativ billedkunst indgår.
- De tidligere AI-billeder ligger i `ai-final/`, `ai-1980s-final/` og `ai-clean-final/`, og de lokalt/proceduralt tegnede billeder ligger stadig i samme asset-mappe som fallback. Ingen af dem er de aktive billeder i Markdown-kilden.

Mangler før offentlig udgivelse:

- Menneskelig slutredaktion af al brødtekst.
- Juridisk/IP-godkendelse af BECMI/Rules Cyclopedia-kompatibilitet.
- Layout i InDesign/Affinity/Scribus eller tilsvarende.
- Cover art med klar rettighedskæde.
- PDF-preflight.
- Metadata og produktbeskrivelse skrevet/godkendt af menneskelig udgiver.
- Beslutning om digital-only eller digital + POD.

## 5. Metadata-worksheet

Udfyldes af udgiver før upload:

```text
Public title:
Subtitle:
Author:
Publisher:
System compatibility wording:
License/legal basis:
Human final editor:
AI-generation declaration / Creation Method:
Cover artist:
Interior artist(s):
Layout artist:
Version:
Release date:
Suggested price:
Category:
Rules system tags:
Short description:
Long description:
Customer preview pages:
```

## 6. Officielle referencepunkter

- DriveThruRPG: How to Create and Sell a PDF
  https://help.drivethrurpg.com/hc/en-us/articles/33395033102615-How-to-Create-and-Sell-a-PDF
- DriveThruRPG: General Content Guidelines
  https://help.drivethrurpg.com/hc/en-us/articles/12723312467095-General-Content-Guidelines
- DriveThru Partners: Check List for Digital PDF's
  https://help.drivethrupartners.com/hc/en-us/articles/12780748345367-Check-List-for-Digital-PDF-s
- DriveThru Partners: Quick Specifications for Print Books
  https://help.drivethrupartners.com/hc/en-us/articles/12780800178583-Quick-Specifications-for-Print-Books
