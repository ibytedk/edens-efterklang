---
name: chatgpt-c-c-miniature-generator
description: Generer og gem figur- og monsterbilleder via det faste ChatGPT-projekt for Creatures & Chronicles ved at aabne projekt-URL'en i en Playwright-browser, lade brugeren logge ind manuelt, indsende prompts og hente de faerdige billeder til workspace. Brug naar brugeren vil lave C&C-miniaturer, monsterportraetter, NPC-billeder eller lignende gennem ChatGPT-projektet i stedet for generiske billedvaerktoejer.
---

# ChatGPT C&C Miniature Generator

Brug denne skill til ét bestemt workflow: et live, autentificeret ChatGPT-projekt, hvor brugeren selv logger ind, og hvor Codex derefter genererer og gemmer billeder til Creatures & Chronicles.

## Kerneflow

1. Fastlaeg outputtet foer browseren bruges.
- Afklar motiv, antal billeder, oensket mappe og eventuel navngivning.
- Brug som standard `output/chatgpt-miniatures/` under nuvaerende workspace.
- Koer ét motiv ad gangen, medmindre brugeren udtrykkeligt vil have en batch.

2. Aabn altid det faste projekt i browseren.
- Brug Playwright-browserautomation.
- Naviger til `https://chatgpt.com/g/g-p-695525e12e4481918efda89f0809b1ed-c-c-miniature-figure-generator/project`.
- Tag et snapshot foer foerste interaktion og igen efter stoerre DOM-aendringer.

3. Lad brugeren haandtere login.
- Hvis projektet ikke allerede er aabent og autentificeret, bed brugeren logge ind i det aabnede browservindue.
- Bed aldrig om credentials og skriv dem aldrig selv.
- Fortsaet foerst, naar snapshot viser projektets chat/composer klar til input.

4. Skriv prompten til billedgenerering.
- Skriv prompten paa engelsk som standard for bedre billedkvalitet, men opsummer arbejdet paa dansk til brugeren.
- Brug promptskabelonen og promptreglerne i [references/chatgpt-project-workflow.md](references/chatgpt-project-workflow.md).
- Hold prompten konkret: motiv, silhuet, udstyr, positur, stemning, baggrund og tydelige negative krav.

5. Aktivér billedmodus, hvis UI'et kraever det.
- Se efter labels som `Create image`, `Generate image`, `Image` eller tilsvarende vaerktoejsknapper i composer-omraadet.
- Antag ikke en bestemt knaptekst; brug det seneste snapshot.
- Hvis projektet allerede staar i billedmodus, spring dette trin over.

6. Generer billedet.
- Indsaet prompten og send den.
- Vent i korte intervaller og snapshot igen ved tydelige UI-skift.
- Hvis ChatGPT viser fejl, rate limit eller blokering, dokumenter den praecise fejltekst og gem en screenshot.

7. Gem det genererede billede.
- Brug denne prioritet:
  1. Klik en synlig download-knap, hvis den findes.
  2. Hvis der ikke er en download-knap, gem billedet via browseren med en maalet element-screenshot eller anden browser-intern gemning.
  3. Brug kun shell-downloads fra billed-URL'er, hvis snapshot eller browserkode viser en stabil, brugbar URL.
- Omskriv ikke eksisterende filer. Brug versionsnavne som `yyyy-mm-dd-subject-v01.png`, `v02`, osv.
- Verificer bagefter, at filen findes.

8. Rapportér resultatet kort.
- Returner den gemte filsti.
- Noter promptresumé og om billedet blev gemt via download eller screenshot-fallback.
- Hvis workflowet stoppede paa et nyt eller uklart UI, sig praecist hvor.

## DOM- og browserregler

- Foretraek synlige labels, ARIA-navne og friske snapshots frem for skrøbelige CSS-selektorer.
- Re-snapshot efter navigation, modal-aabning, faneskift eller store layoutaendringer.
- Brug browserkode sparsomt og kun til ting som at hente den seneste billednode eller tage en maalet screenshot.
- Verificer, at fanen stadig er paa det rigtige ChatGPT-projekt, foer prompten sendes.

## Guardrails

- Brug kun dette skill til det konkrete ChatGPT-projekt, ikke som generisk erstatning for andre billedgeneratorer.
- Log aldrig ind paa brugerens vegne.
- Koer batchjobs sekventielt og gem hvert motiv som separat fil.
- Overskriv ikke tidligere generationer uden udtrykkelig brugerbesked.
- Hvis UI'et har aendret sig, arbejd ud fra det observerede snapshot i stedet for at antage gamle knapper eller placeringer.

## Referencer

- Promptskabelon, UI-signaler og gemme-fallbacks: [references/chatgpt-project-workflow.md](references/chatgpt-project-workflow.md)

## Typiske brugerforespørgsler

- "Brug ChatGPT-projektet til at lave en ork-hoevding til Creatures & Chronicles og gem billedet."
- "Aabn miniature-generatoren og lav et monsterportraet af en mosehydra."
- "Generer tre varianter af samme goblin og gem dem som separate filer."
