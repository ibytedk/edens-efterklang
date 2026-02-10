# Platform-specifikke Tips — Komplet Reference

## Indholdsfortegnelse

1. [Claude (Anthropic)](#claude-anthropic)
2. [GPT / Custom GPTs (OpenAI)](#gpt--custom-gpts-openai)
3. [Gemini (Google)](#gemini-google)
4. [Open-Source Modeller](#open-source-modeller)
5. [Kryds-platform Principper](#kryds-platform-principper)

---

## Claude (Anthropic)

### System Prompt Mekanik

- Brug `system`-parameteren i Messages API til rolle-definition
- Alt andet (opgavespecifikke instruktioner) i `user`-turn
- Claude er ekstremt følsom over for system-prompten — vær præcis

### Foretrukne Formater

**XML-tags** er Claude's styrke:
```xml
<role>
Du er en senior backend-udvikler med 10 års Python-erfaring.
</role>

<instructions>
1. Analysér koden for bugs
2. Vurdér sikkerhed
3. Foreslå forbedringer
</instructions>

<output_format>
Brug denne struktur:
- 🔴 Kritisk: [must fix]
- 🟡 Forslag: [nice to have]
- 🟢 Godt: [positiv feedback]
</output_format>

<constraints>
- Aldrig foreslå unsikre patterns
- Altid inkludér test-eksempler for foreslåede ændringer
</constraints>
```

### Claude 4.5/4.6 Specifikt

**Adaptive Thinking**: Claude 4.6 bruger adaptive thinking — den beslutter selv hvornår og hvor meget den skal tænke. Du kan guide den:
```
Reflektér over kvaliteten af tool-resultater inden du går videre.
Brug din thinking til at planlægge og iterere baseret på ny information.
```

**Mindre aggressivt sprog**: Claude 4.5+ reagerer stærkere på system-prompten. Nedtoner forstærkningssprog:
```
GAMMELT (for aggressivt): "KRITISK: Du SKAL ALTID bruge dette tool..."
NYT (passende): "Brug dette tool når det forbedrer din forståelse af problemet."
```

**Autonomi vs. sikkerhed**:
```
Overvej reversibilitet og impact af dine handlinger.
Lokale, reversible handlinger (redigering, tests): Udfør direkte.
Irreversible eller synlige handlinger (push, delete, send): Bekræft med bruger først.
```

**Kontekstbevidsthed**: Claude 4.5+ kan tracke sit kontekstvindue:
```
Dit kontekstvindue komprimeres automatisk. Stop ikke opgaver tidligt
pga. token-bekymringer. Gem fremskridt til hukommelse ved kontekstgrænsen.
```

**Format-styring** (reducér unødvendig markdown):
```
<avoid_excessive_markdown>
Skriv i klar, flydende prosa med komplette sætninger og afsnit.
Reservér markdown til `inline code`, kodeblokke, og simple overskrifter.
Undgå **bold** og *kursiv*. Brug IKKE bullets/numre medmindre
det er diskrete items eller brugeren eksplicit beder om det.
</avoid_excessive_markdown>
```

**Thinking-følsomhed**: Claude Opus 4.5 er følsom over for ordet "tænk" (uden extended thinking). Brug alternativer: "overvej", "vurdér", "analysér".

### Claude Best Practices Opsummering

| Princip | Implementering |
|---------|----------------|
| Vær eksplicit | Sig præcis hvad du vil — anmod om "above and beyond" eksplicit |
| Giv kontekst/motivation | Forklar HVORFOR en instruktion er vigtig |
| Pas på med eksempler | Eksempler kalibrerer stærkt — sørg for de matcher ønsket adfærd |
| XML for struktur | Brug XML-tags til at adskille sektioner |
| Positivt over negativt | "Skriv i prosa-afsnit" > "Brug ikke markdown" |

---

## GPT / Custom GPTs (OpenAI)

### Custom GPT Instruktions-format

Brug Markdown med klare sektioner:
```markdown
# Kontekst
Du er [rolle]. Du hjælper [målgruppe] med [opgave].

# Instruktioner
## Hovedopgave
1. [Trin 1]
2. [Trin 2]
3. [Trin 3]

## Sekundære opgaver
- [Opgave A]
- [Opgave B]

# Output-format
[Eksempel på ønsket output]

# Begrænsninger
- [Begrænsning 1]
- [Begrænsning 2]
```

### Trigger/Instruktion-par

OpenAI anbefaler eksplicit dette pattern for Custom GPTs:
```
Trigger: Bruger uploader et billede
Instruktion: Analysér billedet for [specifikke elementer]

---

Trigger: Bruger stiller et spørgsmål uden kontekst  
Instruktion: Stil op til 2 opklarende spørgsmål før du svarer
```

### Knowledge Files

```
Regler for vidensfiler:
- Navngiv filer eksplicit og referer til dem ved navn
- Instruér modellen til at "gennemlæse hele filen grundigt"
- Giv specifikke eksempler på hvad der skal extraheres
- Brug few-shot med API/action-kald
- Adskil action-trin med delimiters
```

### GPT-5 / GPT-5.2 Specifikt

- **Agentic eagerness**: Kalibrer balance mellem proaktivitet og afventen
- **Reasoning effort**: Low/Medium/High reasoning for at kontrollere dybde vs. latency
- **Tool-brug**: Referer til actions/apps ved navn OG domæne

### Effektive GPT-teknikker

```
Forstærkninger der virker i GPT:
- "Tag dig tid"
- "Tag en dyb indånding"
- "Tjek dit arbejde"
- "Det er vigtigt at..." (for kritiske regler)
- Few-shot for konsistente klassifikationer
```

---

## Gemini (Google)

### System Instructions

Gemini bruger `system_instruction` parameter:
```python
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    system_instruction="Du er en erfaren data-analytiker..."
)
```

### Foretrukne Formater

- Markdown med klare overskrifter
- Struktureret output via `response_mime_type="application/json"` + `response_schema`
- Safety settings er separate fra system prompt

### Grounding

```
Gemini støtter grounding med Google Search:
- Brug grounding for faktuelle spørgsmål
- Konfigurér via tools=[google_search_retrieval]
- System prompt skal instruere om kildehenvisning
```

### Gemini Best Practices

| Princip | Implementering |
|---------|----------------|
| Klare instruktioner | Undgå tvetydighed, brug eksempler |
| Struktureret output | Brug JSON schema enforcement |
| Safety settings | Konfigurér separat fra system prompt |
| Grounding | Aktiver Google Search for faktuelle svar |
| Context caching | Brug til store dokumenter der genbruges |

---

## Open-Source Modeller

### Llama (Meta)

**Chat Template**:
```
<|begin_of_text|><|start_header_id|>system<|end_header_id|>

Du er en hjælpsom assistent...<|eot_id|>
<|start_header_id|>user<|end_header_id|>

[Brugerens besked]<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
```

### Mistral/Mixtral

**Chat Template**:
```
[INST] <<SYS>>
Du er en hjælpsom assistent...
<</SYS>>

[Brugerens besked] [/INST]
```

### Generelle Tips for Open-Source

- Tjek den specifikke model's chat template (varierer!)
- System prompts er ofte kortere pga. mindre kontekstvinduer
- Forstærkningssprog virker mindre konsistent
- Few-shot eksempler er endnu vigtigere
- Test grundigt — adfærd varierer mere mellem modeller

---

## Kryds-platform Principper

### Universelle Regler

Disse virker på ALLE platforme:

1. **Eksplicit rolle** → Bedre fokus og tone
2. **Sektioneret struktur** → Bedre instruktionsfølgelse
3. **Few-shot eksempler** → Bedre output-konsistens
4. **Positiv framing** → Bedre regeloverholdelse
5. **Output-skema med eksempel** → Bedre format-konsistens
6. **Fejlhåndtering** → Bedre edge-case adfærd

### Platform-forskelle Matrix

| Feature | Claude | GPT | Gemini | Open-Source |
|---------|--------|-----|--------|-------------|
| Bedste format | XML-tags | Markdown | Markdown | Chat template |
| Rolle-mekanik | `system` param | System message | `system_instruction` | Template-specifik |
| Styrke | Instruktionsfølgelse, lang kontekst | Tool-brug, kreativitet | Grounding, multimodal | Tilpasning, privatliv |
| Svaghed | Kan være for konsistent | Kan drifte fra rolle | Strengere safety | Mindre pålidelig |
| Forstærkningssprog | Moderat (nedton for 4.5+) | Effektivt | Moderat | Inkonsistent |
| Thinking | Adaptive thinking | o1/o3 reasoning | Thinking mode | Varierer |
| Tool-brug | Native tool use | Function calling | Tool use | Varierer |

### Migration mellem Platforme

Når du migrerer en prompt mellem platforme:

1. **Behold**: Rolle, instruktioner, eksempler, output-format
2. **Tilpas**: Formatering (XML → Markdown), delimiter-stil, forstærkningssprog
3. **Test**: Kør hele test suiten — adfærd VIL variere
4. **Iterér**: Justér baseret på platform-specifikke afvigelser
