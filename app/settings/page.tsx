"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ProfileSettings from "@/components/settings/profile-settings"
import GeneralSettings from "@/components/settings/general-settings"
import BillingSettings from "@/components/settings/billing-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container py-6 px-6 max-w-4xl bg-background text-foreground">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="border-b">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger
              value="profile"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="general"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Billing
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-6 mt-0">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="general" className="space-y-6 mt-0">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 mt-0">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
