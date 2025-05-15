export interface VoiceScript {
  id: string
  title: string
  content: string
  lastEdited: string
  timestamp: Date
  wordCount: number
  duration: number // in seconds
  category?: string
}

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export const sampleScripts: VoiceScript[] = [
  {
    id: "1",
    title: "Product Launch Announcement",
    content:
      "Today, we're thrilled to announce the launch of our revolutionary new product. After months of development and testing, we're confident that this innovation will transform the way you experience everyday tasks.\n\nOur team has worked tirelessly to create something that's not just functional, but truly exceptional. The sleek design, intuitive interface, and powerful capabilities set a new standard in the industry.\n\nWe invite you to experience the difference for yourself. Visit our website to learn more and be among the first to own this game-changing product.\n\nThank you for your continued support. We couldn't have reached this milestone without our amazing community.",
    lastEdited: "2 days ago",
    timestamp: new Date("2025-05-10T14:30:00"),
    wordCount: 98,
    duration: 39,
    category: "Marketing",
  },
  {
    id: "2",
    title: "Guided Meditation",
    content:
      "Welcome to this guided meditation session. Find a comfortable position, either sitting or lying down. Allow your body to relax and your mind to become still.\n\n[PAUSE: 5 seconds]\n\nTake a deep breath in through your nose, filling your lungs completely. Hold for a moment, and then exhale slowly through your mouth, releasing any tension you may be holding.\n\n[PAUSE: 3 seconds]\n\nRepeat this breathing pattern a few more times at your own pace. With each exhale, feel yourself sinking deeper into relaxation.\n\n[PAUSE: 10 seconds]\n\nNow, bring your awareness to your body. Notice any sensations without judgment. Simply observe and acknowledge what you're feeling physically.\n\n[PAUSE: 5 seconds]\n\nGradually, let your attention shift to your thoughts. Watch them come and go like clouds in the sky. There's no need to engage with them or push them away. Just observe them passing by.\n\n[PAUSE: 10 seconds]\n\nAs we conclude this meditation, gently bring your awareness back to your surroundings. Wiggle your fingers and toes, and when you're ready, open your eyes, carrying this sense of peace with you throughout your day.",
    lastEdited: "1 week ago",
    timestamp: new Date("2025-05-05T09:15:00"),
    wordCount: 186,
    duration: 180,
    category: "Wellness",
  },
  {
    id: "3",
    title: "Technical Tutorial Introduction",
    content:
      "Hello and welcome to this step-by-step tutorial. Today, I'll be guiding you through the process of setting up your development environment and creating your first project.\n\nBefore we begin, make sure you have the latest version of the software installed on your computer. You can download it from the official website if you haven't already.\n\nIn this tutorial, we'll cover the basics of the interface, essential commands, and best practices for efficient workflow. By the end, you'll have a solid foundation to build upon for your future projects.\n\nLet's get started!",
    lastEdited: "3 days ago",
    timestamp: new Date("2025-05-12T11:20:00"),
    wordCount: 89,
    duration: 36,
    category: "Education",
  },
  {
    id: "4",
    title: "Audiobook Narration Sample",
    content:
      'Chapter One: The Beginning\n\nThe old clock on the mantel struck midnight, its chimes echoing through the empty house. Sarah paused, her hand hovering over the dusty leather-bound book she\'d discovered in the attic earlier that day.\n\nA chill ran down her spine, though she couldn\'t explain why. The house was silent save for the occasional creak of settling wood and the soft patter of rain against the windows.\n\n"It\'s just an old book," she whispered to herself, trying to shake off the strange feeling of being watched.\n\nWith a deep breath, she opened the cover. The yellowed pages released a musty scent, the ink faded but still legible. The first page bore only a single line, written in an elegant script:\n\n"To whoever finds this, beware of what lies between these pages."\n\nSarah should have closed the book then and there. Later, she would wish she had. But curiosity had always been her weakness, and so she turned the page, unaware that her life was about to change forever.',
    lastEdited: "Yesterday",
    timestamp: new Date("2025-05-14T16:45:00"),
    wordCount: 156,
    duration: 62,
    category: "Entertainment",
  },
  {
    id: "5",
    title: "Company Values Overview",
    content:
      "At the core of our organization are five fundamental values that guide everything we do.\n\nFirst, integrity. We believe in honesty, transparency, and doing what's right, even when it's difficult.\n\nSecond, innovation. We constantly seek new ideas and better solutions, never settling for the status quo.\n\nThird, collaboration. We know that diverse perspectives lead to stronger outcomes, and we're committed to working together across teams and disciplines.\n\nFourth, excellence. We hold ourselves to the highest standards in all aspects of our work, striving for quality in everything we produce.\n\nFinally, customer focus. We exist to serve our customers, and their success is our success.\n\nThese values aren't just words on a wall—they're principles we live by every day. They define who we are as a company and shape the decisions we make, from the boardroom to the front lines.",
    lastEdited: "4 days ago",
    timestamp: new Date("2025-05-11T10:30:00"),
    wordCount: 132,
    duration: 53,
    category: "Corporate",
  },
]

export const getScriptById = (id: string): VoiceScript | undefined => {
  return sampleScripts.find((script) => script.id === id)
}
