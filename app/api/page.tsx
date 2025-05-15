"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

const API_DOCUMENTATION_URL = "https://daisys-ai.github.io/daisys-api-python/"

export default function ApiPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="flex flex-col h-full">
      {/* Link bar */}
      <Alert className="mb-4 flex items-center justify-between">
        <AlertDescription className="flex-1 truncate">
          <span className="text-muted-foreground">Documentation URL: </span>
          <span className="font-medium">{API_DOCUMENTATION_URL}</span>
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 flex-shrink-0"
          onClick={() => window.open(API_DOCUMENTATION_URL, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in new tab
        </Button>
      </Alert>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center h-12 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading documentation...</span>
        </div>
      )}

      {/* Documentation iframe */}
      <div className="flex-1 relative">
        <iframe
          src={API_DOCUMENTATION_URL}
          className="absolute inset-0 w-full h-full border rounded-md"
          onLoad={() => setIsLoading(false)}
          title="API Documentation"
        />
      </div>
    </div>
  )
}
