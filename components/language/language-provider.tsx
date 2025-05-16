"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "nl"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  availableLanguages: Language[]
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: () => "",
  availableLanguages: ["en", "nl"],
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
    tryDifferentSessionSearch: "Try a different search term or create a new session",
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
    tryDifferentSessionSearch: "Probeer een andere zoekterm of maak een nieuwe sessie aan",
  },
}

export function LanguageProvider({ children, defaultLanguage = "en" }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    if (saved === "en" || saved === "nl") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const availableLanguages: Language[] = ["en", "nl"];
  const value = {
    language,
    setLanguage,
    t,
    availableLanguages,
  };

  return <LanguageProviderContext.Provider value={value}>{children}</LanguageProviderContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
