import { useCart } from "@/lib/context/cart-context"
import { clx } from "@medusajs/ui"
import Spinner from "@/modules/common/icons/spinner"
import { useState } from "react"

const DeleteButton = ({
  id,
  className,
  disabled,
}: {
  id: string
  className?: string
  disabled?: boolean
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const { handleDeleteItem } = useCart()

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await handleDeleteItem(id)
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className={clx(
          "text-enterprise-navy-muted text-xs border border-enterprise-border rounded-lg px-3 py-1.5 hover:bg-red-50 hover:border-red-200 hover:text-red-600 min-w-20 flex items-center justify-center transition-colors",
          disabled ? "opacity-50 pointer-events-none" : "opacity-100"
        )}
        onClick={() => handleDelete(id)}
        disabled={disabled}
      >
        {isDeleting ? <Spinner size={12} /> : "Remove"}
      </button>
    </div>
  )
}

export default DeleteButton
