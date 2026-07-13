// Build step: render the Keel repo's markdown docs to HTML and bake them into
// the Worker as src/docs/generated.ts. One source of truth — the guides live in
// the keel repo (docs/*.md); this site renders them verbatim. Reads the sibling
// checkout (docs aren't shipped in the npm package, which is `files: ["dist"]`).
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

// Prefer the installed package's docs; fall back to the sibling checkout.
const sources = [
  { docs: join(root, "node_modules/@shaferllc/keel/docs"), pkg: join(root, "node_modules/@shaferllc/keel/package.json") },
  { docs: join(root, "../keel/docs"), pkg: join(root, "../keel/package.json") },
];
const source = sources.find((s) => existsSync(s.docs));
if (!source) {
  console.error("build-docs: no docs directory found in", sources.map((s) => s.docs));
  process.exit(1);
}
const docsDir = source.docs;

// The version comes from whatever we're rendering the docs OF. Hardcoding it in
// config.ts let the header say 0.78.2 while the guides on the page were 0.79.0's
// — the number and the prose have to come from the same place or they drift.
const version = JSON.parse(readFileSync(source.pkg, "utf8")).version;

// Conceptual pages have no exported API and use these slugs; everything else is
// an API guide. The ordering here drives the sidebar sections.
const SECTIONS = [
  { title: "Getting Started", slugs: ["from-install-to-deploy", "keel-cloud", "getting-started", "starter-kits"] },
  {
    title: "The Basics",
    slugs: ["container", "providers", "configuration", "routing", "pages", "controllers", "request-response", "decorators", "middleware", "hooks", "views", "templates", "vite", "errors"],
  },
  {
    title: "Database",
    slugs: ["database", "query-builder", "orm", "models", "migrations", "factories", "transformers", "api-resources"],
  },
  {
    title: "Auth & Security",
    slugs: ["sessions", "authentication", "accounts", "teams", "gates", "authorization", "social-auth", "hashing", "security", "cors", "rate-limiting"],
  },
  {
    title: "Digging Deeper",
    slugs: ["mail", "billing", "queues", "scheduling", "notifications", "broadcasting", "broker", "events", "cache", "locks", "redis", "logger", "health", "i18n", "validation", "url-builder", "static-files", "storage", "inertia", "openapi", "telemetry", "watch", "packages", "helpers", "debugging", "testing", "console", "hosting"],
  },
  { title: "Under the Hood", slugs: ["hono", "architecture", "ai"] },
];

function slugForHeading(text) {
  return text
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// A Marked instance that rewrites cross-doc links (foo.md -> /docs/foo) and adds
// id anchors to headings so in-page `#section` links work.
function makeMarked() {
  const marked = new Marked({ gfm: true });
  const renderer = {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugForHeading(this.parser.parseInline(tokens).replace(/<[^>]+>/g, ""));
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      let h = href;
      // Cross-doc links from the keel repo take a few shapes:
      //   models.md / ./models.md / ./docs/models.md / docs/models.md
      //   (+ optional #anchor)
      // All become /docs/models(#anchor) for the site.
      const m = /^(?:\.\/)?(?:docs\/)?([\w-]+)\.md(#.*)?$/.exec(href);
      if (m) h = `/docs/${m[1]}${m[2] ?? ""}`;
      const t = title ? ` title="${title}"` : "";
      const ext = /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${h}"${t}${ext}>${text}</a>`;
    },
  };
  marked.use({ renderer });
  return marked;
}

const marked = makeMarked();
const known = new Set(readdirSync(docsDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")));

const pages = {};
for (const section of SECTIONS) {
  for (const slug of section.slugs) {
    if (!known.has(slug)) {
      console.error(`build-docs: SECTIONS references "${slug}" but ${slug}.md is missing`);
      process.exit(1);
    }
    const md = readFileSync(join(docsDir, `${slug}.md`), "utf8");
    const titleMatch = /^#\s+(.+)$/m.exec(md);
    const title = titleMatch ? titleMatch[1].trim() : slug;
    // Drop the leading H1 (the page renders its own title) and render the rest.
    const body = md.replace(/^#\s+.+$\n?/m, "");
    const html = marked.parse(body);
    pages[slug] = { title, html };
  }
}

// The changelog is rendered too, but it is not a guide — it has its own page rather
// than a sidebar entry. The site used to keep a hand-written copy of it, which is why
// that copy sat five releases out of date; there is now one source of truth.
const changelogHtml = known.has("changelog")
  ? marked.parse(readFileSync(join(docsDir, "changelog.md"), "utf8").replace(/^#\s+.+$\n?/m, ""))
  : "";

// Warn about any guide not placed in a section (so nothing silently drops).
const placed = new Set([...SECTIONS.flatMap((s) => s.slugs), "changelog"]);
for (const slug of known) {
  if (!placed.has(slug)) console.warn(`build-docs: ${slug}.md is not in any section (skipped)`);
}

const groups = SECTIONS.map((s) => ({ title: s.title, pages: s.slugs }));
const order = SECTIONS.flatMap((s) => s.slugs);

const out = `// GENERATED by scripts/build-docs.mjs from the keel repo's docs/*.md — do not edit.
export interface DocPage { title: string; html: string; }
export const PAGES: Record<string, DocPage> = ${JSON.stringify(pages)};
export const GROUPS: { title: string; pages: string[] }[] = ${JSON.stringify(groups)};
export const ORDER: string[] = ${JSON.stringify(order)};

/** The Keel version these guides were rendered from. */
export const KEEL_VERSION = ${JSON.stringify(version)};

/** The framework's own CHANGELOG.md, rendered. One source of truth. */
export const CHANGELOG_HTML = ${JSON.stringify(changelogHtml)};
`;

// generated.ts is the only file in src/docs/ and it's gitignored, so a fresh
// clone has no such directory — this ran fine on a laptop and died in CI.
mkdirSync(join(root, "src/docs"), { recursive: true });
writeFileSync(join(root, "src/docs/generated.ts"), out);
console.log(`build-docs: rendered ${Object.keys(pages).length} guides from ${docsDir} (v${version})`);
