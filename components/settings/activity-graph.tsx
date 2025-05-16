"use client"

import ThemeProvider from "../theme/theme-provider"

export default function ActivityGraph() {
  const { theme } = ThemeProvider()
  const isDark = theme === "dark"

  // Generate a grid of squares to represent activity
  const generateActivityGrid = () => {
    const rows = 7 // One week
    const cols = 52 // Weeks in a year
    const grid = []

    for (let i = 0; i < rows; i++) {
      const row = []
      for (let j = 0; j < cols; j++) {
        // Random activity level: 0 = none, 1 = low, 2 = medium, 3 = high
        const activityLevel = Math.floor(Math.random() * 4)
        row.push(activityLevel)
      }
      grid.push(row)
    }

    return grid
  }

  const activityGrid = generateActivityGrid()

  // Get color based on activity level and theme
  const getActivityColor = (level: number) => {
    if (isDark) {
      return level === 0 ? "bg-gray-800" : level === 1 ? "bg-primary/30" : level === 2 ? "bg-primary/60" : "bg-primary"
    } else {
      return level === 0 ? "bg-gray-200" : level === 1 ? "bg-primary/30" : level === 2 ? "bg-primary/60" : "bg-primary"
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="grid grid-rows-7 gap-1" style={{ gridTemplateRows: "repeat(7, 1fr)" }}>
        {activityGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-52 gap-1" style={{ gridTemplateColumns: "repeat(52, 1fr)" }}>
            {row.map((level, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
                title={`Activity on day ${rowIndex + 1}, week ${colIndex + 1}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
