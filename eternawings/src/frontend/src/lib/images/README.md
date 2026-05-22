# Trekora Image System

This project uses a centralized image delivery pipeline built on:

- `OptimizedImage` component for UI rendering
- `HeroImage`, `CardImage`, `GalleryImage` wrappers for reusable variant-safe rendering
- `FullscreenImageModal` and `MasonryGallery` for premium gallery UX
- `src/lib/images/cloudinary-url.ts` utilities for URL generation
- `src/lib/images/cloudinary-upload.ts` for admin upload flows (images + videos)
- `OptimizedVideo` + `CinematicHeroMedia` for cinematic video backgrounds
- `MediaUpload` (admin): drag-and-drop, progress, retry, image + video
- `utils/mediaTransform.ts` + `lib/cloudinary.ts` as stable import surfaces
- Cloudinary folder map: `trekora/hero`, `trekora/destinations`, `trekora/treks`, `trekora/gallery`, `trekora/blogs`, `trekora/videos`, `trekora/reels`, `trekora/team`, `trekora/users`
- Cloudinary auto-optimization (`f_auto`, `q_auto`, width transforms; video: `vc_auto`)

## Core Rules

- Always use `OptimizedImage` for visual content in React components.
- Do not introduce raw `<img>` tags in pages/components (except inside `OptimizedImage` itself).
- Prefer semantic variants over ad-hoc sizing logic.
- Keep existing layout/styling unchanged; optimization should be architecture-only.

## Component API (Quick Use)

```tsx
import OptimizedImage from "@/components/media/OptimizedImage";

<OptimizedImage
  src={imageUrl}
  alt="Meaningful description"
  variant="trek-card"
  width={384}
  height={240}
/>
```

For container-based layouts:

```tsx
<div className="relative h-64">
  <OptimizedImage
    src={imageUrl}
    alt="Hero"
    fill
    variant="hero"
    priority
    blurUp
  />
</div>
```

## Variant Selection Guide

- `hero`: page heroes, LCP candidates
- `trek-card` / `yatra-card`: listing cards
- `destination`: destination tiles/grids
- `gallery-thumb`: gallery thumbnails
- `gallery-full`: lightbox/full gallery displays
- `blog-card`: blog strips/cards
- `banner-strip`: promo/offer strips
- `thumbnail`: compact utility thumbnails
- `avatar`: profile/reviewer/team avatars

## SEO and Meta Images

Use `buildSeoImageUrl()` for OG/Twitter/canonical social image URLs:

```ts
import { buildSeoImageUrl } from "@/lib/images";

const ogImage = buildSeoImageUrl(imageUrl);
```

## CMS / Database Readiness

For Payload/Mongo-style dynamic content:

- store image URLs (or Cloudinary public references) in DB
- resolve via `cmsImageUrl` and `cmsImageAlt`
- render through `OptimizedImage` so delivery stays consistent

## Environment

Client optimization requires:

- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET` (for unsigned direct admin uploads)

Keep API secrets server-side only. Do not expose secret keys in frontend envs.

## Admin Upload Layer

- Use `useImageUpload` for drag/drop + progress + retry upload flows.
- `ImageUploadField` is the shared admin UI building block.
- `image-management-api` defines contracts for future backend-managed image CRUD:
  - upload single / multiple
  - delete
  - update metadata
  - fetch image records

## Regression Safety Checklist (Before Merge)

- no new raw `<img>` tags
- no layout shift introduced
- alt text present for meaningful images
- hero images use `priority` only when above-the-fold
- all changed pages visually match previous UI
