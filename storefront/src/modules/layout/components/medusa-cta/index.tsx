import { Text } from "@medusajs/ui"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 text-sm text-slate-500 items-center">
      Powered by
      <a
        href="https://www.medusajs.com"
        target="_blank"
        rel="noreferrer"
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <Medusa fill="#94a3b8" className="fill-current" />
      </a>
      &
      <a
        href="https://nextjs.org"
        target="_blank"
        rel="noreferrer"
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <NextJs fill="#94a3b8" className="fill-current" />
      </a>
    </Text>
  )
}

export default MedusaCTA
