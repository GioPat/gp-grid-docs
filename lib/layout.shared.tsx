import { Logo } from "@/components/Logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

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
    githubUrl: "https://github.com/GioPat/gp-grid",
  };
}

// Options for docs layout
export function docsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      transparentMode: "top",
    },
    githubUrl: "https://github.com/GioPat/gp-grid",
  };
}
