"use client"

import { useState } from "react"
import { Search, X, Filter, ChevronDown, User2 } from "lucide-react"

export default function FiltersBar() {
  const [selectedClient, setSelectedClient] = useState("AAA002")
  const [selectedFilter, setSelectedFilter] = useState("Lalit")
  const [activeFilters, setActiveFilters] = useState(["RELIANCE", "ASIANPAINT"])

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-shrink-0">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-sm">
            <User2 className="h-4 w-4 text-gray-500 mr-2" />
            <span>{selectedClient}</span>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-sm">
            <span>{selectedFilter}</span>
            <X className="h-4 w-4 text-gray-500 ml-2 cursor-pointer" />
          </div>
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

        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </button>

        <button className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
          Cancel all
        </button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activeFilters.map((filter) => (
            <div key={filter} className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-sm">
              {filter}
              <X className="h-3.5 w-3.5 ml-1 text-gray-500 cursor-pointer" onClick={() => removeFilter(filter)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
