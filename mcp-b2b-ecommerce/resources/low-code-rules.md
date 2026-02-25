# B2B Ecommerce Low-Code / No-Code Rules

## Core Principle
**Preserve open-source logic. Extend via configuration and composition, not modification.**

---

## DO NOT MODIFY (Core Logic)

### Backend
| Path | Reason |
|------|--------|
| `backend/src/modules/*/models/` | Data models (Company, Employee, Quote, Approval) |
| `backend/src/modules/*/service.ts` | Module service logic |
| `backend/src/workflows/*/steps/` | Workflow step implementations |
| `backend/src/api/*/validators.ts` | Request validation schemas |
| `backend/src/api/*/query-config.ts` | Query transformation configs |
| `backend/src/modules/*/migrations/` | Database migrations |

### Frontend
| Path | Reason |
|------|--------|
| `storefront/src/lib/data/*.ts` | Data fetching layer (cart, customer, products) |
| `storefront/src/lib/util/*.ts` | Core utilities (money, get-product-price) |
| `storefront/src/types/*.ts` | Type definitions |

---

## SAFE TO CUSTOMIZE (Configuration)

| Path | How |
|------|-----|
| `backend/.env` | Environment variables |
| `backend/medusa-config.ts` | Module config (resolve paths) |
| `storefront/.env` | Environment variables |
| `storefront/next.config.js` | Images, redirects, env |
| `storefront/tailwind.config.js` | Theme, colors, screens |
| `storefront/src/styles/globals.css` | CSS variables, utilities |

---

## SAFE TO EXTEND (Additive)

| Path | How |
|------|-----|
| `backend/src/api/*/` | Add new routes (don't modify existing route.ts) |
| `backend/src/api/middlewares.ts` | Add new routes to middlewares |
| `storefront/src/modules/*/components/` | Add new components |
| `storefront/src/app/**/` | Add new pages/routes |

---

## SAFE TO STYLE (Presentation Only)

| Path | What |
|------|------|
| `storefront/src/modules/*/components/**/*.tsx` | className, styling, layout |
| `storefront/src/modules/*/templates/**/*.tsx` | Layout, structure |
| `storefront/src/styles/globals.css` | CSS variables |

---

## Additive vs Replace

- **Add**: New route, new component, new page, new middleware entry
- **Replace**: Changing core logic, validators, workflows, data layer

---

## Checklist Before Any Edit

1. Is this in the "DO NOT MODIFY" list?
2. Is this adding (new file/route) or replacing (editing existing logic)?
3. If replacing: Is it config (env, tailwind) or presentation (className, layout)?
