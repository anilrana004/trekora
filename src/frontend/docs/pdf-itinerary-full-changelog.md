# Trekora PDF Itinerary — Full Chat Changelog & Specification

This document records **every user request** and **every implementation step** from the Cursor chat about trek/yatra itinerary PDF downloads, in chronological order. Use it as the single source of truth for what was asked, what was built, and how it should behave.

**Primary files (when fully implemented):**

| File | Role |
|------|------|
| `src/frontend/src/lib/pdfGenerator.ts` | PDF layout, images, footers, trek + yatra generators |
| `src/frontend/src/pages/TrekDetailPage.tsx` | Builds `itinerary` on page; calls `downloadTrekItineraryPDF(trek, itinerary)` |
| `src/frontend/src/pages/YatraDetailPage.tsx` | Calls `downloadYatraItineraryPDF(yatra)` |
| `src/frontend/src/lib/site-brand.ts` | `SITE_LOGO_URL` (Cloudinary) |
| `src/frontend/src/lib/site-contact.ts` | `query@trekora.in`, `+91 99977 13364` |

**Note:** If your local `pdfGenerator.ts` still shows the older version (generic itinerary, red header, “Book This Trek” box, no logo), re-apply the changes described in sections 2–12 below. This doc describes the **target state** agreed in chat, not necessarily the file on disk today.

---

## Chat 1 — Can the itinerary PDF be edited?

### User question

> Can I edit the “Download Full Itinerary PDF” content?

### Answer (product)

- **No CMS/admin UI** — content is not editable in a dashboard.
- **Yes in code** — edit `pdfGenerator.ts` and redeploy.
- **Button label** — change text in `TrekDetailPage.tsx` / `YatraDetailPage.tsx`.
- **Important at that time:** Trek PDF used a **generic day-by-day template** inside `pdfGenerator.ts`, **not** the same text as the website Itinerary tab. Yatra PDF tried to use `yatra.itinerary` when shaped correctly.

---

## Chat 2 — PDF must match the page itinerary (data flow only)

### User request

> Pass actual itinerary data from `TrekDetailPage.tsx` into the PDF generator so the PDF matches the page. **Do not** change UI, colors, or layout — only fix data flow.

### Problem

- Page used `buildItinerary()` or `SPITI_VALLEY_ITINERARY` from `TrekDetailPage.tsx`.
- PDF used separate `buildTrekItinerary(trek)` in `pdfGenerator.ts` (shorter generic copy).

### Implementation

1. **Removed** `buildTrekItinerary()` from `pdfGenerator.ts`.
2. **Exported** type `TrekItineraryDay` (day, title, altitude, stay, desc/description, distance, etc.).
3. **Changed signature:**
   ```ts
   downloadTrekItineraryPDF(trek: Trek, itinerary: TrekItineraryDay[])
   ```
4. **TrekDetailPage.tsx** — both download buttons:
   ```ts
   onClick={() => downloadTrekItineraryPDF(trek, itinerary)}
   ```
   where `itinerary` is the same array as the Itinerary tab:
   ```ts
   trek.slug === SPITI_VALLEY_TREK_SLUG
     ? SPITI_VALLEY_ITINERARY
     : buildItinerary(trek.duration, trek.startPoint, trek.altitude);
   ```
5. Day numbers in PDF: `day.day ?? i + 1` (aligned with `D{i+1}` on site).

### Unchanged (by design)

- PDF colors, section order, stats grid, About, narrative day list, What’s Included, Essential Gear.

---

## Chat 3 — Logo, company footer, authorisation (add only missing)

### User request

Add **only** what was missing:

#### 1. Company logo (top)

- Trekora logo top-left.
- Try `/public/logo.png`, else project logo (Cloudinary `SITE_LOGO_URL`).

#### 2. Company footer (every page)

- Separator line, then one row:
  - Website: `www.trekora.in`
  - Phone: `+91 99977 13364`
  - Email: `query@trekora.in`
  - Instagram: `@trekora.in`
