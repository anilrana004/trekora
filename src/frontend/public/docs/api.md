# Trekora API Documentation

Base URL: `https://www.trekora.in/api` (versioned alias: `/api/v1`)

## Reviews

```
GET /api/reviews/{slug}?limit=100&skip=0
POST /api/reviews
```

Returns approved reviews for a trek or yatra slug. POST submissions are moderated before publication.

## Gallery

```
GET /api/gallery?trekSlug={slug}&type=trek&limit=120
```

## Weather

```
GET /api/weather?q=Manali
GET /api/weather?lat=32.24&lon=77.19
```

Server-side OpenWeather proxy — no client API key required.

## Product photos

```
GET /api/product-photos
```

## Customer inquiries (POST)

| Endpoint | Purpose |
|----------|---------|
| `POST /api/query` | Plan-a-trek / general inquiry |
| `POST /api/callback` | Callback request |
| `POST /api/booking` | Booking intent |

## Health

```
GET https://api.trekora.in/health
```

Returns `{ "ok": true, "mongo": ... }`.

## Discovery

- [API catalog](https://www.trekora.in/.well-known/api-catalog)
- [OpenAPI JSON](https://www.trekora.in/.well-known/openapi.json)
- [Agent skills index](https://www.trekora.in/.well-known/agent-skills/index.json)
