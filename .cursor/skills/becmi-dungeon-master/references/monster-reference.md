# BECMI Monster Reference — Rules Cyclopedia & Creature Catalog

Denne reference dækker monsterformat, XP-tabeller, og hyppigt brugte monstre i BECMI D&D.

---

## Monster Stat Block Format (RC s. 153-154)

```
Monster Navn [* = kræver magisk våben]
Armor Class:     [lavere = sværere at ramme]
Hit Dice:        [antal d8 + modifiers] (S/M/L = størrelse)
Move:            [pr. turn / (pr. runde)]
Attacks:         [antal og type]
Damage:          [pr. angreb]
No. Appearing:   [dungeon (wilderness)]
Save As:         [klasse + niveau, fx F4]
Morale:          [2d6 check; over = flygter]
Treasure Type:   [A-O = lair, P-V = carried, Nil = intet]
Intelligence:    [0-18+]
Alignment:       [Lawful/Neutral/Chaotic]
XP Value:        [se XP-tabel]
Monster Type:    [kategori (rarhed)]
Terrain:         [foretrukne steder]
```

### Størrelses-kategorier
- **(S)** Small — mindre end menneske
- **(M)** Medium — menneske-størrelse
- **(L)** Large — større end menneske (Halflings får AC-bonus)

### HD-asterisker (*)
Hver * indikerer en speciel evne (magisk angreb, forsvar, etc.). Påvirker XP-værdi.

---

## Monster XP-tabel (RC s. 128)

| Monster HD | Base XP | Bonus pr. * |
|------------|---------|-------------|
| Under 1 | 5 | 1 |
| 1 | 10 | 3 |
| 1+ | 15 | 4 |
| 2 | 20 | 5 |
| 2+ | 25 | 10 |
| 3 | 35 | 15 |
| 3+ | 50 | 25 |
| 4 | 75 | 50 |
| 4+ | 125 | 75 |
| 5 | 175 | 125 |
| 5+ | 225 | 175 |
| 6 | 275 | 225 |
| 6+ | 350 | 300 |
| 7 | 450 | 400 |
| 7+ | 550 | 475 |
| 8 | 650 | 550 |
| 8+ | 775 | 625 |
| 9 | 900 | 700 |
| 9+ – 10+ | 1,000 | 750 |
| 11 – 12+ | 1,100 | 800 |
| 13 – 16+ | 1,350 | 950 |
| 17 – 20+ | 2,000 | 1,000 |
| 21+ | 2,500 | 1,250 |

**Bonus pr. special ability (*).** Et monster med HD 5** (to *) = 175 + (2×125) = 425 XP.

---

## Morale-tabel (RC s. 103)

| Morale Score | Betydning |
|-------------|-----------|
| 2 | Altid flygter |
| 3–5 | Dårlig moral (banditter, goblins) |
| 6–8 | Normal (de fleste intelligente monstre) |
| 9–11 | God moral (trænede soldater, loyale dyr) |
| 12 | Flygter aldrig (undead, fanatikere, constructs) |

**Morale check:** 2d6 — over morale score = forsøger at flygte/overgive sig.  
**Triggers:** Første allierede dræbt, 50% af gruppen faldet, leder dræbt.

---

## Hyppigt brugte monstre (RC verificeret)

### Undead

| Monster | AC | HD | Move | Angreb | Skade | Save | Morale | XP | Special |
|---------|----|----|------|--------|-------|------|--------|----|---------|
| Skeleton | 7 | 1 | 60'(20') | 1 våben | By weapon | F1 | 12 | 10 | Undead immunities |
| Zombie | 8 | 2 | 90'(30') | 1 claw | 1d8 | F1 | 12 | 20 | Altid taber initiative |
| Ghoul | 6 | 2* | 90'(30') | 2 claw/1 bite | 1d3/1d3/1d3+paralysis | F2 | 9 | 25 | Paralysis (save neg.), elves immune |
| Wight | 5 | 3* | 90'(30') | 1 touch | Energy drain (1 level) | F3 | 12 | 50 | Sølv/magisk våben, energy drain |
| Wraith* | 3 | 4** | 120'(40') | 1 touch | 1d6+energy drain | F4 | 12 | 175 | Kun magiske våben, energy drain |
| Spectre** | 2 | 6** | 150'(50') | 1 touch | 1d8+double drain | F6 | 11 | 725 | Kun magiske våben, dobbelt drain |
| Vampire** | 2 | 7-9** | 120'(40') | 1 touch/bite | 1d10+drain/1d3 | F7-9 | 11 | 1,000+ | Charm, shapechange, regeneration |
| Mummy* | 3 | 5+1* | 60'(20') | 1 fist | 1d12+disease | F5 | 12 | 575 | Halvskade fra våben, ild = fuld |

