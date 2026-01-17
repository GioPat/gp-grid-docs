"use client";

import { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Grid, type ColumnDefinition } from "gp-grid-react";
import {
  type ScrollBenchmarkRow,
  type RenderBenchmarkRow,
  type SortFilterBenchmarkRow,
  type MemoryBenchmarkRow,
  scrollPerformance10k,
  scrollPerformance100k,
  scrollPerformance1m,
  renderPerformance10k,
  renderPerformance100k,
  renderPerformance1m,
  sortFilterPerformance10k,
  sortFilterPerformance100k,
  sortFilterPerformance1m,
  memoryUsage10k,
  memoryUsage100k,
  memoryUsage1m,
} from "@/lib/benchmark-data";

type BenchmarkCategory = "scroll" | "render" | "sortFilter" | "memory";
type RowSize = "10k" | "100k" | "1m";

interface BenchmarkGridProps {
  category: BenchmarkCategory;
  rowSize: RowSize;
}

const scrollColumns: ColumnDefinition[] = [
  { field: "grid", cellDataType: "text", width: 140, headerName: "Grid" },
  { field: "avgFps", cellDataType: "number", width: 120, headerName: "Avg FPS" },
  { field: "minFps", cellDataType: "number", width: 120, headerName: "Min FPS" },
  { field: "frameDrops", cellDataType: "number", width: 120, headerName: "Frame Drops" },
  { field: "p95Fps", cellDataType: "number", width: 120, headerName: "P95 FPS" },
];

const renderColumns: ColumnDefinition[] = [
  { field: "grid", cellDataType: "text", width: 140, headerName: "Grid" },
  { field: "firstPaint", cellDataType: "text", width: 120, headerName: "First Paint" },
  { field: "fullRender", cellDataType: "text", width: 120, headerName: "Full Render" },
  { field: "lcp", cellDataType: "text", width: 100, headerName: "LCP" },
  { field: "tbt", cellDataType: "text", width: 100, headerName: "TBT" },
];

const sortFilterColumns: ColumnDefinition[] = [
  { field: "grid", cellDataType: "text", width: 140, headerName: "Grid" },
  { field: "sortAsc", cellDataType: "text", width: 110, headerName: "Sort Asc" },
  { field: "sortDesc", cellDataType: "text", width: 110, headerName: "Sort Desc" },
  { field: "textFilter", cellDataType: "text", width: 110, headerName: "Text Filter" },
  { field: "numberFilter", cellDataType: "text", width: 120, headerName: "Number Filter" },
];

const memoryColumns: ColumnDefinition[] = [
  { field: "grid", cellDataType: "text", width: 140, headerName: "Grid" },
  { field: "afterLoad", cellDataType: "text", width: 110, headerName: "After Load" },
  { field: "peak", cellDataType: "text", width: 110, headerName: "Peak" },
  { field: "growth", cellDataType: "number", width: 130, headerName: "Growth (MB/1K)" },
  { field: "retained", cellDataType: "text", width: 100, headerName: "Retained" },
];

function getColumns(category: BenchmarkCategory): ColumnDefinition[] {
  switch (category) {
    case "scroll":
      return scrollColumns;
    case "render":
      return renderColumns;
    case "sortFilter":
      return sortFilterColumns;
    case "memory":
      return memoryColumns;
  }
}

function getData(
  category: BenchmarkCategory,
  rowSize: RowSize
): ScrollBenchmarkRow[] | RenderBenchmarkRow[] | SortFilterBenchmarkRow[] | MemoryBenchmarkRow[] {
  switch (category) {
    case "scroll":
      return rowSize === "10k"
        ? scrollPerformance10k
        : rowSize === "100k"
          ? scrollPerformance100k
          : scrollPerformance1m;
    case "render":
      return rowSize === "10k"
        ? renderPerformance10k
        : rowSize === "100k"
          ? renderPerformance100k
          : renderPerformance1m;
    case "sortFilter":
      return rowSize === "10k"
        ? sortFilterPerformance10k
        : rowSize === "100k"
          ? sortFilterPerformance100k
          : sortFilterPerformance1m;
    case "memory":
      return rowSize === "10k"
        ? memoryUsage10k
        : rowSize === "100k"
          ? memoryUsage100k
          : memoryUsage1m;
  }
}

// Format FPS values to 2 decimal places
function formatScrollData(data: ScrollBenchmarkRow[]): ScrollBenchmarkRow[] {
  return data.map((row) => ({
    ...row,
    avgFps: Math.round(row.avgFps * 100) / 100,
    minFps: Math.round(row.minFps * 100) / 100,
    p95Fps: Math.round(row.p95Fps * 100) / 100,
  }));
}

export function BenchmarkGrid({ category, rowSize }: BenchmarkGridProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const columns = useMemo(() => getColumns(category), [category]);
  const rawData = useMemo(() => getData(category, rowSize), [category, rowSize]);
  const rowData = useMemo(() => {
    if (category === "scroll") {
      return formatScrollData(rawData as ScrollBenchmarkRow[]);
    }
    return rawData;
  }, [category, rawData]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="w-full h-[180px] rounded-lg overflow-hidden border border-fd-border bg-fd-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full my-4">
      <div className="w-full h-[180px] rounded-lg overflow-hidden border border-fd-border">
        <Grid
          columns={columns}
          rowData={rowData}
          rowHeight={36}
          darkMode={isDark}
          headerHeight={40}
          highlighting={{
            computeRowClasses: (context) => {
              if (context.rowIndex === null || !context.rowData) return [];
              const row = context.rowData as { grid: string };
              if (row.grid === "gp-grid") {
                return ["gp-grid-highlight"];
              }
              return [];
            },
          }}
        />
      </div>
    </div>
  );
}
