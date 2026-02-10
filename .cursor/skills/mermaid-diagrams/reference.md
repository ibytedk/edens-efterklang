# Mermaid – Syntaksreference

Kun læses ved behov for præcis syntaks. Hovedinstruktioner står i [SKILL.md](SKILL.md).

## Flowchart / graph

| Element | Syntaks |
|---------|--------|
| Retning | `flowchart TB` \| `LR` \| `BT` \| `RL` ; `graph` samme |
| Firkant | `[tekst]` |
| Rund | `(tekst)` |
| Rombe | `{tekst}` |
| Cylinder (DB) | `[(tekst)]` |
| Subroutine | `[[tekst]]` |
| Pil | `-->` solid, `-.->` stipled, `==>` tyk |
| Kant-label | `A -- "label" --> B` |
| Subgraph | `subgraph id ... end` |

## SequenceDiagram

| Element | Syntaks |
|---------|--------|
| Deltager | `participant A as Visningsnavn` |
| Synkron kald | `A->>B: besked` |
| Asynkron | `A->>B: besked` (samme; stipled: `A-->>B`) |
| Note | `note right of A: tekst` |
| Alternativ | `alt betingelse` / `else` / `end` |
| Loop | `loop hver uge` ... `end` |

## ClassDiagram

| Element | Syntaks |
|---------|--------|
| Kasse | `class Navn { +felt: type +metode() }` |
| Kardinalitet | `A "1" --> "*" B` |
| Relationer | `-->` forbundet, `--*` indeholder, `--o` aggregering, `||--||` 1-til-1 |

## Særtegn i labels

- Citater i node-tekst: brug `"` eller `'`; undgå `[` `]` `()` `{}` i teksten – brug citationstegn om hele label: `A["Label (med parentes)"]`.
