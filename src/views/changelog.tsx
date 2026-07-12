// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout, SiteNav } from "./layout.js";
import type { AppInfo } from "../config.js";
import { CHANGELOG_HTML } from "../docs/generated.js";

/**
 * Renders the framework's own CHANGELOG.md.
 *
 * This page used to be a hand-maintained array in src/changelog.ts — which is exactly
 * why it sat five releases out of date while the framework kept shipping. One source
 * of truth now: the changelog lives in the keel repo, ships inside the package, and
 * is rendered here, so it cannot drift from what was actually released.
 */
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
            <a class="lnk" href={`${app.repo}/releases`}>
              GitHub
            </a>
            .
          </p>
        </div>

        <article class="doc-body" dangerouslySetInnerHTML={{ __html: CHANGELOG_HTML }} />
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
