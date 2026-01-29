"use client";

import { useMemo } from "react";

interface RotatingTextProps {
  words: string[];
  interval?: number;
}

export function RotatingText({ words, interval = 2000 }: RotatingTextProps) {
  // Find the longest word to set fixed width
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length > b.length ? a : b)),
    [words],
  );

  // Total animation duration
  const totalDuration = words.length * interval;

  // Generate keyframes for rolling through all words
  const keyframes = useMemo(() => {
    const steps: string[] = [];
    const stepPercent = 100 / words.length;
    const transitionPercent = 5; // percentage of time for transition

    words.forEach((_, i) => {
      const startPercent = i * stepPercent;
      const endPercent = (i + 1) * stepPercent - transitionPercent;
      const topValue = `-${i * 1.15}em`;

      if (i === 0) {
        steps.push(`0% { top: 0; }`);
      }
      if (endPercent > startPercent) {
        steps.push(`${endPercent.toFixed(2)}% { top: ${topValue}; }`);
      }
      if (i < words.length - 1) {
        const nextTop = `-${(i + 1) * 1.15}em`;
        steps.push(`${((i + 1) * stepPercent).toFixed(2)}% { top: ${nextTop}; }`);
      }
    });

    // Return to start
    steps.push(`100% { top: -${words.length * 1.15}em; }`);

    return `@keyframes roll { ${steps.join(" ")} }`;
  }, [words]);

  return (
    <>
      <style>{keyframes}</style>
      <span
        className="inline-block relative overflow-hidden align-bottom leading-none"
        style={{ height: "1.15em", marginBottom: "-0.15em" }}
      >
        {/* Invisible longest word to maintain width */}
        <span className="invisible leading-none">{longestWord}</span>

        {/* Rolling container with all words stacked */}
        <span
          className="absolute left-0 right-0 leading-none"
          style={{
            top: 0,
            animation: `roll ${totalDuration}ms ease-in-out infinite`,
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="block text-center leading-none"
              style={{ height: "1.15em" }}
            >
              {word}
            </span>
          ))}
          {/* Duplicate first word for seamless loop */}
          <span
            className="block text-center leading-none"
            style={{ height: "1.15em" }}
          >
            {words[0]}
          </span>
        </span>
      </span>
    </>
  );
}
