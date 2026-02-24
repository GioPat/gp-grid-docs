import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { LiveDataDemo } from '@/components/LiveDataDemo';
import { CustomRenderersDemo } from '@/components/CustomRenderersDemo';
import { HighlightingDemo } from '@/components/HighlightingDemo';
import { BenchmarkGrid } from '@/components/BenchmarkGrid';
import { ColumnDraggingDemo } from '@/components/ColumnDraggingDemo';
import { RowDraggingDemo } from '@/components/RowDraggingDemo';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    LiveDataDemo,
    CustomRenderersDemo,
    HighlightingDemo,
    BenchmarkGrid,
    ColumnDraggingDemo,
    RowDraggingDemo,
    ...components,
  };
}
