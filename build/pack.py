"""Pack raw.png into a 24-bit 1024 PNG of 200–900 KB, plus a 300px QA copy."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
src = Image.open(root / "build" / "raw.png").convert("RGB")
if src.size != (1024, 1024):
    raise SystemExit(f"bad size {src.size}")
out = root / "entry.png"
src.save(out, "PNG", optimize=True)
n = out.stat().st_size
if n > 900_000:
    src.point(lambda p: (p // 2) * 2).save(out, "PNG", optimize=True)
    n = out.stat().st_size
if not (200_000 <= n <= 900_000) or n > 1_048_576:
    raise SystemExit(f"size {n} outside 200–900 KB")
with out.open("rb") as f:
    head = f.read(26)
if head[24] != 8 or head[25] not in (2, 6):
    raise SystemExit(f"not 24-bit PNG depth {head[24]} type {head[25]}")
qa = src.resize((300, 300), Image.Resampling.LANCZOS)
qa.save(root / "build" / "at300.png", "PNG")
print("entry.png", n, "bytes", "24-bit")
