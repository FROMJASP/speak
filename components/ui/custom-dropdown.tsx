"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface CustomDropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "start" | "end" | "center"
  className?: string
  contentClassName?: string
  sideOffset?: number
  onOpenChange?: (open: boolean) => void
  open?: boolean
  fixedPosition?: { top: number; left: number }
}

export function CustomDropdown({
  trigger,
  children,
  align = "end",
  className,
  contentClassName,
  sideOffset = 4,
  onOpenChange,
  open: controlledOpen,
  fixedPosition,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Handle controlled/uncontrolled state
  const open = controlledOpen !== undefined ? controlledOpen : isOpen

  // Handle mounting
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Update position when dropdown opens
  useEffect(() => {
    if (!open || (!triggerRef.current && !fixedPosition)) return

    const updatePosition = () => {
      // If we have a fixed position, use it
      if (fixedPosition) {
        setPosition(fixedPosition)
        return
      }

      if (!triggerRef.current) return

      const rect = triggerRef.current.getBoundingClientRect()
      const contentWidth = contentRef.current?.offsetWidth || 200

      let left = 0
      if (align === "start") {
        left = rect.left + window.scrollX
      } else if (align === "end") {
        left = rect.right + window.scrollX - contentWidth
      } else {
        left = rect.left + window.scrollX + rect.width / 2 - contentWidth / 2
      }

      setPosition({
        top: rect.bottom + window.scrollY + sideOffset,
        left: Math.max(0, left), // Prevent going off-screen to the left
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [open, align, sideOffset, fixedPosition])

  // Handle click outside
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        if (onOpenChange) onOpenChange(false)
      }
    }

    // Use capture phase to ensure we get the event before other handlers
    document.addEventListener("mousedown", handleClickOutside, true)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true)
    }
  }, [open, onOpenChange])

  // Handle escape key
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        if (onOpenChange) onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onOpenChange])

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newOpenState = !open
    setIsOpen(newOpenState)
    if (onOpenChange) onOpenChange(newOpenState)
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="cursor-pointer"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {mounted &&
        open &&
        createPortal(
          <div
            ref={contentRef}
            className={cn(
              "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 shadow-md animate-in fade-in-0 zoom-in-95",
              contentClassName,
            )}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>,
          document.body,
        )}
    </div>
  )
}

export function CustomDropdownItem({
  children,
  className,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      onClick={disabled ? undefined : onClick}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      data-disabled={disabled ? true : undefined}
    >
      {children}
    </div>
  )
}

export function CustomDropdownSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-border", className)} role="separator" />
}
