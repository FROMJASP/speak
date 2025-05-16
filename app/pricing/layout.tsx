import type React from "react"
import type { Metadata } from "next"
import Layout from "@/components/layout"

export const metadata: Metadata = {
  title: "Pricing - SPEAK",
  description: "Explore our pricing plans and find the best option for your needs",
}

export default function PricingLayout() {
  return <div className="bg-background text-foreground min-h-screen"><Layout sidebarInitiallyOpen /></div>
}
