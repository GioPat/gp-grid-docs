import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { LiveDataDemo } from '@/components/LiveDataDemo';
import { CustomRenderersDemo } from '@/components/CustomRenderersDemo';
import { HighlightingDemo } from '@/components/HighlightingDemo';
import { BenchmarkGrid } from '@/components/BenchmarkGrid';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    LiveDataDemo,
    CustomRenderersDemo,
    HighlightingDemo,
    BenchmarkGrid,
    ...components,
  };
}
