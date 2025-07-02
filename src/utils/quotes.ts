export const motivationalQuotes = [
  "Luck favors the bold! 🔥",
  "Stay winning, stay coding! 💻",
  "Fortune sides with him who dares! ⚡",
  "Champions are made of pure determination! 🏆",
  "Every expert was once a beginner! 🌟",
  "Success is not final, failure is not fatal! 💪",
  "Dream big, play bigger! 🚀",
  "The only impossible journey is the one you never begin! ✨",
  "Believe in your choices! 🎯",
  "Victory belongs to the persistent! 🔥",
  "Greatness is earned, not given! 💎",
  "Your vibe attracts your tribe! ✨",
  "Level up your mindset! 🎮",
  "Confidence is your superpower! ⚡",
  "Make moves in silence! 🤫",
  "Energy never lies! 🌟",
  "Stay hungry, stay humble! 🙏",
  "Trust the process! 📈",
  "Manifest your destiny! 🔮",
  "Be the main character! 👑"
];

export const getRandomQuote = (): string => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};