interface ChatMessageProps {
  message: {
    id: string
    content: string
    sender: "user" | "bot"
    timestamp: Date
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? "text-primary-foreground/70" : "text-secondary-foreground/70"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}
