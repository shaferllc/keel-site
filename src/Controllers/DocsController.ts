import { view, param, config, NotFoundException, redirect } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { PAGES } from "../docs/generated.js";
import { DocsPage } from "../views/docs.js";

/** Serves the documentation, rendered by the framework it documents. */
export class DocsController {
  index() {
    return view(DocsPage, { slug: "getting-started", app: config<AppInfo>("app") });
  }

  show() {
    let slug = param("slug");
    // Repo / changelog links often keep the .md suffix (…/docs/keel-cloud.md).
    // The site routes are extensionless — strip and redirect so bookmarks work.
    if (slug.endsWith(".md")) {
      const bare = slug.slice(0, -3);
      return redirect(bare ? `/docs/${bare}` : "/docs");
    }
    if (!PAGES[slug]) {
      throw new NotFoundException(`No documentation page for "${slug}".`);
    }
    return view(DocsPage, { slug, app: config<AppInfo>("app") });
  }
}
