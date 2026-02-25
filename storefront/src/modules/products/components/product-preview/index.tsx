import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewAddToCart from "./preview-add-to-cart"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  if (!product) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const inventoryQuantity = product.variants?.reduce((acc, variant) => {
    return acc + (variant?.inventory_quantity || 0)
  }, 0)

  const stockLabel =
    inventoryQuantity > 0
      ? `${inventoryQuantity} left`
      : "In stock"

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div
        data-testid="product-wrapper"
        className="flex flex-col gap-4 relative aspect-[3/5] w-full overflow-hidden p-4 bg-white border border-enterprise-border rounded-xl shadow-enterprise-sm group-hover:shadow-enterprise-md group-hover:border-enterprise-accent/30 transition-all ease-in-out duration-200"
      >
        <div className="w-full h-full p-10">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
          />
        </div>
        <div className="flex flex-col">
          <Text className="text-enterprise-navy-muted text-xs font-medium">
            {(product.metadata as Record<string, unknown> | undefined)?.brand as string || "PRODUCT"}
          </Text>
          <Text className="text-enterprise-navy font-semibold" data-testid="product-title">
            {product.title}
          </Text>
          {(product.metadata as Record<string, unknown> | undefined)?.oem_reference && (
            <Text className="text-neutral-500 text-xs mt-0.5">
              Ref: {(product.metadata as Record<string, unknown>).oem_reference as string}
            </Text>
          )}
        </div>
        <div className="flex flex-col gap-0">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          <Text className="text-neutral-600 text-[0.6rem]">Excl. VAT</Text>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row gap-1 items-center">
            <span
              className={clx({
                "text-green-500": inventoryQuantity > 50,
                "text-orange-500":
                  inventoryQuantity > 0 && inventoryQuantity <= 50,
                "text-green-500": inventoryQuantity === 0,
              })}
            >
              •
            </span>
            <Text className="text-neutral-600 text-xs">
              {stockLabel}
            </Text>
          </div>
          <PreviewAddToCart product={product} region={region} />
        </div>
      </div>
    </LocalizedClientLink>
  )
}
