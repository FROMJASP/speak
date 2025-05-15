"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type Language = "en" | "nl"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: () => "",
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

// Simple translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    settings: "Settings",
    pricing: "Pricing",
    api: "API",
    support: "Support",
    preferences: "Preferences",
    theme: "Theme",
    language: "Language",
    signOut: "Sign out",
    system: "System",
    light: "Light",
    dark: "Dark",
    english: "English",
    dutch: "Dutch",
    projects: "Projects",
    chat: "Chat",
    chats: "Chats",
    newProject: "New Project",
    newChat: "New Chat",
    favorites: "Favorites",
    recent: "Recent",
    noFavorites: "No favorite chats yet",
    deleteChat: "Delete chat",
    deleteConfirmation: "The chat will be deleted and removed from your chat history. This action cannot be undone.",
    favoriteWarning: "This is a favorite chat",
    typeToConfirm: "To confirm deletion, please type",
    below: "below",
    delete: "Delete",
    cancel: "Cancel",
    searchChats: "Search chats...",
    clearSearch: "Clear search",
    noResults: "No results found",
    tryDifferentSearch: "Try a different search term or clear the search",
    searchSessions: "Search sessions...",
    noSessions: "No sessions found",
    tryDifferentSearch: "Try a different search term or create a new session",
  },
  nl: {
    settings: "Instellingen",
    pricing: "Prijzen",
    api: "API",
    support: "Ondersteuning",
    preferences: "Voorkeuren",
    theme: "Thema",
    language: "Taal",
    signOut: "Uitloggen",
    system: "Systeem",
    light: "Licht",
    dark: "Donker",
    english: "Engels",
    dutch: "Nederlands",
    projects: "Projecten",
    chat: "Chat",
    chats: "Chats",
    newProject: "Nieuw Project",
    newChat: "Nieuwe Chat",
    favorites: "Favorieten",
    recent: "Recent",
    noFavorites: "Nog geen favoriete chats",
    deleteChat: "Chat verwijderen",
    deleteConfirmation:
      "De chat wordt verwijderd uit je chatgeschiedenis. Deze actie kan niet ongedaan worden gemaakt.",
    favoriteWarning: "Dit is een favoriete chat",
    typeToConfirm: "Om het verwijderen te bevestigen, typ",
    below: "hieronder",
    delete: "Verwijderen",
    cancel: "Annuleren",
    searchChats: "Zoek chats...",
    clearSearch: "Zoekopdracht wissen",
    noResults: "Geen resultaten gevonden",
    tryDifferentSearch: "Probeer een andere zoekterm of wis de zoekopdracht",
  },
}

export function LanguageProvider({ children, defaultLanguage = "en" }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return <LanguageProviderContext.Provider value={value}>{children}</LanguageProviderContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
