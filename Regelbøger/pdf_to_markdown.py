# -*- coding: utf-8 -*-
"""
Ekstraherer tekst fra RulesCyclopedia-Basic.pdf til Markdown,
så AI og redaktører kan læse reglerne uden at åbne PDF'en.

Kør: python pdf_to_markdown.py [sti_til_pdf]
Default input: RulesCyclopedia-Basic.pdf (samme mappe som scriptet)
Output: <filnavn_uden_ext>.md
"""
import sys
import pathlib

def main():
    script_dir = pathlib.Path(__file__).resolve().parent
    if len(sys.argv) >= 2:
        pdf_path = pathlib.Path(sys.argv[1])
    else:
        pdf_path = script_dir / "RulesCyclopedia-Basic.pdf"

    if not pdf_path.is_file():
        print(f"Fejl: Fil ikke fundet: {pdf_path}", file=sys.stderr)
        sys.exit(1)

    out_path = pdf_path.with_suffix(".md")

    # Aktiver pymupdf_layout først (bedre side-layout, tabeller, læserækkefølge)
    try:
        import pymupdf.layout
        pymupdf.layout.activate()
    except ImportError:
        pass  # kør uden layout-pakke

    # Forsøg markdown via pymupdf4llm (bedre tabeller og struktur)
    # use_ocr=False: undgår Tesseract-krav og advarsel når sprogdata mangler
    try:
        import pymupdf4llm
        md_text = pymupdf4llm.to_markdown(str(pdf_path), use_ocr=False)
    except ImportError:
        md_text = None

    # Fallback: ren tekst via pymupdf med læserækkefølge
    if md_text is None:
        try:
            import pymupdf
            with pymupdf.open(str(pdf_path)) as doc:
                parts = []
                for i, page in enumerate(doc):
                    # sort=True: top-left til bottom-right for naturlig rækkefølge
                    text = page.get_text("text", sort=True)
                    if text.strip():
                        parts.append(f"## Side {i + 1}\n\n{text}")
                md_text = "\n\n---\n\n".join(parts) if parts else ""
        except ImportError:
            print("Fejl: Installer pymupdf. Kør: pip install -r requirements-pdf.txt", file=sys.stderr)
            sys.exit(1)

    out_path.write_bytes(md_text.encode("utf-8"))
    print(f"Skrevet: {out_path} ({len(md_text)} tegn)")

if __name__ == "__main__":
    main()
