import Link from "next/link";
import { GridDemo } from "@/components/GridDemo";
import { RotatingText } from "@/components/RotatingText";
import { FeatureCard } from "@/components/FeatureCard";
import { siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "gp-grid - The Fastest React & Vue Data Grid",
  description: siteConfig.description,
  openGraph: {
    title: "gp-grid - The Fastest React & Vue Data Grid",
    description: siteConfig.description,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description: siteConfig.description,
  url: siteConfig.url,
  author: {
    "@type": "Person",
    name: siteConfig.author,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  programmingLanguage: ["TypeScript", "JavaScript"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col flex-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            The Fastest{" "}
            <span className="text-fd-primary">
              <RotatingText
                interval={1000}
                words={["React", "Vue", "TypeScript"]}
              />
            </span>{" "}
            Data Grid
          </h1>
          <p className="text-lg md:text-xl text-fd-muted-foreground max-w-4xl mb-4">
            A modern, lightweight and fast data grid: no feature gating.
            Built-in virtual scrolling, column and row drag & drop, editing,
            filtering, and more.
          </p>
          <p className="text-sm text-fd-muted-foreground max-w-xl mb-8">
            Apache 2.0 licensed. Zero external dependencies. Every feature
            included for free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/docs/why"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-fd-border font-medium hover:bg-fd-accent transition-colors"
            >
              Why GP-Grid
            </Link>
          </div>
          {/* Package Registry Links */}
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <a
              href="https://www.npmjs.com/org/gp-grid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-fd-border font-medium hover:bg-fd-accent transition-colors"
              aria-label="View on NPM"
            >
              <svg viewBox="0 0 18 7" height="28" aria-hidden="true">
                <path fill="#CB3837" d="M0,0v6h5v1h4v-1h9v-6" />
                <path
                  fill="#FFF"
                  d="M1,1v4h2v-3h1v3h1v-4h1v5h2v-4h1v2h-1v1h2v-4h1v4h2v-3h1v3h1v-3h1v3h1v-4"
                />
              </svg>
            </a>
            <a
              href="https://jsr.io/@gp-grid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-fd-border font-medium hover:bg-fd-accent transition-colors"
              aria-label="View on JSR"
            >
              <svg viewBox="0 0 13 7" height="28" aria-hidden="true">
                <path d="M0,2h2v-2h7v1h4v4h-2v2h-7v-1h-4" fill="#083344" />
                <g fill="#f7df1e">
                  <path d="M1,3h1v1h1v-3h1v4h-3" />
                  <path d="M5,1h3v1h-2v1h2v3h-3v-1h2v-1h-2" />
                  <path d="M9,2h3v2h-1v-1h-1v3h-1" />
                </g>
              </svg>
            </a>
          </div>
        </section>

        {/* Demo Section */}
        <section className="px-4 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              See it in Action
            </h2>
            <p className="text-fd-muted-foreground text-center mb-8">
              Scroll, filter and sort through this sample of 1.5 million rows
              with buttery-smooth performance
            </p>
            <GridDemo />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 pb-16 md:pb-24 bg-fd-card">
          <div className="max-w-6xl mx-auto py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                feature="virtualScrolling"
                title="Virtual Scrolling"
                description="Slot-based DOM recycling maintains consistent performance regardless of dataset size."
              />
              <FeatureCard
                feature="cellManipulation"
                title="Cell Manipulation"
                description="Range selection, multi-select, and Excel-like fill and drag handle for intuitive data manipulation."
              />
              <FeatureCard
                feature="sortingFiltering"
                title="Sorting & Filtering"
                description="Multi-column sorting and powerful filtering with client-side or server-side data."
              />
              <FeatureCard
                feature="dragAndReorder"
                title="Drag & Reorder"
                description="Drag column headers to reorder, drag rows to rearrange. Full control with simple callbacks."
              />
              <FeatureCard
                feature="customRenderings"
                title="Custom Renderings"
                description="Render custom cells, edit or headers with your callbacks!"
              />
              <FeatureCard
                feature="keyboardNavigation"
                title="Keyboard Navigation"
                description="Full keyboard support for accessibility and power users."
              />
              <FeatureCard
                feature="frameworkAgnostic"
                title="Framework Agnostic"
                description="Core logic separated from UI. Official bindings for React and Vue."
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
