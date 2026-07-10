// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout } from "./layout.js";
import type { AppInfo } from "../config.js";

/* ============================ hero schematic ============================ */
const HullFig: FC<{ version: string }> = ({ version }) => (
  <svg viewBox="0 0 360 384" width="100%" role="img" aria-label="Hull cross-section schematic">
    <text x="24" y="26" class="lbl">FIG. 01</text>
    <text x="336" y="26" class="lbl" text-anchor="end">SCALE 1:1</text>

    {/* beam dimension */}
    <line class="thin" x1="56" y1="70" x2="150" y2="70" />
    <line class="thin" x1="210" y1="70" x2="304" y2="70" />
    <line class="thin" x1="56" y1="64" x2="56" y2="88" />
    <line class="thin" x1="304" y1="64" x2="304" y2="88" />
    <text x="180" y="74" class="lbl" text-anchor="middle">BEAM</text>

    {/* deck + hull */}
    <line class="stroke" x1="56" y1="96" x2="304" y2="96" />
    <path class="stroke" d="M56,96 C58,210 108,302 180,316" />
    <path class="stroke" d="M304,96 C302,210 252,302 180,316" />
    <path class="thin" d="M70,98 C74,206 118,290 180,302" />
    <path class="thin" d="M290,98 C286,206 242,290 180,302" />

    {/* ribs */}
    <path class="thin" d="M106,118 C118,205 150,268 180,280" />
    <path class="thin" d="M254,118 C242,205 210,268 180,280" />

    {/* waterline */}
    <line class="wl" x1="30" y1="150" x2="330" y2="150" />
    <text x="34" y="145" class="lbl">WL</text>

    {/* keel fin */}
    <line class="acc" x1="180" y1="302" x2="180" y2="308" />
    <path class="accf" d="M173,308 L173,346 Q180,358 187,346 L187,308 Z" />

    {/* draft dimension */}
    <line class="thin" x1="316" y1="150" x2="328" y2="150" />
    <line class="thin" x1="316" y1="352" x2="328" y2="352" />
    <line class="thin" x1="322" y1="150" x2="322" y2="352" />
    <text x="322" y="250" class="lbl" text-anchor="middle" transform="rotate(90 322 250)">DRAFT</text>

    {/* callouts */}
    <text x="180" y="188" class="lbl" text-anchor="middle">CONTAINER</text>
    <line class="acc" x1="188" y1="332" x2="238" y2="332" />
    <text x="242" y="335" class="lblk">KEEL · v{version}</text>

    {/* corner ticks */}
    <path class="thin" d="M18,26 v-8 h8 M334,18 h8 v8 M18,358 v8 h8 M334,366 h8 v-8" />
  </svg>
);

/* ========================= keel-spine lifecycle ========================= */
const SPINE = [
  ["01", "ROUTE", "Hono matches the path"],
  ["02", "CONTAINER", "app bound to context"],
  ["03", "MIDDLEWARE", "global stack runs"],
  ["04", "CONTROLLER", "resolved with DI"],
  ["05", "VIEW", "component → HTML"],
  ["06", "RESPONSE", "sent to the client"],
];
const SpineFig: FC = () => (
  <svg viewBox="0 0 420 340" width="100%" role="img" aria-label="Request lifecycle along the keel">
    {/* the keel / spine */}
    <line class="bp" x1="210" y1="18" x2="210" y2="322" stroke-width="2" />
    <path class="bpf" d="M203,322 L217,322 L210,336 Z" />
    <text x="210" y="14" class="bplbl" text-anchor="middle">REQUEST</text>
    {SPINE.map(([n, t, d], i) => {
      const y = 46 + i * 46;
      const left = i % 2 === 0;
      const x2 = left ? 120 : 300;
      const tx = left ? 116 : 304;
      const anchor = left ? "end" : "start";
      return (
        <>
          <line class="bp" x1="210" y1={y} x2={x2} y2={y} />
          <circle class="bpf" cx="210" cy={y} r="4" />
          <text x={tx} y={y - 4} class="bplbl" text-anchor={anchor}>{n} · {t}</text>
          <text x={tx} y={y + 9} class="bplbl" text-anchor={anchor} opacity="0.7">{d}</text>
        </>
      );
    })}
  </svg>
);

/* ============================== content ================================ */
const FEATURES = [
  ["01", "Service container", "Backbone", "bind · singleton · instance · make. Every service resolves through one registry — the structure that keeps apps testable."],
  ["02", "Service providers", "Frames", "A register() → boot() lifecycle wires your app together in one place, in predictable order."],
  ["03", "Expressive routing", "Helm", "Closures or [Controller, method] tuples resolved from the container, with full dependency injection."],
  ["04", "JSX views", "Deck", "Type-safe Hono JSX with layouts. view(Page, props) renders in one call — the same code on Node and the edge."],
  ["05", "The console", "Rigging", "keel serve, keel routes, and make:controller / provider / middleware generators, living in your app."],
  ["06", "Runs on the edge", "Hull", "No hard Node dependency, so a Keel app deploys to Cloudflare Workers. This page is one."],
];

const CODE = `<span class="c">// routes/web.ts</span>
router.<span class="f">get</span>(<span class="s">"/"</span>, [HomeController, <span class="s">"index"</span>]);

<span class="c">// resolved from the container — full dependency injection</span>
<span class="k">export class</span> <span class="f">HomeController</span> {
  <span class="f">index</span>(c: Ctx) {
    <span class="k">return</span> c.<span class="f">json</span>({ app: <span class="f">config</span>(<span class="s">"app.name"</span>) });
  }

  <span class="f">welcome</span>(c: Ctx) {
    <span class="k">return</span> <span class="f">view</span>(WelcomePage, { name: <span class="f">config</span>(<span class="s">"app.name"</span>) });
  }
}`;

