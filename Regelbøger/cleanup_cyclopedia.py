# -*- coding: utf-8 -*-
"""Én gangs-oprydning af RulesCyclopedia-Basic.md: fjern picture-placeholders og vandmærker."""
import re
import pathlib
import sys

def main():
    script_dir = pathlib.Path(__file__).resolve().parent
    md_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else script_dir / "RulesCyclopedia-Basic.md"
    if not md_path.is_file():
        print(f"Fil ikke fundet: {md_path}", file=__import__("sys").stderr)
        return 1
    text = md_path.read_text(encoding="utf-8")
    # Fjern linjer: **==> picture [N x N] intentionally omitted <==**
    text = re.sub(r'(?m)^\*\*==> picture \[\d+ x \d+\] intentionally omitted <==\*\*\r?\n', '', text)
    # Fjern **----- Start/End of picture text -----**<br>
    text = re.sub(r'(?m)^\*\*----- (Start|End) of picture text -----\*\*<br>\r?\n', '', text)
    md_path.write_text(text, encoding="utf-8")
    print("Oprydning færdig.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
