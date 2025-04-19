"use client"

import { useState } from "react"
import { Search, X, Filter, ChevronDown, User2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import FilterDropdown from "./filter-dropdown"
import { clientOptions, filterOptions, tickerOptions, productOptions, sideOptions } from "@/lib/data"

export default function FiltersBar() {
  const [selectedClient, setSelectedClient] = useState("AAA002")
  const [selectedFilter, setSelectedFilter] = useState("Lalit")
  const [activeFilters, setActiveFilters] = useState(["RELIANCE", "ASIANPAINT"])
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const handleClientSelect = (client: string) => {
    setSelectedClient(client)
    setIsClientDropdownOpen(false)
  }

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter)
    setIsFilterDropdownOpen(false)
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-shrink-0">
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
            className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-sm cursor-pointer"
          >
            <User2 className="h-4 w-4 text-gray-500 mr-2" />
            <span>{selectedClient}</span>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
          </motion.div>

          <AnimatePresence>
            {isClientDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200"
              >
                <div className="py-1">
                  {clientOptions.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => handleClientSelect(client.name)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {client.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative flex-shrink-0">
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-sm cursor-pointer"
          >
            <span>{selectedFilter}</span>
            <X
              className="h-4 w-4 text-gray-500 ml-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedFilter("")
              }}
            />
          </motion.div>

          <AnimatePresence>
            {isFilterDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200"
              >
                <div className="py-1">
                  {filterOptions.map((filter) => (
                    <div
                      key={filter.id}
                      onClick={() => handleFilterSelect(filter.value)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {filter.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for a stock, future, option or index"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
        >
          Cancel all
        </motion.button>
      </div>

      <AnimatePresence>
        {isFilterMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <FilterDropdown title="Ticker" options={tickerOptions} onSelect={addFilter} />
            <FilterDropdown title="Product" options={productOptions} onSelect={addFilter} />
            <FilterDropdown title="Side" options={sideOptions} onSelect={addFilter} />
          </motion.div>
        )}
      </AnimatePresence>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activeFilters.map((filter) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-sm"
            >
              {filter}
              <X className="h-3.5 w-3.5 ml-1 text-gray-500 cursor-pointer" onClick={() => removeFilter(filter)} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