### Turn Undead (Cleric, RC s. 16)

| Cleric Niv | Skeleton | Zombie | Ghoul | Wight | Wraith | Mummy | Spectre | Vampire |
|------------|----------|--------|-------|-------|--------|-------|---------|---------|
| 1 | 7 | 9 | 11 | – | – | – | – | – |
| 2 | T | 7 | 9 | 11 | – | – | – | – |
| 3 | T | T | 7 | 9 | 11 | – | – | – |
| 4 | D | T | T | 7 | 9 | 11 | – | – |
| 5 | D | D | T | T | 7 | 9 | 11 | – |
| 6 | D+ | D | D | T | T | 7 | 9 | 11 |
| 7 | D+ | D+ | D | D | T | T | 7 | 9 |
| 8 | D+ | D+ | D+ | D | D | T | T | 7 |

**T** = Automatisk Turned, **D** = Automatisk Destroyed, **D+** = Destroyed, **–** = Kan ikke turnes.  
**Tal** = Rul 2d6, lig med eller over = turned. Turned undead flygter i 1d10 runder.

### Humanoider

| Monster | AC | HD | Move | Angreb | Skade | Save | Morale | XP | TT |
|---------|----|----|------|--------|-------|------|--------|----|----|
| Goblin | 6 | 1-1 | 60'(20') | 1 våben | By weapon | NM | 7 | 5 | R(C) |
| Hobgoblin | 6 | 1+1 | 90'(30') | 1 våben | By weapon | F1 | 8 | 15 | D |
| Orc | 6 | 1 | 120'(40') | 1 våben | By weapon | F1 | 8 | 10 | D |
| Gnoll | 5 | 2 | 90'(30') | 1 våben | 2d4 | F2 | 8 | 20 | D |
| Bugbear | 5 | 3+1 | 90'(30') | 1 våben | 2d4 | F3 | 9 | 50 | B |
| Ogre | 5 | 4+1 | 90'(30') | 1 club | 1d10 | F4 | 10 | 125 | C+S |
| Troll | 4 | 6+3* | 120'(40') | 2 claw/1 bite | 1d6/1d6/1d10 | F6 | 10 | 650 | D |

**Troll special:** Regenererer 3 HP/runde (starter runde 3 efter skade). Kun ild eller syre dræber permanent.

### Dyr & udyr

| Monster | AC | HD | Move | Angreb | Skade | Save | Morale | XP | Special |
|---------|----|----|------|--------|-------|------|--------|----|---------|
| Giant Rat | 7 | ½ | 120'(40') | 1 bite | 1d3+disease | NM | 8 | 5 | 5% chance for disease |
| Wolf | 7 | 2+2 | 180'(60') | 1 bite | 1d6 | F1 | 8 | 25 | – |
| Dire Wolf | 6 | 4+1 | 150'(50') | 1 bite | 2d4 | F2 | 8 | 125 | – |
| Giant Spider | 6 | 3* | 120'(40') | 1 bite | 2d6+poison | F2 | 8 | 50 | Poison (save or die) |
| Owlbear | 5 | 5 | 120'(40') | 2 claw/1 bite | 1d8/1d8/1d8 | F3 | 9 | 175 | Hug (2d8 extra ved 18+) |
| Giant Ferret | 5 | 1+1 | 150'(50') | 1 bite | 1d8 | F1 | 8 | 15 | – |
| Bear, Black | 6 | 4 | 120'(40') | 2 claw/1 bite | 1d3/1d3/1d6 | F2 | 7 | 75 | Hug (2d8 ved begge klør rammer) |
| Bear, Grizzly | 6 | 5 | 120'(40') | 2 claw/1 bite | 1d4/1d4/1d8 | F2 | 8 | 175 | Hug (2d8 ved begge klør rammer) |

### Drager (udvalgte)

