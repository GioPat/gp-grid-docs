"use client";

import { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Grid, type ColumnDefinition } from "gp-grid-react";

const ROW_COUNT = 1_500_000;

interface DemoRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  salary: number;
}

const firstNames = [
  "Giovanni",
  "Luca",
  "Ruggiero",
  "Cristoforo",
  "Anna",
  "Ennio",
  "Camillo",
  "Matteo",
  "Mario",
  "Chiara",
  "Massimiliano",
  "Leonardo",
  "Maria",
  "Elisabetta",
  "Caterina",
];

const lastNames = [
  "Rossi",
  "Verdi",
  "Russo",
  "Ferrari",
  "Ricci",
  "Greco",
  "Costa",
  "Lombardi",
  "Moretti",
  "Peroni",
  "Conti",
  "Gallo",
];

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Research",
  "Support",
  "Legal",
  "Product",
];

const columns: ColumnDefinition[] = [
  { field: "id", cellDataType: "number", width: 100, headerName: "ID" },
  {
    field: "firstName",
    cellDataType: "text",
    width: 130,
    headerName: "First Name",
  },
  {
    field: "lastName",
    cellDataType: "text",
    width: 130,
    headerName: "Last Name",
  },
  { field: "email", cellDataType: "text", width: 250, headerName: "Email" },
  {
    field: "department",
    cellDataType: "text",
    width: 140,
    headerName: "Department",
  },
  { field: "salary", cellDataType: "number", width: 120, headerName: "Salary" },
];

function generateRows(count: number): DemoRow[] {
  const rows: DemoRow[] = new Array(count);
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName =
      lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    rows[i] = {
      id: i + 1,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`,
      department: departments[i % departments.length],
      salary: 50000 + (i % 100) * 1000,
    };
  }
  return rows;
}

export function GridDemo() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const rowData = useMemo(() => generateRows(ROW_COUNT), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full">
        <div className="w-full h-[500px] rounded-lg overflow-hidden border border-fd-border shadow-xl bg-fd-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="w-full h-[500px] rounded-lg overflow-hidden border border-fd-border shadow-xl">
        <Grid
          columns={columns}
          rowData={rowData}
          rowHeight={36}
          darkMode={isDark}
          highlighting={{
            computeRowClasses: (context) => {
              if (context.rowIndex !== null && context.rowIndex % 2 === 1) {
                return ["zebra-row"];
              }
              return [];
            },
            computeCellClasses: (context) => {
              if (context.isHovered) {
                return ["cell-hover"];
              }
              return [];
            },
          }}
        />
      </div>
    </div>
  );
}
