# Trekora — Client Information Required

Please provide the following details to complete your website setup:

1. **Phone Number** — Canonical: `+91 99977 13364` / `919997713364` in `src/frontend/src/lib/site-contact.ts` (`SITE_PHONE_*`, `SITE_PHONE_WA_DIGITS`). Update there if your live number differs.

2. **Formspree Form ID** — Sign up at [formspree.io](https://formspree.io), create a form, and replace `REPLACE_WITH_CLIENT_FORM_ID` in `src/components/ui/EnquiryModal.tsx` (`FORMSPREE_ENDPOINT`).

3. **Email Address** — Replace `hello@trekora.com` if different (`SITE_EMAIL` in `src/lib/site-contact.ts`).

4. **Real Trek Photos** — Upload to Cloudinary under a `trekora/` folder structure; set `VITE_CLOUDINARY_CLOUD_NAME` (see `src/frontend/.env.example`).

5. **Guide Names & Certifications** — For the About/Team section (Phase 2).

6. **Google Reviews** — Share Google Business Profile link for review widget (Phase 2).

7. **DTOI Registration Number** — To be added to trust badges and footer (Phase 2).

8. **GST Number** (if applicable) — For footer display.

9. **Real Testimonials** — Replace seeded data in `src/data/reviews.ts` when ready.
