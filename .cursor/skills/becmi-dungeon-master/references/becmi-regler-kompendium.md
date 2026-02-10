# BECMI Regelkompendium — Komplet Reference

Dette dokument indeholder den komplette regelreference for BECMI D&D baseret på Rules Cyclopedia (RC, 1991). Brug det som opslagsværk under spillet.

---

## 1. Karakterklasser

### Menneskeklasser

| Klasse | Prime Req. | HD | Max Level | THAC0 niv 1 | Rustning | Våben | Magi |
|--------|-----------|-----|-----------|-------------|----------|-------|------|
| Fighter | STR | d8 | 36 | 19 | Alle | Alle | Nej |
| Cleric | WIS | d6 | 36 | 19 | Alle | Stumpe | Ja (guddommelig) |
| Magic-User | INT | d4 | 36 | 19 | Ingen | Daggert, stav | Ja (arcane) |
| Thief | DEX | d4 | 36 | 19 | Læder | Alle en-hånds | Nej |
| Mystic | STR+DEX | d6 | 16 | 19 | Ingen | Special | Ki-evner |

### Demihumane klasser (race-as-class)

| Klasse | Prime Req. | HD | Max Level | THAC0 niv 1 | Special |
|--------|-----------|-----|-----------|-------------|---------|
| Dwarf | STR | d8 | 12 | 19 | Infravision 60', detect stonework, saves vs. magi +bonus |
| Elf | STR+INT | d6 | 10 | 19 | Infravision 60', detect secret doors 1-2/6, fighter+MU magi |
| Halfling | STR+DEX | d6 | 8 | 19 | +1 missile AC, +1 initiative, saves +bonus, hide 90% outdoors |

### Attack Rank (post name-level)
Demihumaner der når max level fortsætter med **Attack Ranks** (A–M) der forbedrer THAC0 og saves uden at give flere HP. Opnås via XP.

---

## 2. Evnepoint (Ability Scores)

| Score | Modifier |
|-------|----------|
| 3 | -3 |
| 4–5 | -2 |
| 6–8 | -1 |
| 9–12 | 0 |
| 13–15 | +1 |
| 16–17 | +2 |
| 18 | +3 |

### Hvad modifiers påvirker

| Ability | Påvirker |
|---------|----------|
| STR | Melee angreb, melee skade, åbne døre |
| INT | Sprog, generelle skills antal |
| WIS | Saves vs. magi (valgfrit) |
| DEX | AC, missile angreb, initiative (individuel) |
| CON | HP pr. HD |
| CHA | Reaction rolls, max hirelings, hireling morale |

---

## 3. Kamp (Combat)

### Kampsekvens (RC s. 102-103, pr. runde = 10 sekunder)
1. **Morale check** (hvis nødvendigt: første allierede dræbt, halvdelen faldet, leder faldet)
2. **Bevægelse** (op til 1/3 movement rate pr. runde i kamp)
3. **Missile-angreb** (ranged våben, inkl. oliefalsker, holy water)
4. **Magi** (spell casting — afbrydes hvis caster tager skade FØR sin tur i runden)
5. **Melee-angreb** (nærkamp)

### Combat Maneuvers (RC s. 104-105)
- **Fighting Withdrawal:** Træk ½ mv rate; modstander får IKKE gratis angreb
- **Full Retreat:** Fuld mv rate; modstander FÅR ét gratis melee-angreb
- **Set Spear vs. Charge:** Dobbelt skade mod fjende der charger (kun spyd, pike, trident)
- **Lance Attack (charge):** Dobbelt skade fra hesteryg med lanse
- **Parry:** -2 til modstanders angrebsrul; kræver at man opgiver eget angreb. Ved Weapon Mastery: -1 pr. mastery rank over Basic
- **Multiple Attacks:** Fighters med THAC0-bonus så høj at de rammer AC 0 på 2 eller lavere: ét ekstra angreb pr. runde
- **Smash:** +5 angreb, dobbelt skade-bonus fra STR, men modstander rammer lettere (+5 til angrebsrul mod smasher)
- **Grapple/Wrestle:** Angrebsrul mod AC 9 (rustning hjælper ikke). Succes = tag fat; derefter STR-check pr. runde for kontrol

### Initiative
- **Gruppeinitiativ:** Hver side ruller 1d6. **Højest handler først** (RC s. 102: "The side that rolls the highest number acts first").
- **Uafgjort:** Handlinger sker simultant — alle der valgte at angribe får angreb, selv hvis modstanderen dør.
- **Individuel initiative (valgfrit):** Hver spiller og hvert monster ruller 1d6. Højest først. Ved uafgjort: rul igen til alle ties er løst. DEX-modifier kan tillægges (DMs valg).

### THAC0 (To Hit Armor Class 0)
- Angrebsrul: 1d20 + modifiers ≥ THAC0 − mål-AC = hit
- Alternativt: 1d20 ≥ THAC0 − mål-AC (tabellen giver direkte)
- **Natural 20:** Altid hit. **Natural 1:** Altid miss.

### THAC0 Progression

| Niveau | Fighter/Dwarf/Elf/Halfling | Cleric | Magic-User/Thief |
|--------|---------------------------|--------|-------------------|
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
| 31–33 | 2 | 9 | 9 |
| 34–36 | 2 | 9 | 7 |

### Armor Class (RC s. 69)