export const HomePage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title={`${app.name} — ${app.tagline}`} description={app.description} url={app.url}>
    <header class="bar">
      <div class="wrap row">
        <a class="brand" href="/">
          <b>Keel</b>
          <span class="no">v{app.version}</span>
        </a>
        <nav>
          <a class="hidesm" href="#spec">Spec</a>
          <a class="hidesm" href="#lifecycle">Lifecycle</a>
          <a href="/docs">Docs</a>
          <a class="gh" href={app.repo}>GitHub ↗</a>
        </nav>
      </div>
    </header>

    <div class="wrap">
      <section class="hero" style="border-top:none">
        <div>
          <span class="kicker">A house framework for Node.js</span>
          <h1>Every app<br />needs a <em>keel</em>.</h1>
          <p class="lead">{app.description}</p>
          <div class="cta">
            <a class="btn btn-fill" href={app.starter}>Get started</a>
            <a class="btn btn-line" href={app.repo}>★ GitHub</a>
          </div>
          <div class="install">
            <code><span class="sig">$</span> npm install @shaferllc/keel</code>
            <button data-copy="npm install @shaferllc/keel">copy</button>
          </div>
        </div>
        <figure class="figure">
          <HullFig version={app.version} />
          <figcaption>Hull cross-section · container-first architecture</figcaption>
        </figure>
      </section>
    </div>

    <div class="wrap">
      <section id="spec">
        <div class="sec-head">
          <div>
            <span class="kicker">Specification</span>
            <h2>Six parts. One vessel.</h2>
          </div>
          <p>Productive ergonomics on a modern TypeScript stack — small enough to read in an afternoon.</p>
        </div>
        <div class="specs">
          {FEATURES.map(([n, title, part, body]) => (
            <div class="spec">
              <div class="n">{n}</div>
              <h3>{title}<span class="part">Part · {part}</span></h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>

    <section id="lifecycle" class="blueprint">
      <div class="wrap">
        <div class="bp-grid">
          <div>
            <span class="kicker">Request lifecycle</span>
            <h2>Socket to response, one clean pass.</h2>
            <ul class="bp-list">
              {SPINE.map(([n, t, d]) => (
                <li><b>{n}</b> {t} — {d}</li>
              ))}
            </ul>
          </div>
          <SpineFig />
        </div>
      </div>
    </section>

    <div class="wrap">
      <section id="code">
        <div class="sec-head">
          <div>
            <span class="kicker">Reads clean</span>
            <h2>Routes, controllers, and DI — as you'd hope.</h2>
          </div>
          <p>No magic you can't read. The whole framework is a few hundred lines.</p>
        </div>
        <div class="sheet">
          <div class="tab"><span>app/Controllers/HomeController.ts</span><span>TS</span></div>
          <pre dangerouslySetInnerHTML={{ __html: CODE }} />
        </div>
      </section>
    </div>

    <div class="wrap">
      <section id="parts">
        <div class="sec-head">
          <div>
            <span class="kicker">Bill of materials</span>
            <h2>A framework, a starter, and this page.</h2>
          </div>
          <p>Distributed like any real framework — a library you install, plus an app that builds on it.</p>
        </div>
        <div class="bom">
          <div class="bom-row">
            <span class="p">P/N·1</span>
            <span class="nm">@shaferllc/keel</span>
            <span class="ds">The framework library — container, routing, views, helpers.</span>
            <a href={app.repo}>GitHub ↗</a>
          </div>
          <div class="bom-row">
            <span class="p">P/N·2</span>
            <span class="nm">keel-app</span>
            <span class="ds">Clone-and-go starter. Depends on the library — npm update pulls core.</span>
            <a href={app.starter}>Clone ↗</a>
          </div>
          <div class="bom-row">
            <span class="p">P/N·3</span>
            <span class="nm">keel-site</span>
            <span class="ds">This page — a Keel app running on Cloudflare Workers.</span>
            <a href={app.repo}>Source ↗</a>
          </div>
        </div>
      </section>
    </div>

    <div class="wrap">
      <section id="start">
        <div class="sec-head">
          <div>
            <span class="kicker">Up in seconds</span>
            <h2>Clone the starter and go.</h2>
          </div>
          <p>A working app with routing, views, config, and a console — ready to build on.</p>
        </div>
        <div class="term">
          <div class="bar2">bash — my-app</div>
          <pre>
<span class="cm"># start from the official starter</span>{"\n"}
<span class="pr">$</span> git clone https://github.com/shaferllc/keel-app my-app{"\n"}
<span class="pr">$</span> cd my-app && npm install{"\n"}
<span class="pr">$</span> npm run dev{"\n"}
{"\n"}
⚓ my-app listening on http://localhost:3000
          </pre>
        </div>
      </section>
    </div>

    <footer>
      <div class="wrap row">
        <span>KEEL · v{app.version} · MIT · BUILT WITH KEEL, ON CLOUDFLARE WORKERS</span>
        <nav>
          <a href={app.repo}>GitHub</a>
          <a href="/docs">Docs</a>
          <a href={app.starter}>Starter</a>
          <a href="/health">/health</a>
        </nav>
      </div>
    </footer>
  </Layout>
);
