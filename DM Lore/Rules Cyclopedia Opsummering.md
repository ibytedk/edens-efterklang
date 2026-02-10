# Rules Cyclopedia — Opsummering for AI DM

Kompakt reference til D&D Rules Cyclopedia (Aaron Allston, TSR 1991). 306 sider destilleret til kerneregler, tabeller og procedurer.

---

## Bogens struktur

- **Kap 1–5:** Karakterskabelse (klasser, spells, udstyr, weapon mastery, general skills)
- **Kap 6–9:** Regler (bevægelse, encounters, kamp, massekamp/War Machine)
- **Kap 10–11:** Erfaring, NPCs (retainers, mercenaries, specialists)
- **Kap 12:** Strongholds & Dominions (fæstningsbyggeri, domæneadministration)
- **Kap 13:** DM-procedurer (ability checks, charm, klatring, døre, mapping, special conditions)
- **Kap 14:** Monstre (komplet monsterliste med stats)
- **Kap 15:** Immortals (sfærer, PP, stier til udødelighed)
- **Kap 16:** Treasure (mønter, gems, magiske genstande, artefakter, spell research)
- **Kap 17:** Campaigning (tone, design, settings, adventures)
- **Kap 18:** Planes of Existence (Ethereal, Elemental, Outer Planes)
- **Kap 19:** Variant Rules
- **Appendix 1:** D&D Game World (Known World/Mystara, Hollow World)
- **Appendix 2:** AD&D konvertering

---

## Karakterskabelse (Kap 1)

### Trin
1. Rul 3d6 for STR, INT, WIS, DEX, CON, CHA
2. Vælg klasse
3. Justér evnepoint (2:1 trade mod prime req, min 9, DEX/CON/CHA kan ikke sænkes)
4. Rul HP (d8 fighter, d6 cleric/elf/halfling, d4 MU/thief)
5. Rul 3d6×10 gp startpenge
6. Køb udstyr
7. Beregn AC, attack rolls, saving throws
8. Vælg alignment (Law/Neutral/Chaos)
9. Navn, personlighed, baggrund

### Klasser

| Klasse | Prime Req | HD | Max Niv | Krav |
|--------|-----------|-----|---------|------|
| Cleric | WIS | d6 | 36 | Ingen |
| Fighter | STR | d8 | 36 | Ingen |
| Magic-User | INT | d4 | 36 | Ingen |
| Thief | DEX | d4 | 36 | Ingen |
| Dwarf | STR | d8 | 12 | CON 9 |
| Elf | STR+INT | d6 | 10 | INT 9 |
| Halfling | STR+DEX | d6 | 8 | DEX 9, CON 9 |
| Druid | WIS | – | 36 | Neutral, niv 9 cleric først |
| Mystic | STR+DEX | d6 | 16 | WIS 13, DEX 13 |

Demihumaner der når max level fortsætter med Attack Ranks (A–M): bedre THAC0/saves, ikke flere HP.

---

## Evnepoint-modifiers

| Score | Mod |
|-------|-----|
| 3 | -3 |
| 4–5 | -2 |
| 6–8 | -1 |
| 9–12 | 0 |
| 13–15 | +1 |
| 16–17 | +2 |
| 18 | +3 |

STR→melee hit/skade. INT→sprog, skills. WIS→saves vs magi. DEX→AC, missile, init. CON→HP/HD. CHA→reaction, hirelings.

---

## Kamp (Kap 8)

### Kampsekvens pr. runde (10 sek)
1. Morale check (hvis trigger)
2. Bevægelse (1/3 mv rate)
3. Missile-angreb
4. Magi (afbrydes ved skade)
5. Melee

### Initiative
Gruppeinitiativ 1d6/side, lavest først. Uafgjort=simultant. To-hånds: -1.

### THAC0
1d20 ≥ THAC0 − mål-AC = hit. Nat 20=altid hit. Nat 1=altid miss.

### THAC0 Progression

| Niv | Fighter | Cleric | MU/Thief |
|-----|---------|--------|----------|
| 1–3 | 19 | 19 | 19 |
| 4–6 | 17 | 19 | 19 |
| 7–9 | 15 | 17 | 17 |
| 10–12 | 13 | 17 | 15 |
| 13–15 | 11 | 15 | 15 |
| 16–18 | 9 | 15 | 13 |
| 19–21 | 7 | 13 | 13 |
| 22–24 | 5 | 13 | 11 |
| 25–27 | 3 | 11 | 11 |
| 28–30 | 2 | 11 | 9 |
| 31–36 | 2 | 9 | 7–9 |

### Rustning

| Type | AC |
|------|-----|
| Ingen | 9 |
| Læder | 7 |
| Skæl | 6 |
| Kæde (chain) | 5 |
| Båndet (banded) | 4 |
| Plade | 3 |
| +Skjold | -1 |

### Våben (udvalgte)

| Våben | Skade | Range | Notes |
|-------|-------|-------|-------|
| Daggert | 1d4 | 10/20/30 | Kan kastes |
| Kort sværd | 1d6 | – | |
| Langsværd | 1d8 | – | |
| To-hånds sværd | 1d10 | – | -1 init |
| Krigsøkse | 1d8 | – | |
| Stav | 1d6 | – | To-hånds |
| Kort bue | 1d6 | 50/100/150 | |
| Lang bue | 1d6 | 70/140/210 | |
| Let armbrøst | 1d6 | 60/120/180 | Slow reload |

