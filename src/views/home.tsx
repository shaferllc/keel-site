// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout } from "./layout.js";
import type { AppInfo } from "../config.js";

const FEATURES = [
  { ico: "📦", title: "Service container", body: "bind / singleton / instance / make. Everything resolves through it — the pattern that makes apps testable and composable." },
  { ico: "🧩", title: "Service providers", body: "A register() → boot() lifecycle to configure the app in one place, with predictable ordering." },
  { ico: "🛣️", title: "Expressive routing", body: "Closures or [Controller, method] tuples resolved from the container, with full dependency injection." },
  { ico: "🖼️", title: "JSX views", body: "Type-safe Hono JSX components with layout composition. The same views run on Node and the edge." },
  { ico: "⚙️", title: "Code-generating console", body: "keel serve, keel routes, and make:controller / make:provider / make:middleware generators." },
  { ico: "☁️", title: "Edge-ready", body: "The core has no hard Node dependency, so a Keel app deploys to Cloudflare Workers — like this very site." },
];

const CODE = `<span class="c">// routes/web.ts</span>
router.<span class="k">get</span>(<span class="s">"/"</span>, [HomeController, <span class="s">"index"</span>]);
router.<span class="k">get</span>(<span class="s">"/hello/:name"</span>, (c) =&gt;
  c.text(<span class="s">\`Hello, \${c.req.param("name")}!\`</span>));

<span class="c">// A controller — resolved from the container (DI)</span>
<span class="k">export class</span> HomeController {
  <span class="k">constructor</span>(<span class="k">private</span> app: Container) {}

  index(c: Ctx) {
    <span class="k">return</span> c.json({ app: <span class="k">this</span>.app.make(Config).get(<span class="s">"app.name"</span>) });
  }
}`;

export const HomePage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title={`${app.name} — ${app.tagline}`} description={app.description}>
    <div class="wrap">
      <header class="nav">
        <div class="brand">
          ⚓ {app.name}<span>.</span>
        </div>
        <nav class="nav-links">
          <a href="#features">Features</a>
          <a href={app.docs}>Docs</a>
          <a class="gh" href={app.repo}>GitHub ↗</a>
        </nav>
      </header>

      <section class="hero">
        <span class="badge">v{app.version} · MIT licensed</span>
        <h1>The house framework for Node.</h1>
        <p class="lead">{app.description}</p>
        <div class="cta">
          <a class="btn btn-primary" href={app.repo}>
            ⭐ Star on GitHub
          </a>
          <a class="btn btn-ghost" href={app.docs}>
            Read the docs
          </a>
        </div>
        <div class="install">
          <span class="prompt">$</span>
          git clone {app.repo}.git
        </div>
      </section>

      <section id="features">
        <h2 class="section-title">Everything you reach for, none of the ceremony</h2>
        <p class="section-sub">
          Batteries-included ergonomics on a modern TypeScript stack. Small
          enough to read in an afternoon.
        </p>
        <div class="grid">
          {FEATURES.map((f) => (
            <div class="card">
              <div class="ico">{f.ico}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 class="section-title">Feels familiar. Reads clean.</h2>
        <p class="section-sub">
          Routes, controllers, and dependency injection — the way you'd hope.
        </p>
        <div class="code-wrap">
          <pre dangerouslySetInnerHTML={{ __html: CODE }} />
        </div>
      </section>

      <footer>
        <span>
          ⚓ {app.name} · Built with {app.name}, served on Cloudflare Workers.
        </span>
        <span>
          <a href={app.repo}>GitHub</a> · <a href={app.docs}>Docs</a> ·{" "}
          <a href="/health">/health</a>
        </span>
      </footer>
    </div>
  </Layout>
);
