"use client"

import Login from "@/modules/account/components/login"
import Register from "@/modules/account/components/register"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export enum LOGIN_VIEW {
  LOG_IN = "log-in",
  REGISTER = "register",
}

const LoginTemplate = ({ regions }: { regions: HttpTypes.StoreRegion[] }) => {
  const route = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(() => {
    const viewFromUrl = searchParams.get("view") as LOGIN_VIEW
    return viewFromUrl && Object.values(LOGIN_VIEW).includes(viewFromUrl)
      ? viewFromUrl
      : LOGIN_VIEW.LOG_IN
  })

  useEffect(() => {
    if (searchParams.has("view")) {
      const newParams = new URLSearchParams(searchParams)
      newParams.delete("view")
      router.replace(
        `${route}${newParams.toString() ? `?${newParams.toString()}` : ""}`,
        { scroll: false }
      )
    }
  }, [searchParams, route, router])

  const updateView = (view: LOGIN_VIEW) => {
    setCurrentView(view)
    router.push(`/account?view=${view}`)
  }

  return (
    <div className="grid grid-cols-1 small:grid-cols-2 min-h-[85vh]">
      <div className="flex justify-center items-center bg-enterprise-slate-soft p-8 small:p-12">
        {currentView === LOGIN_VIEW.LOG_IN ? (
          <Login setCurrentView={updateView} />
        ) : (
          <Register setCurrentView={updateView} regions={regions} />
        )}
      </div>

      <div className="relative hidden small:block bg-gradient-to-br from-enterprise-navy via-enterprise-navy-light to-enterprise-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(13, 148, 136, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(94, 234, 212, 0.15) 0%, transparent 40%)`,
            }}
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="text-white/90 text-lg font-medium max-w-sm">
            Streamline procurement with bulk pricing, quote management, and simplified ordering.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Enterprise B2B Commerce
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