### Special manøvrer
- Fighting withdrawal: 1/2 mv, ingen gratis angreb
- Full retreat: fuld mv, modstander får gratis angreb
- Set spear vs charge: dobbelt skade
- Lance charge: dobbelt skade fra hest
- Parry: -2 til modstanders angreb

### HP & healing
0 HP=bevidstløs. -1 HP=død (ingen death saves i BECMI). Naturlig: 1d3 HP/fuld hviledag. CLW: 1d6+1. CSW: 2d6+2.

---

## Saving Throws (Kap 8)

Kategorier: D(Død/Gift), W(Stav), P(Forstening), B(Drageånde), S(Spells)

**Fighter/Dwarf/Halfling:** Niv 1–3: 12/13/14/15/16. Niv 4–6: 10/11/12/13/14. Niv 7–9: 8/9/10/10/12.

**Cleric:** Niv 1–4: 11/12/14/16/15. Niv 5–8: 9/10/12/14/12.

**MU/Elf:** Niv 1–5: 13/14/13/16/15. Niv 6–10: 11/12/11/14/12.

**Thief:** Niv 1–4: 13/14/13/16/15. Niv 5–8: 12/13/11/14/13.

Normal menneske: 14/15/16/17/17.

---

## Morale & Reaction (Kap 7–8)

**Morale (2d6):** ≤ score=kæmper. Triggers: første tab, halvdelen faldet, leder ned. Standard: Kobold 6, Goblin 7, Orc 8, Ogre 9, Dragon 10–11.

**Reaction (2d6+CHA):** 2–3 fjendtlig | 4–5 uvenlig | 6–8 neutral | 9–10 venlig | 11–12 hjælpsom.

---

## Magi (Kap 3)

### MU Spell Slots

| Niv | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|-----|---|---|---|---|---|---|---|---|---|
| 1 | 1 | – | – | – | – | – | – | – | – |
| 3 | 2 | 1 | – | – | – | – | – | – | – |
| 5 | 2 | 2 | 1 | – | – | – | – | – | – |
| 7 | 3 | 2 | 2 | 1 | – | – | – | – | – |
| 9 | 3 | 3 | 2 | 2 | 1 | – | – | – | – |
| 14 | 5 | 5 | 5 | 3 | 2 | 1 | – | – | – |
| 21 | 6 | 6 | 6 | 6 | 5 | 5 | 3 | – | – |
| 29 | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 5 | 3 |
| 36 | 9 | 9 | 9 | 9 | 9 | 8 | 7 | 6 | 5 |

### Cleric Spell Slots

| Niv | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|-----|---|---|---|---|---|---|---|
| 1 | 1 | – | – | – | – | – | – |
| 3 | 2 | 1 | – | – | – | – | – |
| 5 | 2 | 2 | 1 | – | – | – | – |
| 9 | 3 | 3 | 3 | 2 | 1 | – | – |
| 21 | 8 | 8 | 7 | 6 | 4 | 3 | 1 |
| 36 | 9 | 9 | 9 | 9 | 9 | 8 | 6 |

### Nøglespells
**MU:** Sleep, Magic Missile, Charm Person, Light, Shield (1). Web, Invisibility, Knock, Mirror Image, ESP (2). Fireball, Lightning Bolt, Dispel Magic, Fly, Haste (3). Dimension Door, Polymorph Self, Wall of Fire (4). Teleport, Cloudkill, Wall of Stone, Animate Dead (5).

**Cleric:** Cure Light Wounds, Detect Evil, Protection from Evil, Remove Fear (1). Bless, Find Traps, Hold Person, Silence 15' (2). Cure Disease, Remove Curse, Striking (3). Cure Serious Wounds, Neutralize Poison (4). Raise Dead, Cure Critical Wounds, Quest (5).

**Regler:** Memorization efter 8t hvile. MU kræver spellbook. Afbrydelse ved skade. Spell research mulig (tid+guld).

---

## Thief Skills (Kap 2)

| Skill | Niv 1 | Niv 5 | Niv 9 | Niv 14 |
|-------|-------|-------|-------|--------|
| Open Locks | 15% | 35% | 60% | 80% |
| Find/Remove Traps | 10% | 25% | 50% | 70% |
| Climb Walls | 87% | 91% | 95% | 97% |
| Move Silently | 20% | 35% | 55% | 75% |
| Hide in Shadows | 10% | 25% | 45% | 65% |
| Pick Pockets | 20% | 35% | 55% | 75% |
| Hear Noise | 1-in-6 | 2-in-6 | 3-in-6 | 4-in-6 |

**Backstab:** +4 angreb, ×2 skade (niv 1–4), ×3 (5–8), ×4 (9+).

---

## Turn Undead (Kap 2)