- Second line: `Trusted by 10,000+ Adventurers | 4.9★ Rated on Google | 100% Responsible Tourism`

#### 3. Authorisation (last page only)

`Authorised Travel Company | Reg. No.: UDYAM-UK-07-0041727 | Recognised by Uttarakhand Tourism Development Board`

**Rule:** Do not change itinerary content, layout structure, or other parts — only logo + footer blocks.

### Implementation

- Constants `PDF_COMPANY` in `pdfGenerator.ts`.
- `resolveLogoDataUrl()` — `/logo.png` then `SITE_LOGO_URL`.
- `drawPdfPageFooter()` — line + contact row + trust line.
- `drawAuthorizationLine()` — last page only.
- `applyFootersToAllPages()` — loop all pages after content is drawn.
- Used for **trek** and **yatra** PDFs.

---

## Chat 4 — Trek photos in PDF

### User request

> Add images from the particular trek to that trek’s itinerary PDF, and logo too.

### Implementation

- Load up to **6** URLs from `trek.images` + `trek.galleryImages` (deduped).
- `loadImageForPdf()` via `buildSeoImageUrl()` (Cloudinary); WebP → JPEG for jsPDF.
- **Cover:** `images[0]` full width under title bar.
- **Before day list:** `images[1]` + `images[2]` side by side (or one full width).
- **Between days:** remaining images spaced through itinerary (`photoEvery` logic).
- `drawPdfImage()` wrapped in try/catch so one bad image does not break PDF.
- Fetch **timeouts** so slow CDN does not hang forever.

---

## Chat 5 — Remove red “Book This Trek” contact box

### User request

> Remove the red banner: “Book This Trek — Trekora” with bookings@trekora.com / phone / www.

### Implementation

- Removed **Contact Footer** block (red rectangle + book CTA) from trek PDF end.
- Same block removed from yatra PDF (“Book This Yatra — Trekora”).
- **Kept** page footers from Chat 3 (company details + authorisation).

---

## Chat 6 — Remove header text; orange header bar

### User request

> Remove “Trekora / Himalayan Treks & Sacred Yatras / Where Every Peak Tells a Story” and make header background **orange**.

### Implementation

- Removed those three text lines from header.
- Header bar fill: **ORANGE** `[232, 119, 34]` (`#E87722`).
- **Logo only** on orange bar (left).
- Footer separator line also uses orange accent.
- Navy **trek/yatra title bar** below orange header unchanged.

---

## Chat 7 — Download not working (fix)

### User report

> Not able to download the itinerary.

### Root causes fixed

1. **Unicode vs jsPDF** — `★`, `₹`, en-dashes broke `doc.text()` → PDF failed silently or threw.
2. **Image fetch hang** — no timeout on Cloudinary fetches.
3. **No user feedback** — failed promise with no alert.

### Implementation

- `sanitizePdfText()` — `₹` → `Rs.`, `★` → `*`, strip non–WinAnsi chars.
- `pdfText()` helper using sanitized strings.
- `fetchWithTimeout()` / `AbortController` (e.g. 8s per image, 15s batch budget for trek photos).
- `downloadTrekItineraryPDF` try/catch → throw friendly message.
- **TrekDetailPage:** `handleDownloadItineraryPdf()` + `window.alert` on error.
- Trust line stored with `★` in source but rendered via sanitize as `*` in PDF.

---

## Chat 8 — Audit: add missing PDF sections (full spec)

### User request

Audit `pdfGenerator.ts`, compare to list below, **add ONLY missing** items. Do not remove existing content. Pull from `trek` / `yatra` where possible. **Only change `pdfGenerator.ts`** (plus data already passed from pages).

Also: logo on each trek/yatra itinerary.

### Already present before this pass (keep)

- Logo + footers (Chat 3)
- Trek name navy bar, stats grid, About, narrative itinerary, What’s Included, Essential Gear, trek photos
- Yatra: stats, significance, itinerary narrative

### Added (trek PDF)

