import { Logo } from "@/components/Logo";
import { GitHubStars } from "@/components/GitHubStars";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

const sharedLinks: BaseLayoutProps["links"] = [
  {
    text: "Docs",
    url: "/docs",
  },
  {
    text: "React",
    url: "/docs/react",
  },
  {
    text: "Vue",
    url: "/docs/vue",
  },
  {
    type: "custom",
    children: <GitHubStars key="github-stars" />,
    secondary: true,
    on: "nav",
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
    links: sharedLinks,
  };
}

// Options for docs layout
export function docsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      transparentMode: "top",
    },
    links: sharedLinks,
  };
}