| Rustning | AC | Pris (gp) | Encumbrance (cn) | Begrænsninger |
|----------|-----|-----------|-------------------|---------------|
| Ingen rustning | 9 | – | – | – |
| Skjold (alene) | -1 til AC | 10 | 100 | Kan kombineres med enhver rustning |
| Læderrustning | 7 | 20 | 200 | Thieves + Druids kan bruge |
| Skælrustning (Scale Mail) | 6 | 30 | 300 | – |
| Ringbrynje (Chain Mail) | 5 | 40 | 400 | – |
| Båndrustning (Banded Mail) | 4 | 50 | 450 | – |
| Pladerustning (Plate Mail) | 3 | 60 | 500 | – |
| Harnisk (Suit Armor) | 0 | 250 | 750 | Kun fighters; -5 missile, mv 30'(10'), -1 surprise |

**Suit Armor specials:** Reducerer area-effekt skade med 1 pr. die + saving throw bonus +2. Bevægelse kun 30'(10'). Kan høres 120' væk. Kræver 2 turns at tage på (1 turn at tage af).

DEX modifier reducerer AC yderligere (lavere = bedre).

### Skade

| Våben | Skade | Notes |
|-------|-------|-------|
| Daggert | 1d4 | Kan kastes (10/20/30 fod) |
| Kort sværd | 1d6 | |
| Langsværd | 1d8 | |
| To-hånds sværd | 1d10 | -1 initiative |
| Krigsøkse | 1d8 | |
| Morgenstjerne | 1d6+1 | |
| Stav | 1d6 | To-hånds |
| Kort bue | 1d6 | Range 50/100/150 |
| Lang bue | 1d6 | Range 70/140/210 |
| Let armbrøst | 1d6 | Range 60/120/180, slow reload |

---

## 4. Saving Throws

### Kategorier
1. **D — Dødsstråle/Gift** (Death Ray/Poison)
2. **W — Magisk Stav** (Magic Wands)
3. **P — Forstening/Paralyse** (Paralysis/Turn to Stone)
4. **B — Drageånde** (Dragon Breath)
5. **S — Besværgelser** (Spells/Rods/Staves)

### Saving Throw tabeller (udvalgte niveauer)

**Fighter/Dwarf/Halfling:**

| Niveau | D | W | P | B | S |
|--------|---|---|---|---|---|
| 1–3 | 12 | 13 | 14 | 15 | 16 |
| 4–6 | 10 | 11 | 12 | 13 | 14 |
| 7–9 | 8 | 9 | 10 | 10 | 12 |
| 10–12 | 6 | 7 | 8 | 8 | 10 |

**Cleric:**

| Niveau | D | W | P | B | S |
|--------|---|---|---|---|---|
| 1–4 | 11 | 12 | 14 | 16 | 15 |
| 5–8 | 9 | 10 | 12 | 14 | 12 |
| 9–12 | 6 | 7 | 8 | 8 | 10 |

**Magic-User/Elf:**

| Niveau | D | W | P | B | S |
|--------|---|---|---|---|---|
| 1–5 | 13 | 14 | 13 | 16 | 15 |
| 6–10 | 11 | 12 | 11 | 14 | 12 |
| 11–15 | 8 | 9 | 8 | 11 | 8 |

**Thief:**

| Niveau | D | W | P | B | S |
|--------|---|---|---|---|---|
| 1–4 | 13 | 14 | 13 | 16 | 15 |
| 5–8 | 12 | 13 | 11 | 14 | 13 |
| 9–12 | 10 | 11 | 9 | 12 | 10 |

**Normal Mennesker (0-niveau):** D 14, W 15, P 16, B 17, S 17

### Brug
- Rul 1d20 ≥ target number = succes
- Succes mod skadende effekt = halv skade
- Succes mod ikke-skadende effekt = helt negeret
- Magiske genstande kan give bonus til saves

---

## 5. Morale & Reaction

### Morale (2d6)
- Rul 2d6. Resultat ≤ morale score = kæmper videre. Højere = flygter.
- **Standard morale scores:** Kobold 6, Goblin 7, Orc 8, Ogre 9, Dragon 10–11.
- **Check-triggers:** Første allierede dræbt; halvdelen af gruppen faldet; leder faldet.
- **Retretterende monstre:** Kan forfølges; overgivelse er mulig.

### Reaction Table (2d6 + CHA modifier)

| 2d6 | Reaktion |
|-----|----------|
| 2–3 | Fjendtlig, angriber |
| 4–5 | Uvenlig, muligvis angriber |
| 6–8 | Usikker, neutral |
| 9–10 | Uinteresseret, venlig |
| 11–12 | Venlig, hjælpsom |

CHA modifiers (fra evne-tabellen) lægges til 2d6. Brug kun når monstrenes reaktion er ukendt.

---

## 6. Magi-system

### Magic-User Spell Slots

| Niveau | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th |
|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | – | – | – | – | – | – | – | – |
| 2 | 2 | – | – | – | – | – | – | – | – |
| 3 | 2 | 1 | – | – | – | – | – | – | – |
| 5 | 2 | 2 | 1 | – | – | – | – | – | – |
| 7 | 3 | 2 | 2 | 1 | – | – | – | – | – |
| 9 | 3 | 3 | 2 | 2 | 1 | – | – | – | – |
| 14 | 5 | 5 | 5 | 3 | 2 | 1 | – | – | – |
| 21 | 6 | 6 | 6 | 6 | 5 | 5 | 3 | – | – |
| 29 | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 5 | 3 |
| 36 | 9 | 9 | 9 | 9 | 9 | 8 | 7 | 6 | 5 |

### Cleric Spell Slots

