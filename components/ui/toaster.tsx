"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()
  const [mounted, setMounted] = useState(false)

  // Only render on client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            animate-in slide-in-from-bottom-5 
            rounded-md border border-gray-700 bg-gray-800 p-4 shadow-lg
            ${toast.variant === "success" ? "border-green-500" : ""}
            ${toast.variant === "destructive" ? "border-red-500" : ""}
          `}
          style={{ minWidth: "300px", maxWidth: "400px" }}
        >
          <div className="flex items-start justify-between">
            <div>
              {toast.title && <h3 className="font-medium text-white">{toast.title}</h3>}
              {toast.description && <p className="mt-1 text-sm text-gray-300">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="ml-4 rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
