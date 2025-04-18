"use client"

import { useRouter } from "next/navigation"

const Homepage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-[96%] mx-auto h-screen">
      <div className=" flex-col items-center p-4 justify-center bg-pink-300">
        <p className=" text-red-900 text-4xl">Welcome to TRADE 021!</p>
        <div className=" flex items-center justify-center">
        <button className=" mt-4 bg-blue-500 py-2 px-4 rounded-3xl text-white text-lg font-semibold cursor-pointer" onClick={() => router.push('/order')} > Go to Orders Page </button>
        </div>
      </div>
    </div>
  )
}

export default Homepage