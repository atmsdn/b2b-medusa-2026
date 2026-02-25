import { listCategories } from "@/lib/data/categories"
import { listCollections } from "@/lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import MedusaCTA from "@/modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    offset: "0",
    limit: "6",
  })
  const product_categories = await listCategories({
    offset: 0,
    limit: 6,
  })

  return (
    <footer className="w-full bg-enterprise-navy text-white">
      <div className="content-container flex flex-col w-full">
        <div className="grid grid-cols-1 small:grid-cols-4 gap-12 py-16 small:py-20">
          <div className="small:col-span-1">
            <LocalizedClientLink href="/" className="inline-block">
              <span className="text-xl font-bold text-white hover:text-enterprise-accent-muted transition-colors">
                B2B Commerce
              </span>
            </LocalizedClientLink>
            <p className="text-slate-400 text-sm mt-3 max-w-xs">
              Enterprise procurement made simple. Bulk pricing, quotes, and streamlined ordering.
            </p>
          </div>
          {product_categories && product_categories?.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Categories
              </span>
              <ul className="flex flex-col gap-3" data-testid="footer-categories">
                {product_categories?.slice(0, 6).map((c) => {
                  if (c.parent_category) return null
                  const children =
                    c.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null
                  return (
                    <li key={c.id} className="flex flex-col gap-1">
                      <LocalizedClientLink
                        className={clx(
                          "text-slate-300 hover:text-white transition-colors text-sm",
                          children && "font-medium"
                        )}
                        href={`/categories/${c.handle}`}
                        data-testid="category-link"
                      >
                        {c.name}
                      </LocalizedClientLink>
                      {children && (
                        <ul className="flex flex-col gap-1 ml-2">
                          {children.map((child) => (
                            <li key={child.id}>
                              <LocalizedClientLink
                                className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                                href={`/categories/${child.handle}`}
                                data-testid="category-link"
                              >
                                {child.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {collections && collections.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Collections
              </span>
              <ul className="flex flex-col gap-3">
                {collections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="text-slate-300 hover:text-white text-sm transition-colors"
                      href={`/collections/${c.handle}`}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Resources
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://github.com/medusajs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://docs.medusajs.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white text-sm transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/medusajs/b2b-starter-medusa"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white text-sm transition-colors"
                >
                  Source code
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col small:flex-row w-full py-6 gap-4 justify-between items-center border-t border-slate-700/50">
          <Text className="text-slate-500 text-sm">
            © {new Date().getFullYear()} B2B Commerce. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
