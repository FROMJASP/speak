"use client"

import { useState, useEffect } from "react"
import { FrownIcon, MehIcon, SmileIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import BaseModal from "@/components/ui/base-modal"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState("")
  const [selectedMood, setSelectedMood] = useState<"sad" | "neutral" | "happy" | null>(null)
  const [errors, setErrors] = useState<{
    feedback?: string
    mood?: string
  }>({})

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFeedback("")
      setSelectedMood(null)
      setErrors({})
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: {
      feedback?: string
      mood?: string
    } = {}

    // Check feedback length (at least 3 words)
    const words = feedback
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    if (words.length < 3) {
      newErrors.feedback = "Please enter at least 3 words of feedback"
    }

    // Check mood selection
    if (selectedMood === null) {
      newErrors.mood = "Please enter some feedback"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    // Validate form
    const isValid = validateForm()

    if (!isValid) {
      return // Stop here if validation fails
    }

    // Form is valid, proceed with submission
    console.log("Feedback submitted:", { feedback, mood: selectedMood })

    // Close modal first
    onClose()

    // Then show toast
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    })
  }

  const MoodButton = ({
    mood,
    icon: Icon,
  }: {
    mood: "sad" | "neutral" | "happy"
    icon: typeof FrownIcon
  }) => (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full h-12 w-12 ${selectedMood === mood ? "bg-muted" : ""}`}
      onClick={() => {
        setSelectedMood(mood)
        // Clear mood error when a selection is made
        if (errors.mood) {
          setErrors((prev) => ({ ...prev, mood: undefined }))
        }
      }}
    >
      <Icon className="h-6 w-6" />
    </Button>
  )

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Leave Feedback"
      description="We'd love to hear what went well or how we can improve the product experience."
    >
      <div className="p-6 bg-background text-foreground">
        <div className="mb-4">
          <Textarea
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value)
              // Clear feedback error when typing
              if (
                errors.feedback &&
                e.target.value
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length >= 3
              ) {
                setErrors((prev) => ({ ...prev, feedback: undefined }))
              }
            }}
            placeholder="Your feedback"
            className={`min-h-[150px] resize-none bg-background text-foreground ${errors.feedback ? "border-destructive focus-visible:ring-destructive" : "border-border focus-visible:ring-ring"}`}
          />
          {errors.feedback && (
            <div className="mt-2 flex items-center text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.feedback}
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <MoodButton mood="sad" icon={FrownIcon} />
            <MoodButton mood="neutral" icon={MehIcon} />
            <MoodButton mood="happy" icon={SmileIcon} />
          </div>
          {errors.mood && (
            <div className="mt-2 flex items-center text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.mood}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="bg-background text-foreground border-border">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-muted text-primary">Submit</Button>
        </div>
      </div>
    </BaseModal>
  )
}
