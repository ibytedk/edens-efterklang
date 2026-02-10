---
name: ascii-dungeon-maps
description: Tegner imponerende ASCII-dungeonkort med fuld tegnpalet (box-drawing, ■□, ☼▲▼, gulvvariation, objekter, væsener). Brug når brugeren beder om dungeon map, kælderkort, ruin-kort eller ASCII-kort til rollespil (D&D, BECMI, OSR). Målet er visuelt stærke kort, ikke kun minimum.
---

# ASCII-dungeonkort — imponerende og nøjagtige

Dette skill definerer hvordan man laver **imponerende** ASCII-dungeonkort: korrekte i layout, men også visuelt rigt med den fulde tegnpalet, tydelig atmosfære og læsbar komposition. Minimum er korrekt; **standard er imponerende**.

---

## 0. Imponerende vs. minimum

| Minimum (undgå som slutresultat) | Imponerende (mål) |
|--------------------------------|-------------------|
| Kun `#` `.` `+` `/` | Box-drawing eller blokke + ■ □ + gulvvariation |
| Ét tomt rum, ingen detaljer | Rum med ildsted (☼), trapper (▲▼), objekter (◊●), evt. væsener (☺☻) |
| Flad, ens gulv overalt | Gulvvariation (· ◦ ░) hvor det giver mening |
| Ingen atmosfære | Tydelige rum-funktioner (bål, alter, pit, vand) |
| Kortet kun “rigtigt” | Kortet ser ud som et rigtigt kort man vil bruge ved bordet |

---

## 1. Grundprincipper

- **Monospace:** Altid bruge et fastbredtefont (fx Consolas, Courier, Source Code Pro). Én karakter = én celle.
- **Skala:** 1 celle = 1 kvadrat (typisk 5 ft / 1,5 m) medmindre andet er angivet.
- **Nord:** Angiv retning (fx "N ↑") ved legend eller øverst, så kortet er entydigt orienteret.
- **Legend:** Hvert kort skal have en kort legend med de symboler, der faktisk bruges på kortet.

---

## 2. Kanonisk symboltabel

Brug **kun** disse tegn (eller tegn fra [reference.md](reference.md)). Opfind ikke egne symboler uden at tilføje dem til tabellen og legend.

| Symbol | Betydning | Noter |
|--------|-----------|--------|
| `#` | Væg (solid) | Ydre og indre vægge, blokerer sigt og passage |
| `.` | Gulv / gang | Passerbar, åben |
| `■` | **Lukket dør** | Foretrukket (Unicode); ellers brug `+` |
| `□` | **Åben dør** | Foretrukket (Unicode); ellers brug `/` |
| `+` | Lukket dør | Kun ved ren ASCII (alternativ til ■) |
| `/` | Åben dør | Kun ved ren ASCII (alternativ til □) |
| `=` | Hemmelig dør | Skjult indgang; vises kun når opdaget (eller på DM-kort) |
| `<` | Trappe op | Til etage over / ud |
| `>` | Trappe ned | Til etage under / dybere |
| `~` | Vand / sump | Svær eller farlig passage |
| `0` | Afgrund / pit | Fald, kan ikke passeres uden udstyr |
| `*` | Fælde | Generel fælde (specificér i tekst, ikke på kortet) |
| `X` | Møbel / objekt | Brug evt. undertekst: "X = alter", "X = seng" |

**Døre:** Én celle pr. dør. ■ = lukket dør, □ = åben dør. For dobbelte døre: to celler med samme symbol. Ved ren ASCII: brug `+` og `/`.

**Vægge:** Ved ren ASCII bruges `#` overalt. For box-drawing og flere tegn (blokke, pile, mønstre) se [reference.md](reference.md).

---

## 3. Layout-regler

1. **Rammet:** Omkring hele kortet skal der være mindst én række/kolonne `#`, så væggene er lukkede.
2. **Ingen løse ender:** Gange ender i dør (`■`/`□`/`+`/`/`) eller i trappe (`<`/`>`) eller i anden passage; undgå gulv (`.`) der hænger frit i luften uden forbindelse til væg.
3. **Lige linjer:** Gange og vægge skal være lige (horisontalt/vertikalt) medmindre kurver er bevidst designet; brug mellemrum og `#` konsekvent så kolonnerne stemmer.
4. **Luft omkring:** Lad der være mindst én tom linje mellem kortet og evt. titel/tekst under, så det ikke klistrer sammen i paste.

### 3.1 Kritiske regler (undgå volapyk)

- **Dør ligger altid I en væg.** Symbolet for dør (`■` `□` `+` `/` `=`) må kun stå der, hvor en væg er *gennembrudt*: i samme række (vandret væg) eller samme kolonne (lodret væg) skal der være væg (`#` eller box-tegn) på begge sider af døren. **Aldrig** en dør omgivet af gulv (`.`) på begge sider — det giver "dør midt i rummet".
- **Ydre vægge er ubrudte.** Øverste og nederste række og yderste venstre og højre kolonne skal kun indeholde væg (`#` eller box-tegn) — undtagen præcis de celler, der er indgang/udgang (én dør eller trappe). **Aldrig** gulv (`.`) inde i væglinjen; det betyder "gulv i væggen".
- **Indre vægge (skillevægge) hænger sammen.** En væg mellem to rum er én sammenhængende linje: alle celler i den linje er væg, undtagen hvor der er dør. Fx i en lodret skillevæg: samme kolonne har væg i hver række, undtagen den række hvor døren er. Så væg → dør → væg; aldrig væg → gulv → dør → gulv → væg.

