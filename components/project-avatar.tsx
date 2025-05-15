interface ProjectAvatarProps {
  name: string
  size?: number
}

export default function ProjectAvatar({ name, size = 40 }: ProjectAvatarProps) {
  // Generate a consistent color based on the project name
  const getColorFromName = (name: string) => {
    const colors = [
      "from-blue-500 to-cyan-300", // Meditation
      "from-indigo-600 to-blue-400", // Corporate
      "from-purple-600 to-pink-400", // Audiobook
      "from-green-500 to-emerald-300", // Podcast
      "from-red-500 to-orange-300", // Commercial
      "from-amber-500 to-yellow-300", // Default
    ]

    if (name.toLowerCase().includes("meditation")) return colors[0]
    if (name.toLowerCase().includes("corporate")) return colors[1]
    if (name.toLowerCase().includes("audiobook")) return colors[2]
    if (name.toLowerCase().includes("podcast")) return colors[3]
    if (name.toLowerCase().includes("commercial")) return colors[4]

    // Default or fallback
    return colors[5]
  }

  // Get first letter of each word
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  // Get appropriate icon/pattern based on project type
  const getPatternElement = (name: string) => {
    if (name.toLowerCase().includes("meditation")) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-20"
        >
          <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="15" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="3" fill="white" />
        </svg>
      )
    }

    if (name.toLowerCase().includes("corporate")) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-20"
        >
          <rect x="10" y="10" width="20" height="20" stroke="white" strokeWidth="1.5" />
          <rect x="15" y="15" width="10" height="10" stroke="white" strokeWidth="1.5" />
          <line x1="20" y1="5" x2="20" y2="35" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="5" y1="20" x2="35" y2="20" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
    }

    if (name.toLowerCase().includes("audiobook")) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-20"
        >
          <path d="M15 10C15 10 25 15 25 20C25 25 15 30 15 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M20 15C20 15 25 17.5 25 20C25 22.5 20 25 20 25"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      )
    }

    if (name.toLowerCase().includes("podcast")) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-20"
        >
          <path
            d="M10 20C10 13.9249 14.9249 9 21 9C27.0751 9 32 13.9249 32 20"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M15 20C15 16.6863 17.6863 14 21 14C24.3137 14 27 16.6863 27 20"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="21" cy="23" r="3" stroke="white" strokeWidth="1.5" />
          <line x1="21" y1="27" x2="21" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    }

    if (name.toLowerCase().includes("commercial")) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-20"
        >
          <path
            d="M10 25L15 15L20 25L25 15L30 25"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
    }

    // Default pattern
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-20"
      >
        <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="5" stroke="white" strokeWidth="1" />
      </svg>
    )
  }

  const gradientClass = getColorFromName(name)
  const initials = getInitials(name)

  return (
    <div
      className={`w-full h-full rounded-md bg-gradient-to-br ${gradientClass} relative flex items-center justify-center overflow-hidden`}
      style={{ width: size, height: size }}
    >
      {getPatternElement(name)}
      <span className="text-white font-semibold text-sm relative z-10">{initials}</span>
    </div>
  )
}
