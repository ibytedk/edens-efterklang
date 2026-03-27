# Niveau 3 - Praktisk Navigationskort

Kilde: `Niveau 3_ Det Øverste Tempel (source of truth) (vigtigt - Det rigtige kort).md`

Dette dokument er et **navigationskort**, ikke et skala-kort. Det er lavet for at være brugbart ved bordet.

Hvis du vil lave et egentligt floorplan senere, skal det tegnes særskilt rum for rum. Source-of-truth-filen giver sikre forbindelser og nogle retninger, men ikke komplette mål/koordinater for hele niveauet.

## Hurtig læsning

- **Zone A** er indgangen og leder frem til **R9**, som er det første store knudepunkt.
- Fra **R9** kan man gå:
  - syd til `R10`
  - vest til **Zone B** via `R11`
  - øst til **Zone C** via `R25`
- **Zone B** er en relativt lineær fløj med Svends spor og arkivrum.
- **Zone C** er den komplekse fløj. Tænk den som tre baner ud fra `R26`.
- **Zone D** er enkel: en lige tilgang `R41 -> R44`, og derefter et hub i `R44`.

## Praktisk navigationskort

```text
NIVEAU 3: DET OEVERSTE TEMPEL
Tegn: -- passage   .. skjult/hemmelig   > skakt   => overgang til anden zone
N er opad i zone-skitserne, men dette er ikke et skala-kort.


ZONE A - ANKOMST (R1-R10)

        [R2]
          |
Niv.2 -> [R1]
          |
       [R3]--[R4]
          |
         [R5]
          |
    [R7]-[R6]-[R8]
          |
         [R9]--[R10]
          | \
          |  \=> øst til R25
          \==> vest til R11


ZONE B - VESTFLØJEN (R11-R24)

[R11]--[R12]--[R13]
                 |
                [R14]
                 |
            [R15]..[R16]
                 |
                [R17] => øst til R25
                 |
                [R18]
                 |
                [R19]
                 |
                [R20]--[R21]--[R24]
                          |
                        [R22]..[R23]


ZONE C - ØSTFLØJEN (R25-R40)

                 [R27]--[R30]--[R32] > R45
                   |           ^
[R25]--[R26]--[R28]--[R31]--[R33]--[R35]--[R38]--[R39]--[R40]
          |                  |       |       ^
          |                  |       |       |
        [R29]--[R34]--[R36]--+       +-----[R37]

Tværforbindelser i Zone C:
- R31--R32
- R33--R34
- R35--R36
- R35--R38
- R37--R38


ZONE D - DET TOMME FÆNGSEL (R41-R50)

fra R40 -> [R41]--[R42]--[R43]--[R44]
                                  |--[R45]
                                  |--[R46]
                                  |--[R47]
                                  |--[R48]
                                  |--[R49]
                                  \--[R50]
```

## Zone for zone

### Zone A

Hovedrute:

- `R1 -> R3 -> R5 -> R6 -> R9`

Sidegrene:

- `R2` fra `R1`
- `R4` fra `R3`
- `R7` og `R8` fra `R6`
- `R10` fra `R9`

Vigtig pointe:

- `R9` er det egentlige knudepunkt. Det er herfra, man går til `R10`, `R11` eller `R25`.

### Zone B

Hovedrute:

- `R11 -> R12 -> R13 -> R14 -> R15 -> R17 -> R18 -> R19 -> R20 -> R21`

Afgreninger:

- `R16` er skjult fra `R15`
- `R22` og `R24` ligger ud fra `R21`
- `R23` er hemmelig fra `R22`

Overgang:

- `R17 -> R25`

### Zone C

Start:

- `R25 -> R26`

Nordrute:

- `R26 -> R27 -> R30 -> R32 -> skakt -> R45`

Midterrute:

- `R26 -> R28 -> R31 -> R33 -> R35 -> R38 -> R39 -> R40`

Sydrute:

- `R26 -> R29 -> R34 -> R36 -> R37`

Tværforbindelser:

- `R31 -> R32`
- `R33 -> R34`
- `R35 -> R36`
- `R35 -> R38`
- `R37 -> R38`

### Zone D

Indgang:

- `R40 -> R41 -> R42 -> R43 -> R44`

Hub:

- Fra `R44` går man til `R45`, `R46`, `R47`, `R48`, `R49` og `R50`

## Rum for rum

### Zone A - Rum 1-10

#### R1. Landingsstedet

Forbindelser: Nord til `R2`. Syd til `R3`.

#### R2. Vagtposten (Nord)

Forbindelser: Syd til `R1`.

#### R3. Den Brede Korridor (Sydgående)

Forbindelser: Nord til `R1`. Øst til `R4`. Syd til `R5`.

#### R4. Udstyrsrummet (Øst)

Forbindelser: Vest til `R3`.

#### R5. Det Knuste Galleri

Forbindelser: Nord til `R3`. Syd til `R6`.

#### R6. Broen over Intetheden

Forbindelser: Nord til `R5`. Vest til `R7`. Øst til `R8`.

#### R7. Vestlig Udkigspost

Forbindelser: Øst til `R6`.

#### R8. Østlig Udkigspost

Forbindelser: Vest til `R6`.

#### R9. Krydset

Forbindelser: Nord til `R6`. Syd til `R10`. Vest til `R11`. Øst til `R25`.

#### R10. Hvilepladsen

Forbindelser: Nord til `R9`.

### Zone B - Rum 11-25

#### R11. Renselsens Forhal

