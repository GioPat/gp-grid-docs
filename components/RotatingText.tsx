"use client";

import { useState, useEffect, useMemo } from "react";

interface RotatingTextProps {
  words: string[];
  interval?: number;
}

export function RotatingText({ words, interval = 2000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Find the longest word to set fixed width
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length > b.length ? a : b)),
    [words],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="inline-block relative overflow-hidden align-bottom">
      {/* Invisible longest word to maintain width */}
      <span className="invisible">{longestWord}</span>
      {/* Animated word positioned absolutely */}
      <span
        className={`absolute left-0 right-0 text-center transition-all duration-300 ${
          isAnimating
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
        style={{ top: 0 }}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
}
