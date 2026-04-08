const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const ASSET_DIR = path.join(ROOT, "assets", "monster-art");
const OUT_FILE = path.join(ROOT, "monster-art.js");
const DATA_FILE = path.join(ROOT, "data.js");

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

function loadMonsters() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(DATA_FILE, "utf8"), context, { filename: DATA_FILE });
  return Array.isArray(context.window.BECMI_ENCOUNTER_MONSTERS)
    ? context.window.BECMI_ENCOUNTER_MONSTERS
    : [];
}

function buildSlug(source, name) {
  return `${slugify(source)}--${slugify(name)}`;
}

function main() {
  const monsters = loadMonsters();
  const files = fs.existsSync(ASSET_DIR)
    ? fs.readdirSync(ASSET_DIR).filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
    : [];

  const fileByBase = new Map(files.map((file) => [path.parse(file).name, file]));
  const mapping = {};

  for (const monster of monsters) {
    const key = `${clean(monster.source)}::${clean(monster.name)}`;
    const slug = buildSlug(monster.source, monster.name);
    const fileName = fileByBase.get(slug);
    if (!fileName) continue;
    mapping[key] = {
      path: `assets/monster-art/${fileName}`.replace(/\\/g, "/"),
    };
  }

  const content = [
    "(function(){",
    "  window.BECMI_ENCOUNTER_ART_META = {",
    `    imageCount: ${Object.keys(mapping).length},`,
    `    generatedAt: ${JSON.stringify(new Date().toISOString())}`,
    "  };",
    "",
    "  window.BECMI_ENCOUNTER_ART = " + JSON.stringify(mapping, null, 2).replace(/\n/g, "\n  ") + ";",
    "})();",
    "",
  ].join("\n");

  fs.writeFileSync(OUT_FILE, content);
  console.log(JSON.stringify({
    imageCount: Object.keys(mapping).length,
    outFile: OUT_FILE,
  }, null, 2));
}

main();
