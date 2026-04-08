const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const PROJECT_URL = "https://chatgpt.com/g/g-p-695525e12e4481918efda89f0809b1ed-c-c-miniature-figure-generator/project";
const ROOT = __dirname;
const OUTPUT_ROOT = path.join(ROOT, "..", "..", "output", "chatgpt-miniatures");
const QUEUE_PATH = path.join(OUTPUT_ROOT, "becmi-monster-art-queue.json");
const STORAGE_STATE_PATH = path.join(OUTPUT_ROOT, "chatgpt-project-storage-state.json");
const STATUS_PATH = path.join(OUTPUT_ROOT, "batch-status.json");
const LOG_PATH = path.join(OUTPUT_ROOT, "batch.log");
const ASSET_DIR = path.join(ROOT, "assets", "monster-art");
const ERROR_DIR = path.join(OUTPUT_ROOT, "errors");

const HEADLESS = /^1|true|yes$/i.test(process.env.HEADLESS || "");
const MAX_ITEMS = Number.parseInt(process.env.MAX_ITEMS || "0", 10) || 0;
const START_INDEX = Number.parseInt(process.env.START_INDEX || "0", 10) || 0;
const ITEM_TIMEOUT_MS = Number.parseInt(process.env.ITEM_TIMEOUT_MS || "240000", 10) || 240000;
const PROJECT_LOAD_RETRIES = Number.parseInt(process.env.PROJECT_LOAD_RETRIES || "3", 10) || 3;
const ITEM_RETRIES = Number.parseInt(process.env.ITEM_RETRIES || "2", 10) || 2;
const PROJECT_TITLE_RE = /C&C .*Miniature Figure Generator/i;
const NEW_CHAT_COMPOSER_RE = /New chat in C&C/i;
const GENERIC_COMPOSER_RE = /Chat with ChatGPT|Ask anything/i;
const SEND_BUTTON_RE = /Send prompt/i;
const DOWNLOAD_BUTTON_RE = /Download this image/i;
const CHOICE_BUTTON_RE = /Image 1 is better|Image 2 is better/i;
const CHOICE_PROMPT_RE = /Which image do you like more\?/i;
const RETRYABLE_ERROR_RE = /conversation not found|project page did not load correctly|storage state is no longer authenticated|too many requests|rate limit|unable to generate|something went wrong/i;

fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });
fs.mkdirSync(ERROR_DIR, { recursive: true });

function loadQueue() {
  const payload = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  const items = Array.isArray(payload.items) ? payload.items : [];
  const pending = items.filter((item) => !fs.existsSync(path.join(ASSET_DIR, `${item.slug}.png`)));
  if (!START_INDEX) return pending;
  return pending.slice(START_INDEX);
}

function logLine(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(LOG_PATH, line);
  process.stdout.write(line);
}

