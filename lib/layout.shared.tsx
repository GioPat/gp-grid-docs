import { Logo } from "@/components/Logo";
import { FrameworkSwitcher } from "@/components/FrameworkSwitcher";
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

// Options for docs layout (with framework switcher, no text)
export function docsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      transparentMode: "top",
      children: (
        <div className="ml-4">
          <FrameworkSwitcher />
        </div>
      ),
    },
    githubUrl: "https://github.com/GioPat/gp-grid",
  };
}
