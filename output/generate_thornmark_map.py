from html import escape
from pathlib import Path
import textwrap


OUT_DIR = Path(r"J:\Shared drives\Edens Efterklang\output\maps")
SVG_PATH = OUT_DIR / "thornmark-atlaskort.svg"


WIDTH = 6400
HEIGHT = 6800


MARKS = [
    {
        "name": "Højmark",
        "subtitle": "Bjerglandskaber, miner, Dalhul og handelsveje",
        "color": "#9aa0a5",
        "dark": "#4f555a",
        "lens": [
            ("Malmryg Len", [
                ("Jernbund Herred", ["Smedeklippeborg", "Dybborg", "Sortflods Borg"]),
                ("Kobberdal Herred", ["Grubeborg", "Handelsfæstet"]),
                ("Sølvstrøm Herred", ["Glittertind Borg", "Måneskinsfæstet"]),
            ]),
            ("Fjeldtop Len", [
                ("Stormvind Herred", ["Vagttårnsborg", "Isleborg"]),
                ("Skykløft Herred", ["Huleportborg", "Eremitfæstet"]),
            ]),
            ("Klippekløft Len", [
                ("Dybhule Herred", ["Kløftportborg", "Nedgangsborg", "Spjærborg"]),
                ("Grotteskygge Herred", ["Grottemundborg", "Skyggegångborg", "Dyndportborg"]),
            ]),
            ("Dalhul Len", [
                ("Østerdal Herred", [
                    "Dalhulborg: Eiriksfæste, Dalhulby, Ovredalhulby",
                    "Skyggekildeborg: Kildeby",
                    "Glimmerstedborg: Malmstrup, Skinnested",
                    "Højklippeborg",
                    "Furefæsteborg: Korsveje, Aldersro",
                    "Egeskovborg: Træhøj, Elverlys, Grønly Slot",
                ]),
                ("Vesterdal Herred", ["Vestkorsborg", "Skovrandborg", "Dalbundborg", "Brostenborg"]),
            ]),
        ],
    },
    {
        "name": "Grøndal Mark",
        "subtitle": "Frodige marker, floder, korn og retfærd",
        "color": "#9cc65d",
        "dark": "#4d6d2f",
        "lens": [
            ("Lauenmark Len", [
                ("Lauedal Herred", ["Lauedalsborg", "Skovgårdborg", "Brofæsteborg"]),
                ("Markrand Herred", ["Høstborg", "Engdalborg", "Vestgrænsborg"]),
            ]),
            ("Kornmark Len", [
                ("Flodeng Herred", ["Mølleborg", "Kornstedborg", "Åbredborg"]),
                ("Høstakker Herred", ["Høstakborg", "Solbakborg", "Tærskeborg"]),
            ]),
            ("Retfærd Len", [
                ("Vejfæste Herred", ["Korsvejsborg", "Vagtborg", "Herbergborg"]),
                ("Domdal Herred", ["Domstedborg", "Seglborg", "Tingborg"]),
            ]),
        ],
    },
    {
        "name": "Skovfelt Mark",
        "subtitle": "Tæt skov, jagt, tømmer og randhandel",
        "color": "#3f7c48",
        "dark": "#1f4a2d",
        "lens": [
            ("Mørkeskov Len", [
                ("Bregnekrat Herred", ["Bregneborg", "Hjorteborg", "Skovmærkeborg"]),
                ("Elskov Herred", ["Elborg", "Træfældeborg", "Jægerborg"]),
            ]),
            ("Bregneskov Len", [
                ("Skyggeskov Herred", ["Skyggeborg", "Pattersborg", "Stigborg"]),
                ("Lyngmark Herred", ["Lyngborg", "Fugleborg", "Randborg"]),
            ]),
        ],
    },
    {
        "name": "Strandfælde Mark",
        "subtitle": "Kyst, hovedstad, handel, flåde og told",
        "color": "#7db7c5",
        "dark": "#2e6172",
        "lens": [
            ("Thornhavn Len", [
                ("Hovedstads Herred", ["Thorngårdborg: Thorngård Slot, Thornhavn", "Havneborg", "Købstadborg"]),
                ("Kystvej Herred", ["Strandborg", "Fyrborg", "Skærborg"]),
            ]),
            ("Kystring Len", [
                ("Øststrand Herred", ["Østhavnsborg", "Salteborg", "Netborg"]),
                ("Veststrand Herred", ["Vesthavnsborg", "Toldborg", "Vragborg"]),
            ]),
        ],
    },
    {
        "name": "Tågebjerg Mark",
        "subtitle": "Tågedale, sagn, høje stier og mørke kløfter",
        "color": "#8b8f9c",
        "dark": "#565b6b",
        "lens": [
            ("Tågedal Len", [
                ("Tågeeng Herred", ["Tågeborg", "Sagnborg", "Tågeportborg"]),
                ("Slørdal Herred", ["Slørborg", "Ermitborg", "Hviskeborg"]),
            ]),
            ("Slørbjerg Len", [
                ("Højtåge Herred", ["Højtågeborg", "Stigfæsteborg", "Tindborg"]),
                ("Skyggekløft Herred", ["Skyggekløftborg", "Kældeborg", "Vogterborg"]),
            ]),
        ],
    },
    {
        "name": "Granitdal Mark",
        "subtitle": "Stenbrud, granit, fæstninger og stenhåndværk",
        "color": "#b49a78",
        "dark": "#6c5940",
        "lens": [
            ("Bruddal Len", [
                ("Grubedal Herred", ["Grubeborg (Granitdal)", "Huggermarkborg", "Vognborg"]),
                ("Stendal Herred", ["Stenborg", "Brostenborg (Granitdal)", "Murstensborg"]),
            ]),
            ("Stenfæst Len", [
                ("Fæstningdal Herred", ["Fæstningsborg", "Tårnborg", "Murborg"]),
                ("Håndværkdal Herred", ["Skulpturborg", "Gravstedsborg", "Brolæggerborg"]),
            ]),
        ],
    },
]


