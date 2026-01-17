"use client";

import { useState, useMemo, useEffect } from "react";
import { useTheme } from "next-themes";
import { Grid, type ColumnDefinition } from "gp-grid-react";

type HighlightMode = "row" | "column" | "crosshairs" | "cell";

interface DemoRow {
  id: number;
  product: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const products = [
  "Laptop Pro",
  "Wireless Mouse",
  "Mechanical Keyboard",
  "4K Monitor",
  "USB-C Hub",
  "Webcam HD",
  "Desk Lamp",
  "Ergonomic Chair",
  "Standing Desk",
  "Noise Cancelling Headphones",
  "Portable SSD",
  "Graphics Tablet",
];

const categories = ["Electronics", "Accessories", "Furniture", "Audio", "Storage"];

const columns: ColumnDefinition[] = [
  { field: "id", cellDataType: "number", width: 60, headerName: "ID" },
  { field: "product", cellDataType: "text", width: 200, headerName: "Product" },
  { field: "category", cellDataType: "text", width: 120, headerName: "Category" },
  { field: "price", cellDataType: "number", width: 100, headerName: "Price" },
  { field: "stock", cellDataType: "number", width: 80, headerName: "Stock" },
  { field: "rating", cellDataType: "number", width: 80, headerName: "Rating" },
];

function generateRows(count: number): DemoRow[] {
  const rows: DemoRow[] = new Array(count);
  for (let i = 0; i < count; i++) {
    rows[i] = {
      id: i + 1,
      product: products[i % products.length],
      category: categories[i % categories.length],
      price: Math.round((50 + Math.random() * 450) * 100) / 100,
      stock: Math.floor(Math.random() * 500),
      rating: Math.round((3 + Math.random() * 2) * 10) / 10,
    };
  }
  return rows;
}

const modeDescriptions: Record<HighlightMode, string> = {
  row: "Highlights the entire row when hovering over any cell",
  column: "Highlights the entire column when hovering over any cell",
  crosshairs: "Combines row and column highlighting for a crosshair effect",
  cell: "Highlights only the individual cell being hovered",
};

export function HighlightingDemo() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<HighlightMode>("row");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const rowData = useMemo(() => generateRows(50), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="w-full h-100 rounded-lg overflow-hidden border border-fd-border bg-fd-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mode Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["row", "column", "crosshairs", "cell"] as HighlightMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === m
              ? "bg-fd-primary text-fd-primary-foreground"
              : "border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent"
              }`}
          >
            {m === "row" && "Row Hover"}
            {m === "column" && "Column"}
            {m === "crosshairs" && "Crosshairs"}
            {m === "cell" && "Cell Hover"}
          </button>
        ))}
      </div>

      {/* Mode Description */}
      <div className="mb-4 p-3 rounded-lg bg-fd-card border border-fd-border">
        <span className="text-fd-muted-foreground text-sm">
          {modeDescriptions[mode]}
        </span>
      </div>

      {/* Grid */}
      <div className="w-full h-100 rounded-lg overflow-hidden border border-fd-border">
        <Grid<DemoRow>
          columns={columns}
          rowData={rowData}
          rowHeight={36}
          darkMode={isDark}
          headerHeight={40}
          highlighting={{
            computeRowClasses:
              mode === "row" || mode === "crosshairs"
                ? (ctx) => (ctx.rowIndex !== null && ctx.isHovered ? ["row-highlight"] : [])
                : undefined,
            computeColumnClasses:
              mode === "column" || mode === "crosshairs"
                ? (ctx) => (ctx.colIndex !== null && ctx.isHovered ? ["column-highlight"] : [])
                : undefined,
            computeCellClasses:
              mode === "cell"
                ? (ctx) => (ctx.rowIndex !== null && ctx.colIndex !== null && ctx.isHovered ? ["cell-highlight"] : [])
                : undefined,
          }}
        />
      </div>
    </div>
  );
}
