# Smyan Reddy: Research Portfolio

Static research portfolio and Lambert iGEM 2027 project proposal site (`PENTA(mer)`), deployed via GitHub Pages at `https://math12345678.github.io/portfolio/`. Built with semantic HTML5, modern CSS custom properties and grid, optimized research figures (`assets/figures/`), and lightweight vanilla JavaScript with zero third-party runtime dependencies, trackers, or cookies.

## File structure

- `index.html`: Single-page research portfolio (`/`) with anchored sections and `Person` JSON-LD structured data.
- `penta-mer/index.html`: Dedicated proposal page (`/penta-mer/`) presenting verbatim sections of the `PENTA(mer)` congenital CMV saliva assay proposal with primary focus on the four integrated computational models, clinical problem and split-enzyme design, hardware tiers, and Human Practices.
- `assets/figures/`: Optimized WebP figures extracted directly from the research portfolio PDF.
- `content.js`: Single editable content object (`window.SITE_CONTENT`) synchronized across both pages.
- `styles.css`: Complete editorial design system, responsive 12-column grid, dark mode tokens, reduced-motion rules, and black-on-white print stylesheet.
- `main.js`: Client-side bindings, active navigation state (`IntersectionObserver`), mobile `Menu` disclosure, clipboard helper, and persisted `Light / Dark` theme toggle.
- `favicon.svg` and `og-image.svg`: Vector monogram icon and typographic social preview card.
- `robots.txt` and `sitemap.xml`: Search engine indexing files.

## Editing text content

All portfolio copy is stored in `content.js` inside `window.SITE_CONTENT`:

1. Open `content.js` in any text editor.
2. Edit strings inside `hero`, `pentamer`, `work`, `projects`, `skills`, `writing`, `leadership`, `recognition`, `training`, `researchInterests`, or `contact`.
3. Reload `/` or `/penta-mer/` in the browser. `main.js` binds each `data-bind` element to `window.SITE_CONTENT` automatically without requiring HTML edits or a build step.
4. For maximum search-crawler parity when making major permanent text revisions, update the matching fallback text in `index.html` and `penta-mer/index.html` as well.

When adding external links for repositories or preprints currently marked with `TODO: Link coming` comments in `content.js` and `index.html`, include `target="_blank" rel="noopener noreferrer"` on external anchors.

## Uploading a public CV PDF

The Contact section links to `smyan-reddy-cv.pdf`. No PDF is bundled in the repository by default to protect personal contact details.

1. Export a public version of the CV with phone numbers, street addresses, student identification numbers, and reference contact emails removed.
2. Save the redacted file at the repository root as `smyan-reddy-cv.pdf`.
3. Verify the PDF metadata and text layer before publishing.

## Adding an optional portrait

An empty, commented-out portrait container is prepared in `index.html` inside the Hero section:

1. Save a compressed portrait image (for example, `portrait.jpg`, aspect ratio roughly 4:5) in the project root directory.
2. Open `index.html` and locate the `TODO: Optional portrait slot` comment inside `<section class="hero">`.
3. Uncomment the `<figure class="hero-portrait">` block and set explicit `width` and `height` attributes on the `<img>` tag to prevent layout shift. The grid rules in `styles.css` automatically reflow the hero into an 8-column text and 4-column portrait spread on desktop viewports.

## Local preview

Run any static HTTP server from this directory:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080/` and `http://localhost:8080/penta-mer/`.

## Deployment

Deployed automatically via GitHub Pages from the `main` branch (`/`) of `math12345678/portfolio` (`https://math12345678.github.io/portfolio/`). When adding a custom domain later, update the canonical and Open Graph URLs in `index.html`, `penta-mer/index.html`, `robots.txt`, and `sitemap.xml`.