| Cleric niv | Skeleton | Zombie | Ghoul | Wight | Wraith | Mummy | Spectre | Vampire |
|-----------|----------|--------|-------|-------|--------|-------|---------|---------|
| 1 | 7 | 9 | 11 | – | – | – | – | – |
| 2 | T | 7 | 9 | 11 | – | – | – | – |
| 3 | T | T | 7 | 9 | 11 | – | – | – |
| 5 | D | T | T | 7 | 9 | 11 | – | – |
| 7 | D | D | T | T | 7 | 9 | 11 | – |
| 9 | D | D | D | T | T | 7 | 9 | 11 |

T=auto turned. D=auto destroyed. Tal=2d6 ≥ tal.

---

## Weapon Mastery (Kap 5)

| Rank | Min niv | Angreb | Skade | AC |
|------|---------|--------|-------|----|
| Basic | 1 | +0 | +0 | +0 |
| Skilled | 4+ | +2 | +2 | +2 |
| Expert | 8+ | +3 | +1d6 | +3 |
| Master | 12+ | +4 | +2d6 | +4 |
| Grand Master | 16+ | +5 | +3d6 | +5 |

Slots: Fighter 4+1/3niv. Cleric 2+1/4niv. MU 1+1/6niv. Thief 2+1/4niv. Kræver træner, tid, penge.

---

## General Skills (Kap 5)

4 slots niv 1 + INT bonus. +1/4 niveauer. Check: 1d20 ≤ ability score. Modifiers: -4 let → +4 svært.

Eksempler: Riding(DEX), Tracking(INT), Knowledge(INT), Craft(INT/DEX), Persuasion(CHA), Survival(INT), Navigation(INT), Alertness(DEX), Nature Lore(INT).

---

## Bevægelse & Encumbrance (Kap 6)

| Last (cn) | Movement |
|-----------|----------|
| 0–400 | 120'(40') |
| 401–600 | 90'(30') |
| 601–800 | 60'(20') |
| 801–1600 | 30'(10') |
| 1601+ | Immobil |

10 mønter = 1 cn. Dungeon exploration=mv rate/turn. Kamp=1/3/runde. Wilderness=mv÷5 miles/dag.

Terrain: Vej ×1.5, Slette ×1, Skov/bakker ×2/3, Bjerge/sump ×1/2, Jungle ×1/3.

---

## Encounters & DM-procedurer (Kap 7, 13)

### Dungeon Turn-sekvens (1 turn=10 min)
1. Wandering monster check (1d6, 1=encounter, hvert 2. turn)
2. Spillere erklærer handling
3. DM afgør tid
4. Resultat → registrér tid (fakler 6 turns, lanterner 24 turns)

### Encounter-procedure
1. Distance: 2d6×10 fod (dungeon), 4d6×10 yards (wilderness)
2. Surprise: 1d6, 1–2=overrasket
3. Reaction: 2d6+CHA
4. Initiative: 1d6/side, lavest først
5. Kampsekvens → morale checks

### Dungeon Stocking (1d6 pr. rum)
1=Monster | 2=Monster+skat | 3=Fælde | 4=Special | 5=Tom(spor) | 6=Tom

### Wilderness (daglig)
Retning → bevægelse → encounter check (1-in-6/fase) → navigation (1–2/6=vild i svært terrain) → rationer → camp.

### Lys
Fakkel: 30', 6 turns. Lanterne: 30', 24 turns. Infravision: 60' (ophæves af lys).

### Døre
Lytte: 1-in-6 (2-in-6 demihumaner). Åbne fastklemt: STR check / 2-in-6. Hemmelige: 1-in-6 (2-in-6 elver).

---

## Treasure & XP (Kap 10, 16)

### 1 gp fundet = 1 XP (primær XP-kilde!)

### XP fra monstre (udvalgte HD)
Under 1: 5. 1 HD: 10. 2: 20. 3: 35. 4: 75. 5: 175. 6: 275. 7: 450. 8: 650. +bonus pr. special ability.

### Klasse XP-krav

| Niv | Fighter | Cleric | MU | Thief |
|-----|---------|--------|----|-------|
| 2 | 2000 | 1500 | 2500 | 1200 |
| 3 | 4000 | 3000 | 5000 | 2400 |
| 5 | 16000 | 12000 | 20000 | 9600 |
| 9 | 240000 | 100000 | 300000 | 160000 |

### Treasure Types (udvalgte)
A: 25% 1d6k cp, 30% 1d6k sp, 35% 1d6k gp, 50% 6d6 gems, 40% 3 magiske.
B: 50% 1d8k cp, 25% 1d6k sp, 25% 1d3k gp, 10% sværd/rustning.
D: 50% 1d6k gp, 30% 1d8 gems, 15% 2 magiske+1 potion.
Individual: J=1d8cp, K=1d8sp, L=1d8ep, M=1d8gp, N=1d6pp.

---

## NPCs (Kap 11)

**Retainers:** Langvarige, halv skat-andel. Max=CHA-baseret (CHA 3=1, 18=7). Morale base 7.
**Mercenaries:** Korttid, daglig betaling. Kæmper kun i masse.
**Specialists:** Armorer, blacksmith, sage, spy, etc. Månedlig løn.

---

## Strongholds & Dominions (Kap 12)

Fighter niv 9: Fæstning, tiltrækker soldater. Cleric 9: Tempel, troende. MU 11: Tårn. Thief 9: Tyvegilde.

