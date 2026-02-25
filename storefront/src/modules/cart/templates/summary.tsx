"use client"

import { useCart } from "@/lib/context/cart-context"
import { getCheckoutStep } from "@/lib/util/get-checkout-step"
import CartToCsvButton from "@/modules/cart/components/cart-to-csv-button"
import CartTotals from "@/modules/cart/components/cart-totals"
import PromotionCode from "@/modules/checkout/components/promotion-code"
import Button from "@/modules/common/components/button"
import Divider from "@/modules/common/components/divider"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import { B2BCustomer } from "@/types"
import { ApprovalStatusType } from "@/types/approval"
import { ExclamationCircle } from "@medusajs/icons"
import { Container } from "@medusajs/ui"

type SummaryProps = {
  customer: B2BCustomer | null
  spendLimitExceeded: boolean
}

const Summary = ({ customer, spendLimitExceeded }: SummaryProps) => {
  const { handleEmptyCart, cart } = useCart()

  if (!cart) return null

  const checkoutStep = getCheckoutStep(cart)
  const checkoutPath = checkoutStep
    ? `/checkout?step=${checkoutStep}`
    : "/checkout"

  const checkoutButtonLink = customer ? checkoutPath : "/account"

  const isPendingApproval = cart?.approvals?.some(
    (approval) => approval?.status === ApprovalStatusType.PENDING
  )

  return (
    <Container className="flex flex-col gap-y-4 p-6 rounded-xl border border-enterprise-border bg-white shadow-enterprise-sm">
      <h3 className="text-enterprise-navy font-semibold text-lg">Order summary</h3>
      <CartTotals />
      <Divider />
      <PromotionCode cart={cart} />
      <Divider className="my-2" />
      {spendLimitExceeded && (
        <div className="flex items-center gap-x-2 bg-amber-50 border border-amber-200 p-3 rounded-lg">
          <ExclamationCircle className="text-amber-600 w-5 h-5 shrink-0" />
          <p className="text-enterprise-navy text-sm">
            This order exceeds your spending limit. Please contact your manager for approval.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <LocalizedClientLink href={checkoutButtonLink} data-testid="checkout-button">
          <Button
            className="w-full h-11 rounded-lg bg-enterprise-accent hover:bg-enterprise-accent-hover text-white font-semibold"
            disabled={spendLimitExceeded}
          >
            {customer
              ? spendLimitExceeded
                ? "Spending Limit Exceeded"
                : "Checkout"
              : "Log in to Checkout"}
          </Button>
        </LocalizedClientLink>
        {!!customer && (
          <RequestQuoteConfirmation>
            <Button
              className="w-full h-10 rounded-lg border border-enterprise-border hover:bg-enterprise-slate-soft font-medium"
              variant="secondary"
              disabled={isPendingApproval}
            >
              Request Quote
            </Button>
          </RequestQuoteConfirmation>
        )}
        {!customer && (
          <RequestQuotePrompt>
            <Button
              className="w-full h-10 rounded-lg border border-enterprise-border hover:bg-enterprise-slate-soft font-medium"
              variant="secondary"
              disabled={isPendingApproval}
            >
              Request Quote
            </Button>
          </RequestQuotePrompt>
        )}
        <CartToCsvButton cart={cart} />
        <Button
          onClick={handleEmptyCart}
          className="w-full h-10 rounded-lg border border-enterprise-border hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-enterprise-navy-muted font-medium"
          variant="secondary"
          disabled={isPendingApproval}
        >
          Empty Cart
        </Button>
      </div>
    </Container>
  )
}

export default Summary