| # | Section | Details |
|---|---------|---------|
| 1 | **Header section** | Large bold trek name; tagline (`shortDesc` or fallback); badge row `[X Days \| Difficulty \| Region]`; short intro paragraph |
| 2 | **Overview box (left)** | Region, Duration (Nights/Days), Best Time, Max Altitude, Trek Type, Difficulty, Base Camp (~30% max alt), Total Distance |
| 3 | **Highlights box** | Bullets from `trek.highlights` → else `trek.tags` → else placeholder note to populate from data |
| 4 | **Inclusions box (spec)** | Green bullets: Accommodation, All meals, Trek Leader & Support Staff, Permits, Camping equipment, First Aid & O₂, Technical equipment if required |
| 5 | **Exclusions box** | Red bullets: Transport to/from base, Personal expenses, Travel insurance, Anything not in inclusions |
| 6 | **Day-wise table** | Columns: DAY, ROUTE/DESTINATION, DISTANCE, TREK TIME, ALTITUDE, OVERNIGHT, HIGHLIGHTS; orange day circles; data from passed `itinerary` |
| 7 | **Quick info bar** | Max alt, base camp, duration, difficulty, temperature (altitude-based fallback), best time |
| 8 | **Bottom stats bar** | Best time, max alt, distance, difficulty, permits yes, safety note |
| 9 | **Footer** | Already in Chat 3 — no duplicate |

**Existing sections kept:** stats grid, About, table + narrative itinerary, original What’s Included list, Essential Gear.

### Added (yatra PDF)

- Same pattern where data exists: header, overview/highlights, quick info, table from `yatra.itinerary` (object → days), inclusions/exclusions from `yatra.inclusions` / `yatra.exclusions` or PDF defaults, bottom stats, cover image from `yatra.images`, footers.

### Helpers introduced (conceptual)

- `PdfLayoutState`, `yRef`, `drawSectionTitle`, `drawContentHeader`, `drawOverviewAndHighlights`, `drawQuickInfoBox`, `drawItineraryTable`, `drawSpecInclusionsBox`, `drawExclusionsBox`, `drawBottomStatsBar`, yatra variants.

---

## Chat 9 — Cloudinary logo URL on every page + itinerary

### User request

> Use `https://res.cloudinary.com/ddbcauxef/image/upload/v1778744940/wpn00ko2pztesvmf8z76.png` on each page and each trek/yatra itinerary section.

### Implementation

- `PDF_LOGO_URL` = that URL (primary; matches `SITE_LOGO_URL`).
- `resolveLogoDataUrl()` fetches raw PNG first.
- Logo on page 1 orange header + extra placements on pages/sections (later refined in Chat 10).

---

## Chat 10 — Logo overlap fix + “invisible” watermark (world-class look)

### User report

> Logo overlaps in itinerary (double TREKORA / stacked logos).

### Cause

Logo drawn **multiple times** in same area:

- Header bar + top-left every page
- Again in `applyFootersToAllPages`
- Again above itinerary table and narrative sections

### Fix (final branding model)

| Placement | Behavior |
|-----------|----------|
| **Page 1** | **One** visible logo in orange header bar only |
| **Every page** | **One** faint **centered watermark** (~7% opacity), large, behind content |
| **Removed** | Top-left logo on every page; logos above itinerary blocks |

### Implementation

- `buildWatermarkLogo(logo)` — canvas, `globalAlpha = 0.07`, PNG data URL.
- `drawWatermarkLogo()` — centered on page (~128×46 mm).
- `applyFootersToAllPages(doc, …, watermark)` — watermark + footer + authorisation on last page.
- **No** `drawPageLogo` / `drawItinerarySectionLogo` in final version.

---

## Chat 11 — Will direct download slow the website?

### Answer (product)

- **No** for normal visitors — PDF runs **only on button click**.
- **jspdf** loaded dynamically (`import("jspdf")`), not in main bundle for every page.
- **That user** may wait a few seconds (logo + up to 6 images + multi-page layout).
- **Not** server-side PDF for every page view.
- Optional improvements: loading spinner, fewer images, or server-side PDF later.

---

## Target PDF structure (trek) — end state

