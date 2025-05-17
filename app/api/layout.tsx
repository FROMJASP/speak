"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import Navbar from "@/components/navbar/navbar"
import { PlanProvider } from "@/components/navbar/user-menu-via-avatar/admin/plan-context"

export default function ApiLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const handleNewChat = () => {
    console.log("Navigating to home from API page")
    router.push("/")
  }

  return (
    <PlanProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <Navbar projectName="API Documentation" projectId="api-docs" onNewChat={handleNewChat} />
        <main className="flex-1 overflow-hidden p-4">{children}</main>
      </div>
    </PlanProvider>
  )
}
