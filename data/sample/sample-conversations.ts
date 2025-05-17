import type { Message } from "@/types/chat"

/**
 * Generates a sample conversation based on a chat title
 * @param title The chat title to base the conversation on
 * @returns An array of sample messages
 */
export function generateSampleConversation(title: string): Message[] {
  // Default welcome message
  const welcomeMessage: Message = {
    id: "welcome",
    content: "Hello! How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 60000 * 5), // 5 minutes ago
  }

  // If no title or it's "Untitled Chat", just return welcome message
  if (!title || title === "Untitled Chat") {
    return [welcomeMessage]
  }

  const lowerTitle = title.toLowerCase()
  let conversation: Message[] = [welcomeMessage]

  // Generate conversation based on title keywords
  if (lowerTitle.includes("meditation")) {
    conversation = [
      welcomeMessage,
      {
        id: "user-1",
        content: "I need a calming voice for a meditation app aimed at children.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 4), // 4 minutes ago
      },
      {
        id: "bot-1",
        content:
          "I'd be happy to help with that. What kind of meditation are you creating? Is it for sleep, focus, or general relaxation?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 3.5), // 3.5 minutes ago
      },
      {
        id: "user-2",
        content:
          "It's for general relaxation and mindfulness. I want a gentle, soothing voice that children aged 6-12 can relate to.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 3), // 3 minutes ago
      },
      {
        id: "bot-2",
        content:
          "Great choice. For children in that age range, I recommend a warm, gentle voice with a slightly higher pitch. Would you like to hear some samples?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 2.5), // 2.5 minutes ago
      },
    ]
  } else if (lowerTitle.includes("corporate") || lowerTitle.includes("training")) {
    conversation = [
      welcomeMessage,
      {
        id: "user-1",
        content: "I need a professional voice for our corporate training videos.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 4), // 4 minutes ago
      },
      {
        id: "bot-1",
        content:
          "I can help with that. What industry is your company in, and what's the target audience for these training videos?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 3.5), // 3.5 minutes ago
      },
      {
        id: "user-2",
        content: "We're in the financial sector, and these videos are for new employees during onboarding.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 3), // 3 minutes ago
      },
      {
        id: "bot-2",
        content:
          "For financial sector onboarding, I recommend a clear, authoritative voice that conveys trust and expertise. Would you prefer a male or female voice?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 2.5), // 2.5 minutes ago
      },
    ]
  } else if (lowerTitle.includes("audiobook") || lowerTitle.includes("narration")) {
    conversation = [
      welcomeMessage,
      {
        id: "user-1",
        content: "I'm looking for a voice to narrate my fantasy novel audiobook.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 4), // 4 minutes ago
      },
      {
        id: "bot-1",
        content:
          "That sounds exciting! Can you tell me a bit about your fantasy novel? Is it aimed at adults, young adults, or children?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 3.5), // 3.5 minutes ago
      },
      {
        id: "user-2",
        content:
          "It's a young adult fantasy with magical elements and diverse characters. I need someone who can handle different accents and voices for the characters.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 3), // 3 minutes ago
      },
      {
        id: "bot-2",
        content:
          "For YA fantasy with diverse characters, I'd recommend a versatile voice actor who can create distinct character voices. Would you like to hear some samples with different accents?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 2.5), // 2.5 minutes ago
      },
    ]
  } else if (lowerTitle.includes("podcast")) {
    conversation = [
      welcomeMessage,
      {
        id: "user-1",
        content: "I need an engaging intro voice for my tech podcast.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 4), // 4 minutes ago
      },
      {
        id: "bot-1",
        content:
          "I'd be happy to help with your tech podcast intro. What's the name and general theme of your podcast?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 3.5), // 3.5 minutes ago
      },
      {
        id: "user-2",
        content: "It's called 'Future Forward' and covers emerging technologies and their impact on society.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 3), // 3 minutes ago
      },
      {
        id: "bot-2",
        content:
          "Great name! For a tech podcast like 'Future Forward', I'd suggest a confident, enthusiastic voice with good energy. Would you prefer a more serious tone or something more casual and conversational?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 2.5), // 2.5 minutes ago
      },
    ]
  } else if (lowerTitle.includes("commercial") || lowerTitle.includes("ad")) {
    conversation = [
      welcomeMessage,
      {
        id: "user-1",
        content: "I need an energetic voice for a product commercial.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 4), // 4 minutes ago
      },
      {
        id: "bot-1",
        content:
          "I can definitely help with that. What kind of product are you advertising, and who's your target audience?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 3.5), // 3.5 minutes ago
      },
      {
        id: "user-2",
        content:
          "It's a new energy drink targeting young adults aged 18-30 who are into fitness and active lifestyles.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 3), // 3 minutes ago
      },
      {
        id: "bot-2",
        content:
          "For an energy drink commercial targeting that demographic, I'd recommend a dynamic, high-energy voice that conveys excitement and vitality. Would you like the tone to be motivational, edgy, or more friendly and approachable?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 2.5), // 2.5 minutes ago
      },
    ]
  } else if (lowerTitle.includes("educational") || lowerTitle.includes("course")) {
    conversation = [
      welcomeMessage,
      {
        id: "user-1",
        content: "I need a clear, engaging voice for an educational biology course.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 4), // 4 minutes ago
      },
      {
        id: "bot-1",
        content:
          "I'd be happy to help with your educational content. Is this for high school students, college level, or another audience?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 3.5), // 3.5 minutes ago
      },
      {
        id: "user-2",
        content: "It's for high school students, grades 9-12. The content covers cellular biology and genetics.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 3), // 3 minutes ago
      },
      {
        id: "bot-2",
        content:
          "For high school biology, I recommend a clear, friendly voice that can explain complex concepts in an approachable way. Would you prefer a more enthusiastic, professor-like tone or something more conversational?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 2.5), // 2.5 minutes ago
      },
    ]
  } else {
    // Generic conversation for other titles
    conversation = [
      welcomeMessage,
      {
        id: "user-1",
        content: `I need a voice for my ${title.toLowerCase()} project.`,
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 4), // 4 minutes ago
      },
      {
        id: "bot-1",
        content: `I'd be happy to help with your ${title} project. Can you tell me more about what you're looking for?`,
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 3.5), // 3.5 minutes ago
      },
      {
        id: "user-2",
        content: "I need something that sounds natural and engaging for my audience.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000 * 3), // 3 minutes ago
      },
      {
        id: "bot-2",
        content:
          "Natural and engaging is definitely possible. Would you prefer a male or female voice, and do you have any specific accent preferences?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000 * 2.5), // 2.5 minutes ago
      },
    ]
  }

  return conversation
}
