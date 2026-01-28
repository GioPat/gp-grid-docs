"use client";

import { useState, useMemo, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Grid,
  type ColumnDefinition,
  type CellRendererParams,
} from "@gp-grid/react";

interface Employee {
  id: number;
  name: string;
  department: string;
  status: "Active" | "Away" | "Offline";
  performance: number;
  salary: number;
}

// Custom renderer for status - shows colored dot
const StatusRenderer = (params: CellRendererParams) => {
  const status = params.value as string;
  const colors: Record<string, string> = {
    Active: "#22c55e",
    Away: "#f59e0b",
    Offline: "#6b7280",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 8px" }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: colors[status] || "#6b7280",
          marginRight: 8,
        }}
      />
      {status}
    </div>
  );
};

// Custom renderer for performance - shows positive/negative with colors
const PerformanceRenderer = (params: CellRendererParams) => {
  const value = params.value as number;
  const isPositive = value >= 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: "0 8px",
        color: isPositive ? "#22c55e" : "#ef4444",
        fontWeight: 500,
      }}
    >
      {isPositive ? "+" : ""}
      {value.toFixed(1)}%
    </div>
  );
};

// Custom renderer for salary - formats as currency
const SalaryRenderer = (params: CellRendererParams) => {
  const value = params.value as number;

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 8px" }}>
      ${value.toLocaleString()}
    </div>
  );
};

const columns: ColumnDefinition[] = [
  { field: "id", cellDataType: "number", width: 60, headerName: "ID" },
  { field: "name", cellDataType: "text", width: 140, headerName: "Name" },
  { field: "department", cellDataType: "text", width: 120, headerName: "Dept" },
  {
    field: "status",
    cellDataType: "text",
    width: 110,
    headerName: "Status",
    cellRenderer: "status",
  },
  {
    field: "performance",
    cellDataType: "number",
    width: 120,
    headerName: "Performance",
    cellRenderer: "performance",
  },
  {
    field: "salary",
    cellDataType: "number",
    width: 120,
    headerName: "Salary",
    cellRenderer: "salary",
  },
];

const sampleData: Employee[] = [
  { id: 1, name: "Giovanni Rossi", department: "Engineering", status: "Active", performance: 12.5, salary: 85000 },
  { id: 2, name: "Maria Verdi", department: "Marketing", status: "Away", performance: -3.2, salary: 72000 },
  { id: 3, name: "Luca Ferrari", department: "Sales", status: "Active", performance: 8.7, salary: 68000 },
  { id: 4, name: "Anna Russo", department: "Engineering", status: "Offline", performance: -1.5, salary: 92000 },
  { id: 5, name: "Marco Bianchi", department: "HR", status: "Active", performance: 5.3, salary: 65000 },
  { id: 6, name: "Sofia Greco", department: "Finance", status: "Away", performance: -7.8, salary: 78000 },
  { id: 7, name: "Alessandro Costa", department: "Engineering", status: "Active", performance: 15.2, salary: 95000 },
  { id: 8, name: "Chiara Lombardi", department: "Marketing", status: "Active", performance: 2.1, salary: 71000 },
];

export function CustomRenderersDemo() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const rowData = useMemo(() => sampleData, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="w-full h-[350px] rounded-lg overflow-hidden border border-fd-border bg-fd-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-[350px] rounded-lg overflow-hidden border border-fd-border">
        <Grid<Employee>
          columns={columns}
          rowData={rowData}
          rowHeight={36}
          darkMode={isDark}
          headerHeight={40}
          cellRenderers={{
            status: StatusRenderer,
            performance: PerformanceRenderer,
            salary: SalaryRenderer,
          }}
        />
      </div>
    </div>
  );
}
