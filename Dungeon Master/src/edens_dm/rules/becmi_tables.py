from __future__ import annotations

from collections.abc import Iterable

THAC0_TABLES: dict[str, list[tuple[range, int]]] = {
    "fighter": [
        (range(1, 4), 19),
        (range(4, 7), 17),
        (range(7, 10), 15),
        (range(10, 13), 13),
        (range(13, 16), 11),
        (range(16, 19), 9),
        (range(19, 22), 7),
        (range(22, 25), 5),
        (range(25, 28), 3),
        (range(28, 37), 2),
    ],
    "cleric": [
        (range(1, 5), 19),
        (range(5, 9), 17),
        (range(9, 13), 15),
        (range(13, 17), 13),
        (range(17, 21), 11),
        (range(21, 25), 9),
        (range(25, 29), 7),
        (range(29, 33), 5),
        (range(33, 37), 3),
    ],
    "magic-user": [
        (range(1, 6), 19),
        (range(6, 11), 17),
        (range(11, 16), 15),
        (range(16, 21), 13),
        (range(21, 26), 11),
        (range(26, 31), 9),
        (range(31, 37), 7),
    ],
    "thief": [
        (range(1, 5), 19),
        (range(5, 9), 17),
        (range(9, 13), 15),
        (range(13, 17), 13),
        (range(17, 21), 11),
        (range(21, 25), 9),
        (range(25, 29), 7),
        (range(29, 33), 5),
        (range(33, 37), 3),
    ],
    "dwarf": [],
    "elf": [],
    "halfling": [],
    "normal-man": [(range(0, 100), 19)],
    "monster": [(range(0, 100), 19)],
}
THAC0_TABLES["dwarf"] = THAC0_TABLES["fighter"]
THAC0_TABLES["elf"] = THAC0_TABLES["fighter"]
THAC0_TABLES["halfling"] = THAC0_TABLES["fighter"]

SAVE_TABLES: dict[str, list[tuple[range, dict[str, int]]]] = {
    "fighter": [
        (range(1, 4), {"death": 12, "wands": 13, "stone": 14, "breath": 15, "spell": 16}),
        (range(4, 7), {"death": 10, "wands": 11, "stone": 12, "breath": 13, "spell": 14}),
        (range(7, 10), {"death": 8, "wands": 9, "stone": 10, "breath": 11, "spell": 12}),
        (range(10, 13), {"death": 6, "wands": 7, "stone": 8, "breath": 9, "spell": 10}),
        (range(13, 16), {"death": 6, "wands": 6, "stone": 7, "breath": 8, "spell": 9}),
        (range(16, 19), {"death": 5, "wands": 6, "stone": 6, "breath": 7, "spell": 8}),
        (range(19, 22), {"death": 5, "wands": 5, "stone": 6, "breath": 6, "spell": 7}),
        (range(22, 25), {"death": 4, "wands": 5, "stone": 5, "breath": 5, "spell": 6}),
        (range(25, 28), {"death": 4, "wands": 4, "stone": 5, "breath": 4, "spell": 5}),
        (range(28, 31), {"death": 3, "wands": 4, "stone": 4, "breath": 3, "spell": 4}),
        (range(31, 34), {"death": 3, "wands": 3, "stone": 3, "breath": 2, "spell": 3}),
        (range(34, 37), {"death": 2, "wands": 2, "stone": 2, "breath": 2, "spell": 2}),
    ],
    "cleric": [
        (range(1, 5), {"death": 11, "wands": 12, "stone": 14, "breath": 16, "spell": 15}),
        (range(5, 9), {"death": 9, "wands": 10, "stone": 12, "breath": 14, "spell": 12}),
        (range(9, 13), {"death": 6, "wands": 7, "stone": 8, "breath": 10, "spell": 9}),
        (range(13, 17), {"death": 4, "wands": 5, "stone": 6, "breath": 8, "spell": 7}),
        (range(17, 21), {"death": 2, "wands": 3, "stone": 4, "breath": 6, "spell": 5}),
        (range(21, 25), {"death": 2, "wands": 2, "stone": 3, "breath": 4, "spell": 3}),
        (range(25, 37), {"death": 2, "wands": 2, "stone": 2, "breath": 2, "spell": 2}),
    ],
    "magic-user": [
        (range(1, 6), {"death": 13, "wands": 14, "stone": 13, "breath": 16, "spell": 15}),
        (range(6, 11), {"death": 11, "wands": 12, "stone": 11, "breath": 14, "spell": 12}),
        (range(11, 16), {"death": 8, "wands": 9, "stone": 8, "breath": 11, "spell": 8}),
        (range(16, 21), {"death": 6, "wands": 7, "stone": 6, "breath": 9, "spell": 6}),
        (range(21, 26), {"death": 4, "wands": 5, "stone": 4, "breath": 7, "spell": 4}),
        (range(26, 31), {"death": 2, "wands": 3, "stone": 2, "breath": 5, "spell": 2}),
        (range(31, 37), {"death": 2, "wands": 2, "stone": 2, "breath": 4, "spell": 2}),
    ],
    "thief": [
        (range(1, 5), {"death": 13, "wands": 14, "stone": 13, "breath": 16, "spell": 15}),
        (range(5, 9), {"death": 12, "wands": 13, "stone": 11, "breath": 14, "spell": 13}),
        (range(9, 13), {"death": 10, "wands": 11, "stone": 9, "breath": 12, "spell": 10}),
        (range(13, 17), {"death": 8, "wands": 9, "stone": 7, "breath": 10, "spell": 8}),
        (range(17, 21), {"death": 6, "wands": 7, "stone": 5, "breath": 8, "spell": 6}),
        (range(21, 25), {"death": 4, "wands": 5, "stone": 4, "breath": 6, "spell": 4}),
        (range(25, 29), {"death": 3, "wands": 4, "stone": 3, "breath": 5, "spell": 3}),
        (range(29, 33), {"death": 2, "wands": 3, "stone": 2, "breath": 4, "spell": 2}),
        (range(33, 37), {"death": 2, "wands": 2, "stone": 2, "breath": 3, "spell": 2}),
    ],
    "normal-man": [(range(0, 100), {"death": 14, "wands": 15, "stone": 16, "breath": 17, "spell": 17})],
    "monster": [(range(0, 100), {"death": 14, "wands": 15, "stone": 16, "breath": 17, "spell": 17})],
}
SAVE_TABLES["dwarf"] = SAVE_TABLES["fighter"]
SAVE_TABLES["elf"] = SAVE_TABLES["magic-user"]
SAVE_TABLES["halfling"] = SAVE_TABLES["fighter"]

