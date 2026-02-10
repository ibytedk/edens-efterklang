# PDF til Markdown (Rules Cyclopedia m.m.)

Så AI og redaktører kan læse reglerne uden at åbne PDF'en.

## Hurtig start

1. **Dobbeltklik** på `kør_pdf_til_markdown.bat` i denne mappe (installerer afhængigheder og kører ekstraktion).
2. Eller i en terminal (fra projektroden eller denne mappe):
   ```bash
   pip install -r requirements-pdf.txt
   python pdf_to_markdown.py RulesCyclopedia-Basic.pdf
   ```
3. Output: `RulesCyclopedia-Basic.md` i samme mappe.

## Filer

- **pdf_to_markdown.py** – Ekstraherer tekst fra PDF til Markdown (bruger pymupdf4llm, evt. med pymupdf_layout for bedre layout/tabeller).
- **requirements-pdf.txt** – `pymupdf`, `pymupdf4llm[layout]` (layout-pakken giver bedre sideanalyse og tabelgenkendelse).

OCR er slået fra i scriptet (ingen Tesseract-advarsel). For scannede PDF’er: installér Tesseract + sprogdata og sæt `use_ocr=True` i `pdf_to_markdown.py` hvis du vil bruge OCR.
- **kør_pdf_til_markdown.bat** – Kør scriptet fra Windows (dobbeltklik eller fra cmd i denne mappe).

## Andre PDF'er

```bash
python pdf_to_markdown.py "sti\til\anden.pdf"
```

Output bliver `anden.md` samme sted som PDF'en.
