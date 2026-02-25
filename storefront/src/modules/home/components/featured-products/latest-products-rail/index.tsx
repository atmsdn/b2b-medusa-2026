import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@/modules/common/components/interactive-link"
import ProductPreview from "@/modules/products/components/product-preview"

export default async function LatestProductsRail({
  products,
  region,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  if (!products?.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24 bg-enterprise-slate-soft">
      <div className="flex justify-between items-center mb-8">
        <Text className="text-xl font-semibold text-enterprise-navy">
          Latest Products
        </Text>
        <InteractiveLink href="/store">View all</InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 small:grid-cols-4 gap-x-3 gap-y-3 small:gap-y-36">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
