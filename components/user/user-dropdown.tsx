"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Settings, Tag, Terminal, Beaker, MessageSquare, Laptop, Sun, Moon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import UserAvatar from "./user-avatar"
import { useLanguage } from "../language/language-provider"
import PlanPreviewModal from "../admin/plan-preview-modal"
import FeedbackModal from "./feedback-modal"
import { usePlan } from "../admin/plan-context"
import { useUser } from "@/contexts/user-context"
import { createPortal } from "react-dom"
import ThemeSwitcher from "../theme/theme-switcher"

interface UserDropdownProps {
  avatarUrl?: string
}

export default function UserDropdown({ avatarUrl }: UserDropdownProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const { currentPlan } = usePlan()
  const { user } = useUser()
  const [isPlanPreviewOpen, setIsPlanPreviewOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, right: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Use the avatar from user context if available, otherwise use the prop
  const userAvatar = user?.avatarUrl || avatarUrl

  // Handle mounting
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Update position when dropdown opens
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return

    const updatePosition = () => {
      if (!triggerRef.current) return

      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right - window.scrollX,
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [isOpen])

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const navigateToSettings = () => {
    router.push("/settings")
    setIsOpen(false)
  }

  const navigateToPricing = () => {
    router.push("/pricing")
    setIsOpen(false)
  }

  // Get user name from context if available
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User"

  // Get user email from context if available
  const email = user?.email || ""

  return (
    <>
      <div className="relative">
        <div
          ref={triggerRef}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="cursor-pointer"
        >
          <UserAvatar src={userAvatar} size="md" />
        </div>

        {mounted &&
          isOpen &&
          createPortal(
            <div
              ref={menuRef}
              className="fixed z-50 w-56 overflow-hidden rounded-lg border border-border bg-popover shadow-md animate-in fade-in-0 zoom-in-95"
              style={{ top: `${position.top}px`, right: `${position.right}px` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Info Section */}
              <div className="flex items-start gap-2.5 p-2.5">
                <UserAvatar src={userAvatar} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-[13px] truncate">{fullName}</p>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-secondary">
                      {currentPlan}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">{email}</p>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Main Options */}
              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent/10"
                onClick={navigateToSettings}
              >
                <Settings className="mr-2 h-3.5 w-3.5" />
                <span>{t("settings")}</span>
              </div>

              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent/10"
                onClick={navigateToPricing}
              >
                <Tag className="mr-2 h-3.5 w-3.5" />
                <span>{t("pricing")}</span>
              </div>

              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent/10"
                onClick={() => {
                  router.push("/api")
                  setIsOpen(false)
                }}
              >
                <Terminal className="mr-2 h-3.5 w-3.5" />
                <span>{t("api")}</span>
              </div>

              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent/10"
                onClick={() => {
                  setIsFeedbackOpen(true)
                  setIsOpen(false)
                }}
              >
                <MessageSquare className="mr-2 h-3.5 w-3.5" />
                <span>Feedback</span>
              </div>

              {/* Development Testing Option */}
              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent/10"
                onClick={() => {
                  setIsPlanPreviewOpen(true)
                  setIsOpen(false)
                }}
              >
                <Beaker className="mr-2 h-3.5 w-3.5 text-amber-500" />
                <span className="text-amber-500">Testing</span>
              </div>

              <div className="h-px bg-border" />

              {/* Preferences Section */}
              <div className="px-2 pt-1.5 pb-1 text-[13px] text-muted-foreground font-medium">{t("preferences")}</div>

              {/* Theme Option with Switcher */}
              <div className="px-2 py-1 flex items-center justify-between">
                <span className="text-[13px]">{t("theme")}</span>
                <ThemeSwitcher size="sm" />
              </div>

              {/* Language Selector */}
              <div className="px-2 py-1 flex items-center justify-between">
                <span className="text-[13px]">{t("language")}</span>
                <div className="bg-muted px-2 py-1 rounded-md flex items-center">
                  <span className="text-xs mr-1">English</span>
                  <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.5 6L7.5 9L10.5 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Sign Out */}
              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent/10 text-red-500"
                onClick={() => {
                  // Sign out logic
                  setIsOpen(false)
                }}
              >
                <LogOut className="mr-2 h-3.5 w-3.5" />
                <span>{t("signOut")}</span>
              </div>
            </div>,
            document.body,
          )}
      </div>

      {/* Plan Preview Modal */}
      <PlanPreviewModal isOpen={isPlanPreviewOpen} onClose={() => setIsPlanPreviewOpen(false)} />

      {/* Feedback Modal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  )
}
