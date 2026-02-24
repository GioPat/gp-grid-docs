"use client";

import { useState, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Grid,
  useGridData,
  type ColumnDefinition,
  type CellRendererParams,
} from "@gp-grid/react";

interface TaskRow {
  id: number;
  priority: number;
  task: string;
  assignee: string;
  status: string;
  effort: number;
}

const tasks = [
  "Design landing page",
  "Implement authentication",
  "Write API docs",
  "Fix pagination bug",
  "Add dark mode",
  "Optimize database queries",
  "Create onboarding flow",
  "Refactor state management",
  "Add export to CSV",
  "Set up CI/CD pipeline",
  "Write unit tests",
  "Review pull requests",
];

const assignees = ["Alice", "Bob", "Clara", "David", "Elena", "Frank"];
const statuses = ["To Do", "In Progress", "Review", "Done"];

function generateTasks(count: number): TaskRow[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    priority: i + 1,
    task: tasks[i % tasks.length],
    assignee: assignees[i % assignees.length],
    status: statuses[i % statuses.length],
    effort: Math.floor(Math.random() * 8) + 1,
  }));
}

const DragHandleRenderer = (_params: CellRendererParams) => {
  return (
    <div className="flex items-center justify-center h-full cursor-grab active:cursor-grabbing">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        opacity={0.4}
      >
        <circle cx="5" cy="3" r="1.5" />
        <circle cx="11" cy="3" r="1.5" />
        <circle cx="5" cy="8" r="1.5" />
        <circle cx="11" cy="8" r="1.5" />
        <circle cx="5" cy="13" r="1.5" />
        <circle cx="11" cy="13" r="1.5" />
      </svg>
    </div>
  );
};

export function RowDraggingDemo() {
  const [mounted, setMounted] = useState(false);
  const [entireRow, setEntireRow] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { dataSource } = useGridData<TaskRow>(generateTasks(12), {
    getRowId: (row) => row.id,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRowDragEnd = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      dataSource.moveRow(sourceIndex, targetIndex);
    },
    [dataSource],
  );

  const columns: ColumnDefinition[] = entireRow
    ? [
        {
          field: "priority",
          cellDataType: "number",
          width: 50,
          headerName: "#",
        },
        { field: "task", cellDataType: "text", width: 200, headerName: "Task" },
        {
          field: "assignee",
          cellDataType: "text",
          width: 100,
          headerName: "Assignee",
        },
        {
          field: "status",
          cellDataType: "text",
          width: 110,
          headerName: "Status",
        },
        {
          field: "effort",
          cellDataType: "number",
          width: 70,
          headerName: "Effort",
        },
      ]
    : [
        {
          field: "id",
          cellDataType: "number",
          width: 40,
          headerName: "",
          filterable: false,
          rowDrag: true,
          cellRenderer: "dragHandle",
          sortable: false,
        },
        {
          field: "priority",
          cellDataType: "number",
          width: 50,
          headerName: "#",
        },
        { field: "task", cellDataType: "text", width: 200, headerName: "Task" },
        {
          field: "assignee",
          cellDataType: "text",
          width: 100,
          headerName: "Assignee",
        },
        {
          field: "status",
          cellDataType: "text",
          width: 110,
          headerName: "Status",
        },
        {
          field: "effort",
          cellDataType: "number",
          width: 70,
          headerName: "Effort",
        },
      ];

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="w-full h-100 rounded-lg overflow-hidden border border-fd-border bg-fd-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mode Toggle */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setEntireRow(false)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            !entireRow
              ? "bg-fd-primary text-fd-primary-foreground"
              : "border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent"
          }`}
        >
          Drag Handle
        </button>
        <button
          onClick={() => setEntireRow(true)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            entireRow
              ? "bg-fd-primary text-fd-primary-foreground"
              : "border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent"
          }`}
        >
          Entire Row
        </button>
      </div>

      {/* Description */}
      <div className="mb-4 p-3 rounded-lg bg-fd-card border border-fd-border">
        <span className="text-fd-muted-foreground text-sm">
          {entireRow
            ? "Click and drag any cell to reorder the row. Uses rowDragEntireRow={true}."
            : "Drag the handle (⠿) in the first column to reorder rows. Uses rowDrag: true on the column."}
        </span>
      </div>

      {/* Grid */}
      <div className="w-full h-100 rounded-lg overflow-hidden border border-fd-border">
        <Grid<TaskRow>
          columns={columns}
          dataSource={dataSource}
          rowHeight={36}
          darkMode={isDark}
          headerHeight={40}
          rowDragEntireRow={entireRow}
          onRowDragEnd={handleRowDragEnd}
          cellRenderers={{ dragHandle: DragHandleRenderer }}
        />
      </div>
    </div>
  );
}
