# Grand Pools Motion v13

## Text and scroll fixes

Home Quality's mobile opening title, subtitle and body now move upward while fading. The mobile opacity helper no longer overwrites their vertical displacement. The incoming Quality paragraph stays opaque as it scrolls into the viewport. Process and service-story travelling prose have no SplitText or line masks on either breakpoint; those paragraphs remain readable from the first visible pixel.

Services collection copy is visible as the section's entry mask exposes it, instead of waiting for the active-section flag. Its mobile copy has no per-line mask. The previous translated image/inner-image counter-motion has been replaced by stable, mounted image layers with a horizontal clip wipe. Scroll jumps and reverse changes retarget the same layers.

Project detail slides now use the same measured character-title and paragraph-line treatment on mobile as desktop. This is limited to the project story; other mobile section copy remains unsplit. Controlled slide indices continue to follow scroll position in both directions.

The Home hero's inner sequence is restored on mobile. Its three copy phases and scroll budget match the Projects editorial hero: the first block fades/up, the second enters and fades/up, then the final paragraph enters. No background zoom is reintroduced.

## Invitation panels

The two original title pieces remain attached to the two background panels throughout the section entrance. There is no character or line reveal on them. When the flight begins, each piece transfers into an overlay at the exact same width, font metrics and coordinates. The pieces then travel to the landing text's individual spans, avoiding the earlier group-centering shift. Reverse scrolling restores the panel titles. The background zoom remains synchronized with the flight.

## Retained architecture

One Lenis instance and GSAP clock drive the page. CSS sticky scenes use the same measured geometry as ScrollTrigger; there are no fixed scene pins or pin spacers. Native mobile touch momentum is retained. App continuations scroll naturally after their preceding stories, and the final content/footer remains one sliding layer. The preloader layout-ready opacity gate and steady hero backgrounds remain.

## Images

116 assets were resized or recompressed. All 203 raster files, including 21 mobile variants, have no dimension over 1920px. The optimized assets reduced the affected files from about 48 MB to 28 MB. See `IMAGE_OPTIMIZATION.md` and the JSON report for the exact byte counts and mobile source manifest.

## Validation

Production build validates TypeScript and generates 21 routes. Sixteen motion checks cover indices, budgets, easing, entry cues, sticky continuity, Process sequencing, natural app release and the matching Home/Projects hero budget. `npm run check:images` validates dimensions and every mobile source path.

Browser review at 393x852 verified restored Home phases and portrait source selection; moving/fading Quality copy with fully opaque unsplit incoming prose; Services copy visible around half entry progress; stable second image selection; desktop-style project slide text; and fully opaque unmasked subservice paragraphs. Desktop review verified native title pieces on the split panels and continuous transfer coordinates at the first pixels of the flight.

Real-device touch performance still needs validation on the target phone. This ZIP does not update GitHub or deploy Vercel.

## Run

Use Node.js 20.9+. Extract into a fresh folder, then `npm ci`, `npm run build`, `npm start`. Development uses `npm run dev`. The first build needs internet for Instrument Sans through next/font.

## v11 final pass

About's hidden first-hero underlay and opaque split curtains prevent underlying content from flashing while images decode. Home section 10 enters at timeline 0.12 instead of 0.65, from a measured viewport-edge position; mobile track placement uses 100svh. Home section 8 zoom runs from 1 to 1.12 on its entry mask timeline, with no later story hold.

Services collection layers now wipe horizontally in either scroll direction. Menu hover/focus uses cancellation-safe decoded image layers and a horizontal mask; open/close masks remain unchanged. Eight menu-only WebP sources total 723,938 bytes, down from 1,094,582 bytes (34% smaller). Closed desktop menus do not warm images, including the initial mobile hydration branch. Existing mobile portrait sources and native touch scrolling remain.

Production build and 16 motion checks passed. Browser review verified desktop/393x852 About initial opacity and opaque curtains; Harmony scales of 1.038 and 1.101 at entry progress 0.314 and 0.838; Quality copy starts at viewport+16 and enters opaque on the next scroll; mobile Services changes to the correct image; and focus-driven menu preview selection. This is viewport QA, not a physical phone performance measurement.

## Home interaction fixes (v12)

Transparent scene tracks no longer intercept pointer input; clipped content surfaces remain interactive. The split invitation's transparent wrapper also ignores input, while its visible panels retain their own hit regions. Pricing buttons can be used as soon as their part of the section is exposed.

Home hero initial copy waits for motion preparation before becoming visible; later copy phases start hidden in the rendered markup, avoiding a visible-hidden-visible first-load flash. Process opening text moves upward 48px while fading continuously with scroll, on both desktop and mobile.

V12 validation: production build generated 21 routes. Browser checks at pricing entry progress 0.685 confirmed native pointer clicks selected Expanded and Premium and updated descriptions. Process text at intermediate scroll had opacity 0.4765 and y=-25.13px, then reached opacity 0 and y=-48px. Hero later phases begin hidden; the opening block waits for motion initialization.

## Water, button text and fixed Process crop (v13)

CTA labels use Auren-style rolling characters with 0.5s easing and 12ms per-character staggering. This is text-only: existing button geometry, underline, colors and actions remain. Labels remain accessible as one phrase, disabled submit controls do not animate, touch hover is disabled and reduced motion gets static text. Rolling labels are excluded from the page SplitText scanner.

The desktop Process photo plane stays full-width. Its left clip progresses from 0 to 42.857143 percent; the container no longer resizes or reframes object-cover images. Following split-image wipes and outgoing text fades retain their timing. Mobile is unchanged. Browser measurements confirmed constant 1363px image width and an identity transform during intermediate and final clipping.

The water loop is rebuilt from the existing 1440x800 source, replacing the lower-resolution 1280x720 loop. VP9 CRF22 and H.264 CRF18 variants retain native dimensions, omit audio and crossfade the loop boundary. The preloader and desktop water shader select WebM with MP4 fallback. Desktop renderer pixel ratio is capped at 1.5, up from 1.15, to improve fine detail without unbounded Retina rendering. This improves use of available detail; no original 4K footage is supplied. The QA browser disables WebGL, so shader appearance requires a browser with WebGL enabled.

V13 validation: production build and 16 motion checks passed. Both water formats decoded without errors. Browser native video playback confirmed 1440x800, readyState 4, currentTime advancing and no video error. Rolling text settled at +4em with a -4em shadow and 12ms character delays. The WebGL renderer cannot be visually checked in the QA browser because WebGL context creation is disabled there.
