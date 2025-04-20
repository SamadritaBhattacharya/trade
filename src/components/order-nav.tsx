"use client"
import { ChevronDown, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const OrderNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLDivElement>(null)

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div>
      <header className="bg-white border-b border-gray-200 py-2">
        <div className="mx-auto w-[96%] flex flex-col flex-wrap justify-between">
          {/* Top section with stock info */}
          <div className="flex items-center w-full overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center min-w-[6%]">
              <div className="h-6 w-6 bg-amber-500/20 flex-shrink-0">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-[2px] h-2 bg-amber-500 mx-[0.5px]"></div>
                  <div className="w-[2px] h-3 bg-amber-500 mx-[0.5px]"></div>
                  <div className="w-[2px] h-1 bg-amber-500 mx-[0.5px]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6 justify-between  w-full md:w-[90%] overflow-x-auto">
              <div className="flex-shrink-0">
                <div className="text-xs font-semibold">SIGNORIA</div>
                <div className="text-xs text-green-500">0.00</div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-xs font-semibold">NIFTY BANK</div>
                <div className="text-xs text-green-500">52,323.30</div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-xs font-semibold">NIFTY FIN SERVICE</div>
                <div className="text-xs text-green-500">25,255.75</div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-xs font-semibold">RELCHEMO</div>
                <div className="text-xs text-green-500">162.73</div>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="items-center space-x-6 text-sm w-full justify-between hidden lg:flex mt-2">
            <div className="cursor-pointer hover:text-amber-500 transition-colors">MARKETWATCH</div>
            <div className="cursor-pointer hover:text-amber-500 transition-colors">EXCHANGE FILES</div>
            <div className="flex items-center cursor-pointer hover:text-amber-500 transition-colors">
              PORTFOLIO
              <ChevronDown className="ml-1 w-4 h-4" />
            </div>
            <div className="flex items-center cursor-pointer hover:text-amber-500 transition-colors">
              FUNDS
              <ChevronDown className="ml-1 w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">LK</span>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="flex items-center text-sm w-full justify-between mt-2 lg:hidden">
            {/* Hamburger menu */}
            <div ref={menuButtonRef} className="block lg:hidden">
              {isOpen ? (
                <X className="w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
              ) : (
                <Menu className="w-6 h-6 cursor-pointer" onClick={() => setIsOpen(true)} />
              )}
            </div>

            {/* Mobile dropdown */}
            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-16 left-4 z-50 bg-white shadow-md border rounded-lg p-4 flex flex-col gap-3 text-sm w-48 lg:hidden"
              >
                <div className="cursor-pointer hover:text-amber-500 transition-colors">MARKETWATCH</div>
                <div className="cursor-pointer hover:text-amber-500 transition-colors">EXCHANGE FILES</div>
                <div className="flex items-center justify-between cursor-pointer hover:text-amber-500 transition-colors">
                  <span>PORTFOLIO</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between cursor-pointer hover:text-amber-500 transition-colors">
                  <span>FUNDS</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Profile icon - always visible on mobile */}
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">LK</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default OrderNav
