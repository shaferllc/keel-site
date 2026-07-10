// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout } from "./layout.js";
import type { AppInfo } from "../config.js";
import { PAGES, GROUPS, ORDER, type Block } from "../docs/content.js";

/** Minimal inline markdown: escape, then **bold**, `code`, and [links](url). */
function inline(s: string): string {
  const esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function escCode(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const BlockView: FC<{ block: Block }> = ({ block }) => {
  if ("h" in block) return <h2 class="doc-h">{block.h}</h2>;
  if ("p" in block)
    return <p class="doc-p" dangerouslySetInnerHTML={{ __html: inline(block.p) }} />;
  if ("note" in block)
    return <div class="doc-note" dangerouslySetInnerHTML={{ __html: inline(block.note) }} />;
  if ("list" in block)
    return (
      <ul class="doc-list">
        {block.list.map((li) => (
          <li dangerouslySetInnerHTML={{ __html: inline(li) }} />
        ))}
      </ul>
    );
  // code
  return (
    <div class="doc-code">
      {block.file ? <div class="fn">{block.file}</div> : null}
      <pre dangerouslySetInnerHTML={{ __html: escCode(block.code) }} />
    </div>
  );
};

export const DocsPage: FC<{ slug: string; app: AppInfo }> = ({ slug, app }) => {
  const page = PAGES[slug]!;
  const i = ORDER.indexOf(slug);
  const prev = i > 0 ? ORDER[i - 1] : undefined;
  const next = i < ORDER.length - 1 ? ORDER[i + 1] : undefined;

  return (
    <Layout
      title={`${page.title} — Keel docs`}
      description={page.summary}
      url={`${app.url}/docs/${slug}`}
    >
      <header class="bar">
        <div class="wrap row">
          <a class="brand" href="/">
            <b>Keel</b>
            <span class="no">v{app.version}</span>
          </a>
          <nav>
            <a href="/docs">Docs</a>
            <a class="hidesm" href="/#spec">Features</a>
            <a class="gh" href={app.repo}>GitHub ↗</a>
          </nav>
        </div>
      </header>

      <div class="wrap">
        <div class="docs">
          <aside class="docnav">
            {GROUPS.map((g) => (
              <div class="grp">
                <span>{g.title}</span>
                {g.pages.map((p) => (
                  <a href={`/docs/${p}`} class={p === slug ? "on" : ""}>
                    {PAGES[p]!.title}
                  </a>
                ))}
              </div>
            ))}
          </aside>

          <main class="doc-main">
            <div class="crumb">Docs / {page.title}</div>
            <h1>{page.title}</h1>
            <p class="doc-lead">{page.summary}</p>

            {page.blocks.map((b) => (
              <BlockView block={b} />
            ))}

            <div class="doc-foot">
              <span>
                {prev ? (
                  <a href={`/docs/${prev}`}>
                    <span class="lb">← Previous</span>
                    {PAGES[prev]!.title}
                  </a>
                ) : null}
              </span>
              <span class="nx">
                {next ? (
                  <a href={`/docs/${next}`}>
                    <span class="lb">Next →</span>
                    {PAGES[next]!.title}
                  </a>
                ) : null}
              </span>
            </div>
          </main>
        </div>
      </div>

      <footer>
        <div class="wrap row">
          <span>KEEL · v{app.version} · MIT</span>
          <nav>
            <a href="/">Home</a>
            <a href={app.repo}>GitHub</a>
            <a href={app.starter}>Starter</a>
          </nav>
        </div>
      </footer>
    </Layout>
  );
};