| Niveau | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th |
|--------|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | – | – | – | – | – | – |
| 2 | 2 | – | – | – | – | – | – |
| 3 | 2 | 1 | – | – | – | – | – |
| 5 | 2 | 2 | 1 | – | – | – | – |
| 9 | 3 | 3 | 3 | 2 | 1 | – | – |
| 21 | 8 | 8 | 7 | 6 | 4 | 3 | 1 |
| 36 | 9 | 9 | 9 | 9 | 9 | 8 | 6 |

### Vigtige Spells

**Magic-User:**
- Niv 1: Sleep, Magic Missile, Charm Person, Light, Read Magic, Shield, Detect Magic
- Niv 2: Web, Invisibility, Knock, Mirror Image, ESP
- Niv 3: Fireball, Lightning Bolt, Dispel Magic, Fly, Haste
- Niv 4: Dimension Door, Polymorph Self, Wall of Fire
- Niv 5: Teleport, Cloudkill, Wall of Stone, Animate Dead

**Cleric:**
- Niv 1: Cure Light Wounds, Detect Evil, Light, Protection from Evil, Remove Fear
- Niv 2: Bless, Find Traps, Hold Person, Silence 15' Radius, Snake Charm
- Niv 3: Cure Disease, Remove Curse, Striking, Continual Light
- Niv 4: Cure Serious Wounds, Neutralize Poison, Speak with Plants
- Niv 5: Cure Critical Wounds, Raise Dead, Quest, Dispel Evil

### Spell Mechanics
- **Memorization:** Spells forberedes efter lang hvile (8 timer). MU kræver spellbook; Cleric beder.
- **Casting time:** 1 runde medmindre spell siger andet.
- **Afbrydelse:** Tager casteren skade inden spell er kastet (initiative), mistes den.
- **Spell research:** Magic-Users kan researche nye spells (tid + guld, DM godkendelse).

---

## 7. Weapon Mastery (RC Chapter 5, s. 76+)

### Mestringsniveauer (Levels of Weapon Mastery)

| Choices brugt | Rank | Effekt |
|---------------|------|--------|
| 0 | Unskilled | Halveret skade; -1 missile angreb |
| 1 | Basic | Standard våbenskade fra Weapons Table |
| 2 | Skilled | Forbedret skade + special moves |
| 3 | Expert | Endnu bedre skade + avancerede specials |
| 4 | Master | Højere skade + mester-specials |
| 5 | Grand Master | Ultimativ skade + alle specials |

**Vigtig:** Bonusserne varierer pr. våben — se Weapons Mastery Table i RC s. 78-80. Hvert våben har unikke skade, range, AC-bonus og special effects pr. mastery-rank.

### Weapon Choices pr. niveau (RC s. 76)

| Niveau | Fighters | Alle andre |
|--------|----------|------------|
| 1 | 4 | 2 |
| 3 | 5 | 3 |
| 6 | 6 | 4 |
| 9 | 7 | 5 |
| 11 | 8 | 6 |
| 15 | 9 | 7 |
| 19 | 10 | 7 |
| 23 | 11 | 8 |
| 27 | 12 | 8 |
| 30 | 13 | 9 |
| 33 | 14 | 9 |
| 36 | 15 | 10 |
| 36+ | +1 pr. 200,000 XP over max | +1 pr. 200,000 XP over max |

**Demihumaner:** Starter med Basic i alle tilladte våben. Kan træne ved niv 4, 8, (12 for dværge) og pr. 200,000 XP efter max level.

### Træning (RC s. 77)

| Ønsket rank | Tid | Pris pr. uge |
|-------------|-----|-------------|
| Basic (nyt våben) | 1 uge | 100 gp |
| Skilled | 2 uger | 250 gp |
| Expert | 4 uger | 500 gp |
| Master | 8 uger | 750 gp |
| Grand Master | 12 uger | 1,000 gp |

**Træner krav:** Træneren skal have ≥ det ønskede rank. Succeschance afhænger af træner vs. elev rank (1%–99%). Check halvvejs i træningsperioden. Fejl = tid og penge tabt, men weapon choice er bevaret til næste forsøg.

### Unskilled våbenbrug
Hvis en karakter bruger et våben uden at have brugt en weapon choice på det: halveret skade (rund ned), -1 til missile angreb.

---

## 8. Thief Skills

| Skill | Niv 1 | Niv 5 | Niv 9 | Niv 14 |
|-------|-------|-------|-------|--------|
| Open Locks | 15% | 35% | 60% | 80% |
| Find Traps | 10% | 25% | 50% | 70% |
| Remove Traps | 10% | 25% | 50% | 70% |
| Climb Walls | 87% | 91% | 95% | 97% |
| Move Silently | 20% | 35% | 55% | 75% |
| Hide in Shadows | 10% | 25% | 45% | 65% |
| Pick Pockets | 20% | 35% | 55% | 75% |
| Hear Noise | 1-in-6 | 2-in-6 | 3-in-6 | 4-in-6 |

### Backstab (RC s. 24)
Thief der angriber uopdaget fra baghold med ét-hånds melee-våben: **+4 til angreb, dobbelt skade** (rul skade, gang med 2, tilføj modifiers). Kræver at offeret IKKE ser/hører thiefen. Fungerer med enhver ét-hånds melee (ikke kun dolke). Hvis offeret er advaret = normalt angreb.

### Thief Read Languages (niv 4+, RC s. 22)
Fra niv 4: 80% chance til at læse ethvert normalt (ikke-magisk) skriftsprog, kode eller kort.

### Thief Spell Scroll Use (niv 10+, RC s. 22)
Fra niv 10: Kan kaste MU-spells fra spell scrolls. 10% chance for backfire (spellen rammer casteren eller slår fejl).