Order after all chats (additive; some blocks appear twice by design — e.g. spec inclusions + original “What’s Included”):

1. Orange header bar — **single logo**
2. Navy bar — trek name, days, state, price (`Rs.` not `₹`)
3. Cover photo (if loaded)
4. Content header — title, tagline, badges, intro
5. Overview + Highlights (two columns)
6. Quick info navy bar
7. Stats grid (original)
8. About This Trek (original)
9. **Day Wise Itinerary** table (with columns)
10. Photos before narrative (if any)
11. **Day-by-Day Itinerary** narrative (from page `itinerary`)
12. Inline photos between days (if any)
13. Inclusions (spec list)
14. Exclusions (spec list)
15. What’s Included (original longer list)
16. Essential Gear (original)
17. Bottom stats orange bar
18. On save: **watermark every page** + footer every page + authorisation last page

**Removed:** red “Book This Trek” box; duplicate header text on orange bar.

---

## Target PDF structure (yatra) — end state

1. Orange header + single logo  
2. Navy yatra title bar  
3. Cover image (if any)  
4. Yatra content header + overview/highlights + quick info  
5. Stats row + Spiritual Significance (if present)  
6. Day-wise table (from `yatra.itinerary` record)  
7. Inclusions / exclusions (yatra data or defaults)  
8. Day-by-Day narrative (if itinerary exists)  
9. Bottom stats bar  
10. Watermark + footers + authorisation  

---

## Company constants (final)

```ts
website: "www.trekora.in"
phone: "+91 99977 13364"
email: "query@trekora.in"
instagram: "@trekora.in"
trustLine: "Trusted by 10,000+ Adventurers | 4.9* Rated on Google | 100% Responsible Tourism"
authorization: "Authorised Travel Company | Reg. No.: UDYAM-UK-07-0041727 | Recognised by Uttarakhand Tourism Development Board"
```

Logo URL:

```
https://res.cloudinary.com/ddbcauxef/image/upload/v1778744940/wpn00ko2pztesvmf8z76.png
```

---

## TrekDetailPage integration checklist

- [ ] `itinerary` built once (Spiti vs `buildItinerary`)
- [ ] `downloadTrekItineraryPDF(trek, itinerary)` on both PDF buttons
- [ ] `handleDownloadItineraryPdf` with error alert (if download fix applied)

---

## YatraDetailPage integration checklist

- [ ] `downloadYatraItineraryPDF(yatra)` on download button
- [ ] Rich yatras: `itinerary`, `inclusions`, `exclusions` in `yatras.ts` used by PDF

---

## Performance & reliability checklist

- [ ] Dynamic `import("jspdf")`
- [ ] Image fetch timeouts
- [ ] `sanitizePdfText` on all user-facing strings
- [ ] `drawPdfImage` try/catch
- [ ] User-visible error on failure

---

## How to verify after re-applying code

1. Open any trek → Itinerary tab → Download PDF.  
2. Confirm day text **matches** expanded days on site (not generic Lohajung-only template).  
3. Confirm **no** red “Book This Trek” box at bottom.  
4. Confirm orange header with **one** logo; **no** double TREKORA.  
5. Flip pages — faint centered watermark, footer contact lines on each page.  
6. Last page — authorisation line below footer.  
7. Repeat on a yatra with `itinerary` in data.  

---

## Revision history (chat order)

| Step | Topic |
|------|--------|
| 1 | Editable? Where files live |
| 2 | Pass real itinerary from TrekDetailPage |
| 3 | Logo + footer + authorisation |
| 4 | Trek images in PDF |
| 5 | Remove Book This Trek/Yatra red box |
| 6 | Remove header text; orange bar |
| 7 | Fix download (unicode, timeout, errors) |
| 8 | Full section audit (overview, table, exclusions, etc.) |
| 9 | Cloudinary logo URL |
| 10 | Overlap fix → watermark only |
| 11 | Performance FAQ |

---

*Document generated from the full Cursor chat session on Trekora PDF itineraries. Update this file when PDF behavior changes in code.*
