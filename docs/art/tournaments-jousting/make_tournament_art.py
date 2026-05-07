from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


OUT = Path(__file__).resolve().parent
SEED = 1465

INK = (35, 27, 22)
INK2 = (70, 54, 42)
RED = (135, 32, 28)
GOLD = (181, 132, 54)
BLUE = (47, 68, 91)
GREEN = (64, 87, 58)
PARCHMENT = (226, 207, 165)
PARCHMENT_DARK = (180, 144, 95)


def save(img: Image.Image, name: str) -> None:
    img.save(OUT / name, dpi=(300, 300), optimize=True)


def parchment(w: int, h: int) -> Image.Image:
    rng = random.Random(SEED + w + h)
    img = Image.new("RGB", (w, h), PARCHMENT)
    px = img.load()
    for y in range(h):
        for x in range(w):
            n = rng.randint(-13, 13)
            edge = int(18 * max(abs(x - w / 2) / (w / 2), abs(y - h / 2) / (h / 2)))
            r = max(0, min(255, PARCHMENT[0] + n - edge))
            g = max(0, min(255, PARCHMENT[1] + n - edge))
            b = max(0, min(255, PARCHMENT[2] + n - edge))
            px[x, y] = (r, g, b)
    return img.filter(ImageFilter.GaussianBlur(0.55))


