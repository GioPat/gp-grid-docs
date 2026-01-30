import { Logo } from "@/components/Logo";
import { GitHubStars } from "@/components/GitHubStars";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

const baseLinks: BaseLayoutProps["links"] = [
  {
    text: "Documentation",
    url: "/docs",
  },
  {
    text: "Demo",
    url: "https://stackblitz.com/edit/vitejs-vite-opx8yuxr?file=src%2FApp.tsx",
    external: true,
  },
  {
    text: "Support",
    url: "/support",
  },
];

const homeLinks: BaseLayoutProps["links"] = [
  ...baseLinks,
  {
    type: "custom",
    children: <GitHubStars key="github-stars" />,
    secondary: true,
  },
];

// Base options for homepage (no framework switcher)
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Logo />
          <span className="font-semibold">gp-grid</span>
        </>
      ),
      transparentMode: "top",
    },
    links: homeLinks,
  };
}

// Options for docs layout
export function docsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      transparentMode: "top",
    },
    links: baseLinks,
  };
}
