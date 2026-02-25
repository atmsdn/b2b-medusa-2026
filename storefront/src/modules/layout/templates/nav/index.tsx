import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import FilePlus from "@/modules/common/icons/file-plus"
import LogoIcon from "@/modules/common/icons/logo"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { Suspense } from "react"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()

  return (
    <div className="sticky top-0 inset-x-0 bg-white text-enterprise-navy border-b border-enterprise-border shadow-enterprise-sm z-50">
      <header className="flex w-full content-container relative small:mx-auto justify-between">
        <div className="small:mx-auto flex justify-between items-center min-w-full small:py-3 py-2">
          <div className="flex items-center small:space-x-8">
            <LocalizedClientLink
              className="hover:text-enterprise-accent transition-colors flex items-center w-fit"
              href="/"
            >
              <h1 className="small:text-lg text-sm font-semibold flex items-center tracking-tight text-enterprise-navy">
                <LogoIcon className="inline mr-2.5" />
                B2B Commerce
              </h1>
            </LocalizedClientLink>

            <nav>
              <ul className="space-x-4 hidden small:flex">
                <li>
                  <Suspense fallback={<SkeletonMegaMenu />}>
                    <MegaMenuWrapper />
                  </Suspense>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex justify-end items-center gap-1 small:gap-3">
            <div className="relative mr-2 hidden small:inline-flex">
              <input
                disabled
                type="text"
                placeholder="Search products..."
                className="bg-gray-50 text-enterprise-navy border border-enterprise-border rounded-lg px-4 py-2 pr-10 w-64 text-sm placeholder:text-slate-400 hover:cursor-not-allowed"
                title="Install a search provider to enable product search"
              />
            </div>

            <div className="h-5 w-px bg-enterprise-border hidden small:block" />

            {customer && cart?.items && cart.items.length > 0 ? (
              <RequestQuoteConfirmation>
                <button
                  className="flex gap-1.5 items-center rounded-lg px-3 py-2 text-sm font-medium text-enterprise-navy-muted hover:text-enterprise-accent hover:bg-enterprise-slate-soft transition-colors"
                >
                  <FilePlus />
                  <span className="hidden small:inline-block">Quote</span>
                </button>
              </RequestQuoteConfirmation>
            ) : (
              <RequestQuotePrompt>
                <button className="flex gap-1.5 items-center rounded-lg px-3 py-2 text-sm font-medium text-enterprise-navy-muted hover:text-enterprise-accent hover:bg-enterprise-slate-soft transition-colors">
                  <FilePlus />
                  <span className="hidden small:inline-block">Quote</span>
                </button>
              </RequestQuotePrompt>
            )}

            <Suspense fallback={<SkeletonAccountButton />}>
              <AccountButton customer={customer} />
            </Suspense>

            <Suspense fallback={<SkeletonCartButton />}>
              <CartButton />
            </Suspense>
          </div>
        </div>
      </header>
    </div>
  )
}