def tag(name, attrs=None, body=None):
    attrs = attrs or {}
    attr_text = "".join(f' {k}="{escape(str(v), quote=True)}"' for k, v in attrs.items())
    if body is None:
        return f"<{name}{attr_text}/>"
    return f"<{name}{attr_text}>{body}</{name}>"


def text(x, y, value, size=28, fill="#2b1a0f", weight="400", anchor="start", family="Georgia, serif", extra=""):
    return tag(
        "text",
        {
            "x": x,
            "y": y,
            "font-size": size,
            "font-family": family,
            "font-weight": weight,
            "fill": fill,
            "text-anchor": anchor,
            "style": extra,
        },
        escape(value),
    )


def wrapped_text(x, y, value, width_chars, size=22, line_height=29, fill="#2b1a0f", weight="400"):
    lines = []
    for paragraph in str(value).split("\n"):
        lines.extend(textwrap.wrap(paragraph, width=width_chars) or [""])
    out = []
    yy = y
    for line in lines:
        out.append(text(x, yy, line, size=size, fill=fill, weight=weight))
        yy += line_height
    return "\n".join(out), yy


def panel(x, y, w, h, fill="#f1dfba", stroke="#6d4926", radius=26, opacity=0.96):
    return tag("rect", {
        "x": x, "y": y, "width": w, "height": h, "rx": radius, "ry": radius,
        "fill": fill, "stroke": stroke, "stroke-width": 5, "opacity": opacity,
        "filter": "url(#paperShadow)",
    })


def badge(x, y, value, fill, stroke="#4a2e17", size=24, pad_x=20):
    w = max(160, len(value) * (size * 0.58) + pad_x * 2)
    return "\n".join([
        tag("rect", {
            "x": x, "y": y, "width": w, "height": size + 22, "rx": 18, "ry": 18,
            "fill": fill, "stroke": stroke, "stroke-width": 3, "opacity": 0.92,
        }),
        text(x + w / 2, y + size + 1, value, size=size, fill="#fff9e8", weight="700", anchor="middle"),
    ])


def mountain(x, y, scale=1.0, fill="#6a6f75"):
    pts = f"{x},{y+60*scale} {x+40*scale},{y} {x+80*scale},{y+60*scale}"
    pts2 = f"{x+42*scale},{y+60*scale} {x+78*scale},{y+15*scale} {x+114*scale},{y+60*scale}"
    return "\n".join([
        tag("polygon", {"points": pts, "fill": fill, "stroke": "#342820", "stroke-width": 3}),
        tag("polygon", {"points": pts2, "fill": "#858a90", "stroke": "#342820", "stroke-width": 3}),
    ])