### Domæne (månedlig)
1. Skat: 1–10 gp/familie
2. Udgifter: garnison, vedligeholdelse
3. Morale: 2d6+mod
4. Event (d20): Monster/pest/dårlig høst/ambassadør/stabil/opdagelse/magtkamp/krig/anomali
5. Politik: naboer, handel, intriger

---

## War Machine (Kap 9)

BFR = tropper × HD × modifier. Terrain/ledelse/magi modifiers. d% rul → effektiv BFR → tab som % af tabende side. Terrain forsvar: Åbent +0, Bakker +10%, Skov +15%, Befæstning +30%, Fæstning +50%.

---

## Monstre (Kap 14)

Rules Cyclopedia indeholder ca. 200 monstre over 60 sider. Her er den komplette liste med kernestats for hurtig DM-reference.

### Monstertyper
- **Normal/Giant/Prehistoric Animal:** Naturlige dyr (bats, bears, cats, horses, snakes, wolves + kæmpeversioner + dinosaurer)
- **Construct/Enchanted:** Skabt med magi (golems, gargoyles, living statues). Immune mod gift, charm, sleep. Healer ikke naturligt.
- **Dragon & Dragon-Kin:** Drager (white–gold + gemstone) + chimera, hydra, salamander, wyvern.
- **Humanoid:** Goblinoids, orcs, gnolls, ogres, giants, lizardfolk, humans, demihumans.
- **Lowlife:** Insects, slimes, oozes, molds, fungi, worms.
- **Monster:** Øvrige (beholder, basilisk, medusa, unicorn, etc.).
- **Planar:** Væsener fra andre planer (djinni, efreeti, elementals, planar spiders).
- **Undead:** Skeleton, zombie, ghoul, wight, wraith, mummy, spectre, vampire, lich, spirits.

*=kræver magisk våben. **=ekstra special abilities (mere XP).

### Special Angrebsformer (oversigt)
- **Charge:** +2 hit, dobbelt skade, ender bevægelse
- **Energy Drain:** Taber 1–2 niveauer, ingen save
- **Paralysis:** Save vs paralysis eller immobiliseret
- **Petrification:** Save vs petrification eller forstenet
- **Poison:** Save vs poison eller dø
- **Breath Weapon:** Save vs dragon breath for halv skade
- **Swallow:** Nat 20 = slugt, skade pr. runde, -4 angreb indefra (AC 7)
- **Swoop:** Flyvende charge, dobbelt skade ved surprise, griber bytte ved 18+

### Monsterliste A–B

| Monster | AC | HD | Mv | Angreb | Skade | Morale | TT | XP |
|---------|-----|------|------|--------|-------|--------|-----|------|
| Ant, Giant | 3 | 4* | 180' | 1 bite | 2d6+poison | 12 | U | 125 |
| Ape, White/Snow | 6 | 4 | 120' | 2 claws | 1d4/1d4 | 7 | Nil | 75 |
| Basilisk | 4 | 6+1** | 60' | 1 bite+gaze | 1d10+petrif | 9 | F | 950 |
| Bat, Normal | 6 | 1 hp | 120'fly | confusion | – | 6 | Nil | – |
| Bat, Giant | 6 | 2 | 180'fly | 1 bite | 1d4 | 8 | Nil | 20 |
| Bear, Black | 6 | 4 | 120' | 2 claws/bite | 1d3/1d3/1d6 | 7 | U | 75 |
| Bear, Grizzly | 6 | 5 | 120' | 2 claws/bite | 1d4/1d4/1d8 | 8 | U | 175 |
| Bear, Cave | 5 | 7 | 120' | 2 claws/bite+hug | 1d8/1d8/2d6 | 9 | V | 450 |
| Beetle, Fire | 4 | 1+2 | 120' | 1 bite | 2d4 | 7 | Nil | 15 |
| Beetle, Oil | 4 | 2* | 120' | 1 bite+oil | 1d6+blistering | 8 | Nil | 25 |
| Beetle, Tiger | 3 | 3+1 | 150' | 1 bite | 2d6 | 9 | U | 50 |
| Beholder | 0/7 | 11** | 30' | 1 bite+eye rays | 2d8+specials | 10 | I,L,O | 3700 |
| Black Pudding | 6 | 10* | 60' | 1 | 3d8+dissolve | 12 | Nil | 1750 |
| Blink Dog | 5 | 4* | 120' | 1 bite | 1d6 | 6 | C | 125 |
| Bugbear | 5 | 3+1 | 90' | 1 weapon | by weapon+1 | 9 | B | 75 |

### Monsterliste C–D

