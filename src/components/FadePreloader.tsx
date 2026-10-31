"use client";

import { useState, useEffect } from "react";

type FadePreloaderProps = {
  onExitStart?: () => void;
  onComplete?: () => void;
};

const HOLD_DURATION_MS = 490;
const EXIT_DURATION_MS = 380;

export default function FadePreloader({
  onExitStart,
  onComplete,
}: FadePreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true);
      onExitStart?.();
    }, HOLD_DURATION_MS);

    return () => clearTimeout(fadeTimer);
  }, [onExitStart]);

  useEffect(() => {
    if (!fading) return;

    const completeTimer = setTimeout(() => {
      onComplete?.();
      setVisible(false);
    }, EXIT_DURATION_MS);

    return () => clearTimeout(completeTimer);
  }, [fading, onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden pointer-events-none"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animated-gradient-bg {
          background: linear-gradient(-45deg, #162D24, #0E5A53, #094146, #162D24);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>

      <div className="h-full w-full animated-gradient-bg" />
    </div>
  );
}