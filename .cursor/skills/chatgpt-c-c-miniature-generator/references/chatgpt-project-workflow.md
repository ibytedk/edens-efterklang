# ChatGPT-project workflow

## Fast projekt-URL

Brug altid denne side:

`https://chatgpt.com/g/g-p-695525e12e4481918efda89f0809b1ed-c-c-miniature-figure-generator/project`

Hvis brugeren beder om en anden side, saa bekraeft foerst at workflowet maa aendres.

## Klarsignaler i UI'et

Fortsaet foerst naar mindst ét af disse tegn er synligt i snapshot eller browseren:

- et tekstfelt/composer klar til besked
- eksisterende projekttraad med tidligere generationssvar
- en vaerktoejsknap eller label for billedgenerering

Hvis login-siden eller en generel landing page vises, stop og bed brugeren logge ind manuelt.

## Promptskabelon

Brug engelsk prompt som standard. Hold den kort, men præcis.

```text
Create a single image for a Creatures & Chronicles tabletop miniature reference.
Subject: [creature or character name/type].
Framing: full body, centered, readable silhouette.
Style: grim dark fantasy miniature concept art, high detail, practical materials, believable gear.
Pose: [pose or action].
Must include: [weapons, armor, anatomy, symbols, key traits].
Background: simple neutral studio or subdued parchment backdrop, no clutter.
Mood: [tone].
Avoid: text, watermark, cropped limbs, extra fingers, duplicate gear, busy background, multiple subjects.
```

Tilføj kun flere detaljer, hvis brugeren faktisk har givet dem.

## Promptregler for C&C

- Hold ét motiv per prompt som standard.
- Prioritér læsbar silhuet og tydeligt udstyr over filmisk baggrund.
- Brug "grim dark fantasy" eller tilsvarende, naar tonen skal passe til settingen.
- Naevn fraktion, heraldik eller kulturmarkoerer kun hvis brugeren har specificeret dem.
- Hvis brugeren vil have varianter, lav små ændringer i positur, udstyr eller stemning mellem kørslerne.

## Gemmestrategi

Brug denne prioritet:

1. Native download-knap i UI'et.
2. Browser-intern element-screenshot af det seneste genererede billede.
3. Direkte download fra billed-URL, hvis browseren kan hente den stabilt.

### Browserkode til screenshot-fallback

Brug dette mønster, hvis der ikke findes en download-knap:

```javascript
async (page) => {
  const images = page.locator('img');
  const count = await images.count();
  if (!count) throw new Error('No generated image found');
  const target = images.nth(count - 1);
  await target.scrollIntoViewIfNeeded();
  const path = 'output/chatgpt-miniatures/2026-03-30-subject-v01.png';
  await target.screenshot({ path });
  return path;
}
```

Tilpas filnavnet foer koerslen.

### Browserkode til at laese sidste billed-URL

Brug kun dette, hvis du specifikt vil proeve en direkte download:

```javascript
async (page) => {
  const images = page.locator('img');
  const count = await images.count();
  if (!count) return null;
  return await images.nth(count - 1).evaluate((el) => el.currentSrc || el.src || null);
}
```

Hvis URL'en er kortlivet, cookie-beskyttet eller ustabil, gaa tilbage til screenshot-fallback.

## Navngivning

Brug versionsnavne og overskriv ikke:

- `2026-03-30-bog-witch-v01.png`
- `2026-03-30-bog-witch-v02.png`
- `2026-03-30-ogre-brute-v01.png`

Slug motivnavnet og hold filnavne korte.

## Fejlhaandtering

- Hvis billedgenerering fejler: gem screenshot af fejlvisningen og rapporter fejlteksten.
- Hvis UI'et har flyttet knapper: tag nyt snapshot og identificer den nye kontrol via label eller rolle.
- Hvis flere billeder er synlige i traaden: vaelg det sidst genererede, ikke det foerste billede paa siden.