function writeStatus(status) {
  fs.writeFileSync(STATUS_PATH, JSON.stringify({
    updatedAt: new Date().toISOString(),
    ...status,
  }, null, 2));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bodyText(page) {
  return page.locator("body").innerText().catch(() => "");
}

async function clickFirstVisible(locator) {
  if (!(await locator.count())) {
    return false;
  }
  const target = locator.first();
  if (!(await target.isVisible().catch(() => false))) {
    return false;
  }
  await target.click().catch(() => {});
  return true;
}

async function ensureProjectShell(page) {
  for (let attempt = 1; attempt <= PROJECT_LOAD_RETRIES; attempt += 1) {
    await page.goto(PROJECT_URL, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
    await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
    await sleep(3000);

    const authUrl = page.url();
    if (/auth\/login/i.test(authUrl)) {
      throw new Error("Storage state is no longer authenticated.");
    }

    const removeThinking = page.getByRole("button", { name: /Extended thinking, click to remove/i });
    await clickFirstVisible(removeThinking);

    const composers = [
      page.getByRole("textbox", { name: NEW_CHAT_COMPOSER_RE }).first(),
      page.getByRole("textbox", { name: GENERIC_COMPOSER_RE }).first(),
    ];
    for (const composer of composers) {
      if (await composer.count()) {
        await composer.waitFor({ timeout: 30000 }).catch(() => {});
      }
    }

    const pageText = await bodyText(page);
    const composer = (await composers[0].count()) ? composers[0] : composers[1];
    const hasComposer = composer && await composer.count();
    const hasProjectText = PROJECT_TITLE_RE.test(pageText) || /Open C&C .*Miniature Figure Generator project/i.test(pageText);

    if (hasComposer && hasProjectText) {
      return composer;
    }

    const projectsButton = page.getByRole("button", { name: /^Projects$/i }).first();
    await clickFirstVisible(projectsButton);

    const projectLink = page.getByRole("link", { name: /C&C .*Miniature Figure Generator/i }).first();
    if (await projectLink.count() && await projectLink.isVisible().catch(() => false)) {
      await projectLink.click().catch(() => {});
      await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
      await sleep(2000);
    }

    const openProjectLink = page.getByRole("link", { name: /Open C&C .*project/i }).first();
    if (await openProjectLink.count() && await openProjectLink.isVisible().catch(() => false)) {
      await openProjectLink.click().catch(() => {});
      await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
      await sleep(2000);
    }

    const retryText = await bodyText(page);
    if (RETRYABLE_PROJECT_FAILURE(retryText)) {
      await sleep(2000 * attempt);
      continue;
    }

    if ((await composers[0].count()) || (await composers[1].count())) {
      const activeComposer = (await composers[0].count()) ? composers[0] : composers[1];
      await activeComposer.waitFor({ timeout: 15000 }).catch(() => {});
      if (PROJECT_TITLE_RE.test(retryText) || /Open C&C .*Miniature Figure Generator project/i.test(retryText)) {
        return activeComposer;
      }
    }

    await sleep(2000 * attempt);
  }

  throw new Error(`Project page did not load correctly. Current URL: ${page.url()}`);
}

function RETRYABLE_PROJECT_FAILURE(text) {
  return /conversation not found|project page did not load correctly|you don't have access to this project/i.test(text);
}

async function submitPrompt(page, composer, prompt) {
  await composer.fill(prompt);
  const sendButton = page.getByRole("button", { name: SEND_BUTTON_RE }).first();
  if (await sendButton.count() && await sendButton.isVisible().catch(() => false)) {
    await sendButton.click().catch(async () => {
      await composer.press("Enter").catch(() => {});
    });
    return;
  }

  await composer.press("Enter").catch(() => {});
}

async function waitForDownloadableImage(page, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const downloadButton = page.getByRole("button", { name: DOWNLOAD_BUTTON_RE }).last();
    if (await downloadButton.count()) {
      return downloadButton;
    }

    const choiceButton = page.getByRole("button", { name: CHOICE_BUTTON_RE }).first();
    if (await choiceButton.count() && await choiceButton.isVisible().catch(() => false)) {
      await choiceButton.click().catch(() => {});
      await sleep(1000);
      continue;
    }

    const choicePrompt = page.getByText(CHOICE_PROMPT_RE).first();
    if (await choicePrompt.count() && await choicePrompt.isVisible().catch(() => false)) {
      const preferred = page.getByRole("button", { name: /Image 1 is better/i }).first();
      if (await preferred.count() && await preferred.isVisible().catch(() => false)) {
        await preferred.click().catch(() => {});
        await sleep(1000);
        continue;
      }
    }

    const text = await bodyText(page);
    if (/you don't have access to this project/i.test(text)) {
      throw new Error("Project access was lost during generation.");
    }
    if (RETRYABLE_ERROR_RE.test(text)) {
      throw new Error(`Generation failed or was rate-limited: ${text.slice(0, 600)}`);
    }

    await page.waitForTimeout(1000);
  }

  throw new Error(`Timed out waiting for image after ${timeoutMs}ms.`);
}

async function generateOne(page, item) {
  const outPath = path.join(ASSET_DIR, `${item.slug}.png`);
  let lastError = null;

  for (let attempt = 1; attempt <= ITEM_RETRIES; attempt += 1) {
    try {
      const composer = await ensureProjectShell(page);
      await submitPrompt(page, composer, item.prompt);

      const downloadButton = await waitForDownloadableImage(page, ITEM_TIMEOUT_MS);
      const downloadPromise = page.waitForEvent("download", { timeout: 30000 });
      await downloadButton.click();
      const download = await downloadPromise;
      await download.saveAs(outPath);
      return {
        path: outPath,
        suggestedFilename: download.suggestedFilename(),
        attempt,
      };
    } catch (error) {
      lastError = error;
      const errorText = String(error && error.stack ? error.stack : error);
      if (!RETRYABLE_ERROR_RE.test(errorText) || attempt >= ITEM_RETRIES) {
        throw error;
      }
      await page.waitForTimeout(3000 * attempt).catch(() => {});
    }
  }

  throw lastError || new Error(`Unable to generate ${item.slug}.`);
}

async function main() {
  if (!fs.existsSync(STORAGE_STATE_PATH)) {
    throw new Error(`Missing storage state: ${STORAGE_STATE_PATH}`);
  }

  const queue = loadQueue();
  const items = MAX_ITEMS > 0 ? queue.slice(0, MAX_ITEMS) : queue;

  writeStatus({
    state: "starting",
    totalPending: queue.length,
    selectedCount: items.length,
    completed: 0,
    failed: 0,
    current: null,
    errors: [],
  });

  logLine(`Launching browser. headless=${HEADLESS}. Items selected=${items.length}.`);

  const browser = await chromium.launch({
    headless: HEADLESS,
  });

  const context = await browser.newContext({
    acceptDownloads: true,
    storageState: STORAGE_STATE_PATH,
    viewport: { width: 1600, height: 1200 },
  });
  const page = await context.newPage();

  let completed = 0;
  let failed = 0;
  const errors = [];

  try {
    for (const item of items) {
      writeStatus({
        state: "running",
        totalPending: queue.length,
        selectedCount: items.length,
        completed,
        failed,
        current: { slug: item.slug, name: item.name },
        errors,
      });
      logLine(`Generating ${item.slug}`);

      try {
        const result = await generateOne(page, item);
        completed += 1;
        logLine(`Saved ${item.slug} -> ${result.path}`);
      } catch (error) {
        failed += 1;
        const screenshotPath = path.join(ERROR_DIR, `${item.slug}-error.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
        const entry = {
          slug: item.slug,
          name: item.name,
          message: String(error),
          screenshotPath,
        };
        errors.push(entry);
        logLine(`Failed ${item.slug}: ${entry.message}`);
      }
    }
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }

  writeStatus({
    state: "finished",
    totalPending: queue.length,
    selectedCount: items.length,
    completed,
    failed,
    current: null,
    errors,
  });

  logLine(`Finished batch. completed=${completed}, failed=${failed}`);
}

main().catch((error) => {
  logLine(`Fatal error: ${String(error && error.stack ? error.stack : error)}`);
  writeStatus({
    state: "fatal",
    totalPending: 0,
    selectedCount: 0,
    completed: 0,
    failed: 0,
    current: null,
    errors: [{ message: String(error) }],
  });
  process.exitCode = 1;
});
