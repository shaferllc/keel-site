import type { ConfigData } from "keel/core";

export interface AppInfo {
  name: string;
  tagline: string;
  description: string;
  version: string;
  repo: string;
  docs: string;
}

/**
 * Config is passed to the container inline (no filesystem on Workers).
 * Reachable as config('app.*').
 */
export const config: ConfigData = {
  app: {
    name: "Keel",
    tagline: "A Laravel-flavored house framework for Node.js.",
    description:
      "A real service container, service providers, expressive routing, JSX views, and an artisan-style console — on a modern TypeScript stack.",
    version: "0.2.0",
    repo: "https://github.com/shaferllc/keel",
    docs: "https://github.com/shaferllc/keel/tree/main/docs",
  },
};