def draw_frame(draw: ImageDraw.ImageDraw, w: int, h: int, m: int, accent: tuple[int, int, int] = RED) -> None:
    draw.rectangle([m, m, w - m, h - m], outline=INK, width=max(5, w // 260))
    draw.rectangle([m + 22, m + 22, w - m - 22, h - m - 22], outline=accent, width=max(3, w // 420))
    step = max(52, w // 32)
    for x in range(m + step, w - m, step):
        draw.line([(x, m + 10), (x + step // 3, m + 22), (x + 2 * step // 3, m + 10)], fill=GOLD, width=max(2, w // 700))
        draw.line([(x, h - m - 10), (x + step // 3, h - m - 22), (x + 2 * step // 3, h - m - 10)], fill=GOLD, width=max(2, w // 700))
    for y in range(m + step, h - m, step):
        draw.line([(m + 10, y), (m + 22, y + step // 3), (m + 10, y + 2 * step // 3)], fill=GOLD, width=max(2, w // 700))
        draw.line([(w - m - 10, y), (w - m - 22, y + step // 3), (w - m - 10, y + 2 * step // 3)], fill=GOLD, width=max(2, w // 700))


def poly(draw: ImageDraw.ImageDraw, pts, fill=INK, outline=None, width=1) -> None:
    draw.polygon([(int(x), int(y)) for x, y in pts], fill=fill, outline=outline)


def bbox(a: tuple[int, int], b: tuple[int, int]) -> list[int]:
    return [min(a[0], b[0]), min(a[1], b[1]), max(a[0], b[0]), max(a[1], b[1])]


def draw_banner(draw: ImageDraw.ImageDraw, x: int, y: int, s: float, color=RED, flip: int = 1) -> None:
    draw.line([(x, y), (x, y + int(210 * s))], fill=INK, width=max(2, int(8 * s)))
    pts = [
        (x, y + int(20 * s)),
        (x + flip * int(128 * s), y + int(28 * s)),
        (x + flip * int(112 * s), y + int(80 * s)),
        (x + flip * int(136 * s), y + int(120 * s)),
        (x, y + int(106 * s)),
    ]
    poly(draw, pts, color, INK, max(1, int(3 * s)))
    draw.line([(x + flip * int(20 * s), y + int(48 * s)), (x + flip * int(95 * s), y + int(55 * s))], fill=GOLD, width=max(1, int(5 * s)))


def draw_rail(draw: ImageDraw.ImageDraw, x0: int, y: int, x1: int, s: float) -> None:
    draw.line([(x0, y), (x1, y)], fill=INK2, width=max(4, int(12 * s)))
    draw.line([(x0, y + int(24 * s)), (x1, y + int(24 * s))], fill=INK2, width=max(3, int(8 * s)))
    for x in range(x0, x1, max(48, int(90 * s))):
        draw.line([(x, y - int(30 * s)), (x + int(15 * s), y + int(60 * s))], fill=INK2, width=max(3, int(8 * s)))


def draw_crowd(draw: ImageDraw.ImageDraw, x0: int, y0: int, x1: int, s: float) -> None:
    colors = [INK2, RED, BLUE, GREEN, GOLD]
    step = max(22, int(38 * s))
    for i, x in enumerate(range(x0, x1, step)):
        c = colors[i % len(colors)]
        draw.ellipse([x, y0 + (i % 3) * int(5 * s), x + int(15 * s), y0 + int(18 * s)], fill=c)
        draw.rectangle([x + int(3 * s), y0 + int(17 * s), x + int(12 * s), y0 + int(45 * s)], fill=c)


def draw_tent(draw: ImageDraw.ImageDraw, x: int, y: int, s: float, color=RED) -> None:
    poly(draw, [(x, y + 120 * s), (x + 95 * s, y), (x + 190 * s, y + 120 * s)], fill=(228, 215, 181), outline=INK, width=max(1, int(4 * s)))
    poly(draw, [(x + 22 * s, y + 120 * s), (x + 95 * s, y + 18 * s), (x + 168 * s, y + 120 * s)], fill=color)
    draw.rectangle([x + int(34 * s), y + int(120 * s), x + int(156 * s), y + int(198 * s)], fill=(222, 201, 158), outline=INK, width=max(1, int(4 * s)))
    draw.line([(x + int(95 * s), y), (x + int(95 * s), y - int(58 * s))], fill=INK, width=max(1, int(5 * s)))
    draw_banner(draw, x + int(95 * s), y - int(60 * s), s * 0.45, color, 1)


def draw_horse(draw: ImageDraw.ImageDraw, cx: int, cy: int, s: float, direction: int = 1, caparison=RED) -> None:
    def tx(x, y):
        return (cx + direction * int(x * s), cy + int(y * s))

    # body and cloth
    draw.ellipse([cx - int(145 * s), cy - int(55 * s), cx + int(150 * s), cy + int(70 * s)], fill=INK, outline=None)
    poly(draw, [tx(-122, -42), tx(132, -42), tx(154, 48), tx(-140, 55)], fill=caparison, outline=INK, width=max(2, int(4 * s)))
    # neck, head, tail
    poly(draw, [tx(92, -52), tx(146, -110), tx(176, -96), tx(143, -28)], fill=INK)
    draw.ellipse([tx(145, -126)[0] - int(24 * s), tx(145, -126)[1] - int(18 * s), tx(145, -126)[0] + int(46 * s), tx(145, -126)[1] + int(23 * s)], fill=INK)
    poly(draw, [tx(-142, -22), tx(-202, -62), tx(-174, -14)], fill=INK)
    # legs
    legs = [(-92, 42, -130, 170), (-42, 50, -24, 172), (52, 50, 88, 170), (105, 38, 136, 166)]
    for x0, y0, x1, y1 in legs:
        draw.line([tx(x0, y0), tx(x1, y1)], fill=INK, width=max(7, int(18 * s)))
        draw.line([tx(x1, y1), tx(x1 + 35, y1 + 12)], fill=INK, width=max(5, int(12 * s)))
    # decoration
    draw.line([tx(-90, -20), tx(105, -20)], fill=GOLD, width=max(2, int(7 * s)))
    draw.ellipse([tx(-12, -8)[0] - int(28 * s), tx(-12, -8)[1] - int(28 * s), tx(-12, -8)[0] + int(28 * s), tx(-12, -8)[1] + int(28 * s)], outline=GOLD, width=max(2, int(6 * s)))


def draw_knight(draw: ImageDraw.ImageDraw, cx: int, cy: int, s: float, direction: int = 1, shield=BLUE, lance=True) -> None:
    def tx(x, y):
        return (cx + direction * int(x * s), cy + int(y * s))

    draw.ellipse([tx(0, -185)[0] - int(28 * s), tx(0, -185)[1] - int(34 * s), tx(0, -185)[0] + int(28 * s), tx(0, -185)[1] + int(28 * s)], fill=INK)
    draw.rectangle(bbox(tx(-20, -170), tx(20, -108)), fill=INK)
    poly(draw, [tx(-38, -126), tx(36, -126), tx(54, -40), tx(-46, -38)], fill=(92, 89, 82), outline=INK, width=max(1, int(3 * s)))
    # shield
    pts = [tx(direction * 0, 0)]
    sx, sy = tx(50, -95)
    shield_pts = [(sx - int(28 * s), sy - int(38 * s)), (sx + int(35 * s), sy - int(32 * s)), (sx + int(20 * s), sy + int(50 * s)), (sx - int(25 * s), sy + int(44 * s))]
    draw.polygon(shield_pts, fill=shield, outline=INK)
    draw.line([tx(28, -96), tx(100, -55)], fill=INK, width=max(3, int(8 * s)))
    if lance:
        start = tx(30, -142)
        end = tx(430, -198)
        draw.line([start, end], fill=INK, width=max(3, int(8 * s)))
        draw.line([tx(260, -172), tx(308, -138)], fill=RED, width=max(2, int(6 * s)))
        draw.line([tx(308, -178), tx(356, -144)], fill=GOLD, width=max(2, int(6 * s)))


def draw_joust_scene(img: Image.Image, cover: bool = False) -> None:
    d = ImageDraw.Draw(img)
    w, h = img.size
    m = int(min(w, h) * 0.055)
    draw_frame(d, w, h, m, RED)
    ground = int(h * (0.70 if cover else 0.67))
    d.rectangle([m + 24, ground, w - m - 24, h - m - 45], fill=(196, 163, 105))
    draw_rail(d, m + int(w * 0.08), ground - int(h * 0.035), w - m - int(w * 0.08), w / 1900)
    draw_crowd(d, m + int(w * 0.07), int(h * 0.26), w - m - int(w * 0.07), w / 1900)
    for i, x in enumerate([int(w * 0.18), int(w * 0.68)]):
        draw_tent(d, x, int(h * 0.33), w / 2500, [RED, BLUE][i])
    s = w / 1900
    draw_horse(d, int(w * 0.34), ground - int(28 * s), s, 1, RED)
    draw_knight(d, int(w * 0.34), ground - int(28 * s), s, 1, BLUE, True)
    draw_horse(d, int(w * 0.66), ground - int(28 * s), s, -1, BLUE)
    draw_knight(d, int(w * 0.66), ground - int(28 * s), s, -1, RED, True)
    # broken splinters in center
    for a in [-38, -17, 12, 34]:
        x = int(w * 0.50 + a * s)
        y = int(ground - 215 * s + abs(a) * 0.8)
        d.line([(x, y), (x + int((a * 0.7) * s), y - int(80 * s))], fill=INK, width=max(2, int(5 * s)))
    if cover:
        # title-safe quiet sky field for layout.
        d.rectangle([m + 45, m + 45, w - m - 45, int(h * 0.22)], fill=(224, 206, 168), outline=GOLD, width=max(4, w // 380))
        for x in range(m + 100, w - m - 100, int(w * 0.11)):
            draw_banner(d, x, int(h * 0.235), w / 3400, [RED, BLUE, GREEN, GOLD][(x // 100) % 4], 1)


def draw_icon_plate(name: str, motif: str, accent=RED) -> None:
    w, h = 1800, 900
    img = parchment(w, h)
    d = ImageDraw.Draw(img)
    draw_frame(d, w, h, 52, accent)
    d.rectangle([120, 135, 1680, 765], outline=INK2, width=6)
    d.line([(170, 690), (1630, 690)], fill=INK2, width=10)

    if motif == "book":
        d.rectangle([360, 280, 790, 620], fill=(221, 207, 175), outline=INK, width=9)
        d.rectangle([790, 280, 1220, 620], fill=(221, 207, 175), outline=INK, width=9)
        d.line([(790, 280), (790, 620)], fill=INK, width=8)
        for y in range(330, 570, 42):
            d.line([(410, y), (735, y + 10)], fill=INK2, width=4)
            d.line([(845, y + 4), (1160, y - 4)], fill=INK2, width=4)
        draw_banner(d, 1270, 295, 0.8, accent, 1)
    elif motif == "marshal":
        d.line([(610, 610), (1220, 255)], fill=INK, width=16)
        d.line([(650, 255), (1180, 610)], fill=INK, width=16)
        d.ellipse([790, 245, 1010, 470], fill=GOLD, outline=INK, width=8)
        d.rectangle([870, 465, 930, 635], fill=INK)
    elif motif == "foot":
        draw_knight(d, 655, 650, 0.9, 1, BLUE, False)
        draw_knight(d, 1140, 650, 0.9, -1, RED, False)
        d.line([(710, 475), (1015, 410)], fill=INK, width=12)
        d.line([(1090, 475), (790, 410)], fill=INK, width=12)
    elif motif == "mounted":
        draw_horse(d, 650, 575, 0.75, 1, RED)
        draw_knight(d, 650, 575, 0.75, 1, BLUE, True)
        draw_horse(d, 1130, 575, 0.75, -1, GREEN)
        draw_knight(d, 1130, 575, 0.75, -1, RED, True)
    elif motif == "joust":
        draw_joust_scene(img, False)
    elif motif == "prize":
        d.ellipse([745, 260, 1055, 570], fill=GOLD, outline=INK, width=10)
        d.rectangle([828, 535, 972, 650], fill=GOLD, outline=INK, width=8)
        d.arc([610, 230, 800, 625], 90, 270, fill=GREEN, width=14)
        d.arc([1000, 230, 1190, 625], -90, 90, fill=GREEN, width=14)
        d.rectangle([1210, 425, 1405, 560], fill=RED, outline=INK, width=7)
    elif motif == "hosting":
        draw_tent(d, 320, 340, 1.25, RED)
        draw_tent(d, 1180, 355, 1.05, BLUE)
        d.rectangle([760, 305, 1050, 610], fill=(221, 205, 164), outline=INK, width=9)
        for y in range(350, 585, 45):
            d.line([(800, y), (1010, y)], fill=INK2, width=4)
    elif motif == "scenarios":
        d.polygon([(900, 220), (1020, 520), (780, 520)], fill=GOLD, outline=INK)
        d.line([(900, 220), (900, 650)], fill=INK, width=12)
        d.ellipse([650, 500, 850, 690], outline=INK, width=10)
        d.ellipse([950, 500, 1150, 690], outline=INK, width=10)
        for x in [430, 1350]:
            draw_banner(d, x, 310, 1.0, accent, 1 if x < 900 else -1)
    elif motif == "appendix":
        d.rounded_rectangle([520, 250, 1280, 610], radius=38, fill=(222, 206, 169), outline=INK, width=10)
        for y in range(310, 545, 50):
            d.line([(590, y), (1210, y)], fill=INK2, width=5)
        for x, y, val in [(670, 665, 6), (880, 675, 12), (1090, 665, 8)]:
            d.rounded_rectangle([x - 55, y - 55, x + 55, y + 55], radius=16, fill=(218, 197, 153), outline=INK, width=8)
            d.ellipse([x - 8, y - 8, x + 8, y + 8], fill=INK)

    save(img, name)


def make_contact_sheet(files: list[str]) -> None:
    thumbs = []
    for f in files:
        im = Image.open(OUT / f).convert("RGB")
        im.thumbnail((360, 360))
        thumbs.append((f, im.copy()))
    sheet = Image.new("RGB", (1200, 960), (230, 222, 204))
    d = ImageDraw.Draw(sheet)
    x = y = 24
    for i, (name, im) in enumerate(thumbs):
        sheet.paste(im, (x, y))
        d.text((x, y + im.height + 8), name[:42], fill=INK)
        x += 390
        if x + 360 > sheet.width:
            x = 24
            y += 300
    save(sheet, "contact-sheet.png")


def main() -> None:
    assets = []
    cover = parchment(1875, 2775)
    draw_joust_scene(cover, True)
    save(cover, "cover-front-art-6x9-bleed-300dpi.png")
    assets.append("cover-front-art-6x9-bleed-300dpi.png")

    plates = [
        ("chapter-01-using-this-book.png", "book", RED),
        ("chapter-02-tournament-fundamentals.png", "marshal", BLUE),
        ("chapter-03-footman-melee.png", "foot", RED),
        ("chapter-04-mounted-melees.png", "mounted", GREEN),
        ("chapter-05-jousting.png", "joust", RED),
        ("chapter-06-formats-prizes-honors.png", "prize", GOLD),
        ("chapter-07-hosting-a-tournament.png", "hosting", BLUE),
        ("chapter-08-scenarios-and-themes.png", "scenarios", GREEN),
        ("chapter-09-referee-appendices.png", "appendix", RED),
    ]
    for name, motif, accent in plates:
        draw_icon_plate(name, motif, accent)
        assets.append(name)
    make_contact_sheet(assets)


if __name__ == "__main__":
    main()
