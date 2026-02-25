"use client"

import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"

const SignInPrompt = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-enterprise-navy via-enterprise-navy-light to-enterprise-navy p-6 small:p-8">
      <div className="relative z-10 flex flex-col small:flex-row justify-between items-start small:items-center gap-4">
        <div>
          <Text className="text-white text-lg small:text-2xl font-semibold">
            Log in for faster checkout
          </Text>
          <Text className="text-slate-300 text-sm mt-1">
            Save your cart and access your order history
          </Text>
        </div>
        <div className="flex flex-row gap-3">
          <LocalizedClientLink href="/account?view=register">
            <Button
              variant="secondary"
              className="h-10 min-w-[120px] rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20"
              data-testid="sign-in-button"
            >
              Register
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/account?view=log-in">
            <Button
              variant="primary"
              className="h-10 min-w-[120px] rounded-lg bg-enterprise-accent hover:bg-enterprise-accent-hover text-white border-none"
              data-testid="sign-in-button"
            >
              Log in
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default SignInPrompt
