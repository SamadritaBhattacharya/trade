"use client"

import { ArrowUpDown, Filter, MoreVertical } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

type Order = {
  time: string
  client: string
  ticker: string
  tickerAudio?: boolean
  side: "Buy" | "Sell"
  product: string
  qty: string
  price: string
}

const orders: Order[] = [
  {
    time: "08:14:31",
    client: "AAA001",
    ticker: "RELIANCE",
    tickerAudio: true,
    side: "Buy",
    product: "CNC",
    qty: "50/100",
    price: "250.50",
  },
  {
    time: "08:14:31",
    client: "AAA003",
    ticker: "MRF",
    side: "Buy",
    product: "NRML",
    qty: "10/20",
    price: "2,700.00",
  },
  {
    time: "08:14:31",
    client: "AAA002",
    ticker: "ASIANPAINT",
    tickerAudio: true,
    side: "Buy",
    product: "NRML",
    qty: "10/30",
    price: "1,500.60",
  },
  {
    time: "08:14:31",
    client: "AAA002",
    ticker: "TATAINVEST",
    side: "Sell",
    product: "INTRADAY",
    qty: "10/10",
    price: "2,300.10",
  },
]

export default function OrdersTable({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-sm text-left">
            <th className="px-4 py-3 font-medium text-gray-700">
              <div className="flex items-center">
                Time <ArrowUpDown className="h-3.5 w-3.5 ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 font-medium text-gray-700">
              <div className="flex items-center">
                Client <ArrowUpDown className="h-3.5 w-3.5 ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 font-medium text-gray-700">Ticker</th>
            <th className="px-4 py-3 font-medium text-gray-700">
              <div className="flex items-center">
                Side <Filter className="h-3.5 w-3.5 ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 font-medium text-gray-700">
              <div className="flex items-center">
                Product <ArrowUpDown className="h-3.5 w-3.5 ml-1" /> <Filter className="h-3.5 w-3.5 ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 font-medium text-gray-700">
              <div className="flex items-center">
                Qty (Executed/Total) <ArrowUpDown className="h-3.5 w-3.5 ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 font-medium text-gray-700">
              <div className="flex items-center">
                Price <ArrowUpDown className="h-3.5 w-3.5 ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-3">
                      <Skeleton width={60} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={60} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={80} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={40} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={70} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={60} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={70} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={30} />
                    </td>
                  </tr>
                ))
            : orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{order.time}</td>
                  <td className="px-4 py-3 text-sm">{order.client}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      {order.ticker}
                      {order.tickerAudio && (
                        <span className="ml-1 text-blue-500">
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
                          >
                            <path d="M2 10s3-3 3-8"></path>
                            <path d="M22 10s-3-3-3-8"></path>
                            <path d="M10 2c0 4.4-3.6 8-8 8"></path>
                            <path d="M14 2c0 4.4 3.6 8 8 8"></path>
                            <path d="M2 10s2 2 2 5"></path>
                            <path d="M22 10s-2 2-2 5"></path>
                            <path d="M8 15h8"></path>
                            <path d="M12 15v7"></path>
                          </svg>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm ${order.side === "Buy" ? "text-green-600" : "text-red-600"}`}>
                    {order.side}
                  </td>
                  <td className="px-4 py-3 text-sm">{order.product}</td>
                  <td className="px-4 py-3 text-sm">{order.qty}</td>
                  <td className="px-4 py-3 text-sm">{order.price}</td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