def tree(x, y, scale=1.0, fill="#214f2b"):
    return "\n".join([
        tag("circle", {"cx": x, "cy": y, "r": 34 * scale, "fill": fill, "opacity": 0.95}),
        tag("circle", {"cx": x - 24 * scale, "cy": y + 18 * scale, "r": 26 * scale, "fill": fill, "opacity": 0.95}),
        tag("circle", {"cx": x + 25 * scale, "cy": y + 18 * scale, "r": 26 * scale, "fill": fill, "opacity": 0.95}),
        tag("rect", {"x": x - 7 * scale, "y": y + 35 * scale, "width": 14 * scale, "height": 35 * scale, "fill": "#5a3d22"}),
    ])


def castle_icon(x, y, scale=1.0, fill="#efe6c8"):
    w = 74 * scale
    h = 54 * scale
    return "\n".join([
        tag("rect", {"x": x, "y": y + 16 * scale, "width": w, "height": h, "fill": fill, "stroke": "#4b3322", "stroke-width": 3}),
        tag("rect", {"x": x + 7 * scale, "y": y, "width": 16 * scale, "height": 28 * scale, "fill": fill, "stroke": "#4b3322", "stroke-width": 3}),
        tag("rect", {"x": x + w - 23 * scale, "y": y, "width": 16 * scale, "height": 28 * scale, "fill": fill, "stroke": "#4b3322", "stroke-width": 3}),
        tag("path", {"d": f"M{x+30*scale},{y+h+16*scale} q{7*scale},-{18*scale} {14*scale},0 v{18*scale} h-{28*scale} z", "fill": "#50331f"}),
    ])


def draw_region(points, fill, stroke, name, subtitle, label_x, label_y):
    return "\n".join([
        tag("polygon", {
            "points": " ".join(f"{x},{y}" for x, y in points),
            "fill": fill,
            "stroke": stroke,
            "stroke-width": 8,
            "opacity": 0.88,
            "filter": "url(#paperShadow)",
        }),
        text(label_x, label_y, name, size=48, fill="#fff8df", weight="800", anchor="middle",
             extra="paint-order: stroke; stroke: #2f1d10; stroke-width: 8px;"),
        text(label_x, label_y + 44, subtitle, size=22, fill="#fff8df", weight="700", anchor="middle",
             extra="paint-order: stroke; stroke: #2f1d10; stroke-width: 5px;"),
    ])


