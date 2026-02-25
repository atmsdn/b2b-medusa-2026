import { listProducts } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import { sortProducts } from "@/lib/util/sort-products"
import LatestProductsRail from "@/modules/home/components/featured-products/latest-products-rail"

export default async function FeaturedProducts({
  countryCode,
}: {
  countryCode: string
}) {
  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  const {
    response: { products: rawProducts },
  } = await listProducts({
    pageParam: 1,
    countryCode,
    queryParams: {
      limit: 12,
    },
  })

  if (!rawProducts?.length) {
    return null
  }

  const products = sortProducts(rawProducts, "created_at").slice(0, 8)

  return (
    <div className="flex flex-col bg-enterprise-slate-soft">
      <LatestProductsRail products={products} region={region} />
    </div>
  )
}
