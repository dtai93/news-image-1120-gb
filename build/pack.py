"""Pack the screenshot into a 1024 PNG of 200–600 KB."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
src = Image.open(root / "build" / "raw.png").convert("RGB")
if src.size != (1024, 1024):
    raise SystemExit(f"bad size {src.size}")
out = root / "entry.png"
src.save(out, "PNG", optimize=True)
n = out.stat().st_size
if n > 600_000:
    q = src.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    q.save(out, "PNG", optimize=True)
    n = out.stat().st_size
if n > 600_000:
    q = src.quantize(colors=240, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
    q.save(out, "PNG", optimize=True)
    n = out.stat().st_size
if not (200_000 <= n <= 600_000):
    raise SystemExit(f"size {n} outside 200–600 KB")
print("entry.png", n, "bytes")