Forbindelser: Øst til `R9`. Vest til `R12`.

#### R12. Gammelt Lager

Forbindelser: Øst til `R11`. Vest til `R13`.

#### R13. Det Sorte Spejlbassin

Forbindelser: Øst til `R12`. Syd til `R14`.

#### R14. Bibliotekets Forhal

Forbindelser: Nord til `R13`. Syd til `R15`.

#### R15. Det Lille Arkiv

Forbindelser: Nord til `R14`. Vest til `R17`. Sydvest via skjult passage til `R16`.

#### R16. Svends Skjulested

Forbindelser: Øst via skjult passage til `R15`.

#### R17. Kortrummet

Forbindelser: Øst til `R15`. Syd til `R18`. Vest til `R25`.

#### R18. Sovekammer for Præster

Forbindelser: Nord til `R17`. Syd til `R19`.

#### R19. Køkkenet

Forbindelser: Nord til `R18`. Syd til `R20`.

#### R20. Spisehallen

Forbindelser: Nord til `R19`. Øst til `R21`.

#### R21. Våbenkammeret (Plyndret)

Forbindelser: Vest til `R20`. Syd til `R22`. Nord til `R24`.

#### R22. Meditationscellen

Forbindelser: Nord til `R21`. Nord via hemmelig passage til `R23`. Øst til `R24`.

#### R23. Det Skjulte Alter

Forbindelser: Syd via hemmelig passage til `R22`.

#### R24. Trappen op (Blokeret)

Forbindelser: Vest til `R22`.

#### R25. Korridoren med Relieffer

Forbindelser: Vest til `R17`. Øst til `R26`.

### Zone C - Rum 26-40

#### R26. Indgangen til Mørket (Hub)

Forbindelser: Vest til `R25`. Nord til `R27`. Øst til `R28`. Syd til `R29`.

#### R27. Krystallernes Rum

Forbindelser: Syd til `R26`. Øst til `R30`.

#### R28. Laboratoriet

Forbindelser: Vest til `R26`. Øst til `R31`.

#### R29. Fængselsceller

Forbindelser: Nord til `R26`. Øst til `R34`.

#### R30. Torturkammeret (Nyere)

Forbindelser: Vest til `R27`. Øst til `R32`.

#### R31. Olie-rummet

Forbindelser: Vest til `R28`. Nord til `R32`. Øst til `R33`.

#### R32. Ventilationsskakten

Forbindelser: Vest til `R30`. Syd til `R31`. Nord via skakt til `R45`.

#### R33. Det Ekkoende Rum

Forbindelser: Vest til `R31`. Øst til `R35`. Syd til `R34`.

#### R34. Svampeskoven

Forbindelser: Nord til `R33`. Vest til `R29`. Øst til `R36`.

#### R35. Det Glemte Skatkammer (Låst)

Forbindelser: Vest til `R33`. Øst til `R38`. Syd til `R36`.

#### R36. Rustkammeret

Forbindelser: Nord til `R35`. Vest til `R34`. Øst til `R37`.

#### R37. Knoglegruben

Forbindelser: Vest til `R36`. Nord til `R38`.

#### R38. Vagtpost Øst

Forbindelser: Vest til `R35`. Syd til `R37`. Øst til `R39`.

#### R39. Den Revnede Væg

Forbindelser: Vest til `R38`. Øst til `R40`.

#### R40. Forberedelsesrummet

Forbindelser: Øst til `R39`. Vest til `R41`.

### Zone D - Rum 41-50

#### R41. Tærsklen til Tomheden

Forbindelser: Øst til `R40`. Syd til `R42`.

#### R42. Vogternes Statuer

Forbindelser: Nord til `R41`. Syd til `R43`.

#### R43. De Store Porte

Forbindelser: Nord til `R42`. Syd til `R44`.

#### R44. Forhallen

Forbindelser: Nord til `R43`. Nordvest til `R50`. Vest til `R45`. Øst til `R46`. Sydvest til `R47`. Syd til `R48`. Sydøst til `R49`.

#### R45. Sidekammer Vest

Forbindelser: Øst til `R44`. Vest via skakt til `R32`.

#### R46. Sidekammer Øst

Forbindelser: Vest til `R44`.

#### R47. Nedgangen til Dybet (VIGTIGT)

Forbindelser: Nord til `R44`.

#### R48. Alteret for Lys

Forbindelser: Nord til `R44`.

#### R49. Alteret for Mørke

Forbindelser: Nord til `R44`.

#### R50. Det Tomme Kammer (The Breach - Updated)

Forbindelser: Sydøst til `R44`.

## Hvad der gjorde det gamle kort forvirrende

- Det blandede **rigtigt kort**, **forbindelsesdiagram**, **zoneoversigt** og **rumindex** i samme blok.
- Det gav Zone A et misvisende flow. Den vigtige overgang er fra **R9**, ikke fra **R6**.
- Zone C blev vist som ét langt mønster, selv om det ved bordet er langt lettere at forstå som:
  - en nordrute
  - en midterrute
  - en sydrute
  - få tværforbindelser

## Anbefalet næste skridt

Hvis du vil have det helt skarpt, så lav niveau 3 i tre lag:

1. Brug dette dokument som **bord-navigationskort**.
2. Tegn kun et egentligt **DM-floorplan** for Zone C og D, hvor kompleksiteten er størst.
3. Behold room descriptions i source-of-truth-filen som kanon, og ret kun kortet hvis rum-forbindelserne ændres.
