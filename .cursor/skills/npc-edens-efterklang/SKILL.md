---
name: npc-edens-efterklang
description: Creates NPC characters in Edens Efterklang style with BECMI/RC stats, Danish text, and three templates (adel/antagonist, PC companion, supporting). Use when creating or editing NPCs for Edens Efterklang, when the user asks for NPCs in the style of Lensbaron Eirik, Gileath, or Rikke Egebak, or when writing character writeups with Evnepoint, Klasse & Niveau, and Potentiel rolle for spillerne.
---

# NPC'er i Edens Efterklang-stil

Alle NPC'er skrives på **dansk** og følger **BECMI/RC**-regler (THAC0, Saving Throws, Weapon Mastery: Basic, Trænet/Trained, Skilled, Ekspert/Expert). Brug eksisterende NPC-filer i `NPC/` som kanoniske eksempler; opfind ikke nye sektionsnavne eller felter ud over dem nedenfor.

---

## Vælg NPC-type

| Type | Brug til | Kanonisk eksempel |
|------|----------|--------------------|
| **A – Adel/Antagonist** | Lensbaroner, rivaler, questgivere med domain | `NPC/Dalhul Len/Østerdal Herred/Dalhulborg/Lensbaron Eirik af Dalhulborg.md` |
| **B – PC/Kompagnon** | Spillerfølgesvend, lærling, mulig PC-kontakt | `NPC/Gileath.md` |
| **C – Supporting/Lokal** | Tavernavært, købmand, håndværker, præst | `NPC/.../Dalhulby/Rikke Egebak – Tavernavært og Landsbyleder.md`, `Købmanden Thorbjørn – Byens Købmand.md` |

---

## Fælles krav (alle typer)

- **Sprog:** Dansk.
- **Evnepoint (Ability Scores):** STR, INT, WIS, DEX, CON, CHA – med tal. Ved type C kan kort rationale stå i parentes (fx "Afspejler robusthed og fysisk energi").
- **Klasse & Niveau:** Klasse, Niveau, Alignment/Livsanskuelse. Ved type C: kort begrundelse i parentes.
- **Grundlæggende Statistikker:** HP, AC, THAC0 (eller angrebsbonus ved lave niveauer), Saving Throws (Dødsstråle/Gift, Magisk Stav, Forstening/Paralyse, Drageånde, Besværgelser). Sidehenvisninger (fx "Side 109") hvor det understøtter reglerne.
- **Kampstatistikker:** Angreb (Melee), Angreb (Ranged), evt. skade pr. våben.
- **Færdigheder (Skills):** Våbenbeherskelse (Weapon Mastery) + Generelle Færdigheder. Niveauer: Basic, Trænet (Trained), Skilled, Ekspert (Expert). Ved type C: kort rationale i parentes.
- **Udstyr:** Grupperet (Våben, Rustning, Tøj & Tilbehør, evt. Magiske Genstande). Konkrete genstande og evt. værdi (gp).
- **Rolle for spillerne:** Altid en sektion der binder NPC'en til spillerne – "Potentiel rolle for spillerne" (A, C) eller "Hooks" / "Relationer" (B).

---

## Type A – Adel/Antagonist

**Sektionsrækkefølge (efter Eirik-eksemplet):**

1. **Titel** (H1): **Navn** (fx **Lensbaron Eirik af Dalhulborg**).
2. **Udseende:** Bullet med fysisk beskrivelse, tøj/emblemer, kropsholdning.
3. **Karaktertræk og Personlighed:** Flere bullets; bland narrativ og korte træk (fx "Strategisk og intelligent", "Retfærdig i sin dømmekraft, men frygter at fremstå svag").
4. **Bopæl & Omgivelser:** Hvor de bor og hvor spillerne typisk møder dem (fx storsal, gobeliner). **Terminologi:** Beskriv bygningen som **fæstning** eller **slot** (fx Eiriksfæste, Grevskov Slot) – aldrig som "borg"; **borg** er forbeholdt området (fx Dalhulborg).
5. **Familie:** Hustru/ægtefælle (navn + én linje), børn med navn, alder og kort træk. Evt. politisk rolle (fx "bruges i Eiriks politiske planer").
6. **Viden:** Bullets med plot-relevant viden (intriger, hemmeligheder, hvad de ved om quests).
7. **Rivaler / Baggrund og Frygt / Trusler mod [sted]:** Nummereret liste over trusler/rivaler med kort beskrivelse.
8. **[Navns] Ambitioner:** Bullets med mål (handel, militær, politiske ægteskaber).
9. **Evnepoint** → **Klasse & Niveau** → **Grundlæggende Statistikker** → **Kampstatistikker** (våben med skade) → **Færdigheder** → **Udstyr**.
10. **Potentiel rolle for spillerne:** Questgiver, Allieret, Politisk brik, Far/ familie-sårbarhed osv.
11. **Domain-blok** (hvis de hersker over et område): Titel & Landområde, Befolkning, Skatteindtægter, Militær styrke, Bygninger & Infrastruktur, Politisk position.
12. **Reaktioner til spillerne:** Korte bullets (fx "Neutral-positiv til helte", "Mistænksom over for fremmede").

