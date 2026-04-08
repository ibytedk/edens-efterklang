from __future__ import annotations

import json
import os
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import date
from pathlib import Path

import fitz


SCRIPT_DIR = Path(__file__).resolve().parent
DATA_PATH = SCRIPT_DIR / "data.js"
DETAILS_PATH = SCRIPT_DIR / "monster-details.js"

PDF_FILES = {
    "Rules Cyclopedia": "RulesCyclopedia-Basic.pdf",
    "Creature Catalog": "DMR2_Creature_Catalog_(Basic).pdf",
}

SOURCE_STATUS = {
    "Rules Cyclopedia": "rc-pdf",
    "Creature Catalog": "cc-pdf",
}

GROUPED_VARIANT_BASES = {
    "bat",
    "bear",
    "beetle",
    "crocodile",
    "rat",
    "snake",
    "whale",
}

SPECIAL_START_PATTERNS = {
    "Goblin": [
        "Goblins are a humanoid race",
    ],
    "Hydra": [
        "A hydra is a large creature",
    ],
    "Treant": [
        "A treant is an 18' tall",
    ],
    "Thunderhead": [
        "A thunderhead is",
    ],
    "Kara-Kara": [
        "Kara-kara inhabit",
    ],
    "Tortle": [
        "Tortles are turtle-like",
    ],
    "Ape, White/Snow": [
        "Ape, White",
        "Ape, Snow",
        "White Ape:",
        "Snow Ape:",
    ],
    "Fish, Giant (Cat/Pir/Rock/Stur)": [
        'These monsters are just three typical examples of the category of "giant fish"',
        "These monsters are just three typical examples of the category of giant fish",
    ],
    "Lizard, Giant (var)": [
        "Monster Type: Giant Animal (Common). Gecko:",
        "Gecko: A gecko is",
    ],
    "Horse (various)": [
        "Riding Horse:",
        "Draft Horse:",
        "War Horse:",
    ],
    "Lycanthrope (5 typer)": [
        "Werewolf:",
        "Wererat:",
        "Werebear:",
        "Wereboar:",
        "Weretiger:",
    ],
    "Living Statue (var)": [
        "Wood Living Statue:",
        "Crystal Living Statue:",
        "Rock Living Statue:",
        "Iron Living Statue:",
    ],
    "Salamander (fire)": [
        "Fire Salamander:",
        "Salamanders, Flame",
        "Flame Salamander:",
    ],
    "Salamander (frost)": [
        "Frost Salamander:",
        "Salamanders, Frost",
    ],
    "Golem (Mud/Obsidian)": [
        "Mud Golem:",
        "Obsidian Golem:",
        "Golems are",
    ],
    "Magen (Galvan/Demos/Caldron/Hypnos)": [
        "Magen (Gens magica",
        "Magen {Gens magica",
        "Magen are beings created",
    ],
    "Hutaakan": [
        "The race of Hutaakans",
    ],
}

OCR_REPLACEMENTS = {
    "Tbrtle": "Tortle",
    "TViton": "Triton",
    "I.ocust": "Locust",
    "Beede": "Beetle",
    "Norma.l": "Normal",
    "H ydra.x": "Hydrax",
    "Hydra.x": "Hydrax",
    "T hou!": "Thoul",
    "Oou": "Ooze",
    "Gianr": "Giant",
    "Monsrcr": "Monster",
    "Monscer": "Monster",
    "Monsccr": "Monster",
    "Anacks": "Attacks",
    "Ajignmcm": "Alignment",
    "Alignm ent": "Alignment",
    "Rcgcncrarjng": "Regenerating",
    "Movc": "Move",
    "Savc As": "Save As",
    "Trcasurc": "Treasure",
    "Tcrrain": "Terrain",
    "Diet arc": "Dice are",
    "inAicts": "inflicts",
}

STAT_MARKERS = (
    "Armor Class",
    "Hit Dice",
    "Save As",
    "Treasure Type",
    "XP Value",
    "Intelligence",
    "Alignment",
    "Move:",
    "Attacks:",
    "Damage:",
)


@dataclass
class Block:
    page: int
    index: int
    text: str
    cx: float
    y0: float
    y1: float


