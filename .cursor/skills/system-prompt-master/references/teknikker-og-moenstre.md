# Teknikker og Mønstre — Komplet Reference

## Indholdsfortegnelse

1. [Fundamentale Teknikker](#fundamentale-teknikker)
2. [Avancerede Mønstre](#avancerede-mønstre)
3. [Output-kontrol](#output-kontrol)
4. [Ræsonnerings-mønstre](#ræsonnerings-mønstre)
5. [Meta-prompting](#meta-prompting)
6. [Kontekst-engineering](#kontekst-engineering)
7. [Evaluering og Test](#evaluering-og-test)

---

## Fundamentale Teknikker

### 1. Rolle-prompting

**Hvad**: Definer AI'ens persona, ekspertise og perspektiv.

**Hvorfor**: En rolle forankrer AI'ens tone, viden og tilgang. "Data scientist" giver andre indsigter end "marketing-strateg" fra samme data.

**Pattern**:
```
Du er [specifik titel] med [X års erfaring] i [domæne].
Du specialiserer dig i [specifik niche].
Din tilgang er [kendetegn: metodisk/kreativ/kritisk].
```

**Avanceret**: Stakede roller for multidimensional ekspertise:
```
Du kombinerer ekspertisen fra:
- En senior sikkerhedsrådgiver (fokus på trusselsvurdering)
- En kommunikationsspecialist (fokus på klar formidling)
- En compliance-officer (fokus på regulatorisk overholdelse)
```

### 2. Struktureret Formatering

**Markdown-sektionering** (GPT, Gemini):
```markdown
# Sektion
## Undersektion
- Punkt 1
- Punkt 2
```

**XML-tags** (Claude, avanceret brug):
```xml
<instructions>
<step1>Analysér input</step1>
<step2>Generér svar</step2>
</instructions>
```

**Delimiter-adskillelse** (alle platforme):
```
###INSTRUKTIONER###
Trin 1: ...
Trin 2: ...

###FORMAT###
Output skal være JSON...

###EKSEMPLER###
Input: "..."
Output: {...}
```

### 3. Trigger/Instruktion-par

**Hvad**: Kobler specifikke situationer til specifikke handlinger.

**Hvorfor**: Forhindrer at modellen springer trin over eller blander trin sammen.

**Pattern**:
```
Trigger: Bruger uploader et dokument
→ Instruktion: Identificér dokumenttype, ekstraher nøglefelter, opsumér i 3 sætninger

Trigger: Bruger stiller et spørgsmål om dokumentet
→ Instruktion: Søg i dokumentet, citér relevante passager, svar med kildeangivelse

Trigger: Bruger beder om ændringer
→ Instruktion: Vis den specifikke ændring, bed om bekræftelse, udfør
```

### 4. Few-Shot Prompting

**Hvad**: Giv 2-5 eksempler på ønsket input → output.

**Regler for effektive few-shot eksempler**:
- Kort og fokuseret (vis mønsteret, ikke hele verden)
- Diversificér (dæk typiske + grænsetilfælde)
- Matchende format (eksemplerne skal ligne det ønskede output)
- Undgå overfitting (modellen skal lære konceptet, ikke overfladen)

**Pattern**:
```
Eksempel 1:
Input: "Kan jeg få refunderet mit køb fra i går?"
Output: {"kategori": "refundering", "hastighed": "normal", "handling": "tjek_returpolitik"}

Eksempel 2:
Input: "MIN ORDRE ER FORSVUNDET OG JEG VIL SNAKKE MED EN CHEF!!!"
Output: {"kategori": "eskalering", "hastighed": "høj", "handling": "overfør_til_supervisor"}

Eksempel 3:
Input: "Hvad er jeres åbningstider?"
Output: {"kategori": "info", "hastighed": "lav", "handling": "standard_svar"}
```

### 5. Positive Instruktioner

**Princip**: Fortæl AI'en hvad den SKA gøre, ikke kun hvad den ikke må.

| Svagt (negativt) | Stærkt (positivt) |
|-------------------|---------------------|
| "Skriv ikke lange svar" | "Hold svar under 150 ord" |
| "Brug ikke teknisk jargon" | "Skriv så en 12-årig kan forstå det" |
| "Lad være med at gætte" | "Angiv kun fakta du er sikker på. Ved usikkerhed, skriv 'Ikke bekræftet'" |
| "Brug ikke markdown overalt" | "Skriv i flydende prosa-afsnit" |

### 6. Forstærkningssprog

**Hvad**: Ord og formuleringer der øger modellens opmærksomhed.

**Effektive forstærkere**:
- "Det er kritisk at..." / "Det er afgørende at..."
- "Tag dig tid og gennemgå grundigt"
- "Tjek dit arbejde inden du svarer"
- "Sørg ALTID for at..."
- "ALDRIG [handling] under nogen omstændigheder"

**Brug sparsomt**: Hvis alt er "KRITISK", er intet det. Reservér forstærkningssprog til 2-3 virkelig kritiske regler.

---

## Avancerede Mønstre

### 7. Conditional Workflows

**Hvad**: Forskellige arbejdsgange baseret på input-type.

```
Analysér brugerens request:

HVIS request handler om data-analyse:
  → Følg Data-analyse workflow (trin 1-5)
HVIS request handler om rapport-skrivning:
  → Følg Rapport workflow (trin 1-4)
HVIS request er uklart:
  → Stil 1-2 præciserende spørgsmål
```

### 8. Feedback Loop / Selvcheck

**Hvad**: AI'en validerer sit eget output før levering.

**Pattern**:
```
Før du svarer:
1. Generér dit svar
2. Tjek: Opfylder svaret alle output-krav?
3. Tjek: Er der uunderstøttede påstande?
4. Tjek: Er formatet korrekt?
5. Hvis ja → Levér svaret
6. Hvis nej → Korrigér og tjek igen
```

### 9. Eskalerings-protokol

**Hvad**: Definér hvornår AI'en skal stoppe og bede om hjælp.

```
Eskaleringskriterer:
- Anmodning om handling der kan forårsage skade → STOP, forklar grænsen
- Modstridende krav fra bruger → Nævn konflikten, bed om afklaring
- Lav konfidens i svar (<60%) → Meld usikkerheden, foreslå informationskilder
- Uden for domæne → "Dette er uden for mit ekspertiseområde. Kontakt [X]"
```

### 10. Progressive Disclosure

**Hvad**: Start med det vigtigste, tilbyd dybde on-demand.

```
Svarformat:
1. OPSUMMERING (2-3 sætninger): Kernebudskabet
2. NØGLEPUNKTER (bullets): De 3-5 vigtigste detaljer
3. DYBDEGÅENDE (kun hvis brugeren beder om det): Fuld analyse
```

---

## Output-kontrol

### JSON Schema Enforcement

```
Output SKAL være valid JSON der matcher dette skema:
{
  "svar": "string, maks 500 tegn",
  "konfidens": "float, 0.0-1.0",
  "kilder": ["array af URL strings, påkrævet for faktuelle påstande"],
  "handling": "enum: 'svar_direkte' | 'bed_om_info' | 'eskalér'"
}

Hvis et felt ikke kan udfyldes, brug null (aldrig udelad feltet).
Returnér KUN JSON, ingen omgivende tekst.
```

### Checkliste-output

```
For hvert analyseret dokument, udfyld:
- [ ] Hvem: [person/organisation]
- [ ] Hvad: [handling/begivenhed]
- [ ] Hvornår: [dato/tidsperiode]
- [ ] Hvor: [lokation]
- [ ] Hvorfor: [årsag/kontekst]
- [ ] Konsekvens: [impact]
```

### Stilkontrol

```
Skriveregler:
- Skrivestil: Professionel dansk, aktiv form
- Sætningslængde: Maks 25 ord per sætning
- Afsnit: Maks 4 sætninger per afsnit
- Brug aldrig: "i bund og grund", "som bekendt", "det skal bemærkes"
- Foretrukne termer: "anbefaling" (ikke "forslag"), "risiko" (ikke "problem")
```

---

## Ræsonnerings-mønstre

### Chain-of-Thought (CoT)

**Hvornår**: Matematik, logik, flertrins-problemer, planlægning.

```
Tænk igennem problemet trin for trin:
1. Identificér de kendte fakta
2. Identificér hvad der mangler
3. Opstil mulige tilgange
4. Vælg den mest lovende tilgang
5. Udfør beregning/analyse
6. Verificér resultatet
7. Præsentér kun det endelige svar med kort begrundelse
```

### Self-Consistency

**Hvornår**: Høj-risiko beslutninger der kræver robust besvarelse.

```
For dette spørgsmål:
1. Generér 3 uafhængige analyser med forskellige tilgange
2. Sammenlign resultaterne
3. Hvis alle 3 er enige → Højkonfidens svar
4. Hvis 2/3 er enige → Angiv flertalssvar med note om dissens
5. Hvis alle 3 er uenige → Eskalér til bruger med alle 3 perspektiver
```

### Structured Reasoning

```
For hvert problem, brug dette framework:
OBSERVATION: Hvad ser vi i data/input?
HYPOTESE: Hvad kan forklare det?
EVIDENS: Hvilke data understøtter/modsiger hypotesen?
KONKLUSION: Hvad er det mest sandsynlige svar?
USIKKERHED: Hvad ved vi ikke / hvad kunne ændre konklusionen?
```

---

## Meta-prompting

### Prompt-forbedring

**Hvad**: AI'en forbedrer sin egen prompt iterativt.

```
Du har skrevet en system-prompt. Nu:
1. Identificér 3 svagheder i prompten
2. For hver svaghed, foreslå en forbedring
3. Implementér forbedringerne
4. Tjek: Er der nye svagheder?
5. Gentag maksimalt 2 gange
```

### Conductor-Expert Model

**Hvad**: En master-model koordinerer specialiserede ekspert-prompts.

```
CONDUCTOR rolle:
1. Analysér brugerens request
2. Dekomponér i delproblemer
3. Rut hvert delproblem til den rette ekspert
4. Saml ekspert-svar til ét kohærent svar
5. Kvalitetstjek det samlede svar
```

### Adversarial Self-Check

**Hvad**: AI'en angriber sit eget svar for at finde fejl.

```
Efter du har genereret dit svar:
1. Spil djævelens advokat: Hvad er den stærkeste indvending mod dit svar?
2. Kan du finde faktuelle fejl eller logiske brister?
3. Ville en domæneekspert være uenig? Hvorfor?
4. Opdatér dit svar baseret på denne kritik
```

---

## Kontekst-engineering

### RAG-integration

```
Når du modtager søgeresultater:
1. Vurdér relevans af hvert resultat (høj/medium/lav)
2. Ignorer irrelevante resultater
3. Brug kun information fra høj- og medium-relevans kilder
4. Citér kilden inline: "Ifølge [kilde]..."
5. Hvis ingen resultater er relevante → Sig "Jeg fandt ingen pålidelig information om dette"
```

### Kontekstvindue-styring

```
Prioritér information i denne rækkefølge:
1. Brugerens seneste besked (højeste prioritet)
2. Systemregler (altid gældende)
3. Seneste værktøjsresultater
4. Samtalehistorik (seneste 3-5 beskeder)
5. Baggrundsdokumenter (laveste prioritet, brug kun ved behov)
```

---

## Evaluering og Test

### Test Suite Design

Opbyg et test-sæt med 30-100 eksempler fordelt på:

| Kategori | Andel | Formål |
|----------|-------|--------|
| Typiske cases | 50% | Baseline performance |
| Edge cases | 25% | Grænseadfærd |
| Adversarial | 15% | Forsøg på at bryde prompten |
| Regression | 10% | Ting der tidligere fejlede |

### Evalueringsmetrikker

**Struktureret output**:
- Skema-overholdelse (% valid JSON/format)
- Felt-korrekthed (% korrekte værdier per felt)
- Null-håndtering (korrekt brug af null vs. hallucination)

**Fritekst output**:
- Relevans (svarer det på spørgsmålet?)
- Korrekthed (er fakta korrekte?)
- Formatoverholdelse (respekterer det stilregler?)
- Tone-konsistens (matcher det persona?)

### Iterationsproces

```
1. Skriv prompt v1
2. Kør test suite
3. Identificér svageste kategori
4. Tilføj/justér eksempler eller regler for den kategori
5. Kør test suite igen
6. Gentag til alle kategorier møder acceptkriterierne
7. Dokumentér: Hvilke ændringer forbedrede hvad
```
