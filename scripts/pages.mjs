import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const base = process.env.SITE_BASE || "/portfolio/";
const output = process.env.BUILD_DIR || "dist";
const origin = "https://dalmeidait.github.io";
const pages = [
  [
    "avanceos-microsoft-365",
    "AvanceOS — Microsoft 365",
    "Laboratório corporativo fictício de Microsoft 365: identidade, acesso, dispositivos e serviços cloud.",
  ],
  [
    "oficina-avance-on-premises",
    "Oficina Avance — On-Premises",
    "Laboratório de infraestrutura corporativa baseado em Windows Server e Active Directory.",
  ],
  [
    "oficina-avance-migracao",
    "Oficina Avance — Migração Microsoft 365",
    "Estudo de caso da transição de infraestrutura tradicional para Microsoft 365.",
  ],
];
const html = await readFile(resolve(output, "index.html"), "utf8");
const addCanonical = (source, url) =>
  source.replace(
    "</head>",
    `    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`,
  );
await writeFile(
  resolve(output, "index.html"),
  addCanonical(html, `${origin}${base}`),
);
for (const [slug, title, description] of pages) {
  const directory = resolve(output, "projetos", slug);
  await mkdir(directory, { recursive: true });
  const content = html
    .replace(/<title>.*?<\/title>/, `<title>${title} | Daniel Almeida</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
    .replace(
      /(<meta property="og:title" content=")[^"]*/,
      `$1${title} | Daniel Almeida`,
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*/,
      `$1${description}`,
    );
  await writeFile(
    resolve(directory, "index.html"),
    addCanonical(content, `${origin}${base}projetos/${slug}/`),
  );
}
await writeFile(
  resolve(output, "404.html"),
  html
    .replace(
      /<title>.*?<\/title>/,
      "<title>Página não encontrada | Daniel Almeida</title>",
    )
    .replace("</head>", '<meta name="robots" content="noindex" /></head>'),
);
await writeFile(resolve(output, ".nojekyll"), "");
// Keep URLs already published/shared working after the framework migration.
const legacyRoutes = {
  "avanceos-m365.html": "avanceos-microsoft-365",
  "oficina-avance-onpremises.html": "oficina-avance-on-premises",
  "oficina-avance-migracao-m365.html": "oficina-avance-migracao",
};
for (const [legacy, slug] of Object.entries(legacyRoutes)) {
  const destination = `${base}projetos/${slug}/`;
  await writeFile(
    resolve(output, "projetos", legacy),
    `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${origin}${destination}"><title>Projeto atualizado | Daniel Almeida</title></head><body><p>Este projeto tem um novo endereço. <a href="${destination}">Acessar o projeto</a>.</p><script>location.replace(${JSON.stringify(destination)} + location.search + location.hash);</script></body></html>`,
  );
}
const urls = [
  `${origin}${base}`,
  ...pages.map(([slug]) => `${origin}${base}projetos/${slug}/`),
];
await writeFile(
  resolve(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`,
);
console.log(
  "Páginas independentes, metadados, sitemap e 404 gerados para",
  base,
);
