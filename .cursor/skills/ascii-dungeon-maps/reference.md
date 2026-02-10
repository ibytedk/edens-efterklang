# ASCII-dungeonkort — reference og udvidede tegn

Alle tegn her må bruges på kort; **skriv dem altid i legend** hvis de optræder. Bland ikke ren ASCII (`#` `.` `+` `/`) med Unicode-vægge (box-drawing) i **samme væglinje** — vælg én stil per kort.

### Hurtig oversigt (alle tegn fra paletten)

| Kategori | Tegn |
|----------|------|
| **Vægge (box-drawing)** | `─` `│` `┌` `┐` `└` `┘` `├` `┤` `┬` `┴` `┼` `═` `║` `╒` `╓` `╔` `╕` `╖` `╗` `╘` `╙` `╚` `╛` `╜` `╝` `╞` `╟` `╠` `╡` `╢` `╣` `╤` `╥` `╦` `╧` `╨` `╩` `╪` `╫` `╬` |
| **Vægge (blokke)** | `█` `▀` `▄` `▌` `▐` |
| **Gulv / underlag** | `░` `▒` `▓` `▪` `▫` `▬` |
| **Retning / trapper** | `▲` `▼` `►` `◄` |
| **Objekter / former** | `◊` `○` `◌` `●` `◘` `◙` `◦` |
| **Ild / lys** | `☼` |
| **Væsener / markører** | `☺` `☻` `♠` `♣` `♥` `♦` |

---

## Døre (foretrukne Unicode)

| Symbol | Unicode | Betydning |
|--------|---------|-----------|
| `■` | U+25A0 | Lukket dør (solid blok) |
| `□` | U+25A1 | Åben dør (tom ramme) |

---

## Vægge — box-drawing og blokke

**Enkelt linje:** `─` `│` `┌` `┐` `└` `┘` `├` `┤` `┬` `┴` `┼`  
Vandret, lodret, hjørner, T-stykker, kryds.

**Dobbelt linje (tykke vægge):**  
`═` `║` `╒` `╓` `╔` `╕` `╖` `╗` `╘` `╙` `╚` `╛` `╜` `╝` `╞` `╟` `╠` `╡` `╢` `╣` `╤` `╥` `╦` `╧` `╨` `╩` `╪` `╫` `╬`  
Brug til forsterkede mure, ydervægge eller “vigtige” rum.

**Blokke (solide vægge / fyld):**

| Tegn | Unicode | Brug |
|------|---------|------|
| `█` | U+2588 | Fuld blok — solid væg, mørkt felt |
| `▀` `▄` | U+2580, U+2584 | Halv blok op/ned — trappetrin, vægkant |
| `▌` `▐` | U+258C, U+2590 | Halv blok venstre/højre — tynd væg, pilaster |

**Regel:** Brug enten kun `#` (ren ASCII) eller én box-drawing/blok-stil i samme kort; bland ikke i samme væglinje.

---

## Gulv og underlag

| Symbol | Unicode | Betydning |
|--------|---------|-----------|
| `.` | — | Standard gulv (ASCII) |
| `·` | U+00B7 | Finere gulv / grus |
| `◦` | U+25E6 | Let gulv / sti |
| `░` `▒` `▓` | U+2591–2593 | Lys/mellem/mørk skravering — bro, flise, jord |
| `▀` `▄` | U+2580, U+2584 | Halvblokke — trappetrin, niveauforskel |
| `▪` `▫` | U+25AA, U+25AB | Lille kvadrat (fyldt/tom) — flise, tern |
| `▬` | U+25AC | Vandret rektangel — bro, bjælke, line |

---

## Trapper og retning

| Symbol | Betydning |
|--------|-----------|
| `<` `>` | Trappe op / ned (ASCII) |
| `▲` `▼` | Trappe op / ned (trekant, tydeligere) |
| `△` `▽` | Trappe op / ned (tom trekant) |
| `◄` `►` | Passage øst/vest eller skrå |
| `↑` `↓` | Nord/syd eller strømning |

---

## Vand, fælder og fare

