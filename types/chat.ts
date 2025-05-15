export interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export interface Chat {
  id: string
  name: string
  lastEdited: string
  timestamp: Date
  description: string
  thumbnail?: string
  color?: string
  messages?: Message[]
}
