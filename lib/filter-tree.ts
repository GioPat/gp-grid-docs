import type { PageTree } from "fumadocs-core/server";
import type { Framework } from "./framework-context";

/**
 * Filters the page tree to show only:
 * 1. Shared root-level pages (index, why)
 * 2. The selected framework's pages (flattened to root level)
 *
 * Removes React/Vue separators and the other framework's content.
 */
export function filterTreeByFramework(
  tree: PageTree.Root,
  framework: Framework
): PageTree.Root {
  const filteredChildren: PageTree.Node[] = [];

  for (const node of tree.children) {
    // Skip separators (---React---, ---Vue---)
    if (node.type === "separator") {
      continue;
    }

    // Handle folders (react, vue)
    if (node.type === "folder") {
      const folderName = node.name.toLowerCase();

      // If this is the selected framework's folder, extract its children
      if (folderName === framework) {
        // Add a separator before framework content
        filteredChildren.push({
          type: "separator",
          name: framework === "react" ? "React" : "Vue",
        });

        // Add all children from this folder to root level
        if (node.children) {
          filteredChildren.push(...node.children);
        }
      }
      // Skip the other framework's folder entirely
      continue;
    }

    // Keep all other nodes (shared pages like index, why)
    filteredChildren.push(node);
  }

  return {
    name: tree.name,
    children: filteredChildren,
  };
}
