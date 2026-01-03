import Link from "next/link";
import { GridDemo } from "@/components/GridDemo";
import { RotatingText } from "@/components/RotatingText";
import { FeatureCard } from "@/components/FeatureCard";

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          The Fastest{" "}
          <span className="text-fd-primary">
            <RotatingText words={["React", "Vue", "TypeScript"]} />
          </span>{" "}
          Data Grid
        </h1>
        <p className="text-lg md:text-xl text-fd-muted-foreground max-w-2xl mb-8">
          A blazing-fast TypeScript data grid with virtual scrolling. Handle
          millions of rows with ease.
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
          <a
            href="https://github.com/GioPat/gp-grid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-fd-border font-medium hover:bg-fd-accent transition-colors"
          >
            View on GitHub
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
            Scroll, filter and sort through 1.5 million rows with buttery-smooth
            performance
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
  );
}
