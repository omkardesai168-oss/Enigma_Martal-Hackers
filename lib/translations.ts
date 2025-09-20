export const translations = {
  en: {
    // Navigation & Common
    dashboard: "Dashboard",
    tracker: "Financial Tracker",
    games: "Games",
    profile: "Profile",
    logout: "Logout",
    welcome: "Welcome",
    loading: "Loading...",
    continue: "Continue",
    back: "Back",
    next: "Next",
    save: "Save",
    cancel: "Cancel",

    // Dashboard
    dashboardTitle: "Your Financial Journey",
    dashboardSubtitle: "Track, learn, and grow your financial knowledge",
    quickStats: "Quick Stats",
    totalSavings: "Total Savings",
    monthlyBudget: "Monthly Budget",
    trustScore: "Trust Score",
    gamesPlayed: "Games Played",
    featuredGames: "Featured Games",
    budgetChallenge: "Budget Challenge",
    budgetChallengeDesc: "Master budgeting through real-world scenarios",
    companySim: "Company Simulator",
    companySimDesc: "Build and manage your virtual business empire",
    loanLabyrinth: "Loan Labyrinth",
    loanLabyrinthDesc: "Navigate smart borrowing decisions through puzzles",

    // Financial Tracker
    trackerTitle: "Financial Tracker",
    trackerSubtitle: "Monitor your income, expenses, and savings",
    income: "Income",
    expenses: "Expenses",
    savings: "Savings",
    addTransaction: "Add Transaction",
    amount: "Amount",
    description: "Description",
    category: "Category",
    date: "Date",

    // Games
    gamesTitle: "Financial Games",
    gamesSubtitle: "Learn through interactive gameplay",
    playNow: "Play Now",

    // AI Assistant
    aiAssistant: "AI Assistant",
    askQuestion: "Ask me anything about finance...",
    voiceChat: "Voice Chat",
    textChat: "Text Chat",

    // Auth
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Full Name",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",

    // Language Selection
    selectLanguage: "Select Your Language",
    languageDesc: "Choose the language you're most comfortable with for your learning journey",
    continueToApp: "Continue to Dashboard",
  },

  hi: {
    // Navigation & Common
    dashboard: "डैशबोर्ड",
    tracker: "वित्तीय ट्रैकर",
    games: "खेल",
    profile: "प्रोफाइल",
    logout: "लॉग आउट",
    welcome: "स्वागत है",
    loading: "लोड हो रहा है...",
    continue: "जारी रखें",
    back: "वापस",
    next: "अगला",
    save: "सेव करें",
    cancel: "रद्द करें",

    // Dashboard
    dashboardTitle: "आपकी वित्तीय यात्रा",
    dashboardSubtitle: "अपने वित्तीय ज्ञान को ट्रैक करें, सीखें और बढ़ाएं",
    quickStats: "त्वरित आंकड़े",
    totalSavings: "कुल बचत",
    monthlyBudget: "मासिक बजट",
    trustScore: "ट्रस्ट स्कोर",
    gamesPlayed: "खेले गए खेल",
    featuredGames: "फीचर्ड गेम्स",
    budgetChallenge: "बजट चैलेंज",
    budgetChallengeDesc: "वास्तविक परिस्थितियों के माध्यम से बजटिंग में महारत हासिल करें",
    companySim: "कंपनी सिमुलेटर",
    companySimDesc: "अपना वर्चुअल बिजनेस साम्राज्य बनाएं और प्रबंधित करें",
    loanLabyrinth: "लोन लेबिरिंथ",
    loanLabyrinthDesc: "पहेलियों के माध्यम से स्मार्ट उधार निर्णयों को नेविगेट करें",

    // Financial Tracker
    trackerTitle: "वित्तीय ट्रैकर",
    trackerSubtitle: "अपनी आय, व्यय और बचत की निगरानी करें",
    income: "आय",
    expenses: "व्यय",
    savings: "बचत",
    addTransaction: "लेनदेन जोड़ें",
    amount: "राशि",
    description: "विवरण",
    category: "श्रेणी",
    date: "तारीख",

    // Games
    gamesTitle: "वित्तीय खेल",
    gamesSubtitle: "इंटरैक्टिव गेमप्ले के माध्यम से सीखें",
    playNow: "अभी खेलें",

    // AI Assistant
    aiAssistant: "AI सहायक",
    askQuestion: "वित्त के बारे में मुझसे कुछ भी पूछें...",
    voiceChat: "वॉयस चैट",
    textChat: "टेक्स्ट चैट",

    // Auth
    login: "लॉगिन",
    signup: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "पूरा नाम",
    createAccount: "खाता बनाएं",
    alreadyHaveAccount: "पहले से खाता है?",
    dontHaveAccount: "खाता नहीं है?",

    // Language Selection
    selectLanguage: "अपनी भाषा चुनें",
    languageDesc: "अपनी सीखने की यात्रा के लिए सबसे आरामदायक भाषा चुनें",
    continueToApp: "डैशबोर्ड पर जाएं",
  },
}

export type TranslationKey = keyof typeof translations.en

export function getTranslation(key: TranslationKey, language = "en"): string {
  const lang = language as keyof typeof translations
  return translations[lang]?.[key] || translations.en[key]
}

export function useTranslation(language = "en") {
  return {
    t: (key: TranslationKey) => getTranslation(key, language),
    language,
  }
}
