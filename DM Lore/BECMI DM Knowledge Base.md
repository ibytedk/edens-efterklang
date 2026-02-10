# BECMI DM Knowledge Base — Edens Efterklang

Denne fil er referencemateriale til DM-instruksen. Vedhæft den som knowledge-dokument i GPT'en.

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
| Dwarf | STR | d8 | 12 | 19 | Infravision 60', detect stonework, saves +bonus |
| Elf | STR+INT | d6 | 10 | 19 | Infravision 60', detect secret doors 1-2/6, fighter+MU magi |
| Halfling | STR+DEX | d6 | 8 | 19 | +1 missile AC, +1 initiative, saves +bonus, hide 90% outdoors |

Attack Rank (post name-level): Demihumaner med max level fortsætter med Attack Ranks (A–M) — forbedrer THAC0 og saves uden ekstra HP.

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

STR → melee angreb/skade. INT → sprog, skills. WIS → saves vs magi. DEX → AC, missile, initiative. CON → HP pr. HD. CHA → reaction, max hirelings, hireling morale.

---

## 3. Kamp

### Kampsekvens (pr. runde = 10 sek)
1. Morale check (hvis trigger)
2. Bevægelse (1/3 mv rate)
3. Missile-angreb
4. Magi (afbrydes ved skade)
5. Melee-angreb

### Initiative
Gruppeinitiativ: 1d6/side, lavest først. Uafgjort = simultant. To-hånds: -1 init.

### THAC0
1d20 ≥ THAC0 − mål-AC = hit. Natural 20 = altid hit, natural 1 = altid miss.

### THAC0 progression (udvalgte)

| Niv | Fighter | Cleric | MU/Thief |
|-----|---------|--------|----------|
| 1–3 | 19 | 19 | 19 |
| 4–6 | 17 | 19 | 19 |
| 7–9 | 15 | 17 | 17 |
| 10–12 | 13 | 17 | 15 |
| 13–15 | 11 | 15 | 15 |

### Rustning

| Rustning | AC |
|----------|-----|
| Ingen | 9 |
| Læder | 7 |
| Skæl | 6 |
| Ringbrynje | 5 |
| Plade | 3 |
| Plade+skjold | 2 |

### Våbenskade

| Våben | Skade | Notes |
|-------|-------|-------|
| Daggert | 1d4 | Kan kastes |
| Kort sværd | 1d6 | |
| Langsværd | 1d8 | |
| To-hånds sværd | 1d10 | -1 init |
| Stav | 1d6 | To-hånds |
| Kort bue | 1d6 | 50/100/150 |
| Lang bue | 1d6 | 70/140/210 |

### Special manøvrer
- Fighting withdrawal: 1/2 mv, ingen gratis angreb
- Full retreat: fuld mv, modstander får gratis angreb
- Set spear vs charge: dobbelt skade
- Lance charge: dobbelt skade fra hesteryg

### Skade & healing
0 HP = bevidstløs. -1 HP = død. Naturlig: 1d3 HP/fuld hviledag. Magisk: CLW 1d6+1, CSW 2d6+2.

---

## 4. Saving Throws

Kategorier: D (Dødsstråle/Gift), W (Stav), P (Forstening/Paralyse), B (Drageånde), S (Besværgelser).

**Fighter/Dwarf/Halfling:**
| Niv | D | W | P | B | S |
|-----|---|---|---|---|---|
| 1–3 | 12 | 13 | 14 | 15 | 16 |
| 4–6 | 10 | 11 | 12 | 13 | 14 |
| 7–9 | 8 | 9 | 10 | 10 | 12 |

**Cleric:**
| Niv | D | W | P | B | S |
|-----|---|---|---|---|---|
| 1–4 | 11 | 12 | 14 | 16 | 15 |
| 5–8 | 9 | 10 | 12 | 14 | 12 |

**MU/Elf:**
| Niv | D | W | P | B | S |
|-----|---|---|---|---|---|
| 1–5 | 13 | 14 | 13 | 16 | 15 |
| 6–10 | 11 | 12 | 11 | 14 | 12 |

**Thief:**
| Niv | D | W | P | B | S |
|-----|---|---|---|---|---|
| 1–4 | 13 | 14 | 13 | 16 | 15 |
| 5–8 | 12 | 13 | 11 | 14 | 13 |

