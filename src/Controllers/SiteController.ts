import type { Ctx } from "@shaferllc/keel/core";
import { config, view } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { HomePage } from "../views/home.js";
import { ChangelogPage } from "../views/changelog.js";
import { INSTALL_SH, LLMS_TXT, LLMS_FULL_TXT, ORDER } from "../docs/generated.js";

/** Serves the Keel marketing site. */
export class SiteController {
  home(c: Ctx) {
    return view(HomePage, { app: config<AppInfo>("app") });
  }

  changelog(c: Ctx) {
    return view(ChangelogPage, { app: config<AppInfo>("app") });
  }

  /** A tiny JSON health endpoint, to show it's a real Keel app. */
  health(c: Ctx) {
    return c.json({
      ok: true,
      framework: "keel",
      version: config("app.version", "0.0.0"),
    });
  }

  /** `curl -fsSL https://keeljs.com/install.sh | bash` — MCP config installer. */
  install(c: Ctx) {
    c.header("Content-Type", "text/x-shellscript; charset=utf-8");
    c.header("Cache-Control", "public, max-age=300");
    c.header("Content-Disposition", 'inline; filename="install.sh"');
    return c.text(INSTALL_SH);
  }

  /** llms.txt — the framework's AI-readable index, doc links pointed here. */
  llms(c: Ctx) {
    c.header("Cache-Control", "public, max-age=300");
    return c.text(LLMS_TXT);
  }

  /** llms-full.txt — every guide inlined, for agents that want one fetch. */
  llmsFull(c: Ctx) {
    c.header("Cache-Control", "public, max-age=300");
    return c.text(LLMS_FULL_TXT);
  }

  robots(c: Ctx) {
    const base = config<AppInfo>("app").url;
    return c.text(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
  }

  sitemap(c: Ctx) {
    const base = config<AppInfo>("app").url;
    const paths = ["/", "/docs", ...ORDER.map((slug) => `/docs/${slug}`), "/changelog"];
    const urls = paths
      .map((p) => `  <url><loc>${base}${p}</loc></url>`)
      .join("\n");
    c.header("Content-Type", "application/xml; charset=utf-8");
    c.header("Cache-Control", "public, max-age=3600");
    return c.body(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
  }
}