(function () {
  const DATA = window.BECMI_TREASURE_DATA;
  const COINS = ["cp", "sp", "ep", "gp", "pp"];
  const WEAPON_CATEGORIES = new Set(["missileWeapon", "sword", "miscWeapon"]);

  const $type = document.getElementById("treasureType");
  const $count = document.getElementById("rollCount");
  const $rollBtn = document.getElementById("rollBtn");
  const $resetBtn = document.getElementById("resetBtn");
  const $error = document.getElementById("errorBox");
  const $summary = document.getElementById("summary");
  const $results = document.getElementById("results");
  const $notes = document.getElementById("verificationNotes");
  const $checklist = document.getElementById("verificationChecklist");
  const $testStatus = document.getElementById("testStatus");

  function randomInt(rng, min, max) {
    return Math.floor(rng() * (max - min + 1)) + min;
  }

  function rollD100(rng) {
    return randomInt(rng, 1, 100);
  }

  function parseRollExpr(expr) {
    const normalized = String(expr).trim().toLowerCase().replace(/\s+/g, "");
    if (/^\d+$/.test(normalized)) {
      return { type: "flat", value: Number(normalized) };
    }
    const dice = normalized.match(/^(\d+)d(\d+)(?:([+x*×])(\d+))?$/);
    if (dice) {
      const op = dice[3] || null;
      const opValue = dice[4] ? Number(dice[4]) : 0;
      return {
        type: "dice",
        count: Number(dice[1]),
        sides: Number(dice[2]),
        add: op === "+" ? opValue : 0,
        multiply: op && op !== "+" ? opValue : 1,
      };
    }
    throw new Error(`Ugyldigt rollExpr: ${expr}`);
  }

  function rollExpr(expr, rng) {
    const parsed = parseRollExpr(expr);
    if (parsed.type === "flat") return parsed.value;
    let total = parsed.add;
    for (let i = 0; i < parsed.count; i++) {
      total += randomInt(rng, 1, parsed.sides);
    }
    if (parsed.multiply && parsed.multiply !== 1) {
      total *= parsed.multiply;
    }
    return total;
  }

  function rollRange(table, rng) {
    const r = rollD100(rng);
    const hit = table.find((entry) => r >= entry.min && r <= entry.max);
    if (!hit) throw new Error(`Ingen range-match for rul ${r}`);
    return hit;
  }

  function chanceOk(chancePct, rng) {
    if (chancePct == null) return true;
    return rollD100(rng) <= chancePct;
  }

  function initTypeOptions() {
    const allTypes = [...Object.keys(DATA.lairTypes), ...Object.keys(DATA.carriedTypes)].sort();
    allTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = `${type} (${DATA.lairTypes[type] ? "Lair" : "Carried"})`;
      $type.appendChild(option);
    });
  }

  function renderNotes() {
    $notes.innerHTML = "";
    DATA.verificationNotes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      $notes.appendChild(li);
    });
  }

  function renderChecklist() {
    $checklist.innerHTML = "";
    Object.keys(DATA.verificationChecklist)
      .sort()
      .forEach((type) => {
        const li = document.createElement("li");
        const ok = DATA.verificationChecklist[type];
        li.textContent = `${type}: ${ok ? "Verificeret mod PDF" : "Mangler verifikation"}`;
        $checklist.appendChild(li);
      });
  }

  function coinGpValue(coins) {
    return COINS.reduce((sum, coin) => sum + (coins[coin] || 0) * DATA.coinToGp[coin], 0);
  }

  function rollGem(rng) {
    const row = rollRange(DATA.gemValueTable, rng);
    if (!row.special) {
      const gemType = row.types[randomInt(rng, 0, row.types.length - 1)];
      return { name: gemType, valueGp: row.valueGp, note: "Standard gem" };
    }

    const specialRoll = randomInt(rng, 1, 2);
    if (specialRoll === 1) {
      const starstoneBase = [
        { type: "Carbuncle", valueGp: 1000 },
        { type: "Opal", valueGp: 1000 },
        { type: "Emerald", valueGp: 5000 },
        { type: "Ruby", valueGp: 5000 },
        { type: "Sapphire", valueGp: 5000 },
        { type: "Jacinth", valueGp: 10000 },
      ];
      const base = starstoneBase[randomInt(rng, 0, starstoneBase.length - 1)];
      return { name: `Star ${base.type}`, valueGp: base.valueGp * 2, note: "Special gem (starstone)" };
    }

    const tristalColors = ["Golden yellow", "Deep violet", "Brilliant orange"];
    return {
      name: `Tristal (${tristalColors[randomInt(rng, 0, tristalColors.length - 1)]})`,
      valueGp: randomInt(rng, 1, 100) * 1000,
      note: "Special gem (tristal)",
    };
  }

  function rollJewelry(rng) {
    const valueRow = rollRange(DATA.jewelryValueTable, rng);
    const column =
      valueRow.valueGp <= 3999
        ? DATA.jewelryTypeTable.common
        : valueRow.valueGp <= 14999
          ? DATA.jewelryTypeTable.uncommon
          : DATA.jewelryTypeTable.rare;
    const type = column[randomInt(rng, 0, column.length - 1)];
    return { name: type, valueGp: valueRow.valueGp, enc: valueRow.enc };
  }

  function rollSpecialTreasure(rng) {
    const row = rollRange(DATA.specialTreasureTable, rng);
    const enc = rollExpr(row.encExpr, rng) * (row.encScale || 1);
    let valueGp = 0;
    if (row.valuePerEncExpr) {
      valueGp = rollExpr(row.valuePerEncExpr, rng) * enc;
    } else {
      valueGp = rollExpr(row.valueExpr, rng) * (row.valueScale || 1);
    }
    return {
      name: row.item,
      valueGp,
      enc,
      unit: row.unit || null,
    };
  }

  function generateSpellScroll(rng) {
    const typeRow = rollRange(DATA.magic.spellScrollType, rng);
    const count = rollExpr("1d3", rng);
    const levels = [];
    const levelTable =
      typeRow.type === "Magical" ? DATA.magic.spellLevels.magicUser : DATA.magic.spellLevels.clericOrDruid;
    for (let i = 0; i < count; i++) {
      levels.push(rollRange(levelTable, rng).level);
    }
    return `${typeRow.type} Spell Scroll (${count} spells: lvl ${levels.join(", ")})`;
  }

  function generateArmorOrShield(rng) {
    const size = rollRange(DATA.magic.armor.sizeTable, rng).value;
    const type = rollRange(DATA.magic.armor.typeTable, rng);
    const bonusRow = rollRange(DATA.magic.armor.bonusTables[type.group], rng);
    let label = `${type.value} +${bonusRow.bonus} (${size})`;
    if (chanceOk(bonusRow.specialChance, rng)) {
      const special = rollRange(DATA.magic.armor.specialPowers, rng).value;
      label += ` [Special: ${special}]`;
    }
    return label;
  }

  function rollWeaponBonus(weaponClass, rng) {
    return rollRange(DATA.magic.weaponBonusTables[weaponClass], rng).bonus;
  }

  function rollWeaponTalent(rng) {
    return rollRange(DATA.magic.weaponTalents, rng).name;
  }

  function rollWeaponOpponent(rng) {
    return rollRange(DATA.magic.weaponOpponents, rng).name;
  }

  function rollAdditionalWeaponModifier(column, rng) {
    const row = rollRange(DATA.magic.additionalWeaponModifiers[column], rng);
    if (row.talent) {
      return { talent: rollWeaponTalent(rng) };
    }
    return { extra: row.extra, opponent: rollWeaponOpponent(rng) };
  }

  function formatAdditionalModifier(baseBonus, mod) {
    if (!mod) return "";
    if (mod.talent) return ` [Talent: ${mod.talent}]`;
    return ` [+${baseBonus + mod.extra} vs ${mod.opponent}]`;
  }

  function generateMissileWeaponOrMissile(rng) {
    const item = rollRange(DATA.magic.missileWeaponSubtable, rng);
    const bonus = rollWeaponBonus(item.weaponClass, rng);
    let label = `${item.item} +${bonus}`;

    if (item.weaponClass === "D") {
      const rangeRoll = randomInt(rng, 1, 4) + bonus;
      const rangeMultiplier = rangeRoll <= 4 ? 1 : rangeRoll <= 7 ? 1.5 : 2;
      if (rangeMultiplier !== 1) {
        label += ` [Range x${rangeMultiplier}]`;
      }

      const addChance = { 1: 30, 2: 25, 3: 20, 4: 15, 5: 10 }[bonus];
      if (chanceOk(addChance, rng)) {
        label += formatAdditionalModifier(bonus, rollAdditionalWeaponModifier("misc", rng));
      }
      return label;
    }

    const amountExpr = { 1: "2d10", 2: "2d8", 3: "2d6", 4: "2d4", 5: "1d4+1" }[bonus];
    const found = rollExpr(amountExpr, rng);
    label += ` (${found} found)`;
    const talentChance = { 1: 30, 2: 25, 3: 20, 4: 15, 5: 10 }[bonus];
    if (chanceOk(talentChance, rng)) {
      label += ` [Missile talent: ${rollRange(DATA.magic.missileTalents, rng).name}]`;
    }
    return label;
  }

  function rollSwordPrimaryPowers(count, rng) {
    const powers = [];
    let extraExtraordinary = 0;
    let pendingPrimary = count;
    let safety = 0;

    while (pendingPrimary > 0 && safety < 200) {
      safety += 1;
      pendingPrimary -= 1;
      const row = rollRange(DATA.magic.swordPrimaryPowers, rng);
      if (row.extraordinaryRolls) {
        extraExtraordinary += row.extraordinaryRolls;
        continue;
      }
      if (row.extraPrimaryRolls) {
        pendingPrimary += row.extraPrimaryRolls;
        continue;
      }
      powers.push(row.name);
    }

    return { powers, extraExtraordinary };
  }

  function rollSwordExtraordinaryPowers(count, rng) {
    const powers = [];
    let pending = count;
    let safety = 0;

    while (pending > 0 && safety < 200) {
      safety += 1;
      pending -= 1;
      const row = rollRange(DATA.magic.swordExtraordinaryPowers, rng);
      if (row.extraRolls) {
        pending += row.extraRolls;
        continue;
      }
      powers.push(row.name);
    }

    return powers;
  }

  function generateSword(rng) {
    const sword = rollRange(DATA.magic.swordSubtable, rng);
    const bonus = rollWeaponBonus(sword.weaponClass, rng);
    let label = `${sword.type} +${bonus}`;

    const addChance = { 1: 40, 2: 30, 3: 25, 4: 20, 5: 15 }[bonus];
    if (chanceOk(addChance, rng)) {
      label += formatAdditionalModifier(bonus, rollAdditionalWeaponModifier("sword", rng));
    }

    const intel = rollRange(DATA.magic.swordIntelligence, rng);
    if (!intel.int) return label;

    const info = [`INT ${intel.int}`, `Comm: ${intel.communication}`];
    if (intel.languages !== "Nil") {
      info.push(`Languages: ${rollExpr(intel.languages, rng)}`);
    }
    if (intel.readsMagic) {
      info.push("Reads magic");
    }

    const primary = rollSwordPrimaryPowers(intel.primaryCount, rng);
    if (primary.powers.length > 0) {
      info.push(`Primary: ${primary.powers.join(", ")}`);
    }

    const extraCount = intel.extraordinaryCount + primary.extraExtraordinary;
    if (extraCount > 0) {
      const extraordinary = rollSwordExtraordinaryPowers(extraCount, rng);
      if (extraordinary.length > 0) {
        info.push(`Extraordinary: ${extraordinary.join(", ")}`);
      }
    }

    label += ` [${info.join(" | ")}]`;
    return label;
  }

  function generateMiscWeapon(rng) {
    const weapon = rollRange(DATA.magic.miscWeaponSubtable, rng);
    const bonus = rollWeaponBonus(weapon.weaponClass, rng);
    let label = `${weapon.weapon} +${bonus}`;

    const addChance = { 1: 40, 2: 30, 3: 20, 4: 15, 5: 10 }[bonus];
    if (chanceOk(addChance, rng)) {
      if (bonus === 5) {
        label += ` [Talent: ${rollWeaponTalent(rng)}]`;
      } else {
        label += formatAdditionalModifier(bonus, rollAdditionalWeaponModifier("misc", rng));
      }
    }

    return label;
  }

  function generateMagicByCategory(category, rng) {
    if (category === "potion") return `Potion of ${rollRange(DATA.magic.potions, rng).name}`;
    if (category === "scroll") {
      const scroll = rollRange(DATA.magic.scrolls, rng);
      if (scroll.isSpellScroll) {
        return `Spell Scroll (${generateSpellScroll(rng)})`;
      }
      if (scroll.name.startsWith("Map to ")) {
        return `Map Scroll (${scroll.name.replace("Map to ", "")})`;
      }
      if (/scroll/i.test(scroll.name)) {
        return scroll.name;
      }
      return `Scroll of ${scroll.name}`;
    }
    if (category === "wandStaffRod") return rollRange(DATA.magic.wandStaffRod, rng).name;
    if (category === "ring") return rollRange(DATA.magic.rings, rng).name;
    if (category === "miscItem") return rollRange(DATA.magic.miscItems, rng).name;
    if (category === "armorOrShield") return generateArmorOrShield(rng);
    if (category === "missileWeapon") return generateMissileWeaponOrMissile(rng);
    if (category === "sword") return generateSword(rng);
    if (category === "miscWeapon") return generateMiscWeapon(rng);
    throw new Error(`Ukendt magic-kategori: ${category}`);
  }

  function magicCategoryLabel(category) {
    if (category === "potion") return "Potion";
    if (category === "scroll") return "Scroll";
    if (category === "wandStaffRod") return "Wand/Staff/Rod";
    if (category === "ring") return "Ring";
    if (category === "miscItem") return "Misc Item";
    if (category === "armorOrShield") return "Armor/Shield";
    if (category === "missileWeapon") return "Missile Weapon";
    if (category === "sword") return "Sword";
    if (category === "miscWeapon") return "Misc Weapon";
    return "Magic";
  }

  function rollAnyMagicItem(rng, excludeCategories = []) {
    let attempts = 0;
    while (attempts < 200) {
      attempts += 1;
      const category = rollRange(DATA.magic.mainTable, rng).category;
      if (!excludeCategories.includes(category)) {
        return {
          category,
          label: generateMagicByCategory(category, rng),
        };
      }
    }
    throw new Error("Kunne ikke vælge gyldig magic-kategori.");
  }

  function resolveFixedKind(kind, rng, excludeCategories) {
    if (kind === "any") return rollAnyMagicItem(rng, excludeCategories);
    if (kind === "potion") return { category: "potion", label: generateMagicByCategory("potion", rng) };
    if (kind === "scroll") return { category: "scroll", label: generateMagicByCategory("scroll", rng) };
    if (kind === "armor") return { category: "armorOrShield", label: generateMagicByCategory("armorOrShield", rng) };
    if (kind === "sword") return { category: "sword", label: generateMagicByCategory("sword", rng) };
    if (kind === "miscWeapon") return { category: "miscWeapon", label: generateMagicByCategory("miscWeapon", rng) };
    if (kind === "swordOrMiscWeaponOrArmor") {
      const pick = randomInt(rng, 1, 3);
      const cat = pick === 1 ? "sword" : pick === 2 ? "miscWeapon" : "armorOrShield";
      return { category: cat, label: generateMagicByCategory(cat, rng) };
    }
    return rollAnyMagicItem(rng, excludeCategories);
  }

  function rollMagicRecipe(ruleOrRecipe, rng) {
    const recipe = ruleOrRecipe.recipe ? ruleOrRecipe.recipe : ruleOrRecipe;
    const items = [];
    const excludeCategories = recipe.excludeCategories || [];

    (recipe.fixedPicks || []).forEach((pickDef) => {
      const count = rollExpr(pickDef.countExpr || "1", rng);
      for (let i = 0; i < count; i++) {
        items.push(resolveFixedKind(pickDef.kind, rng, excludeCategories));
      }
    });

    const anyCount = recipe.anyCount || 0;
    for (let i = 0; i < anyCount; i++) {
      items.push(rollAnyMagicItem(rng, excludeCategories));
    }

    return items;
  }

  function rollCoins(part1, rng) {
    const coins = { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
    COINS.forEach((coin) => {
      const r = part1[coin];
      if (!r) return;
      if (!chanceOk(r.chancePct, rng)) return;
      coins[coin] += rollExpr(r.rollExpr, rng) * (r.scale || 1);
    });
    return coins;
  }

  function rollPart2(part2, rng) {
    const out = { gems: [], jewelry: [], special: [], magicItems: [] };

    if (part2.gems && chanceOk(part2.gems.chancePct, rng)) {
      const count = rollExpr(part2.gems.rollExpr, rng) * (part2.gems.scale || 1);
      for (let i = 0; i < count; i++) out.gems.push(rollGem(rng));
    }

    if (part2.jewelry && chanceOk(part2.jewelry.chancePct, rng)) {
      const count = rollExpr(part2.jewelry.rollExpr, rng) * (part2.jewelry.scale || 1);
      for (let i = 0; i < count; i++) out.jewelry.push(rollJewelry(rng));
    }

    if (part2.special) {
      if (part2.special.rollExpr && chanceOk(part2.special.chancePct, rng)) {
        const count = rollExpr(part2.special.rollExpr, rng) * (part2.special.scale || 1);
        for (let i = 0; i < count; i++) out.special.push(rollSpecialTreasure(rng));
      } else if (part2.special.recipe && chanceOk(part2.special.chancePct, rng)) {
        const specials = rollMagicRecipe(part2.special, rng);
        specials.forEach((s) => out.special.push({ name: `Special: ${s.label}`, valueGp: 0, enc: 0 }));
      }
    }

    if (part2.magic && chanceOk(part2.magic.chancePct, rng)) {
      out.magicItems.push(...rollMagicRecipe(part2.magic, rng));
    }

    return out;
  }

  function rollOneType(type, rng) {
    const def = DATA.lairTypes[type] || DATA.carriedTypes[type];
    if (!def) throw new Error(`Ukendt treasure type: ${type}`);
    const coins = rollCoins(def.part1 || {}, rng);
    const p2 = rollPart2(def.part2 || {}, rng);
    const gemValue = p2.gems.reduce((s, g) => s + g.valueGp, 0);
    const jewelryValue = p2.jewelry.reduce((s, j) => s + j.valueGp, 0);
    const specialValue = p2.special.reduce((s, x) => s + (x.valueGp || 0), 0);
    const coinValue = coinGpValue(coins);
    const totalGpEquivalent = coinValue + gemValue + jewelryValue + specialValue;

    return {
      type,
      kind: def.kind,
      coins,
      gems: p2.gems,
      jewelry: p2.jewelry,
      special: p2.special,
      magicItems: p2.magicItems,
      gpEquivalent: totalGpEquivalent,
    };
  }

  function rollTreasureType(type, count, rng = Math.random) {
    if (!/^[A-V]$/.test(type)) throw new Error("Treasure type skal være A-V.");
    if (!Number.isInteger(count) || count < 1 || count > 500) {
      throw new Error("Antal rul skal være et helt tal mellem 1 og 500.");
    }

    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(rollOneType(type, rng));
    }

    const total = {
      coins: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
      gemsValue: 0,
      jewelryValue: 0,
      specialValue: 0,
      magicItemCount: 0,
      gpEquivalent: 0,
      weaponMagicCount: 0,
    };

    rolls.forEach((r) => {
      COINS.forEach((coin) => {
        total.coins[coin] += r.coins[coin];
      });
      total.gemsValue += r.gems.reduce((s, g) => s + g.valueGp, 0);
      total.jewelryValue += r.jewelry.reduce((s, j) => s + j.valueGp, 0);
      total.specialValue += r.special.reduce((s, x) => s + (x.valueGp || 0), 0);
      total.magicItemCount += r.magicItems.length;
      total.weaponMagicCount += r.magicItems.filter((m) => WEAPON_CATEGORIES.has(m.category)).length;
      total.gpEquivalent += r.gpEquivalent;
    });

    return { type, count, rolls, total };
  }

  function fmtNumber(v) {
    return Number(v).toLocaleString("da-DK");
  }

  function renderSummary(bundle) {
    const t = bundle.total;
    const coinLines = COINS.map((c) => `<li><strong>${c.toUpperCase()}</strong>: ${fmtNumber(t.coins[c])}</li>`).join("");
    $summary.innerHTML = `
      <h3>Samlet resultat (${bundle.count} rul af type ${bundle.type})</h3>
      <ul class=\"flat\">${coinLines}</ul>
      <p><strong>Gems (gp):</strong> ${fmtNumber(t.gemsValue)}</p>
      <p><strong>Jewelry (gp):</strong> ${fmtNumber(t.jewelryValue)}</p>
      <p><strong>Special Treasure (gp):</strong> ${fmtNumber(t.specialValue)}</p>
      <p><strong>Magic Items:</strong> ${fmtNumber(t.magicItemCount)} (heraf våben-kategorier: ${fmtNumber(t.weaponMagicCount)})</p>
      <p class=\"grand-total\"><strong>Total gp-equivalent:</strong> ${fmtNumber(t.gpEquivalent.toFixed(2))}</p>
    `;
  }

  function renderRoll(roll, idx) {
    const coinLines = COINS.map((c) => `<li>${c.toUpperCase()}: ${fmtNumber(roll.coins[c])}</li>`).join("");
    const gems = roll.gems.map((g) => `<li>${g.name} — ${fmtNumber(g.valueGp)} gp${g.note ? ` (${g.note})` : ""}</li>`).join("");
    const jewelry = roll.jewelry.map((j) => `<li>${j.name} — ${fmtNumber(j.valueGp)} gp</li>`).join("");
    const special = roll.special.map((s) => `<li>${s.name} — ${fmtNumber(s.valueGp || 0)} gp${s.enc ? `, ${fmtNumber(s.enc)} en` : ""}</li>`).join("");
    const magic = roll.magicItems.map((m) => `<li><strong>${magicCategoryLabel(m.category)}:</strong> ${m.label}</li>`).join("");

    return `
      <article class=\"roll-card\">
        <h4>Rul #${idx + 1} (${roll.kind})</h4>
        <div class=\"columns\">
          <section><h5>Mønter</h5><ul class=\"flat\">${coinLines || "<li>Ingen</li>"}</ul></section>
          <section><h5>Gems</h5><ul class=\"flat\">${gems || "<li>Ingen</li>"}</ul></section>
          <section><h5>Jewelry</h5><ul class=\"flat\">${jewelry || "<li>Ingen</li>"}</ul></section>
          <section><h5>Special</h5><ul class=\"flat\">${special || "<li>Ingen</li>"}</ul></section>
          <section><h5>Magic</h5><ul class=\"flat\">${magic || "<li>Ingen</li>"}</ul></section>
        </div>
        <p class=\"roll-total\"><strong>Rul gp-equivalent:</strong> ${fmtNumber(roll.gpEquivalent.toFixed(2))}</p>
      </article>
    `;
  }

  function renderResults(bundle) {
    $results.innerHTML = bundle.rolls.map((r, i) => renderRoll(r, i)).join("");
  }

  function setError(msg) {
    $error.textContent = msg || "";
    $error.style.display = msg ? "block" : "none";
  }

  function makeSeqRng(sequence) {
    let i = 0;
    return () => {
      const v = sequence[i % sequence.length];
      i += 1;
      return v;
    };
  }

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function runInternalTests() {
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V"].forEach((type) => {
      const rng = makeSeqRng([0.0, 0.19, 0.42, 0.73, 0.99]);
      const result = rollTreasureType(type, 1, rng);
      assert(result.rolls.length === 1, `Type ${type}: enkelt rul`);
    });

    const rngA = makeSeqRng([0.0, 0.1, 0.2, 0.3, 0.4]);
    const a = rollTreasureType("A", 1, rngA);
    assert(a.rolls.length === 1, "Type A: antal rul");
    assert(a.rolls[0].coins.cp % 1000 === 0, "Type A: cp skal skaleres i tusinder");

    const rngP = makeSeqRng([0.0, 0.5, 0.99]);
    const p = rollTreasureType("P", 1, rngP);
    assert(p.rolls[0].coins.cp <= 24, "Type P: carried cp må ikke være skaleret");

    const rngU = makeSeqRng([0.0]);
    const u = rollTreasureType("U", 5, rngU);
    assert(u.rolls.length === 5, "Type U: flere rul");

    const rngHigh = makeSeqRng([0.5]);
    const many = rollTreasureType("J", 500, rngHigh);
    assert(many.rolls.length === 500, "High count 500 skal virke");

    const rollMath = makeSeqRng([0.0]);
    assert(rollExpr("2d6+3", rollMath) === 5, "2d6+3 parser");
    assert(rollExpr("2d6x10", rollMath) === 20, "2d6x10 parser");
    assert(rollExpr("2d6×10", rollMath) === 20, "2d6×10 parser");

    let threw = false;
    try {
      rollTreasureType("A", 0, Math.random);
    } catch (_e) {
      threw = true;
    }
    assert(threw, "Invalid count skal fejle");

    return { ok: true };
  }

  window.rollTreasureType = rollTreasureType;
  window.runTreasureInternalTests = runInternalTests;

  function onRoll() {
    setError("");
    try {
      const type = $type.value;
      const count = Number($count.value);
      const bundle = rollTreasureType(type, count, Math.random);
      renderSummary(bundle);
      renderResults(bundle);
    } catch (err) {
      setError(err.message || "Ukendt fejl.");
    }
  }

  function onReset() {
    setError("");
    $summary.innerHTML = "";
    $results.innerHTML = "";
    $count.value = "1";
    $type.selectedIndex = 0;
  }

  function bootstrap() {
    initTypeOptions();
    renderNotes();
    renderChecklist();
    $rollBtn.addEventListener("click", onRoll);
    $resetBtn.addEventListener("click", onReset);
    try {
      runInternalTests();
      $testStatus.textContent = "Interne tests: OK";
      $testStatus.className = "ok";
    } catch (e) {
      $testStatus.textContent = `Interne tests: FEJL (${e.message})`;
      $testStatus.className = "fail";
    }
  }

  bootstrap();
})();
