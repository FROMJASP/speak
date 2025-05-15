"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/theme-switcher"
import LanguageSelector from "@/components/language-selector"

export default function GeneralSettings() {
  const [suggestions, setSuggestions] = useState(true)
  const [soundNotifications, setSoundNotifications] = useState(false)
  const [customInstructions, setCustomInstructions] = useState("")

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium">Suggestions</h3>
            <p className="text-sm text-muted-foreground">Get relevant in-chat suggestions to refine your project.</p>
          </div>
          <Switch checked={suggestions} onCheckedChange={setSuggestions} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium">Sound Notifications</h3>
            <p className="text-sm text-muted-foreground">
              A new sound will play when SPEAK is finished responding and the window is not focused.
            </p>
          </div>
          <Switch checked={soundNotifications} onCheckedChange={setSoundNotifications} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-medium">Theme</h3>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <span className="text-sm text-muted-foreground">Choose your preferred theme</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-medium">Language</h3>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <span className="text-sm text-muted-foreground">Select your preferred language</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-medium">Custom Instructions</h3>
        <p className="text-sm text-muted-foreground">
          What would you like SPEAK to know about you in order to make its responses better?
        </p>
        <Textarea
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          placeholder="These instructions get sent to SPEAK in all chats across all projects."
          className="min-h-[120px]"
        />
        <div className="flex justify-end mt-2">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}
