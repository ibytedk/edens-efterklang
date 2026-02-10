# Parse Drive search JSON and output id,name for docs that match Edens Efterklang known names
import json
import sys

# Known .gdoc base names (without .gdoc) - from workspace
KNOWN_NAMES = {
    "Skabelsesberetning og baggrund for Edens Efterklang",
    "Velkommen til Edens Efterklang og Dalhulby",
    "Arkivet for Kongeriget Thornmark",
    "Spillerkompendium",
    "Guide for tilfangetagelse og ikke-dødelig kamp",
    "Dungeon Master Tips",
    "Dungeon Master Noter om Edens Efterklang Kampagnen",
    "DM Sider",
    "Den Kosmiske Balance — Dunkleriets Sande Natur",
    "Årstal og tidsregning i Edens Efterklang",
    "Vejrsystem for Lauenmark Len",
    "Vejrsystem for Dalhul Len",
    "Encounter Chance Dalhulborg",
    "Dalhulborg i Østerdal Herred",
    "Dalhulborg – Lokalhistorie, Krige, Helte og Myter",
    "Eiriksfæste",
    "Grevskov Slot",
    "Forårsjævndøgnsfesten i Dalhulby – Session 1",
    "Session Logs",
    "Lensbaron Eiriks Sommerhus - Niveau 1",
    "Lensbaron Eiriks Sommerhus - Niveau 2",
    "Niveau 3  Det Øverste Tempel",
    "Aske over Dalhulby",
    "ad&d-2nd-players_handbook (1)",
    "ad&d-2nd-players_handbook",
    "BECMI  Bard (Optional Class)",
    "Combat Sequence Checklist",
    "The Barbarian - Unchained Fury of the Wilds",
    "BECMI Custom Class Creation Framework",
    "BECMI Alignment Personality Traits List",
    "DMR2_Creature_Catalog_(Basic)",
}

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else None
    if not path:
        print("Usage: parse_drive_json.py <path-to-json.txt>", file=sys.stderr)
        sys.exit(1)
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    files = data.get("data", {}).get("files") or []
    for f in files:
        name = f.get("name", "")
        doc_id = f.get("id", "")
        if name in KNOWN_NAMES or any(k in name for k in ("Edens", "Dalhul", "Thornmark", "Efterklang", "Eirik", "Session", "BECMI", "Barbarian", "Gileath", "Kosmiske", "Skabelsesberetning", "Velkommen", "Arkivet", "Spillerkompendium", "Guide for tilfangetagelse", "DM ", "Dungeon Master", "Årstal", "Vejrsystem", "Encounter Chance", "Lokalhistorie", "Eiriksfæste", "Grevskov", "Alle NPC", "Forårsjævndøgn", "Sommerhus", "Niveau 3", "Aske over", "Combat Sequence", "Creature_Catalog", "Alignment Personality", "Custom Class", "Bard", "players_handbook")):
            print(doc_id, name, sep="\t")

if __name__ == "__main__":
    main()
