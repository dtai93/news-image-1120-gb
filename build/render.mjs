import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = 18841;
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = normalize(join(root, path));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end();
    return;
  }
  try {
    if (!statSync(file).isFile()) throw new Error("dir");
    res.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  const out = join(root, "build/raw.png");
  const shot = spawn("node", [
    "/home/box/makefun/tools/shot.mjs",
    `http://127.0.0.1:${port}/build/page.html`,
    out, "1024", "1024", "18842"
  ], { stdio: "inherit", env: { ...process.env, SHOT_WAIT_MS: "2800" } });
  shot.on("exit", (code) => {
    server.close();
    process.exit(code ?? 1);
  });
});
