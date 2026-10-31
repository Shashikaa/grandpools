"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
/** Later scenes open through masks above the stationary outgoing viewport. */
export default function LuxuryPage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    root.current?.querySelectorAll<HTMLElement>(':scope > [data-luxury-stage]').forEach((stage, index) => {
      stage.style.zIndex = String(index + 1);
    });
  }, []);
  return <div ref={root} className="luxury-page w-full bg-[#162D24]">{children}</div>;
}
