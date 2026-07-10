// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout, SiteNav } from "./layout.js";
import type { AppInfo } from "../config.js";
import { RELEASES } from "../changelog.js";

export const ChangelogPage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout
    title="Changelog — Keel"
    description="Release history for the Keel framework."
    url={`${app.url}/changelog`}
  >
    <SiteNav version={app.version} repo={app.repo} />

    <div class="wrap">
      <section id="changelog">
        <div class="sec-head">
          <div>
            <span class="kicker">Release history</span>
            <h2>Changelog</h2>
          </div>
          <p>
            Every release, newest first. Full notes on{" "}
            <a class="lnk" href={`${app.repo}/releases`}>GitHub</a>.
          </p>
        </div>

        <div class="log">
          {RELEASES.map((r) => (
            <div class="rel">
              <div class="rel-meta">
                <span class="ver">v{r.version}</span>
                <span class="date">{r.date}</span>
              </div>
              <div class="rel-body">
                <h3>{r.title}</h3>
                <ul>
                  {r.changes.map((c) => (
                    <li>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

    <footer>
      <div class="wrap row">
        <span>KEEL · v{app.version} · MIT</span>
        <nav>
          <a href="/">Home</a>
          <a href="/docs">Docs</a>
          <a href={app.repo}>GitHub</a>
        </nav>
      </div>
    </footer>
  </Layout>
);
