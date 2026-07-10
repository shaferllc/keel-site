// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC, PropsWithChildren } from "hono/jsx";

const STYLES = `
  :root {
    --bg: #0a0f1a;
    --bg-soft: #0f1626;
    --panel: #131c2e;
    --border: #1e2c44;
    --text: #dce6f5;
    --muted: #8296b3;
    --accent: #38e2c8;
    --accent-2: #4a9bff;
    --code: #0c1424;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: radial-gradient(1200px 600px at 50% -10%, #12203a 0%, var(--bg) 55%);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  .wrap { max-width: 68rem; margin: 0 auto; padding: 0 1.5rem; }

  header.nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 0; border-bottom: 1px solid var(--border);
  }
  .brand { font-weight: 700; font-size: 1.15rem; letter-spacing: -0.02em; color: var(--text); }
  .brand span { color: var(--accent); }
  .nav-links { display: flex; gap: 1.5rem; align-items: center; }
  .nav-links a { color: var(--muted); font-size: .95rem; }
  .nav-links a:hover { color: var(--text); text-decoration: none; }

  .hero { text-align: center; padding: 5.5rem 0 3.5rem; }
  .badge {
    display: inline-block; font-size: .8rem; color: var(--accent);
    border: 1px solid var(--border); background: var(--panel);
    padding: .3rem .8rem; border-radius: 999px; margin-bottom: 1.75rem;
  }
  .hero h1 {
    font-size: clamp(2.4rem, 6vw, 3.8rem); line-height: 1.05; margin: 0 0 1rem;
    letter-spacing: -0.03em;
    background: linear-gradient(120deg, #fff 20%, var(--accent) 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero p.lead { font-size: 1.2rem; color: var(--muted); max-width: 40rem; margin: 0 auto 2rem; }
  .cta { display: flex; gap: .9rem; justify-content: center; flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .7rem 1.3rem; border-radius: .6rem; font-weight: 600; font-size: .95rem;
    border: 1px solid transparent; cursor: pointer;
  }
  .btn:hover { text-decoration: none; }
  .btn-primary { background: var(--accent); color: #04211c; }
  .btn-primary:hover { background: #5cf0d9; }
  .btn-ghost { background: transparent; border-color: var(--border); color: var(--text); }
  .btn-ghost:hover { border-color: var(--accent); }

  .install {
    display: inline-flex; align-items: center; gap: .75rem; margin-top: 2rem;
    background: var(--code); border: 1px solid var(--border); border-radius: .6rem;
    padding: .65rem 1rem; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: .9rem; color: var(--text);
  }
  .install .prompt { color: var(--muted); }

  section { padding: 3rem 0; }
  h2.section-title { font-size: 1.7rem; letter-spacing: -0.02em; margin: 0 0 .4rem; text-align: center; }
  p.section-sub { color: var(--muted); text-align: center; margin: 0 auto 2.5rem; max-width: 34rem; }

  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr)); gap: 1rem; }
  .card {
    background: var(--panel); border: 1px solid var(--border); border-radius: .8rem;
    padding: 1.4rem; transition: border-color .15s, transform .15s;
  }
  .card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .card .ico { font-size: 1.4rem; margin-bottom: .6rem; }
  .card h3 { margin: 0 0 .35rem; font-size: 1.05rem; }
  .card p { margin: 0; color: var(--muted); font-size: .92rem; }

  pre {
    background: var(--code); border: 1px solid var(--border); border-radius: .8rem;
    padding: 1.3rem 1.4rem; overflow-x: auto; margin: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .88rem; line-height: 1.7;
  }
  pre .c { color: var(--muted); }
  pre .k { color: var(--accent-2); }
  pre .s { color: var(--accent); }
  .code-wrap { max-width: 46rem; margin: 0 auto; }

  footer {
    border-top: 1px solid var(--border); margin-top: 2rem; padding: 2.5rem 0;
    color: var(--muted); font-size: .9rem;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
  }
  @media (max-width: 32rem) { .nav-links a:not(.gh) { display: none; } }
`;

export const Layout: FC<
  PropsWithChildren<{ title: string; description: string }>
> = ({ title, description, children }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </head>
    <body>{children}</body>
  </html>
);
