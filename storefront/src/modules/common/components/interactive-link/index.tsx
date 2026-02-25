import { ArrowUpRightMini } from "@medusajs/icons"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={clx("flex gap-x-1 items-center group", className)}
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-enterprise-accent group-hover:text-enterprise-accent-hover font-medium transition-colors">{children}</Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150 text-enterprise-accent"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
