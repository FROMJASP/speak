export type PlanTier = "Free" | "Starter" | "Creator" | "Professional" | "Company"

export interface PlanModel {
  name: string
  languages: Array<"ENG" | "GER" | "DUTCH">
}

export interface PricingPlan {
  tier: PlanTier
  priceMonthly: number
  priceAnnually: number
  audioMinutes: number
  maxVoices: number
  models: PlanModel[]
  usage: "Non-commercial" | "Commercial"
  apiAccess: boolean
  downloadQuality: string
  popular?: boolean
  experimental?: boolean
  betaDiscount?: {
    regularPrice: number
    discountPercentage: number
  }
}

export const pricingPlans: PricingPlan[] = [
  {
    tier: "Free",
    priceMonthly: 0,
    priceAnnually: 0,
    audioMinutes: 10, // 10 minutes per month
    maxVoices: 3,
    models: [
      { name: "Broad Model", languages: ["ENG", "GER", "DUTCH"] },
      { name: "Meditation Model", languages: ["ENG"] },
    ],
    usage: "Non-commercial",
    apiAccess: true,
    downloadQuality: "mp3 (128 kbps)",
  },
  {
    tier: "Starter",
    priceMonthly: 5,
    priceAnnually: 48, // €4/month when billed annually
    audioMinutes: 45, // 45 minutes per month
    maxVoices: 5,
    models: [
      { name: "Broad Model", languages: ["ENG", "GER", "DUTCH"] },
      { name: "Meditation Model", languages: ["ENG"] },
      { name: "Conversation Model", languages: ["ENG"] },
    ],
    usage: "Commercial",
    apiAccess: true,
    downloadQuality: "mp3 (192 kbps)",
  },
  {
    tier: "Creator",
    priceMonthly: 10,
    priceAnnually: 96, // €8/month when billed annually
    audioMinutes: 120, // 2 hours per month
    maxVoices: 15, // Updated from 10 to 15
    models: [
      { name: "Broad Model", languages: ["ENG", "GER", "DUTCH"] },
      { name: "Meditation Model", languages: ["ENG"] },
      { name: "Conversation Model", languages: ["ENG"] },
      { name: "Character Model", languages: ["ENG"] },
    ],
    usage: "Commercial",
    apiAccess: true,
    downloadQuality: "WAV",
    popular: true,
  },
  {
    tier: "Professional",
    priceMonthly: 50,
    priceAnnually: 480, // €40/month when billed annually
    audioMinutes: 720, // 12 hours per month
    maxVoices: 50, // Updated from 25 to 50
    models: [
      { name: "Broad Model", languages: ["ENG", "GER", "DUTCH"] },
      { name: "Meditation Model", languages: ["ENG"] },
      { name: "Conversation Model", languages: ["ENG"] },
      { name: "Character Model", languages: ["ENG"] },
      { name: "News Model", languages: ["ENG", "DUTCH"] },
    ],
    usage: "Commercial",
    apiAccess: true,
    downloadQuality: "WAV",
    betaDiscount: {
      regularPrice: 75,
      discountPercentage: 33,
    },
  },
  {
    tier: "Company",
    priceMonthly: 300,
    priceAnnually: 2880, // €240/month when billed annually
    audioMinutes: 4800, // 80 hours per month
    maxVoices: 125, // Updated from 100 to 125
    models: [
      { name: "Broad Model", languages: ["ENG", "GER", "DUTCH"] },
      { name: "Meditation Model", languages: ["ENG"] },
      { name: "Conversation Model", languages: ["ENG"] },
      { name: "Character Model", languages: ["ENG"] },
      { name: "News Model", languages: ["ENG", "DUTCH"] },
    ],
    usage: "Commercial",
    apiAccess: true,
    downloadQuality: "WAV",
    experimental: true,
  },
]

export function getPlan(tier: PlanTier): PricingPlan {
  return pricingPlans.find((plan) => plan.tier === tier) || pricingPlans[0]
}

// Calculate monthly equivalent when paid annually
export function calculateMonthlyEquivalent(annualPrice: number): number {
  return annualPrice / 12
}

// Format price with currency
export function formatPrice(price: number, currency = "€"): string {
  return `${currency}${price}`
}

// Format tokens
export function formatTokens(tokens: number): string {
  return tokens.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// Calculate words to minutes conversion (300 words per minute)
export function wordsToMinutes(wordCount: number): number {
  return wordCount / 300
}

// Calculate minutes to words conversion (300 words per minute)
export function minutesToWords(minutes: number): number {
  return minutes * 300
}

// Get extra audio time purchase options based on plan tier
export function getExtraAudioTimeOptions(tier: PlanTier): { minutes: number; price: number }[] {
  switch (tier) {
    case "Free":
      return []
    case "Starter":
    case "Creator":
      return [{ minutes: 30, price: 5 }]
    case "Professional":
    case "Company":
      return [
        { minutes: 30, price: 4 },
        { minutes: 60, price: 7 },
      ]
    default:
      return []
  }
}
