import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import LogoIcon from "@/modules/common/icons/logo"
import MedusaCTA from "@/modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mb-2 w-full bg-white relative small:min-h-screen">
      <div className="h-16 bg-white border-b border-enterprise-border">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink className="hover:text-enterprise-accent transition-colors" href="/">
            <h1 className="text-base font-semibold flex items-center text-enterprise-navy">
              <LogoIcon className="inline mr-2" />
              B2B Commerce
            </h1>
          </LocalizedClientLink>
        </nav>
      </div>
      <div className="relative bg-enterprise-slate-soft" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div>
    </div>
  )
}
