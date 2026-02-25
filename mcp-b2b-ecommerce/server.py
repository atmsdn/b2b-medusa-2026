#!/usr/bin/env python3
"""
MCP Server for Medusa B2B Ecommerce
Exposes architecture docs and low-code rules as resources.
Frontend + Backend guidance for open-source B2B platform.
"""
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RESOURCES_DIR = os.path.join(SCRIPT_DIR, "resources")


def _read_resource(name: str) -> str:
    """Read markdown resource file."""
    path = os.path.join(RESOURCES_DIR, f"{name}.md")
    if not os.path.exists(path):
        return f"# Not found\nResource {name} not found."
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def create_server():
    try:
        from mcp.server.fastmcp import FastMCP
    except ImportError:
        raise ImportError("Install: pip install 'mcp[cli]'")

    mcp = FastMCP(
        name="b2b-ecommerce",
        instructions="MCP for Medusa B2B ecommerce. Provides architecture docs and low-code rules. Use before modifying backend or frontend.",
    )

    # Resources - static docs
    @mcp.resource("b2b://docs/low-code-rules")
    def low_code_rules() -> str:
        """Low-code / No-code rules - what to modify vs preserve."""
        return _read_resource("low-code-rules")

    @mcp.resource("b2b://docs/backend-architecture")
    def backend_architecture() -> str:
        """Backend API, modules, workflows."""
        return _read_resource("backend-architecture")

    @mcp.resource("b2b://docs/frontend-architecture")
    def frontend_architecture() -> str:
        """Frontend app structure, modules, data layer."""
        return _read_resource("frontend-architecture")

    # Tools - for programmatic access
    @mcp.tool()
    def get_low_code_rules() -> str:
        """Get low-code/no-code rules. Call before any code change to ensure core logic is preserved."""
        return _read_resource("low-code-rules")

    @mcp.tool()
    def get_backend_architecture() -> str:
        """Get backend architecture (API, modules, workflows)."""
        return _read_resource("backend-architecture")

    @mcp.tool()
    def get_frontend_architecture() -> str:
        """Get frontend architecture (app structure, modules, data layer)."""
        return _read_resource("frontend-architecture")

    @mcp.tool()
    def validate_change_target(target: str) -> str:
        """Check if a file/path is safe to modify per low-code rules. Pass path like 'backend/src/api/store/companies/route.ts' or 'storefront/src/modules/layout/templates/nav/index.tsx'."""
        t = target.replace("\\", "/").lower()
        # DO NOT MODIFY
        if "validators.ts" in t or "query-config.ts" in t or "/migrations/" in t:
            return f"⚠️ DO NOT MODIFY: '{target}' is core logic (validators, migrations). Use config or additive extension."
        if "/service.ts" in t and "/modules/" in t:
            return f"⚠️ DO NOT MODIFY: '{target}' is module service. Extend via new modules."
        if "/models/" in t and "/modules/" in t:
            return f"⚠️ DO NOT MODIFY: '{target}' is data model. Use migrations for schema changes."
        if "/workflows/" in t and "/steps/" in t:
            return f"⚠️ DO NOT MODIFY: '{target}' is workflow step. Add new steps, don't replace."
        if "/lib/data/" in t or "/lib/util/" in t or "/types/" in t:
            return f"⚠️ CAUTION: '{target}' is data/util layer. Prefer additive, avoid breaking changes."
        # SAFE
        if ".env" in t or "tailwind" in t or "next.config" in t or "globals.css" in t:
            return f"✅ SAFE: '{target}' is config/styling."
        if "/components/" in t or "/templates/" in t:
            return f"✅ LIKELY SAFE: '{target}' is presentation. Styling/className OK. Avoid data/validation logic."
        return f"⚠️ REVIEW: Check resources/low-code-rules.md for '{target}'."

    return mcp


if __name__ == "__main__":
    mcp = create_server()
    mcp.run(transport="stdio")
