"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import SubmitRequestSection from "./SubmitRequestSection";

interface SubmitRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SubmitRequestModal({ open, onClose }: SubmitRequestModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll propagation to underlying body / Lenis instance
  useEffect(() => {
    if (!open) return;

    // Lock html & body explicitly
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Stop wheel/touch event propagation so Lenis doesn't swallow modal scrolls
    const el = panelRef.current;
    if (!el) return;

    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    el.addEventListener("wheel", stopPropagation, { passive: true });
    el.addEventListener("touchmove", stopPropagation, { passive: true });

    return () => {
      document.body.style.overflow = originalStyle;
      el.removeEventListener("wheel", stopPropagation);
      el.removeEventListener("touchmove", stopPropagation);
    };
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // GSAP slide in/out
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    tweenRef.current?.kill();

    if (open) {
      // Reset scroll position to top when opened
      el.scrollTop = 0;
      gsap.set(el, { display: "block", xPercent: 100 });
      tweenRef.current = gsap.to(el, {
        xPercent: 0,
        duration: 0.65,
        ease: "expo.out",
        force3D: true,
      });
    } else {
      tweenRef.current = gsap.to(el, {
        xPercent: 100,
        duration: 0.65,
        ease: "expo.out",
        force3D: true,
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={panelRef}
      data-lenis-prevent="true"
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 99999,
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <SubmitRequestSection onClose={onClose} />
    </div>,
    document.body
  );
}