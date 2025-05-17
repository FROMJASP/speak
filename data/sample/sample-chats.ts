// MOCK DATA: Used for demo/dev only. Replace with real API data in production.
import type { Chat } from "@/types/chat"

export interface Chat {
  id: string
  name: string
  lastEdited: string
  timestamp: Date // Adding actual timestamp for sorting
  description: string
  thumbnail?: string
  color?: string
}

// Helper function to get a date X days ago
const daysAgo = (days: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

// Helper function to get a specific date
const getDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day)
}

export const sampleChats: Chat[] = [
  // Today
  {
    id: "proj-1",
    name: "Meditation for Children",
    lastEdited: "2 hours ago",
    timestamp: daysAgo(0),
    description: "Calming voiceover for kids' meditation app",
  },
  {
    id: "proj-2",
    name: "Corporate Training",
    lastEdited: "5 hours ago",
    timestamp: daysAgo(0),
    description: "Professional narration for onboarding videos",
  },

  // Yesterday
  {
    id: "proj-3",
    name: "Audiobook Narration",
    lastEdited: "Yesterday",
    timestamp: daysAgo(1),
    description: "Fantasy novel chapter recordings",
  },
  {
    id: "proj-4",
    name: "Podcast Intro",
    lastEdited: "Yesterday",
    timestamp: daysAgo(1),
    description: "Engaging intro for tech podcast series",
  },
  {
    id: "proj-5",
    name: "Commercial Voice",
    lastEdited: "Yesterday",
    timestamp: daysAgo(1),
    description: "Energetic ad for new product launch",
  },

  // Last 7 days
  {
    id: "proj-6",
    name: "Educational Course",
    lastEdited: "3 days ago",
    timestamp: daysAgo(3),
    description: "Biology course narration for high school students",
  },
  {
    id: "proj-7",
    name: "Video Game Character",
    lastEdited: "4 days ago",
    timestamp: daysAgo(4),
    description: "Voice acting for RPG side character",
  },
  {
    id: "proj-8",
    name: "Phone System IVR",
    lastEdited: "5 days ago",
    timestamp: daysAgo(5),
    description: "Professional voice prompts for customer service",
  },
  {
    id: "proj-9",
    name: "Wildlife Documentary",
    lastEdited: "6 days ago",
    timestamp: daysAgo(6),
    description: "Narration for nature documentary series",
  },

  // Last 30 days
  {
    id: "proj-10",
    name: "Animated Character",
    lastEdited: "8 days ago",
    timestamp: daysAgo(8),
    description: "Voice for children's cartoon protagonist",
  },
  {
    id: "proj-11",
    name: "Spanish Dubbing",
    lastEdited: "10 days ago",
    timestamp: daysAgo(10),
    description: "English to Spanish translation and voiceover",
  },
  {
    id: "proj-12",
    name: "Explainer Video",
    lastEdited: "12 days ago",
    timestamp: daysAgo(12),
    description: "Clear narration for product explanation",
  },
  {
    id: "proj-13",
    name: "Guided Tour",
    lastEdited: "15 days ago",
    timestamp: daysAgo(15),
    description: "Museum audio guide narration",
  },
  {
    id: "proj-14",
    name: "Fitness App",
    lastEdited: "20 days ago",
    timestamp: daysAgo(20),
    description: "Motivational workout instructions",
  },
  {
    id: "proj-15",
    name: "Bedtime Stories",
    lastEdited: "25 days ago",
    timestamp: daysAgo(25),
    description: "Soothing narration for children's stories",
  },

  // April 2025
  {
    id: "proj-16",
    name: "Meditation Series",
    lastEdited: "April 28, 2025",
    timestamp: getDate(2025, 4, 28),
    description: "Series of guided meditations for stress relief",
  },
  {
    id: "proj-17",
    name: "Podcast Series",
    lastEdited: "April 25, 2025",
    timestamp: getDate(2025, 4, 25),
    description: "Tech podcast series narration",
  },
  {
    id: "proj-18",
    name: "Audiobook Chapter 1",
    lastEdited: "April 20, 2025",
    timestamp: getDate(2025, 4, 20),
    description: "First chapter of fantasy novel",
  },
  {
    id: "proj-19",
    name: "Product Demo",
    lastEdited: "April 15, 2025",
    timestamp: getDate(2025, 4, 15),
    description: "Voice for product demonstration video",
  },
  {
    id: "proj-20",
    name: "Tutorial Series",
    lastEdited: "April 10, 2025",
    timestamp: getDate(2025, 4, 10),
    description: "Educational tutorial series narration",
  },

  // March 2025
  {
    id: "proj-21",
    name: "Audiobook Chapter 2",
    lastEdited: "March 28, 2025",
    timestamp: getDate(2025, 3, 28),
    description: "Second chapter of fantasy novel",
  },
  {
    id: "proj-22",
    name: "Corporate Video",
    lastEdited: "March 25, 2025",
    timestamp: getDate(2025, 3, 25),
    description: "Corporate training video narration",
  },
  {
    id: "proj-23",
    name: "Meditation for Sleep",
    lastEdited: "March 20, 2025",
    timestamp: getDate(2025, 3, 20),
    description: "Sleep meditation narration",
  },
  {
    id: "proj-24",
    name: "Podcast Episode",
    lastEdited: "March 15, 2025",
    timestamp: getDate(2025, 3, 15),
    description: "Tech podcast episode narration",
  },
  {
    id: "proj-25",
    name: "Commercial Spot",
    lastEdited: "March 10, 2025",
    timestamp: getDate(2025, 3, 10),
    description: "Commercial spot for new product",
  },
]
