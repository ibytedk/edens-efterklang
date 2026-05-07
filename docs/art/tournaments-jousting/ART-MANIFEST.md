# Tournament Art Manifest

Asset set for `docs/becmi-tournaments-and-jousting-sourcebook.md`.

## Provenance

- Current placed art is in `ai-clean-print-final/`.
- Source generation: ChatGPT/OpenAI image model, prompted during local production on 2026-04-27.
- Processing: copied into this project, resized/cropped with ImageMagick, locally denoised/smoothed for cleaner print reproduction, and tagged at 300 dpi.
- The original generated files remain in Codex' generated-images cache; this project keeps copied working assets only.
- Earlier AI art remains in `ai-final/`, `ai-1980s-final/`, and `ai-clean-final/`; legacy procedural placeholder art remains in the parent folder and can be used as a non-AI fallback if needed.
- No external stock art is included in the final asset set.
- Final publisher must use the relevant DriveThruRPG creation-method declaration for AI-generated art.
- Style direction: classic early-1980s fantasy RPG boxed-set illustration, hand-drawn ink linework, gouache/watercolor color, bright heroic tournament tone. Prompts explicitly avoided imitating any named artist.

## Output Specs

| File | Intended Use | Pixel Size | Print Use |
| --- | --- | --- | --- |
| `ai-clean-print-final/cover-front-art-clean-print-6x9-bleed-300dpi.png` | Front cover art base | 1875 x 2775 | 6.25" x 9.25" at 300 dpi, includes 0.125" bleed |
| `ai-clean-print-final/chapter-01-using-this-book-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-02-tournament-fundamentals-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-03-footman-melee-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-04-mounted-melees-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-05-jousting-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-06-formats-prizes-honors-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-07-hosting-a-tournament-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-08-scenarios-and-themes-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/chapter-09-referee-appendices-clean-print.png` | Chapter opener | 1800 x 900 | 6" x 3" at 300 dpi |
| `ai-clean-print-final/contact-sheet-clean-print.png` | Internal preview only | variable | Do not place in final book |

## Placement

The images are already inserted into the Markdown source with relative paths:

- Cover image after the compatibility notice.
- One thematic plate after each main `##` chapter heading.

## Cover Notes

The cover image is art only. It intentionally leaves a quiet title-safe field in the upper portion for final typography in layout software. Do not rely on the PNG as a finished DriveThruRPG cover without adding:

- title
- subtitle
- publisher mark
- author/editor credit
- print-safe trim/bleed verification

## Optional Replacement Workflow

DriveThruRPG currently requires the product to use the `Contains AI-Generated Content` creation-method filter when generative-AI art is included.