---

## Type B – PC/Kompagnon

**Sektionsrækkefølge (efter Gileath-eksemplet):**

1. **Titel** (H3): **Navn – Kort betegnelse (Race, Klasse Niveau)**. Under: Type, Klasse/Niveau, Alignment, Alder, Sted.
2. **Stats:** AC, HP, THAC0, Angreb (våben + skade/rækkevidde), Saves.
3. **Evner (Ability Scores, skønnet):** STR, DEX, CON, INT, WIS, CHA.
4. **Sprog:** Liste (Common, human, elf, …).
5. **Skills:** Navn (evt. ability): Kort beskrivelse. (Fx "Knowledge: Magical Theory (INT 16): Identificering af magi og Dunkleriet.")
6. **Beskrivelse:** Ét afsnit – udseende, tøj, baggrund (fx familie, forsvundet far), personlighed i én sætning.
7. **Spells** (hvis magiker): Daglige spells, Kendte spells (liste), signature spell med forklaring (fx "Han starter dagen med at memorizere **Sleep** – hans yndlingsbesværgelse...").
8. **Udstyr:** Liste inkl. magiske genstande og værdi (gp/sp).
9. **Personlighed:** Bullets (idealistisk, nysgerrig, frustreret over X).
10. **Relationer i [sted]:** Navn: Kort relation (fx "Mester Valdemar: Tidligere læremester – ser Gileath som begavet, men for impulsiv."). Inkl. **Spillergruppen**.
11. **Morale & Reaktion:** Morale-tal, Reaktion (fx "Venlig, respektfuld og ivrig").
12. **Hooks:** Bullets med quest- og plot-hooks (fx "Søger sandheden om sin fars skæbne", "Amulet kan reagere på magiske forstyrrelser").

---

## Type C – Supporting/Lokal NPC

**Sektionsrækkefølge (efter Rikke og Thorbjørn):**

1. **Titel** (H1): **Navn – Rolle** (fx **Rikke Egebak – Tavernavært og Landsbyleder**).
2. **Rolle:** Ét afsnit – hvad de gør for landsbyen/spillerne (anker for rygter, quests, arrangør, kilde til lore). Samme tone som i eksemplerne.
3. **Udseende:** Én linje (alder, krop, udstråling).
4. **Personlighed:** Ét afsnit – praktisk/jovial/autoritet, evne til at se potentiale, bedømmer i konkurrencer osv.
5. **Viden:** Én linje eller bullets – hvad de ved (traditioner, historie, lore, rygter).
6. **Evnepoint** (med korte rationale i parentes hvor det giver mening).
7. **Klasse & Niveau** (med kort begrundelse: fx "Fighter – robusthed og praktisk natur, kamp primært social/organisatorisk").
8. **Grundlæggende Statistikker** (HP, AC, Saving Throws – evt. med sidehenvisning).
9. **Kampstatistikker** (Melee/Ranged bonus, evt. skade for typisk våben).
10. **Færdigheder:** Weapon Mastery + General Skills med rationale (fx "Profession (Tavernavært): Ekspert – Afspejler hendes dybe kendskab...").
11. **Udstyr:** Våben, Rustning, Tøj & Tilbehør, Magiske Genstande (eller "Ingen").
12. **Potentiel rolle for spillerne:** Hvordan de bruges som kilde til info, quests, udstyr – konkret som i Thorbjørn/Rikke.
13. **Besværgelser:** "Ingen" hvis ikke caster (eller liste hvis magiker).

---

## Stil og kvalitet

- **Konkrete detaljer:** Navne på steder (Dalhulby, Eiriksfæste, Den Gamle Ølkælder), på andre NPC'er og på genstande. Ingen generisk "en landsby" eller "en baron".
- **Plot og verden:** Viden, rivaler og hooks skal knytte sig til den eksisterende verden og eventuelle quests (fx sommerhuset, Svend, Lensgreve Otto).
- **Ingen ukendte felter:** Brug kun sektionsnavne og termer der forekommer i de nævnte eksempelfiler. Ved tvivl: tjek `NPC/`-filene.

---

## Reference

- Kanoniske eksempler: `NPC/Dalhul Len/Østerdal Herred/Dalhulborg/Lensbaron Eirik af Dalhulborg.md`, `NPC/Gileath.md`, `NPC/.../Dalhulby/Rikke Egebak – Tavernavært og Landsbyleder.md`, `NPC/.../Dalhulby/Købmanden Thorbjørn – Byens Købmand.md`.
- Udvidet sektionslister og citater: [reference.md](reference.md).