Normal menneske (0-niv): D 14, W 15, P 16, B 17, S 17. Succes = halv skade (skadende) eller helt negeret (ikke-skadende).

---

## 5. Morale & Reaction

### Morale (2d6)
≤ morale score = kæmper. Højere = flygter. Triggers: første allierede dræbt, halvdelen faldet, leder faldet.

Standard: Kobold 6, Goblin 7, Orc 8, Ogre 9, Dragon 10–11.

### Reaction (2d6 + CHA mod)
2–3 fjendtlig | 4–5 uvenlig | 6–8 neutral | 9–10 venlig | 11–12 hjælpsom.

---

## 6. Magi

### MU Spell Slots (udvalgte)

| Niv | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|
| 1 | 1 | – | – | – | – |
| 3 | 2 | 1 | – | – | – |
| 5 | 2 | 2 | 1 | – | – |
| 7 | 3 | 2 | 2 | 1 | – |
| 9 | 3 | 3 | 2 | 2 | 1 |

### Cleric Spell Slots (udvalgte)

| Niv | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|
| 1 | 1 | – | – | – | – |
| 3 | 2 | 1 | – | – | – |
| 5 | 2 | 2 | 1 | – | – |
| 9 | 3 | 3 | 3 | 2 | 1 |

### Vigtige spells
MU niv 1: Sleep, Magic Missile, Charm Person, Light, Shield. MU niv 3: Fireball, Lightning Bolt, Dispel Magic, Fly.
Cleric niv 1: Cure Light Wounds, Detect Evil, Protection from Evil. Cleric niv 3: Cure Disease, Remove Curse.

Memorization: 8t hvile. MU kræver spellbook. Afbrydelse: skade inden cast = spell tabt.

---

## 7. Thief Skills

| Skill | Niv 1 | Niv 5 | Niv 9 |
|-------|-------|-------|-------|
| Open Locks | 15% | 35% | 60% |
| Find/Remove Traps | 10% | 25% | 50% |
| Climb Walls | 87% | 91% | 95% |
| Move Silently | 20% | 35% | 55% |
| Hide in Shadows | 10% | 25% | 45% |
| Pick Pockets | 20% | 35% | 55% |
| Hear Noise | 1-i-6 | 2-i-6 | 3-i-6 |

Backstab: +4 angreb, ×2 skade (niv 1–4), ×3 (5–8), ×4 (9+).

---

## 8. Turn Undead

| Cleric niv | Skeleton | Zombie | Ghoul | Wight | Wraith |
|-----------|----------|--------|-------|-------|--------|
| 1 | 7 | 9 | 11 | – | – |
| 3 | T | T | 7 | 9 | 11 |
| 5 | D | T | T | 7 | 9 |
| 7 | D | D | T | T | 7 |

T = automatisk turned. D = automatisk destroyed. Tal = 2d6 ≥ tal.

---

## 9. Encumbrance & Bevægelse

| Last (cn) | Movement |
|-----------|----------|
| 0–400 | 120'(40') |
| 401–600 | 90'(30') |
| 601–800 | 60'(20') |
| 801–1600 | 30'(10') |

Dungeon exploration: mv rate/turn. Kamp: 1/3 mv/runde. Wilderness: mv÷5 = miles/dag.

Terrain: Vej ×1.5, Slette ×1, Skov/bakker ×2/3, Bjerge/sump ×1/2.

---

## 10. DM-procedurer

### Dungeon Turn-sekvens
1. Wandering monster check (1d6, 1=encounter, hvert 2. turn)
2. Spillere erklærer handling
3. DM afgør tid (de fleste handlinger = 1 turn = 10 min)
4. Resultat → registrér tid (fakler, spells, rationer)

### Encounter-procedure
1. Distance: 2d6×10 fod (dungeon), 4d6×10 yards (wilderness åben)
2. Surprise: 1d6, 1–2 = overrasket
3. Reaction roll: 2d6 + CHA mod
4. Initiative: 1d6/side, lavest først
5. Kamp-runder til slut, flugt eller forhandling
6. Morale check ved trigger

### Dungeon Stocking (pr. rum, 1d6)
1 = Monster | 2 = Monster+skat | 3 = Fælde | 4 = Special | 5 = Tom (spor) | 6 = Tom

### Wilderness daglig procedure
Retning → bevægelse (mv÷5 miles/dag) → encounter check (1-i-6 pr. fase) → navigation check i svært terrain (1–2/6=farer vild) → rationer → camp+vagtplan.

