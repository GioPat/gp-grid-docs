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
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setAnimating(true);
    setIsActive(true);
    setTimeout(() => setAnimating(false), 500);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  const handleTouchStart = () => {
    setAnimating(true);
    setIsActive(true);
    setTimeout(() => {
      setAnimating(false);
      setIsActive(false);
    }, 800);
  };

  return (
    <div
      className={`relative p-6 rounded-lg border bg-fd-background transition-colors duration-300 overflow-hidden ${
        isActive ? "border-fd-primary" : "border-fd-border"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-fd-primary/20 to-transparent"
        style={{
          transform: animating ? "translateX(100%)" : "translateX(-100%)",
          transition: animating ? "transform 0.5s ease-in-out" : "none",
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
