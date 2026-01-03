"use client";

import { useFramework, type Framework } from "@/lib/framework-context";

const frameworks: { value: Framework; label: string }[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

export function FrameworkSwitcher() {
  const { framework, setFramework } = useFramework();

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-fd-muted">
      {frameworks.map((fw) => (
        <button
          key={fw.value}
          onClick={() => setFramework(fw.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            framework === fw.value
              ? "bg-fd-background text-fd-foreground shadow-sm"
              : "text-fd-muted-foreground hover:text-fd-foreground"
          }`}
        >
          {fw.label}
        </button>
      ))}
    </div>
  );
}
