"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // logo-light = light colored (for dark backgrounds)
  // logo-dark = dark colored (for light backgrounds)
  // Default to light logo during SSR (assumes dark mode default)
  const src =
    mounted && resolvedTheme === "light" ? "/logo-dark.svg" : "/logo-light.svg";

  return <Image src={src} alt="gp-grid-logo" width={70} height={70} />;
}