def draw_index_panel(x, y, w, mark):
    lens_count = sum(len(hs) for _, hs in mark["lens"])
    item_count = sum(len(items) for _, hs in mark["lens"] for _, items in hs)
    h = 155 + len(mark["lens"]) * 62 + lens_count * 44 + item_count * 28
    h = max(h, 430)
    out = [panel(x, y, w, h, fill="#f4e1ba", stroke=mark["dark"], radius=20)]
    out.append(tag("rect", {"x": x, "y": y, "width": w, "height": 70, "rx": 20, "ry": 20, "fill": mark["dark"], "opacity": 0.98}))
    out.append(text(x + 28, y + 47, mark["name"], size=34, fill="#fff4d0", weight="800"))
    out.append(text(x + w - 28, y + 47, "Mark", size=22, fill="#fff4d0", weight="700", anchor="end"))
    yy = y + 104
    out.append(text(x + 28, yy, mark["subtitle"], size=20, fill="#4a321f", weight="700"))
    yy += 42
    for len_name, herreds in mark["lens"]:
        out.append(text(x + 28, yy, len_name, size=26, fill=mark["dark"], weight="800"))
        yy += 34
        for herred_name, items in herreds:
            out.append(text(x + 56, yy, f"{herred_name}:", size=21, fill="#2f2418", weight="800"))
            yy += 26
            joined = ", ".join(items)
            wrapped, yy = wrapped_text(x + 84, yy, joined, width_chars=82, size=19, line_height=25, fill="#2d2017")
            out.append(wrapped)
            yy += 10
        yy += 10
    return "\n".join(out), h


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    svg = []
    svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">')
    svg.append("""
<defs>
  <filter id="paperShadow" x="-10%" y="-10%" width="120%" height="120%">
    <feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#2d1608" flood-opacity="0.32"/>
  </filter>
  <pattern id="paperGrain" width="180" height="180" patternUnits="userSpaceOnUse">
    <rect width="180" height="180" fill="#e8d0a1"/>
    <path d="M0,45 C45,25 90,75 180,35 M0,130 C55,110 120,150 180,115" fill="none" stroke="#d0ad78" stroke-width="2" opacity="0.23"/>
    <circle cx="34" cy="38" r="3" fill="#b68f5a" opacity="0.18"/>
    <circle cx="102" cy="76" r="2" fill="#8f6a3f" opacity="0.15"/>
    <circle cx="151" cy="139" r="4" fill="#b68f5a" opacity="0.13"/>
  </pattern>
  <linearGradient id="seaGrad" x1="0" x2="1" y1="0" y2="1">
    <stop offset="0%" stop-color="#8cc7d9"/>
    <stop offset="100%" stop-color="#2f6d83"/>
  </linearGradient>
</defs>
""")
    svg.append(tag("rect", {"x": 0, "y": 0, "width": WIDTH, "height": HEIGHT, "fill": "url(#paperGrain)"}))
    svg.append(tag("rect", {"x": 70, "y": 70, "width": WIDTH - 140, "height": HEIGHT - 140, "rx": 38, "ry": 38, "fill": "none", "stroke": "#5a3519", "stroke-width": 10}))
    svg.append(text(WIDTH / 2, 150, "Kongeriget Thornmark", size=86, fill="#3c2311", weight="900", anchor="middle"))
    svg.append(text(WIDTH / 2, 210, "DM-atlaskort: marker, len, herreder, borge og bekræftede hovedsteder", size=34, fill="#5d3b1f", weight="700", anchor="middle"))

    # Main interpreted map frame.
    map_x, map_y, map_w, map_h = 130, 300, 3850, 3470
    svg.append(panel(map_x, map_y, map_w, map_h, fill="#dfc18a", stroke="#5d371a", radius=30, opacity=0.91))
    svg.append(text(map_x + 34, map_y + 58, "Fortolket landkort (ikke målfast)", size=34, fill="#4b2d16", weight="800"))

    # Sea and coast.
    svg.append(tag("path", {
        "d": "M3370,690 C3760,820 3940,1150 3905,1510 C3865,1920 4050,2350 3860,2860 C3710,3260 3930,3520 3860,3730 L3980,3730 L3980,420 L3535,420 C3410,505 3345,590 3370,690 Z",
        "fill": "url(#seaGrad)", "opacity": 0.62, "stroke": "#245064", "stroke-width": 5,
    }))
    svg.append(text(3740, 500, "Havet", size=34, fill="#e9fbff", weight="800", anchor="middle",
                    extra="paint-order: stroke; stroke: #245064; stroke-width: 6px;"))

    # Region polygons.
    regions = [
        ("Højmark", [(510, 560), (2130, 360), (3060, 820), (2700, 1570), (1950, 1840), (900, 1640), (420, 1060)], 1900, 780),
        ("Skovfelt Mark", [(300, 1580), (1020, 1400), (1880, 1750), (1660, 2780), (760, 3180), (240, 2490)], 1000, 2190),
        ("Grøndal Mark", [(1550, 1780), (2780, 1630), (3440, 2290), (3140, 3140), (1880, 3220), (1430, 2550)], 2450, 2380),
        ("Strandfælde Mark", [(3150, 1190), (3680, 850), (3910, 1450), (3780, 2650), (3260, 3140), (2970, 2270)], 3500, 1870),
        ("Tågebjerg Mark", [(2480, 430), (3360, 360), (3750, 750), (3340, 1330), (2720, 1410), (2290, 1040)], 3040, 760),
        ("Granitdal Mark", [(2520, 2860), (3310, 2700), (3730, 3190), (3410, 3650), (2380, 3610), (2070, 3220)], 2990, 3260),
    ]
    mark_by_name = {m["name"]: m for m in MARKS}
    for name, points, lx, ly in regions:
        m = mark_by_name[name]
        svg.append(draw_region(points, m["color"], m["dark"], name, m["subtitle"], lx, ly))

    # Terrain symbols.
    for x, y in [(700, 770), (880, 910), (1100, 690), (1400, 790), (2360, 650), (2630, 870), (3020, 600)]:
        svg.append(mountain(x, y, 0.9))
    for x, y in [(520, 1900), (720, 2100), (930, 1870), (1180, 2280), (1430, 2010), (1310, 2600)]:
        svg.append(tree(x, y, 0.85))
    for x, y in [(3320, 1010), (3440, 1160), (3540, 1300), (3400, 1480)]:
        svg.append(mountain(x, y, 0.62, fill="#777c88"))

    # Rivers and roads.
    svg.append(tag("path", {
        "d": "M3020,830 C2860,1220 2700,1500 2450,1780 C2170,2095 2100,2450 1850,2850",
        "fill": "none", "stroke": "#2b8fb7", "stroke-width": 18, "opacity": 0.8,
    }))
    svg.append(tag("path", {
        "d": "M1450,1620 C1820,1850 2280,2050 2720,2260 C3060,2420 3300,2650 3520,2920",
        "fill": "none", "stroke": "#8a4e21", "stroke-width": 13, "opacity": 0.82, "stroke-dasharray": "28 18",
    }))
    svg.append(tag("path", {
        "d": "M2140,850 C2200,1230 2220,1530 2260,1900 C2300,2300 2370,2660 2480,3100",
        "fill": "none", "stroke": "#8a4e21", "stroke-width": 11, "opacity": 0.75, "stroke-dasharray": "24 16",
    }))

    # Key places on the map.
    places = [
        (2190, 1500, "Dalhul Len", "Dalhulby / Eiriksfæste / Grevskov"),
        (2220, 1870, "Brostenborg", "flodovergang mod syd"),
        (2460, 2060, "Lauenmark Len", "Brofæsteborg / Roderiks grænse"),
        (3470, 1540, "Thornhavn", "Thorngård Slot / havn"),
        (3070, 3140, "Granitdal", "stenbrud og fæstninger"),
        (990, 2200, "Mørkeskov", "jagt og tømmer"),
        (3000, 990, "Tågepasser", "Tågedal og Slørbjerg"),
        (1750, 870, "Malmryg", "miner"),
    ]
    for x, y, a, b in places:
        svg.append(castle_icon(x - 55, y - 86, 0.72))
        svg.append(tag("rect", {"x": x - 210, "y": y - 20, "width": 420, "height": 78, "rx": 16, "ry": 16, "fill": "#fff2cb", "stroke": "#4b2d16", "stroke-width": 3, "opacity": 0.93}))
        svg.append(text(x, y + 10, a, size=24, fill="#2f1c0f", weight="900", anchor="middle"))
        svg.append(text(x, y + 38, b, size=17, fill="#4b2d16", weight="700", anchor="middle"))

    # Index panel.
    idx_x, idx_y, idx_w = 4080, 300, 2190
    svg.append(text(idx_x, idx_y - 45, "Administrativ nøgle fra Arkivet", size=42, fill="#3c2311", weight="900"))
    y = idx_y
    for mark in MARKS:
        block, h = draw_index_panel(idx_x, y, idx_w, mark)
        svg.append(block)
        y += h + 32

    # Legend.
    leg_x, leg_y = 145, 3820
    svg.append(panel(leg_x, leg_y, 3830, 240, fill="#f3dfb7", stroke="#5d371a", radius=22, opacity=0.94))
    svg.append(text(leg_x + 30, leg_y + 50, "Tegnforklaring og begrænsning", size=30, fill="#3c2311", weight="900"))
    legend_lines = [
        "Farvede felter = Mark. Underinddelinger i højre nøgle: Len > Herred > Borg/understed.",
        "Brune stiplede linjer = hovedveje/handelsruter. Blå linje = større flod/å-forløb.",
        "Kortet er fortolkende: præcise koordinater, afstande og fuld kystlinje er ikke bekræftet i materialet.",
        "Navne og administrative relationer er trukket fra Arkivet for Kongeriget Thornmark og område-noterne.",
    ]
    yy = leg_y + 88
    for line in legend_lines:
        svg.append(text(leg_x + 38, yy, "• " + line, size=23, fill="#3e2818", weight="600"))
        yy += 34

    # Footer source.
    svg.append(text(WIDTH / 2, HEIGHT - 70,
                    "Kilder: Delt/Arkivet for Kongeriget Thornmark.md; Områder/* kort beskrivelse; Dalhulborg i Østerdal Herred.md",
                    size=24, fill="#5d3b1f", weight="700", anchor="middle"))
    svg.append("</svg>")

    SVG_PATH.write_text("\n".join(svg), encoding="utf-8")
    print(SVG_PATH)


if __name__ == "__main__":
    main()
