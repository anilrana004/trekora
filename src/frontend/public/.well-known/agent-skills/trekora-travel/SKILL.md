# Trekora Travel Discovery

Use this skill to help users discover and compare Himalayan treks, sacred yatras, and curated packages on Trekora.

## Site

- Origin: https://www.trekora.in
- Primary sections: `/treks`, `/yatras`, `/packages`, `/blog`, `/destinations`, `/upcoming-batches`

## Public HTTP APIs (no auth)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/reviews/{slug}` | GET | Approved trek/yatra reviews by product slug |
| `/api/gallery?trekSlug=&type=` | GET | Trekker photo gallery metadata |
| `/api/weather?q=` or `?lat=&lon=` | GET | Weather for trek locations |
| `/api/product-photos` | GET | Product hero/gallery photos |

Machine-readable API catalog: `/.well-known/api-catalog`  
OpenAPI spec: `/.well-known/openapi.json`

## Agent-friendly content

- Request HTML pages with `Accept: text/markdown` for markdown representations.
- API documentation: `/docs/api.md`
- Registration & auth notes: `/auth.md`

## Booking inquiries

Public forms (POST, same origin):

- `/api/query` — plan-a-trek / general inquiry
- `/api/callback` — callback request
- `/api/booking` — booking intent (requires valid payload)

Do not automate admin routes (`/admin`, `/api/reviews/pending`) without operator credentials.