| Monster | AC | HD | Mv | Angreb | Skade | Morale | TT | XP |
|---------|-----|------|------|--------|-------|--------|-----|------|
| Caecilia | 6 | 6* | 60' | 1 bite | 1d8+swallow | 9 | B | 500 |
| Carrion Crawler | 7 | 3+1* | 120' | 8 tentacles | paralysis | 9 | B | 75 |
| Cat, Mountain Lion | 6 | 3+2 | 150' | 2 claws/bite | 1d3/1d3/1d6 | 8 | U | 50 |
| Cat, Panther | 4 | 4 | 210' | 2 claws/bite | 1d4/1d4/1d8 | 8 | U | 75 |
| Cat, Sabre-Tooth | 6 | 8 | 150' | 2 claws/bite | 1d8/1d8/2d8 | 10 | V | 650 |
| Centipede, Giant | 9 | ½* | 60' | 1 bite | poison(sicken) | 7 | Nil | 6 |
| Chimera | 4 | 9** | 120'/180'fly | 6 (claw/heads/breath) | var+3d6 fire | 9 | F | 2300 |
| Cockatrice | 6 | 5** | 90'/180'fly | 1 beak | 1d6+petrif | 7 | D | 425 |
| Crab, Giant | 2 | 3 | 60' | 2 pincers | 2d6/2d6 | 7 | Nil | 35 |
| Crocodile, Normal | 5 | 2 | 90'/90'swim | 1 bite | 1d8 | 7 | Nil | 20 |
| Crocodile, Large | 3 | 6 | 90'/90'swim | 1 bite | 2d8 | 7 | Nil | 275 |
| Crocodile, Giant | 1 | 15 | 90'/90'swim | 1 bite | 3d8 | 9 | Nil | 1350 |
| Cyclops | 5 | 13* | 90' | 1 club | 3d10 | 9 | E+5000gp | 2300 |
| Displacer Beast | 4 | 6* | 150' | 2 tentacles | 2d4/2d4 | 8 | D | 500 |
| Djinni | 5 | 7+1** | 90'/240'fly | 1 fist/whirlwind | 2d8 | 12 | Nil | 1250 |
| Doppleganger | 5 | 4* | 90' | 1 | 1d12 | 10 | E | 125 |
| Dragon Turtle | 0 | 30** | 60'/90'swim | 2 claw/bite/breath | var/steam | 10 | H×2 | spec |
| Dryad | 5 | 2** | 120' | charm | charm person | 6 | D | 30 |
| Dwarf | 4 | 1 | 60' | 1 weapon | by weapon | 8/10 | G | 10 |

### Drager (Dragon)

| Farve | AC | HD range | Breath | Terrain |
|-------|-----|----------|--------|---------|
| White | 3 | 6** | Cold cone | Arctic |
| Black | 2 | 7** | Acid line | Swamp |
| Green | 1 | 8** | Poison gas | Forest/Jungle |
| Blue | 0 | 9** | Lightning | Desert/Plains |
| Red | -1 | 10** | Fire cone | Mountain |
| Gold | -2 | 11** | Fire/Poison gas | Any |
| Crystal | -2 | 7** | Charm | Mountain |
| Onyx | -1 | 8** | Acid+darkness | Underground |
| Jade | 0 | 9** | Gas+disease | Jungle |
| Amber | 1 | 10** | Fire+clinging | Desert |
| Sapphire | -2 | 10** | Sound blast | Mountain |
| Ruby | -3 | 11** | Fire+concussive | Volcanic |

**Breath weapon:** Skade = dragons aktuelle HP (save for halv). 3×/dag. Breath shape varierer (cone/line/cloud). Drager kan kaste spells som MU+Cleric ved 3+ HD per age category.

**Dragon-alder:** Spawn(1 HD)→Young(2)→Juvenile(3)→Adult(4/5)→Old(6/7)→Ancient(8+). HD ganges med base.

**Sleeping/Subdual:** Sovende drager kan overraskes. Subdual mulig (slag under 0 HP med -HP som %).

### Monsterliste E–G

| Monster | AC | HD | Mv | Angreb | Skade | Morale | TT | XP |
|---------|-----|------|------|--------|-------|--------|-----|------|
| Efreeti | 3 | 10** | 90'/240'fly | 1 fist | 2d8 | 12 | Nil | 2500 |
| Elemental (Air) | -2 | 8/12/16* | 360'fly | 1 | 1d8/2d8/3d8 | 10 | Nil | var |
| Elemental (Earth) | -2 | 8/12/16* | 60' | 1 | 1d8/2d8/3d8 | 10 | Nil | var |
| Elemental (Fire) | -2 | 8/12/16* | 120' | 1 | 1d8/2d8/3d8 | 10 | Nil | var |
| Elemental (Water) | -2 | 8/12/16* | 60'/180'swim | 1 | 1d8/2d8/3d8 | 10 | Nil | var |
| Elf | 5 | 1+1* | 120' | 1 weapon | by weapon | 8/10 | E | 19 |
| Ferret, Giant | 5 | 1+1 | 150' | 1 bite | 1d8 | 8 | Nil | 15 |
| Fish, Giant (Cat/Pir/Rock/Stur) | var | 8–21 | swim | 1 bite | var | var | Nil | var |
| Gargoyle | 5 | 4** | 90'/150'fly | 2 claw/bite/horn | 1d4/1d4/1d6/1d4 | 11 | C | 175 |
| Gelatinous Cube | 8 | 4* | 60' | 1 | 2d4+paralysis | 12 | V | 125 |
| Ghoul | 6 | 2* | 90' | 2 claw/bite | 1d3/1d3/1d3+paralysis | 9 | B | 25 |
| Giant, Hill | 4 | 8 | 120' | 1 weapon | 2d8 | 8 | E+5000gp | 650 |
| Giant, Stone | 4 | 9 | 120' | 1 weapon | 3d6 | 9 | E+5000gp | 900 |
| Giant, Frost | 4 | 10+1 | 120' | 1 weapon | 4d6 | 9 | E+5000gp | 1350 |
| Giant, Fire | 4 | 11+2 | 120' | 1 weapon | 5d6 | 9 | E+5000gp | 1700 |
| Giant, Cloud | 4 | 12+2 | 120' | 1 weapon | 6d6 | 10 | E+5000gp | 2125 |
| Giant, Storm | 2 | 15** | 150' | 1 weapon+lightning | 8d6/15d6 bolt | 10 | E+5000gp | 2725 |
| Gnoll | 5 | 2 | 90' | 1 weapon | by weapon+1 | 8 | D | 20 |
| Gnome | 5 | 1 | 60' | 1 weapon | by weapon | 8 | C | 10 |
| Goblin | 6 | 1-1 | 90' | 1 weapon | by weapon | 7/9 | R,C | 5 |
| Golem (Wood) | 7 | 2+2* | 120' | 1 fist | 1d8 | 12 | Nil | 35 |
| Golem (Bone) | 2 | 6* | 120' | 4 weapons | 1d6 each | 12 | Nil | 500 |
| Golem (Amber) | 6 | 10* | 180' | 2 claw/bite | 2d6/2d6/2d10 | 12 | Nil | 1750 |
| Golem (Bronze) | 0 | 20** | 240' | 1 fist | 3d10+fire | 12 | Nil | 5975 |
| Gorgon | 2 | 8* | 120' | 1 horn/breath | 2d6/petrif | 8 | E | 1200 |
| Gray Ooze | 8 | 3* | 10' | 1 | 2d8+dissolve | 12 | Nil | 50 |
| Green Slime | 9 | 2** | 3' | 1 drip | dissolve→slime | 12 | Nil | 30 |
| Griffon | 5 | 7 | 120'/360'fly | 2 claw/bite | 1d4/1d4/2d8 | 8 | E | 450 |

