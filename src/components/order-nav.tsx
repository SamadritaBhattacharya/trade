"use client"
import { ChevronDown, Menu } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const OrderNav = () => {

    const [isOpen, setIsOpen] = useState(false)

    const dropdownRef = useRef(null)

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div>
        <header className="bg-white border-b border-gray-200 py-2">
        <div className=" mx-auto w-[96%] flex flex-col flex-wrap justify-between">
          <div className="flex items-center  w-full ">
            <div className="flex items-center w-[6%]">
              <div className="h-6 w-6 bg-amber-500/20">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-[2px] h-2 bg-amber-500 mx-[0.5px]"></div>
                  <div className="w-[2px] h-3 bg-amber-500 mx-[0.5px]"></div>
                  <div className="w-[2px] h-1 bg-amber-500 mx-[0.5px]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 justify-between w-[90%]">
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
          <div className=" items-center space-x-6 text-sm w-full justify-between hidden lg:flex">
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

          <div className="flex items-center text-sm w-full justify-end lg:justify-between">
        {/* Hamburger for sm and md */}
        <div className="block lg:hidden">
        <Menu className="w-6 h-6 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)} />
      </div>

      {/* Dropdown for sm and md */}
      {isOpen && (
        <div className="absolute top-10 right-10 z-50 bg-white shadow-md border rounded-lg p-4 flex flex-col gap-2 text-sm w-48 lg:hidden">
          <div>MARKETWATCH</div>
          <div>EXCHANGE FILES</div>
          <div className="flex items-center">
            PORTFOLIO
            <ChevronDown/>
          </div>
          <div className="flex items-center">
            FUNDS
            <ChevronDown/>
          </div>
        </div>
      )}

  

  {/* Profile icon - always visible */}
  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-4 lg:hidden">
    <span className="text-sm font-medium ">LK</span>
  </div>
</div>

        </div>
      </header>
    </div>
    
  )
}

export default OrderNav