### Lys
Fakkel: 30' radius, 6 turns. Lanterne: 30', 24 turns. Infravision: 60' (dværge, elver, halfling) — ophæves af lys.

---

## 11. Treasure & XP

### Treasure Types (udvalgte)
A: 25% 1d6×1000cp, 30% 1d6×1000sp, 35% 1d6×1000gp, 50% 6d6 gems, 40% 3 magiske.
B: 50% 1d8×1000cp, 25% 1d6×1000sp, 25% 1d3×1000gp, 10% sværd/rustning.
D: 50% 1d6×1000gp, 30% 1d8 gems, 15% 2 magiske + 1 potion.

1 gp fundet = 1 XP. Treasure er den primære XP-kilde.

### XP pr. monster HD (udvalgte)
Under 1 HD: 5 XP. 1 HD: 10. 2 HD: 20. 3 HD: 35. 4 HD: 75. 5 HD: 175. 6 HD: 275. 7 HD: 450. 8 HD: 650.

### Klasse XP krav
| Niv | Fighter | Cleric | MU | Thief |
|-----|---------|--------|----|-------|
| 2 | 2000 | 1500 | 2500 | 1200 |
| 3 | 4000 | 3000 | 5000 | 2400 |
| 5 | 16000 | 12000 | 20000 | 9600 |
| 9 | 240000 | 100000 | 300000 | 160000 |

---

## 12. Domæne & War Machine

### Domæne (niv 9+, månedlig)
1. Skatteindtægt: 1–10 gp/familie/måned
2. Udgifter: garnison, vedligeholdelse
3. Morale: 2d6 + modifiers
4. Event (d20): 1=monsterangreb, 3–4=pest, 5=naturkatastrofe, 6–7=dårlig høst, 8=ambassadør, 10–12=stabil, 13=opdagelse, 16=magtkamp, 17=krig, 18=magisk anomali, 20=dobbelt-event

### War Machine (forenklet)
BFR = tropper × HD × modifier. Terrain/ledelse/magi modifiers. d% rul → effektiv BFR → tab som % af tabende side.

---

## 13. Grimdark-teknik

### Fem søjler
1. **Sanselig beskrivelse:** Min. 3 sanser i vigtige scener
2. **Moralske gråzoner:** Valg uden perfekt løsning, 1 dilemma/session
3. **Konsekvenser:** Verden husker alt — direkte, indirekte, systemiske
4. **Verden er ligeglad:** Vejr, politik, tilfældighed, tid
5. **Håb som belønning:** Sjældne lysindslag, earned victories

### Tone-kalibrering
Skala 3/5 — mørkt med håb. Grimdark ≠ torturporno ≠ nihilisme. Respektér spillernes grænser.

### NPC-stemmer
Veteran (kort, barsk). Adelig (formelt, beregnende). Bonde (desperat, rystende). Handelsmand (professionel, kold). Præst (fanatisk, absolut).

### Pacing
Spænding → Ro → Spænding → KLIMAKS → Ro. Kontrast gør mørket stærkere.

---

## 14. Hirelings & Retainers

Hirelings: korttid, 1–6 sp/dag. Retainers: langvarige, halv skat-andel. Max retainers = CHA-baseret (CHA 3=1, 13–15=5, 18=7). Morale base 7, check ved fare/tab/risiko.

---

## 15. General Skills

4 slots ved niv 1 + INT bonus. +1/4 niveauer. Check: 1d20 ≤ ability score. Modifiers: -4 let, +4 meget svært.

Eksempler: Riding (DEX), Tracking (INT), Knowledge (INT), Craft (INT/DEX), Persuasion (CHA), Survival (INT), Navigation (INT), Alertness (DEX).

---

## 16. Weapon Mastery

| Rank | Min niv | Angreb | Skade | AC |
|------|---------|--------|-------|----|
| Basic | 1 | +0 | +0 | +0 |
| Skilled | 4+ | +2 | +2 | +2 |
| Expert | 8+ | +3 | +1d6 | +3 |
| Master | 12+ | +4 | +2d6 | +4 |
| Grand Master | 16+ | +5 | +3d6 | +5 |

Fighter: 4 slots niv 1, +1/3 niveauer. Cleric: 2 slots, +1/4 niv. MU: 1 slot, +1/6 niv. Thief: 2 slots, +1/4 niv.