---

## 9. Turn Undead (Cleric)

| Cleric niv | Skeleton | Zombie | Ghoul | Wight | Wraith | Mummy | Spectre | Vampire |
|-----------|----------|--------|-------|-------|--------|-------|---------|---------|
| 1 | 7 | 9 | 11 | – | – | – | – | – |
| 2 | T | 7 | 9 | 11 | – | – | – | – |
| 3 | T | T | 7 | 9 | 11 | – | – | – |
| 5 | D | T | T | 7 | 9 | 11 | – | – |
| 7 | D | D | T | T | 7 | 9 | 11 | – |
| 9 | D | D | D | T | T | 7 | 9 | 11 |

**T** = automatisk turned (ingen rul). **D** = automatisk destroyed. Tal = rul 2d6 ≥ tal = turned.

---

## 10. General Skills

### System
- **Slots:** 4 ved niv 1 + INT bonus (op til +3). +1 slot pr. 4 niveauer.
- **Check:** 1d20 ≤ evnepoint (ability score) = succes.
- **Modifiers:** -4 (let), -2 (under gunstige forhold), +2 (vanskelig), +4 (meget svært).
- **Forbedring:** Brug en ny slot på eksisterende skill = +1 til check.

### Eksempel-skills
| Skill | Ability | Beskrivelse |
|-------|---------|-------------|
| Riding | DEX | Ridekunst, kontrol af dyr |
| Tracking | INT | Følge spor i naturen |
| Knowledge (type) | INT | Specialviden (historie, magi, natur) |
| Craft (type) | INT/DEX | Håndværk (smede, snedker, brygger) |
| Persuasion | CHA | Overbevisning, forhandling |
| Survival | INT | Overleve i vildmark |
| Navigation | INT | Finde vej, undgå at fare vild |
| Profession (type) | INT/WIS | Professionel viden (læge, sagfører) |
| Nature Lore | INT | Kendskab til flora og fauna |
| Alertness | DEX | Bedre chancer for at bemærke ting |

---

## 11. Encumbrance & Bevægelse

### Encumbrance (vægtbaseret)

| Last (cn) | Movement Rate |
|-----------|---------------|
| 0–400 | 120' (40') |
| 401–600 | 90' (30') |
| 601–800 | 60' (20') |
| 801–1600 | 30' (10') |
| 1601+ | Kan ikke bevæge sig |

1 cn (coin) ≈ 1/10 pund. 10 mønter = 1 cn i BECMI.

### Bevægelseshastigheder
- **Dungeon (exploration):** Movement rate pr. 10-min turn (forsigtig, mapper)
- **Dungeon (running):** ×3 movement rate, ingen mapping, risiko for overraskelse
- **Combat:** 1/3 movement rate pr. runde
- **Wilderness:** Movement rate ÷ 5 = miles pr. dag (normal terrain, 10 timer)

### Terrain-modifiers (wilderness)

| Terrain | Movement modifier |
|---------|-------------------|
| Vej/sti | ×1.5 |
| Åben slette | ×1 |
| Skov/bakker | ×2/3 |
| Bjerge/sump | ×1/2 |
| Jungle/tæt skov | ×1/3 |

---

## 12. Treasure Types (RC Chapter 16, s. 226-228)

### Treasure in Lairs (Type A–O)

Lair Treasure bruges kun når monstre mødes i deres tilholdssted.

| Type | Copper | Silver | Electrum | Gold | Platinum | Gems | Jewelry | Magic Items |
|------|--------|--------|----------|------|----------|------|---------|-------------|
| A | 25% 1d6×1000 | 30% 1d6×1000 | 20% 1d4×1000 | 35% 2d6×1000 | 25% 1d2×1000 | 50% 6d6 | 50% 6d6 | 40% any 3 |
| B | 50% 1d8×1000 | 25% 1d6×1000 | 25% 1d4×1000 | 25% 1d3×1000 | Nil | 25% 1d6 | 25% 1d6 | 10% 1 sword/armor/weapon |
| C | 20% 1d12×1000 | 30% 1d4×1000 | 10% 1d4×1000 | Nil | Nil | 25% 1d4 | 25% 1d4 | 10% any 2 |
| D | 10% 1d8×1000 | 15% 1d12×1000 | Nil | 60% 1d6×1000 | Nil | 30% 1d8 | 30% 1d8 | 15% any 2 + 1 potion |
| E | 5% 1d10×1000 | 30% 1d12×1000 | 25% 1d4×1000 | 25% 1d8×1000 | Nil | 10% 1d10 | 10% 1d10 | 25% any 3 + 1 scroll |
| F | Nil | 10% 2d10×1000 | 20% 1d8×1000 | 45% 1d12×1000 | 30% 1d3×1000 | 20% 2d12 | 10% 1d12 | 30% any 3 (no swords) + 1 potion + 1 scroll |
| G | Nil | Nil | Nil | 50% 10d4×1000 | 50% 1d6×1000 | 25% 3d6 | 25% 1d10 | 35% any 4 + 1 scroll |
| H | 25% 3d8×1000 | 50% 1d100×1000 | 50% 10d4×1000 | 50% 10d6×1000 | 25% 5d4×1000 | 50% 1d100 | 50% 10d4 | 15% any 4 + 1 potion + 1 scroll |
| I | Nil | Nil | Nil | Nil | 30% 1d8×1000 | 50% 2d6 | 50% 2d6 | 15% any 1 |
| J | 25% 1d4×1000 | 10% 1d3×1000 | Nil | Nil | Nil | Nil | Nil | Nil |
| K | Nil | 30% 1d6×1000 | 10% 1d2×1000 | Nil | Nil | Nil | Nil | Nil |
| L | Nil | Nil | Nil | Nil | Nil | 50% 1d4 gems | Nil | Nil |
| M | Nil | Nil | Nil | 40% 2d4×1000 | 50% 5d6×1000 | 55% 5d4 | 45% 2d6 | Nil |
| N | Nil | Nil | Nil | Nil | Nil | Nil | Nil | 40% 2d4 potions |
| O | Nil | Nil | Nil | Nil | Nil | Nil | Nil | 50% 1d4 scrolls |

