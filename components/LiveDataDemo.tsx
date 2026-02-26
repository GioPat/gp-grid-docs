"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Grid,
  useGridData,
  type ColumnDefinition,
  type CellRendererParams,
} from "@gp-grid/react";

interface StockTick {
  id: number;
  symbol: string;
  price: number;
  change: number;
  volume: number;
  timestamp: string;
}

const symbols = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "META",
  "TSLA",
  "NVDA",
  "AMD",
];

function getRandomPrice(): number {
  return Math.round((Math.random() * 500 + 50) * 100) / 100;
}

function getRandomChange(): number {
  return Math.round((Math.random() * 10 - 5) * 100) / 100;
}

function getRandomVolume(): number {
  return Math.floor(Math.random() * 1000000) + 10000;
}

let nextId = 1;

function generateTick(): StockTick {
  return {
    id: nextId++,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    price: getRandomPrice(),
    change: getRandomChange(),
    volume: getRandomVolume(),
    timestamp: new Date().toISOString().slice(11, 23),
  };
}

function generateInitialData(count: number): StockTick[] {
  return Array.from({ length: count }, () => generateTick());
}

// Custom renderer for the change column - shows positive/negative with colors
const ChangeRenderer = (params: CellRendererParams) => {
  const value = params.value as number | null;
  if (value == null) return null;
  const isPositive = value >= 0;

  return (
    <div
      className="flex items-center h-full px-2"
      style={{ color: isPositive ? "#22c55e" : "#ef4444" }}
    >
      {isPositive ? "+" : ""}
      {value.toFixed(2)}
    </div>
  );
};

const columns: ColumnDefinition[] = [
  { field: "id", cellDataType: "number", width: 80, headerName: "ID" },
  { field: "symbol", cellDataType: "text", width: 100, headerName: "Symbol" },
  { field: "price", cellDataType: "number", width: 120, headerName: "Price" },
  {
    field: "change",
    cellDataType: "number",
    width: 100,
    headerName: "Change",
    cellRenderer: "change",
  },
  { field: "volume", cellDataType: "number", width: 120, headerName: "Volume" },
  { field: "timestamp", cellDataType: "text", width: 140, headerName: "Time" },
];

export function LiveDataDemo() {
  const [mounted, setMounted] = useState(false);
  const [rowCount, setRowCount] = useState(10);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamInterval, setStreamInterval] = useState(100);
  const [batchSize, setBatchSize] = useState(10);
  const streamingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { dataSource, addRows, removeRows } = useGridData<StockTick>(
    generateInitialData(10),
    {
      getRowId: (row) => row.id,
      debounceMs: 50,
    },
  );

  useEffect(() => {
    setMounted(true);
    const unsubscribe = dataSource.subscribe(() => {
      setRowCount(dataSource.getTotalRowCount());
    });
    return () => {
      unsubscribe();
      if (streamingRef.current) {
        clearInterval(streamingRef.current);
      }
    };
  }, [dataSource]);

  const handleAddRow = useCallback(() => {
    addRows([generateTick()]);
  }, [addRows]);

  const handleAddBatch = useCallback(() => {
    const batch = Array.from({ length: batchSize }, () => generateTick());
    addRows(batch);
  }, [addRows, batchSize]);

  const handleRemoveFirst = useCallback(async () => {
    await dataSource.flushTransactions();
    const count = dataSource.getTotalRowCount();
    if (count > 0) {
      const firstId = 1;
      removeRows([firstId]);
    }
  }, [dataSource, removeRows]);

  const handleClearAll = useCallback(async () => {
    await dataSource.flushTransactions();
    const count = dataSource.getTotalRowCount();
    const ids = Array.from({ length: count }, (_, i) => i + 1);
    removeRows(ids);
  }, [dataSource, removeRows]);

  const toggleStreaming = useCallback(() => {
    if (isStreaming) {
      if (streamingRef.current) {
        clearInterval(streamingRef.current);
        streamingRef.current = null;
      }
      setIsStreaming(false);
    } else {
      streamingRef.current = setInterval(() => {
        addRows([generateTick()]);
      }, streamInterval);
      setIsStreaming(true);
    }
  }, [isStreaming, streamInterval, addRows]);

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-fd-border bg-fd-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleAddRow}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-fd-primary text-fd-primary-foreground hover:opacity-90 transition-opacity"
        >
          Add Row
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddBatch}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-fd-primary text-fd-primary-foreground hover:opacity-90 transition-opacity"
          >
            Add Batch
          </button>
          <input
            type="number"
            value={batchSize}
            onChange={(e) =>
              setBatchSize(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-16 px-2 py-1.5 text-sm rounded-md border border-fd-border bg-fd-background text-fd-foreground"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleStreaming}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-opacity ${isStreaming
              ? "bg-fd-muted text-fd-muted-foreground hover:opacity-80"
              : "bg-fd-primary text-fd-primary-foreground hover:opacity-90"
              }`}
          >
            {isStreaming ? "Stop Stream" : "Start Stream"}
          </button>
          <input
            type="number"
            value={streamInterval}
            onChange={(e) =>
              setStreamInterval(Math.max(10, parseInt(e.target.value) || 100))
            }
            disabled={isStreaming}
            className="w-20 px-2 py-1.5 text-sm rounded-md border border-fd-border bg-fd-background text-fd-foreground disabled:opacity-50"
          />
          <span className="text-sm text-fd-muted-foreground">ms</span>
        </div>

        <button
          onClick={handleRemoveFirst}
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Remove First
        </button>

        <button
          onClick={handleClearAll}
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-4 p-3 rounded-lg bg-fd-card border border-fd-border">
        <div>
          <span className="text-fd-muted-foreground text-sm">Total Rows: </span>
          <span className="text-fd-primary font-bold">
            {rowCount.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-fd-muted-foreground text-sm">Debounce: </span>
          <span className="text-fd-foreground">50ms</span>
        </div>
        <div>
          <span className="text-fd-muted-foreground text-sm">Stream: </span>
          <span className={isStreaming ? "text-fd-primary" : "text-fd-muted-foreground"}>
            {isStreaming ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full h-[400px] rounded-lg overflow-hidden border border-fd-border">
        <Grid<StockTick>
          columns={columns}
          dataSource={dataSource}
          rowHeight={36}
          darkMode={isDark}
          headerHeight={40}
          cellRenderers={{ change: ChangeRenderer }}
        />
      </div>
    </div>
  );
}
