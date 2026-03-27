import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const campaignRoot = path.resolve(projectRoot, "..");
const outputRoot = path.join(projectRoot, "src", "edens_dm", "data", "becmi");

function runScriptInWindow(relativePath) {
  const fullPath = path.join(campaignRoot, relativePath);
  const source = fs.readFileSync(fullPath, "utf8");
  const context = {
    window: {},
    globalThis: null,
    console,
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(source, context, { filename: fullPath });
  return context.window;
}

function writeJson(fileName, payload) {
  fs.mkdirSync(outputRoot, { recursive: true });
  const fullPath = path.join(outputRoot, fileName);
  fs.writeFileSync(fullPath, JSON.stringify(payload, null, 2), "utf8");
}

const encounterWindow = runScriptInWindow("tools/becmi-encounter-generator/data.js");
const encounterDetailsWindow = runScriptInWindow("tools/becmi-encounter-generator/monster-details.js");
const treasureWindow = runScriptInWindow("tools/becmi-treasure-generator/data.js");

writeJson("encounter_monsters.json", encounterWindow.BECMI_ENCOUNTER_MONSTERS ?? []);
writeJson("encounter_details.json", encounterDetailsWindow.BECMI_ENCOUNTER_DETAILS ?? {});
writeJson("encounter_detail_meta.json", encounterDetailsWindow.BECMI_ENCOUNTER_DETAIL_META ?? {});
writeJson("treasure_tables.json", treasureWindow.BECMI_TREASURE_DATA ?? {});

console.log(`BECMI data exported to ${outputRoot}`);

