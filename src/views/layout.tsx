// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC, PropsWithChildren } from "hono/jsx";

const STYLES = `
  :root {
    --paper: #f2ede1;
    --paper-2: #eae3d4;
    --panel: #f7f3ea;
    --ink: #15222c;
    --ink-2: #45535d;
    --ink-3: #7c8790;
    --line: #cabfa9;
    --rule: #c8bda8;
    --accent: #d5462a;
    --accent-ink: #a8341d;
    --navy: #102a40;
    --cyan: #7fc4d8;
    --serif: "Fraunces", Georgia, "Times New Roman", serif;
    --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body {
    margin: 0; background: var(--paper); color: var(--ink);
    font-family: var(--sans); line-height: 1.6; letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
    background-image:
      linear-gradient(var(--rule) 1px, transparent 1px),
      linear-gradient(90deg, var(--rule) 1px, transparent 1px);
    background-size: 28px 28px;
    background-position: -1px -1px;
  }
  body::before { /* wash to fade the grid */
    content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
    background: radial-gradient(120% 80% at 50% 0%, rgba(242,237,225,.35), var(--paper) 60%);
  }
  a { color: inherit; text-decoration: none; }
  ::selection { background: rgba(213,70,42,.22); }
  .wrap { max-width: 74rem; margin: 0 auto; padding: 0 2rem; }
  .mono { font-family: var(--mono); }

  /* ---------- drafting frame ---------- */
  .frame { position: fixed; inset: 14px; border: 1px solid var(--rule); pointer-events: none; z-index: 40; }
  .frame span { position: absolute; width: 13px; height: 13px; color: var(--ink-3); }
  .frame span::before, .frame span::after { content: ""; position: absolute; background: var(--ink-3); }
  .frame span::before { left: 6px; top: 0; width: 1px; height: 13px; }
  .frame span::after { top: 6px; left: 0; height: 1px; width: 13px; }
  .frame .tl { top: -7px; left: -7px; } .frame .tr { top: -7px; right: -7px; }
  .frame .bl { bottom: -7px; left: -7px; } .frame .br { bottom: -7px; right: -7px; }
  @media (max-width: 48rem){ .frame { inset: 8px; } }

  /* ---------- nav ---------- */
  header.bar { border-bottom: 1px solid var(--rule); background: rgba(242,237,225,.85); backdrop-filter: blur(6px); position: sticky; top: 0; z-index: 30; }
  .bar .row { display: flex; align-items: center; justify-content: space-between; height: 4.2rem; }
  .brand { display: flex; align-items: baseline; gap: .6rem; }
  .brand b { font-family: var(--serif); font-weight: 600; font-size: 1.5rem; letter-spacing: -0.02em; }
  .brand .no { font-family: var(--mono); font-size: .68rem; color: var(--ink-3); letter-spacing: .05em; }
  .bar nav { display: flex; align-items: center; gap: 1.8rem; font-family: var(--mono); font-size: .76rem; letter-spacing: .04em; text-transform: uppercase; }
  .bar nav a { color: var(--ink-2); transition: color .15s; }
  .bar nav a:hover { color: var(--accent); }
  .bar .gh { border: 1px solid var(--ink); padding: .45rem .8rem; color: var(--ink); }
  .bar .gh:hover { background: var(--ink); color: var(--paper); }

  /* ---------- eyebrow / labels ---------- */
  .kicker { font-family: var(--mono); font-size: .74rem; letter-spacing: .18em; text-transform: uppercase; color: var(--accent-ink); display: inline-flex; align-items: center; gap: .6rem; }
  .kicker::before { content: "◆"; font-size: .6rem; }

  /* ---------- hero ---------- */
  .hero { padding: 4.5rem 0 3rem; display: grid; grid-template-columns: 1.05fr .95fr; gap: 3rem; align-items: center; }
  .hero h1 { font-family: var(--serif); font-weight: 400; font-size: clamp(3rem, 6.5vw, 5.4rem); line-height: .98; letter-spacing: -0.03em; margin: 1.6rem 0 1.4rem; }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero .lead { font-size: 1.16rem; color: var(--ink-2); max-width: 34rem; margin: 0 0 2rem; }
  .cta { display: flex; gap: .8rem; flex-wrap: wrap; align-items: center; }
  .btn { display: inline-flex; align-items: center; gap: .5rem; font-family: var(--mono); font-size: .82rem; letter-spacing: .03em; text-transform: uppercase; padding: .85rem 1.35rem; border: 1px solid var(--ink); transition: transform .12s, background .15s, color .15s; }
  .btn-fill { background: var(--ink); color: var(--paper); }
  .btn-fill:hover { background: var(--accent); border-color: var(--accent); }
  .btn-line:hover { background: var(--ink); color: var(--paper); }
  .install { margin-top: 1.8rem; display: inline-flex; align-items: stretch; border: 1px solid var(--rule); background: var(--panel); font-family: var(--mono); font-size: .86rem; }
  .install code { padding: .7rem 1rem; color: var(--ink); }
  .install .sig { color: var(--accent); }
  .install button { border: none; border-left: 1px solid var(--rule); background: transparent; padding: 0 .9rem; cursor: pointer; color: var(--ink-3); font-family: var(--mono); }
  .install button:hover { color: var(--accent); background: var(--paper-2); }

  /* schematic caption */
  .figure { position: relative; }
  .figure figcaption { font-family: var(--mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); text-align: center; margin-top: .8rem; }
  svg .stroke { stroke: var(--ink); fill: none; }
  svg .thin { stroke: var(--ink-3); fill: none; }
  svg .acc { stroke: var(--accent); fill: none; }
  svg .accf { fill: var(--accent); }
  svg .lbl { font-family: var(--mono); font-size: 9px; letter-spacing: .06em; fill: var(--ink-2); text-transform: uppercase; }
  svg .lblk { font-family: var(--mono); font-size: 9px; letter-spacing: .06em; fill: var(--accent-ink); }
  svg .wl { stroke: var(--ink-3); stroke-dasharray: 4 3; fill: none; }

  /* ---------- section scaffold ---------- */
  section { padding: 4.5rem 0; border-top: 1px solid var(--rule); }
  .sec-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 2.6rem; flex-wrap: wrap; }
  .sec-head h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.02em; margin: .6rem 0 0; max-width: 20ch; }
  .sec-head .idx { font-family: var(--mono); font-size: .78rem; color: var(--ink-3); letter-spacing: .1em; }
  .sec-head p { font-family: var(--sans); color: var(--ink-2); max-width: 26rem; margin: 0; font-size: 1rem; }

  /* ---------- feature spec list ---------- */
  .specs { border-top: 1px solid var(--ink); }
  .spec { display: grid; grid-template-columns: 4rem 1fr 1.4fr; gap: 1.5rem; padding: 1.6rem 0; border-bottom: 1px solid var(--rule); align-items: start; transition: background .15s; }
  .spec:hover { background: var(--panel); }
  .spec .n { font-family: var(--mono); font-size: .82rem; color: var(--accent); padding-top: .2rem; }
  .spec h3 { font-family: var(--serif); font-weight: 500; font-size: 1.35rem; margin: 0; letter-spacing: -0.01em; }
  .spec h3 .part { display: block; font-family: var(--mono); font-size: .66rem; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); margin-top: .3rem; }
  .spec p { margin: 0; color: var(--ink-2); font-size: .98rem; }

  /* ---------- blueprint band ---------- */
  .blueprint { background: var(--navy); color: #cfe6ee; border-top: 1px solid var(--navy); position: relative; }
  .blueprint::before { content: ""; position: absolute; inset: 0; opacity: .5; pointer-events: none;
    background-image: linear-gradient(rgba(127,196,216,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(127,196,216,.14) 1px, transparent 1px);
    background-size: 26px 26px; }
  .blueprint .wrap { position: relative; }
  .blueprint .kicker { color: var(--cyan); }
  .blueprint .kicker::before { color: var(--cyan); }
  .blueprint h2 { font-family: var(--serif); font-weight: 400; color: #eaf6fa; font-size: clamp(2rem,4vw,3rem); margin: .8rem 0 1rem; letter-spacing: -0.02em; }
  .bp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .bp-list { list-style: none; padding: 0; margin: 1.5rem 0 0; }
  .bp-list li { display: flex; gap: 1rem; padding: .7rem 0; border-bottom: 1px solid rgba(127,196,216,.18); font-family: var(--mono); font-size: .84rem; color: #bcdae4; }
  .bp-list li b { color: var(--cyan); font-weight: 500; min-width: 2.2rem; }
  svg .bp { stroke: var(--cyan); fill: none; }
  svg .bpf { fill: #f2ede1; }
  svg .bplbl { font-family: var(--mono); font-size: 9px; fill: #9fc9d6; letter-spacing: .06em; }

  /* ---------- code ---------- */
  .sheet { border: 1px solid var(--ink); background: var(--panel); }
  .sheet .tab { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--rule); padding: .6rem 1rem; font-family: var(--mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
  .sheet pre { margin: 0; padding: 1.4rem 1.6rem; overflow-x: auto; font-family: var(--mono); font-size: .84rem; line-height: 1.85; color: var(--ink); }
  pre .c { color: var(--ink-3); font-style: italic; } pre .k { color: var(--accent-ink); } pre .s { color: #1d6a4f; } pre .f { color: var(--navy); }

  /* ---------- bill of materials (repos) ---------- */
  .bom { border-top: 1px solid var(--ink); }
  .bom-row { display: grid; grid-template-columns: 3rem 1fr 2fr auto; gap: 1.5rem; align-items: center; padding: 1.4rem 0; border-bottom: 1px solid var(--rule); }
  .bom-row .p { font-family: var(--mono); font-size: .8rem; color: var(--accent); }
  .bom-row .nm { font-family: var(--mono); font-size: .92rem; }
  .bom-row .ds { color: var(--ink-2); font-size: .95rem; }
  .bom-row a { font-family: var(--mono); font-size: .76rem; text-transform: uppercase; letter-spacing: .05em; border-bottom: 1px solid var(--accent); color: var(--accent-ink); padding-bottom: 2px; }
  .bom-row a:hover { color: var(--accent); }

  /* ---------- terminal ---------- */
  .term { border: 1px solid var(--ink); background: #12201a; color: #cfe8d8; font-family: var(--mono); font-size: .86rem; max-width: 46rem; }
  .term .bar2 { border-bottom: 1px solid rgba(207,232,216,.16); padding: .55rem .9rem; font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: #7fb99a; }
  .term pre { margin: 0; padding: 1.2rem 1.4rem; overflow-x: auto; }
  .term .pr { color: #6fd39a; } .term .cm { color: #5c7a68; }

  /* ---------- footer ---------- */
  footer { border-top: 1px solid var(--ink); padding: 2.6rem 0; }
  footer .row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; font-family: var(--mono); font-size: .78rem; color: var(--ink-3); letter-spacing: .03em; }
  footer nav { display: flex; gap: 1.5rem; }
  footer nav a:hover { color: var(--accent); }

  /* ---------- docs ---------- */
  .docs { display: grid; grid-template-columns: 15rem 1fr; gap: 3.5rem; padding: 2.6rem 0 4rem; align-items: start; }
  .docnav { position: sticky; top: 5.6rem; font-size: .9rem; }
  .docnav .grp { margin-bottom: 1.6rem; }
  .docnav .grp > span { font-family: var(--mono); font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-3); display: block; margin-bottom: .6rem; }
  .docnav a { display: block; padding: .28rem 0 .28rem .8rem; color: var(--ink-2); border-left: 2px solid var(--rule); transition: color .12s, border-color .12s; }
  .docnav a:hover { color: var(--ink); }
  .docnav a.on { color: var(--accent-ink); border-left-color: var(--accent); font-weight: 600; }
  .docmenu summary { display: none; } /* desktop: nav always expanded, no toggle */
  .doc-main { min-width: 0; max-width: 44rem; }
  .crumb { font-family: var(--mono); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); margin-bottom: .8rem; }
  .doc-main h1 { font-family: var(--serif); font-weight: 400; font-size: clamp(2.2rem, 4vw, 3.2rem); letter-spacing: -0.025em; margin: 0 0 .6rem; line-height: 1.05; }
  .doc-lead { font-size: 1.15rem; color: var(--ink-2); margin: 0 0 2rem; padding-bottom: 1.6rem; border-bottom: 1px solid var(--rule); }
  .doc-h { font-family: var(--serif); font-weight: 500; font-size: 1.5rem; letter-spacing: -0.01em; margin: 2.4rem 0 .8rem; }
  .doc-p { color: var(--ink); font-size: 1.02rem; margin: 0 0 1.1rem; }
  .doc-p a, .doc-note a { color: var(--accent-ink); border-bottom: 1px solid var(--accent); }
  .doc-p a:hover { color: var(--accent); }
  .doc-p code, .doc-note code, .doc-list code { font-family: var(--mono); font-size: .86em; background: var(--paper-2); border: 1px solid var(--rule); border-radius: 4px; padding: .06rem .3rem; }
  .doc-list { margin: 0 0 1.2rem; padding-left: 1.1rem; }
  .doc-list li { color: var(--ink); font-size: 1.02rem; margin-bottom: .5rem; }
  .doc-list li::marker { color: var(--accent); }
  .doc-note { border-left: 3px solid var(--accent); background: var(--panel); padding: .9rem 1.1rem; margin: 0 0 1.3rem; font-size: .96rem; color: var(--ink-2); }
  .doc-code { border: 1px solid var(--ink); background: var(--panel); margin: 0 0 1.4rem; }
  .doc-code .fn { font-family: var(--mono); font-size: .7rem; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); border-bottom: 1px solid var(--rule); padding: .5rem .9rem; }
  .doc-code pre { margin: 0; padding: 1.1rem 1.2rem; overflow-x: auto; font-family: var(--mono); font-size: .84rem; line-height: 1.75; color: var(--ink); }
  /* Rendered-markdown body (docs are the keel repo's docs/*.md, rendered at build) */
  .doc-body { min-width: 0; }
  .doc-body h1 { font-family: var(--serif); font-weight: 400; font-size: clamp(2.2rem, 4vw, 3.2rem); letter-spacing: -0.025em; margin: 0 0 1.4rem; line-height: 1.05; }
  .doc-body h2 { font-family: var(--serif); font-weight: 500; font-size: 1.7rem; letter-spacing: -0.015em; margin: 2.8rem 0 .9rem; padding-top: 1.4rem; border-top: 1px solid var(--rule); }
  .doc-body h3 { font-family: var(--serif); font-weight: 500; font-size: 1.32rem; margin: 2rem 0 .7rem; }
  .doc-body h4 { font-family: var(--mono); font-weight: 500; font-size: .96rem; letter-spacing: -0.01em; margin: 1.7rem 0 .6rem; color: var(--ink); }
  .doc-body h4 code, .doc-body h3 code { background: none; border: none; padding: 0; font-size: 1em; }
  .doc-body p { color: var(--ink); font-size: 1.02rem; margin: 0 0 1.1rem; }
  .doc-body a { color: var(--accent-ink); border-bottom: 1px solid var(--accent); }
  .doc-body a:hover { color: var(--accent); }
  .doc-body strong { font-weight: 650; }
  .doc-body code { font-family: var(--mono); font-size: .86em; background: var(--paper-2); border: 1px solid var(--rule); border-radius: 4px; padding: .06rem .3rem; }
  .doc-body pre { border: 1px solid var(--ink); background: var(--panel); margin: 0 0 1.4rem; padding: 1.1rem 1.2rem; overflow-x: auto; }
  .doc-body pre code { font-family: var(--mono); font-size: .84rem; line-height: 1.75; color: var(--ink); background: none; border: none; padding: 0; border-radius: 0; }
  .doc-body ul, .doc-body ol { margin: 0 0 1.3rem; padding-left: 1.3rem; }
  .doc-body li { margin: .3rem 0; }
  .doc-body blockquote { border-left: 3px solid var(--accent); background: var(--panel); padding: .9rem 1.1rem; margin: 0 0 1.3rem; font-size: .96rem; color: var(--ink-2); }
  .doc-body blockquote p:last-child { margin-bottom: 0; }
  .doc-body table { width: 100%; border-collapse: collapse; margin: 0 0 1.4rem; font-size: .94rem; display: block; overflow-x: auto; }
  .doc-body th, .doc-body td { border: 1px solid var(--rule); padding: .5rem .7rem; text-align: left; vertical-align: top; }
  .doc-body th { background: var(--paper-2); font-weight: 600; }
  .doc-body hr { border: none; border-top: 1px solid var(--rule); margin: 2.4rem 0; }
  .doc-body h2:first-child, .doc-body h3:first-child { margin-top: 0; border-top: none; padding-top: 0; }
  .doc-foot { display: flex; justify-content: space-between; gap: 1rem; margin-top: 3rem; border-top: 1px solid var(--ink); padding-top: 1.4rem; }
  .doc-foot a { font-family: var(--mono); font-size: .82rem; color: var(--ink-2); }
  .doc-foot a:hover { color: var(--accent); }
  .doc-foot .nx { text-align: right; }
  .doc-foot .lb { display: block; font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); margin-bottom: .2rem; }
  .lnk { color: var(--accent-ink); border-bottom: 1px solid var(--accent); }
  .lnk:hover { color: var(--accent); }

  /* ---------- changelog ---------- */
  .log { border-top: 1px solid var(--ink); }
  .rel { display: grid; grid-template-columns: 12rem 1fr; gap: 2rem; padding: 1.8rem 0; border-bottom: 1px solid var(--rule); }
  .rel-meta { display: flex; flex-direction: column; gap: .3rem; }
  .rel-meta .ver { font-family: var(--serif); font-size: 1.5rem; color: var(--accent); }
  .rel-meta .date { font-family: var(--mono); font-size: .72rem; letter-spacing: .06em; color: var(--ink-3); }
  .rel-body h3 { font-family: var(--serif); font-weight: 500; font-size: 1.2rem; margin: 0 0 .6rem; }
  .rel-body ul { margin: 0; padding-left: 1.1rem; }
  .rel-body li { color: var(--ink-2); font-size: .96rem; margin-bottom: .4rem; }
  .rel-body li::marker { color: var(--accent); }

  @media (max-width: 54rem) {
    .rel { grid-template-columns: 1fr; gap: .6rem; }
    .docs { grid-template-columns: 1fr; gap: 1.5rem; }
    .docnav { position: static; padding-bottom: 0; }
    .hero { grid-template-columns: 1fr; gap: 2.5rem; }
    .hero .figure { order: -1; max-width: 22rem; }
    .bp-grid { grid-template-columns: 1fr; gap: 2rem; }
    .spec { grid-template-columns: 2.5rem 1fr; }
    .spec p { grid-column: 2; }
    .bom-row { grid-template-columns: 2rem 1fr; gap: .4rem 1rem; }
    .bom-row .ds, .bom-row a { grid-column: 2; }
    .bar nav a.hidesm { display: none; }

    /* collapsible docs nav — toggles open on tap, saves a long scroll */
    .docmenu { border: 1px solid var(--rule); background: var(--panel); }
    .docmenu[open] { padding-bottom: .8rem; }
    .docmenu summary {
      display: flex; align-items: center; justify-content: space-between;
      list-style: none; cursor: pointer; padding: .8rem 1rem;
      font-family: var(--mono); font-size: .74rem; letter-spacing: .12em;
      text-transform: uppercase; color: var(--ink-2);
    }
    .docmenu summary::-webkit-details-marker { display: none; }
    .docmenu summary::after { content: "▾"; color: var(--ink-3); transition: transform .15s; }
    .docmenu[open] summary::after { transform: rotate(180deg); }
    .docmenu .grp { padding: 0 1rem; margin-bottom: 1.1rem; }
    .docmenu .grp:first-of-type { margin-top: .4rem; }
  }

  /* ---------- small phones ---------- */
  @media (max-width: 40rem) {
    .wrap { padding: 0 1.2rem; }
    section { padding: 3.2rem 0; }
    .hero { padding: 2.6rem 0 1rem; }
    .install { display: flex; max-width: 100%; margin-top: 1.4rem; }
    .install code { min-width: 0; overflow-x: auto; white-space: nowrap; }
    .install button { flex: none; }
    .bar .row { height: 3.6rem; }
    .brand b { font-size: 1.3rem; }
    .sheet pre, .doc-code pre, .term pre { font-size: .78rem; }
    .doc-foot { flex-direction: column; gap: 1.4rem; }
    .doc-foot .nx { text-align: left; }
  }
`;