def fix_ocr(text: str) -> str:
    for source, target in OCR_REPLACEMENTS.items():
        text = text.replace(source, target)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def normalize(text: str) -> str:
    text = fix_ocr(text)
    text = text.replace("•", "").replace("*", "")
    text = text.lower()
    text = re.sub(r"[^a-z0-9,()/'\- ]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip(" .:-|")
    return text


def singular_display(name: str) -> str:
    return name.split(" (", 1)[0]


def pluralize(noun: str) -> str:
    lower = noun.lower()
    if lower.endswith("fish"):
        return noun
    if lower.endswith("man"):
        return noun[:-3] + "men"
    if lower.endswith("y") and not lower.endswith(("ay", "ey", "oy", "uy")):
        return noun[:-1] + "ies"
    if lower.endswith("s"):
        return noun
    return noun + "s"


def load_monsters() -> list[dict]:
    text = DATA_PATH.read_text(encoding="utf-8")
    payload = text[text.index("[") : text.rindex("]") + 1]
    return json.loads(payload)


def load_existing_details() -> tuple[dict, dict]:
    text = DETAILS_PATH.read_text(encoding="utf-8")
    meta_match = re.search(
        r"window\.BECMI_ENCOUNTER_DETAIL_META = (\{.*?\});",
        text,
        re.S,
    )
    details_match = re.search(
        r"window\.BECMI_ENCOUNTER_DETAILS = (\{.*\});\s*\}\)\(\);?",
        text,
        re.S,
    )
    if not meta_match or not details_match:
        raise RuntimeError("Kunne ikke parse monster-details.js")
    return json.loads(meta_match.group(1)), json.loads(details_match.group(1))


def find_file(filename: str) -> Path:
    for root, _dirs, files in os.walk(SCRIPT_DIR.parent.parent):
        if filename in files:
            return Path(root) / filename
    raise FileNotFoundError(filename)


def load_pdf_blocks(pdf_path: Path) -> list[Block]:
    blocks: list[Block] = []
    doc = fitz.open(pdf_path)
    for page_no, page in enumerate(doc, start=1):
        for index, raw_block in enumerate(page.get_text("blocks", sort=True), start=1):
            x0, y0, x1, y1, text, *_ = raw_block
            cleaned = fix_ocr(text)
            if not cleaned:
                continue
            if "Order #" in cleaned:
                continue
            blocks.append(
                Block(
                    page=page_no,
                    index=index,
                    text=cleaned,
                    cx=(x0 + x1) / 2,
                    y0=y0,
                    y1=y1,
                )
            )
    return blocks


def build_base_groups(monsters: list[dict]) -> dict[str, list[str]]:
    groups: defaultdict[str, list[str]] = defaultdict(list)
    for monster in monsters:
        base = singular_display(monster["name"])
        if "," not in base:
            continue
        head, variant = [part.strip() for part in base.split(",", 1)]
        groups[head.lower()].append(variant)
    return groups


def looks_like_stats(text: str) -> bool:
    if any(marker in text for marker in STAT_MARKERS):
        return True
    letters = sum(char.isalpha() for char in text)
    digits = sum(char.isdigit() for char in text)
    return digits > max(6, letters // 2)


def looks_like_heading_block(text: str) -> bool:
    cleaned = text.strip()
    if len(cleaned) > 42:
        return False
    if ":" in cleaned:
        return False
    if any(char.isdigit() for char in cleaned):
        return False
    return bool(re.match(r"^[A-Z][A-Za-z'/-]+(?: [A-Z][A-Za-z'/-]+){0,3}$", cleaned))


def looks_like_label(text: str) -> bool:
    return bool(re.match(r"^[A-Z][A-Za-z'/-]+(?: [A-Z][A-Za-z'/-]+){0,3}:", text))


def build_profile(monster_name: str, base_groups: dict[str, list[str]]) -> dict:
    base_name = singular_display(monster_name)
    head = base_name.split(",", 1)[0].strip()
    head_key = head.lower()
    is_variant_group = head_key in GROUPED_VARIANT_BASES and "," in base_name

    patterns: list[tuple[int, str]] = []
    for phrase in SPECIAL_START_PATTERNS.get(monster_name, []):
        patterns.append((140, phrase))

    if is_variant_group:
        variant_text = base_name.split(",", 1)[1].strip()
        for variant in [part.strip() for part in variant_text.split("/")]:
            patterns.append((130, f"{variant} {head}:"))
            patterns.append((126, f"{variant} {pluralize(head)}:"))

    plain_name = base_name.replace("/", " ")
    compact_name = base_name.replace(",", "")
    plural_name = pluralize(plain_name)
    patterns.extend(
        [
            (112, f"A {plain_name} is"),
            (112, f"An {plain_name} is"),
            (108, f"{plural_name} are"),
            (104, f"The race of {plural_name}"),
            (96, f"{plain_name}:"),
            (90, f"Monster Type: {plain_name}"),
            (80, compact_name),
        ]
    )

    deduped_patterns: list[tuple[int, str]] = []
    seen: set[str] = set()
    for weight, phrase in patterns:
        key = phrase.lower()
        if not phrase or key in seen:
            continue
        seen.add(key)
        deduped_patterns.append((weight, phrase))

    stop_labels: set[str] = set()
    if is_variant_group:
        own_variants = {part.strip().lower() for part in base_name.split(",", 1)[1].split("/")}
        for variant in base_groups.get(head_key, []):
            for part in [piece.strip() for piece in variant.split("/")]:
                if part.lower() in own_variants:
                    continue
                stop_labels.add(f"{part} {head}:".lower())
                stop_labels.add(f"{part} {pluralize(head)}:".lower())

    return {
        "base_name": base_name,
        "patterns": deduped_patterns,
        "stop_labels": stop_labels,
        "variant_group": is_variant_group,
    }


def find_best_block(blocks: list[Block], profile: dict) -> Block | None:
    for _weight, phrase in profile["patterns"]:
        phrase_lower = phrase.lower()
        candidates: list[tuple[int, int, int, Block]] = []
        for block in blocks:
            text_lower = block.text.lower()
            if phrase_lower not in text_lower:
                continue
            if looks_like_heading_block(block.text):
                continue
            score = 0
            if text_lower.startswith(phrase_lower):
                score += 6
            if "Monster Type" in block.text:
                score += 8
            if not looks_like_stats(block.text):
                score += 3
            else:
                score -= 8
            candidates.append((-score, block.page, block.index, block))
        if candidates:
            candidates.sort()
            return candidates[0][3]
    return None


def normalize_label(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip().lower()


def collect_context_blocks(page_blocks: list[Block], start: Block, profile: dict) -> list[Block]:
    same_page = [block for block in page_blocks if block.page == start.page]
    page_index = same_page.index(start)
    column_tolerance = 110

    selected: list[Block] = [start]

    # Walk backwards in the same column to prepend the nearest Monster Type intro.
    prepend: list[Block] = []
    for index in range(page_index - 1, -1, -1):
        block = same_page[index]
        if abs(block.cx - start.cx) > column_tolerance:
            continue
        if start.y0 - block.y1 > 240:
            break
        if looks_like_heading_block(block.text):
            break
        if looks_like_stats(block.text):
            continue
        if "Monster Type" in block.text:
            prepend.insert(0, block)
            break
        if looks_like_label(block.text):
            break
        prepend.insert(0, block)
    selected = prepend + selected

    last_y = start.y1
    for index in range(page_index + 1, len(same_page)):
        block = same_page[index]
        if abs(block.cx - start.cx) > column_tolerance:
            continue
        if block.y0 - last_y > 150:
            break
        if looks_like_heading_block(block.text):
            break
        lower_text = block.text.lower()
        if "Terrain:" in block.text or "Load:" in block.text or "Barding Multiplier:" in block.text:
            break
        if profile["variant_group"] and normalize_label(block.text) in profile["stop_labels"]:
            break
        if looks_like_label(block.text) and profile["variant_group"]:
            break
        if "Monster Type" in block.text:
            break
        if "Peter Munkholm" in block.text:
            break
        if looks_like_stats(block.text):
            continue
        selected.append(block)
        last_y = block.y1
    return selected


def clean_description(blocks: list[Block]) -> str:
    text = " ".join(block.text for block in blocks)
    text = fix_ocr(text)
    text = text.replace("Monster Type-.", "Monster Type:")
    text = text.replace("Monster Type- ", "Monster Type: ")
    text = re.sub(r"\bMons\w* Type\b", "Monster Type", text, flags=re.I)
    text = re.sub(r"\bTcrrain\b", "Terrain", text, flags=re.I)
    text = re.sub(r"(?<=\w)- (?=\w)", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    monster_type_index = text.find("Monster Type")
    if monster_type_index > 0:
        text = text[monster_type_index:]
    later_monster_type = text.find("Monster Type", 12)
    if later_monster_type > 0:
        text = text[:later_monster_type].rstrip(" .;,-")
    trailing_heading = re.search(
        r"\s+[A-Z][A-Za-z'/-]+[•*]?(?: [A-Z][a-z]+){0,2} \d",
        text[220:],
    )
    if trailing_heading:
        text = text[: 220 + trailing_heading.start()].rstrip(" .;,-")
    text = text.replace("All encounters with creams", "All encounters with treants")
    text = text.strip(" .;,-")
    if text.startswith("Monster Type") and ":" not in text[:15]:
        text = text.replace("Monster Type", "Monster Type:", 1)
    return text


def is_usable_description(text: str) -> bool:
    if len(text) < 60:
        return False
    if "Armor Class" in text or "Hit Dice" in text or "Save As" in text:
        return False
    if "Peter Munkholm" in text or "[[PAGE" in text:
        return False
    letters = sum(char.isalpha() for char in text)
    digits = sum(char.isdigit() for char in text)
    if digits > max(10, letters // 3):
        return False
    return True


def trim_description(text: str, limit: int = 720) -> str:
    if len(text) <= limit:
        return text
    cut = text.rfind(". ", 0, limit)
    if cut > 180:
        return text[: cut + 1].strip()
    return text[:limit].rstrip(" ,;:-") + "..."


def regenerate_descriptions(
    monsters: list[dict],
    details: dict,
    pdf_blocks_by_source: dict[str, list[Block]],
) -> tuple[dict, Counter]:
    grouped_bases = build_base_groups(monsters)
    generated_counts: Counter = Counter()

    for monster in monsters:
        source = monster["source"]
        profile = build_profile(monster["name"], grouped_bases)
        blocks = pdf_blocks_by_source[source]
        start_block = find_best_block(blocks, profile)
        if not start_block:
            continue

        context_blocks = collect_context_blocks(blocks, start_block, profile)
        description = trim_description(clean_description(context_blocks))
        if not is_usable_description(description):
            continue

        key = f"{source}::{monster['name']}"
        entry = details.get(key, {}).copy()
        entry["description"] = description
        entry["detailStatus"] = SOURCE_STATUS[source]
        entry["sourceRef"] = PDF_FILES[source]
        entry["sourcePage"] = start_block.page
        details[key] = entry
        generated_counts[source] += 1

    return details, generated_counts


def write_details(meta: dict, details: dict) -> None:
    payload = (
        "(function(){\n"
        "  window.BECMI_ENCOUNTER_DETAIL_META = "
        + json.dumps(meta, indent=4, ensure_ascii=False)
        + ";\n"
        "  window.BECMI_ENCOUNTER_DETAILS = "
        + json.dumps(details, indent=4, ensure_ascii=False)
        + ";\n"
        "})();\n"
    )
    DETAILS_PATH.write_text(payload, encoding="utf-8")


def main() -> None:
    monsters = load_monsters()
    meta, details = load_existing_details()

    pdf_blocks_by_source = {
        source: load_pdf_blocks(find_file(filename))
        for source, filename in PDF_FILES.items()
    }

    details, generated_counts = regenerate_descriptions(monsters, details, pdf_blocks_by_source)

    source_counter = Counter(key.split("::", 1)[0] for key in details)
    meta["generatedAt"] = date.today().isoformat()
    meta["rcDetailCount"] = source_counter["Rules Cyclopedia"]
    meta["ccDescriptionCount"] = source_counter["Creature Catalog"]
    meta["rcPdfDescriptionCount"] = generated_counts["Rules Cyclopedia"]
    meta["ccPdfDescriptionCount"] = generated_counts["Creature Catalog"]

    write_details(meta, details)

    print(
        "Regenerated monster details:",
        f"RC={generated_counts['Rules Cyclopedia']}",
        f"CC={generated_counts['Creature Catalog']}",
        f"Total={sum(generated_counts.values())}",
    )


if __name__ == "__main__":
    main()
