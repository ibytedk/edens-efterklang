(function () {
  const MONSTERS = Array.isArray(window.BECMI_ENCOUNTER_MONSTERS)
    ? window.BECMI_ENCOUNTER_MONSTERS
    : [];

  const MAX_COUNT = 5000;
  const MAX_HP_LIST_DISPLAY = 300;
  const MAX_HP_EXPORT_LIST = 2000;
  const MAX_TRACKER_UI_ROWS = 300;
  const TRACKER_COLUMN_COUNT = 11;
  const COINS = ["cp", "sp", "ep", "gp", "pp"];
  const ART_EXPORT_OUTPUT_DIR = "output/imagegen/becmi-encounter-generator";
  const MONSTER_DETAILS = typeof window.BECMI_ENCOUNTER_DETAILS === "object" && window.BECMI_ENCOUNTER_DETAILS
    ? window.BECMI_ENCOUNTER_DETAILS
    : {};
  const MONSTER_DETAIL_META = typeof window.BECMI_ENCOUNTER_DETAIL_META === "object" && window.BECMI_ENCOUNTER_DETAIL_META
    ? window.BECMI_ENCOUNTER_DETAIL_META
    : {};
  const MONSTER_ART = typeof window.BECMI_ENCOUNTER_ART === "object" && window.BECMI_ENCOUNTER_ART
    ? window.BECMI_ENCOUNTER_ART
    : {};
  const TREASURE_ROLLER = typeof window.rollTreasureType === "function" ? window.rollTreasureType : null;
  const CARRIED_TREASURE_TYPES = new Set(["P", "Q", "R", "S", "T", "U", "V"]);
  const VERIFIED_TREASURE_OVERRIDES = {
    "Rules Cyclopedia::Bugbear": { treasureType: "P,Q,B" },
    "Rules Cyclopedia::Gnoll": { treasureType: "D,P" },
    "Rules Cyclopedia::Goblin": { treasureType: "R,C" },
    "Rules Cyclopedia::Gnome": { treasureType: "P,C" },
    "Rules Cyclopedia::Green Slime": { treasureType: "P,S,B" },
    "Rules Cyclopedia::Halfling": {
      treasureType: "P,S,B",
      note: "RC notes that lair type B only applies to wilderness encounters.",
    },
    "Rules Cyclopedia::Hobgoblin": { treasureType: "Q,D" },
    "Rules Cyclopedia::Kobold": { treasureType: "J,P" },
    "Rules Cyclopedia::Medusa": { treasureType: "V,F" },
  };
  const RANGED_BACKUP_CHANCE = 40;
  const SAVE_THROW_LABELS = [
    { key: "death", short: "D/G", long: "Death/Poison" },
    { key: "wands", short: "W", long: "Wands" },
    { key: "stone", short: "P", long: "Petrification" },
    { key: "breath", short: "B", long: "Breath" },
    { key: "spell", short: "S", long: "Spells" },
  ];
  const SAVE_THROW_TABLES = {
    normalMan: [
      { min: 0, max: 99, values: { death: 14, wands: 15, stone: 16, breath: 17, spell: 17 } },
    ],
    fighter: [
      { min: 1, max: 3, values: { death: 12, wands: 13, stone: 14, breath: 15, spell: 16 } },
      { min: 4, max: 6, values: { death: 10, wands: 11, stone: 12, breath: 13, spell: 14 } },
      { min: 7, max: 9, values: { death: 8, wands: 9, stone: 10, breath: 11, spell: 12 } },
      { min: 10, max: 12, values: { death: 6, wands: 7, stone: 8, breath: 9, spell: 10 } },
      { min: 13, max: 15, values: { death: 6, wands: 6, stone: 7, breath: 8, spell: 9 } },
      { min: 16, max: 18, values: { death: 5, wands: 6, stone: 6, breath: 7, spell: 8 } },
      { min: 19, max: 21, values: { death: 5, wands: 5, stone: 6, breath: 6, spell: 7 } },
      { min: 22, max: 24, values: { death: 4, wands: 5, stone: 5, breath: 5, spell: 6 } },
      { min: 25, max: 27, values: { death: 4, wands: 4, stone: 5, breath: 4, spell: 5 } },
      { min: 28, max: 30, values: { death: 3, wands: 4, stone: 4, breath: 3, spell: 4 } },
      { min: 31, max: 33, values: { death: 3, wands: 3, stone: 3, breath: 2, spell: 3 } },
      { min: 34, max: 36, values: { death: 2, wands: 2, stone: 2, breath: 2, spell: 2 } },
    ],
    cleric: [
      { min: 1, max: 4, values: { death: 11, wands: 12, stone: 14, breath: 16, spell: 15 } },
      { min: 5, max: 8, values: { death: 9, wands: 10, stone: 12, breath: 14, spell: 13 } },
      { min: 9, max: 12, values: { death: 7, wands: 8, stone: 10, breath: 12, spell: 11 } },
      { min: 13, max: 16, values: { death: 6, wands: 7, stone: 8, breath: 10, spell: 9 } },
      { min: 17, max: 20, values: { death: 5, wands: 6, stone: 6, breath: 8, spell: 7 } },
      { min: 21, max: 24, values: { death: 4, wands: 5, stone: 5, breath: 6, spell: 5 } },
      { min: 25, max: 28, values: { death: 3, wands: 4, stone: 4, breath: 4, spell: 4 } },
      { min: 29, max: 32, values: { death: 2, wands: 3, stone: 3, breath: 3, spell: 3 } },
      { min: 33, max: 36, values: { death: 2, wands: 2, stone: 2, breath: 2, spell: 2 } },
    ],
    magicUser: [
      { min: 1, max: 5, values: { death: 13, wands: 14, stone: 13, breath: 16, spell: 15 } },
      { min: 6, max: 10, values: { death: 11, wands: 12, stone: 11, breath: 14, spell: 12 } },
      { min: 11, max: 15, values: { death: 9, wands: 10, stone: 9, breath: 12, spell: 9 } },
      { min: 16, max: 20, values: { death: 7, wands: 8, stone: 7, breath: 10, spell: 6 } },
      { min: 21, max: 24, values: { death: 5, wands: 6, stone: 5, breath: 8, spell: 4 } },
      { min: 25, max: 28, values: { death: 4, wands: 4, stone: 4, breath: 6, spell: 3 } },
      { min: 29, max: 32, values: { death: 3, wands: 3, stone: 3, breath: 4, spell: 2 } },
      { min: 33, max: 36, values: { death: 2, wands: 2, stone: 2, breath: 2, spell: 2 } },
    ],
    thief: [
      { min: 1, max: 4, values: { death: 13, wands: 14, stone: 13, breath: 16, spell: 15 } },
      { min: 5, max: 8, values: { death: 12, wands: 13, stone: 11, breath: 14, spell: 13 } },
    ],
    dwarf: [
      { min: 1, max: 3, values: { death: 8, wands: 9, stone: 10, breath: 13, spell: 12 } },
      { min: 4, max: 6, values: { death: 6, wands: 7, stone: 8, breath: 10, spell: 9 } },
      { min: 7, max: 9, values: { death: 4, wands: 5, stone: 6, breath: 7, spell: 6 } },
      { min: 10, max: 12, values: { death: 2, wands: 3, stone: 4, breath: 4, spell: 3 } },
    ],
    elf: [
      { min: 1, max: 3, values: { death: 12, wands: 13, stone: 13, breath: 15, spell: 15 } },
      { min: 4, max: 6, values: { death: 8, wands: 10, stone: 10, breath: 11, spell: 11 } },
      { min: 7, max: 9, values: { death: 4, wands: 7, stone: 7, breath: 7, spell: 7 } },
      { min: 10, max: 10, values: { death: 2, wands: 4, stone: 4, breath: 3, spell: 3 } },
    ],
    halfling: [
      { min: 1, max: 3, values: { death: 8, wands: 9, stone: 10, breath: 13, spell: 12 } },
      { min: 4, max: 6, values: { death: 5, wands: 6, stone: 7, breath: 9, spell: 8 } },
      { min: 7, max: 8, values: { death: 2, wands: 3, stone: 4, breath: 5, spell: 4 } },
    ],
  };
  const MELEE_WEAPON_PROFILES = [
    { name: "Kniv", damage: "1d4" },
    { name: "Koelle", damage: "1d4" },
    { name: "Dolke", damage: "1d4" },
    { name: "Haandokse", damage: "1d6" },
    { name: "Mace", damage: "1d6" },
    { name: "Spyd", damage: "1d6" },
    { name: "Kortsvaerd", damage: "1d6" },
    { name: "Stav", damage: "1d6" },
    { name: "Krigsokse", damage: "1d8" },
    { name: "Krigshammer", damage: "1d8" },
    { name: "Flail", damage: "1d8" },
    { name: "Morgenstjerne", damage: "1d8" },
    { name: "Langsvaerd", damage: "1d8" },
    { name: "Spyd, langt", damage: "1d8" },
    { name: "Tvehands-svaerd", damage: "1d10" },
    { name: "Polearm", damage: "1d10" },
  ];
  const RANGED_WEAPON_PROFILES = [
    { name: "Slynge", damage: "1d4" },
    { name: "Dolk, kast", damage: "1d4" },
    { name: "Haandokse, kast", damage: "1d6" },
    { name: "Kastespyd", damage: "1d6" },
    { name: "Kortbue", damage: "1d6" },
    { name: "Armbryst", damage: "1d6" },
    { name: "Langbue", damage: "1d8" },
  ];

  const $sourceFilter = document.getElementById("sourceFilter");
  const $categoryFilter = document.getElementById("categoryFilter");
  const $monsterSelect = document.getElementById("monsterSelect");
  const $countInput = document.getElementById("countInput");
  const $hdOverrideInput = document.getElementById("hdOverrideInput");
  const $generateBtn = document.getElementById("generateBtn");
  const $randomBtn = document.getElementById("randomBtn");
  const $resetBtn = document.getElementById("resetBtn");
  const $exportMdBtn = document.getElementById("exportMdBtn");
  const $exportArtBatchBtn = document.getElementById("exportArtBatchBtn");
  const $statusText = document.getElementById("statusText");
  const $errorBox = document.getElementById("errorBox");
  const $resultPanel = document.getElementById("resultPanel");

  let visibleMonsters = [];
  let lastEncounter = null;

  function clean(value) {
    return String(value == null ? "" : value).trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function sourceShort(source) {
    if (source === "Rules Cyclopedia") return "RC";
    if (source === "Creature Catalog") return "CC";
    return source;
  }

  function normalizeInlineText(value) {
    return clean(value)
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?[^>]+>/g, " ")
      .replace(/[•]/g, " ")
      .replace(/â€”/g, " - ")
      .replace(/â€“/g, "-")
      .replace(/â†’/g, " to ")
      .replace(/Ã—/g, "x")
      .replace(/Â/g, "")
      .replace(/[_~`]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .replace(/([(\[])\s+/g, "$1")
      .replace(/\s+([)\]])/g, "$1")
      .trim();
  }

  function monsterCategory(monster) {
    const explicit = clean(monster.monsterType);
    if (explicit) return explicit;
    if (monster.source === "Rules Cyclopedia") return "RC (uncategorized)";
    return "Unknown";
  }

  function detailKey(source, name) {
    return `${clean(source)}::${clean(name)}`;
  }

  function parseSingleNumber(value) {
    const match = clean(value).match(/\d+/);
    return match ? Number.parseInt(match[0], 10) : null;
  }

  function normalizeTreasureTypeText(value) {
    return clean(value)
      .toUpperCase()
      .replaceAll(" ", "")
      .replaceAll("(", ",")
      .replaceAll(")", ",")
      .replaceAll("+", ",")
      .replaceAll("/", ",")
      .replaceAll("X", "x");
  }

  function normalizeSaveAsText(value) {
    let out = clean(value)
      .replaceAll("_", "")
      .replaceAll("Nonnal", "Normal")
      .replaceAll("NormalMan", "Normal Man")
      .replaceAll("Magic User", "Magic-User")
      .replaceAll("Tum", "Turn")
      .replaceAll("O ", "0 ");

    if (!out) return "";

    const compact = out.replace(/\s+/g, "");
    const shortMatch = compact.match(/^([FCMTDEH])([0-9ISOl\-]+)$/i);
    if (shortMatch) {
      const normalizedLevel = shortMatch[2]
        .replaceAll("I", "1")
        .replaceAll("l", "1")
        .replaceAll("O", "0")
        .replaceAll("S", "5");
      return `${shortMatch[1].toUpperCase()}${normalizedLevel}`;
    }

    return out;
  }

  function findSaveTableEntry(table, level) {
    if (!table || !Number.isFinite(level)) return null;
    return table.find((entry) => level >= entry.min && level <= entry.max) || null;
  }

  function parseSaveAsSpec(value) {
    const raw = normalizeSaveAsText(value);
    if (!raw) return null;
    if (/^normal man$/i.test(raw)) {
      return { raw, tableName: "normalMan", minLevel: 0, maxLevel: 0, label: "Normal Man" };
    }

    const namedMatch = raw.match(/^(Fighter|Cleric|Magic-User|Thief|Dwarf|Elf|Halfling)\s*:\s*([0-9]+(?:-[0-9]+)?)$/i);
    if (namedMatch) {
      const label = namedMatch[1].toLowerCase();
      const tableName = {
        fighter: "fighter",
        cleric: "cleric",
        "magic-user": "magicUser",
        thief: "thief",
        dwarf: "dwarf",
        elf: "elf",
        halfling: "halfling",
      }[label];
      if (!tableName) return { raw, unsupported: true };
      const [minText, maxText] = namedMatch[2].split("-");
      const minLevel = Number.parseInt(minText, 10);
      const maxLevel = Number.parseInt(maxText || minText, 10);
      return { raw, tableName, minLevel, maxLevel, label: `${namedMatch[1]} ${namedMatch[2]}` };
    }

    const shortMatch = raw.match(/^([FCMTDEH])([0-9]+(?:-[0-9]+)?)$/i);
    if (shortMatch) {
      const tableName = {
        F: "fighter",
        C: "cleric",
        M: "magicUser",
        T: "thief",
        D: "dwarf",
        E: "elf",
        H: "halfling",
      }[shortMatch[1].toUpperCase()];
      if (!tableName) return { raw, unsupported: true };
      const [minText, maxText] = shortMatch[2].split("-");
      const minLevel = Number.parseInt(minText, 10);
      const maxLevel = Number.parseInt(maxText || minText, 10);
      return { raw, tableName, minLevel, maxLevel, label: raw };
    }

    return { raw, unsupported: true };
  }

  function renderSaveThrowValues(spec) {
    if (!spec || spec.unsupported) {
      return { shortText: "Not calculated", detailText: clean(spec && spec.raw) || "Not verified" };
    }

    const table = SAVE_THROW_TABLES[spec.tableName];
    if (!table) {
      return { shortText: "Not calculated", detailText: spec.raw };
    }

    const low = findSaveTableEntry(table, spec.minLevel);
    const high = findSaveTableEntry(table, spec.maxLevel);
    if (!low || !high) {
      return { shortText: "Not calculated", detailText: spec.raw };
    }

    const formatValue = (key) => {
      const minValue = low.values[key];
      const maxValue = high.values[key];
      return minValue === maxValue ? String(minValue) : `${minValue}-${maxValue}`;
    };

    const parts = SAVE_THROW_LABELS.map((entry) => `${entry.short} ${formatValue(entry.key)}`);
    return {
      shortText: parts.join(", "),
      detailText: `${spec.label}: ${parts.join(" | ")}`,
    };
  }

  function parseIntelligenceScore(value) {
    const raw = clean(value).replaceAll("_", "");
    if (!raw) return null;
    if (!/^\d+$/.test(raw)) return null;
    return Number.parseInt(raw, 10);
  }

  function deriveWeaponMasteryLevel(intelligenceScore) {
    if (!Number.isFinite(intelligenceScore)) return "";
    if (intelligenceScore >= 18) return "Master";
    if (intelligenceScore >= 16) return "Expert";
    if (intelligenceScore >= 12) return "Skilled";
    return "";
  }

  function usesWeaponAttacks(attacks, damage) {
    return /weapon/i.test(clean(attacks)) || /by weapon/i.test(clean(damage));
  }

  function treasureAuditLabel(status) {
    if (status === "verified") return "Book-verified";
    if (status === "mismatch") return "Needs manual audit";
    if (status === "needs-manual-audit") return "Needs manual audit";
    if (status === "missing") return "Missing book audit";
    return "Summary data";
  }

  function sanitizeDescription(value) {
    return normalizeInlineText(value)
      .replaceAll(" .", ".")
      .replaceAll(" ,", ",")
      .replaceAll(" ;", ";")
      .replaceAll(" :", ":");
  }

  function takeLeadingSentences(text, sentenceCount = 6, maxLength = 1200) {
    const compact = sanitizeDescription(text);
    const sentences = compact.match(/[^.!?]+[.!?]?/g) || [];
    let picked = sentences.slice(0, sentenceCount).join(" ").trim();
    if (!picked) {
      picked = compact;
    }
    if (picked.length < compact.length && picked.length + 16 < maxLength) {
      picked = compact;
    }
    if (picked.length > maxLength) {
      const clipped = picked.slice(0, maxLength).trim();
      const sentenceBoundary = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("! "), clipped.lastIndexOf("? "));
      const phraseBoundary = Math.max(clipped.lastIndexOf("; "), clipped.lastIndexOf(", "));
      const boundary = sentenceBoundary >= Math.floor(maxLength * 0.65)
        ? sentenceBoundary + 1
        : phraseBoundary >= Math.floor(maxLength * 0.75)
          ? phraseBoundary
          : clipped.length;
      return `${clipped.slice(0, boundary).trim()}...`;
    }
    return picked;
  }

  function stripLeadingMonsterLabels(text) {
    return sanitizeDescription(text).replace(
      /^((?:[A-Z][A-Za-z-]+(?:\s+[A-Z][A-Za-z-]+)*\s*\([^)]+\)\.\s*){1,2})/,
      ""
    ).trim();
  }

  function looksSuspiciousOcrDescription(text) {
    const compact = sanitizeDescription(text);
    if (!compact || compact.length < 48) return true;
    if (compact.length < 80 && compact.split(/\s+/).length < 12) return true;

    const suspiciousTokens = compact.match(/\b(?:Tcmun|Tcrr\w*|c\.r\w+|ld6|ldlO|Id\d)\b/gi) || [];
    if (suspiciousTokens.length >= 3) return true;

    const brokenWords = compact.match(/[A-Za-z]\.[A-Za-z]/g) || [];
    return brokenWords.length >= 4;
  }

  function getUsableBookDescription(detail) {
    const raw = sanitizeDescription(detail && detail.description);
    if (!raw) return "";

    const stripped = stripLeadingMonsterLabels(raw) || raw;
    const candidate = takeLeadingSentences(stripped, 6, 1200);
    return looksSuspiciousOcrDescription(candidate) ? "" : candidate;
  }

  function cleanCategoryLabel(category, source) {
    const value = clean(category);
    if (!value || /uncategorized/i.test(value)) {
      return source === "Rules Cyclopedia" ? "Rules Cyclopedia monster" : "fantasy monster";
    }
    return value;
  }

  function joinHumanList(values) {
    const items = values.filter(Boolean);
    if (!items.length) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
  }

  function buildDerivedSummary(monster) {
    const lines = [];
    const categoryLabel = cleanCategoryLabel(monster.category, monster.source);
    lines.push(`${monster.name} is presented here as a ${categoryLabel.toLowerCase()} from ${monster.source}.`);

    const combatProfile = [
      monster.hd ? `${monster.hd} HD` : "",
      monster.ac ? `AC ${monster.ac}` : "",
      monster.move ? `move ${monster.move}` : "",
      monster.attacks ? `attacks ${monster.attacks}` : "",
      monster.damage ? `damage ${monster.damage}` : "",
      monster.morale ? `morale ${monster.morale}` : "",
    ].filter(Boolean);
    if (combatProfile.length) {
      lines.push(`Quick DM profile: ${joinHumanList(combatProfile)}.`);
    }

    const secondaryCues = [
      monster.saveAs ? `saves as ${monster.saveAs}` : "",
      monster.intelligence ? `Int ${monster.intelligence}` : "",
      monster.weaponMasteryText || "",
      monster.xp ? `${monster.xp} XP` : "",
    ].filter(Boolean);
    if (secondaryCues.length) {
      lines.push(`Secondary cues: ${joinHumanList(secondaryCues)}.`);
    }

    if (monster.monsterType) {
      lines.push(`Encounter type: ${monster.monsterType}.`);
    }

    if (monster.treasureType && monster.treasureType.toLowerCase() !== "nil") {
      lines.push(`Treasure type ${monster.treasureType}.`);
    }

    return lines.join(" ");
  }

  function buildMonsterArtSlug(monster) {
    return `${slugify(monster.source)}--${slugify(monster.name)}`;
  }

  function buildMonsterArtAssetPath(monster) {
    return `assets/monster-art/${buildMonsterArtSlug(monster)}.png`;
  }

  function buildMonsterArtSpec(monster) {
    const descriptionCue = monster.bookDescription || monster.derivedSummary || `${monster.name} monster reference`;
    return {
      prompt: `Full-body reference illustration of ${monster.name} from ${monster.source}. ${descriptionCue}`,
      use_case: "stylized-concept",
      subject: `${monster.name}; ${cleanCategoryLabel(monster.category, monster.source)}`,
      scene: "single-creature monster plate for a tabletop encounter generator",
      style: "old-school dark-fantasy bestiary illustration, painterly ink-and-gouache texture, grounded anatomy",
      composition: "one creature only, centered full body, readable silhouette, slight 3/4 view, enough negative space for UI cropping",
      lighting: "moody natural light with clear readable forms",
      palette: "earth, bone, moss, rust, charcoal, ember accents",
      constraints: `no text, no watermark, no border, no extra creatures, no duplicate limbs, no cropped head. Stats cue: AC ${monster.ac || "-"}, HD ${monster.hd || "-"}, Move ${monster.move || "-"}, Attacks ${monster.attacks || "-"}, Damage ${monster.damage || "-"}, Morale ${monster.morale || "-"}.`,
      negative: "blurry anatomy, duplicate heads, duplicate arms, modern props, comedic cartoon tone, oversaturated neon",
    };
  }

  function formatMonsterArtSpec(spec) {
    return [
      `Use case: ${spec.use_case}`,
      `Subject: ${spec.subject}`,
      `Scene: ${spec.scene}`,
      `Primary request: ${spec.prompt}`,
      `Style: ${spec.style}`,
      `Composition: ${spec.composition}`,
      `Lighting: ${spec.lighting}`,
      `Palette: ${spec.palette}`,
      `Constraints: ${spec.constraints}`,
      `Avoid: ${spec.negative}`,
    ].join("\n");
  }

  function buildMonsterArtBatchJob(monster) {
    const spec = buildMonsterArtSpec(monster);
    return {
      source: monster.source,
      monster_name: monster.name,
      asset_path: monster.artAssetPath,
      prompt: spec.prompt,
      out: buildMonsterArtSlug(monster),
      use_case: spec.use_case,
      subject: spec.subject,
      scene: spec.scene,
      style: spec.style,
      composition: spec.composition,
      lighting: spec.lighting,
      palette: spec.palette,
      constraints: spec.constraints,
      negative: spec.negative,
      size: "1024x1024",
      quality: "low",
      output_format: "png",
    };
  }

  function normalizeMonster(raw) {
    const detail = MONSTER_DETAILS[detailKey(raw.source, raw.name)] || {};
    const artRecord = MONSTER_ART[detailKey(raw.source, raw.name)] || {};
    const manualTreasure = VERIFIED_TREASURE_OVERRIDES[detailKey(raw.source, raw.name)] || null;
    const rawTreasureType = clean(raw.treasureType);
    const bookTreasureType = clean(detail.normalizedBookTreasureType);
    const treasureType = manualTreasure
      ? manualTreasure.treasureType
      : bookTreasureType && (detail.treasureAuditStatus === "verified" || !rawTreasureType)
        ? bookTreasureType
        : rawTreasureType;
    const saveAs = normalizeSaveAsText(detail.saveAs || raw.saveAs);
    const saveAsSpec = parseSaveAsSpec(saveAs);
    const savingThrows = renderSaveThrowValues(saveAsSpec);
    const intelligence = clean(detail.intelligence || raw.intelligence).replaceAll("_", "");
    const intelligenceScore = parseIntelligenceScore(intelligence);
    const weaponMasteryLevel = usesWeaponAttacks(raw.attacks, raw.damage)
      ? deriveWeaponMasteryLevel(intelligenceScore)
      : "";
    const normalized = {
      source: clean(raw.source),
      name: clean(raw.name),
      ac: clean(raw.ac),
      hd: clean(raw.hd),
      move: clean(raw.move),
      attacks: clean(raw.attacks),
      damage: clean(raw.damage),
      morale: clean(raw.morale),
      treasureType,
      xp: clean(raw.xp),
      monsterType: clean(raw.monsterType),
      category: monsterCategory(raw),
      saveAs,
      saveAsSpec,
      savingThrows,
      intelligence,
      intelligenceScore,
      bookDescription: getUsableBookDescription(detail),
      detailSource: clean(detail.sourceRef),
      detailStatus: clean(detail.detailStatus),
      treasureAuditStatus: manualTreasure
        ? "verified"
        : clean(detail.treasureAuditStatus) || (treasureType ? "summary-only" : "missing"),
      treasureNote: manualTreasure ? clean(manualTreasure.note) : "",
      weaponMasteryLevel,
      weaponMasteryText: weaponMasteryLevel ? `${weaponMasteryLevel} with at least 1 weapon` : "",
    };
    const derivedSummary = buildDerivedSummary(normalized);
    const artSpec = buildMonsterArtSpec({ ...normalized, derivedSummary });

    return {
      ...normalized,
      derivedSummary,
      description: normalized.bookDescription || derivedSummary,
      artAssetPath: clean(artRecord.path) || buildMonsterArtAssetPath(normalized),
      artRegistered: Boolean(clean(artRecord.path)),
      artPrompt: formatMonsterArtSpec(artSpec),
    };
  }

  const monsters = MONSTERS.map(normalizeMonster).sort((a, b) =>
    a.name.localeCompare(b.name, "da") || a.source.localeCompare(b.source, "da")
  );

  function setStatus(text, kind) {
    $statusText.textContent = text || "";
    $statusText.classList.remove("ok", "fail");
    if (kind) {
      $statusText.classList.add(kind);
    }
  }

  function showError(message) {
    $errorBox.style.display = "block";
    $errorBox.textContent = message;
    setStatus("Validation error", "fail");
  }

  function hideError() {
    $errorBox.style.display = "none";
    $errorBox.textContent = "";
  }

  function parsePositiveInt(value) {
    const parsed = Number.parseInt(String(value), 10);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return null;
    return parsed;
  }

  function fmtNumber(value) {
    return Number(value || 0).toLocaleString("da-DK");
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function rollDice(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i += 1) {
      total += randomInt(1, sides);
    }
    return total;
  }

  function formatSignedNumber(value) {
    if (!value) return "";
    return value > 0 ? `+${value}` : `${value}`;
  }

  function formatWeaponDamage(baseDamage, suffix) {
    return `${baseDamage}${formatSuffixForDisplay(suffix)}`;
  }

  function parseTreasureTypeSpec(rawTreasureType) {
    const raw = clean(rawTreasureType);
    if (!raw || /^(nil|var\.?)/i.test(raw)) {
      return { carriedSpecs: [], lairSpecs: [] };
    }

    const carriedSpecs = [];
    const lairSpecs = [];
    const segments = raw.split(/[,/]/).map((segment) => clean(segment)).filter(Boolean);

    segments.forEach((segment) => {
      if (/^(nil|var\.?)/i.test(segment)) return;
      const match = segment.match(/^([A-V])(?:\s*[x×*]\s*(\d+))?/i);
      if (!match) return;

      const type = match[1].toUpperCase();
      const count = match[2] ? Number.parseInt(match[2], 10) : 1;
      const spec = { type, count: Number.isFinite(count) && count > 0 ? count : 1 };

      if (CARRIED_TREASURE_TYPES.has(type)) {
        carriedSpecs.push(spec);
      } else {
        lairSpecs.push(spec);
      }
    });

    return { carriedSpecs, lairSpecs };
  }

  function countTreasureItems(bundle, key) {
    return bundle.rolls.reduce((sum, roll) => sum + roll[key].length, 0);
  }

  function listTreasureNames(bundle, key, formatter, limit = 4) {
    const items = bundle.rolls.flatMap((roll) => roll[key]);
    if (!items.length) return "";
    const names = items.slice(0, limit).map(formatter);
    if (items.length > limit) {
      names.push(`+${items.length - limit} flere`);
    }
    return names.join(", ");
  }

  function aggregateTreasureBundles(bundles) {
    const total = {
      coins: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
      gemsCount: 0,
      gemsValue: 0,
      jewelryCount: 0,
      jewelryValue: 0,
      specialCount: 0,
      specialValue: 0,
      magicItemCount: 0,
      gpEquivalent: 0,
    };

    bundles.forEach((bundle) => {
      COINS.forEach((coin) => {
        total.coins[coin] += bundle.total.coins[coin];
      });
      total.gemsCount += countTreasureItems(bundle, "gems");
      total.gemsValue += bundle.total.gemsValue;
      total.jewelryCount += countTreasureItems(bundle, "jewelry");
      total.jewelryValue += bundle.total.jewelryValue;
      total.specialCount += countTreasureItems(bundle, "special");
      total.specialValue += bundle.total.specialValue;
      total.magicItemCount += bundle.total.magicItemCount;
      total.gpEquivalent += bundle.total.gpEquivalent;
    });

    return total;
  }

  function summarizeTreasureBundles(aggregate) {
    const parts = [];
    COINS.forEach((coin) => {
      if (aggregate.coins[coin] > 0) {
        parts.push(`${fmtNumber(aggregate.coins[coin])} ${coin}`);
      }
    });
    if (aggregate.gemsCount > 0) {
      parts.push(`${aggregate.gemsCount} gems`);
    }
    if (aggregate.jewelryCount > 0) {
      parts.push(`${aggregate.jewelryCount} jewelry`);
    }
    if (aggregate.specialCount > 0) {
      parts.push(`${aggregate.specialCount} special`);
    }
    if (aggregate.magicItemCount > 0) {
      parts.push(`${aggregate.magicItemCount} magic`);
    }
    if (parts.length === 0) {
      return "No carried treasure";
    }
    parts.push(`gp-eq ${fmtNumber(aggregate.gpEquivalent.toFixed(2))}`);
    return parts.join(", ");
  }

  function buildTreasureDetailLines(specs, bundles, aggregate) {
    const lines = [];

    specs.forEach((spec, index) => {
      const bundle = bundles[index];
      if (!bundle) return;
      lines.push(`Type ${spec.type} x${spec.count}`);

      const coinParts = COINS
        .filter((coin) => bundle.total.coins[coin] > 0)
        .map((coin) => `${fmtNumber(bundle.total.coins[coin])} ${coin}`);
      if (coinParts.length) {
        lines.push(`Coins: ${coinParts.join(", ")}`);
      }

      const gemNames = listTreasureNames(bundle, "gems", (gem) => `${gem.name} (${fmtNumber(gem.valueGp)} gp)`);
      if (gemNames) {
        lines.push(`Gems: ${gemNames}`);
      }

      const jewelryNames = listTreasureNames(bundle, "jewelry", (item) => `${item.name} (${fmtNumber(item.valueGp)} gp)`);
      if (jewelryNames) {
        lines.push(`Jewelry: ${jewelryNames}`);
      }

      const specialNames = listTreasureNames(bundle, "special", (item) => `${item.name} (${fmtNumber(item.valueGp || 0)} gp)`);
      if (specialNames) {
        lines.push(`Special: ${specialNames}`);
      }

      const magicNames = listTreasureNames(bundle, "magicItems", (item) => item.label);
      if (magicNames) {
        lines.push(`Magic: ${magicNames}`);
      }
    });

    if (aggregate.gpEquivalent > 0) {
      lines.push(`Total gp equivalent: ${fmtNumber(aggregate.gpEquivalent.toFixed(2))}`);
    }

    return lines;
  }

  function createCarriedTreasure(monsterTreasureType) {
    if (!TREASURE_ROLLER) {
      return {
        available: false,
        hasTreasure: false,
        summaryText: "Treasure engine not loaded",
        detailLines: [],
      };
    }

    const parsed = parseTreasureTypeSpec(monsterTreasureType);
    if (!parsed.carriedSpecs.length) {
      return {
        available: true,
        hasTreasure: false,
        specs: [],
        bundles: [],
        aggregate: aggregateTreasureBundles([]),
        summaryText: "No carried treasure",
        detailLines: [],
      };
    }

    const bundles = parsed.carriedSpecs.map((spec) => TREASURE_ROLLER(spec.type, spec.count, Math.random));
    const aggregate = aggregateTreasureBundles(bundles);
    return {
      available: true,
      hasTreasure: true,
      specs: parsed.carriedSpecs,
      bundles,
      aggregate,
      summaryText: summarizeTreasureBundles(aggregate),
      detailLines: buildTreasureDetailLines(parsed.carriedSpecs, bundles, aggregate),
    };
  }

  function formatTreasureSpecList(specs) {
    if (!Array.isArray(specs) || !specs.length) {
      return "None";
    }

    return specs
      .map((spec) => (spec.count > 1 ? `${spec.type} x${spec.count}` : spec.type))
      .join(", ");
  }

  function describeTreasureSplit(monsterTreasureType) {
    const parsed = parseTreasureTypeSpec(monsterTreasureType);
    if (!parsed.carriedSpecs.length && !parsed.lairSpecs.length) {
      return "";
    }

    return `Lair: ${formatTreasureSpecList(parsed.lairSpecs)} | Carried: ${formatTreasureSpecList(parsed.carriedSpecs)}`;
  }

  function parseWeaponDamageSuffix(damageText) {
    const raw = clean(damageText);
    const match = raw.match(/by weapon(.*)$/i);
    if (!match || match.length < 2) return "";
    return clean(match[1]);
  }

  function isByWeaponDamage(damageText) {
    return /by weapon/i.test(clean(damageText));
  }

  function formatSuffixForDisplay(suffix) {
    const raw = clean(suffix);
    if (!raw) return "";
    if (raw.startsWith("+") || raw.startsWith("/") || raw.startsWith(",")) return raw;
    return ` ${raw}`;
  }

  function pickMeleeWeaponProfile() {
    return MELEE_WEAPON_PROFILES[randomInt(0, MELEE_WEAPON_PROFILES.length - 1)];
  }

  function pickRangedWeaponProfile() {
    return RANGED_WEAPON_PROFILES[randomInt(0, RANGED_WEAPON_PROFILES.length - 1)];
  }

  function createWeaponModel(monster) {
    const byWeapon = isByWeaponDamage(monster.damage);
    const suffix = byWeapon ? parseWeaponDamageSuffix(monster.damage) : "";
    return {
      byWeapon,
      suffix,
      rangedChance: RANGED_BACKUP_CHANCE,
      fallback: clean(monster.damage) || "-",
    };
  }

  function rollCombatantLoadout(weaponModel) {
    if (!weaponModel.byWeapon) {
      return {
        meleeWeapon: "-",
        meleeDamage: weaponModel.fallback,
        rangedWeapon: "",
        rangedDamage: "",
        canReroll: false,
      };
    }

    const meleeProfile = pickMeleeWeaponProfile();
    const hasRangedBackup = randomInt(1, 100) <= weaponModel.rangedChance;
    const rangedProfile = hasRangedBackup ? pickRangedWeaponProfile() : null;

    return {
      meleeWeapon: meleeProfile.name,
      meleeDamage: formatWeaponDamage(meleeProfile.damage, weaponModel.suffix),
      rangedWeapon: rangedProfile ? rangedProfile.name : "",
      rangedDamage: rangedProfile ? formatWeaponDamage(rangedProfile.damage, weaponModel.suffix) : "",
      canReroll: true,
    };
  }

  function parseHdSpec(hdText) {
    const raw = clean(hdText);
    const lowered = raw.toLowerCase();

    if (!raw) {
      return { kind: "unknown", label: raw || "-", note: "HD mangler" };
    }

    if (lowered.includes("special")) {
      return { kind: "special", label: raw, note: "HD is marked as Special" };
    }

    if (lowered.includes("som levende")) {
      return {
        kind: "special",
        label: raw,
        note: "HD er 'som levende' og skal afklares med reference-monster",
      };
    }

    let normalized = lowered
      .replaceAll(" ", "")
      .replaceAll("—", "-")
      .replaceAll("–", "-")
      .replaceAll("½", "1/2")
      .replaceAll("*", "")
      .replaceAll("(", "")
      .replaceAll(")", "");

    if (normalized === "1hp") {
      return { kind: "fixed", label: raw, value: 1 };
    }

    if (normalized === "1-1") {
      return { kind: "dice", label: raw, diceCount: 1, bonus: -1 };
    }

    if (normalized === "1/2") {
      return { kind: "half", label: raw, bonus: 0 };
    }

    const threeOptionMatch = normalized.match(/^(\d+)\/(\d+)\/(\d+)(?:\+(\d+))?$/);
    if (threeOptionMatch) {
      return {
        kind: "options",
        label: raw,
        options: [
          Number.parseInt(threeOptionMatch[1], 10),
          Number.parseInt(threeOptionMatch[2], 10),
          Number.parseInt(threeOptionMatch[3], 10),
        ],
        bonus: threeOptionMatch[4] ? Number.parseInt(threeOptionMatch[4], 10) : 0,
      };
    }

    const twoOptionMatch = normalized.match(/^(\d+)\/(\d+)(?:\+(\d+))?$/);
    if (twoOptionMatch) {
      if (normalized.startsWith("1/2")) {
        return {
          kind: "half",
          label: raw,
          bonus: twoOptionMatch[3] ? Number.parseInt(twoOptionMatch[3], 10) : 0,
          note: "Tolket som 1/2 HD",
        };
      }
      return {
        kind: "options",
        label: raw,
        options: [Number.parseInt(twoOptionMatch[1], 10), Number.parseInt(twoOptionMatch[2], 10)],
        bonus: twoOptionMatch[3] ? Number.parseInt(twoOptionMatch[3], 10) : 0,
      };
    }

    const rangeMatch = normalized.match(/^(\d+)-(\d+)(?:\+(\d+))?$/);
    if (rangeMatch) {
      const min = Number.parseInt(rangeMatch[1], 10);
      const max = Number.parseInt(rangeMatch[2], 10);
      if (min <= max) {
        return {
          kind: "range",
          label: raw,
          min,
          max,
          bonus: rangeMatch[3] ? Number.parseInt(rangeMatch[3], 10) : 0,
        };
      }
    }

    const plusMatch = normalized.match(/^(\d+)\+(\d+)$/);
    if (plusMatch) {
      return {
        kind: "dice",
        label: raw,
        diceCount: Number.parseInt(plusMatch[1], 10),
        bonus: Number.parseInt(plusMatch[2], 10),
      };
    }

    const plainMatch = normalized.match(/^(\d+)$/);
    if (plainMatch) {
      return {
        kind: "dice",
        label: raw,
        diceCount: Number.parseInt(plainMatch[1], 10),
        bonus: 0,
      };
    }

    const firstNumberMatch = normalized.match(/\d+/);
    if (firstNumberMatch) {
      return {
        kind: "dice",
        label: raw,
        diceCount: Number.parseInt(firstNumberMatch[0], 10),
        bonus: 0,
        note: "Delvis parsing af HD-format",
      };
    }

    return { kind: "unknown", label: raw, note: "Kunne ikke parse HD-format" };
  }

  /**
   * BECMI monster THAC0 (Rules Cyclopedia): typically 20 minus the creature's Hit Dice count.
   * Bonus pips on HD (e.g. 2+1) do not change the dice count used here.
   */
  function describeThac0FromHdText(hdText) {
    const spec = parseHdSpec(hdText);
    if (spec.kind === "dice") {
      if (!Number.isFinite(spec.diceCount) || spec.diceCount <= 0) {
        return { display: "—", formula: "20 − HD", note: "Could not derive hit dice count for THAC0." };
      }
      const thac0 = 20 - spec.diceCount;
      return {
        display: String(thac0),
        formula: `20 − ${spec.diceCount}`,
        note: spec.note || "",
      };
    }
    if (spec.kind === "half") {
      return {
        display: "20",
        formula: "20 − 0 (under 1 HD)",
        note: spec.note || "Less than 1 HD: THAC0 20 is typical.",
      };
    }
    if (spec.kind === "fixed") {
      return {
        display: "20",
        formula: "20 − 0 (fixed HP)",
        note: spec.note || "",
      };
    }
    if (spec.kind === "range") {
      const minHd = spec.min;
      const maxHd = spec.max;
      const highThac0 = 20 - minHd;
      const lowThac0 = 20 - maxHd;
      const display = lowThac0 === highThac0 ? String(lowThac0) : `${lowThac0}–${highThac0}`;
      return {
        display,
        formula: `20 − HD where HD varies ${minHd}–${maxHd}`,
        note: "THAC0 depends on which HD is rolled for each individual.",
      };
    }
    if (spec.kind === "options") {
      const thacValues = spec.options
        .filter((n) => Number.isFinite(n) && n > 0)
        .map((n) => 20 - n)
        .sort((a, b) => a - b);
      if (!thacValues.length) {
        return { display: "—", formula: "20 − HD", note: "Could not derive THAC0 from HD options." };
      }
      const lowT = thacValues[0];
      const highT = thacValues[thacValues.length - 1];
      const display = lowT === highT ? String(lowT) : `${lowT}–${highT}`;
      return {
        display,
        formula: "20 − HD (one of several HD options)",
        note: "THAC0 depends on which HD option is rolled.",
      };
    }
    return {
      display: "—",
      formula: "20 − HD",
      note: spec.note || "Set Effective HD to a value like 2 or 3+1 to compute THAC0.",
    };
  }

  function getEffectiveHdForEncounter(monster) {
    const override = $hdOverrideInput ? clean($hdOverrideInput.value) : "";
    if (override) return override;
    return clean(monster && monster.hd) || "";
  }

  function combatantResolvedHdText(encounter, combatant) {
    return clean(combatant.hdText) || clean(encounter.effectiveHd || encounter.monster?.hd) || "";
  }

  /** På HE encounter-kortet: THAC0 følger combatants' aktuelle HD (fx efter ændring i tracker). */
  function thac0DisplayToNumericBounds(display) {
    const d = String(display == null ? "" : display).trim();
    if (!d || d === "—") return null;
    const rangeMatch = d.match(/^(\d+)[\u2013-](\d+)$/);
    if (rangeMatch) {
      const a = Number.parseInt(rangeMatch[1], 10);
      const b = Number.parseInt(rangeMatch[2], 10);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
      return { min: Math.min(a, b), max: Math.max(a, b) };
    }
    const single = d.match(/^(-?\d+)$/);
    if (single) {
      const v = Number.parseInt(single[1], 10);
      if (!Number.isFinite(v)) return null;
      return { min: v, max: v };
    }
    return null;
  }

  function syncEncounterThac0FromCombatants(encounter) {
    if (!encounter || !Array.isArray(encounter.combatants) || encounter.combatants.length === 0) {
      return;
    }
    const hdStrings = encounter.combatants.map((c) => combatantResolvedHdText(encounter, c));
    const uniqueHds = [...new Set(hdStrings.filter((h) => clean(h)))];
    const fallbackHd = clean(encounter.effectiveHd || encounter.monster?.hd) || "";
    if (uniqueHds.length === 0) {
      encounter.thac0Info = describeThac0FromHdText(fallbackHd);
      return;
    }
    if (uniqueHds.length === 1) {
      encounter.thac0Info = describeThac0FromHdText(uniqueHds[0]);
      return;
    }

    const boundsList = [];
    encounter.combatants.forEach((c) => {
      const hd = combatantResolvedHdText(encounter, c);
      const info = describeThac0FromHdText(hd);
      const b = thac0DisplayToNumericBounds(info.display);
      if (b) boundsList.push(b);
    });

    if (!boundsList.length) {
      encounter.thac0Info = {
        display: "Varierer",
        formula: "Forskellig HD i tracker",
        note: "THAC0 pr. monster i kolonnen Max HP / HD.",
      };
      return;
    }

    const low = Math.min(...boundsList.map((b) => b.min));
    const high = Math.max(...boundsList.map((b) => b.max));
    const display = low === high ? String(low) : `${low}\u2013${high}`;
    encounter.thac0Info = {
      display,
      formula: "Ud fra HD pr. monster (20 − hit dice)",
      note: "Blandet HD — se nøjagtig THAC0 på hver række i trackeren.",
    };
  }

  function rollSingleMonsterHp(spec) {
    if (spec.kind === "special" || spec.kind === "unknown") {
      return { hp: null, formula: spec.label || "-", note: spec.note || "Unknown HD" };
    }

    if (spec.kind === "fixed") {
      return { hp: spec.value, formula: `${spec.value}`, note: spec.note || "" };
    }

    if (spec.kind === "half") {
      const total = Math.max(1, rollDice(1, 4) + (spec.bonus || 0));
      return {
        hp: total,
        formula: `1d4${formatSignedNumber(spec.bonus || 0)}`,
        note: spec.note || "",
      };
    }

    let diceCount = 0;
    if (spec.kind === "dice") {
      diceCount = spec.diceCount;
    } else if (spec.kind === "range") {
      diceCount = randomInt(spec.min, spec.max);
    } else if (spec.kind === "options") {
      const optionIndex = randomInt(0, spec.options.length - 1);
      diceCount = spec.options[optionIndex];
    }

    if (!Number.isFinite(diceCount) || diceCount <= 0) {
      return { hp: null, formula: spec.label || "-", note: "Ugyldigt HD antal" };
    }

    const bonus = spec.bonus || 0;
    const total = Math.max(1, rollDice(diceCount, 8) + bonus);
    return {
      hp: total,
      formula: `${diceCount}d8${formatSignedNumber(bonus)}`,
      note: spec.note || "",
    };
  }

  function rollEncounterHp(hdText, count) {
    const spec = parseHdSpec(hdText);
    const rolls = [];

    for (let i = 0; i < count; i += 1) {
      const rolled = rollSingleMonsterHp(spec);
      rolls.push({ index: i + 1, hp: rolled.hp, formula: rolled.formula, note: rolled.note });
    }

    const numeric = rolls.filter((entry) => Number.isFinite(entry.hp)).map((entry) => entry.hp);
    const total = numeric.reduce((sum, value) => sum + value, 0);

    return {
      spec,
      rolls,
      summary: {
        count,
        rollableCount: numeric.length,
        unresolvedCount: count - numeric.length,
        total,
        min: numeric.length ? Math.min(...numeric) : null,
        max: numeric.length ? Math.max(...numeric) : null,
        avg: numeric.length ? Number((total / numeric.length).toFixed(2)) : null,
      },
    };
  }

  function recomputeEncounterHpSummary(encounter) {
    const hpData = encounter && encounter.hp;
    if (!hpData || !Array.isArray(hpData.rolls)) return;
    const rolls = hpData.rolls;
    const numeric = rolls.filter((entry) => Number.isFinite(entry.hp)).map((entry) => entry.hp);
    const total = numeric.reduce((sum, value) => sum + value, 0);
    const count = rolls.length;
    hpData.summary = {
      count,
      rollableCount: numeric.length,
      unresolvedCount: count - numeric.length,
      total,
      min: numeric.length ? Math.min(...numeric) : null,
      max: numeric.length ? Math.max(...numeric) : null,
      avg: numeric.length ? Number((total / numeric.length).toFixed(2)) : null,
    };
  }

  function refreshEncounterDerivedTotals(encounter) {
    if (!encounter) return;
    const activeCount = Array.isArray(encounter.combatants)
      ? encounter.combatants.length
      : Number.isFinite(encounter.count) ? encounter.count : 0;
    encounter.count = activeCount;
    recomputeEncounterHpSummary(encounter);
    if (encounter.xpRaw) {
      encounter.xp = xpSummary(encounter.xpRaw, activeCount);
    }
    if (encounter.combatants && encounter.combatants.length) {
      syncEncounterThac0FromCombatants(encounter);
    } else {
      encounter.thac0Info = describeThac0FromHdText(encounter.effectiveHd || encounter.monster?.hd || "");
    }
  }

  function normalizeDamageValue(value) {
    const parsed = Number.parseInt(String(value), 10);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed < 0) return 0;
    return parsed;
  }

  function parseMoraleScore(value) {
    const raw = clean(value);
    const normalized = raw
      .toLowerCase()
      .replaceAll("—", "-")
      .replaceAll("–", "-")
      .replaceAll("−", "-");

    if (
      !normalized
      || normalized === "-"
      || normalized === "n/a"
      || normalized === "na"
      || normalized === "var"
      || normalized === "spec"
    ) {
      return { raw: raw || "-", score: null };
    }

    const match = normalized.match(/\d+/);
    if (!match) {
      return { raw: raw || "-", score: null };
    }

    const score = Number.parseInt(match[0], 10);
    if (!Number.isFinite(score) || Number.isNaN(score) || score < 2 || score > 12) {
      return { raw: raw || "-", score: null };
    }

    return { raw: raw || String(score), score };
  }

  function normalizeMoraleScore(value) {
    if (value == null || String(value).trim() === "") return null;
    const parsed = Number.parseInt(String(value), 10);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return null;
    return Math.max(2, Math.min(12, parsed));
  }

  function normalizeReactionModifier(value) {
    if (value == null || String(value).trim() === "") return 0;
    const parsed = Number.parseInt(String(value), 10);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return 0;
    return parsed;
  }

  function createReactionState() {
    return {
      modifier: 0,
      carryModifier: 0,
      history: [],
    };
  }

  function createEncounterMoraleState() {
    return {
      history: [],
      firstDeathTriggered: false,
      halfForceTriggered: false,
    };
  }

  function isCombatantMoraleBroken(combatant) {
    return combatant?.moraleBroken === true;
  }

  function setCombatantMoraleResult(combatant, result) {
    combatant.moraleLastCheck = result;
    if (result?.outcome === "break") {
      combatant.moraleBroken = true;
    }
  }

  function trimHistory(history, limit = 10) {
    if (!Array.isArray(history)) return [];
    if (history.length <= limit) return history;
    history.length = limit;
    return history;
  }

  function ensureEncounterState(encounter) {
    if (!encounter) return;

    if (!Object.prototype.hasOwnProperty.call(encounter, "effectiveHd")) {
      encounter.effectiveHd = clean(encounter.monster?.hd) || "";
    }
    if (!Object.prototype.hasOwnProperty.call(encounter, "hdOverrideUsed")) {
      encounter.hdOverrideUsed = false;
    }

    if (!encounter.reaction) {
      encounter.reaction = createReactionState();
    }

    if (!encounter.morale) {
      encounter.morale = createEncounterMoraleState();
    }

    (encounter.combatants || []).forEach((combatant) => {
      if (!Object.prototype.hasOwnProperty.call(combatant, "moraleScore")) {
        const parsedMorale = parseMoraleScore(combatant.moraleRaw || encounter.monster?.morale);
        combatant.moraleScore = parsedMorale.score;
        combatant.moraleRaw = parsedMorale.raw;
      }

      if (!combatant.moraleTriggers) {
        combatant.moraleTriggers = {
          firstHit: false,
          quarter: false,
        };
      }

      if (!Object.prototype.hasOwnProperty.call(combatant, "moraleLastCheck")) {
        combatant.moraleLastCheck = null;
      }

      if (!Object.prototype.hasOwnProperty.call(combatant, "moraleBroken")) {
        combatant.moraleBroken = combatant.moraleLastCheck?.outcome === "break";
      }

      if (!Object.prototype.hasOwnProperty.call(combatant, "hdText")) {
        combatant.hdText = clean(encounter.effectiveHd || encounter.monster?.hd) || "";
      }
    });

    if (encounter.combatants && encounter.combatants.length) {
      syncEncounterThac0FromCombatants(encounter);
    } else if (!encounter.thac0Info) {
      encounter.thac0Info = describeThac0FromHdText(encounter.effectiveHd || encounter.monster?.hd || "");
    }
  }

  function moraleOutcomeClass(outcome) {
    if (outcome === "hold") return "tracker-morale-hold";
    if (outcome === "break") return "tracker-morale-break";
    return "tracker-morale-unknown";
  }

  function moraleOutcomeWord(outcome) {
    if (outcome === "hold") return "Held";
    if (outcome === "break") return "Broke";
    return "Needs score";
  }

  function describeMoraleCheckForUi(check, combatant = null) {
    if (isCombatantMoraleBroken(combatant) && (!check || check.outcome !== "break")) {
      return {
        text: "Broken",
        detail: "Fleeing or surrendering for the rest of this fight",
        className: "tracker-morale-break",
      };
    }

    if (!check) {
      return {
        text: "Not checked",
        detail: "",
        className: "tracker-morale-pending",
      };
    }

    if (check.outcome === "unknown") {
      return {
        text: "Set morale score",
        detail: check.reason || "",
        className: "tracker-morale-unknown",
      };
    }

    if (check.auto) {
      const detail = check.outcome === "break"
        ? `${check.reason} (Morale ${check.score}); broken for rest of fight`
        : `${check.reason} (Morale ${check.score})`;
      return {
        text: `${moraleOutcomeWord(check.outcome)} automatically`,
        detail,
        className: moraleOutcomeClass(check.outcome),
      };
    }

    const detail = check.outcome === "break"
      ? [check.reason, "broken for rest of fight"].filter(Boolean).join("; ")
      : check.reason || "";

    return {
      text: `${moraleOutcomeWord(check.outcome)} (${check.rawRoll} vs ${check.score})`,
      detail,
      className: moraleOutcomeClass(check.outcome),
    };
  }

  function describeMoraleCheckForLog(entry) {
    if (!entry) return "No morale result";
    if (entry.outcome === "unknown") return "Needs morale score";
    const suffix = entry.outcome === "break" ? "; broken for rest of fight" : "";
    if (entry.auto) return `${moraleOutcomeWord(entry.outcome)} automatically (Morale ${entry.score})${suffix}`;
    return `${moraleOutcomeWord(entry.outcome)} on ${entry.rawRoll} vs ${entry.score}${suffix}`;
  }

  function formatCombatantMoraleForExport(combatant) {
    const base = Number.isFinite(combatant.moraleScore)
      ? String(combatant.moraleScore)
      : combatant.moraleRaw || "manual";
    if (!combatant.moraleLastCheck) {
      if (isCombatantMoraleBroken(combatant)) {
        return `${base}; broken for rest of fight`;
      }
      return `${base}; not checked`;
    }
    return `${base}; ${describeMoraleCheckForLog(combatant.moraleLastCheck)}`;
  }

  function resetCombatantMoraleState(combatant) {
    combatant.moraleLastCheck = null;
    combatant.moraleBroken = false;
    combatant.moraleTriggers = {
      firstHit: false,
      quarter: false,
    };
  }

  function reactionOutcome(total) {
    const band = Math.max(2, Math.min(12, total));

    if (band <= 3) {
      return {
        label: "Attacks",
        detail: "Immediate hostility. No parley without leverage.",
        nextModifier: 0,
      };
    }

    if (band <= 6) {
      return {
        label: "Aggressive",
        detail: "Hostile posture. Roll again in one round at -4.",
        nextModifier: -4,
      };
    }

    if (band <= 9) {
      return {
        label: "Cautious",
        detail: "Stands off. Roll again in one round.",
        nextModifier: 0,
      };
    }

    if (band <= 11) {
      return {
        label: "Neutral",
        detail: "Open to words. Roll again in one round at +4.",
        nextModifier: 4,
      };
    }

    return {
      label: "Friendly",
      detail: "Friendly or helpful unless provoked.",
      nextModifier: 0,
    };
  }

  function describeReactionModifierBreakdown(entry) {
    const parts = [];
    if (entry.baseModifier) {
      parts.push(`base ${formatSignedNumber(entry.baseModifier)}`);
    }
    if (entry.carryModifier) {
      parts.push(`carry ${formatSignedNumber(entry.carryModifier)}`);
    }
    return parts.length ? ` (${parts.join(", ")})` : "";
  }

  function rollReaction(encounter) {
    ensureEncounterState(encounter);
    const baseModifier = normalizeReactionModifier(encounter.reaction.modifier);
    const carryModifier = normalizeReactionModifier(encounter.reaction.carryModifier);
    const modifier = baseModifier + carryModifier;
    const rawRoll = rollDice(2, 6);
    const total = rawRoll + modifier;
    const outcome = reactionOutcome(total);
    const entry = {
      rawRoll,
      baseModifier,
      carryModifier,
      modifier,
      total,
      label: outcome.label,
      detail: outcome.detail,
      nextModifier: outcome.nextModifier,
    };

    encounter.reaction.carryModifier = outcome.nextModifier;
    encounter.reaction.history.unshift(entry);
    trimHistory(encounter.reaction.history, 8);
    return entry;
  }

  function resolveMoraleCheck(combatant, reason, sharedRoll = null) {
    const score = normalizeMoraleScore(combatant.moraleScore);

    if (score == null) {
      return {
        combatantIndex: combatant.index,
        reason,
        score: null,
        rawRoll: null,
        outcome: "unknown",
        auto: false,
      };
    }

    if (score <= 2) {
      return {
        combatantIndex: combatant.index,
        reason,
        score,
        rawRoll: null,
        outcome: "break",
        auto: true,
      };
    }

    if (score >= 12) {
      return {
        combatantIndex: combatant.index,
        reason,
        score,
        rawRoll: null,
        outcome: "hold",
        auto: true,
      };
    }

    const rawRoll = Number.isFinite(sharedRoll) ? sharedRoll : rollDice(2, 6);
    return {
      combatantIndex: combatant.index,
      reason,
      score,
      rawRoll,
      outcome: rawRoll <= score ? "hold" : "break",
      auto: false,
    };
  }

  function applySingleMoraleCheck(encounter, combatant, reason) {
    ensureEncounterState(encounter);
    if (isCombatantMoraleBroken(combatant)) return null;

    const result = resolveMoraleCheck(combatant, reason);
    setCombatantMoraleResult(combatant, result);
    encounter.morale.history.unshift({
      kind: "single",
      combatantIndex: combatant.index,
      ...result,
    });
    trimHistory(encounter.morale.history, 12);
    return result;
  }

  function eligibleMoraleCombatants(encounter) {
    return (encounter.combatants || []).filter((combatant) => {
      const currentHp = computeCurrentHp(combatant);
      return !isCombatantMoraleBroken(combatant) && (currentHp == null || currentHp > 0);
    });
  }

  function applyGroupMoraleCheck(encounter, reason) {
    ensureEncounterState(encounter);
    const targets = eligibleMoraleCombatants(encounter);
    if (!targets.length) return null;

    const requiresRoll = targets.some((combatant) => {
      const score = normalizeMoraleScore(combatant.moraleScore);
      return Number.isFinite(score) && score > 2 && score < 12;
    });
    const sharedRoll = requiresRoll ? rollDice(2, 6) : null;

    const results = targets.map((combatant) => {
      const result = resolveMoraleCheck(combatant, reason, sharedRoll);
      setCombatantMoraleResult(combatant, result);
      return result;
    });

    encounter.morale.history.unshift({
      kind: "group",
      reason,
      sharedRoll,
      results,
    });
    trimHistory(encounter.morale.history, 12);

    return {
      reason,
      sharedRoll,
      results,
    };
  }

  function formatGroupMoraleSummary(groupResult) {
    if (!groupResult) return "No unbroken morale targets remained.";
    const rollText = Number.isFinite(groupResult.sharedRoll)
      ? `shared 2d6 ${groupResult.sharedRoll}`
      : "automatic morale";
    return `${groupResult.reason}: ${rollText} for ${groupResult.results.length} unbroken monster(s).`;
  }

  function evaluateMoraleTriggers(encounter, combatant) {
    ensureEncounterState(encounter);
    const messages = [];
    const currentHp = computeCurrentHp(combatant);
    const canCheckThisCombatant = !isCombatantMoraleBroken(combatant);

    if (canCheckThisCombatant && combatant.damageTaken > 0 && !combatant.moraleTriggers.firstHit) {
      combatant.moraleTriggers.firstHit = true;
      if (currentHp == null || currentHp > 0) {
        const result = applySingleMoraleCheck(encounter, combatant, "First hit");
        if (result) {
          messages.push(`#${combatant.index}: ${describeMoraleCheckForLog(result)}`);
        }
      }
    }

    if (
      canCheckThisCombatant
      && Number.isFinite(combatant.maxHp)
      && currentHp != null
      && currentHp > 0
      && currentHp <= Math.ceil(combatant.maxHp / 4)
      && !combatant.moraleTriggers.quarter
    ) {
      combatant.moraleTriggers.quarter = true;
      const result = applySingleMoraleCheck(encounter, combatant, "Quarter HP");
      if (result) {
        messages.push(`#${combatant.index}: ${describeMoraleCheckForLog(result)}`);
      }
    }

    const summary = summarizeCombatants(encounter.combatants || []);
    let groupReason = "";

    if (!encounter.morale.firstDeathTriggered && summary.down >= 1) {
      encounter.morale.firstDeathTriggered = true;
      groupReason = "First death on either side";
    }

    if (
      !encounter.morale.halfForceTriggered
      && summary.rollableCount > 0
      && summary.down >= Math.ceil(summary.rollableCount / 2)
    ) {
      encounter.morale.halfForceTriggered = true;
      groupReason = groupReason
        ? `${groupReason}; half the monsters are down`
        : "Half the monsters are down";
    }

    if (groupReason) {
      const groupResult = applyGroupMoraleCheck(encounter, groupReason);
      if (groupResult) {
        messages.push(formatGroupMoraleSummary(groupResult));
      }
    }

    return messages;
  }

  function buildCombatantsFromRolls(rolls, weaponModel, monster) {
    return rolls.map((roll) => {
      const loadout = rollCombatantLoadout(weaponModel);
      const parsedMorale = parseMoraleScore(monster.morale);
      return {
        index: roll.index,
        initiative: null,
        maxHp: Number.isFinite(roll.hp) ? roll.hp : null,
        formula: roll.formula,
        rollNote: roll.note || "",
        damageTaken: 0,
        note: Number.isFinite(roll.hp) ? "" : roll.note || "",
        meleeWeapon: loadout.meleeWeapon,
        meleeDamage: loadout.meleeDamage,
        rangedWeapon: loadout.rangedWeapon,
        rangedDamage: loadout.rangedDamage,
        canRerollWeapon: loadout.canReroll,
        carriedTreasure: createCarriedTreasure(monster.treasureType),
        weaponMasteryLevel: monster.weaponMasteryLevel || "",
        weaponMasterySlot: monster.weaponMasteryLevel && weaponModel.byWeapon ? "melee" : "",
        moraleScore: parsedMorale.score,
        moraleRaw: parsedMorale.raw,
        moraleLastCheck: null,
        moraleBroken: false,
        moraleTriggers: {
          firstHit: false,
          quarter: false,
        },
        hdText: "",
      };
    });
  }

  function applyCombatantHdAndRerollHp(encounter, combatant, rawHdInput) {
    const fallback = clean(encounter.effectiveHd || encounter.monster?.hd) || "";
    const typed = clean(rawHdInput);
    combatant.hdText = typed || fallback;

    const spec = parseHdSpec(combatant.hdText);
    const rolled = rollSingleMonsterHp(spec);
    combatant.maxHp = rolled.hp;
    combatant.formula = rolled.formula;
    combatant.rollNote = rolled.note || "";
    combatant.damageTaken = 0;

    const rollEntry = (encounter.hp && encounter.hp.rolls || []).find((r) => r.index === combatant.index);
    if (rollEntry) {
      rollEntry.hp = combatant.maxHp;
      rollEntry.formula = combatant.formula;
      rollEntry.note = combatant.rollNote;
    }
    recomputeEncounterHpSummary(encounter);
  }

  function sortCombatantsForDisplay(combatants) {
    return [...combatants].sort((left, right) => {
      const leftInitiative = Number.isFinite(left.initiative) ? left.initiative : Number.NEGATIVE_INFINITY;
      const rightInitiative = Number.isFinite(right.initiative) ? right.initiative : Number.NEGATIVE_INFINITY;
      return rightInitiative - leftInitiative || left.index - right.index;
    });
  }

  function computeCurrentHp(combatant) {
    if (!Number.isFinite(combatant.maxHp)) return null;
    return combatant.maxHp - combatant.damageTaken;
  }

  function isCombatantDead(combatant) {
    const currentHp = computeCurrentHp(combatant);
    return currentHp != null && currentHp <= 0;
  }

  function summarizeCombatants(combatants) {
    let totalMax = 0;
    let totalCurrent = 0;
    let rollableCount = 0;
    let alive = 0;
    let down = 0;
    let unknown = 0;

    combatants.forEach((combatant) => {
      const currentHp = computeCurrentHp(combatant);
      if (!Number.isFinite(combatant.maxHp) || currentHp == null) {
        unknown += 1;
        return;
      }

      rollableCount += 1;
      totalMax += combatant.maxHp;
      totalCurrent += currentHp;
      if (currentHp > 0) {
        alive += 1;
      } else {
        down += 1;
      }
    });

    return {
      count: combatants.length,
      rollableCount,
      unknown,
      alive,
      down,
      totalMax,
      totalCurrent,
    };
  }

  function combatantState(combatant) {
    const currentHp = computeCurrentHp(combatant);
    if (currentHp == null) {
      return { currentText: "?", statusText: "Unknown", statusClass: "tracker-status-unknown" };
    }
    if (currentHp <= 0) {
      return { currentText: String(currentHp), statusText: "Dead", statusClass: "tracker-status-dead" };
    }
    if (isCombatantMoraleBroken(combatant)) {
      return { currentText: String(currentHp), statusText: "Broken", statusClass: "tracker-status-broken" };
    }
    if (currentHp <= Math.ceil(combatant.maxHp / 2)) {
      return { currentText: String(currentHp), statusText: "Wounded", statusClass: "tracker-status-wounded" };
    }
    return { currentText: String(currentHp), statusText: "Ready", statusClass: "tracker-status-healthy" };
  }

  function parseXpValue(xpText) {
    const raw = clean(xpText);
    const normalized = raw
      .toLowerCase()
      .replaceAll(",", "")
      .replaceAll(" ", "")
      .replaceAll("—", "-")
      .replaceAll("–", "-");

    if (!normalized || normalized === "-" || normalized === "nil") {
      return { kind: "unknown", label: raw || "-", note: "No standard XP value" };
    }

    if (normalized === "var" || normalized === "var." || normalized === "spec") {
      return { kind: "unknown", label: raw, note: "XP depends on a special rule" };
    }

    if (/^\d+$/.test(normalized)) {
      const value = Number.parseInt(normalized, 10);
      return { kind: "fixed", label: raw, perMonster: value };
    }

    if (/^\d+\+$/.test(normalized)) {
      const min = Number.parseInt(normalized.slice(0, -1), 10);
      return { kind: "plus", label: raw, perMonsterMin: min, note: "Open upper bound (+)" };
    }

    if (/^\d+-\d+$/.test(normalized)) {
      const [minText, maxText] = normalized.split("-");
      const min = Number.parseInt(minText, 10);
      const max = Number.parseInt(maxText, 10);
      if (Number.isFinite(min) && Number.isFinite(max) && min <= max) {
        return {
          kind: "range",
          label: raw,
          perMonsterMin: min,
          perMonsterMax: max,
          perMonsterAvg: Math.round((min + max) / 2),
        };
      }
    }

    return { kind: "unknown", label: raw, note: "Could not parse XP format" };
  }

  function xpSummary(parsedXp, count) {
    if (parsedXp.kind === "fixed") {
      return {
        perMonsterText: `${parsedXp.perMonster}`,
        totalText: `${parsedXp.perMonster * count}`,
        note: "",
      };
    }

    if (parsedXp.kind === "range") {
      const totalMin = parsedXp.perMonsterMin * count;
      const totalMax = parsedXp.perMonsterMax * count;
      const totalAvg = parsedXp.perMonsterAvg * count;
      return {
        perMonsterText: `${parsedXp.perMonsterMin}-${parsedXp.perMonsterMax} (avg ${parsedXp.perMonsterAvg})`,
        totalText: `${totalMin}-${totalMax} (avg ${totalAvg})`,
        note: "XP is a range and is shown as min-max plus average.",
      };
    }

    if (parsedXp.kind === "plus") {
      const minTotal = parsedXp.perMonsterMin * count;
      return {
        perMonsterText: `${parsedXp.perMonsterMin}+`,
        totalText: `${minTotal}+`,
        note: "XP has an open upper bound (+).",
      };
    }

    return {
      perMonsterText: parsedXp.label || "Unknown",
      totalText: "Unknown",
      note: parsedXp.note || "XP must be clarified manually.",
    };
  }

  function currentSourceFiltered() {
    const source = $sourceFilter.value;
    if (source === "all") return monsters;
    return monsters.filter((monster) => monster.source === source);
  }

  function populateCategoryFilter() {
    const filtered = currentSourceFiltered();
    const previous = $categoryFilter.value;

    const categories = Array.from(new Set(filtered.map((monster) => monster.category))).sort((a, b) =>
      a.localeCompare(b, "da")
    );

    $categoryFilter.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All categories";
    $categoryFilter.appendChild(allOption);

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      $categoryFilter.appendChild(option);
    });

    if (previous && Array.from($categoryFilter.options).some((option) => option.value === previous)) {
      $categoryFilter.value = previous;
    }
  }

  function populateMonsterSelect() {
    const sourceFiltered = currentSourceFiltered();
    const category = $categoryFilter.value;

    visibleMonsters = sourceFiltered.filter((monster) => {
      if (category === "all") return true;
      return monster.category === category;
    });

    $monsterSelect.innerHTML = "";

    visibleMonsters.forEach((monster, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${monster.name} [${sourceShort(monster.source)}]`;
      $monsterSelect.appendChild(option);
    });

    const disabled = visibleMonsters.length === 0;
    $monsterSelect.disabled = disabled;
    $generateBtn.disabled = disabled;
    $randomBtn.disabled = disabled;
    $exportArtBatchBtn.disabled = disabled;

    if (disabled) {
      setStatus("No monsters match the current filter.", "fail");
    } else {
      const detailNote =
        MONSTER_DETAIL_META.rcDetailCount || MONSTER_DETAIL_META.ccDescriptionCount
          ? ` RC details: ${MONSTER_DETAIL_META.rcDetailCount || 0}, CC descriptions: ${MONSTER_DETAIL_META.ccDescriptionCount || 0}.`
          : "";
      setStatus(`${visibleMonsters.length} monster types in the selection.${detailNote}`, "");
    }
  }

  function getSelectedMonster() {
    if (!visibleMonsters.length) return null;
    const selectedIndex = parsePositiveInt($monsterSelect.value);
    if (selectedIndex == null || selectedIndex < 0 || selectedIndex >= visibleMonsters.length) {
      return null;
    }
    return visibleMonsters[selectedIndex];
  }

  function validateCountInput() {
    const count = parsePositiveInt($countInput.value);
    if (count == null) {
      throw new Error("Number of monsters must be an integer.");
    }
    if (count < 1) {
      throw new Error("Number of monsters must be at least 1.");
    }
    if (count > MAX_COUNT) {
      throw new Error(`Number of monsters may not exceed ${MAX_COUNT}.`);
    }
    return count;
  }

  function buildEncounter(monster, count) {
    const parsedXp = parseXpValue(monster.xp);
    const xp = xpSummary(parsedXp, count);
    const effectiveHd = getEffectiveHdForEncounter(monster);
    const hdOverrideUsed = Boolean($hdOverrideInput && clean($hdOverrideInput.value));
    const hp = rollEncounterHp(effectiveHd, count);
    const weaponModel = createWeaponModel(monster);
    const combatants = buildCombatantsFromRolls(hp.rolls, weaponModel, monster);
    const defaultRowHd = effectiveHd || clean(monster.hd) || "";
    combatants.forEach((c) => {
      c.hdText = defaultRowHd;
    });

    const encounter = {
      generatedAt: new Date(),
      monster,
      count,
      effectiveHd,
      hdOverrideUsed,
      xp,
      xpRaw: parsedXp,
      hp,
      combatants,
      weaponModel,
      reaction: createReactionState(),
      morale: createEncounterMoraleState(),
    };
    syncEncounterThac0FromCombatants(encounter);
    return encounter;
  }

  function renderHpBox(encounter) {
    const hpData = encounter.hp;
    const summary = hpData.summary;
    const rollsToShow = hpData.rolls.slice(0, MAX_HP_LIST_DISPLAY);
    const hiddenCount = hpData.rolls.length - rollsToShow.length;

    const summaryLines = [];
    const bookHd = encounter.monster.hd || "-";
    const effHd = encounter.effectiveHd || encounter.monster.hd || "-";
    summaryLines.push(`<p><strong>HD (stat block):</strong> ${escapeHtml(bookHd)}</p>`);
    summaryLines.push(
      `<p><strong>HD used for HP rolls:</strong> ${escapeHtml(effHd)}${
        encounter.hdOverrideUsed ? " <span class=\"hp-note\">(override)</span>" : ""
      }</p>`
    );

    if (summary.rollableCount > 0) {
      summaryLines.push(`<p><strong>HP total:</strong> ${summary.total}</p>`);
      summaryLines.push(`<p><strong>HP min/max:</strong> ${summary.min} / ${summary.max}</p>`);
      summaryLines.push(`<p><strong>HP average:</strong> ${summary.avg}</p>`);
      summaryLines.push(
        `<p><strong>Rolled:</strong> ${summary.rollableCount} of ${summary.count}</p>`
      );
    } else {
      summaryLines.push("<p><strong>HP:</strong> Could not be rolled automatically for this HD.</p>");
    }

    if (summary.unresolvedCount > 0) {
      summaryLines.push(`<p class="hp-note">${summary.unresolvedCount} monster(s) require manual HP clarification.</p>`);
    }

    if (hpData.spec.note) {
      summaryLines.push(`<p class="hp-note">${escapeHtml(hpData.spec.note)}</p>`);
    }

    const rows = rollsToShow
      .map((roll) => {
        const hpText = Number.isFinite(roll.hp) ? String(roll.hp) : "?";
        const note = roll.note ? ` (${escapeHtml(roll.note)})` : "";
        return `<li>#${roll.index}: <strong>${hpText}</strong> HP <span class="hp-formula">[${escapeHtml(roll.formula)}]</span>${note}</li>`;
      })
      .join("");

    const overflow = hiddenCount > 0
      ? `<p class="hp-note">Showing the first ${MAX_HP_LIST_DISPLAY} HP rolls. ${hiddenCount} are hidden in the UI, but included in markdown.</p>`
      : "";

    return `
      <div class="hp-box">
        <h4>Hit Points</h4>
        ${summaryLines.join("")}
        <ul class="hp-roll-list">${rows}</ul>
        ${overflow}
      </div>
    `;
  }

  function renderCarriedTreasureCell(combatant) {
    const treasure = combatant.carriedTreasure;
    if (!treasure) {
      return `<div class="tracker-treasure-empty">No carried treasure</div>`;
    }

    if (!treasure.available) {
      return `<div class="tracker-treasure-empty">${escapeHtml(treasure.summaryText)}</div>`;
    }

    if (!treasure.hasTreasure) {
      return `<div class="tracker-treasure-empty">${escapeHtml(treasure.summaryText)}</div>`;
    }

    const detailItems = treasure.detailLines
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join("");

    return `
      <div class="tracker-treasure-cell">
        <p class="tracker-treasure-summary">${escapeHtml(treasure.summaryText)}</p>
        <button
          type="button"
          class="tracker-row-btn"
          data-action="reroll-treasure"
          data-combatant-index="${combatant.index}"
        >Reroll loot</button>
        <details class="tracker-treasure-details">
          <summary>Details</summary>
          <ul class="flat">${detailItems}</ul>
        </details>
      </div>
    `;
  }

  function renderWeaponMasteryBadge(combatant, slot) {
    if (!combatant.weaponMasteryLevel || combatant.weaponMasterySlot !== slot) return "";
    return `<span class="tracker-mastery-badge">${escapeHtml(combatant.weaponMasteryLevel)}</span>`;
  }

  function renderReactionBox(encounter) {
    ensureEncounterState(encounter);
    const reaction = encounter.reaction;
    const modifierText = reaction.modifier || 0;
    const carryModifier = normalizeReactionModifier(reaction.carryModifier);
    const historyItems = reaction.history.length
      ? reaction.history.map((entry) => {
        const modifier = entry.modifier ? ` ${formatSignedNumber(entry.modifier)}` : "";
        const breakdown = describeReactionModifierBreakdown(entry);
        const nextCarry = entry.nextModifier
          ? ` Next roll carries ${formatSignedNumber(entry.nextModifier)}.`
          : "";
        return `<li><strong>${escapeHtml(entry.label)}</strong> - 2d6 ${entry.rawRoll}${escapeHtml(modifier)} = ${entry.total}${escapeHtml(breakdown)}. ${escapeHtml(entry.detail)}${escapeHtml(nextCarry)}</li>`;
      }).join("")
      : "<li>No reaction roll recorded yet.</li>";

    return `
      <div class="tracker-event-box">
        <h5>Reaction Roll</h5>
        <div class="tracker-inline-controls">
          <label class="tracker-inline-label">
            Situational modifier
            <input
              class="tracker-mini-input tracker-reaction-modifier-input"
              type="number"
              step="1"
              value="${escapeHtml(String(modifierText))}"
              data-role="reaction-modifier"
            >
          </label>
          <button type="button" class="tracker-mini-btn" data-action="roll-reaction">Roll Reaction</button>
          <button type="button" class="tracker-mini-btn ghost" data-action="clear-reaction">Clear</button>
        </div>
        <p class="tracker-reaction-carry">Current carry-over: <strong>${escapeHtml(formatSignedNumber(carryModifier) || "0")}</strong></p>
        <ul class="tracker-history-list">${historyItems}</ul>
      </div>
    `;
  }

  function renderMoraleLog(encounter) {
    ensureEncounterState(encounter);
    const historyItems = encounter.morale.history.length
      ? encounter.morale.history.map((entry) => {
        if (entry.kind === "group") {
          const rollText = Number.isFinite(entry.sharedRoll)
            ? `Shared roll ${entry.sharedRoll}`
            : "Automatic morale";
          const resultsText = entry.results
            .map((result) => `#${result.combatantIndex} ${describeMoraleCheckForLog(result).toLowerCase()}`)
            .join("; ");
          return `<li><strong>${escapeHtml(entry.reason)}</strong> - ${escapeHtml(rollText)}. ${escapeHtml(resultsText)}</li>`;
        }

        return `<li><strong>#${entry.combatantIndex}</strong> - ${escapeHtml(entry.reason)}: ${escapeHtml(describeMoraleCheckForLog(entry))}</li>`;
      }).join("")
      : "<li>No morale checks recorded yet.</li>";

    return `
      <div class="tracker-event-box">
        <h5>Morale Log</h5>
        <div class="tracker-inline-controls">
          <button type="button" class="tracker-mini-btn" data-action="check-group-morale">Check Group Morale</button>
          <button type="button" class="tracker-mini-btn ghost" data-action="clear-morale-log">Clear Log</button>
        </div>
        <ul class="tracker-history-list">${historyItems}</ul>
      </div>
    `;
  }

  function renderTrackerMaxHpBlock(combatant) {
    const maxHpText = Number.isFinite(combatant.maxHp) ? String(combatant.maxHp) : "?";
    const hdForInput = clean(combatant.hdText) || "";
    const thac0 = describeThac0FromHdText(combatant.hdText || "");
    const rollNote = combatant.rollNote ? ` <span class="hp-formula">(${escapeHtml(combatant.rollNote)})</span>` : "";
    return `
      <div class="tracker-hp-stack">
        <div class="tracker-hp-line">
          <span class="tracker-max-hp-num">${escapeHtml(maxHpText)}</span>
          <span class="hp-formula">[${escapeHtml(combatant.formula || "-")}]</span>${rollNote}
        </div>
        <label class="tracker-hd-label">
          HD
          <input
            type="text"
            class="tracker-mini-input tracker-hd-input"
            data-combatant-index="${combatant.index}"
            value="${escapeHtml(hdForInput)}"
            title="Skriv HD (fx 2, 4+1, 1/2), tryk Enter eller klik væk — HP genrulles, THAC0 opdateres, skade nulstilles"
            spellcheck="false"
          >
        </label>
        <div class="tracker-row-thac0" data-role="tracker-row-thac0">THAC0 <strong>${escapeHtml(thac0.display)}</strong> <span class="hp-formula">${escapeHtml(thac0.formula)}</span></div>
      </div>
    `;
  }

  function renderFleeButton(combatant) {
    return `
      <button
        type="button"
        class="tracker-row-btn tracker-flee-btn"
        data-action="mark-fled"
        data-combatant-index="${combatant.index}"
        title="Fjern dette monster fra encounteret"
      >Flygtet</button>
    `;
  }

  function refreshCombatantMaxHpTd(combatant) {
    const td = $resultPanel.querySelector(
      `td[data-tracker-col="maxhp"][data-combatant-index="${combatant.index}"]`
    );
    if (td) {
      td.innerHTML = renderTrackerMaxHpBlock(combatant);
    }
  }

  function refreshHpBoxInDom(encounter) {
    const prev = $resultPanel.querySelector(".hp-box");
    if (!prev) return;
    const wrapped = document.createElement("div");
    wrapped.innerHTML = renderHpBox(encounter);
    const next = wrapped.firstElementChild;
    if (next) {
      prev.replaceWith(next);
    }
  }

  function refreshEncounterThac0InDom(encounter) {
    syncEncounterThac0FromCombatants(encounter);
    const info = encounter.thac0Info;
    if (!info) return;
    const displayEl = $resultPanel.querySelector("[data-role=\"encounter-thac0-display\"]");
    const formulaEl = $resultPanel.querySelector("[data-role=\"encounter-thac0-formula\"]");
    const noteEl = $resultPanel.querySelector("[data-role=\"encounter-thac0-note\"]");
    if (displayEl) displayEl.textContent = info.display;
    if (formulaEl) formulaEl.textContent = info.formula;
    if (noteEl) {
      const n = info.note || "";
      noteEl.textContent = n;
      noteEl.style.display = n ? "" : "none";
    }
  }

  function renderMoraleCell(combatant) {
    const moraleState = describeMoraleCheckForUi(combatant.moraleLastCheck, combatant);
    const moraleValue = Number.isFinite(combatant.moraleScore) ? String(combatant.moraleScore) : "";
    const rawText = combatant.moraleRaw && combatant.moraleRaw !== "-"
      ? combatant.moraleRaw
      : "manual";
    const moraleLocked = isCombatantMoraleBroken(combatant);

    return `
      <div class="tracker-morale-cell">
        <div class="tracker-morale-controls">
          <input
            class="tracker-mini-input tracker-morale-score-input"
            type="number"
            min="2"
            max="12"
            step="1"
            value="${escapeHtml(moraleValue)}"
            data-combatant-index="${combatant.index}"
            placeholder="2-12"
          >
          <button
            type="button"
            class="tracker-row-btn"
            data-action="check-morale"
            data-combatant-index="${combatant.index}"
            ${moraleLocked ? 'disabled title="Broken for the rest of this fight"' : ""}
          >Check morale</button>
        </div>
        <div class="tracker-morale-meta">Base: ${escapeHtml(rawText)}</div>
        <div
          class="tracker-morale-result ${moraleState.className}"
          data-role="morale-result"
          data-combatant-index="${combatant.index}"
        >${escapeHtml(moraleState.text)}</div>
        <div
          class="tracker-morale-detail"
          data-role="morale-detail"
          data-combatant-index="${combatant.index}"
        >${escapeHtml(moraleState.detail)}</div>
      </div>
    `;
  }

  function renderDeadCombatantRow(combatant) {
    const initiativeText = Number.isFinite(combatant.initiative) ? String(combatant.initiative) : "-";
    const maxHpText = Number.isFinite(combatant.maxHp) ? String(combatant.maxHp) : "?";
    const currentHp = computeCurrentHp(combatant);
    const currentText = currentHp == null ? "?" : String(currentHp);
    const state = combatantState(combatant);
    const noteValue = escapeHtml(combatant.note || "");
    const treasureSummary = combatant.carriedTreasure
      ? combatant.carriedTreasure.summaryText
      : "No carried treasure";

    return `
      <tr class="tracker-row-dead-collapsed" data-combatant-row="${combatant.index}">
        <td colspan="${TRACKER_COLUMN_COUNT}">
          <details class="tracker-dead-details">
            <summary>
              <span class="tracker-dead-title">#${combatant.index} Dead</span>
              <span>HP ${escapeHtml(currentText)} / ${escapeHtml(maxHpText)}</span>
              <span>Damage ${escapeHtml(combatant.damageTaken)}</span>
              <span>Init ${escapeHtml(initiativeText)}</span>
              <span class="tracker-dead-loot-summary">Carrying: ${escapeHtml(treasureSummary)}</span>
              ${combatant.note ? `<span class="tracker-dead-note">${escapeHtml(combatant.note)}</span>` : ""}
            </summary>
            <div class="tracker-dead-grid">
              <div>${renderTrackerMaxHpBlock(combatant)}</div>
              <div class="tracker-dead-loot-cell">${renderCarriedTreasureCell(combatant)}</div>
              <label class="tracker-dead-field">
                Damage
                <input
                  class="tracker-damage-input"
                  type="number"
                  min="0"
                  step="1"
                  value="${combatant.damageTaken}"
                  data-combatant-index="${combatant.index}"
                >
              </label>
              <div class="tracker-dead-field">
                Current HP
                <span
                  class="tracker-current ${state.statusClass}"
                  data-role="current-hp"
                  data-combatant-index="${combatant.index}"
                >${state.currentText}</span>
              </div>
              <div class="tracker-dead-field">
                Status
                <span
                  class="tracker-status ${state.statusClass}"
                  data-role="status-text"
                  data-combatant-index="${combatant.index}"
                >${state.statusText}</span>
              </div>
              <div>${renderMoraleCell(combatant)}</div>
              <label class="tracker-dead-field tracker-dead-notes">
                Notes
                <textarea
                  class="tracker-note-input"
                  rows="2"
                  data-combatant-index="${combatant.index}"
                  placeholder="Notes..."
                >${noteValue}</textarea>
              </label>
            </div>
          </details>
        </td>
      </tr>
    `;
  }

  function renderCombatTracker(encounter) {
    ensureEncounterState(encounter);
    const combatants = encounter.combatants || [];
    if (!combatants.length) return "";

    const summary = summarizeCombatants(combatants);
    const sortedCombatants = sortCombatantsForDisplay(combatants);
    const rowsToShow = sortedCombatants.slice(0, MAX_TRACKER_UI_ROWS);
    const hiddenCount = sortedCombatants.length - rowsToShow.length;
    const initiativeRolled = combatants.some((combatant) => Number.isFinite(combatant.initiative));

    const rows = rowsToShow
      .map((combatant) => {
        const initiativeText = Number.isFinite(combatant.initiative) ? String(combatant.initiative) : "-";
        const state = combatantState(combatant);
        const noteValue = escapeHtml(combatant.note || "");
        if (state.statusText === "Dead") {
          return renderDeadCombatantRow(combatant);
        }
        return `
          <tr data-combatant-row="${combatant.index}">
            <td>#${combatant.index}</td>
            <td class="tracker-initiative-cell"><span class="tracker-initiative">${initiativeText}</span></td>
            <td class="tracker-col-maxhp" data-tracker-col="maxhp" data-combatant-index="${combatant.index}">
              ${renderTrackerMaxHpBlock(combatant)}
            </td>
            <td>
              <div class="tracker-weapon-cell">
                ${renderWeaponMasteryBadge(combatant, "melee")}
                <input
                  class="tracker-melee-weapon-input"
                  type="text"
                  value="${escapeHtml(combatant.meleeWeapon || "-")}"
                  data-combatant-index="${combatant.index}"
                  placeholder="Melee weapon"
                >
                <input
                  class="tracker-melee-damage-input"
                  type="text"
                  value="${escapeHtml(combatant.meleeDamage || "-")}"
                  data-combatant-index="${combatant.index}"
                  placeholder="Melee damage"
                >
                ${combatant.canRerollWeapon
                  ? `<button type="button" class="tracker-row-btn" data-action="reroll-melee" data-combatant-index="${combatant.index}">Reroll melee</button>`
                  : ""
                }
              </div>
            </td>
            <td>
              <div class="tracker-weapon-cell">
                ${renderWeaponMasteryBadge(combatant, "ranged")}
                <input
                  class="tracker-ranged-weapon-input"
                  type="text"
                  value="${escapeHtml(combatant.rangedWeapon || "")}"
                  data-combatant-index="${combatant.index}"
                  placeholder="Ranged weapon"
                >
                <input
                  class="tracker-ranged-damage-input"
                  type="text"
                  value="${escapeHtml(combatant.rangedDamage || "")}"
                  data-combatant-index="${combatant.index}"
                  placeholder="Ranged damage"
                >
                ${combatant.canRerollWeapon
                  ? `<button type="button" class="tracker-row-btn" data-action="reroll-ranged" data-combatant-index="${combatant.index}">Reroll ranged</button>`
                  : ""
                }
              </div>
            </td>
            <td>${renderCarriedTreasureCell(combatant)}</td>
            <td>
              <input
                class="tracker-damage-input"
                type="number"
                min="0"
                step="1"
                value="${combatant.damageTaken}"
                data-combatant-index="${combatant.index}"
              >
            </td>
            <td>
              <span
                class="tracker-current ${state.statusClass}"
                data-role="current-hp"
                data-combatant-index="${combatant.index}"
              >${state.currentText}</span>
            </td>
            <td>
              <span
                class="tracker-status ${state.statusClass}"
                data-role="status-text"
                data-combatant-index="${combatant.index}"
              >${state.statusText}</span>
              ${renderFleeButton(combatant)}
            </td>
            <td>${renderMoraleCell(combatant)}</td>
            <td>
              <textarea
                class="tracker-note-input"
                rows="2"
                data-combatant-index="${combatant.index}"
                placeholder="Notes..."
              >${noteValue}</textarea>
            </td>
          </tr>
        `;
      })
      .join("");

    const hiddenNotice = hiddenCount > 0
      ? `<p class="hp-note">Showing the first ${MAX_TRACKER_UI_ROWS} monsters in the tracker${initiativeRolled ? ", sorted by initiative" : ""}. ${hiddenCount} are hidden in the UI.</p>`
      : "";

    return `
      <div class="tracker-box" data-combat-tracker>
        <h4>Combat Tracker</h4>
        <div class="tracker-summary">
          <span><strong>Alive:</strong> <span data-tracker-role="alive">${summary.alive}</span></span>
          <span><strong>Dead:</strong> <span data-tracker-role="down">${summary.down}</span></span>
          <span><strong>Unknown HP:</strong> <span data-tracker-role="unknown">${summary.unknown}</span></span>
          <span><strong>HP Remaining:</strong> <span data-tracker-role="total-current">${summary.totalCurrent}</span></span>
          <span><strong>HP Max:</strong> <span data-tracker-role="total-max">${summary.totalMax}</span></span>
        </div>
        <div class="tracker-actions">
          <button type="button" class="tracker-mini-btn" data-action="roll-initiative">Roll Initiative</button>
          <button type="button" class="tracker-mini-btn" data-action="reset-damage">Reset Damage</button>
          <button type="button" class="tracker-mini-btn ghost" data-action="clear-notes">Clear Notes</button>
        </div>
        <div class="tracker-event-grid">
          ${renderReactionBox(encounter)}
          ${renderMoraleLog(encounter)}
        </div>
        <div class="tracker-table-wrap">
          <table class="tracker-table">
            <thead>
              <tr>
                <th>Monster</th>
                <th>Init</th>
                <th>Max HP / HD</th>
                <th>Melee</th>
                <th>Ranged</th>
                <th>Carrying</th>
                <th>Damage</th>
                <th>Current HP</th>
                <th>Status</th>
                <th>Morale</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
        ${hiddenNotice}
      </div>
    `;
  }

  function updateCombatantRowInDom(combatant) {
    const state = combatantState(combatant);
    const currentEl = $resultPanel.querySelector(
      `[data-role="current-hp"][data-combatant-index="${combatant.index}"]`
    );
    const statusEl = $resultPanel.querySelector(
      `[data-role="status-text"][data-combatant-index="${combatant.index}"]`
    );
    const moraleEl = $resultPanel.querySelector(
      `[data-role="morale-result"][data-combatant-index="${combatant.index}"]`
    );
    const moraleDetailEl = $resultPanel.querySelector(
      `[data-role="morale-detail"][data-combatant-index="${combatant.index}"]`
    );

    if (currentEl) {
      currentEl.textContent = state.currentText;
      currentEl.className = `tracker-current ${state.statusClass}`;
    }

    if (statusEl) {
      statusEl.textContent = state.statusText;
      statusEl.className = `tracker-status ${state.statusClass}`;
    }

    if (moraleEl) {
      const moraleState = describeMoraleCheckForUi(combatant.moraleLastCheck, combatant);
      moraleEl.textContent = moraleState.text;
      moraleEl.className = `tracker-morale-result ${moraleState.className}`;
      if (moraleDetailEl) {
        moraleDetailEl.textContent = moraleState.detail;
      }
    }
  }

  function refreshTrackerSummaryInDom(encounter) {
    const trackerRoot = $resultPanel.querySelector("[data-combat-tracker]");
    if (!trackerRoot) return;

    const summary = summarizeCombatants(encounter.combatants || []);
    const mapping = {
      alive: summary.alive,
      down: summary.down,
      unknown: summary.unknown,
      "total-current": summary.totalCurrent,
      "total-max": summary.totalMax,
    };

    Object.keys(mapping).forEach((key) => {
      const target = trackerRoot.querySelector(`[data-tracker-role="${key}"]`);
      if (target) {
        target.textContent = String(mapping[key]);
      }
    });
  }

  function removeCombatantFromEncounter(encounter, combatant) {
    if (!encounter || !combatant || !Array.isArray(encounter.combatants)) return false;

    const beforeCount = encounter.combatants.length;
    encounter.combatants = encounter.combatants.filter((entry) => entry.index !== combatant.index);
    if (encounter.hp && Array.isArray(encounter.hp.rolls)) {
      encounter.hp.rolls = encounter.hp.rolls.filter((entry) => entry.index !== combatant.index);
    }
    refreshEncounterDerivedTotals(encounter);
    return encounter.combatants.length !== beforeCount;
  }

  function renderAuditBadge(status) {
    const label = treasureAuditLabel(status);
    const cssClass =
      status === "verified"
        ? "audit-badge-ok"
        : "audit-badge-warn";
    return `<span class="audit-badge ${cssClass}">${escapeHtml(label)}</span>`;
  }

  function renderDescriptionBox(monster) {
    const bookSection = monster.bookDescription
      ? `
        <div class="detail-section">
          <h5>Book Description</h5>
          <p>${escapeHtml(monster.bookDescription)}</p>
          ${monster.detailSource
            ? `<p class="detail-source"><strong>Detail Source:</strong> ${escapeHtml(monster.detailSource)}</p>`
            : ""}
        </div>
      `
      : "";
    const showQuickSummaryOpen = !monster.bookDescription || monster.bookDescription.length < 360;
    const quickProfileTitle = monster.bookDescription ? "Quick Summary" : "Quick Profile";
    const quickProfileSection = monster.bookDescription && !showQuickSummaryOpen
      ? `
        <details class="detail-summary-details">
          <summary>${escapeHtml(quickProfileTitle)}</summary>
          <p>${escapeHtml(monster.derivedSummary || "No quick profile available.")}</p>
        </details>
      `
      : `
        <div class="detail-section">
          <h5>${escapeHtml(quickProfileTitle)}</h5>
          <p>${escapeHtml(monster.derivedSummary || "No quick profile available.")}</p>
        </div>
      `;

    return `
      <div class="detail-box">
        <h4>Description</h4>
        ${bookSection}
        ${quickProfileSection}
      </div>
    `;
  }

  function renderArtBox(monster) {
    if (!monster.artRegistered) {
      return `
        <div class="art-box art-box-compact">
          <h4>Monster Art</h4>
          <p class="art-note">No local art is registered for this monster yet.</p>
          <p class="art-note"><strong>Expected file:</strong> <code>${escapeHtml(monster.artAssetPath)}</code></p>
          <div class="art-actions">
            <button type="button" class="tracker-mini-btn" data-action="download-art-prompt">Download Art Prompt</button>
          </div>
          <details class="art-prompt-details">
            <summary>Show art prompt</summary>
            <pre class="art-prompt-text">${escapeHtml(monster.artPrompt)}</pre>
          </details>
        </div>
      `;
    }

    const artVisual = monster.artRegistered
      ? `
        <img
          class="monster-art"
          src="${escapeHtml(monster.artAssetPath)}"
          alt="${escapeHtml(`${monster.name} reference art`)}"
          loading="lazy"
        >
      `
      : "";

    return `
      <div class="art-box">
        <h4>Monster Art</h4>
        <div class="art-layout">
          <div class="art-frame" data-loaded="${monster.artRegistered ? "true" : "false"}">
            ${artVisual}
          </div>
          <div class="art-meta">
            <p><strong>Local asset:</strong> <code>${escapeHtml(monster.artAssetPath)}</code></p>
            <p class="art-note">Use <strong>Export Art Batch</strong> to create JSONL prompts for the currently visible monster selection, then register finished files in <code>monster-art.js</code>.</p>
            <div class="art-actions">
              <button type="button" class="tracker-mini-btn" data-action="download-art-prompt">Download Art Prompt</button>
            </div>
            <details class="art-prompt-details">
              <summary>Show art prompt</summary>
              <pre class="art-prompt-text">${escapeHtml(monster.artPrompt)}</pre>
            </details>
          </div>
        </div>
      </div>
    `;
  }

  function renderEncounter(encounter) {
    ensureEncounterState(encounter);
    const monster = encounter.monster;
    const treasureText = monster.treasureType && monster.treasureType.toLowerCase() !== "nil"
      ? monster.treasureType
      : "None/unknown";
    const treasureSplitText = describeTreasureSplit(monster.treasureType);

    const categoryText = monster.category || "-";
    const sourceLabel = sourceShort(monster.source);
    const thac0Info = encounter.thac0Info || describeThac0FromHdText(encounter.effectiveHd || monster.hd);
    const hdStatSecondary = encounter.hdOverrideUsed
      ? `<span class="stat-block-sub">Rolls: ${escapeHtml(encounter.effectiveHd || "-")}</span>`
      : "";

    const html = `
      <article class="encounter-card">
        <h3>${escapeHtml(`${encounter.count} x ${monster.name}`)}</h3>
        <div class="encounter-meta">
          <p><strong>Source:</strong> ${escapeHtml(monster.source)} (${escapeHtml(sourceLabel)})</p>
          <p><strong>Category:</strong> ${escapeHtml(categoryText)}</p>
          <p><strong>Treasure Type:</strong> ${escapeHtml(treasureText)}</p>
          ${treasureSplitText ? `<p><strong>Treasure Split:</strong> ${escapeHtml(treasureSplitText)}</p>` : ""}
          <p><strong>Treasure Audit:</strong> ${renderAuditBadge(monster.treasureAuditStatus)}</p>
          ${monster.treasureNote ? `<p class="treasure-note">${escapeHtml(monster.treasureNote)}</p>` : ""}
        </div>

        <div class="encounter-stats">
          <div class="stat-block"><strong>AC</strong><span>${escapeHtml(monster.ac || "-")}</span></div>
          <div class="stat-block stat-block--hd">
            <strong>HD</strong>
            <span>${escapeHtml(monster.hd || "-")}${hdStatSecondary}</span>
          </div>
          <div class="stat-block stat-block--thac0" data-role="encounter-thac0-block">
            <strong>THAC0</strong>
            <span class="thac0-value" data-role="encounter-thac0-display">${escapeHtml(thac0Info.display)}</span>
            <span class="thac0-formula" data-role="encounter-thac0-formula">${escapeHtml(thac0Info.formula)}</span>
            <span class="stat-block-note" data-role="encounter-thac0-note" ${thac0Info.note ? "" : "style=\"display:none\""}>${thac0Info.note ? escapeHtml(thac0Info.note) : ""}</span>
          </div>
          <div class="stat-block"><strong>Move</strong><span>${escapeHtml(monster.move || "-")}</span></div>
          <div class="stat-block"><strong>Attacks</strong><span>${escapeHtml(monster.attacks || "-")}</span></div>
          <div class="stat-block"><strong>Damage</strong><span>${escapeHtml(monster.damage || "-")}</span></div>
          <div class="stat-block"><strong>Morale</strong><span>${escapeHtml(monster.morale || "-")}</span></div>
          <div class="stat-block"><strong>Save As</strong><span>${escapeHtml(monster.saveAs || "Not verified")}</span></div>
          <div class="stat-block"><strong>Saving Throws</strong><span class="save-throw-text">${escapeHtml(monster.savingThrows.detailText || "Not verified")}</span></div>
          <div class="stat-block"><strong>Intelligence</strong><span>${escapeHtml(monster.intelligence || "Not verified")}</span></div>
          <div class="stat-block"><strong>Weapon Mastery</strong><span>${escapeHtml(monster.weaponMasteryText || "-")}</span></div>
        </div>

        ${renderDescriptionBox(monster)}
        ${renderArtBox(monster)}
        ${renderHpBox(encounter)}
        ${renderCombatTracker(encounter)}

        <div class="xp-box">
          <p><strong>XP per monster:</strong> ${escapeHtml(encounter.xp.perMonsterText)}</p>
          <p><strong>XP total:</strong> ${escapeHtml(encounter.xp.totalText)}</p>
          ${encounter.xp.note ? `<p class="xp-note">${escapeHtml(encounter.xp.note)}</p>` : ""}
        </div>
      </article>
    `;

    $resultPanel.innerHTML = html;
  }

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-+|-+$/g, "")
      .slice(0, 60);
  }

  function stampForFile(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(
      date.getHours()
    )}${pad(date.getMinutes())}`;
  }

  function downloadTextFile(filename, content, mimeType = "text/plain;charset=utf-8") {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function buildArtBatchJsonl(monsterList) {
    return monsterList
      .map((monster) => JSON.stringify(buildMonsterArtBatchJob(monster)))
      .join("\n");
  }

  function downloadArtBatch(monsterList) {
    const stamp = stampForFile(new Date());
    const sourcePart = slugify($sourceFilter.value === "all" ? "all-sources" : $sourceFilter.value) || "all-sources";
    const categoryPart = slugify($categoryFilter.value === "all" ? "all-categories" : $categoryFilter.value) || "all-categories";
    const filename = `becmi-monster-art-batch-${sourcePart}-${categoryPart}-${monsterList.length}-${stamp}.jsonl`;
    const content = buildArtBatchJsonl(monsterList);

    downloadTextFile(filename, content, "application/x-ndjson;charset=utf-8");
    setStatus(`Art batch exported for ${monsterList.length} monster types. Output dir hint: ${ART_EXPORT_OUTPUT_DIR}`, "ok");
  }

  function downloadMonsterArtPrompt(monster) {
    const filename = `becmi-monster-art-prompt-${buildMonsterArtSlug(monster)}.txt`;
    downloadTextFile(filename, monster.artPrompt);
    setStatus(`Art prompt downloaded for ${monster.name}.`, "ok");
  }

  function buildMarkdown(encounter) {
    ensureEncounterState(encounter);
    const monster = encounter.monster;
    const lines = [];
    const generatedAtIso = encounter.generatedAt.toISOString();
    const treasureText = monster.treasureType && monster.treasureType.toLowerCase() !== "nil"
      ? monster.treasureType
      : "None/unknown";
    const treasureSplitText = describeTreasureSplit(monster.treasureType);

    lines.push("# BECMI Encounter");
    lines.push("");
    lines.push(`- Generated: ${generatedAtIso}`);
    lines.push(`- Source: ${monster.source}`);
    lines.push(`- Monster: ${monster.name}`);
    lines.push(`- Count: ${encounter.count}`);
    lines.push(`- Category: ${monster.category || "-"}`);
    lines.push(`- Treasure Type: ${treasureText}`);
    if (treasureSplitText) {
      lines.push(`- Treasure split: ${treasureSplitText}`);
    }
    lines.push(`- Treasure audit: ${treasureAuditLabel(monster.treasureAuditStatus)}`);
    if (monster.treasureNote) {
      lines.push(`- Treasure note: ${monster.treasureNote}`);
    }
    if (monster.detailSource) {
      lines.push(`- Detail Source: ${monster.detailSource}`);
    }
    lines.push("");

    lines.push("## Stats");
    lines.push("");
    lines.push(`- AC: ${monster.ac || "-"}`);
    lines.push(`- HD (stat block): ${monster.hd || "-"}`);
    lines.push(`- HD used for HP rolls: ${encounter.effectiveHd || monster.hd || "-"}`);
    if (encounter.hdOverrideUsed) {
      lines.push("- HD override: yes (Effective HD field)");
    }
    const mdThac0 = encounter.thac0Info || describeThac0FromHdText(encounter.effectiveHd || monster.hd);
    lines.push(`- THAC0: ${mdThac0.display} (${mdThac0.formula})`);
    if (mdThac0.note) {
      lines.push(`- THAC0 note: ${mdThac0.note}`);
    }
    lines.push(`- Move: ${monster.move || "-"}`);
    lines.push(`- Attacks: ${monster.attacks || "-"}`);
    lines.push(`- Damage: ${monster.damage || "-"}`);
    lines.push(`- Morale: ${monster.morale || "-"}`);
    lines.push(`- Save As: ${monster.saveAs || "Not verified"}`);
    lines.push(`- Saving Throws: ${monster.savingThrows.detailText || "Not verified"}`);
    lines.push(`- Intelligence: ${monster.intelligence || "Not verified"}`);
    lines.push(`- Weapon Mastery: ${monster.weaponMasteryText || "-"}`);
    lines.push("");

    lines.push("## Description");
    lines.push("");
    if (monster.bookDescription) {
      lines.push("### Book Description");
      lines.push("");
      lines.push(monster.bookDescription);
      lines.push("");
    }
    lines.push(`### ${monster.bookDescription ? "Quick Summary" : "Quick Profile"}`);
    lines.push("");
    lines.push(monster.derivedSummary || "No quick profile available.");
    lines.push("");

    lines.push("## Art");
    lines.push("");
    lines.push(`- Local asset path: ${monster.artAssetPath}`);
    lines.push("");
    lines.push("```text");
    lines.push(monster.artPrompt);
    lines.push("```");
    lines.push("");

    lines.push("## Hit Points");
    lines.push("");
    lines.push(`- HD (stat block): ${monster.hd || "-"}`);
    lines.push(`- HD used for HP rolls: ${encounter.effectiveHd || monster.hd || "-"}`);
    const hpSummary = encounter.hp.summary;
    if (hpSummary.rollableCount > 0) {
      lines.push(`- HP total: ${hpSummary.total}`);
      lines.push(`- HP min/max: ${hpSummary.min} / ${hpSummary.max}`);
      lines.push(`- HP average: ${hpSummary.avg}`);
      lines.push(`- Rolled: ${hpSummary.rollableCount} of ${hpSummary.count}`);
    } else {
      lines.push("- HP: Could not be rolled automatically for this HD.");
    }
    if (hpSummary.unresolvedCount > 0) {
      lines.push(`- Manual clarification: ${hpSummary.unresolvedCount}`);
    }
    if (encounter.hp.spec.note) {
      lines.push(`- Note: ${encounter.hp.spec.note}`);
    }
    lines.push("");

    lines.push("### HP per monster");
    lines.push("");
    const exportCombatants = sortCombatantsForDisplay(encounter.combatants || []).slice(0, MAX_HP_EXPORT_LIST);
    exportCombatants.forEach((combatant) => {
      const initiativeText = Number.isFinite(combatant.initiative) ? String(combatant.initiative) : "-";
      const maxHpText = Number.isFinite(combatant.maxHp) ? String(combatant.maxHp) : "?";
      const currentHp = computeCurrentHp(combatant);
      const currentText = currentHp == null ? "?" : String(currentHp);
      const meleeWeapon = combatant.meleeWeapon || "-";
      const meleeDamage = combatant.meleeDamage || "-";
      const rangedWeapon = combatant.rangedWeapon || "-";
      const rangedDamage = combatant.rangedDamage || "-";
      const carriedText = combatant.carriedTreasure ? combatant.carriedTreasure.summaryText : "No carried treasure";
      const carriedDetails = combatant.carriedTreasure && combatant.carriedTreasure.detailLines.length
        ? ` | Loot: ${combatant.carriedTreasure.detailLines.join(" ; ")}`
        : "";
      const mastery = combatant.weaponMasteryLevel ? ` | Mastery ${combatant.weaponMasteryLevel}` : "";
      const morale = ` | Morale ${formatCombatantMoraleForExport(combatant)}`;
      const rollNote = combatant.rollNote ? ` | Roll-note: ${combatant.rollNote}` : "";
      const note = combatant.note ? ` | Note: ${combatant.note.replaceAll("\n", " ")}` : "";
      const rowHd = clean(combatant.hdText) || encounter.effectiveHd || monster.hd || "-";
      const rowThac0 = describeThac0FromHdText(combatant.hdText || "");
      const thac0Part = ` | HD ${rowHd}; THAC0 ${rowThac0.display} (${rowThac0.formula})`;
      lines.push(
        `- #${combatant.index}: Init ${initiativeText}, Max ${maxHpText}, Melee ${meleeWeapon} (${meleeDamage}), Ranged ${rangedWeapon} (${rangedDamage}), Carried ${carriedText}, Damage ${combatant.damageTaken}, Current ${currentText} [${combatant.formula}]${thac0Part}${mastery}${morale}${rollNote}${carriedDetails}${note}`
      );
    });
    if ((encounter.combatants || []).length > exportCombatants.length) {
      lines.push(
        `- ... (${(encounter.combatants || []).length - exportCombatants.length} rows omitted from markdown for size)`
      );
    }
    lines.push("");

    lines.push("## Reaction and Morale");
    lines.push("");
    if (encounter.reaction?.history?.length) {
      lines.push("### Reaction history");
      lines.push("");
      encounter.reaction.history.forEach((entry) => {
        const modifier = entry.modifier ? ` ${formatSignedNumber(entry.modifier)}` : "";
        const breakdown = describeReactionModifierBreakdown(entry);
        const nextCarry = entry.nextModifier
          ? ` Next roll carries ${formatSignedNumber(entry.nextModifier)}.`
          : "";
        lines.push(`- ${entry.label}: 2d6 ${entry.rawRoll}${modifier} = ${entry.total}${breakdown}. ${entry.detail}${nextCarry}`);
      });
      lines.push("");
    } else {
      lines.push("- No reaction roll recorded.");
      lines.push("");
    }

    if (encounter.morale?.history?.length) {
      lines.push("### Morale log");
      lines.push("");
      encounter.morale.history.forEach((entry) => {
        if (entry.kind === "group") {
          const rollText = Number.isFinite(entry.sharedRoll)
            ? `shared roll ${entry.sharedRoll}`
            : "automatic morale";
          const resultsText = entry.results
            .map((result) => `#${result.combatantIndex} ${describeMoraleCheckForLog(result).toLowerCase()}`)
            .join("; ");
          lines.push(`- ${entry.reason}: ${rollText}. ${resultsText}`);
          return;
        }

        lines.push(`- #${entry.combatantIndex} ${entry.reason}: ${describeMoraleCheckForLog(entry)}`);
      });
      lines.push("");
    } else {
      lines.push("- No morale checks recorded.");
      lines.push("");
    }

    lines.push("## XP");
    lines.push("");
    lines.push(`- XP per monster: ${encounter.xp.perMonsterText}`);
    lines.push(`- XP total: ${encounter.xp.totalText}`);
    if (encounter.xp.note) {
      lines.push(`- Note: ${encounter.xp.note}`);
    }
    lines.push("");

    lines.push("## Data Sources");
    lines.push("");
    lines.push("- Rules Cyclopedia Opsummering.md");
    lines.push("- Creature Catalog Opsummering.md");

    return lines.join("\n");
  }

  function downloadMarkdown(encounter) {
    const stamp = stampForFile(encounter.generatedAt);
    const slug = slugify(encounter.monster.name) || "monster";
    const filename = `becmi-encounter-${slug}-${encounter.count}-${stamp}.md`;
    const content = buildMarkdown(encounter);

    downloadTextFile(filename, content, "text/markdown;charset=utf-8");
    setStatus(`Markdown exported: ${filename}`, "ok");
  }

  function getCombatantByDomIndex(indexText) {
    if (!lastEncounter || !Array.isArray(lastEncounter.combatants)) return null;
    const index = parsePositiveInt(indexText);
    if (index == null || index < 1) return null;
    return lastEncounter.combatants.find((combatant) => combatant.index === index) || null;
  }

  function handleTrackerInput(target) {
    if (!lastEncounter) return;

    if (target.classList.contains("tracker-reaction-modifier-input")) {
      lastEncounter.reaction.modifier = normalizeReactionModifier(target.value);
      return;
    }

    if (target.classList.contains("tracker-melee-weapon-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.meleeWeapon = target.value;
      return;
    }

    if (target.classList.contains("tracker-melee-damage-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.meleeDamage = target.value;
      return;
    }

    if (target.classList.contains("tracker-ranged-weapon-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.rangedWeapon = target.value;
      return;
    }

    if (target.classList.contains("tracker-ranged-damage-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.rangedDamage = target.value;
      return;
    }

    if (target.classList.contains("tracker-damage-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.damageTaken = normalizeDamageValue(target.value);
      updateCombatantRowInDom(combatant);
      refreshTrackerSummaryInDom(lastEncounter);
      return;
    }

    if (target.classList.contains("tracker-morale-score-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.moraleScore = normalizeMoraleScore(target.value);
      updateCombatantRowInDom(combatant);
      return;
    }

    if (target.classList.contains("tracker-hd-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      const previewHd = clean(target.value) || combatantResolvedHdText(lastEncounter, combatant);
      const thac0 = describeThac0FromHdText(previewHd);
      const stack = target.closest(".tracker-hp-stack");
      const rowThac = stack && stack.querySelector("[data-role=\"tracker-row-thac0\"]");
      if (rowThac) {
        rowThac.innerHTML = `THAC0 <strong>${escapeHtml(thac0.display)}</strong> <span class="hp-formula">${escapeHtml(thac0.formula)}</span>`;
      }
      return;
    }

    if (target.classList.contains("tracker-note-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.note = target.value;
    }
  }

  function handleTrackerChange(target) {
    if (!lastEncounter) return;

    if (target.classList.contains("tracker-reaction-modifier-input")) {
      lastEncounter.reaction.modifier = normalizeReactionModifier(target.value);
      target.value = String(lastEncounter.reaction.modifier);
      return;
    }

    if (target.classList.contains("tracker-morale-score-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.moraleScore = normalizeMoraleScore(target.value);
      target.value = combatant.moraleScore == null ? "" : String(combatant.moraleScore);
      updateCombatantRowInDom(combatant);
      return;
    }

    if (target.classList.contains("tracker-hd-input")) {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      const wasDead = isCombatantDead(combatant);
      applyCombatantHdAndRerollHp(lastEncounter, combatant, target.value);
      if (wasDead !== isCombatantDead(combatant)) {
        renderEncounter(lastEncounter);
        setStatus(`#${combatant.index}: HD ${combatant.hdText} — HP genrullet, skade nulstillet.`, "ok");
        return;
      }
      refreshCombatantMaxHpTd(combatant);
      updateCombatantRowInDom(combatant);
      refreshTrackerSummaryInDom(lastEncounter);
      refreshHpBoxInDom(lastEncounter);
      refreshEncounterThac0InDom(lastEncounter);
      setStatus(`#${combatant.index}: HD ${combatant.hdText} — HP genrullet, skade nulstillet.`, "ok");
      return;
    }

    if (!target.classList.contains("tracker-damage-input")) return;

    const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
    if (!combatant) return;
    const wasDead = isCombatantDead(combatant);
    combatant.damageTaken = normalizeDamageValue(target.value);
    target.value = String(combatant.damageTaken);
    const messages = evaluateMoraleTriggers(lastEncounter, combatant);
    if (messages.length) {
      renderEncounter(lastEncounter);
      setStatus(`Auto morale: ${messages.join(" | ")}`, "ok");
      return;
    }
    if (wasDead !== isCombatantDead(combatant)) {
      renderEncounter(lastEncounter);
      refreshTrackerSummaryInDom(lastEncounter);
      return;
    }
    updateCombatantRowInDom(combatant);
    refreshTrackerSummaryInDom(lastEncounter);
  }

  function handleTrackerClick(target) {
    if (!lastEncounter) return;
    const action = target.dataset.action;
    if (!action) return;

    if (action === "download-art-prompt") {
      downloadMonsterArtPrompt(lastEncounter.monster);
      return;
    }

    if (action === "roll-reaction") {
      const result = rollReaction(lastEncounter);
      renderEncounter(lastEncounter);
      const carryText = result.nextModifier
        ? ` Next roll carries ${formatSignedNumber(result.nextModifier)}.`
        : "";
      setStatus(`Reaction rolled: ${result.label} on 2d6 ${result.rawRoll}${result.modifier ? ` ${formatSignedNumber(result.modifier)}` : ""} = ${result.total}.${carryText}`, "ok");
      return;
    }

    if (action === "clear-reaction") {
      lastEncounter.reaction = createReactionState();
      renderEncounter(lastEncounter);
      setStatus("Reaction history cleared.", "ok");
      return;
    }

    if (action === "roll-initiative") {
      lastEncounter.combatants.forEach((combatant) => {
        combatant.initiative = rollDice(1, 6);
      });
      renderEncounter(lastEncounter);
      setStatus("Initiative rolled for all monsters. Tracker sorted highest first.", "ok");
      return;
    }

    if (action === "reroll-melee") {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      const model = lastEncounter.weaponModel || createWeaponModel(lastEncounter.monster || {});
      if (!model.byWeapon) {
        setStatus("This monster does not use 'by weapon' damage.", "fail");
        return;
      }
      const rerolled = rollCombatantLoadout(model);
      combatant.meleeWeapon = rerolled.meleeWeapon;
      combatant.meleeDamage = rerolled.meleeDamage;
      renderEncounter(lastEncounter);
      setStatus(`Melee weapon rerolled for #${combatant.index}.`, "ok");
      return;
    }

    if (action === "reroll-ranged") {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      const model = lastEncounter.weaponModel || createWeaponModel(lastEncounter.monster || {});
      if (!model.byWeapon) {
        setStatus("This monster does not use 'by weapon' damage.", "fail");
        return;
      }
      const rerolledRanged = pickRangedWeaponProfile();
      combatant.rangedWeapon = rerolledRanged.name;
      combatant.rangedDamage = formatWeaponDamage(rerolledRanged.damage, model.suffix);
      renderEncounter(lastEncounter);
      setStatus(`Ranged weapon set for #${combatant.index}.`, "ok");
      return;
    }

    if (action === "reroll-treasure") {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      combatant.carriedTreasure = createCarriedTreasure(lastEncounter.monster.treasureType);
      renderEncounter(lastEncounter);
      setStatus(`Carried treasure rerolled for #${combatant.index}.`, "ok");
      return;
    }

    if (action === "mark-fled") {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      const removed = removeCombatantFromEncounter(lastEncounter, combatant);
      if (!removed) return;
      renderEncounter(lastEncounter);
      setStatus(`#${combatant.index} flygtede og blev fjernet fra encounteret.`, "ok");
      return;
    }

    if (action === "reset-damage") {
      lastEncounter.combatants.forEach((combatant) => {
        combatant.damageTaken = 0;
        resetCombatantMoraleState(combatant);
      });
      lastEncounter.morale = createEncounterMoraleState();
      renderEncounter(lastEncounter);
      setStatus("Damage and auto-morale state reset for all monsters in the tracker.", "ok");
      return;
    }

    if (action === "clear-notes") {
      lastEncounter.combatants.forEach((combatant) => {
        combatant.note = "";
      });
      renderEncounter(lastEncounter);
      setStatus("Notes cleared for all monsters in the tracker.", "ok");
      return;
    }

    if (action === "check-morale") {
      const combatant = getCombatantByDomIndex(target.dataset.combatantIndex);
      if (!combatant) return;
      if (isCombatantMoraleBroken(combatant)) {
        updateCombatantRowInDom(combatant);
        setStatus(`Morale for #${combatant.index}: already broken for the rest of this fight.`, "fail");
        return;
      }
      const result = applySingleMoraleCheck(lastEncounter, combatant, "Manual check");
      if (!result) {
        updateCombatantRowInDom(combatant);
        setStatus(`Morale for #${combatant.index}: already broken for the rest of this fight.`, "fail");
        return;
      }
      renderEncounter(lastEncounter);
      setStatus(`Morale for #${combatant.index}: ${describeMoraleCheckForLog(result)}.`, result.outcome === "break" ? "fail" : "ok");
      return;
    }

    if (action === "check-group-morale") {
      const groupResult = applyGroupMoraleCheck(lastEncounter, "Manual group check");
      renderEncounter(lastEncounter);
      if (!groupResult) {
        setStatus("No living unbroken monsters remained for a group morale check.", "fail");
        return;
      }
      setStatus(formatGroupMoraleSummary(groupResult), "ok");
      return;
    }

    if (action === "clear-morale-log") {
      lastEncounter.morale.history = [];
      lastEncounter.combatants.forEach((combatant) => {
        combatant.moraleLastCheck = null;
      });
      renderEncounter(lastEncounter);
      setStatus("Morale log cleared. Broken monsters remain broken for this fight.", "ok");
    }
  }

  function handleGenerate() {
    hideError();

    const monster = getSelectedMonster();
    if (!monster) {
      showError("Choose a monster first.");
      return;
    }

    let count;
    try {
      count = validateCountInput();
    } catch (error) {
      showError(error.message);
      return;
    }

    const encounter = buildEncounter(monster, count);
    lastEncounter = encounter;
    renderEncounter(encounter);
    $exportMdBtn.disabled = false;
    setStatus(`Encounter generated: ${count} x ${monster.name} (HP rolled).`, "ok");
  }

  function handleRandomMonster() {
    hideError();
    if (!visibleMonsters.length) {
      showError("No monsters match your current filter.");
      return;
    }

    const randomIndex = randomInt(0, visibleMonsters.length - 1);
    $monsterSelect.value = String(randomIndex);
    const monster = visibleMonsters[randomIndex];
    setStatus(`Randomly selected: ${monster.name}.`, "ok");
  }

  function handleReset() {
    hideError();
    $countInput.value = "1";
    if ($hdOverrideInput) {
      $hdOverrideInput.value = "";
    }
    $resultPanel.innerHTML = "<div class=\"result-empty\">No encounter generated yet.</div>";
    $exportMdBtn.disabled = true;
    lastEncounter = null;
    setStatus("Reset.", "");
  }

  function refreshFiltersAndMonsters() {
    hideError();
    populateCategoryFilter();
    populateMonsterSelect();
  }

  function wireEvents() {
    $sourceFilter.addEventListener("change", () => {
      refreshFiltersAndMonsters();
    });

    $categoryFilter.addEventListener("change", () => {
      hideError();
      populateMonsterSelect();
    });

    $generateBtn.addEventListener("click", handleGenerate);
    $randomBtn.addEventListener("click", handleRandomMonster);
    $resetBtn.addEventListener("click", handleReset);
    $exportMdBtn.addEventListener("click", () => {
      if (!lastEncounter) {
        showError("There is no encounter to export yet.");
        return;
      }
      hideError();
      downloadMarkdown(lastEncounter);
    });
    $exportArtBatchBtn.addEventListener("click", () => {
      if (!visibleMonsters.length) {
        showError("No monsters match your current filter.");
        return;
      }
      hideError();
      downloadArtBatch(visibleMonsters);
    });

    $countInput.addEventListener("input", () => {
      hideError();
    });

    $resultPanel.addEventListener("input", (event) => {
      handleTrackerInput(event.target);
    });

    $resultPanel.addEventListener("change", (event) => {
      handleTrackerChange(event.target);
    });

    $resultPanel.addEventListener("keydown", (event) => {
      if (
        event.target.classList.contains("tracker-hd-input")
        && event.key === "Enter"
      ) {
        event.preventDefault();
        event.target.blur();
      }
    });

    $resultPanel.addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;
      handleTrackerClick(target);
    });
  }

  function init() {
    if (!monsters.length) {
      showError("Monster data could not be loaded.");
      $generateBtn.disabled = true;
      $randomBtn.disabled = true;
      $exportArtBatchBtn.disabled = true;
      return;
    }

    refreshFiltersAndMonsters();
    wireEvents();
    setStatus(`Ready. ${monsters.length} monster records loaded.`, "ok");
  }

  init();
})();
