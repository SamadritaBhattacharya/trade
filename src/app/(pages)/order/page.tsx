"use client"

import { useState } from "react"
import { motion} from "framer-motion"
import { Download } from "lucide-react"
import PaginationControls from "@/components/pagination-controls"
import OrdersTable from "@/components/orders-table"
import FiltersBar from "@/components/fiters-bar"
import OrderNav from "@/components/order-nav"
import { Order } from "@/lib/types"
import OrderDetailsModal from "@/components/order-details"

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  })

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <OrderNav />

      {/* <main className="container mx-auto px-4 py-6">
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
      </main> */}

      <main className="container mx-auto px-4 py-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200">
                  <h1 className="text-xl font-semibold">Open Orders</h1>
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>

                <FiltersBar />
                <OrdersTable isLoading={isLoading} onViewDetails={handleOpenModal} />
                <PaginationControls />
              </motion.div>
            </main>

      {selectedOrder && <OrderDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} order={selectedOrder} />}
    </motion.div>
  )
}
