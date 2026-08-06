@AGENTS.md

# BikeZone — Project Rules

## Project Vision

This is NOT a simple website build. The goal is an **Awwwards-quality, premium motorcycle dealership website** that looks like it belongs to a luxury motorcycle brand — cinematic, modern, premium, and highly interactive. The final result must look better than the reference screenshot originally provided by the user.

Act as a senior UI/UX designer and principal frontend engineer while working on this project.

## Hard Rules (always apply, every session)

- **Phase discipline**: Work only on the current phase. Never start the next phase until the current phase is fully finished and verified.
- **Clean, production-ready code.** Reusable component architecture.
- **Mobile-first** responsive design.
- **Semantic HTML.**
- **SEO friendly.**
- **Accessibility friendly** (WCAG-conscious: alt text, focus states, keyboard nav, contrast).
- **Performance optimized** — target **Lighthouse score above 95**.
- **Never use placeholder colored boxes.** Every visual element must be real, finished content.
- **Images**: Use only high-quality, realistic, royalty-free **Unsplash** motorcycle / dealership / showroom photography. No fake/generated illustrations. Optimize every image. Lazy-load all non-critical images.
- **Typography**: modern, premium type choices.
- **Animations**: Use **Framer Motion** and **GSAP** where appropriate. Animations must be elegant, smooth, and minimal — never gimmicky or excessive.
- **Consistent spacing** and a **premium, cohesive color palette** throughout.

## Definition of Done for Every Phase

Before marking any phase complete, always:

1. Run the application.
2. Open it in the browser and inspect every section.
3. Check responsiveness across breakpoints.
4. Fix layout issues, overflow, alignment, and spacing.
5. Fix console errors and hydration warnings.
6. Verify animations behave as intended.
7. Verify all images load correctly and are optimized.
8. Verify accessibility.
9. Verify performance.

Only after all of the above are verified should a phase be marked complete.

## Reporting Format

At the end of each phase, report using this structure:

- ✔ What was built
- ✔ What was tested
- ✔ What was fixed
- ✔ Remaining work

## Stack (Phase 1 established)

Next.js (App Router, TypeScript, src/ dir), Tailwind CSS, Shadcn UI, Framer Motion, GSAP, Lenis, Lucide Icons, Embla Carousel, React Hook Form, Zod, TanStack Query.

## Design System (Phase 2 established)

Full component library built on Shadcn primitives plus custom premium additions: Typography scale (`src/components/ui/typography.tsx`), Chip, Modal, GlassCard, Spinner (`src/components/ui/`), and motion primitives FadeIn/ScaleIn/ScrollReveal (`src/components/motion/`). Design tokens (elevation shadows, glow shadows, gradients, hover-effect utilities, semantic spacing) live in `src/app/globals.css` via `@theme` and `@utility`. Every component and token is rendered live at `/design-system` (noindexed, internal reference only) — check it in both themes before building new UI on top of these primitives.

Note: the site uses Lenis for global smooth scrolling — always verify scroll-dependent behavior with real mouse-wheel scrolling in the browser, not `element.scrollIntoView()`/`window.scrollTo()`, since Lenis's virtual scroll can desync from native scroll calls.

## Homepage Hero (Phase 3 established)

`src/features/home/hero.tsx` — full-screen cinematic hero: Unsplash background image (Ken Burns zoom + mouse parallax via `useMouseParallax`), dark gradient + radial-glow overlay, large display headline, dual CTAs, glassmorphism search panel (`hero-search-panel.tsx`, React Hook Form + Zod, Brand/Category/Price selects), and an animated stats row (`hero-stats.tsx`, `useCountUp`). Floating WhatsApp button (`src/components/layout/floating-whatsapp.tsx`) is wired globally in the root layout, not just the homepage — placeholder number in `siteConfig.links.whatsapp` needs replacing with the real business line.

