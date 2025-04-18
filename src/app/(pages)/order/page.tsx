"use client"

import { useState } from "react"

import { Download } from "lucide-react"
import PaginationControls from "@/components/pagination-controls"
import OrdersTable from "@/components/orders-table"
import FiltersBar from "@/components/fiters-bar"

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true)

  
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-amber-500/20">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-[2px] h-2 bg-amber-500 mx-[0.5px]"></div>
                  <div className="w-[2px] h-3 bg-amber-500 mx-[0.5px]"></div>
                  <div className="w-[2px] h-1 bg-amber-500 mx-[0.5px]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div>
                <div className="text-xs font-semibold">SIGNORIA</div>
                <div className="text-xs text-green-500">0.00</div>
              </div>
              <div>
                <div className="text-xs font-semibold">NIFTY BANK</div>
                <div className="text-xs text-green-500">52,323.30</div>
              </div>
              <div>
                <div className="text-xs font-semibold">NIFTY FIN SERVICE</div>
                <div className="text-xs text-green-500">25,255.75</div>
              </div>
              <div>
                <div className="text-xs font-semibold">RELCHEMO</div>
                <div className="text-xs text-green-500">162.73</div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div>MARKETWATCH</div>
            <div>EXCHANGE FILES</div>
            <div className="flex items-center">
              PORTFOLIO
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className="flex items-center">
              FUNDS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">LK</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold">Open Orders</h1>
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>

          <FiltersBar />
          <OrdersTable isLoading={isLoading} />
          <PaginationControls />
        </div>
      </main>
    </div>
  )
}
