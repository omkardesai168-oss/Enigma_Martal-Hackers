"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Globe, Check } from "lucide-react"
import { useRouter } from "next/navigation"

const languages = [
  { code: "en", name: "English", native: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", native: "অসমীয়া", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰" },
  { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇳🇵" },
  { code: "si", name: "Sinhala", native: "සිංහල", flag: "🇱🇰" },
  { code: "my", name: "Myanmar", native: "မြန်မာ", flag: "🇲🇲" },
  { code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", name: "Filipino", native: "Filipino", flag: "🇵🇭" },
  { code: "sw", name: "Swahili", native: "Kiswahili", flag: "🇰🇪" },
  { code: "am", name: "Amharic", native: "አማርኛ", flag: "🇪🇹" },
  { code: "ha", name: "Hausa", native: "Hausa", flag: "🇳🇬" },
  { code: "yo", name: "Yoruba", native: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", native: "Igbo", flag: "🇳🇬" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇧🇷" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "zh", name: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
]

export default function LanguageSelectionPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("trustwise_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode)
  }

  const handleContinue = () => {
    setIsLoading(true)

    // Save language preference
    const updatedUser = { ...user, language: selectedLanguage }
    localStorage.setItem("trustwise_user", JSON.stringify(updatedUser))
    localStorage.setItem("trustwise_language", selectedLanguage)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">TrustWise</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Choose your preferred language to continue</p>
          </div>
        </div>

        {/* Language Selection */}
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Select Your Language</CardTitle>
            <CardDescription>
              Choose the language you're most comfortable with for your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                    selectedLanguage === lang.code
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{lang.flag}</span>
                    {selectedLanguage === lang.code && <Check className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{lang.name}</div>
                    <div className="text-xs text-muted-foreground">{lang.native}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Badge variant="secondary" className="text-center">
                Selected: {languages.find((l) => l.code === selectedLanguage)?.name} (
                {languages.find((l) => l.code === selectedLanguage)?.native})
              </Badge>
              <Button onClick={handleContinue} size="lg" className="px-8" disabled={isLoading}>
                {isLoading ? "Setting up your experience..." : "Continue to Dashboard"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="text-center text-sm text-muted-foreground">
          <p>You can change your language preference anytime from your profile settings.</p>
        </div>
      </div>
    </div>
  )
}