### Treasure Carried (Type P–V)

Carried Treasure bruges til monstre man møder udenfor deres lair.

| Type | Copper | Silver | Electrum | Gold | Platinum | Gems | Jewelry | Magic |
|------|--------|--------|----------|------|----------|------|---------|-------|
| P | 3d8 cp | Nil | Nil | Nil | Nil | Nil | Nil | Nil |
| Q | Nil | 3d6 sp | Nil | Nil | Nil | Nil | Nil | Nil |
| R | Nil | Nil | 2d6 ep | Nil | Nil | Nil | Nil | Nil |
| S | Nil | Nil | Nil | 2d4 gp | Nil | Nil | Nil | Nil |
| T | Nil | Nil | Nil | Nil | 1d6 pp | Nil | Nil | Nil |
| U | 10% 1d100 cp | 10% 1d100 sp | Nil | 5% 1d100 gp | Nil | 5% 1d4 gems | 5% 1d4 jewelry | 2% any 1 |
| V | Nil | 10% 1d100 sp | 5% 1d100 ep | 10% 1d100 gp | 5% 1d100 pp | 10% 1d4 gems | 10% 1d4 jewelry | 5% any 1 |

### Gem Values (RC s. 227)

| 2d6 | Base Value | Gems i denne kategori |
|-----|-----------|----------------------|
| 2 | 10 gp | Agate, Quartz, Turquoise |
| 3–4 | 50 gp | Citrine, Jasper, Onyx, Moonstone |
| 5–9 | 100 gp | Amber, Amethyst, Coral, Garnet, Jade |
| 10–11 | 500 gp | Aquamarine, Pearl, Topaz |
| 12 | 1,000 gp | Opal, Star Ruby, Ruby, Emerald, Sapphire, Diamond |

**Variation:** 1d6 → 1 = halver, 2–5 = standardværdi, 6 = fordobles.

### Average Treasure Values (gp, omtrentligt)

| Type | Gennemsnitlig lair-værdi |
|------|--------------------------|
| A | ~17,000 gp |
| B | ~2,000 gp |
| C | ~1,000 gp |
| D | ~3,800 gp |
| E | ~2,300 gp |
| F | ~7,700 gp |
| G | ~23,000 gp |
| H | ~60,000 gp |
| I | ~7,500 gp |

### XP for Treasure
I BECMI: **1 gp fundet = 1 XP.** Treasure er den primære XP-kilde i tidlige niveauer. Elektrum tæller som halv gp; platinum tæller som 5 gp.

### Møntsystem

| Mønt | Værdi i gp | Forkortelse |
|------|-----------|-------------|
| Copper (kobber) | 1/100 | cp |
| Silver (sølv) | 1/10 | sp |
| Electrum | 1/2 | ep |
| Gold (guld) | 1 | gp |
| Platinum | 5 | pp |

---

## 13. Erfaringspoint (XP)

### XP pr. monster HD

| HD | XP base | Bonus pr. special ability |
|----|---------|--------------------------|
| Under 1 | 5 | +1 |
| 1 | 10 | +3 |
| 1+ | 15 | +4 |
| 2 | 20 | +5 |
| 2+ | 25 | +10 |
| 3 | 35 | +15 |
| 3+ | 50 | +25 |
| 4 | 75 | +50 |
| 5 | 175 | +125 |
| 6 | 275 | +225 |
| 7 | 450 | +400 |
| 8 | 650 | +550 |

### Klasse XP-krav (RC, komplet)

**Menneske-klasser:**

| Niv | Fighter | Cleric | Magic-User | Thief |
|-----|---------|--------|------------|-------|
| 1 | 0 | 0 | 0 | 0 |
| 2 | 2,000 | 1,500 | 2,500 | 1,200 |
| 3 | 4,000 | 3,000 | 5,000 | 2,400 |
| 4 | 8,000 | 6,000 | 10,000 | 4,800* |
| 5 | 16,000 | 12,000 | 20,000 | 9,600 |
| 6 | 32,000 | 25,000 | 40,000 | 20,000 |
| 7 | 64,000 | 50,000 | 80,000 | 40,000 |
| 8 | 120,000 | 100,000 | 150,000 | 80,000 |
| 9 | 240,000 | 200,000 | 300,000 | 160,000 |
| 10 | 360,000 | 300,000 | 450,000 | 280,000** |
| 15 | 660,000 | 800,000 | 1,200,000 | 880,000 |
| 20 | 960,000 | 1,300,000 | 1,950,000 | 1,480,000 |
| 25 | 1,260,000 | 1,800,000 | 2,700,000 | 2,080,000 |
| 30 | 1,560,000 | 2,300,000 | 3,300,000 | 2,680,000 |
| 36 | 1,860,000 | 2,900,000 | 4,350,000 | 3,400,000 |

*Thief niv 4: Får 80% chance til at læse normale (ikke-magiske) skrifter, sprog, koder, kort.
**Thief niv 10: Får evne til at kaste MU-spells fra spell scrolls (10% chance for backfire).

