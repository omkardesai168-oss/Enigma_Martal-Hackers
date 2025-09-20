"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Circle, Lock, Trophy, TrendingUp, Users, BookOpen, ArrowRight, Star, Coins } from "lucide-react"
import Link from "next/link"
import { StreakWidget, PointsWidget, QuickChallenge, RecentBadge } from "@/components/gamification-widgets"
import AIChatAssistant from "@/components/ai-chat-assistant"
import { useTranslation } from "@/lib/translations"

interface JourneyStage {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  status: "completed" | "current" | "locked"
  lessons: number
  completedLessons: number
  badge?: string
}

export default function DashboardPage() {
  const [language, setLanguage] = useState("en")
  const { t } = useTranslation(language)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("trustwise_language") || "en"
    setLanguage(savedLanguage)
  }, [])

  const [user] = useState({
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    currentStage: "Smart Spending",
    totalProgress: 45,
    streakDays: 12,
    longestStreak: 15,
    coinsEarned: 2450,
    todayPoints: 75,
    rank: 47,
    totalUsers: 1247,
  })

  const [journeyStages] = useState<JourneyStage[]>([
    {
      id: "basic-savings",
      title: language === "hi" ? "बुनियादी बचत" : "Basic Savings",
      description:
        language === "hi"
          ? "पैसे बचाने और डिजिटल वॉलेट की बुनियादी बातें सीखें"
          : "Master the fundamentals of saving money and digital wallets",
      icon: "💰",
      progress: 100,
      status: "completed",
      lessons: 8,
      completedLessons: 8,
      badge: language === "hi" ? "बचत चैंपियन" : "Savings Champion",
    },
    {
      id: "smart-spending",
      title: language === "hi" ? "स्मार्ट खर्च" : "Smart Spending",
      description:
        language === "hi"
          ? "बजटिंग, व्यय ट्रैकिंग और स्मार्ट वित्तीय निर्णय सीखें"
          : "Learn budgeting, expense tracking, and smart financial decisions",
      icon: "📊",
      progress: 60,
      status: "current",
      lessons: 10,
      completedLessons: 6,
    },
    {
      id: "credit-readiness",
      title: language === "hi" ? "क्रेडिट तैयारी" : "Credit Readiness",
      description:
        language === "hi" ? "क्रेडिट, लोन और जिम्मेदार उधार को समझें" : "Understand credit, loans, and responsible borrowing",
      icon: "🏦",
      progress: 0,
      status: "locked",
      lessons: 12,
      completedLessons: 0,
    },
    {
      id: "investment-awareness",
      title: language === "hi" ? "निवेश जागरूकता" : "Investment Awareness",
      description:
        language === "hi"
          ? "निवेश की बुनियादी बातें और दीर्घकालिक धन निर्माण का अन्वेषण करें"
          : "Explore investment basics and long-term wealth building",
      icon: "📈",
      progress: 0,
      status: "locked",
      lessons: 15,
      completedLessons: 0,
    },
  ])

  const [recentActivities] = useState([
    {
      type: "lesson",
      title: language === "hi" ? "पूर्ण: मासिक बजट योजना" : "Completed: Monthly Budget Planning",
      time: language === "hi" ? "2 घंटे पहले" : "2 hours ago",
      points: 50,
    },
    {
      type: "badge",
      title: language === "hi" ? "अर्जित: बजट मास्टर बैज" : "Earned: Budget Master Badge",
      time: language === "hi" ? "1 दिन पहले" : "1 day ago",
      points: 100,
    },
    {
      type: "community",
      title: language === "hi" ? "राज की बचत के सवाल में मदद की" : "Helped Raj with savings question",
      time: language === "hi" ? "2 दिन पहले" : "2 days ago",
      points: 25,
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">
                {t("welcome")}, {user.name}
              </h1>
              <p className="text-sm text-muted-foreground">{t("dashboardSubtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/games">
              <Button variant="outline" size="sm">
                <Trophy className="w-4 h-4 mr-2" />
                {t("budgetChallenge")}
              </Button>
            </Link>
            <Link href="/tracker">
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                {t("tracker")}
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                {language === "hi" ? "समुदाय" : "Community"}
              </Button>
            </Link>
            <Link href="/achievements">
              <Button variant="outline" size="sm">
                <Trophy className="w-4 h-4 mr-2" />
                {language === "hi" ? "उपलब्धियां" : "Achievements"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Gamification Widgets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StreakWidget currentStreak={user.streakDays} longestStreak={user.longestStreak} />
          <PointsWidget totalPoints={user.coinsEarned} todayPoints={user.todayPoints} />
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">#{user.rank}</div>
              <div className="text-sm text-muted-foreground">{language === "hi" ? "लीडरबोर्ड" : "Leaderboard"}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">{language === "hi" ? "बैज अर्जित" : "Badges Earned"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions section with Budget Challenge and Financial Tracker */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-emerald-600" />
                {t("budgetChallenge")}
              </CardTitle>
              <CardDescription>{t("budgetChallengeDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "hi"
                      ? "12 महीने के वित्तीय परिदृश्यों में जीवित रहें"
                      : "Survive 12 months of financial scenarios"}
                  </p>
                  <Badge variant="secondary">{language === "hi" ? "नया गेम उपलब्ध" : "New Game Available"}</Badge>
                </div>
                <Link href="/games">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    {t("playNow")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-purple-600" />
                {t("companySim")}
              </CardTitle>
              <CardDescription>{t("companySimDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "hi"
                      ? "व्यावसायिक निवेश और रणनीतिक निर्णय लें"
                      : "Make business investments and strategic decisions"}
                  </p>
                  <Badge variant="secondary">{language === "hi" ? "व्यावसायिक रणनीति" : "Business Strategy"}</Badge>
                </div>
                <Link href="/games/company-sim">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    {language === "hi" ? "व्यवसाय शुरू करें" : "Start Business"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                {t("trackerTitle")}
              </CardTitle>
              <CardDescription>{t("trackerSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "hi"
                      ? "चार्ट के साथ अपने वित्तीय स्वास्थ्य की निगरानी करें"
                      : "Monitor your financial health with charts"}
                  </p>
                  <Badge variant="secondary">{language === "hi" ? "ट्रैक और सेव" : "Track & Save"}</Badge>
                </div>
                <Link href="/tracker">
                  <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                    {language === "hi" ? "ट्रैकर खोलें" : "Open Tracker"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {language === "hi" ? "समग्र प्रगति" : "Overall Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{language === "hi" ? "यात्रा पूर्णता" : "Journey Completion"}</span>
                  <span className="font-medium">{user.totalProgress}%</span>
                </div>
                <Progress value={user.totalProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {language === "hi"
                    ? `वर्तमान में ${user.currentStage} चरण में`
                    : `Currently in ${user.currentStage} stage`}
                </p>
              </div>
            </CardContent>
          </Card>

          <QuickChallenge
            title={language === "hi" ? "दैनिक शिक्षार्थी" : "Daily Learner"}
            description={language === "hi" ? "आज 1 पाठ पूरा करें" : "Complete 1 lesson today"}
            progress={1}
            maxProgress={1}
            reward={25}
            timeLeft={language === "hi" ? "18 घंटे बचे" : "18h left"}
          />

          <RecentBadge
            title={language === "hi" ? "बजट मास्टर" : "Budget Master"}
            icon="📊"
            earnedDate={language === "hi" ? "3 दिन पहले" : "3 days ago"}
            points={150}
          />
        </div>

        {/* Journey Stages */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{language === "hi" ? "आपकी सीखने की यात्रा" : "Your Learning Journey"}</h2>
            <Link href="/learn">
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {language === "hi" ? "सभी पाठ देखें" : "View All Lessons"}
              </Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {journeyStages.map((stage, index) => (
              <Card
                key={stage.id}
                className={`transition-all duration-300 ${
                  stage.status === "current"
                    ? "ring-2 ring-primary/20 bg-primary/5"
                    : stage.status === "completed"
                      ? "bg-muted/30"
                      : "opacity-60"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{stage.icon}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{stage.title}</CardTitle>
                          {stage.status === "completed" && <CheckCircle className="w-5 h-5 text-primary" />}
                          {stage.status === "current" && <Circle className="w-5 h-5 text-primary" />}
                          {stage.status === "locked" && <Lock className="w-5 h-5 text-muted-foreground" />}
                        </div>
                        <CardDescription className="text-pretty">{stage.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-sm text-muted-foreground">
                        {stage.completedLessons}/{stage.lessons} {language === "hi" ? "पाठ" : "lessons"}
                      </div>
                      {stage.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {stage.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{language === "hi" ? "प्रगति" : "Progress"}</span>
                        <span className="font-medium">{stage.progress}%</span>
                      </div>
                      <Progress value={stage.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {stage.status === "completed" &&
                          (language === "hi" ? "चरण पूरा! बहुत बढ़िया।" : "Stage completed! Well done.")}
                        {stage.status === "current" &&
                          (language === "hi" ? "अपनी सीखने की यात्रा जारी रखें" : "Continue your learning journey")}
                        {stage.status === "locked" &&
                          (language === "hi"
                            ? "अनलॉक करने के लिए पिछला चरण पूरा करें"
                            : "Complete previous stage to unlock")}
                      </div>
                      {stage.status !== "locked" && (
                        <Link href="/learn">
                          <Button size="sm" variant={stage.status === "current" ? "default" : "outline"}>
                            {stage.status === "current"
                              ? language === "hi"
                                ? "जारी रखें"
                                : "Continue"
                              : language === "hi"
                                ? "समीक्षा"
                                : "Review"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{language === "hi" ? "हाल की गतिविधि" : "Recent Activity"}</h2>
          <div className="grid gap-4">
            {recentActivities.map((activity, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === "lesson"
                            ? "bg-primary/10"
                            : activity.type === "badge"
                              ? "bg-yellow-500/10"
                              : "bg-blue-500/10"
                        }`}
                      >
                        {activity.type === "lesson" && <BookOpen className="w-4 h-4 text-primary" />}
                        {activity.type === "badge" && <Trophy className="w-4 h-4 text-yellow-600" />}
                        {activity.type === "community" && <Users className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary">
                      <Coins className="w-4 h-4" />+{activity.points}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Chat Assistant */}
        <AIChatAssistant language={language} />
      </div>
    </div>
  )
}
