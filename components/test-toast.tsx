"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function TestToast() {
  const { toast } = useToast()

  const showToast = () => {
    toast({
      title: "Test Toast",
      description: "This is a test toast notification",
      variant: "default",
    })
    console.log("Test toast triggered")
  }

  return (
    <div className="fixed top-20 right-4 z-50">
      <Button onClick={showToast} variant="outline">
        Test Toast
      </Button>
    </div>
  )
}
