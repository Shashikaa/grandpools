# Image optimization

116 raster assets were resized or recompressed. Their combined size changed from 48.05 MB to 27.99 MB (41.8% reduction). Filenames and image content are retained; all raster dimensions are capped at 1920 pixels on the longest side.

There are 21 browser-selectable mobile variants, listed in `src/lib/mobile-images.json`. Key Home, About, Services, service-detail, Projects and Contact backgrounds select portrait crops or existing mobile photography. Mobile hero crops were reviewed for subject framing; these are image crops, not stretched desktop photos.

`ResponsiveImage.tsx` uses native picture/source selection, while `responsiveBackground()` supports CSS background layers. The Home hero uses a matching mobile CSS background and preload source. Existing tailored Services collection mobile images are retained.

Run `npm run check:images` to validate image dimensions and mobile-source paths. Run `node scripts/optimize-images.mjs` only when replacing source media; it performs a lossy production encode and writes a fresh JSON report. Keep original photography in your own source archive.

The machine-readable report is `scripts/image-optimization-report.json`.

## v11 menu derivatives

Eight menu-only portrait WebP derivatives (up to 800x1200) reduce menu transfer size from 1,094,582 to 723,938 bytes. Original content photos and v10 mobile sources remain unchanged. The image check now covers 203 raster files, all at or below 1920px, and 21 mapped mobile sources. See scripts/menu-image-report.json.
