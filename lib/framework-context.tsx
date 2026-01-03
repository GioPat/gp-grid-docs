"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type Framework = "react" | "vue";

interface FrameworkContextValue {
  framework: Framework;
  setFramework: (fw: Framework) => void;
}

const FrameworkContext = createContext<FrameworkContextValue>({
  framework: "react",
  setFramework: () => {},
});

export function FrameworkProvider({
  children,
  initialFramework = "react",
}: {
  children: ReactNode;
  initialFramework?: Framework;
}) {
  const [framework, setFrameworkState] = useState<Framework>(initialFramework);
  const router = useRouter();
  const pathname = usePathname();

  // Sync framework state with URL
  useEffect(() => {
    if (pathname.startsWith("/docs/vue")) {
      setFrameworkState("vue");
    } else if (pathname.startsWith("/docs/react")) {
      setFrameworkState("react");
    }
  }, [pathname]);

  const setFramework = (newFramework: Framework) => {
    setFrameworkState(newFramework);

    // Navigate to equivalent page in the other framework
    if (pathname.startsWith("/docs/react") && newFramework === "vue") {
      const newPath = pathname.replace("/docs/react", "/docs/vue");
      router.push(newPath);
    } else if (pathname.startsWith("/docs/vue") && newFramework === "react") {
      const newPath = pathname.replace("/docs/vue", "/docs/react");
      router.push(newPath);
    } else if (pathname === "/docs" || pathname === "/docs/") {
      router.push(`/docs/${newFramework}`);
    }
  };

  return (
    <FrameworkContext.Provider value={{ framework, setFramework }}>
      {children}
    </FrameworkContext.Provider>
  );
}

export const useFramework = () => useContext(FrameworkContext);

// Helper to detect framework from pathname
export function getFrameworkFromPath(pathname: string): Framework {
  if (pathname.startsWith("/docs/vue")) {
    return "vue";
  }
  return "react"; // default
}
