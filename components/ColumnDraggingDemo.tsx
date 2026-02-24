"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import { Grid, type ColumnDefinition } from "@gp-grid/react";

interface DemoRow {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  location: string;
}

const names = [
  "Alice Chen", "Bob Martinez", "Clara Johnson", "David Kim",
  "Elena Rossi", "Frank Weber", "Grace Tanaka", "Henry Patel",
  "Iris Müller", "Jack O'Brien", "Karen Liu", "Liam Scott",
];

const departments = ["Engineering", "Marketing", "Sales", "Design", "Product", "Support"];
const roles = ["Manager", "Senior", "Junior", "Lead", "Director", "Intern"];
const locations = ["New York", "London", "Tokyo", "Berlin", "Sydney", "Toronto"];

function generateRows(count: number): DemoRow[] {
  const rows: DemoRow[] = new Array(count);
  for (let i = 0; i < count; i++) {
    rows[i] = {
      id: i + 1,
      name: names[i % names.length],
      department: departments[i % departments.length],
      role: roles[i % roles.length],
      salary: Math.round(50000 + Math.random() * 100000),
      location: locations[i % locations.length],
    };
  }
  return rows;
}

const initialColumns: ColumnDefinition[] = [
  { field: "id", cellDataType: "number", width: 60, headerName: "ID", movable: false },
  { field: "name", cellDataType: "text", width: 160, headerName: "Name" },
  { field: "department", cellDataType: "text", width: 130, headerName: "Department" },
  { field: "role", cellDataType: "text", width: 110, headerName: "Role" },
  { field: "salary", cellDataType: "number", width: 110, headerName: "Salary" },
  { field: "location", cellDataType: "text", width: 120, headerName: "Location" },
];

export function ColumnDraggingDemo() {
  const [mounted, setMounted] = useState(false);
  const [columns, setColumns] = useState(initialColumns);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const rowData = useMemo(() => generateRows(50), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleColumnMoved = useCallback(
    (fromIndex: number, toIndex: number) => {
      setColumns((prev) => {
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    },
    []
  );

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="w-full h-100 rounded-lg overflow-hidden border border-fd-border bg-fd-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Current column order display */}
      <div className="mb-4 p-3 rounded-lg bg-fd-card border border-fd-border">
        <span className="text-fd-muted-foreground text-sm">
          Column order:{" "}
        </span>
        <span className="text-sm font-medium">
          {columns.map((c) => c.headerName ?? c.field).join(" → ")}
        </span>
      </div>

      <div className="mb-4 p-3 rounded-lg bg-fd-card border border-fd-border">
        <span className="text-fd-muted-foreground text-sm">
          Drag column headers to reorder. The "ID" column has <code className="text-xs px-1 py-0.5 rounded bg-fd-muted">movable: false</code> and cannot be dragged.
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
          onColumnMoved={handleColumnMoved}
        />
      </div>
    </div>
  );
}
