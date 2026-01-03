"use client";

import { usePathname } from "next/navigation";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { PageTree } from "fumadocs-core/server";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import {
  FrameworkProvider,
  getFrameworkFromPath,
} from "@/lib/framework-context";
import { filterTreeByFramework } from "@/lib/filter-tree";
import type { ReactNode } from "react";

interface DocsLayoutClientProps {
  tree: PageTree.Root;
  baseOptions: BaseLayoutProps;
  children: ReactNode;
}

export function DocsLayoutClient({
  tree,
  baseOptions,
  children,
}: DocsLayoutClientProps) {
  const pathname = usePathname();
  const framework = getFrameworkFromPath(pathname);
  const filteredTree = filterTreeByFramework(tree, framework);

  return (
    <FrameworkProvider initialFramework={framework}>
      <DocsLayout tree={filteredTree} {...baseOptions}>
        {children}
      </DocsLayout>
    </FrameworkProvider>
  );
}
