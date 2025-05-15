interface LanguageFlagProps {
  language: "ENG" | "GER" | "DUTCH"
  size?: "sm" | "md"
}

export default function LanguageFlag({ language, size = "sm" }: LanguageFlagProps) {
  const flagSize = size === "sm" ? "w-4 h-4" : "w-5 h-5"

  const getFlagEmoji = (language: string) => {
    switch (language) {
      case "ENG":
        return "🇬🇧"
      case "GER":
        return "🇩🇪"
      case "DUTCH":
        return "🇳🇱"
      default:
        return "🌐"
    }
  }

  return (
    <span className={`inline-block ${flagSize} mx-0.5`} title={language}>
      {getFlagEmoji(language)}
    </span>
  )
}
