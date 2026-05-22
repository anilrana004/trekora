# Dormant features (EMI, login, payment)

Code stays in the repo; features are **off** until you enable them.

## Current status (off)

**Frontend** — `trekora/src/.env`:

```env
VITE_ENABLE_LOGIN=false
VITE_ENABLE_PAYMENT=false
VITE_ENABLE_EMI=false
```

**Backend** — `trekora/src/backend/lib/dormant-features.mo` (all `false`; redeploy canister after changes).

Restart `npm run dev` after editing `.env`.

## Revive

1. Set the env vars you need to `true` in `src/.env`.
2. Set matching flags to `true` in `src/backend/lib/dormant-features.mo`.
3. Redeploy the IC canister, restart the frontend.

| Feature | Frontend | Backend |
|--------|----------|---------|
| EMI | `VITE_ENABLE_EMI=true` | `emiEnabled = true` |
| Login | `VITE_ENABLE_LOGIN=true` | `loginEnabled = true` |
| Payment | `VITE_ENABLE_PAYMENT=true` | `paymentEnabled = true` |

## While dormant

- No Login button, no `/dashboard`
- No EMI block on trek detail
- Booking drawer: enquiry email only (no Razorpay step)
- Canister: `initPayment` / `verifyPayment` return disabled; profile/referral APIs return disabled

`/book` and enquiry emails still work.
