"use client";

import RollingText from "@/src/components/RollingText";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { flushSync } from "react-dom";
import gsap from "gsap";
// Adjust this path if your "@" alias doesn't point at /src
import { GRAND_POOLS_DATA } from "../../app/projects/[slug]/data";

// Everything on screen comes from data.ts — add a project there and it appears here.
const PROJECTS = Object.entries(GRAND_POOLS_DATA).map(([slug, p]) => ({
  slug,
  title: p.title,
  category: p.category,
  description: p.description,
  hero: p.images[0],
  slides: p.slides,
}));

// Some paths in data.ts are missing the leading slash (e.g. "p15.webp")
const src = (path: string) => (path.startsWith("/") ? path : `/${path}`);

// Run a callback when the browser is idle (falls back to a timeout)
const idle = (cb: () => void) => {
  if (typeof (window as any).requestIdleCallback === "function") {
    (window as any).requestIdleCallback(cb, { timeout: 2500 });
  } else {
    setTimeout(cb, 400);
  }
};

export default function SectionSix() {
  const [active, setActive] = useState(0); // nav highlight (instant)
  const [shown, setShown] = useState(0);   // text content (swaps mid-fade)
  // Layers that currently have a real <img> mounted. We keep this to 1-2 entries
  // (the visible photo, plus the previous one while the wipe is running) so the
  // browser never holds every full-size hero image in memory at once.
  const [ready, setReady] = useState<Set<number>>(() => new Set());

  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const zTop = useRef(1);
  const goTicket = useRef(0);
  const loadCache = useRef<Map<number, Promise<void>>>(new Map());

  const navWrapRef = useRef<HTMLElement>(null);

  // Download + decode ONE hero image off the main path. Cached per index.
  function load(i: number): Promise<void> {
    const cached = loadCache.current.get(i);
    if (cached) return cached;

    const im = new Image();
    im.decoding = "async";
    try {
      (im as any).fetchPriority = i === 0 ? "high" : "low";
    } catch {}
    im.src = src(PROJECTS[i].hero);

    const p: Promise<void> = (
      im.decode
        ? im.decode()
        : new Promise<void>((res) => {
            im.onload = () => res();
            im.onerror = () => res();
          })
    )
      .catch(() => {})
      .then(() => {});

    loadCache.current.set(i, p);
    return p;
  }

  // Prefetch ONLY the neighbours of the current project (next / previous),
  // one at a time, when the browser is idle. Everything else loads on demand.
  function warmNeighbours(i: number) {
    const n = PROJECTS.length;
    if (n < 2) return;
    const targets = [(i + 1) % n, (i - 1 + n) % n];
    targets.forEach((t, k) => {
      idle(() => {
        setTimeout(() => load(t), k * 300);
      });
    });
  }

  // Park every layer except the first below the fold, using transforms (GPU-friendly)
  useEffect(() => {
    layerRefs.current.forEach((wrap, i) => {
      if (!wrap || i === 0) return;
      const inner = wrap.firstElementChild;
      gsap.set(wrap, { yPercent: 100 });
      if (inner) gsap.set(inner, { yPercent: -100 });
    });
  }, []);

  // Don't touch ANY image until the section is close to the viewport.
  // Before, the images started loading ~2s after page mount, which often
  // landed exactly while the user was scrolling toward this section.
  useEffect(() => {
    const el = sectionRef.current;
    let started = false;
    let cancelled = false;

    const start = () => {
      if (started || cancelled) return;
      started = true;
      load(0).then(() => {
        if (cancelled) return;
        setReady((prev) => {
          if (prev.has(0)) return prev;
          const next = new Set(prev);
          next.add(0);
          return next;
        });
        warmNeighbours(0);
      });
    };

    let io: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start();
            io?.disconnect();
          }
        },
        { rootMargin: "100% 100% 100% 100%" }
      );
      io.observe(el);
    } else {
      start();
    }

    // Safety net in case the observer never fires for this layout.
    // This only loads the first photo + 2 neighbours, so it is cheap.
    const fallback = setTimeout(start, 8000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      io?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll only the nav strip (not the page) to keep the active item in view.
  // On mobile the nav is a grid with no overflow, so this is a no-op there.
  useEffect(() => {
    const wrap = navWrapRef.current;
    const btn = navRefs.current[active];
    if (!wrap || !btn) return;
    if (wrap.scrollWidth <= wrap.clientWidth) return;
    wrap.scrollTo({
      left: btn.offsetLeft - (wrap.clientWidth - btn.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  async function go(idx: number) {
    if (idx === active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = (n: number) => (reduced ? 0 : n);

    const ticket = ++goTicket.current;
    setActive(idx); // nav highlight responds instantly

    // Make sure the photo is downloaded + decoded BEFORE the wipe starts, so the
    // animation never stutters while an image loads. Cap the wait at 600ms.
    await Promise.race([load(idx), new Promise<void>((r) => setTimeout(r, 600))]);
    if (ticket !== goTicket.current) return; // user clicked another project meanwhile

    // Mount the new photo (the old one stays mounted underneath for the wipe)
    flushSync(() => {
      setReady((prev) => {
        if (prev.has(idx)) return prev;
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
    });

    // New photo rises from the bottom edge like a water line
    // (Transforms only: wrapper slides up while its inner slides down, which
    // looks like a wipe but stays on the GPU. clip-path forced a repaint per frame.)
    zTop.current += 1;
    const wrap = layerRefs.current[idx];
    const inner = wrap?.firstElementChild as HTMLElement | null;
    const img = inner?.firstElementChild as HTMLElement | null;
    if (wrap && inner && img) {
      wrap.style.zIndex = String(zTop.current);
      wrap.style.visibility = "visible";
      // Promote to a GPU layer only while it is actually animating
      wrap.style.willChange = "transform";
      inner.style.willChange = "transform";
      img.style.willChange = "transform";

      gsap.killTweensOf([wrap, inner, img]);
      gsap.set(wrap, { yPercent: 100 });
      gsap.set(inner, { yPercent: -100 });
      gsap.set(img, { scale: 1.1 });
      gsap.to([wrap, inner], {
        yPercent: 0,
        duration: d(0.9),
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: () => {
          wrap.style.willChange = "auto";
          inner.style.willChange = "auto";
          if (ticket !== goTicket.current) return;
          // Hide the layers underneath and free their full-size images
          layerRefs.current.forEach((el, i) => {
            if (el && i !== idx) el.style.visibility = "hidden";
          });
          setReady(new Set([idx]));
          // Quietly prepare the next/previous projects for the next click
          warmNeighbours(idx);
        },
      });
      gsap.to(img, {
        scale: 1,
        duration: d(1.3),
        ease: "power3.out",
        onComplete: () => {
          img.style.willChange = "auto";
        },
      });
    }

    // Text fades out, swaps, fades back in
    const targets = [textRef.current].filter(Boolean);
    gsap.killTweensOf(targets);
    const mobileCopy = window.matchMedia('(max-width: 1024px)').matches;
    gsap.to(targets, {
      opacity: 0,
      y: mobileCopy ? 0 : -10,
      duration: d(0.22),
      ease: "power2.in",
      onComplete: () => {
        setShown(idx);
        gsap.fromTo(
          targets,
          { opacity: 0, y: mobileCopy ? 0 : 16 },
          { opacity: 1, y: 0, duration: d(0.6), ease: "power3.out", stagger: 0.08 }
        );
      },
    });
  }

  const p = PROJECTS[shown];

  return (
    <section
      ref={sectionRef}
      className="section-six-wrapper !overflow-hidden !pointer-events-auto"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {/* Photo layers — each wipes up over the last */}
      {PROJECTS.map((proj, i) => (
        <div
          key={proj.slug}
          ref={(el) => { layerRefs.current[i] = el; }}
          className="!absolute !inset-0 !overflow-hidden"
          style={{
            zIndex: i === 0 ? 1 : 0,
            visibility: i === 0 ? "visible" : "hidden",
          }}
        >
          <div className="!absolute !inset-0 !overflow-hidden !bg-[#0a100d]">
            {/* Real <img> (not CSS background) so the browser decodes it off the main thread.
                Only mounted for the visible photo (and the previous one during a wipe). */}
            {ready.has(i) && (
              <img
                src={src(proj.hero)}
                alt=""
                aria-hidden="true"
                decoding="async"
                draggable={false}
                {...(i === 0 ? { fetchPriority: "high" as const } : {})}
                className="!absolute !inset-0 !h-full !w-full !object-cover !object-center"
              />
            )}
          </div>
        </div>
      ))}

      {/* Shade */}
      <div
        className="!absolute !inset-0 !z-[1000] !pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(10,16,13,0.88) 0%, rgba(10,16,13,0.35) 55%, rgba(10,16,13,0.25) 100%), linear-gradient(90deg, rgba(10,16,13,0.55) 0%, rgba(10,16,13,0) 60%)",
        }}
      />

      <div className="section-container !relative !z-[1001] !h-full !flex !flex-col !justify-end !gap-5 lg:!gap-8 !pb-[calc(2.5rem_+_env(safe-area-inset-bottom))] lg:!pb-24">
        <h2 data-luxury-title className="!m-0 !pt-16 lg:!pt-20 !text-[#F4EEDF] font-display">Projects</h2>

        <div className="!flex !flex-col lg:!flex-row lg:!items-end lg:!justify-between !gap-5 lg:!gap-10">
          {/* Title + description */}
          <div ref={textRef} className="!max-w-[640px]">
            <p className="font-body !m-0 !mb-2 !text-[14px] !text-[#A3B18A]">{p.category}</p>
            <h3
              className="!m-0 !text-[#F4EEDF] !font-light !text-[1.75rem] !leading-[1.15] lg:!text-[clamp(1.2rem,3vw,3.5rem)]"
              style={{
                fontFamily: "var(--font-display, inherit)",
              }}
            >
              {p.title}
            </h3>
            <p className="font-body !mt-4 !mb-0 !max-w-[52ch] !text-[14px] lg:!text-[16px] !leading-[1.6] !text-[#F4EEDF]/85 !line-clamp-3 lg:!line-clamp-4">
              {p.description}
            </p>
          </div>

          {/* Button only, on the right, no box */}
          <div className="!shrink-0 lg:!ml-auto">
            <Link
              href={`/projects/${p.slug}`}
              prefetch={true}
              className="hero-contact-btn group btn-underline font-body ml-0 lg:ml-10"
            ><RollingText>See this Project</RollingText></Link>
          </div>
        </div>

        {/* Project index: 2-column grid on mobile (all visible, no horizontal scroll),
            single scrolling row on desktop */}
        <nav
          ref={navWrapRef}
          aria-label="Projects"
          className="!relative !grid !grid-cols-2 !gap-x-4 !gap-y-1 !pb-1 lg:!flex lg:!gap-6 lg:!overflow-x-auto lg:!overscroll-x-contain [scrollbar-width:none]"
        >
          {PROJECTS.map((proj, i) => {
            const on = i === active;
            return (
              <button
                key={proj.slug}
                ref={(el) => { navRefs.current[i] = el; }}
                type="button"
                onClick={() => go(i)}
                aria-current={on ? "true" : undefined}
                aria-label={`View ${proj.title}`}
                className="!relative !min-w-0 !text-left !bg-transparent !border-none !cursor-pointer !px-0 !pt-3 !pb-1 !min-h-[48px] lg:!shrink-0 lg:!min-w-[150px] focus-visible:!outline focus-visible:!outline-2 focus-visible:!outline-[#F4EEDF]"
              >
                <span className="!absolute !top-0 !left-0 !right-0 !h-px !bg-[#F4EEDF]/25" />
                <span
                  className="!absolute !top-0 !left-0 !right-0 !h-[2px] !bg-[#8FD0C8] !origin-left !transition-transform !duration-500"
                  style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
                />
                <span
                  className="font-body !block !text-[13px] !text-[#F4EEDF] !transition-opacity !duration-300"
                  style={{ opacity: on ? 1 : 0.55 }}
                >
                  {proj.title}
                </span>
                <span
                  className="font-body !block !text-[12px] !text-[#A3B18A] !transition-opacity !duration-300"
                  style={{ opacity: on ? 1 : 0.55 }}
                >
                  {proj.category}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}