### Monsterliste H–L

| Monster | AC | HD | Mv | Angreb | Skade | Morale | TT | XP |
|---------|-----|------|------|--------|-------|--------|-----|------|
| Halfling | 7 | 1-1 | 90' | 1 weapon | by weapon | 7/10 | var | 5 |
| Harpy | 7 | 3* | 60'/150'fly | 2 claw/weapon+song | 1d4/1d4/1d6+charm | 7 | C | 50 |
| Hellhound | 4 | 3–7* | 120' | 1 bite+breath | 1d6+fire (per HD) | 9 | C | var |
| Hippogriff | 5 | 3+1 | 180'/360'fly | 2 claw/bite | 1d6/1d6/1d10 | 8 | Nil | 50 |
| Hobgoblin | 6 | 1+1 | 90' | 1 weapon | by weapon | 8/10 | D | 15 |
| Horse (various) | var | 2–3 | 240' | 2 hooves(/bite) | 1d4/1d4 | 7–9 | Nil | var |
| Hydra | 5 | 5–12 | 120' | 5–12 bites | 1d10 each | 11 | B | var |
| Insect Swarm | 7 | 2–4* | 30'/60'fly | 1 swarm | 2/4 hp | 11 | Nil | var |
| Invisible Stalker | 3 | 8* | 120' | 1 | 4d4 | 12 | Nil | 1200 |
| Kobold | 7 | ½ | 60' | 1 weapon | by weapon-1 | 6/8 | J,P | 5 |
| Leech, Giant | 7 | 6 | 90' | 1 bite | 1d6+drain | 10 | Nil | 275 |
| Lich* | 0 | 21+*** | 60' | 1 touch+spells | 2d8+paralysis | 10 | A | 7500+ |
| Living Statue (var) | 4 | 3–5* | 30'–90' | 2 | var | 12 | Nil | var |
| Lizard, Giant (var) | 2–5 | 3–6 | 120' | var | var | 7 | U/V | var |
| Lizard Man | 5 | 2+1 | 60'/120'swim | 1 weapon | by weapon+1 | 12 | D | 25 |
| Locust, Giant | 4 | 2 | 60'/180'fly | bite/bump/spit | 1d2–1d4+stink | 5 | Nil | 30 |
| Lycanthrope (5 typer) | 7–9 | 3–5* | 120'–180' | var | var+lycanthropy | 8–9 | C | var |

### Monsterliste M–O

| Monster | AC | HD | Mv | Angreb | Skade | Morale | TT | XP |
|---------|-----|------|------|--------|-------|--------|-----|------|
| Manticore | 4 | 6+1 | 120'/180'fly | 2 claw/bite/6 spikes | 1d4/1d4/2d4/1d6×6 | 9 | D | 275 |
| Medusa | 8 | 4** | 90' | 1 snakebite+gaze | 1d6+poison/petrif | 8 | F | 175 |
| Minotaur | 6 | 6 | 120' | butt/bite/weapon | 1d6/1d6/by weapon | 12 | C | 275 |
| Mummy* | 3 | 5+1** | 60' | 1 touch | 1d12+disease | 12 | D | 575 |
| Neanderthal | 8 | 2 | 120' | 1 weapon | by weapon+1 | 7 | C | 20 |
| Nixie | 7 | 1* | 120'swim | 1 weapon/charm | by weapon | 6 | B | 13 |
| Nuckalavee | 2 | 10*** | 120'/180'swim | 1 claw+breath | 1d8+death ray/cold | 10 | E | 3500 |
| Ochre Jelly | 8 | 5* | 30' | 1 | 2d8+dissolve | 12 | Nil | 300 |
| Ogre | 5 | 4+1 | 90' | 1 club | by weapon+2 | 10 | S×10,C | 125 |
| Orc | 6 | 1 | 120' | 1 weapon | by weapon | 6/8 | D,P | 10 |
| Owl Bear | 5 | 5 | 120' | 2 claw/bite+hug | 1d8/1d8/1d8 | 9 | C | 175 |

