from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "images"
OUT = ROOT / "site_contact_sheet.jpg"

photos = sorted(IMAGES.glob("*.jpg"))
before = sum(path.stat().st_size for path in photos)

for photo in photos:
    with Image.open(photo) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        limit = 1250 if photo.stem.startswith("item-") else 1800
        image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
        image.save(photo, format="JPEG", quality=78, optimize=True, progressive=True, subsampling=0)

after = sum(path.stat().st_size for path in photos)
columns, tile_w, tile_h = 5, 240, 278
rows = (len(photos) + columns - 1) // columns
contact = Image.new("RGB", (columns * tile_w, rows * tile_h), "#1a1417")
draw = ImageDraw.Draw(contact)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 13)
except OSError:
    font = ImageFont.load_default()

for i, photo in enumerate(photos):
    with Image.open(photo) as im:
        tile = ImageOps.fit(im.convert("RGB"), (225, 233), method=Image.Resampling.LANCZOS, centering=(0.5,0.38))
    x = (i % columns) * tile_w + 8
    y = (i // columns) * tile_h + 8
    contact.paste(tile, (x,y))
    draw.text((x,y+241), photo.name, font=font, fill="#e6d6c1")

contact.save(OUT, quality=78, optimize=True)
print("Photos:", len(photos), "| Original:", round(before / 1024 / 1024, 1), "MB | Optimized:", round(after / 1024 / 1024, 1), "MB")
(ROOT / "optimizer_report.txt").write_text(f"Photos: {len(photos)}\nBefore: {before}\nAfter: {after}\nSaved: {100 * (1-after/before):.1f}%\n")
