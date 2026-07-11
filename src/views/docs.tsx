// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout, SiteNav } from "./layout.js";
import type { AppInfo } from "../config.js";
import { PAGES, GROUPS, ORDER } from "../docs/generated.js";

export const DocsPage: FC<{ slug: string; app: AppInfo }> = ({ slug, app }) => {
  const page = PAGES[slug]!;
  const i = ORDER.indexOf(slug);
  const prev = i > 0 ? ORDER[i - 1] : undefined;
  const next = i < ORDER.length - 1 ? ORDER[i + 1] : undefined;

  return (
    <Layout
      title={`${page.title} — Keel docs`}
      description={`${page.title} — Keel framework documentation.`}
      url={`${app.url}/docs/${slug}`}
    >
      <SiteNav version={app.version} repo={app.repo} />

      <div class="wrap">
        <div class="docs">
          <aside class="docnav">
            <details class="docmenu" open>
              <summary>Documentation</summary>
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
            </details>
          </aside>

          <main class="doc-main">
            <div class="crumb">Docs / {page.title}</div>
            <article class="doc-body" dangerouslySetInnerHTML={{ __html: page.html }} />

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