**Demihumane klasser:**

| Niv | Dwarf | Elf | Halfling |
|-----|-------|-----|----------|
| 1 | 0 | 0 | 0 |
| 2 | 2,200 | 4,000 | 2,000 |
| 3 | 4,400 | 8,000 | 4,000 |
| 4 | 8,800 | 16,000 | 8,000 |
| 5 | 17,000 | 32,000 | 16,000 |
| 6 | 35,000 | 64,000 | 32,000 |
| 7 | 70,000 | 120,000 | 64,000 |
| 8 | 140,000 | 250,000 (max) | 120,000 (max) |
| 9 | 270,000 | 400,000 | 300,000 |
| 10 | 400,000 | 600,000 | – |
| 11 | 530,000 | 800,000+ | – |
| 12 | 660,000 (max) | – | – |

Demihumaner post-max: Fortsætter med Attack Ranks (C–M) via XP-milepæle. Se Attack Rank-progression i RC.

### HD-progression efter Name Level (RC verificeret)
- **Fighter:** 9d8, derefter +2 HP/niveau (ingen CON bonus)
- **Cleric:** 9d6, derefter +1 HP/niveau
- **Magic-User:** 9d4, derefter +1 HP/niveau
- **Thief:** 9d4, derefter +2 HP/niveau
- **Dwarf:** 9d8, derefter +3 HP/niveau (op til niv 12)
- **Elf:** 9d6, derefter +1 HP ved niv 10
- **Halfling:** 8d6 (max)

---

## 14. Domæne & Stronghold (RC Chapter 12, s. 137-138)

### Stronghold-bygning

| Klasse | Niv krav | Stronghold type | Tiltrækker |
|--------|---------|-----------------|-----------|
| Fighter | 9 | Fæstning (castle/keep) | 1d6×10 soldater + specialister |
| Cleric | 9 | Tempel/kloster | 2d6×10 troende |
| Magic-User | 11 | Tårn/laboratorium | 1d6 apprentices |
| Thief | 9 | Skjulested/gildehall | 2d6 tyve |
| Dwarf | 9 | Underjordisk fæstning | Dværg-tilhængere |
| Elf | 10 | Skov-stronghold | Elver-tilhængere |
| Halfling | 8 | Halfling-stronghold | Halfling-tilhængere |

### Fortifications Table (RC s. 137)

