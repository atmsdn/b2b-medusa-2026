"use client"

import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-enterprise-navy via-enterprise-navy-light to-enterprise-navy">
      <div className="relative flex flex-col justify-center items-center text-center content-container py-24 small:py-32 gap-8">
        <span className="text-enterprise-accent-muted text-sm font-medium uppercase tracking-widest">
          Enterprise B2B Platform
        </span>
        <Heading
          level="h1"
          className="text-4xl small:text-6xl font-semibold text-white tracking-tight max-w-3xl"
        >
          Streamline Your Business Procurement
        </Heading>
        <p className="text-slate-300 text-lg small:text-xl max-w-2xl leading-relaxed">
          Access bulk pricing, manage quotes, and simplify ordering for your organization.
        </p>
        <div className="flex gap-4 mt-2">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center justify-center rounded-lg bg-enterprise-accent hover:bg-enterprise-accent-hover text-white font-semibold px-6 py-3 transition-colors shadow-enterprise-md"
          >
            Browse Catalog
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/account"
            className="inline-flex items-center justify-center rounded-lg border border-slate-500/50 hover:border-slate-400 text-white font-semibold px-6 py-3 transition-colors"
          >
            Account
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