| Symbol | Betydning |
|--------|-----------|
| `~` | Vand / sump (ASCII) |
| `≈` | Strømmende vand |
| `*` | Fælde (ASCII) |
| `●` (solid) | Fælde / punkt af interesse |
| `○` (tom cirkel) | Brønd / åbning / pit |
| `0` | Afgrund / pit (ASCII) |

---

## Ildsted og bålsted

| Symbol | Unicode | Betydning |
|--------|---------|-----------|
| `☼` | U+263C | Sol/ild — bål, ildsted, fakkelgruppe |
| `●` | U+25CF | Glød / kul (ved ildsted) |
| `◙` | U+25D9 | Mørk cirkel — sodet ildsted / slukket bål |

Angiv i legend fx: `☼` ildsted, `●` glød.

---

## Monstre og væsener

| Symbol | Unicode | Betydning |
|--------|---------|-----------|
| `☺` | U+263A | Venlig / neutral NPC / start |
| `☻` | U+263B | Fjendtlig / urolig væsen |
| `◘` | U+25D8 | Invers bullet — monster / uidentificeret |
| `◙` | U+25D9 | Mørk cirkel — skabning / skygge |
| `♠` `♣` `♥` `♦` | U+2660–2666 | Faction / type (fx ork, undead, dyr) — angiv i legend |

Brug én konsistent betydning per kort (fx ☺ = NPC, ☻ = fjende).

---

## Møbler og objekter

| Symbol | Unicode | Betydning |
|--------|---------|-----------|
| `X` | — | Generelt møbel/objekt (ASCII) |
| `%` | — | Sarkofag / kiste |
| `◆` `◇` | U+25C6, U+25C7 | Skat / vigtig genstand (fyldt / tom diamant) |
| `◊` | U+25CA | Rombe / lozenge — alter, podium, kiste |
| `○` `●` | U+25CB, U+25CF | Tom/fyldt cirkel — bord, skål, lykt |
| `A` `B` | — | Alter, bord/seng (angiv i legend) |
| `▓` `█` | U+2593, U+2588 | Tung møbel / blokeret felt |

---

## Markører og særlige rum

| Symbol | Unicode | Betydning |
|--------|---------|-----------|
| `•` | U+2022 | Lille genstand / lykt / bullet |
| `◎` | U+25CE | Centrum / fokus |
| `◌` | U+25CC | Tom cirkel (placeholder) — tom plads, mærke |
| `☺` `☻` | U+263A, U+263B | Start / mål (eller som monstre, se ovenfor) |
| `♠` `♣` `♥` `♦` | U+2660–2666 | Faction / rum-type (angiv i legend) |

---

## Eksempel med box-drawing og ■/□

```
    N ↑
┌───────┬───────┐
│.......│.......│
│.......■.......│
│.......□.......│
└───────┴───────┘

Legend: ─│┌┐└┘ væg  . gulv  ■ lukket dør  □ åben dør
```

---

## Imponerende kort — anbefalinger

- **Vægge:** Brug dobbelt box-drawing (╔═╗ ║ ╚╩╝ ╠╬╣) til ydre ramme og vigtige rum; enkelt (┌─┐ │ └┴┘) til indre skillevægge.
- **Døre:** Altid ■ (lukket) og □ (åben) når Unicode er tilladt.
- **Trapper:** ▲ (op) og ▼ (ned) i stedet for `<` `>`.
- **Atmosfære:** Mindst ét af: ☼ (ildsted), ~ (vand), ▲▼ (trapper), ◊ ● % (alter/kiste/skat), ☺☻ (NPC/fjende).
- **Gulv:** Brug · eller ◦ i rum; ░ eller ▬ i gange eller ved broer for visuel variation.
- **Rum-funktion:** Giv hvert rum en rolle (indgang, kammer med alter, gang med fjende, trappe ned) så kortet fortæller en historie.
- **Størrelse:** Sig efter 15–25 tegn i bredden og 8–15 linjer i højden for kort der føles “rigtige”.

---

## Ren ASCII (maksimal kompatibilitet)

Til mails, gamle terminaler eller krav om kun 7-bit: brug **kun** `#`, `.`, `+`, `/`, `=`, `<`, `>`, `~`, `0`, `*`, `X`, mellemrum og linjeskift. Undgå ■ □ og alle andre Unicode-tegn.
