# WELLFORD

Luxury men's footwear storefront — Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run optimize:assets  # regenerate public/media from public/images + public/videos (needs Pillow + ffmpeg)
```

## Where things live

| What | File |
| --- | --- |
| Brand config (Instagram URL, contact email, currency) | `src/config/brand.ts` |
| Products, prices, sizes, collections | `src/data/products.ts` |
| FAQ answers | `src/data/faq.ts` |
| Shipping / privacy / terms text | `src/data/policies.ts` |
| Homepage editorial copy | `src/data/content.ts` |
| Navigation | `src/data/navigation.ts` |
| Commerce backend (swap for Shopify here) | `src/lib/commerce/index.ts` |
| Cart state (localStorage) | `src/lib/cart/cart-context.tsx` |

## Awaiting confirmed business information

Nothing below has been invented; the UI shows an honest "to be confirmed" state until these are filled in.

- **Size run**: provisional UK 6–11 (`sizesProvisional: true`).
- **Shipping & returns, privacy, terms**: `body: null`.
- **Instagram URL and contact email**: `null` in `brand.ts`.
- **Order tracking** (`/track-order`): set `ORDER_LOOKUP_ENDPOINT` (see `.env.example`). Until then the page says tracking is not available yet and points to client care.
- **Newsletter / contact form**: set `NEWSLETTER_ENDPOINT` / `CONTACT_ENDPOINT` (see `.env.example`). Until then the forms explain that sign-up isn't open yet. They never fake a success.
- **Checkout**: disabled until a real checkout (e.g. Shopify) is connected.

## Shopify

Implement `CommerceProvider` (`src/lib/commerce/types.ts`) against the Storefront API and switch the export in `src/lib/commerce/index.ts`. The types mirror Shopify's `Product` / `MoneyV2`, so pages and components don't change.
