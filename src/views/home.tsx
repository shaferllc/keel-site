// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout } from "./layout.js";
import type { AppInfo } from "../config.js";

/* ---------- inline icons (feather-style) ---------- */
const Icon: FC<{ d: string }> = ({ d }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <path d={d} />
  </svg>
);

const FEATURES = [
  { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12", title: "Service container", body: "bind / singleton / instance / make. Everything resolves through one registry — the pattern that keeps apps testable and composable." },
  { d: "M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5", title: "Service providers", body: "A register() → boot() lifecycle configures your app in one place, with predictable ordering across providers." },
  { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0", title: "Expressive routing", body: "Closures or [Controller, method] tuples resolved from the container, with full dependency injection." },
  { d: "M2 3h20v14H2z M8 21h8 M12 17v4", title: "JSX views", body: "Type-safe Hono JSX components with layout composition. view(Page, props) renders in one call — same code on Node and the edge." },
  { d: "m4 17 6-6-6-6 M12 19h8", title: "A real console", body: "keel serve, keel routes, and make:controller / make:provider / make:middleware generators — living in your app." },
  { d: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z", title: "Runs on the edge", body: "The core has no hard Node dependency, so a Keel app deploys to Cloudflare Workers — this very site does." },
];

const CODE = `<span class="c">// routes/web.ts — closures or [Controller, method]</span>
router.<span class="f">get</span>(<span class="s">"/"</span>, [HomeController, <span class="s">"index"</span>]);
router.<span class="f">get</span>(<span class="s">"/hello/:name"</span>, (c) =&gt; c.<span class="f">text</span>(
  <span class="s">\`Hello, \${c.req.param("name")}!\`</span>));

<span class="c">// A controller — resolved from the container (DI)</span>
<span class="k">export class</span> <span class="f">HomeController</span> {
  <span class="f">index</span>(c: Ctx) {
    <span class="k">return</span> c.<span class="f">json</span>({ app: <span class="f">config</span>(<span class="s">"app.name"</span>) });
  }

  <span class="f">welcome</span>(c: Ctx) {
    <span class="k">return</span> <span class="f">view</span>(WelcomePage, { name: <span class="f">config</span>(<span class="s">"app.name"</span>) });
  }
}`;

const REPOS = (app: AppInfo) => [
  { tag: "@shaferllc/keel", title: "The framework", body: "The library — container, routing, views, and helpers. Install it, import from /core.", href: app.repo, link: "View framework →" },
  { tag: "keel-app", title: "The starter", body: "Clone-and-go skeleton. Depends on the framework, so npm update pulls core improvements.", href: app.starter, link: "Clone the starter →" },
  { tag: "keel-site", title: "This site", body: "A Keel app running on Cloudflare Workers. The framework rendering its own homepage.", href: app.repo, link: "It's dogfood →" },
];

export const HomePage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title={`${app.name} — ${app.tagline}`} description={app.description} url={app.url}>
    <nav class="bar">
      <div class="wrap row">
        <a class="logo" href="/">
          <span class="mark">⚓</span> {app.name}
        </a>
        <nav>
          <a class="hide-sm" href="#features">Features</a>
          <a class="hide-sm" href="#code">Code</a>
          <a href={app.docs}>Docs</a>
          <a class="ghstar" href={app.repo}>★ GitHub</a>
        </nav>
      </div>
    </nav>

    <header class="hero wrap">
      <span class="pill">
        <span class="dot" /> v{app.version} · MIT · runs on Node &amp; the edge
      </span>
      <h1 class="title">
        The house framework <br /> <span class="grad">for Node.js.</span>
      </h1>
      <p class="lead">{app.description}</p>
      <div class="cta">
        <a class="btn btn-primary" href={app.starter}>Get started →</a>
        <a class="btn btn-ghost" href={app.repo}>★ Star on GitHub</a>
      </div>
      <div class="cmd">
        <span><span class="sigil">$</span> npm install @shaferllc/keel</span>
        <button data-copy="npm install @shaferllc/keel" title="Copy">⧉</button>
      </div>

      <div class="window">
        <div class="top">
          <span class="lights"><i /><i /><i /></span>
          <span class="fname">HomeController.ts</span>
        </div>
        <pre dangerouslySetInnerHTML={{ __html: CODE }} />
      </div>
    </header>

    <section id="features" class="wrap">
      <div class="eyebrow">Batteries included</div>
      <h2 class="h">Everything you reach for, none of the ceremony</h2>
      <p class="sub">Productive ergonomics on a modern TypeScript stack — small enough to read in an afternoon.</p>
      <div class="grid">
        {FEATURES.map((f) => (
          <div class="card">
            <div class="ic"><Icon d={f.d} /></div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section id="code" class="wrap">
      <div class="eyebrow">Three repos, one idea</div>
      <h2 class="h">A framework, a starter, and proof it works</h2>
      <p class="sub">Keel is distributed like any real framework — a library you install, plus an app that builds on it.</p>
      <div class="repos">
        {REPOS(app).map((r) => (
          <div class="repo">
            <div class="tag">{r.tag}</div>
            <h4>{r.title}</h4>
            <p>{r.body}</p>
            <a class="link" href={r.href}>{r.link}</a>
          </div>
        ))}
      </div>
    </section>

    <section class="wrap">
      <div class="eyebrow">Up in seconds</div>
      <h2 class="h">Clone the starter and go</h2>
      <p class="sub">A working app with routing, views, config, and a console — ready to build on.</p>
      <div class="terminal">
        <div class="top"><i /><i /><i /></div>
        <pre>
<span class="cm"># start from the official starter</span>{"\n"}
<span class="pr">$</span> git clone https://github.com/shaferllc/keel-app my-app{"\n"}
<span class="pr">$</span> cd my-app &amp;&amp; npm install{"\n"}
<span class="pr">$</span> npm run dev{"\n"}
{"\n"}
⚓ my-app listening on http://localhost:3000
        </pre>
      </div>
    </section>

    <footer>
      <div class="wrap row">
        <span class="muted">⚓ {app.name} · Built with {app.name}, served on Cloudflare Workers.</span>
        <nav>
          <a href={app.repo}>GitHub</a>
          <a href={app.docs}>Docs</a>
          <a href={app.starter}>Starter</a>
          <a href="/health">/health</a>
        </nav>
      </div>
    </footer>
  </Layout>
);
