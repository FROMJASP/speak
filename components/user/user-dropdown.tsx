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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface UserDropdownProps {
  avatarUrl?: string
}

export default function UserDropdown({ avatarUrl }: UserDropdownProps) {
  const router = useRouter()
  const { t, language, setLanguage, availableLanguages } = useLanguage()
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

  const langs = availableLanguages ?? [];

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
              className="fixed z-50 w-60 overflow-hidden rounded-xl border border-border bg-[#FCFBF7] dark:bg-[#1C1C1C] text-[var(--sidebar-foreground)] shadow-md animate-in fade-in-0 zoom-in-95 p-1.5 pt-2 pb-2"
              style={{ top: `${position.top}px`, right: `${position.right}px` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Info Section */}
              <div className="flex items-start gap-2 px-2 py-1.5 bg-[#FCFBF7] dark:bg-[#1C1C1C] text-[var(--sidebar-foreground)]">
                <UserAvatar src={userAvatar} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-[13px] truncate text-[var(--sidebar-foreground)]">{fullName}</p>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-accent-light dark:bg-[#353535] text-bold-light dark:text-bold-dark">
                      {currentPlan}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-generate-light dark:text-generate-dark truncate mt-0.5">{email}</p>
                </div>
              </div>

              <div className="h-px bg-scrollbar-light dark:bg-scrollbar-dark my-1.5" />

              {/* Main Options */}
              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent-light dark:hover:bg-[#232323] hover:text-bold-light dark:hover:text-bold-dark transition-all duration-150 hover:scale-[1.03] text-[var(--sidebar-foreground)] rounded-md"
                onClick={navigateToSettings}
              >
                <Settings className="mr-2 h-3.5 w-3.5" />
                <span>{t("settings")}</span>
              </div>

              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent-light dark:hover:bg-[#232323] hover:text-bold-light dark:hover:text-bold-dark transition-all duration-150 hover:scale-[1.03] text-[var(--sidebar-foreground)] rounded-md"
                onClick={navigateToPricing}
              >
                <Tag className="mr-2 h-3.5 w-3.5" />
                <span>{t("pricing")}</span>
              </div>

              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent-light dark:hover:bg-[#232323] hover:text-bold-light dark:hover:text-bold-dark transition-all duration-150 hover:scale-[1.03] text-[var(--sidebar-foreground)] rounded-md"
                onClick={() => {
                  router.push("/api")
                  setIsOpen(false)
                }}
              >
                <Terminal className="mr-2 h-3.5 w-3.5" />
                <span>{t("api")}</span>
              </div>

              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent-light dark:hover:bg-[#232323] hover:text-bold-light dark:hover:text-bold-dark transition-all duration-150 hover:scale-[1.03] text-[var(--sidebar-foreground)] rounded-md"
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
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent-light dark:hover:bg-[#232323] hover:text-bold-light dark:hover:text-bold-dark transition-all duration-150 hover:scale-[1.03] text-amber-500 rounded-md"
                onClick={() => {
                  setIsPlanPreviewOpen(true)
                  setIsOpen(false)
                }}
              >
                <Beaker className="mr-2 h-3.5 w-3.5 text-amber-500" />
                <span className="text-amber-500">Testing</span>
              </div>

              <div className="h-px bg-scrollbar-light dark:bg-scrollbar-dark my-1.5" />

              {/* Preferences Section */}
              <div className="px-2 pt-1.5 pb-1 text-[13px] text-generate-light dark:text-generate-dark font-medium mb-1">{t("preferences")}</div>

              {/* Theme Option with Switcher */}
              <div className="px-2 py-1 flex items-center justify-between">
                <span className="text-[13px] text-[var(--sidebar-foreground)]">{t("Appearance")}</span>
                <ThemeSwitcher size="sm" />
              </div>

              {/* Language Selector (Shadcn Dropdown) */}
              <div className="px-2 py-1 flex items-center justify-between">
                <span className="text-[13px] text-[var(--sidebar-foreground)]">{t("language")}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="bg-accent-light dark:bg-[#232323] px-2 py-1 rounded-md flex items-center transition-colors hover:bg-accent/20 focus:outline-none text-light dark:text-dark"
                      onClick={e => e.stopPropagation()}
                    >
                      <span className="text-xs mr-1 capitalize text-[var(--sidebar-foreground)]">{t(language === "en" ? "english" : "dutch")}</span>
                      <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.5 6L7.5 9L10.5 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      key="en"
                      onClick={() => setLanguage("en")}
                      className={
                        language === "en"
                          ? "font-semibold bg-accent-light dark:bg-[#232323] text-bold-light dark:text-bold-dark"
                          : "hover:bg-accent-light dark:hover:bg-[#232323] hover:text-bold-light dark:hover:text-bold-dark hover:scale-[1.03] transition-all duration-150 text-light dark:text-dark"
                      }
                      aria-selected={language === "en"}
                    >
                      {t("english")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      key="nl"
                      disabled
                      className="flex items-center opacity-60 cursor-not-allowed transition-all duration-150 text-light dark:text-dark"
                    >
                      {t("dutch")}
                      <Badge variant="secondary" className="ml-2 text-[10px] px-2 py-0.5">Soon</Badge>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="h-px bg-scrollbar-light dark:bg-scrollbar-dark my-1.5" />

              {/* Sign Out */}
              <div
                className="relative flex cursor-pointer select-none items-center px-2 py-1.5 text-[13px] outline-none hover:bg-accent-light dark:hover:bg-[#232323] hover:text-bold-light dark:hover:text-bold-dark transition-all duration-150 hover:scale-[1.03] text-destructive rounded-md mt-1"
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
