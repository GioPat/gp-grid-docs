import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { LiveDataDemo } from '@/components/LiveDataDemo';
import { CustomRenderersDemo } from '@/components/CustomRenderersDemo';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    LiveDataDemo,
    CustomRenderersDemo,
    ...components,
  };
}
