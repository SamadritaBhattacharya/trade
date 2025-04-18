"use client"

import {  MoreVertical } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useState } from "react"

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="hidden sm:table-header-group">
          <tr className="border-b border-gray-200 text-left">
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Ticker</th>
            <th className="px-4 py-3">Side</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    {Array(8)
                      .fill(null)
                      .map((_, idx) => (
                        <td key={idx} className="px-4 py-3">
                          <Skeleton width={60} />
                        </td>
                      ))}
                  </tr>
                ))
            : orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  {/* Minimal view for sm devices */}
                  <td className="px-4 py-3 sm:table-cell hidden">{order.time}</td>
                  <td className="px-4 py-3 sm:table-cell hidden">{order.client}</td>
                  <td className="px-4 py-3">{order.ticker}</td>
                  <td
                    className={`px-4 py-3 ${
                      order.side === "Buy" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.side}
                  </td>
                  <td className="px-4 py-3 sm:table-cell hidden">{order.product}</td>
                  <td className="px-4 py-3 sm:table-cell hidden">{order.qty}</td>
                  <td className="px-4 py-3">{order.price}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOrder(order)
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Popup modal for mobile details */}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
          >
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Time:</strong> {selectedOrder.time}</p>
              <p><strong>Client:</strong> {selectedOrder.client}</p>
              <p><strong>Ticker:</strong> {selectedOrder.ticker}</p>
              <p><strong>Side:</strong> {selectedOrder.side}</p>
              <p><strong>Product:</strong> {selectedOrder.product}</p>
              <p><strong>Qty:</strong> {selectedOrder.qty}</p>
              <p><strong>Price:</strong> {selectedOrder.price}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
