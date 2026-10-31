# Grand Pools — Motion v13

This version replaces the original page-wide scroll engine. It keeps the Grand Pools copy, assets, section order and visual compositions while rebuilding the section transitions and text animation.

## Start in a fresh folder

Use Node.js 20.9 or later. Extract the complete ZIP into a new folder, then run:

```bash
npm ci
npm run build
npm start
```

Open http://localhost:3000. For editing, use `npm run dev`.

Do not copy this over a running old build. The previous `.next` output must not be reused. Rebuild and redeploy to update your existing Vercel site; downloading this project does not change that deployment.

## Motion architecture

| File | Purpose |
| --- | --- |
| `src/components/SmoothScroll.tsx` | One Lenis instance for the whole site, GSAP clock, menu/modal handling and navigation resets |
| `src/components/motion/settings.ts` | Scroll duration, wheel input, bounded story lengths, collection index mapping |
| `src/components/motion/LuxuryStage.tsx` | CSS sticky scene holds, vertical Home masks, desktop title characters and paragraph lines |
| `src/components/motion/refresh.ts` | Coalesced layout refreshes, independent of scrolling |
| `src/components/motion/LuxuryPage.tsx` | Ordered stacking for incoming masked scenes |
| `src/components/motion/ServiceCollection.tsx` | Services collection with scroll and indicator navigation |
| `src/components/motion/ProjectStory.tsx` | Project-detail story with controlled slide state |
| `src/components/Projects/ProjectInfoSlide.tsx` | Controlled image wipes and clean text masks for project slides |
| `src/app/*Desktop.tsx` and route equivalents | Short page compositions using the original section components |
| `src/components/Home/`, `About/`, `Service/`, `Projects/`, `contact/` | Existing section content and layout |
| `src/app/globals.css` | Motion masks and responsive positioning |

The retired `targetProgress`, `stepProgress`, manual fixed-frame positioning, per-route animation loops, old reveal helper and global reveal scanner are removed. Each section with a following scene uses a continuous CSS sticky hold while the incoming mask opens. ScrollTrigger does not switch the viewport into a fixed pin or insert pin spacers. The reveal wrapper counters normal document movement, so its content stays visually stationary during the mask. Inner stories finish before the handoff starts. The invitation retains its opposing split-panel entrance. Home uses vertical masks alongside the original opposing vertical split panels. Experts and the app share one continuous layer with normal scrolling between them. Titles reveal by character and paragraphs cascade by line on desktop only; mobile and tablet copy stays unsplit except project-detail story slides, with scroll-linked fades for inner-story exits. Static copy reveals once and remains readable when scrolling back. Tall sections scroll through their content before holding their bottom viewport. Footers release into normal flow. Native touch momentum is retained.

The existing Next.js 16, React 19, Tailwind 4, GSAP and Lenis stack is retained. Existing optional Three.js water effects and interactive carousels remain. The repository stays TypeScript.

## Checks

```bash
npm run typecheck
npm run test:motion
npm run build
```

Background-image sections across About, Services, service details, Projects, project details and Contact now share subtle scroll-linked image zoom. Page heroes remain steady on scroll; inner image-story zooms are retained. Privacy and Terms also zoom their fixed background pattern. Text and foreground UI do not scale.

All supplied images, videos and local fonts are included. `next/font` needs internet access to download Instrument Sans during the first build. Existing contact form integrations are unchanged.

Read `MOTION_REWORK.md` for the detailed migration and browser-verification notes.

V10 restores the mobile Home hero story, makes outgoing mobile copy slide and fade, keeps travelling prose unmasked, fixes collection copy during entry, uses stable Services image wipes, and applies desktop text treatment to mobile project slides. Invitation titles are attached to their split panels. Images are resized to a maximum 1920px, with reviewed mobile sources; see `IMAGE_OPTIMIZATION.md`.

## Final cleanup (v11)

About starts with opaque hero image panels and a hidden underlay until its scroll reveal begins. Home Quality prose starts 16px below the viewport and enters earlier; mobile uses the stable small viewport height. Harmony zoom follows the section entrance without a separate hold. Services collection images wipe horizontally. Desktop menu previews use decoded reusable masks and eight smaller WebP derivatives, warmed only when the menu opens. All content, section order and layouts are retained.

## Home interaction fixes (v12)

Transparent scene tracks no longer intercept pointer input; clipped content surfaces remain interactive. The split invitation's transparent wrapper also ignores input, while its visible panels retain their own hit regions. Pricing buttons can be used as soon as their part of the section is exposed.

Home hero initial copy waits for motion preparation before becoming visible; later copy phases start hidden in the rendered markup, avoiding a visible-hidden-visible first-load flash. Process opening text moves upward 48px while fading continuously with scroll, on both desktop and mobile.

## Water, button text and fixed Process crop (v13)

CTA labels use Auren-style rolling characters with 0.5s easing and 12ms per-character staggering. This is text-only: existing button geometry, underline, colors and actions remain. Labels remain accessible as one phrase, disabled submit controls do not animate, touch hover is disabled and reduced motion gets static text. Rolling labels are excluded from the page SplitText scanner.

The desktop Process photo plane stays full-width. Its left clip progresses from 0 to 42.857143 percent; the container no longer resizes or reframes object-cover images. Following split-image wipes and outgoing text fades retain their timing. Mobile is unchanged. Browser measurements confirmed constant 1363px image width and an identity transform during intermediate and final clipping.

The water loop is rebuilt from the existing 1440x800 source, replacing the lower-resolution 1280x720 loop. VP9 CRF22 and H.264 CRF18 variants retain native dimensions, omit audio and crossfade the loop boundary. The preloader and desktop water shader select WebM with MP4 fallback. Desktop renderer pixel ratio is capped at 1.5, up from 1.15, to improve fine detail without unbounded Retina rendering. This improves use of available detail; no original 4K footage is supplied. The QA browser disables WebGL, so shader appearance requires a browser with WebGL enabled.
