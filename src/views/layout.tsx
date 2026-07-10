// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC, PropsWithChildren } from "hono/jsx";

const STYLES = `
  :root {
    --bg: #05070d;
    --bg-2: #080b14;
    --panel: #0c1120;
    --panel-2: #0f1526;
    --border: #1a2340;
    --border-soft: #141b30;
    --text: #e8eefb;
    --muted: #93a4c4;
    --faint: #5b6a89;
    --accent: #45e0c4;
    --accent-2: #4c9bff;
    --accent-3: #a874ff;
    --code-bg: #080c17;
    --radius: 14px;
    --maxw: 72rem;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: var(--text);
    background: var(--bg);
    line-height: 1.6;
    letter-spacing: -0.011em;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  .wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 1.5rem; }
  ::selection { background: rgba(69,224,196,.28); }

  /* ---------- background glow ---------- */
  .aura { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
  .aura::before, .aura::after {
    content: ""; position: absolute; border-radius: 50%; filter: blur(90px); opacity: .5;
  }
  .aura::before {
    width: 46rem; height: 46rem; top: -22rem; left: 50%; transform: translateX(-50%);
    background: radial-gradient(circle, rgba(76,155,255,.32), transparent 62%);
  }
  .aura::after {
    width: 34rem; height: 34rem; top: -6rem; right: -10rem;
    background: radial-gradient(circle, rgba(168,116,255,.22), transparent 60%);
  }

  /* ---------- nav ---------- */
  nav.bar {
    position: sticky; top: 0; z-index: 50;
    backdrop-filter: saturate(160%) blur(12px);
    background: rgba(5,7,13,.72);
    border-bottom: 1px solid var(--border-soft);
  }
  .bar .row { display: flex; align-items: center; justify-content: space-between; height: 4rem; }
  .logo { display: flex; align-items: center; gap: .55rem; font-weight: 700; font-size: 1.08rem; letter-spacing: -0.02em; }
  .logo .mark {
    width: 1.7rem; height: 1.7rem; display: grid; place-items: center; border-radius: 8px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #04211c; font-size: .95rem;
  }
  .bar nav { display: flex; align-items: center; gap: 1.6rem; }
  .bar nav a { color: var(--muted); font-size: .92rem; font-weight: 500; transition: color .15s; }
  .bar nav a:hover { color: var(--text); }
  .ghstar {
    display: inline-flex; align-items: center; gap: .45rem; padding: .42rem .8rem; border-radius: 8px;
    border: 1px solid var(--border); color: var(--text); font-size: .88rem; font-weight: 600;
    transition: border-color .15s, background .15s;
  }
  .ghstar:hover { border-color: var(--accent); background: rgba(69,224,196,.06); }

  /* ---------- hero ---------- */
  .hero { text-align: center; padding: 6rem 0 3rem; }
  .pill {
    display: inline-flex; align-items: center; gap: .5rem; margin-bottom: 2rem;
    padding: .38rem .85rem; border-radius: 999px; font-size: .82rem; font-weight: 500;
    color: var(--muted); border: 1px solid var(--border); background: rgba(255,255,255,.02);
  }
  .pill .dot { width: .5rem; height: .5rem; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 3px rgba(69,224,196,.18); }
  h1.title {
    font-size: clamp(2.6rem, 7vw, 4.6rem); line-height: 1.02; margin: 0 auto 1.4rem; max-width: 16ch;
    letter-spacing: -0.04em; font-weight: 800;
  }
  h1.title .grad {
    background: linear-gradient(105deg, #fff 8%, var(--accent) 52%, var(--accent-2) 96%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .lead { font-size: clamp(1.05rem, 2vw, 1.28rem); color: var(--muted); max-width: 42rem; margin: 0 auto 2.4rem; }
  .cta { display: flex; gap: .8rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.2rem; }
  .btn { display: inline-flex; align-items: center; gap: .5rem; padding: .8rem 1.4rem; border-radius: 10px; font-weight: 600; font-size: .96rem; border: 1px solid transparent; transition: transform .12s, box-shadow .2s, background .15s; }
  .btn:hover { transform: translateY(-1px); }
  .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #04211c; box-shadow: 0 8px 30px -10px rgba(69,224,196,.6); }
  .btn-primary:hover { box-shadow: 0 12px 36px -8px rgba(69,224,196,.7); }
  .btn-ghost { border-color: var(--border); color: var(--text); background: rgba(255,255,255,.02); }
  .btn-ghost:hover { border-color: var(--faint); }
  .cmd {
    display: inline-flex; align-items: center; gap: .9rem; padding: .7rem .8rem .7rem 1.1rem;
    border-radius: 10px; background: var(--code-bg); border: 1px solid var(--border);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .9rem; color: var(--text);
  }
  .cmd .sigil { color: var(--accent); }
  .cmd button {
    display: inline-grid; place-items: center; width: 1.9rem; height: 1.9rem; border-radius: 7px;
    border: 1px solid var(--border); background: var(--panel); color: var(--muted); cursor: pointer; transition: color .15s, border-color .15s;
  }
  .cmd button:hover { color: var(--accent); border-color: var(--accent); }

  /* ---------- code window ---------- */
  .window { text-align: left; max-width: 50rem; margin: 3.5rem auto 0; border-radius: var(--radius); border: 1px solid var(--border); background: linear-gradient(180deg, var(--panel-2), var(--panel)); box-shadow: 0 40px 80px -40px rgba(0,0,0,.8); overflow: hidden; }
  .window .top { display: flex; align-items: center; gap: .5rem; padding: .8rem 1rem; border-bottom: 1px solid var(--border-soft); }
  .window .top .lights { display: flex; gap: .45rem; }
  .window .top .lights i { width: .72rem; height: .72rem; border-radius: 50%; display: block; }
  .window .top .lights i:nth-child(1){ background:#ff5f57; } .window .top .lights i:nth-child(2){ background:#febc2e; } .window .top .lights i:nth-child(3){ background:#28c840; }
  .window .top .fname { margin-left: .6rem; font-size: .8rem; color: var(--faint); font-family: ui-monospace, monospace; }
  pre { margin: 0; padding: 1.4rem 1.5rem; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .86rem; line-height: 1.75; }
  pre .c { color: #5b6a89; font-style: italic; } pre .k { color: #78b7ff; } pre .s { color: var(--accent); } pre .f { color: #c9a4ff; } pre .p { color: #e8eefb; }

  /* ---------- sections ---------- */
  section { padding: 4.5rem 0; }
  .eyebrow { text-align: center; color: var(--accent); font-size: .8rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; margin-bottom: .8rem; }
  h2.h { text-align: center; font-size: clamp(1.7rem, 3.5vw, 2.4rem); letter-spacing: -0.03em; margin: 0 auto .7rem; font-weight: 800; max-width: 20ch; }
  .sub { text-align: center; color: var(--muted); max-width: 38rem; margin: 0 auto 3rem; font-size: 1.05rem; }

  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 1rem; }
  .card { position: relative; background: var(--panel); border: 1px solid var(--border-soft); border-radius: var(--radius); padding: 1.6rem; transition: border-color .18s, transform .18s, background .18s; }
  .card:hover { border-color: rgba(69,224,196,.4); transform: translateY(-3px); background: var(--panel-2); }
  .card .ic { width: 2.4rem; height: 2.4rem; border-radius: 10px; display: grid; place-items: center; margin-bottom: 1rem; color: var(--accent); background: rgba(69,224,196,.09); border: 1px solid rgba(69,224,196,.16); }
  .card h3 { margin: 0 0 .4rem; font-size: 1.08rem; font-weight: 700; letter-spacing: -0.01em; }
  .card p { margin: 0; color: var(--muted); font-size: .93rem; line-height: 1.6; }

  /* ---------- repos ---------- */
  .repos { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 1rem; }
  .repo { border: 1px solid var(--border-soft); border-radius: var(--radius); padding: 1.5rem; background: var(--panel); }
  .repo .tag { font-family: ui-monospace, monospace; font-size: .8rem; color: var(--accent); }
  .repo h4 { margin: .5rem 0 .35rem; font-size: 1.05rem; }
  .repo p { margin: 0 0 1rem; color: var(--muted); font-size: .9rem; }
  .repo a.link { color: var(--accent-2); font-size: .88rem; font-weight: 600; }
  .repo a.link:hover { text-decoration: underline; }

  /* ---------- quickstart ---------- */
  .terminal { text-align: left; max-width: 40rem; margin: 0 auto; border-radius: var(--radius); border: 1px solid var(--border); background: var(--code-bg); overflow: hidden; }
  .terminal .top { padding: .7rem 1rem; border-bottom: 1px solid var(--border-soft); display: flex; gap: .45rem; }
  .terminal .top i { width: .72rem; height: .72rem; border-radius: 50%; background: #2a3350; }
  .terminal pre { font-size: .9rem; padding: 1.3rem 1.5rem; }
  .terminal .pr { color: var(--accent); } .terminal .cm { color: var(--faint); }

  /* ---------- footer ---------- */
  footer { border-top: 1px solid var(--border-soft); padding: 3rem 0; margin-top: 2rem; }
  footer .row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  footer .muted { color: var(--faint); font-size: .88rem; }
  footer nav { display: flex; gap: 1.4rem; }
  footer nav a { color: var(--muted); font-size: .9rem; }
  footer nav a:hover { color: var(--text); }

  @media (max-width: 40rem) {
    .bar nav a.hide-sm { display: none; }
    .hero { padding-top: 4rem; }
  }
`;

const SCRIPT = `
  document.querySelectorAll('[data-copy]').forEach(function(el){
    el.addEventListener('click', function(){
      navigator.clipboard && navigator.clipboard.writeText(el.getAttribute('data-copy'));
      var t = el.textContent; el.textContent = '✓';
      setTimeout(function(){ el.textContent = t; }, 1200);
    });
  });
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
      <meta name="theme-color" content="#05070d" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </head>
    <body>
      <div class="aura" />
      {children}
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </body>
  </html>
);
