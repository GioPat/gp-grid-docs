"use client";

import { useState } from "react";
import { useFramework, type Framework } from "@/lib/framework-context";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "fumadocs-ui/components/ui/popover";
import { ChevronDown, Check } from "lucide-react";

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" />
    </svg>
  );
}

function VueIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M2 3h3.5L12 15l6.5-12H22L12 21 2 3m4.5 0h3L12 8l2.5-5h3L12 13 6.5 3z" />
    </svg>
  );
}

const frameworks: {
  value: Framework;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "react", label: "React", icon: ReactIcon },
  { value: "vue", label: "Vue", icon: VueIcon },
];

export function FrameworkSwitcher() {
  const { framework, setFramework } = useFramework();
  const [open, setOpen] = useState(false);

  const selectedFramework = frameworks.find((fw) => fw.value === framework);
  const SelectedIcon = selectedFramework?.icon ?? ReactIcon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-full items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent cursor-pointer">
        <SelectedIcon className="size-5 text-fd-primary" />
        <span className="flex-1 text-left">{selectedFramework?.label}</span>
        <ChevronDown
          className={`size-4 text-fd-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-1"
        align="start"
      >
        {frameworks.map((fw) => {
          const Icon = fw.icon;
          const isSelected = framework === fw.value;

          return (
            <PopoverClose
              key={fw.value}
              onClick={() => setFramework(fw.value)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fd-foreground transition-colors hover:bg-fd-accent cursor-pointer"
            >
              <Icon
                className={`size-5 ${
                  isSelected ? "text-fd-primary" : "text-fd-muted-foreground"
                }`}
              />
              <span className="flex-1 text-left">{fw.label}</span>
              {isSelected && <Check className="size-4 text-fd-primary" />}
            </PopoverClose>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
