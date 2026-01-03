"use client";

import {
  CircleHelp,
  Gamepad2,
  PencilRuler,
  Blocks,
  ScrollText,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { ReactElement, useState } from "react";

type Feature =
  | "virtualScrolling"
  | "cellManipulation"
  | "sortingFiltering"
  | "customRenderings"
  | "keyboardNavigation"
  | "frameworkAgnostic";

const getIconFromFeature = (feature: Feature): ReactElement => {
  switch (feature) {
    case "virtualScrolling":
      return <ScrollText className="w-6 h-6" />;
    case "cellManipulation":
      return <PencilRuler className="w-6 h-6" />;
    case "sortingFiltering":
      return <SlidersHorizontal className="w-6 h-6" />;
    case "customRenderings":
      return <Sparkles className="w-6 h-6" />;
    case "keyboardNavigation":
      return <Gamepad2 className="w-6 h-6" />;
    case "frameworkAgnostic":
      return <Blocks className="w-6 h-6" />;
    default:
      return <CircleHelp className="w-6 h-6" />;
  }
};

export const FeatureCard = ({
  title,
  description,
  feature,
}: {
  title: string;
  description: string;
  feature: Feature;
}) => {
  const [animating, setAnimating] = useState(false);

  const handleMouseEnter = () => {
    setAnimating(true);
    // Reset after animation completes
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <div
      className="relative p-6 rounded-lg border border-fd-border bg-fd-background"
      style={{ overflow: "hidden", clipPath: "inset(0 round 8px)" }}
      onMouseEnter={handleMouseEnter}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
          transform: animating ? "translateX(100%)" : "translateX(-100%)",
          transition: animating ? "transform 0.5s ease-in-out" : "none",
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10">
        <div className="mb-3 text-fd-primary">{getIconFromFeature(feature)}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-fd-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};
