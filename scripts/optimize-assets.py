"""
Builds optimized, web-ready copies of the supplied WELLFORD assets.

Source files in public/images and public/videos are left untouched.
Output goes to public/media.

  python -I scripts/optimize-assets.py

Requires Pillow, and ffmpeg on PATH for the hero video/poster.
"""
from pathlib import Path
import shutil
import subprocess
import sys

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images"
VID = ROOT / "public" / "videos"
OUT = ROOT / "public" / "media"
OUT.mkdir(parents=True, exist_ok=True)

BACKGROUNDS = {
    "collection-bg.png": "collection-bg.webp",
    "story-bg.png": "story-bg.webp",
    "style-notes-bg.png": "style-notes-bg.webp",
    "standard-bg.png": "standard-bg.webp",
    "faq-bg.png": "faq-bg.webp",
    "newsletter-and footer-bg.png": "letter-footer-bg.webp",
}
LIFESTYLE = {
    "city-hours.png": "city-hours.webp",
    "the-weekend.png": "the-weekend.webp",
    "after-dark.png": "after-dark.webp",
}
PRODUCTS = {
    "penny-loafer.png": "penny-loafer.webp",
    "suede-driver.png": "suede-driver.webp",
    "classic-derby.png": "classic-derby.webp",
}
# The three product renders share the same 1536x1024 canvas with the podium in
# the same place. Cropping all of them to one shared box keeps their on-screen
# scale and podium baseline identical.
PRODUCT_CROP = (170, 215, 1366, 965)

# Renders framed differently (e.g. taller boots that fill their canvas) are
# rescaled so their podium matches the reference podium exactly — same width,
# same left edge, same baseline — then cropped with extra headroom above.
REFERENCE_PODIUM = (197, 1342, 943)  # left, right, bottom on the 1536x1024 canvas
RESCALED_PRODUCTS = {
    "chelsea-boot.png": "chelsea-boot.webp",
}


def save_rgb(src: str, dst: str, quality: int = 86) -> None:
    im = Image.open(SRC / src).convert("RGB")
    im.save(OUT / dst, "WEBP", quality=quality, method=6)
    print("  ", dst, im.size)


def save_product(src: str, dst: str) -> None:
    im = Image.open(SRC / src).convert("RGBA")
    r, g, b, a = im.split()
    # Scrub near-invisible alpha noise (values 1-10) and lift 254 -> 255 so
    # the product is fully opaque with no faint rectangle on dark backgrounds.
    a = a.point(lambda v: 0 if v <= 10 else (255 if v >= 250 else v))
    im = Image.merge("RGBA", (r, g, b, a)).crop(PRODUCT_CROP)
    im.save(OUT / dst, "WEBP", quality=90, method=6, exact=False)
    print("  ", dst, im.size)


def save_product_rescaled(src: str, dst: str) -> None:
    im = Image.open(SRC / src).convert("RGBA")
    r, g, b, a = im.split()
    a = a.point(lambda v: 0 if v <= 10 else (255 if v >= 250 else v))
    im = Image.merge("RGBA", (r, g, b, a))
    left, top, right, bottom = a.point(lambda v: 255 if v > 20 else 0).getbbox()
    ref_l, ref_r, ref_b = REFERENCE_PODIUM
    k = (ref_r - ref_l) / (right - left)  # uniform scale: never stretched
    scaled = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    canvas = Image.new("RGBA", (1536, 1400), (0, 0, 0, 0))
    dx, dy = round(ref_l - left * k), round(ref_b - bottom * k) + 376  # +376: room above
    canvas.alpha_composite(scaled, (max(dx, 0), max(dy, 0)))
    content_top = top * k + dy
    x0, _, x1, y1 = PRODUCT_CROP
    y1 += 376
    y0 = min(PRODUCT_CROP[1] + 376, int(content_top) - 18)
    out = canvas.crop((x0, y0, x1, y1))
    out.save(OUT / dst, "WEBP", quality=90, method=6, exact=False)
    print("  ", dst, out.size, f"(scale {k:.3f})")


def video() -> None:
    sources = list(VID.glob("*.mp4"))
    if not sources:
        print("  !! hero video missing")
        return
    src = sources[0]
    ff = shutil.which("ffmpeg")
    if not ff:
        print("  !! ffmpeg not found, copying video as-is")
        shutil.copy(src, OUT / "hero.mp4")
        return
    run = lambda *args: subprocess.run([ff, "-v", "error", "-y", *args], check=True)
    # 1080p: original stream, moov atom moved to the front for fast start.
    run("-i", str(src), "-c", "copy", "-an", "-movflags", "+faststart", str(OUT / "hero.mp4"))
    # 720p for small screens.
    run("-i", str(src), "-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "24",
        "-preset", "slow", "-an", "-movflags", "+faststart", str(OUT / "hero-720.mp4"))
    # Poster from the first frame.
    run("-i", str(src), "-frames:v", "1", "-q:v", "3", str(OUT / "hero-poster.jpg"))
    Image.open(OUT / "hero-poster.jpg").save(OUT / "hero-poster.webp", "WEBP", quality=82)
    (OUT / "hero-poster.jpg").unlink()
    print("   hero.mp4, hero-720.mp4, hero-poster.webp")


if __name__ == "__main__":
    if sys.argv[1:] == ["products"]:
        for s_, d in PRODUCTS.items():
            save_product(s_, d)
        for s_, d in RESCALED_PRODUCTS.items():
            save_product_rescaled(s_, d)
        sys.exit(0)
    print("backgrounds")
    for s, d in BACKGROUNDS.items():
        save_rgb(s, d)
    print("lifestyle")
    for s, d in LIFESTYLE.items():
        save_rgb(s, d, 88)
    print("products")
    for s, d in PRODUCTS.items():
        save_product(s, d)
    for s, d in RESCALED_PRODUCTS.items():
        save_product_rescaled(s, d)
    print("video")
    video()
    # Open Graph image (1200x630) from the story background.
    og = Image.open(SRC / "story-bg.png").convert("RGB")
    og = og.resize((1234, 630)).crop((17, 0, 1217, 630))
    og.save(OUT / "og-image.jpg", "JPEG", quality=85)
    print("   og-image.jpg")
