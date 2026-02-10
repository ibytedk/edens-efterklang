@echo off
chcp 65001 >nul
cd /d "%~dp0"
pip install -r requirements-pdf.txt -q 2>nul
python pdf_to_markdown.py "RulesCyclopedia-Basic.pdf"
pause
