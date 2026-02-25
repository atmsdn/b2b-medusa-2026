# B2B Ecommerce MCP Server

MCP (Model Context Protocol) server for the Medusa B2B ecommerce platform. Provides architecture documentation and low-code/no-code rules for both **frontend** and **backend**.

## Setup

```bash
# From project root
pip install "mcp[cli]"
# or
uv add "mcp[cli]"  # if using uv
```

## Resources (Read-only docs)

| URI | Description |
|-----|-------------|
| `b2b://docs/low-code-rules` | What to modify vs preserve |
| `b2b://docs/backend-architecture` | API, modules, workflows |
| `b2b://docs/frontend-architecture` | App structure, modules, data layer |

## Tools

| Tool | Description |
|------|-------------|
| `get_low_code_rules` | Get low-code rules (call before code changes) |
| `get_backend_architecture` | Get backend architecture |
| `get_frontend_architecture` | Get frontend architecture |
| `validate_change_target` | Check if a file path is safe to modify |

## Cursor Integration

Configured in `.cursor/mcp.json`. Restart Cursor after setup.

## Principles

- **Preserve** core logic (workflows, validators, services, data layer)
- **Customize** via config (.env, tailwind, next.config)
- **Extend** additively (new routes, components, pages)
- **Style** freely (className, layout, presentation)
