const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, "..", "..", "output", "chatgpt-miniatures");
const DATA_FILES = [
  path.join(ROOT, "data.js"),
  path.join(ROOT, "monster-details.js"),
];

function loadWindowData() {
  const context = { window: {} };
  vm.createContext(context);
  for (const filePath of DATA_FILES) {
    const code = fs.readFileSync(filePath, "utf8");
    vm.runInContext(code, context, { filename: filePath });
  }
  return context.window;
}

function clean(value) {
  return String(value == null ? "" : value).trim();
}

function slugify(value) {
  return clean(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
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
    const sentenceBoundary = Math.max(
      clipped.lastIndexOf(". "),
      clipped.lastIndexOf("! "),
      clipped.lastIndexOf("? ")
    );
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

function buildMonsterArtSlug(monster) {
  return `${slugify(monster.source)}--${slugify(monster.name)}`;
}

function buildDescriptionCue(monster) {
  if (monster.bookDescription) {
    return takeLeadingSentences(monster.bookDescription, 4, 700);
  }

  const cues = [
    `${monster.name} from ${monster.source}.`,
    monster.category ? `Category: ${monster.category}.` : "",
    monster.hd ? `HD ${monster.hd}.` : "",
    monster.ac ? `AC ${monster.ac}.` : "",
    monster.move ? `Move ${monster.move}.` : "",
    monster.attacks ? `Attacks ${monster.attacks}.` : "",
    monster.damage ? `Damage ${monster.damage}.` : "",
    monster.morale ? `Morale ${monster.morale}.` : "",
  ].filter(Boolean);
  return cues.join(" ");
}

function buildPrompt(monster) {
  return [
    "Create a single image for a Creatures & Chronicles tabletop miniature reference.",
    `Subject: ${monster.name} from ${monster.source}.`,
    "Framing: full body, centered, readable silhouette.",
    "Style: grim dark fantasy miniature concept art, high detail, practical materials, believable anatomy and gear.",
    "Pose: alert three-quarter stance, clearly readable as a tabletop miniature concept.",
    `Must include: ${buildDescriptionCue(monster)}`,
    "Background: simple neutral studio or subdued parchment backdrop, no clutter.",
    "Mood: ominous, grounded, old-world bestiary.",
    "Avoid: text, watermark, cropped limbs, duplicate anatomy, duplicate gear, multiple subjects, busy background."
  ].join("\n");
}

function main() {
  const windowData = loadWindowData();
  const monsters = Array.isArray(windowData.BECMI_ENCOUNTER_MONSTERS)
    ? windowData.BECMI_ENCOUNTER_MONSTERS
    : [];
  const details = windowData.BECMI_ENCOUNTER_DETAILS || {};

  const queue = monsters.map((monster, index) => {
    const source = clean(monster.source);
    const name = clean(monster.name);
    const detail = details[`${source}::${name}`] || {};
    const bookDescription = getUsableBookDescription(detail);
    const category = clean(monster.monsterType) || (source === "Rules Cyclopedia" ? "RC (uncategorized)" : "Unknown");
    const slug = buildMonsterArtSlug({ source, name });

    return {
      index: index + 1,
      key: `${source}::${name}`,
      source,
      name,
      slug,
      expectedAssetPath: `assets/monster-art/${slug}.png`,
      bookDescription,
      category: cleanCategoryLabel(category, source),
      hd: clean(monster.hd),
      ac: clean(monster.ac),
      move: clean(monster.move),
      attacks: clean(monster.attacks),
      damage: clean(monster.damage),
      morale: clean(monster.morale),
      prompt: buildPrompt({
        source,
        name,
        category,
        bookDescription,
        hd: clean(monster.hd),
        ac: clean(monster.ac),
        move: clean(monster.move),
        attacks: clean(monster.attacks),
        damage: clean(monster.damage),
        morale: clean(monster.morale),
      }),
    };
  });

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const jsonPath = path.join(OUTPUT_DIR, "becmi-monster-art-queue.json");
  const mdPath = path.join(OUTPUT_DIR, "becmi-monster-art-queue.md");

  fs.writeFileSync(jsonPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    count: queue.length,
    items: queue,
  }, null, 2));

  const md = [
    "# BECMI Monster Art Queue",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Count: ${queue.length}`,
    "",
    ...queue.flatMap((item) => ([
      `## ${item.index}. ${item.name} [${item.source === "Rules Cyclopedia" ? "RC" : "CC"}]`,
      "",
      `- Key: \`${item.key}\``,
      `- Expected asset: \`${item.expectedAssetPath}\``,
      "",
      "```text",
      item.prompt,
      "```",
      "",
    ])),
  ].join("\n");
  fs.writeFileSync(mdPath, md);

  console.log(JSON.stringify({ count: queue.length, jsonPath, mdPath }, null, 2));
}

main();
