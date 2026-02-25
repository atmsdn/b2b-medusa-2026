# Frontend Architecture

## Stack
- **Next.js 15** (App Router)
- **Medusa JS SDK** (@medusajs/js-sdk)
- **Tailwind CSS** + @medusajs/ui-preset
- **Geist** font

## App Structure

```
src/app/[countryCode]/
├── (main)/          # Store, account, products, cart
│   ├── page.tsx     # Home
│   ├── store/       # Product listing
│   ├── products/[handle]/
│   ├── cart/
│   ├── account/     # Dashboard, profile, company, orders, quotes
│   └── categories/[...category]/
├── (checkout)/      # Checkout flow
└── order/confirmed/[id]/
```

## Modules

| Module | Path | Purpose |
|--------|------|---------|
| `layout` | `modules/layout/` | Nav, footer, mega-menu |
| `products` | `modules/products/` | Product preview, thumbnails, actions |
| `cart` | `modules/cart/` | Cart drawer, button |
| `checkout` | `modules/checkout/` | Checkout steps |
| `account` | `modules/account/` | Account nav, dashboard, company |
| `orders` | `modules/order/` | Order details |
| `quotes` | `modules/quotes/` | Quote components |
| `store` | `modules/store/` | Refinement list, pagination |

## Data Layer
- `lib/data/` - Server-side data fetching (cart, customer, products, etc.)
- `lib/config.ts` - SDK config (baseUrl, publishableKey)

## Key Patterns
- Server components by default
- `LocalizedClientLink` for href
- `content-container` for max-width layout
- `retrieveCustomer()`, `retrieveCart()` for auth