| Bygning | Pris (gp) | Byggetid |
|---------|-----------|----------|
| Barbican (gatehouse, 2 små tårne) | 37,000 | – |
| Bastion (halvrund tårn) | 9,000 | – |
| Drawbridge | 500-2,000 | – |
| Keep (befæstet hovedbygning) | 75,000 | – |
| Large Tower (30' diam, 80' høj) | 30,000 | – |
| Medium Tower (20' diam, 60' høj) | 15,000 | – |
| Moat (100' × 10' × 5') | 400 | – |
| Palisade (100' sektion) | 100 | – |
| Small Tower (10' diam, 30' høj) | 5,000 | – |
| Stone Wall (100' × 20' × 5') | 5,000 | – |
| Tunnel/Passage (10' × 10' × 10') | 500 | – |

**Byggetid:** Generelt 1 dag pr. 500 gp construction cost. Kan accelereres med flere arbejdere (±25%) eller magi.

**Specialister nødvendige:** Mindst 1 ingeniør (engineer) til bygning af stenbygninger. Ingeniør koster 1,000 gp/måned.

### NPCs, Retainers, Mercenaries & Specialists (RC s. 133-134)

**Retainers (henchmen):**
- Max antal = CHA modifier + 4 (minimum 1)
- Koster andel af treasure (typisk halv share) + løn
- Har eget niveau, klasse, udrustning
- Morale = 7 + CHA modifier (check i farlige situationer)

**Lejesoldater (Mercenaries):**

| Type | Løn/måned | AC | HD | Våben |
|------|-----------|----|----|-------|
| Light Foot | 2 gp | 7 | 1-1 | Sværd |
| Heavy Foot | 3 gp | 5 | 1 | Sværd, spyd |
| Archer | 5 gp | 7 | 1 | Bue, sværd |
| Light Horse | 10 gp | 7 | 1 | Lanse, sværd |
| Heavy Horse | 20 gp | 3 | 1 | Lanse, sværd |
| Longbowman | 10 gp | 5 | 1+1 | Langbue, sværd |
| Crossbowman | 4 gp | 5 | 1 | Armbrøst, daggert |

**Specialister:**

| Type | Løn/måned |
|------|-----------|
| Animal Trainer | 500 gp |
| Armorer | 100 gp |
| Blacksmith | 25 gp |
| Engineer | 1,000 gp |
| Navigator | 150 gp |
| Sage | 2,000 gp |
| Ship Captain | 250 gp |
| Spy | 500 gp (varierer) |

### Domæneadministration (pr. måned)
1. **Befolkning:** Typisk 50–200 familier pr. dominion.
2. **Skatteindtægt:** 1–10 gp pr. familie pr. måned (afhænger af terrain, handel, governance).
3. **Confidence Level:** 2d6; lavt = oprør, flugt, sygdom. Påvirkes af beskatning, monster-razzias, lederens handlinger.
4. **Events:** DM ruller for tilfældige begivenheder (monstre, pest, ambassadører, handel, katastrofer).
5. **Militær:** Stående hær + evt. lejesoldater. Cost = sum af løn pr. enhed pr. måned.
6. **Resource Management:** Forsyninger, trade routes, infrastruktur påvirker dominion health.

### War Machine (RC Chapter 9, s. 117-126)

Bruges til massekamp med hundredevis/tusinder af enheder.

**Grundlæggende procedure:**
1. **Basic Force Rating (BFR):** antal enheder × kampeffektivitet (våben + rustning + moral + træning)
2. **Modifiers:** Terrain, forsyninger, ledelse (general's niveau + CHA bonus), magi, befæstninger
3. **Combat:** Rul percentile die → modificer med BFR-ratio → slå op i resultat-tabel
4. **Tab:** Beregnes som procentdel af tabende sides styrke → fordeles blandt enheder

**Combat Order of Events (War Machine):**
1. Commanders decision (maneuver vs. attack vs. retreat)
2. Movement phase
3. Missile phase
4. Melee phase
5. Morale check

**Siege Machine (RC s. 124-125):**

| Siege Weapon | Range | Damage | Cost | Crew | Rate of Fire |
|-------------|-------|--------|------|------|-------------|
| Ballista (light) | 200 yards | 2d6 | 75 gp | 2 | 1/3 runder |
| Ballista (heavy) | 300 yards | 3d6 | 100 gp | 4 | 1/4 runder |
| Catapult (light) | 300 yards | 2d10 area | 200 gp | 4 | 1/5 runder |
| Catapult (heavy) | 400 yards | 3d10 area | 400 gp | 6 | 1/6 runder |
| Battering Ram | Melee | 2d10 vs. gate | 50 gp | 8 | 1/2 runder |
| Siege Tower | – | – (troop transport) | 1,000 gp | 20 | – |
| Trebuchet | 500 yards | 4d10 area | 800 gp | 10 | 1/8 runder |

**Fortification Damage:** Siege weapons reducerer fortification hit points. Stone wall = ca. 100 HP pr. 10' sektion. Gate = 50 HP.

---

## 15. Immortal-regler (RC Chapter 15, s. 211-225)

### Stier til Immortalitet (RC s. 224)

| Sti | Sfære | Klasse-krav | Nøglekrav |
|-----|-------|-------------|-----------|
| Dynast | Materie | Fighter 36 | Bygge et imperium; dominion med 100,000+ indbyggere; opnå 36. niveau i Fighter |
| Epic Hero | Energi | Fighter 36 | Fuldføre en legendarisk quest bestemt af en Immortal-sponsor; opnå 36. niveau |
| Paragon | Tanke | Magic-User 36 | Mestre alle aspekter af sin klasse; skabt nyt spell eller magisk genstand; opnå 36. niv |
| Polymath | Tid | Thief 36 | Mestre flere klasser (nå max i mindst 3 klasser); opnå 36. niveau som Thief |
| (Entropy-sti) | Entropi | Enhver 36 | Destruktion og kaos; ødelægge mindst 1 Immortal's projekt; DM-defineret |

**Fælles krav for alle stier:**
- Karakteren skal være niveau 36 i sin klasse
- Karakteren skal have en Immortal-sponsor i den relevante sfære
- Karakteren skal fuldføre sti-specifikke quests
- Processen kræver normalt flere år in-game tid

### Power Points
- Immortals bruger **Power Points (PP)** i stedet for HP/spell slots.
- PP bruges til: skabe materie, ændre planes, kaste Immortal-magi, rejse mellem sfærer.
- PP regenereres over tid eller ved at dyrke sfærens princip.
- **Initierende Immortal:** Starter typisk med 100 PP.

### Immortal Ranks

| Rank | PP range | Antal followers |
|------|----------|-----------------|
| Initiate | 100-199 | Få |
| Temporal | 200-499 | Hundredevis |
| Celestial | 500-999 | Tusindvis |
| Empyreal | 1,000-1,999 | Titusinder |
| Eternal | 2,000-4,999 | Hundredtusinder |
| Hierarch | 5,000+ | Millioner |

### Sfærer

| Sfære | Princip | Tendens | Modsatte sfære |
|-------|---------|---------|----------------|
| Materie | Fysisk skabelse, styrke, bevarelse | Lawful | Entropi |
| Energi | Kraft, forandring, transformation | Neutral | Tanke |
| Tid | Cyklus, forudsigelse, bevarelse af tid | Neutral | Entropi |
| Tanke | Visdom, viden, åndelig kraft | Neutral | Energi |
| Entropi | Forfald, kaos, tomhed, ødelæggelse | Chaotic | Materie + Tid |

### Planar Navigation (RC Chapter 15)

| Plan | Funktion | Adgang |
|------|----------|--------|
| Prime Plane | Den materielle verden (kampagnens verden) | Standardplan |
| Ethereal Plane | Overgangsplan; spøgelser, Phase Spiders, ethereal væsener | Travel/Ethereality spell, specielle monstre |
| Astral Plane | Forbinder alle planer; Immortals rejser her; tankebaseret bevægelse | Gate, Astral Spell, Immortal-kraft |
| Elemental Planes | Fire, Water, Air, Earth — elementale væsener lever her | Plane Travel, Conjure Elemental, Gate |
| Outer Planes | Sfærernes hjemplaner; Immortal-kampe og politik | Kun for Immortals og deres champions |

### Vigtige noter for DM
- Immortal-regler er **sjældent brugte** i de fleste kampagner — de kræver at spillere når niveau 36 og fuldfører årelange quests.
- **I Edens Efterklang:** Immortals eksisterer som kosmiske kræfter bag kulisserne. Spillere vil sandsynligvis aldrig nå Immortal-tier, men Immortals kan indgå som patron-agtige kræfter, quest-givere, eller fjerne antagonister.
- **Sfærerne** påvirker verdens metafysik: Dunkleriet er sandsynligvis forbundet til Entropisfæren.

---

## 16. Magiske Genstande (RC Chapter 16, s. 229-250)

### Magiske Genstande — Tilfældig Bestemmelse

| d100 | Genstandstype |
|------|---------------|
| 01–20 | Potion |
| 21–35 | Scroll |
| 36–40 | Ring |
| 41–45 | Wand/Staff/Rod |
| 46–68 | Misc. Magic Items |
| 69–84 | Sword |
| 85–93 | Armor |
| 94–100 | Weapon (non-sword) |

### Potions (udvalg)

| d20 | Potion | Effekt | Varighed |
|-----|--------|--------|----------|
| 1 | Clairaudience | Hør gennem vægge, 60' range | 12 turns |
| 2 | Clairvoyance | Se gennem vægge, 60' range | 12 turns |
| 3 | Diminution | Krymper til 6" højde | 12 turns |
| 4 | ESP | Læs tanker, 60' range | 12 turns |
| 5 | Fire Resistance | Immunitet mod normalt ild; +2 save vs. magisk ild | 12 turns |
| 6 | Flying | Flyv 120'(40') | 1d4+4 turns |
| 7 | Gaseous Form | Bliv gassky, pass through cracks | 6 turns |
| 8 | Giant Strength | STR 18+ (+3 angreb/skade) | 1 turn + 1d10 runder |
| 9 | Growth | Vokser til dobbelt størrelse, dobbelt skade | 12 turns |
| 10 | Healing | Helbreder 1d6+1 HP (eller Cure Disease) | Permanent |
| 11 | Heroism | +Fighter levels (normal menneske = F4) | 12 turns |
| 12 | Invisibility | Usynlig indtil angreb | 6 turns |
| 13 | Invulnerability | +2 AC, +2 alle saves | 12 turns |
| 14 | Levitation | Svæv op/ned, 20'/runde | 6 turns |
| 15 | Longevity | Reducerer alder med 1d10 år | Permanent |
| 16 | Poison | Dødelig! Save vs. Poison eller dø | Øjeblikkeligt |
| 17 | Polymorph Self | Skift form til enhver levende skabning | 6 turns |
| 18 | Speed | Dobbelt bevægelse, 2 angreb/runde | 12 turns |
| 19 | Super-Heroism | +Fighter levels (som Heroism men stærkere) | 12 turns |
| 20 | Treasure Finding | Detect treasure, 360' range | 6 turns |

### Scrolls

| Type | Indhold |
|------|---------|
| Spell Scroll (MU) | 1d4 MU spells (niv 1d6) |
| Spell Scroll (Cleric) | 1d4 Cleric spells (niv 1d4) |
| Protection Scroll | Protection from Lycanthropes/Undead/Magic/Elementals |
| Cursed Scroll | Curse (DM bestemmer effekt) |
| Treasure Map | Fører til treasure (DM designer lokation) |

### Sværd-bonusser

| d100 | Bonus | Hyppighed |
|------|-------|-----------|
| 01–40 | +1 | Mest normalt |
| 41–50 | +1, +2 vs. type | Bonus mod specifikke fjender |
| 51–60 | +1, +3 vs. type | Højere bonus mod type |
| 61–75 | +2 | Sjælden |
| 76–82 | +2, +3 vs. type | Sjælden + type bonus |
| 83–90 | +3 | Meget sjælden |
| 91–95 | Cursed -1 | Forbandet! |
| 96–98 | Cursed -2 | Alvorligt forbandet! |
| 99–100 | +3 eller special | DMs valg, intelligent sværd, etc. |

**Intelligent sværd:** 30% af magiske sværd er intelligente (INT 7+, Alignment, Ego, powers).

### Rustnings-bonusser

| d100 | Bonus |
|------|-------|
| 01–50 | +1 |
| 51–70 | +2 |
| 71–85 | +3 |
| 86–90 | Cursed AC +1 |
| 91–95 | Cursed AC -1 |
| 96–100 | +3 eller special |

### Rings (udvalg)

| Ring | Effekt |
|------|--------|
| Ring of Animal Control | Kontroller 1d6 dyr, 60' range |
| Ring of Fire Resistance | Immunitet normal ild, +2 save magisk ild |
| Ring of Invisibility | Usynlighed (som spell) |
| Ring of Protection +1/+2/+3 | AC og saves bonus |
| Ring of Spell Storing | Gemmer 1d6 spell levels |
| Ring of Telekinesis | Flyt objekter op til 2,000 cn |
| Ring of Water Walking | Gå på vand |
| Ring of Wishes | 1d4 wishes (DM-kontrolleret!) |
| Ring of X-Ray Vision | Se gennem vægge, 30' range |

### Wands, Staves, Rods (udvalg)

| Genstand | Charges | Effekt |
|----------|---------|--------|
| Wand of Enemy Detection | 25 | Detect fjender 60' |
| Wand of Fear | 25 | Cause Fear 60' cone |
| Wand of Fireballs | 25 | Fireball (6d6 skade) |
| Wand of Lightning | 25 | Lightning Bolt (6d6) |
| Wand of Paralyzation | 25 | Paralysis 60' cone |
| Staff of Healing | 25 | Cure Light Wounds per charge |
| Staff of Power | 25 | Multiple effects (Fireball, Lightning, Cone of Cold, Telekinesis) |
| Rod of Cancellation | 1 | Permanently drains magic from 1 item |
