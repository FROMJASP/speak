"use client"

import { useToast } from "./toast-provider"

export function TestToastButton() {
  const { showToast } = useToast()

  const handleClick = () => {
    console.log("Test toast button clicked")
    showToast("This is a test toast message!", "success")
  }

  return (
    <div className="fixed top-20 right-4 z-50">
      <button onClick={handleClick} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
        Test Toast
      </button>
    </div>
  )
}