---

## 4. Format for det færdige kort

Brug denne rækkefølge:

```
[Titel på kortet – evt. etage/niveau]

    N ↑
###########
#....#....#
#....+....#
#....#....#
###########

Legend: # væg  . gulv  + dør
```

Med Unicode-døre (■ lukket, □ åben):

```
###########
#....#....#
#....□....#
#....#....#
###########
Legend: # væg  . gulv  ■ lukket dør  □ åben dør
```

Her er **to rum** adskilt af en **lodret væg**; døren er den eneste celle i den kolonne der ikke er `#`. Først **titel** (valgfri).
- Så **retningsmarkør** (N ↑ eller "Nord op").
- Så **selve kortet** i monospace, uden ekstra mellemrum inden i selve gridet (mellemrum er kun til indrykning af hele blokken).
- Til sidst **Legend:** kun de symboler der optræder på kortet, korte labels.

---

## 5. Eksempel: lille kælder

```
Kælder under taverne – niveau 1

      N ↑
#############
#...........#
#...........#
#.........<.#
#...........#
####+########

Legend: # væg  . gulv  + dør (i sydvæg)  < trappe op
```

Ét rum. Ydre vægge kun `#`; **dør** i den nederste væg (syd) — døren er én celle i den række der ellers er `#`; **trappe op** på gulvet. Ingen gulv i væggen, ingen dør midt i rummet.

---

## 6. Eksempel: rum med trappe ned og vand

```
Ruin – underetage

         N ↑
###################
#.................#
#.......~.........#
#.......~....>....#
#.................#
###################

Legend: # væg  . gulv  ~ vand  > trappe ned
```

Ét rum. Ydre vægge ubrudte (én `#` pr. kolonne i sidekanterne); vand (`~`) og trappe ned (`>`) på gulvet.

---

## 7. Hvad gør et kort imponerende

- **Vægge:** Brug box-drawing (`┌` `─` `┐` `│` `└` `┴` `┘` `├` `┤` `┬` `╔` `═` `╗` …) eller blokke (`█` `▀` `▄`) — ikke kun `#` medmindre ren ASCII er krav.
- **Døre:** Brug ■ (lukket) og □ (åben) så dørene er tydelige og pæne.
- **Trapper:** Brug ▲ (op) og ▼ (ned) i stedet for `<` `>` når Unicode er tilladt.
- **Atmosfære:** Mindst ét af: ildsted/bål (☼), vand (~), trappe (▲▼), objekt (◊ ● %), eller væsen (☺ ☻) så kortet fortæller noget.
- **Gulv:** Varier med `·` `◦` `░` i gange eller særlige zoner så det ikke er ét fladt `.`-hav.
- **Komposition:** Rum med tydelig funktion (indgang, kammer, gang, farlig zone) — ikke ét stort tomt rektangel.
- **Størrelse:** Større kort (fx 15–25 brede, 8–15 høje) med flere rum og forbindelser ser mere “rigtige” ud end små 5×5-bokse.

Se [reference.md](reference.md) for hele paletten og **guldstandard-eksemplet** nedenfor.

---

## 8. Guldstandard-eksempel (imponerende kort)

Dette kort bruger box-drawing, ■□, ▲▼, ☼, ◊, ☻ og gulvvariation. Brug det som skabelon for “imponerende”.

```
Ruin – nedgang til krypten                    N ↑

  ╔═════╦═════╗
  ║·····║·····║
  ║··☼··■··▼··║
  ║·····║··◊··║
  ╠═════╬═════╣
  ║···········║
  ║····☻······║
  ╚═════╩═════╝
        ║
        □

Legend: ═║╔╗╚╝╠╣╦╩ væg  · gulv  ■ lukket dør  □ åben (indgang)  ▼ trappe ned
        ☼ ildsted  ◊ alter/sarkofag  ☻ fjende/væsen
```

- **Vægge:** Dobbelt box-drawing (╔═╗ ║ ╚╩╝) giver tydelige rum.
- **Døre:** ■ mellem de to øverste rum (lukket); □ i syd (indgang).
- **Trappe:** ▼ i østkammer (ned til krypt).
- **Atmosfære:** ☼ bål i vestkammer, ◊ alter i øst, ☻ fjende i gangen.
- **Gulv:** · overalt; kan erstattes med ░ i gange eller ◦ ved alter for ekstra nuance.

---

## 9. Tjekliste før levering

**Korrekthed (skal opfyldes):**
- [ ] Kun tegn fra kanonisk tabel eller [reference.md](reference.md); alle i legend
- [ ] Monospace; nord angivet; legend med alle brugte symboler
- [ ] Vægge lukker; **ydre vægge ubrudte** (ingen gulv i væglinjen)
- [ ] **Døre kun i vægge:** ■ □ + / = har væg på begge sider
- [ ] Skillevægge sammenhængende
- [ ] Kun ASCII/Unicode i selve kortet (ingen billeder)

**Imponerende (stræb mod):**
- [ ] Box-drawing eller blokke til vægge (ikke kun `#` uden grund)
- [ ] ■ □ til døre; ▲ ▼ til trapper (når Unicode tilladt)
- [ ] Mindst ét “atmosfære-element”: ☼ ~ ▲ ▼ ◊ ● ☺ ☻ eller tilsvarende
- [ ] Gulvvariation eller flere rum med tydelig funktion
