"use client"
export default function PaginationControls() {
    return (
      <div className="flex justify-end p-4 border-t border-gray-200">
        <div className="flex items-center space-x-1 text-sm">
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-500">Previous</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-medium">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">Next</button>
        </div>
      </div>
    )
  }
  