| Dragon | AC | HD | Breath | Skade | Save | Morale | XP |
|--------|----|----|--------|-------|------|--------|----|
| White (S) | 3 | 6** | Cone of Cold 80'×30' | = HP | F6 | 8 | 725 |
| Black (S) | 2 | 7** | Line of Acid 60'×5' | = HP | F7 | 8 | 1,000 |
| Green (M) | 1 | 8** | Cloud of Chlorine 50'×40'×30' | = HP | F8 | 8 | 1,200 |
| Blue (L) | 0 | 9** | Line of Lightning 100'×5' | = HP | F9 | 9 | 1,600 |
| Red (L) | -1 | 10** | Cone of Fire 90'×30' | = HP | F10 | 9 | 1,900 |
| Gold (L) | -2 | 11** | Cone of Fire/Cloud of Chlorine | = HP | F11 | 10 | 2,300 |

**Alle drager:** Breath weapon 3×/dag. Save vs. breath = halv skade. Drager kan kaste spells (1–3 pr. spell level afhængigt af alder). **Alder:** Small/Medium/Large = ½/normal/dobbelt HP.

---

## Monster Reaction Table (RC s. 93)

| 2d6 | Reaktion |
|-----|----------|
| 2 | Fjendtlig, angriber |
| 3–5 | Uvenlig, kan angribe |
| 6–8 | Neutral, usikker |
| 9–11 | Ikke-fjendtlig, kan forhandles |
| 12 | Venlig, hjælpsom |

Modificeres af CHA-bonus og situationelle faktorer.

---

## Creature Catalog (DMR2) — Format og nøgle-monstre

Creature Catalog bruger same stat block-format som RC men tilføjer ekstra detaljer:
- **Monster Type** med rarhed (Common/Rare/Very Rare)
- **Terrain** angivelse
- **Load/Barding Multiplier** for ridbare væsener

### Udvalgte monstre fra Creature Catalog

| Monster | AC | HD | Move | Angreb | Skade | Special |
|---------|----|----|------|--------|-------|---------|
| Amber Lotus Flower | 9 | 5* | 0' | Pollen | Sleep (save neg.) | Plant, immobil |
| Archer Bush | 3 | 4* | 0' | 2d4 thorns | 1d6 each | Plant, 60' range |
| Death Leech | 7 | 4* | 90'(30') | 1 bite | 1d6+CON drain | Drains 1 CON/runde |
| Displacer Beast | 4 | 6* | 150'(50') | 2 tentacles | 2d4/2d4 | -2 til at ramme (displacement) |
| Dragonfly, Giant | 3 | 7+3 | 30'(10')/360'(120') | 1 bite | 3d4 | Flyvende, speed |
| Gargantua | -2 | 30+ | 150'(50') | 1 stomp/1 bite | 4d10/2d20 | Sjælden, katastrofal |
| Giant Slug | 8 | 12* | 60'(20') | 1 bite/1 acid | 1d12/spit acid | Acid spit 60', opløser |
| Phantom | 0 | 3* | 90'(30')/180'(60') | 1 touch | Aging 1d4 years | Ethereal, kun magisk |
| Rock Baboon | 6 | 2 | 120'(40') | 1 club/1 bite | 1d6/1d3 | Territorial, pack |
| Sasquatch | 6 | 5+5 | 150'(50') | 2 fist | 1d8/1d8 | Shy, woodland |

---

## Wandering Monster-procedur

1. **Check hvert 2. turn** (dungeon) eller **1–3 gange om dagen** (wilderness)
2. **Rul 1d6:** 1 = wandering monster
3. **Rul på passende Encounter Table** (efter dungeon-niveau eller terrain-type)
4. **Afstand:** 2d6 × 10 fod (dungeon), 4d6 × 10 yards (wilderness)
5. **Reaction:** 2d6 på Monster Reaction Table medmindre åbenlyst fjendtligt
6. **Surprise:** Begge sider ruller 1d6; 1–2 = overrasket

---

## Vigtige noter til DM

- **Treasure Type** bestemmer kun lair-treasure (A-O). Carried treasure er P-V. Et monster uden parentes-bogstav har INTET on-person treasure.
- **Lair chance:** Angives i encounter tables; typisk 10-30% i wilderness.
- **Intelligent monstre** kan bruge taktik, forhandle, flygte eller sætte baghold.
- **Morale** er valgfri men stærkt anbefalet for gritty gameplay.
- **Scaling:** For stærkere monstre: tilføj HD, giv bedre våben, tilføj specielle evner (med ekstra *).
