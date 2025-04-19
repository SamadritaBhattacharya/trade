// "use client"

// import {  MoreVertical } from "lucide-react"
// import Skeleton from "react-loading-skeleton"
// import "react-loading-skeleton/dist/skeleton.css"
// import { useState } from "react"

// type Order = {
//   time: string
//   client: string
//   ticker: string
//   tickerAudio?: boolean
//   side: "Buy" | "Sell"
//   product: string
//   qty: string
//   price: string
// }

// const orders: Order[] = [
//   {
//     time: "08:14:31",
//     client: "AAA001",
//     ticker: "RELIANCE",
//     tickerAudio: true,
//     side: "Buy",
//     product: "CNC",
//     qty: "50/100",
//     price: "250.50",
//   },
//   {
//     time: "08:14:31",
//     client: "AAA003",
//     ticker: "MRF",
//     side: "Buy",
//     product: "NRML",
//     qty: "10/20",
//     price: "2,700.00",
//   },
//   {
//     time: "08:14:31",
//     client: "AAA002",
//     ticker: "ASIANPAINT",
//     tickerAudio: true,
//     side: "Buy",
//     product: "NRML",
//     qty: "10/30",
//     price: "1,500.60",
//   },
//   {
//     time: "08:14:31",
//     client: "AAA002",
//     ticker: "TATAINVEST",
//     side: "Sell",
//     product: "INTRADAY",
//     qty: "10/10",
//     price: "2,300.10",
//   },
// ]


// export default function OrdersTable({ isLoading }: { isLoading: boolean }) {
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead className="hidden sm:table-header-group">
//           <tr className="border-b border-gray-200 text-left">
//             <th className="px-4 py-3">Time</th>
//             <th className="px-4 py-3">Client</th>
//             <th className="px-4 py-3">Ticker</th>
//             <th className="px-4 py-3">Side</th>
//             <th className="px-4 py-3">Product</th>
//             <th className="px-4 py-3">Qty</th>
//             <th className="px-4 py-3">Price</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading
//             ? Array(4)
//                 .fill(0)
//                 .map((_, index) => (
//                   <tr key={index} className="border-b border-gray-200">
//                     {Array(8)
//                       .fill(null)
//                       .map((_, idx) => (
//                         <td key={idx} className="px-4 py-3">
//                           <Skeleton width={60} />
//                         </td>
//                       ))}
//                   </tr>
//                 ))
//             : orders.map((order, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
//                   onClick={() => setSelectedOrder(order)}
//                 >
//                   {/* Minimal view for sm devices */}
//                   <td className="px-4 py-3 sm:table-cell hidden">{order.time}</td>
//                   <td className="px-4 py-3 sm:table-cell hidden">{order.client}</td>
//                   <td className="px-4 py-3">{order.ticker}</td>
//                   <td
//                     className={`px-4 py-3 ${
//                       order.side === "Buy" ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {order.side}
//                   </td>
//                   <td className="px-4 py-3 sm:table-cell hidden">{order.product}</td>
//                   <td className="px-4 py-3 sm:table-cell hidden">{order.qty}</td>
//                   <td className="px-4 py-3">{order.price}</td>
//                   <td className="px-4 py-3">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         setSelectedOrder(order)
//                       }}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <MoreVertical className="h-4 w-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//         </tbody>
//       </table>

//       {/* Popup modal for mobile details */}
//       {selectedOrder && (
//         <div
//           onClick={() => setSelectedOrder(null)}
//           className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
//           >
//             <h2 className="text-lg font-semibold mb-4">Order Details</h2>
//             <div className="space-y-2 text-sm">
//               <p><strong>Time:</strong> {selectedOrder.time}</p>
//               <p><strong>Client:</strong> {selectedOrder.client}</p>
//               <p><strong>Ticker:</strong> {selectedOrder.ticker}</p>
//               <p><strong>Side:</strong> {selectedOrder.side}</p>
//               <p><strong>Product:</strong> {selectedOrder.product}</p>
//               <p><strong>Qty:</strong> {selectedOrder.qty}</p>
//               <p><strong>Price:</strong> {selectedOrder.price}</p>
//             </div>
//             <button
//               onClick={() => setSelectedOrder(null)}
//               className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }







"use client"

import { useState } from "react"
import { ArrowUpDown, Filter, MoreVertical, Info, Check, Trash, Edit } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { motion, AnimatePresence } from "framer-motion"
import { orders } from "@/lib/data"
import type { Order } from "@/lib/types"
import { useMediaQuery } from "@/hooks/use-media-query"

interface OrdersTableProps {
  isLoading: boolean
  onViewDetails: (order: Order) => void
}

export default function OrdersTable({ isLoading, onViewDetails }: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const ordersPerPage = 4

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([])
    } else {
      setSelectedRows(currentOrders.map((order) => order.id))
    }
    setSelectAll(!selectAll)
  }

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleActionClick = (id: string) => {
    setActionMenuOpen(actionMenuOpen === id ? null : id)
  }

  const handleAction = (action: string, id: string) => {
    console.log(`${action} action on order ${id}`)
    setActionMenuOpen(null)

    if (action === "select") {
      toggleSelectRow(id)
    }
  }

  return (
    <div className="overflow-x-auto">
      {isMobile ? (
        // Mobile view
        <div className="divide-y divide-gray-200">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="p-4">
                    <Skeleton height={100} />
                  </div>
                ))
            : currentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {selectedRows.includes(order.id) ? (
                        <div className="w-5 h-5 rounded border border-primary flex items-center justify-center bg-primary text-white mr-3">
                          <Check className="h-3 w-3" />
                        </div>
                      ) : (
                        <div
                          className="w-5 h-5 rounded border border-gray-300 mr-3 cursor-pointer"
                          onClick={() => toggleSelectRow(order.id)}
                        />
                      )}
                      <div>
                        <div className="font-medium">{order.ticker}</div>
                        <div className={`text-sm ${order.side === "Buy" ? "text-green-600" : "text-red-600"}`}>
                          {order.side} • {order.qty}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-3">
                        <div className="font-medium">{order.price}</div>
                        <div className="text-xs text-gray-500">{order.time}</div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => handleActionClick(order.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>

                        <AnimatePresence>
                          {actionMenuOpen === order.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleAction("edit", order.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleAction("delete", order.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </button>
                                <button
                                  onClick={() => handleAction("select", order.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Select
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onViewDetails(order)} className="mt-3 text-sm text-blue-600 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                </motion.div>
              ))}
        </div>
      ) : (
        // Desktop view
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-left">
              <th className="px-4 py-3 font-medium text-gray-700 w-10">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded border ${selectAll ? "border-primary bg-primary text-white" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                    onClick={toggleSelectAll}
                  >
                    {selectAll && <Check className="h-3 w-3" />}
                  </div>
                </div>
              </th>
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
                        <Skeleton width={20} />
                      </td>
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
              : currentOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div
                        className={`w-5 h-5 rounded border ${selectedRows.includes(order.id) ? "border-primary bg-primary text-white" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                        onClick={() => toggleSelectRow(order.id)}
                      >
                        {selectedRows.includes(order.id) && <Check className="h-3 w-3" />}
                      </div>
                    </td>
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
                      <div className="relative">
                        <button
                          onClick={() => handleActionClick(order.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        <AnimatePresence>
                          {actionMenuOpen === order.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleAction("edit", order.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleAction("delete", order.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </button>
                                <button
                                  onClick={() => handleAction("select", order.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Select
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
