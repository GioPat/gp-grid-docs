import { source } from "@/lib/source";
import { docsLayoutOptions } from "@/lib/layout.shared";
import { DocsLayoutClient } from "@/components/DocsLayoutClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayoutClient
      tree={source.getPageTree()}
      baseOptions={docsLayoutOptions()}
    >
      {children}
    </DocsLayoutClient>
  );
}