### Monsterliste P–S

| Monster | AC | HD | Mv | Angreb | Skade | Morale | TT | XP |
|---------|-----|------|------|--------|-------|--------|-----|------|
| Pegasus | 5 | 2+2 | 240'/480'fly | 2 hooves | 1d6/1d6 | 8 | Nil | 25 |
| Pixie | 3 | 1* | 90'/180'fly | 1 dagger/spell | 1d4+invis | 7 | R,S | 13 |
| Purple Worm | 6 | 15* | 60' | 1 bite/1 sting | 2d8/1d8+poison | 10 | D×3 | 2725 |
| Rat, Normal | 9 | 1 hp | 60'/30'swim | 1 bite/pack | 1d6+disease(5%) | 5 | L | – |
| Rat, Giant | 7 | ½ | 120'/60'swim | 1 bite | 1d3+disease(5%) | 8 | C | 6 |
| Robber Fly | 6 | 2 | 90'/180'fly | 1 bite | 1d8 | 8 | U | 20 |
| Rust Monster | 2 | 5* | 120' | 1 touch | rust destroy | 7 | Nil | 300 |
| Salamander (fire) | 2 | 8* | 120' | 2 claw/bite+heat | 1d4/1d4/1d8+heat | 8 | F | 1200 |
| Salamander (frost) | 3 | 12* | 120' | 4 claw/bite+cold | var+cold aura | 9 | E | 2700 |
| Scorpion, Giant | 2 | 4* | 150' | 2 pincers/sting | 1d10/1d10/1d4+poison | 11 | V | 125 |
| Shadow | 7 | 2+2* | 90' | 1 touch | 1d4+STR drain | 12 | F | 35 |
| Shark | 4 | 4–8 | 180'swim | 1 bite | 2d4–2d10 | 7 | Nil | var |
| Shrieker | 7 | 3 | 9' | shriek | attracts monsters | 12 | Nil | 35 |
| Skeleton | 7 | 1 | 60' | 1 weapon | by weapon | 12 | Nil | 10 |
| Snake, Cobra | 7 | 1* | 90' | 1 bite | 1d3+poison | 7 | Nil | 13 |
| Snake, Python | 6 | 5* | 90' | 1 bite+squeeze | 1d4+2d4/rd | 8 | U | 300 |
| Snake, Viper | 8 | ½* (2*)+ | 90' | 1 bite | poison | 7 | Nil | 6–25 |
| Spectre* | 2 | 6** | 150'/300'fly | 1 touch | 1d8+energy drain(2) | 11 | E | 725 |
| Spider, Crab | 7 | 2* | 120' | 1 bite | 1d8+poison | 7 | U | 25 |
| Spider, Tarantella | 5 | 4* | 120' | 1 bite | 1d8+dance poison | 8 | U | 125 |
| Sprite | 5 | ½* | 60'/180'fly | 1 curse/spell | special | 7 | S | 6 |
| Stirge | 7 | 1* | 30'/180'fly | 1 jab | 1d3+1d3/rd drain | 9 | L | 13 |

### Monsterliste T–Z

| Monster | AC | HD | Mv | Angreb | Skade | Morale | TT | XP |
|---------|-----|------|------|--------|-------|--------|-----|------|
| Thoul | 6 | 3** | 120' | 2 claw/paralysis | 1d3/1d3+paralysis | 10 | C | 65 |
| Toad, Giant | 7 | 2+2 | 90' | 1 bite | 1d4+1+swallow | 6 | Nil | 25 |
| Treant | 2 | 8* | 60' | 2 branches | 2d6/2d6 | 9 | C | 1200 |
| Troglodyte | 5 | 2* | 120' | 2 claw/bite+stench | 1d4/1d4/1d4 | 9 | A | 25 |
| Troll | 4 | 6+3* | 120' | 2 claw/bite | 1d6/1d6/1d10 | 10 | D | 650 |
| Unicorn | 2 | 4** | 240' | 2 hooves/horn | 1d8/1d8/1d8 | 7 | Nil | 175 |
| Vampire* | 2 | 7–9** | 120'/180'fly | 1 touch+gaze | 1d10+energy drain(2) | 11 | F | 1250–2300 |
| Wight* | 5 | 3* | 90' | 1 touch | energy drain(1) | 12 | B | 50 |
| Wolf, Normal | 7 | 2+2 | 180' | 1 bite | 1d6 | 6/8 | Nil | 25 |
| Wolf, Dire | 6 | 4+1 | 150' | 1 bite | 2d4 | 8 | Nil | 125 |
| Wraith* | 3 | 4** | 120'/240'fly | 1 touch | 1d6+energy drain(1) | 11 | E | 175 |
| Wyvern | 3 | 7* | 90'/240'fly | 1 bite/1 sting | 2d8/1d6+poison | 9 | E | 850 |
| Yellow Mold | 9 | 2* | 0 | spore cloud | 1d6+spores(death) | N/A | Nil | 25 |
| Zombie | 8 | 2 | 90' | 1 weapon | 1d8 | 12 | Nil | 20 |

