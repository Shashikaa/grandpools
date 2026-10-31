import type { CSSProperties } from "react";

/** One accessible label; staggered characters roll through their clipped copy. */
export default function RollingText({ children }: { children: string }) {
  return <span className="button-roll" aria-label={children}>
    <span aria-hidden="true">{Array.from(children).map((char, index) =>
      <span key={index} className="button-roll-char" style={{"--char-delay": `${index * 0.012}s`} as CSSProperties}>{char === " " ? "\u00a0" : char}</span>
    )}</span>
  </span>;
}
