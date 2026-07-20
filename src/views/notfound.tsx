// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout, SiteNav } from "./layout.js";
import type { AppInfo } from "../config.js";

/* A patch of nautical chart with soundings — and no route where you are. */
const ChartFig: FC = () => (
  <svg viewBox="0 0 420 300" width="100%" role="img" aria-label="Chart with an uncharted position">
    <text x="18" y="24" class="lbl">FIG. 404</text>
    <text x="402" y="24" class="lbl" text-anchor="end">UNCHARTED</text>

    {/* depth-contour lines */}
    <path class="thin" d="M-10,70 C90,40 190,95 300,60 C350,45 400,60 430,50" />
    <path class="thin" d="M-10,130 C100,100 200,160 310,120 C360,105 410,122 430,112" />
    <path class="thin" d="M-10,195 C110,165 210,225 320,185 C370,168 415,186 430,176" />
    <path class="thin" d="M-10,255 C120,228 220,285 330,248 C380,232 418,248 430,240" />

    {/* soundings (depths in fathoms) */}
    <text x="66" y="96" class="lbl">12</text>
    <text x="150" y="58" class="lbl">17</text>
    <text x="252" y="102" class="lbl">9</text>
    <text x="306" y="112" class="lbl">21</text>
    <text x="92" y="172" class="lbl">26</text>
    <text x="344" y="178" class="lbl">31</text>
    <text x="180" y="238" class="lbl">38</text>
    <text x="352" y="222" class="lbl">44</text>

    {/* compass rose */}
    <circle class="thin" cx="352" cy="78" r="22" />
    <circle class="thin" cx="352" cy="78" r="3" />
    <line class="thin" x1="352" y1="52" x2="352" y2="104" />
    <line class="thin" x1="326" y1="78" x2="378" y2="78" />
    <path class="accf" d="M352,56 L356,74 L352,70 L348,74 Z" />
    <text x="340" y="52" class="lblk" text-anchor="end">N</text>

    {/* the requested position — marked, but nothing there */}
    <line class="acc" x1="176" y1="132" x2="196" y2="152" />
    <line class="acc" x1="196" y1="132" x2="176" y2="152" />
    <circle class="acc" cx="186" cy="142" r="16" stroke-dasharray="3 3" />
    <text x="210" y="140" class="lblk">POSITION REQUESTED</text>
    <text x="210" y="153" class="lbl">NO ROUTE FOUND HERE</text>

    {/* corner ticks */}
    <path class="thin" d="M12,20 v-8 h8 M400,12 h8 v8 M12,280 v8 h8 M400,288 h8 v-8" />
  </svg>
);

export const NotFoundPage: FC<{ app: AppInfo; path: string }> = ({ app, path }) => (
  <Layout
    title="404 — Off the charts · Keel"
    description="This page is not on the chart."
  >
    <SiteNav version={app.version} repo={app.repo} />

    <div class="wrap">
      <section class="hero" style="border-top:none">
        <div>
          <span class="kicker">Sounding taken · nothing found</span>
          <h1>Off the <em>charts</em>.</h1>
          <p class="lead">
            There's no route at <code class="mono">{path}</code>. The chart ends
            here — steer back toward known waters.
          </p>
          <div class="cta">
            <a class="btn btn-fill" href="/">Return home</a>
            <a class="btn btn-line" href="/docs">Read the docs</a>
          </div>
        </div>
        <figure class="figure">
          <ChartFig />
          <figcaption>Chart № 404 · position requested, no route found</figcaption>
        </figure>
      </section>
    </div>

    <footer>
      <div class="wrap row">
        <span>KEEL · v{app.version} · MIT · BUILT WITH KEEL, ON CLOUDFLARE WORKERS</span>
        <nav>
          <a href="/">Home</a>
          <a href="/docs">Docs</a>
          <a href="/changelog">Changelog</a>
        </nav>
      </div>
    </footer>
  </Layout>
);
