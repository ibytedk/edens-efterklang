---
name: mermaid-diagrams
description: Gør agenten til ekspert i at skabe og finpudse Mermaid-diagrammer (flowchart, sequenceDiagram, classDiagram, graph). Brug når brugeren beder om diagrammer, flow, datalinje, arkitektur, systemkort, eller visualisering i Mermaid-format. Følger Cursor cookbook: start småt, lag abstraktion (C4), kombiner diagrammer.
---

# Mermaid-diagrammer – Ekspertniveau

Du er ekspert i at generere og forbedre **Mermaid-diagrammer** direkte i Cursor. Diagrammer bruges til at vise logik, dataflow, arkitektur og struktur. Mermaid rendres i Markdown (med passende extension) og understøttes af Cursor.

---

## Når du bruger denne skill

- Brugeren beder om **diagram**, **flow**, **flowchart**, **sekvens**, **arkitektur**, **systemkort**, **datalinje** eller **visualisering**
- Brugeren nævner **Mermaid** eksplicit
- Opgaver som: "Vis hvordan requests går fra controller til database", "Spor denne variabel fra ind til ud", "Giv et komponent-overblik over denne service"
- Behov for **flow control**, **data lineage** eller **struktur** i kodebase eller design

---

## To dimensioner at overveje

1. **Formål:** Kortlægger du logik, dataflow, infrastruktur eller noget andet?
2. **Format:** Hurtigt (Mermaid) vs. mere formelt (fx UML) – denne skill fokuserer på Mermaid.

---

## Diagramtyper – hvornår hvad

| Behov | Mermaid-type | Brug til |
|-------|----------------|----------|
| Logik, beslutninger, flow | `flowchart` eller `graph TD` | Trin-for-trin, forgreninger, tilstande |
| Interaktion mellem parter | `sequenceDiagram` | Request/response, API-kald, bruger ↔ system |
| Objekt-/klassestruktur | `classDiagram` | Klasser, relationer, attributter |
| Enkel retningsgraf | `graph TD` / `graph LR` | Overblik, højniveau, få noder |

**Hurtig valg:**  
- "Hvordan flyder data?" → flowchart eller sequenceDiagram  
- "Hvem kalder hvem?" → sequenceDiagram  
- "Hvilke dele findes?" → graph eller classDiagram  

---

## Strategi: Start småt, byg op (C4-inspireret)

1. **Start lavt:** Vælg én funktion, én route eller én proces.
2. **Diagram den del** i Mermaid.
3. **Opsummer** til et mellemniveau (fx én service eller ét lag).
4. **Gentag** indtil ønsket abstraktionsniveau.
5. **Kombiner** til ét overbliksdiameter eller systemkort, hvis brugeren ønsker det.

Undgå at mappe "alt på én gang". Bedre: flere små, præcise diagrammer der kan slås sammen.

---

## Syntaks – kort reference

### Flowchart / graph

```mermaid
flowchart LR
    A[Start] --> B{Beslutning}
    B -->|Ja| C[Handling 1]
    B -->|Nej| D[Handling 2]
    C --> E[Slut]
    D --> E
```

- Retning: `TB` (top-bottom), `LR` (left-right), `BT`, `RL`
- Noder: `[firkant]`, `(rund)`, `{rombe}`, `[(database)]`, `[[subroutine]]`
- Kant: `-->`, `-.->`, `==>`, `-- "tekst" -->`

### Sequence diagram

```mermaid
sequenceDiagram
    participant U as User
    participant S as Server
    participant D as Database
    U->>S: Submit
    S->>D: Query
    D-->>S: Rows
    S-->>U: Response
```

- `->>` solid, `-->>` stipled
- `participant`, `actor`, `note right of A: tekst`, `alt/else`, `loop`

### Class diagram

```mermaid
classDiagram
    class Order {
        +id: int
        +total: float
        +save()
    }
    Order "1" --> "*" LineItem : contains
```

- Relationer: `-->`, `<--`, `--*`, `--o`, `||--||`

### Graph (simpel)

```mermaid
graph TD
    subgraph Niveau1
        A1[Komponent A]
        A2[Komponent B]
    end
    subgraph Niveau2
        B[System] --> A1
        B --> A2
    end
```

- `subgraph` til gruppering og lag (C4-style).

---

## Prompt-tips til brugeren

Anbefal at brugeren kan sige fx:

- **Flow:** "Vis hvordan requests går fra controller til database."
- **Data:** "Spor denne variabel fra hvor den kommer ind til hvor den ender."
- **Struktur:** "Giv et komponent-overblik over denne service."
- **Kombination:** "Lav først et detaljeret flow for login, så et højniveau-overblik over hele auth."

---

## Kvalitet og sti

1. **Unikke, læsbare ID'er:** Brug korte id'er (A, B, Server, DB) og vis fuld tekst i node-labels: `S[Server]`.
2. **Konsekvent retning:** Vælg én hovedretning (typisk TD eller LR) og hold den.
3. **Subgraphs for lag:** Brug `subgraph` til at vise niveauer (lav / mellem / høj) i samme diagram.
4. **Ét fokus per diagram:** Ét flow, én sekvens eller én struktur – undgå at proppe alt sammen.
5. **Markdown-blok:** Altid output som markdown code block med sproget `mermaid`, så preview (fx Mermaid-extension) kan rendre det.

---

## Eksempel: fra detalje til overblik

**Trin 1 – lavniveau (ét flow):**

```mermaid
flowchart LR
    Req[Request] --> Auth{Autenticeret?}
    Auth -->|Ja| Controller[Controller]
    Auth -->|Nej| 401[401]
    Controller --> DB[(DB)]
    DB --> Response[Response]
```

**Trin 2 – indarbejd i mellemniveau med subgraph:**

```mermaid
graph TD
    subgraph Client
        U[User]
    end
    subgraph Backend
        Auth{Auth}
        Controller[Controller]
        DB[(DB)]
    end
    U --> Auth
    Auth --> Controller
    Controller --> DB
```

**Trin 3 – højniveau (kan kombineres med andre moduler):**

```mermaid
graph LR
    App[App] --> Auth[Auth System]
    App --> Billing[Billing System]
```

---

## Extension

Brugeren kan installere **Markdown Mermaid**-extension i Cursor til at forhåndsvisning af diagrammer direkte i Markdown.

---

## Opsummering

- Vælg diagramtype ud fra **formål** (flow, sekvens, struktur).
- **Start småt** – én proces eller ét lag – byg derefter op og kombiner.
- Brug **subgraph** til lag og grupper; hold **ét fokus** per diagram.
- Output altid i en **mermaid** code block, med læsbare labels og konsekvent retning.