**Important `FadeIn` gotcha**: `FadeIn` defaults to `whileInView` (scroll-triggered), which is correct for below-the-fold sections but silently never fires for above-the-fold content taller than the viewport (elements below the fold just stay invisible). Always pass `inView={false}` on `FadeIn` for hero/above-the-fold content so it animates on mount instead.

## Brand Showcase + Featured Bikes (Phase 4 established)

`src/features/home/brand-showcase.tsx` + `brand-card.tsx` — 8 hover-animated brand tiles (`src/constants/brands.ts`: Honda, Yamaha, Suzuki, Road Prince, Benelli, Kawasaki, United, Hi Speed) with Unsplash background photos, image zoom + arrow reveal on hover.

`src/features/home/featured-bikes.tsx` + `bike-card.tsx` — responsive Embla carousel (shadcn `carousel.tsx`) of bike cards (`src/constants/motorcycles.ts`, extended `Motorcycle` type with `mileage`/`cc`). Each card has wishlist + compare toggle buttons and a Quick View dialog with a spec grid.

Wishlist and compare state live in tiny dependency-free `useSyncExternalStore` modules: `src/lib/wishlist-store.ts` and `src/lib/compare-store.ts` (compare capped at `MAX_COMPARE = 3`). Navbar shows a wishlist count badge (`wishlist-button.tsx`); a floating `CompareBar` (`components/layout/compare-bar.tsx`) appears globally once 1+ bikes are selected and hides itself on `/compare` (its own destination page, built in Phase 5). `/wishlist` is still forward-linked but not built yet.

**`useSyncExternalStore` gotcha**: `getServerSnapshot` must return a **stable** reference (a module-level `const EMPTY: string[] = []`), never a fresh `() => []` — a new array literal on every call trips React's "getServerSnapshot should be cached" warning and can loop. Same fix applied to the stock shadcn `carousel.tsx`'s initial-sync effect (wrapped in `queueMicrotask` to satisfy `react-hooks/set-state-in-effect`) — expect to need it again for any future shadcn component with a mount-sync effect.

**Carousel prev/next button gotcha**: shadcn's default `CarouselPrevious`/`CarouselNext` position at `-left-12`/`-right-12`, which gets clipped by our `max-w-8xl` container's side padding (`px-4 sm:px-6 lg:px-8`). Override with a smaller offset (e.g. `-left-4 sm:-left-6`) whenever adding a new carousel.

**Dev server flakiness in this sandbox**: the `next dev` background process dies unpredictably (see Phase 1 note) — restart via a detached PowerShell `Start-Process` on a fresh port. If a freshly-restarted server 404s on `/` despite `page.tsx` being intact, it's a stale `.next` Turbopack cache from rapid port-hopping restarts, not a code bug — `rm -rf .next` and restart clean.

## Bike Finder Quiz + Compare + EMI Calculator (Phase 5 established)

- `/finder` (`src/features/finder/`) — multi-step wizard (`quiz-wizard.tsx`), 4 questions from `src/constants/quiz.ts`, matched against `FEATURED_MOTORCYCLES` by `src/lib/quiz-matcher.ts`'s weighted scoring (style match > budget range > experience-implied cc range > usage-category hints). Results (`quiz-results.tsx`) reuse `BikeCard` directly — any future BikeCard change automatically applies here too.
- `/compare` (`src/features/compare/compare-table.tsx`) — reads `useCompareIds()`, resolves ids against `FEATURED_MOTORCYCLES`, full spec table per bike with remove/clear. Empty state included. This is the destination the Phase 4 `CompareBar` already linked to.
- `/emi-calculator` (`src/features/emi/emi-calculator.tsx`) — real-time loan calculator (`src/lib/emi.ts`, standard amortization formula) using React Hook Form's `watch()` for reactive recompute via `useMemo`, no submit step. Deep-linkable via `?bike=<id>` (read server-side through async `searchParams` in `page.tsx`) — `BikeCard`'s Quick View dialog links here with the current bike preselected.

