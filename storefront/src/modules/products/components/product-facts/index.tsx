import {
  CheckCircleSolid,
  ExclamationCircleSolid,
  InformationCircleSolid,
} from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

type ProductMetadata = Record<string, unknown> | undefined

const ProductFacts = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const inventoryQuantity =
    product.variants?.reduce(
      (acc, variant) => acc + (variant.inventory_quantity ?? 0),
      0
    ) || 0

  const meta = product.metadata as ProductMetadata
  const oemRef = meta?.oem_reference as string | undefined
  const brand = meta?.brand as string | undefined
  const idDim = meta?.id_dim as string | undefined
  const odDim = meta?.od_dim as string | undefined
  const widthDim = meta?.width_dim as string | undefined
  const loadCapacity = meta?.load_capacity_kn as string | undefined
  const application = meta?.application as string | undefined
  const vehicleCompat = meta?.vehicle_compatibility as string | undefined

  const hasIndustrialAttrs =
    oemRef || brand || (idDim && odDim && widthDim) || loadCapacity

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {inventoryQuantity > 10 ? (
        <span className="flex items-center gap-x-2 text-neutral-600 text-sm">
          <CheckCircleSolid className="text-green-500" /> Can be shipped
          immediately ({inventoryQuantity} in stock)
        </span>
      ) : inventoryQuantity > 0 ? (
        <span className="flex items-center gap-x-2 text-neutral-600 text-sm ">
          <ExclamationCircleSolid className="text-orange-500" />
          Limited quantity available ({inventoryQuantity} in stock)
        </span>
      ) : (
        <span className="flex items-center gap-x-2 text-neutral-600 text-sm">
          <CheckCircleSolid className="text-green-500" /> In stock
        </span>
      )}
      {product.mid_code && (
        <span className="flex items-center gap-x-2 text-neutral-600 text-sm">
          <InformationCircleSolid />
          MID: {product.mid_code}
        </span>
      )}
      {hasIndustrialAttrs && (
        <div className="flex flex-col gap-y-1.5 pt-2 border-t border-neutral-200">
          <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Industrial specs
          </span>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-600">
            {oemRef && (
              <>
                <dt className="text-neutral-500">OEM ref</dt>
                <dd>{oemRef}</dd>
              </>
            )}
            {brand && (
              <>
                <dt className="text-neutral-500">Brand</dt>
                <dd>{brand}</dd>
              </>
            )}
            {application && (
              <>
                <dt className="text-neutral-500">Application</dt>
                <dd>{application}</dd>
              </>
            )}
            {idDim && odDim && widthDim && (
              <>
                <dt className="text-neutral-500">Dimensions (ID×OD×W)</dt>
                <dd>
                  {idDim}×{odDim}×{widthDim} mm
                </dd>
              </>
            )}
            {loadCapacity && (
              <>
                <dt className="text-neutral-500">Load capacity</dt>
                <dd>{loadCapacity} kN</dd>
              </>
            )}
            {vehicleCompat && (
              <>
                <dt className="text-neutral-500">Vehicle</dt>
                <dd>{vehicleCompat}</dd>
              </>
            )}
          </dl>
        </div>
      )}
    </div>
  )
}

export default ProductFacts
