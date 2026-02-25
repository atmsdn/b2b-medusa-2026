# Backend Architecture

## Stack
- **Medusa 2.8** (headless commerce)
- **PostgreSQL** (via MikroORM)
- **Node 20+**

## Modules (Custom)

| Module | Path | Purpose |
|--------|------|---------|
| `company` | `src/modules/company/` | Companies, employees, roles |
| `quote` | `src/modules/quote/` | Quote management |
| `approval` | `src/modules/approval/` | Cart/order approvals |

## API Structure

### Store API (Customer-facing)
- `GET/POST /store/companies` - Company CRUD
- `GET/POST /store/companies/:id` - Company details
- `GET/POST /store/companies/:id/employees` - Employees
- `GET/POST /store/companies/:id/approval-settings` - Approval settings
- `GET/POST /store/quotes` - Quotes
- `GET/POST /store/quotes/:id/accept`, `/reject` - Quote actions
- `GET/POST /store/carts/:id/approvals` - Cart approvals
- `GET/POST /store/approvals/*` - Approval flows

### Admin API
- `GET/POST /admin/companies/*` - Company management
- `GET/POST /admin/quotes/*` - Quote management
- `GET/POST /admin/approvals/*` - Approval management

## Workflows
- `approval/` - Create approval, validate
- `employee/` - Create, update, delete employees
- `quote/` - Quote lifecycle (create, update, accept, reject)

## Hooks
- `validate-add-to-cart` - Spending limit check
- `order-created` - Post-order logic

## Config
- `medusa-config.ts` - Module resolution, env