// Hull + vermilion keel mark, inlined as a data-URI favicon.
const FAVICON =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>" +
  "<rect width='32' height='32' rx='7' fill='#15222c'/>" +
  "<path d='M8 8 C8 20 12 25 16 25 C20 25 24 20 24 8' fill='none' stroke='#f2ede1' stroke-width='2.4' stroke-linecap='round'/>" +
  "<path d='M13.6 24 L13.6 28 Q16 30.4 18.4 28 L18.4 24 Z' fill='#d5462a'/></svg>";
const FAVICON_HREF = `data:image/svg+xml,${encodeURIComponent(FAVICON)}`;

const SCRIPT = `
  document.querySelectorAll('[data-copy]').forEach(function(el){
    el.addEventListener('click', function(){
      navigator.clipboard && navigator.clipboard.writeText(el.getAttribute('data-copy'));
      var t = el.textContent; el.textContent = 'copied'; el.style.color='#d5462a';
      setTimeout(function(){ el.textContent = t; el.style.color=''; }, 1100);
    });
  });

  // Docs nav: collapsed by default on phones, always open on wider screens.
  var dm = document.querySelector('.docmenu');
  if (dm) {
    var mq = window.matchMedia('(max-width: 54rem)');
    var sync = function(){ mq.matches ? dm.removeAttribute('open') : dm.setAttribute('open',''); };
    sync();
    mq.addEventListener('change', sync);
  }
`;

/** The shared top navigation, so every page's menu stays identical. */
export const SiteNav: FC<{ version: string; repo: string }> = ({ version, repo }) => (
  <header class="bar">
    <div class="wrap row">
      <a class="brand" href="/">
        <b>Keel</b>
        <span class="no">v{version}</span>
      </a>
      <nav>
        <a class="hidesm" href="/#spec">Spec</a>
        <a class="hidesm" href="/#lifecycle">Lifecycle</a>
        <a href="/docs">Docs</a>
        <a href="/changelog">Changelog</a>
        <a class="gh" href={repo}>GitHub ↗</a>
      </nav>
    </div>
  </header>
);

export const Layout: FC<
  PropsWithChildren<{ title: string; description: string; url?: string }>
> = ({ title, description, url, children }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta name="theme-color" content="#f2ede1" />
      <link rel="icon" href={FAVICON_HREF} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </head>
    <body>
      <div class="frame">
        <span class="tl" /><span class="tr" /><span class="bl" /><span class="br" />
      </div>
      {children}
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </body>
  </html>
);