### Undead — Hurtigreference

| Undead | AC | HD | Specials | Turn som |
|--------|-----|-----|---------|----------|
| Skeleton | 7 | 1 | Halv skade fra edged, immune charm/sleep/hold | Skeleton |
| Zombie | 8 | 2 | Altid sidst i initiative, immune charm/sleep/hold | Zombie |
| Ghoul | 6 | 2* | Paralysis (1d4+1 turns), elver immune | Ghoul |
| Wight | 5 | 3* | Energy drain 1 niv, silver/magic våben | Wight |
| Wraith | 3 | 4** | Energy drain 1 niv, kun magic våben, fly | Wraith |
| Mummy | 3 | 5+1** | Disease (no healing), halv skade fra weapons, fire ×1.5 | Mummy |
| Spectre | 2 | 6** | Energy drain 2 niv, kun magic våben, fly | Spectre |
| Vampire | 2 | 7–9** | Energy drain 2 niv, charm gaze, regen 3hp/rd, shapechg | Vampire |
| Lich | 0 | 21+*** | Paralysis touch, spells som MU/Cl 21+, immune 1–3rd lv spells | Lich |
| Spirit (3 typer) | -2–-4 | 14–18**** | Poison touch+presence, immune normal+<+2 weapons | Special |

**Alle undead:** Immune mod charm, sleep, hold. Immune mod gift. Kræver ikke mad/luft/søvn. Mange kræver magiske våben.

### Monster Spellcasters

Humanoidracer kan have shamaner (cleric) og wokani (MU). 1 af 20 er spellcaster. Begrænset spelliste. Max level varierer per race:

| Race | Shaman max | Wokan max |
|------|-----------|-----------|
| Bugbear | 6 | 4 |
| Gnoll | 4 | 4 |
| Goblin | 4 | 2 |
| Hobgoblin | 6 | 4 |
| Kobold | 4 | 2 |
| Lizard Man | 4 | 2 |
| Ogre | 6 | 6 |
| Orc | 4 | 2 |
| Troll | 6 | 6 |

Drager kan kaste spells som MU og Cleric baseret på age category.

### Encounter Tables — Terrain

RC indeholder komplette wandering monster tabeller for:
- **Clear/Grassland:** Herds, lions, cavalry, humanoids
- **Desert:** Camels, lizards, vipers, fire giants
- **Woods/Forest:** Panthers, wolves, bugbears, dryads, treants
- **Mountain/Hill:** Bears, cave bears, giants, trolls, wyverns
- **River/Lake:** Crocodiles, nixies, lizard men, crabs
- **Swamp:** Lizard men, troglodytes, trolls, giant leeches
- **Jungle:** Snakes, spiders, lizards, troglodytes
- **Ocean:** Sharks, fish, sea serpents, dragon turtles
- **City/Settled:** Humans (NPC encounters), rats, thieves
- **Cavern/Dungeon:** Level-baserede tabeller (1–3, 4–5, 6–7, 8+)

### Dungeon Encounter Tables (udvalgte)

**Niveau 1:** Kobold, goblin, orc, skeleton, giant rat, centipede, bat, green slime, beetle
**Niveau 2–3:** Hobgoblin, gnoll, ghoul, bugbear, lizard man, gray ooze, carrion crawler, stirge
**Niveau 4–5:** Ogre, gargoyle, wraith, owl bear, cockatrice, hellhound, rust monster, minotaur
**Niveau 6–7:** Troll, wyvern, basilisk, hydra, mummy, spectre, displacer beast, chimera
**Niveau 8+:** Vampire, purple worm, dragon, beholder, lich, golem, giant, elemental

---

## Immortals (Kap 15)

### Sfærer
Materie (fysisk), Energi (kraft), Tid (cyklus), Tanke (visdom), Entropi (forfald).

### Stier
Dynast (Materie), Epic Hero (Energi), Paragon (Tanke), Polymath (Tid), Anti-hero (Entropi).

Power Points (PP) erstatter HP/spell slots. Bruges til skabelse, planeshifting, Immortal-magi.

---

## Planes (Kap 18)

**Prime:** Den materielle verden. **Ethereal:** Overgang, spøgelser. **Elemental:** Fire/Air/Earth/Water. **Astral:** Forbinder planer, Immortal-rejse. **Outer Planes:** Sfærernes hjem.

---

## Variant Rules (Kap 19)

- Ability scores som saving throw modifier
- Demihuman/Mystic udvidede niveauer
- Nonlethal combat regler

---

## Known World / Mystara (Appendix 1)

RC indeholder detaljeret beskrivelse af the Known World (senere kaldt Mystara): nationer, geografi, kulturer, Hollow World. Edens Efterklang bruger sin egen setting (Thornmark/Dalhul), men RC's verdensstruktur kan inspirere.
