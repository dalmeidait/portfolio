import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

// Filesystem-backed preview: missing URLs return real 404s, not SPA fallbacks.
export function serveStatic({
  directory = "dist",
  base = "/portfolio/",
  port = 4173,
} = {}) {
  const root = resolve(directory);
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".xml": "application/xml",
    ".png": "image/png",
    ".json": "application/json",
  };
  const server = createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");
    const send = (status, body, type = "text/html; charset=utf-8") => {
      // GitHub Pages serves text assets with gzip. Match that transport in QA.
      const compress =
        /\bgzip\b/.test(request.headers["accept-encoding"] || "") &&
        /^(text\/|application\/(json|xml)|image\/svg)/.test(type);
      const payload = compress ? gzipSync(body) : body;
      response.writeHead(status, {
        "Content-Type": type,
        "Cache-Control": type.startsWith("text/html")
          ? "no-cache"
          : "public, max-age=600",
        "Content-Length": Buffer.byteLength(payload),
        Vary: "Accept-Encoding",
        ...(compress ? { "Content-Encoding": "gzip" } : {}),
      });
      response.end(request.method === "HEAD" ? undefined : payload);
    };
    if (!["GET", "HEAD"].includes(request.method))
      return send(405, "Método não permitido");
    if (url.pathname === base.slice(0, -1)) {
      response.writeHead(301, { Location: base + url.search });
      return response.end();
    }
    try {
      if (!url.pathname.startsWith(base)) throw new Error("outside base");
      const path = resolve(
        root,
        decodeURIComponent(url.pathname.slice(base.length)),
      );
      if (path !== root && !path.startsWith(root + sep))
        throw new Error("outside root");
      const info = await stat(path);
      if (info.isDirectory() && !url.pathname.endsWith("/")) {
        response.writeHead(301, { Location: url.pathname + "/" + url.search });
        return response.end();
      }
      const file = info.isDirectory() ? resolve(path, "index.html") : path;
      send(
        200,
        await readFile(file),
        types[extname(file)] || "application/octet-stream",
      );
    } catch {
      const fallback = await readFile(resolve(root, "404.html")).catch(
        () => "Página não encontrada",
      );
      send(404, fallback);
    }
  });
  return new Promise((done, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => done(server));
  });
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await serveStatic({
    directory: process.env.BUILD_DIR || "dist",
    base: process.env.SITE_BASE || "/portfolio/",
    port: Number(process.env.PORT || 4173),
  });
  console.log(
    `Preview estático: http://127.0.0.1:${process.env.PORT || 4173}${process.env.SITE_BASE || "/portfolio/"}`,
  );
}