**Testing wishlist/compare state**: both stores are plain in-memory (no persistence by design). A hard browser navigation/reload resets them — that's expected. Only test cross-page persistence via **real in-app navigation** (clicking an actual `Link`/button, or `element.click()` in a JS eval), never via a fresh `navigate()` call, or you'll see a false "bug" that's actually just the test tool doing a full reload.

**Animation timing in this sandbox**: Framer Motion transitions (page-step fades, etc.) render noticeably slower here than a real browser — a screenshot taken immediately after an action often lands mid-transition (partial opacity/transform). Don't assume broken/invisible content is a bug; wait 2–3s and re-screenshot, or check computed `opacity` via JS, before concluding something's wrong.

## Upcoming Launches + Customer Gallery (Phase 6 established)

- `src/features/home/upcoming-launches.tsx` + `launch-card.tsx` — 3 teaser cards (`src/constants/launches.ts`) with a live countdown (`src/hooks/use-countdown.ts`, ticks every second) and a per-bike `NotifyMeModal` (RHF + Zod email validation, toast on success). Countdown targets are ISO datetimes — bump `launchDate` values forward if they ever land in the past (card falls back to an "Available now!" state via `isComplete`, but that's not the intended steady state).
- `src/features/home/customer-gallery.tsx` combines `gallery-masonry.tsx` (CSS-columns masonry, `src/constants/gallery.ts`'s `GALLERY_PHOTOS`, click opens a lightbox `Dialog`) and `video-reviews.tsx` (testimonial cards, click opens an expanded quote `Dialog`).
- **"Video Reviews" is honestly photo-based, not real video**: no video assets exist for this project, so these are portrait-photo testimonial cards with a decorative play-button affordance — clicking expands to a photo + full written quote, not actual video playback. If real customer video is ever supplied, swap the modal body for a `<video>`/embed but keep the same trigger pattern.
- Same `useCountdown`/effect hydration pattern as other client-only-state hooks in this project: state starts zeroed (matching SSR output) and only computes real values inside `useEffect` (wrapped in `queueMicrotask` per the established `set-state-in-effect` fix) so there's never a server/client mismatch.

## Bike Sound Preview + Virtual Showroom (Phase 7 established)

- `src/hooks/use-engine-sound.ts` — real-time Web Audio synthesis (no audio files exist for this project): a sawtooth + sub-square oscillator pair through a lowpass filter into a `GainNode`, with an `AnalyserNode` tap exposed via `analyserRef` for visualization. `playStart/playIdle/playRev/playAcceleration/stopEngine` schedule gain/frequency ramps (`linearRampToValueAtTime`, never a hard jump — avoids audio clicks) and use `window.setTimeout` chains (tracked in a ref, cleared on every new action) to auto-transition between states, e.g. Rev auto-returns to Idle after ~1s, Start auto-settles into Idle after ~0.7s. This is genuine synthesized audio, not fake/looping mp3s — disclose this to the user as "synthesized engine note," not "recorded engine sound."
- `src/features/home/sound-visualizer.tsx` — 24-bar equalizer reading `analyserRef.current.getByteFrequencyData()` inside its own `requestAnimationFrame` loop, writing bar heights directly via `ref.style.height` rather than React state, so the 60fps visual update never re-renders `BikeSoundPreview`'s button row.
- `src/features/home/bike-sound-preview.tsx` — wires the hook + visualizer into 5 buttons (Engine Start/Idle/Rev/Acceleration/Stop); active button highlighted via `activeState`.
- `src/features/home/showroom-viewer.tsx` — drag-to-tilt "360 placeholder": manual pointer tracking (not Framer's built-in `drag` prop) feeds a `useMotionValue`/`useSpring` `rotateY`, springs back to 0 on release. Takes `image` as its own prop, separate from `bike.image` — the shared `FEATURED_MOTORCYCLES` bike photos are lower-resolution lifestyle shots not composed for a centered showroom crop, so this feature uses its own dedicated, well-composed Unsplash image (defined as `SHOWROOM_IMAGE` in `virtual-showroom.tsx`) while still pulling real spec values (`cc`/`power`/`topSpeed`/`weight`/`price`) from the matched `Motorcycle` record for the 5 hotspots. Honestly labeled "Drag to preview · Full 360° coming soon" — this is a real interaction, not true multi-angle photography.
- `src/features/home/showroom-hotspot.tsx` — pulsing marker (shadcn `popover.tsx`, newly installed) positioned by `top`/`left` percentage strings; opens a `Popover` with label + value. Hotspot coordinates are hand-tuned per-image (not derived from any real bounding-box data) — if `SHOWROOM_IMAGE` is ever swapped, re-check hotspot placement visually against the new photo's composition.

## Homepage Dashboard Redesign (Phase 8 established)

Restructured the homepage from stacked full-bleed sections into a dense, dashboard-style bento grid (matching a user-supplied reference). Brand identity (BikeZone) and currency (USD) were deliberately **not** changed to match the reference's Pakistan/PKR positioning — only its layout density and visual language, which already fit the existing red/black theme.

- `src/constants/currency.ts` — single `CURRENCY_CODE`/`CURRENCY_LOCALE` pair consumed by `formatPrice`/`formatNumber` (`src/utils/format.ts`). This is the one place to flip currency site-wide later; it only changes formatting, not the underlying mock catalog prices.
- `src/features/home/bento-tile.tsx` — shared compact-tile shell (`GlassCard` + icon/label eyebrow + heading) reused by every dashboard tile below. Any new homepage tile should use this instead of a bespoke `<section>` wrapper.
- `Motorcycle` type (`src/types/index.ts`) gained `stock` and `popularity` mock fields (`src/constants/motorcycles.ts`) feeding `src/lib/stock.ts` (`getStockSummary`) for the Live Stock tile and a `popularity`-sort for the Top Bikes tile.
- `src/constants/branches.ts` — 4 fictional branch locations (real metro-area coordinates, fictional 555-numbers/names) powering `src/features/home/dealer-locator.tsx`. Map rendering (`dealer-locator-map.tsx`) uses `leaflet`/`react-leaflet` (new deps) against free OpenStreetMap tiles, dynamically imported with `next/dynamic({ ssr: false })` since Leaflet touches `window` — **any future map tile must follow this same dynamic-import pattern** or the build breaks on SSR. The map fits bounds to all branch markers (`L.latLngBounds`) rather than a fixed center/zoom, so it always shows every branch regardless of coordinates. "Find Nearest" uses real `navigator.geolocation` + haversine distance (`src/lib/geo.ts`), with a genuine denied/unsupported fallback state — not a fake success path.
- Three new modals mirror the established `NotifyMeModal` pattern (RHF + Zod + `sonner` toast, no backend anywhere in this project so a toast is the honest simulation): `test-ride-modal.tsx`, `price-alert-modal.tsx`, `reserve-online-modal.tsx` (explicitly "pay at showroom" copy — never a real payment flow). All three are wired into `src/features/home/quick-actions.tsx`, a 6-tile grid also linking to the real `/finder`, `/emi-calculator`, and `/compare` pages (Compare tile shows a live badge count via `useCompareIds`).
- `live-stock.tsx`, `top-bikes.tsx` "View Inventory"/"View Top Bikes" CTAs link to `/collection` — same pre-existing forward-link gap as Featured Bikes' "View All Bikes" (page not built yet); this was a deliberate consistency choice, not an oversight.
- Existing sections were restyled into compact tiles without touching their underlying logic/hooks: `upcoming-launches.tsx`/`launch-card.tsx` (tall poster grid → compact list), `bike-sound-preview.tsx` (horizontal panel → vertical compact tile, same `use-engine-sound`/`SoundVisualizer`), `virtual-showroom.tsx` (always-mounted viewer → static preview image + "Enter Showroom" opens the unchanged `ShowroomViewer` inside a `Dialog`, which is also a perf win since the drag/motion logic no longer mounts on page load). `customer-gallery.tsx` was deleted and split into two independent tiles, `gallery-preview.tsx` and `video-reviews-preview.tsx`, each showing a compact preview and opening the original full `gallery-masonry.tsx`/`video-reviews.tsx` components inside a `Dialog` on "View Gallery"/"View All Videos".
- `src/features/home/trust-badges.tsx` — static 5-badge row, no new data needed.
- Footer (`src/components/layout/footer.tsx`) gained a `Popular Brands` column (reusing `BRANDS`) and a newsletter signup (`src/components/layout/newsletter-form.tsx`, same RHF+Zod+toast pattern, extracted as its own client component so `footer.tsx` itself can stay a server component).

**Dialog-in-Dialog is fine here**: `gallery-preview.tsx`'s "View Gallery" dialog wraps `GalleryMasonry` (which has its own per-photo lightbox `Dialog`), and `video-reviews-preview.tsx`'s "View All Videos" dialog wraps `VideoReviews` (own per-review `Dialog`). Radix Dialogs both portal to `document.body`, so nesting in the React tree causes no DOM-nesting or stacking issues — verified working in-browser.

**Screenshot-vs-real-bug gotcha (new instance)**: after moving `ShowroomViewer` behind a Dialog trigger, a screenshot taken right after opening the dialog showed a solid black box where the bike photo should be. `getBoundingClientRect`/`naturalWidth`/`complete` all confirmed the image was correctly loaded, sized, and topmost at that point — it was purely a slow first-paint on a freshly-mounted heavy component (Framer Motion + Next Image) in this sandbox, exactly like the previously-documented mid-transition screenshot issue. A second screenshot ~2s later showed it rendered correctly. Don't reflexively "fix" a blank image without checking `img.complete`/`naturalWidth` via `javascript_tool` first.

**Dev server flakiness got noticeably worse this phase**: the server died 4+ times across a single verification pass (previously an occasional issue, see Phase 1/4 notes) — likely resource contention from several other unrelated projects' dev servers concurrently running on this same machine. Same fix applies (restart via detached process on a fresh port each time), just budget for it happening more often.

## Finance Center + Accessories Store + Service Center (Phase 9 established)

Three new standalone pages, filling in nav destinations that Phase 8 had deliberately left out of scope. Each follows the established `page.tsx` pattern (metadata + render one feature component) and reuses the RHF + Zod + `sonner` toast pattern for every form — still no backend anywhere in this project, so a toast is the honest simulation for all of these too.

- `/finance` (`src/features/finance/finance-page.tsx`) — lender partner cards (`src/constants/lenders.ts`, new `Lender` type) + a `FinanceApplicationModal` pre-qualification form + the **existing** `EmiCalculator` component embedded wholesale as its own full-bleed section below a `border-t` (not nested inside the page's padded container — `EmiCalculator` carries its own `max-w-5xl`/padding, so nesting it inside another padded wrapper double-applies horizontal padding; render it as a sibling instead, exactly like this page does).
- `/accessories` (`src/features/accessories/accessories-store.tsx`) — new `Accessory`/`AccessoryCategory` types and `src/constants/accessories.ts` (10 items across Helmets/Jackets/Gloves/Luggage/Parts, real sourced-and-curl-verified Unsplash photos). Category filter via `Chip` (same pattern as the EMI calculator's down-payment presets). Per-product "Enquire" opens `AccessoryEnquiryModal`.
- `/service` (`src/features/service/service-center.tsx`) — a `Tabs`-based page (Book Service / Maintenance / Warranty) sharing one `activeTab` state. `MaintenancePackages`' "Book This Package" button both switches `activeTab` to `"booking"` **and** sets a `presetServiceTypeId` passed to `ServiceBookingForm` as `defaultValues` (not RHF's `values` option — `values` is for continuous external sync and would need a stable/memoized object across renders; since Radix `Tabs.Content` unmounts inactive tabs by default, a fresh `defaultValues` computed at mount time is simpler and correct here). `WarrantySection` reuses the `Accordion` primitive for FAQs and its own `WarrantyRegisterModal`.
- **RHF + Zod numeric fields**: don't use `z.coerce.number()` when you also declare `useForm<T>()` with the schema's `z.infer` type — coerce's INPUT type is `unknown`, which conflicts with `useForm`'s single generic (it needs input and output to match). Follow the existing `emi-calculator.tsx` convention instead: keep the schema field as plain `z.number()` and drive it through a `Controller` with `onChange={(e) => field.onChange(e.target.valueAsNumber || fallback)}` (see `accessory-enquiry-modal.tsx`'s quantity field).
- Navbar (`navLinks` in `src/constants/site.ts`) grew from 6 to 9 items (added Finance/Accessories/Service). This pushed the inline desktop nav past a comfortable `md:flex` width, so `navbar.tsx`'s breakpoint was bumped to `xl:flex`/`xl:hidden` (both the link row and the icon/CTA cluster, plus the mobile dropdown panel's own `xl:hidden`) — **any future nav link addition should re-check this breakpoint still fits before adding more items**, since there's no overflow/wrap handling, just a hard show/hide at the breakpoint.

## Dealer Locator page + Customer Reviews + FAQ (Phase 10 established)

Three more standalone pages. Given the top nav was already at capacity (see the `xl:flex` gotcha above), these were **deliberately not added to `navLinks`** — instead `src/constants/site.ts` gained a separate `supportLinks` array, rendered only in a new "Support" footer column (`footer.tsx`). Any future support-style page should go there too rather than growing the header nav further.

- `/locations` (`src/features/locations/locations-page.tsx`) — the full-page evolution of the homepage's `DealerLocator` bento tile: a larger map, `BranchCard`s with real "Get Directions" links (`https://www.google.com/maps/dir/?api=1&destination=lat,lng`, no API key needed since it's just an outbound link, not an embed), and the same "Find Nearest" flow. The geolocation-lookup logic (`navigator.geolocation` + haversine nearest-branch) was extracted out of the homepage tile into `src/hooks/use-nearest-branch.ts` so both places share one implementation — `dealer-locator.tsx` was refactored to consume it too, and now links out to `/locations` via "View All Locations".
- `/reviews` (`src/features/reviews/reviews-page.tsx`) — rating summary + distribution bars (`src/lib/reviews.ts`'s `getRatingSummary`), a rating-value `Chip` filter, and a `WriteReviewModal` (same RHF+Zod+toast pattern, plus a new interactive `StarRatingInput` component in `src/components/ui/`, distinct from the display-only `StarRating`). `src/constants/reviews.ts`'s `TESTIMONIALS` extends the homepage's existing `VIDEO_REVIEWS` (same 4 entries, kept verbatim) with 5 new ones — new entries deliberately use US-city locations (not Pakistani cities like the original 4) to avoid deepening the Phase 8 USD/Pakistan copy mismatch any further. The homepage's `video-reviews.tsx` and `video-reviews-preview.tsx` were refactored to use the shared `StarRating` component instead of each having their own local copy, and `video-reviews.tsx` gained a "View All Reviews" link to this page.
- `/faq` (`src/features/faq/faq-page.tsx`) — categorized, searchable FAQ (`src/constants/faq.ts`) using the existing `Accordion` primitive per category group, with a client-side search across both question and answer text. Distinct from (and doesn't duplicate) the Service Center's warranty-specific FAQ — this one covers site-wide buying/financing/service/delivery questions and cross-links to those other pages.
- **`ScrollReveal` + dynamically-filtered lists don't mix** — found and fixed on `/reviews`. `ScrollReveal`'s GSAP tween is created once in a `useLayoutEffect` keyed only on its `stagger` prop, targeting `Array.from(el.children)` captured at that moment; changing which children render later (e.g. a rating filter shrinking 8 cards down to 2) does **not** re-run the effect, so any filtered-back-in card can get stuck at `opacity: 0` forever (confirmed via `getComputedStyle(...).opacity` — waiting longer does not fix it, unlike the usual slow-first-paint gotcha). Fix: give `ScrollReveal` a `key` tied to the filter state (`<ScrollReveal key={activeFilter}>`) so React fully remounts it — and its effect — on every filter change. **Any future page pairing `ScrollReveal` with filterable/toggleable content needs this same `key` treatment**; static lists (brand showcase, launches, branch cards) are unaffected since their children never change after mount.

## Blog (Phase 11 established)

The project's first dynamic-segment routes: `/blog` (listing), `/blog/category/[category]`, and `/blog/[slug]` (article). All three share one `BlogListing`/`BlogCard` component set (`src/features/blog/`) and one data layer (`src/constants/blog.ts`'s `BLOG_POSTS`/`BLOG_CATEGORIES`, `src/lib/blog.ts` helpers).

- `categoryToSlug`/`slugToCategory` (`src/lib/blog.ts`) convert between the display category (`"Gear & Reviews"`) and its URL segment (`"gear-reviews"`) — both dynamic routes use `generateStaticParams` to pre-render every category and every post at build time (confirmed in `next build` output as `●` SSG routes), and call `notFound()` from `next/navigation` for an unmatched slug/category.
- `BlogListing` (`src/features/blog/blog-listing.tsx`) is reused by both `/blog` (all posts, no `activeCategory`) and the category route (pre-filtered `posts` + `activeCategory` to highlight) — same component, different props, avoiding duplicating the header/search/chip-row/grid markup. The category chip row are real `Link`s to `/blog/category/[slug]` (not client-side filter state), so categories are genuinely indexable, separate URLs — search stays client-side within whatever `posts` array was passed in.
- **`Chip` gained `asChild` support** (`src/components/ui/chip.tsx`, mirroring `Button`'s existing `Slot.Root` pattern) specifically so the category row could render real `<Link>`s styled as chips instead of nesting an anchor inside a button (invalid, inaccessible). When `asChild` is true, `Chip` renders only `children` directly (no `onRemove` wrapper) so `Slot.Root` always receives exactly the one child it expects — `onRemove` isn't meaningful combined with `asChild` and isn't supported together.
- `getRelatedPosts` (`src/lib/blog.ts`) scores every other post by shared-tag count (×2) plus same-category (+1) and returns the top 3 — no manual curation needed per post.
- SEO: each article's `generateMetadata` sets full OpenGraph `article` metadata (image, publishedTime, authors) and Twitter card data; `ArticlePage` additionally renders a `BlogPosting` JSON-LD `<script type="application/ld+json">` (verified via `JSON.parse(script.textContent)` in-browser). `src/app/sitemap.ts` now also enumerates the blog listing, all 5 category URLs, and all post URLs (post `lastmod` uses each post's real `publishedDate`, not the build date).
- Like Phase 10's support pages, `/blog` was **not** added to the crowded top `navLinks` — it went into `supportLinks` (footer "Support" column) instead, alongside Locations/Reviews/FAQ.
- **Card meta truncation gotcha**: `BlogCard`'s original layout put the author name/date in a `flex-1 min-w-0 truncate` column next to a separate right-aligned read-time badge; at 3-column grid width this squeezed real names down to `"Sam ..."`. Fixed by combining date + read time into one line under the name (`"Jan 25 · 7 min read"`) and dropping the separate badge — freed enough width for full names. Any new compact card with an author name + multiple metadata fields should combine secondary metadata onto one line rather than racing it against the name for horizontal space.

## Bike Details Page (Phase 12 established)

`/collection/[slug]` — the individual product detail page, the project's first dynamic route nested under `/collection` (the listing page itself is still not built, same pre-existing forward-link gap as `/about`/`/contact`; "Back to Collection" on this page will 404 until that's built). Uses `generateStaticParams`/`generateMetadata` exactly like the blog routes.

- `Motorcycle` (`src/types/index.ts`) gained `gallery: string[]` (2 extra real photos per bike beyond the existing `image`, sourced the same curl-verified way as every other image batch in this project — representative category photography, not literal multi-angle shots of one physical unit, consistent with how `image` itself already worked), `colors: {name, hex}[]`, and `features: string[]`, all populated in `src/constants/motorcycles.ts` for all 8 bikes.
- `src/features/bikes/` holds the page's building blocks: `BikeGallery` (thumbnail strip + lightbox `Dialog`, same pattern as gallery-masonry.tsx), `ColorSelector` (swatch buttons — a real selectable preference, not a fake photo-swap gimmick since there's no per-color photography), `SpecGrid` (Engine/Power/Top Speed/Mileage/Weight tiles), `FeaturesList`, and `RelatedBikes` (reuses `BikeCard` directly).
- `getRelatedBikes` (`src/lib/related-bikes.ts`) scores by same-category (+2) + same-brand (+1) + price-within-30% (+1), **tie-broken by ascending price difference** — without the tiebreaker, outlier bikes with no category/brand/price match to anything (e.g. the Ninja 300, the only Superbike and by far the priciest) would score 0 against every candidate and fall back to arbitrary array order. Any future "related X" scorer with a possible all-zero-score case needs a similar proximity tiebreaker, not just a raw score sort.
- The page reuses three existing pieces wholesale rather than rebuilding them: `EmiCalculator` (`initialBikeId={bike.id}`, rendered as a full-bleed sibling section exactly like the Phase 9 Finance page — same double-padding trap if nested inside the page's own padded container), the compare-store (`toggleCompare`/`useIsCompared`) and wishlist-store buttons copied from `BikeCard`, and `TestRideModal` (now accepts an optional `initialBikeId` prop, same `defaultValues`-at-mount pattern as Phase 9's `ServiceBookingForm` — safe here because each bike detail page is its own fresh page load, so there's no within-page scenario where the preset needs to change after mount).
- `BikeCard` (`src/features/home/bike-card.tsx`) now links to the detail page from the image and the bike name, plus a new "View Full Details" link in its Quick View dialog. **Nested-interactive-element gotcha**: wrapping the whole card image in a `<Link>` would have put the wishlist/compare/quick-view `<button>`s inside an `<a>` (invalid HTML, breaks click handling) — the fix keeps `Link` as a sibling `absolute inset-0` layer under the buttons (which sit later in paint order and naturally intercept their own clicks), not a parent wrapping them.
- Also added a `TestRideModal` instance directly to `BikeCard` (previously "Book Test Ride" in Quick View was a dead link to `/contact`) — every `BikeCard` instance now mounts its own idle `Dialog` + `TestRideModal`, consistent with how Quick View's own dialog already worked per-card; not a performance concern since closed Radix dialogs don't render to the DOM.
- **Found and fixed a real pre-existing hydration bug** in the shared `EmiCalculator` (`src/features/emi/emi-calculator.tsx`), only surfaced now because this was the first time it got exercised on a fresh SSR page load with dev tools actually checked: the principal/interest split bar's inline `style={{ width: `${principalPercent}%` }}` interpolated a raw, unrounded float (e.g. `81.27473430557328`), which the browser can normalize differently between the server-sent HTML and React's client-side hydration re-render, producing a "didn't match" console error. Fixed by `.toFixed(2)` before interpolating. **Any inline style built from a raw division/float — not just this one — should be rounded to a fixed precision before going into JSX**, not just for cosmetics but to avoid this exact class of hydration mismatch.
- **`SpecGrid` container-width gotcha**: it was originally styled `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`, which clipped tile content (`"296cc"` → `"296c"`, `"WEIGHT"` → `"WEIGH"`) because `lg:` breakpoints key off *viewport* width, not the width of the column the component actually sits in — on this page `SpecGrid` only gets the right half of a `lg:grid-cols-2` layout (~600px), not the full viewport. Capped at `sm:grid-cols-3` with no `lg:` bump. **Any grid-based component meant to live inside a narrower parent column must be styled for that column's real width, not the page viewport** — check where a shared/reusable grid component is actually mounted before trusting its own breakpoints.
