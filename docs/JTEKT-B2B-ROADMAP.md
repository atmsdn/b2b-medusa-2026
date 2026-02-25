# JTEKT B2B Ecommerce – Phased Implementation Roadmap

Reference: [JTEKT EU](https://www.jtekt.eu/) – Automotive, Industrial Bearings, Machine Tools, Aftermarket

---

## Phase 1: Industrial Catalog & Filtering
**Goal:** Industrial buyers filter, not browse.

| Feature | Status | Notes |
|---------|--------|-------|
| Vehicle compatibility filter | ⬜ | Custom product attribute (metadata) |
| OEM reference filter | ✅ | Shown on cards + product page via metadata |
| Load capacity filter | ⬜ | Product attribute (metadata, filter later) |
| Dimensions (ID/OD/Width) | ✅ | Product metadata, shown in ProductFacts |
| Application type filter | ✅ | Categories: Bearings, Steering, Driveline, etc. |
| Dummy JTEKT products | ✅ | 12 products across 6 categories |

**Medusa:** Product metadata (oem_reference, brand, id_dim, od_dim, width_dim, load_capacity_kn, application) + categories for filtering.

---

## Phase 2: Bulk Ordering UX
**Goal:** Enterprise ordering feel.

| Feature | Status | Notes |
|---------|--------|-------|
| Paste multiple SKU list | ⬜ | Textarea → parse → add to cart |
| CSV upload | ⬜ | SKU, Qty columns |
| Quantity grid input | ⬜ | Table view for bulk qty |
| Quick reorder from last invoice | ⬜ | Needs order history + “Reorder” action |

---

## Phase 3: Contract / Tiered Pricing
**Goal:** Different pricing per customer tier.

| Feature | Status | Notes |
|---------|--------|-------|
| Standard Distributor tier | ⬜ | Base pricing |
| OEM Partner tier | ⬜ | Better pricing |
| Strategic Partner tier | ⬜ | Best pricing + discounts |
| Different MOQ per tier | ⬜ | Min order quantity |
| Price rules in Medusa | ⬜ | Price lists / customer groups |

**Demo:** Log in as different accounts → pricing changes.

---

## Phase 4: Quote + Approval Workflow
**Goal:** Map real distributor process.

| Feature | Status | Notes |
|---------|--------|-------|
| Request Quote button | ✅ | Already in B2B starter |
| Sales rep price adjustment | ⬜ | Admin/quote workflow |
| Approval threshold (e.g. €50,000) | ⬜ | Approval module config |
| Order lock until approval | ⬜ | Cart/order state |
| Visual status: Submitted / Under Review / Approved / Rejected | ⬜ | UI badges + timeline |

---

## Phase 5: Sales Rep Assisted Ordering
**Goal:** Sales places order on behalf of distributor.

| Feature | Status | Notes |
|---------|--------|-------|
| Internal sales login | ⬜ | Admin or custom role |
| Place order on behalf of distributor | ⬜ | Impersonation / “Order for” |
| Override pricing (if allowed) | ⬜ | Permission + UI |
| View distributor order history | ⬜ | Filter by company/customer |

---

## Phase 6: Industrial Dashboard
**Goal:** Distributor-facing dashboard.

| Feature | Status | Notes |
|---------|--------|-------|
| Open quotes | ⬜ | Quote list widget |
| Credit limit usage | ⬜ | Company/customer attribute |
| Pending approvals | ✅ | B2B starter has this |
| Top ordered SKUs | ⬜ | Analytics / recent orders |
| Reorder shortcut | ⬜ | From order history |
| Delivery SLA status | ⬜ | Fulfillment metadata |
| Simple charts | ⬜ | Optional |

---

## Phase 7: Advanced Search
**Goal:** Industrial buyers search by part number.

| Feature | Status | Notes |
|---------|--------|-------|
| SKU autocomplete | ⬜ | Algolia / Meilisearch / custom |
| OEM reference search | ⬜ | Search by OEM part number |
| Fuzzy match for industrial codes | ⬜ | Typo tolerance |

---

## Phase 8: ERP Simulation (Demo)
**Goal:** Show enterprise readiness without real ERP.

| Feature | Status | Notes |
|---------|--------|-------|
| Mock API service | ⬜ | Simulated inventory sync |
| “Inventory sync every 60 sec” | ⬜ | Fake polling + badge |
| “Order sent to SAP” status | ⬜ | Order metadata + badge |
| SAP / ERP badge in UI | ⬜ | Visual only for demo |

---

## Phase 9: Multi-language + Multi-currency
**Goal:** Europe-ready demo.

| Feature | Status | Notes |
|---------|--------|-------|
| EN + DE toggle | ⬜ | i18n |
| EUR + GBP pricing | ⬜ | Regions in Medusa |
| Currency switch in header | ⬜ | Region selector |

---

## Phase 10: Enterprise API Readiness (Demo)
**Goal:** Show API-first architecture.

| Feature | Status | Notes |
|---------|--------|-------|
| GET products | ⬜ | Store API |
| POST order | ⬜ | Store API |
| GET pricing | ⬜ | Store API |
| Postman collection | ⬜ | Export for demo |

---

## Demo Narrative (Performance & Scalability)
- 50,000+ SKU capable
- Headless architecture
- ERP-ready
- Cloud deployable
- Modular expansion

---

## Suggested Order (6–8 weeks focused)
1. **Phase 1** – Industrial catalog + dummy JTEKT products  
2. **Phase 3** – Tiered pricing  
3. **Phase 2** – Bulk ordering  
4. **Phase 4** – Quote workflow enhancements  
5. **Phase 9** – Multi-language + currency (or later)  
6. **Phase 8** – Mock ERP  
7. **Phase 5** – Sales rep mode  
8. **Phase 6** – Industrial dashboard  
9. **Phase 7** – Advanced search  
10. **Phase 10** – API demo  

---

## JTEKT Product Categories (for dummy data)
- Steering Systems  
- Steering Columns  
- Driveline Systems  
- Automotive Bearings  
- Industrial Bearings  
- Electronic Power Control Modules  
- Machine Tools  
- Aftermarket (spare parts, remanufacturing)  

Brands: JTEKT, Koyo, Toyoda, Torsen, FujiKiko, MSW