SAVE_CATEGORY_ALIASES = {
    "death": "death",
    "death/poison": "death",
    "poison": "death",
    "wand": "wands",
    "wands": "wands",
    "paralysis": "stone",
    "petrification": "stone",
    "stone": "stone",
    "breath": "breath",
    "dragon breath": "breath",
    "spell": "spell",
    "spells": "spell",
}

SAVE_AS_ALIASES = {
    "f": "fighter",
    "c": "cleric",
    "mu": "magic-user",
    "m": "magic-user",
    "t": "thief",
    "d": "dwarf",
    "e": "elf",
    "h": "halfling",
}

WEAPON_MASTERY_ATTACK_BONUS = {
    "Unskilled": -1,
    "Basic": 0,
    "Skilled": 2,
    "Expert": 4,
    "Master": 6,
    "Grand Master": 8,
}


def _lookup(table: Iterable[tuple[range, int | dict[str, int]]], level: int) -> int | dict[str, int]:
    for span, value in table:
        if level in span:
            return value
    raise ValueError(f"Ingen tabelværdi for level {level}")


def normalise_class_name(value: str) -> str:
    lowered = value.strip().lower().replace("_", "-")
    if lowered in {"magicuser", "magic user", "mu"}:
        return "magic-user"
    if lowered in {"normal man", "normalman"}:
        return "normal-man"
    return lowered


def lookup_thac0(class_name: str, level: int) -> int:
    normalized = normalise_class_name(class_name)
    if normalized not in THAC0_TABLES:
        normalized = "monster"
    return int(_lookup(THAC0_TABLES[normalized], level))


def lookup_saves(class_name: str, level: int) -> dict[str, int]:
    normalized = normalise_class_name(class_name)
    if normalized not in SAVE_TABLES:
        normalized = "monster"
    return dict(_lookup(SAVE_TABLES[normalized], level))


def parse_save_as(value: str | None) -> tuple[str, int] | None:
    if not value:
        return None
    cleaned = value.strip().replace(" ", "").replace(".", "").lower()
    if cleaned in {"normalman", "normal"}:
        return ("normal-man", 0)
    if cleaned[:2] == "mu":
        prefix, number = "mu", cleaned[2:]
    else:
        prefix, number = cleaned[:1], cleaned[1:]
    if prefix not in SAVE_AS_ALIASES or not number.isdigit():
        return None
    return (SAVE_AS_ALIASES[prefix], int(number))


def resolve_saving_throw_target(class_name: str, level: int, category: str, explicit: dict[str, int] | None = None) -> int:
    normalized_category = SAVE_CATEGORY_ALIASES.get(category.strip().lower(), category.strip().lower())
    if explicit and normalized_category in explicit:
        return explicit[normalized_category]
    return lookup_saves(class_name, level)[normalized_category]
