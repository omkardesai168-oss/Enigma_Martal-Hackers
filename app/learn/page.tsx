"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, CheckCircle, Clock, Target, ArrowRight, Star, Users, Heart, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  type: "video" | "interactive" | "scenario" | "quiz" | "story"
  difficulty: "beginner" | "intermediate" | "advanced"
  completed: boolean
  locked: boolean
  points: number
}

interface MotivationalStory {
  id: string
  title: string
  author: string
  summary: string
  category: "success" | "challenge" | "inspiration"
  readTime: string
  likes: number
  image: string
}

interface LearningModule {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  totalLessons: number
  completedLessons: number
  lessons: Lesson[]
  culturalContext: string
  stories: MotivationalStory[]
}

export default function LearnPage() {
  const [selectedModule, setSelectedModule] = useState("basic-savings")
  const [activeTab, setActiveTab] = useState<"lessons" | "stories">("lessons")

  const [modules] = useState<LearningModule[]>([
    {
      id: "basic-savings",
      title: "Basic Savings",
      description: "Master the fundamentals of saving money and digital wallets",
      icon: "💰",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      culturalContext: "Adapted for seasonal income patterns and festival savings",
      stories: [
        {
          id: "ravi-story",
          title: "From ₹50 to ₹50,000: Ravi's Savings Journey",
          author: "Ravi Kumar, Farmer from Punjab",
          summary:
            "How a small-scale farmer built an emergency fund by saving just ₹50 daily, eventually buying his own tractor.",
          category: "success",
          readTime: "3 min",
          likes: 1247,
          image: "/indian-farmer-with-tractor-success-story.jpg",
        },
        {
          id: "meera-digital",
          title: "Meera's Digital Wallet Success",
          author: "Meera Devi, Shop Owner from Rajasthan",
          summary:
            "A village shop owner who transformed her business using digital payments and smart savings strategies.",
          category: "inspiration",
          readTime: "4 min",
          likes: 892,
          image: "/indian-woman-shop-owner-digital-payment.jpg",
        },
        {
          id: "festival-savings",
          title: "The Festival Fund That Changed Everything",
          author: "Amit Sharma, Teacher from Bihar",
          summary: "How planning ahead for festivals helped a family break the cycle of debt and build lasting wealth.",
          category: "challenge",
          readTime: "5 min",
          likes: 1456,
          image: "/indian-family-celebrating-festival-savings.jpg",
        },
      ],
      lessons: [
        {
          id: "savings-intro",
          title: "Why Saving Matters",
          description: "Understanding the importance of saving in your daily life",
          duration: "5 min",
          type: "video",
          difficulty: "beginner",
          completed: true,
          locked: false,
          points: 50,
        },
        {
          id: "digital-wallets",
          title: "Digital Wallets Basics",
          description: "Learn how to safely use mobile money and digital wallets",
          duration: "8 min",
          type: "interactive",
          difficulty: "beginner",
          completed: true,
          locked: false,
          points: 75,
        },
        {
          id: "ravi-story-lesson",
          title: "Success Story: Ravi's Journey",
          description: "Learn from Ravi's inspiring savings transformation",
          duration: "6 min",
          type: "story",
          difficulty: "beginner",
          completed: true,
          locked: false,
          points: 60,
        },
        {
          id: "festival-savings",
          title: "Festival Savings Challenge",
          description: "Plan and save for upcoming festivals and celebrations",
          duration: "12 min",
          type: "scenario",
          difficulty: "intermediate",
          completed: true,
          locked: false,
          points: 100,
        },
        {
          id: "emergency-fund",
          title: "Building Emergency Fund",
          description: "Create a safety net for unexpected expenses",
          duration: "10 min",
          type: "interactive",
          difficulty: "intermediate",
          completed: true,
          locked: false,
          points: 100,
        },
      ],
    },
    {
      id: "smart-spending",
      title: "Smart Spending",
      description: "Learn budgeting, expense tracking, and smart financial decisions",
      icon: "📊",
      progress: 60,
      totalLessons: 10,
      completedLessons: 6,
      culturalContext: "Includes crop cycle budgeting and seasonal expense planning",
      stories: [
        {
          id: "priya-budget",
          title: "Priya's Budget Revolution",
          author: "Priya Singh, Working Mother from Delhi",
          summary: "How a working mother of two managed household expenses and saved for her children's education.",
          category: "success",
          readTime: "4 min",
          likes: 1123,
          image: "/indian-working-mother-budgeting-success.jpg",
        },
        {
          id: "harvest-planning",
          title: "The Harvest That Secured Our Future",
          author: "Suresh Patel, Cotton Farmer from Gujarat",
          summary: "Strategic planning around harvest cycles helped this farmer family achieve financial stability.",
          category: "inspiration",
          readTime: "6 min",
          likes: 967,
          image: "/indian-cotton-farmer-harvest-planning.jpg",
        },
      ],
      lessons: [
        {
          id: "budget-basics",
          title: "Creating Your First Budget",
          description: "Learn to track income and expenses effectively",
          duration: "7 min",
          type: "interactive",
          difficulty: "beginner",
          completed: true,
          locked: false,
          points: 75,
        },
        {
          id: "expense-tracking",
          title: "Daily Expense Tracking",
          description: "Build habits for monitoring your spending",
          duration: "6 min",
          type: "interactive",
          difficulty: "beginner",
          completed: true,
          locked: false,
          points: 50,
        },
        {
          id: "priya-story-lesson",
          title: "Success Story: Priya's Budget Revolution",
          description: "Learn from Priya's household budgeting success",
          duration: "5 min",
          type: "story",
          difficulty: "beginner",
          completed: true,
          locked: false,
          points: 65,
        },
        {
          id: "harvest-budgeting",
          title: "Harvest Season Budgeting",
          description: "Plan finances around agricultural income cycles",
          duration: "15 min",
          type: "scenario",
          difficulty: "intermediate",
          completed: true,
          locked: false,
          points: 125,
        },
        {
          id: "smart-shopping",
          title: "Smart Shopping Strategies",
          description: "Make informed purchasing decisions",
          duration: "8 min",
          type: "video",
          difficulty: "intermediate",
          completed: false,
          locked: false,
          points: 75,
        },
        {
          id: "family-budget",
          title: "Family Budget Planning",
          description: "Involve family members in financial planning",
          duration: "12 min",
          type: "interactive",
          difficulty: "intermediate",
          completed: false,
          locked: false,
          points: 100,
        },
      ],
    },
    {
      id: "credit-readiness",
      title: "Credit Readiness",
      description: "Understand credit, loans, and responsible borrowing",
      icon: "🏦",
      progress: 0,
      totalLessons: 12,
      completedLessons: 0,
      culturalContext: "Covers microfinance, group lending, and traditional credit systems",
      stories: [
        {
          id: "group-lending",
          title: "The Power of Group Lending",
          author: "Sunita Collective, Self-Help Group from Odisha",
          summary: "How a women's self-help group transformed their village through collective borrowing and support.",
          category: "inspiration",
          readTime: "7 min",
          likes: 1834,
          image: "/indian-women-self-help-group-lending.jpg",
        },
        {
          id: "credit-recovery",
          title: "From Debt to Dreams",
          author: "Rajesh Kumar, Small Business Owner from Kerala",
          summary:
            "A small business owner's journey from overwhelming debt to financial freedom through smart credit management.",
          category: "challenge",
          readTime: "8 min",
          likes: 1567,
          image: "/indian-small-business-owner-debt-recovery.jpg",
        },
      ],
      lessons: [
        {
          id: "credit-intro",
          title: "What is Credit?",
          description: "Understanding credit and how it works",
          duration: "6 min",
          type: "video",
          difficulty: "beginner",
          completed: false,
          locked: true,
          points: 50,
        },
      ],
    },
  ])

  const currentModule = modules.find((m) => m.id === selectedModule) || modules[0]

  const getStoryIcon = (category: string) => {
    switch (category) {
      case "success":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "challenge":
        return <Target className="w-4 h-4 text-orange-600" />
      case "inspiration":
        return <Heart className="w-4 h-4 text-pink-600" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const getStoryBadgeColor = (category: string) => {
    switch (category) {
      case "success":
        return "bg-green-100 text-green-800"
      case "challenge":
        return "bg-orange-100 text-orange-800"
      case "inspiration":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              ← Back to Dashboard
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-xl font-semibold">Learning Journey</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1">
              <Star className="w-3 h-3" />
              2,450 points
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Award className="w-3 h-3" />
              Level 3
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Module Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-semibold text-lg">Learning Stages</h2>
            <div className="space-y-3">
              {modules.map((module) => (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedModule === module.id ? "ring-2 ring-primary/20 bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{module.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{module.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {module.completedLessons}/{module.totalLessons} lessons
                        </p>
                      </div>
                    </div>
                    <Progress value={module.progress} className="h-1.5" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">💡</div>
                <p className="text-sm font-medium mb-1">"Small steps lead to big changes"</p>
                <p className="text-xs text-muted-foreground">- TrustWise Community</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Module Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{currentModule.icon}</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{currentModule.title}</h1>
                  <p className="text-muted-foreground text-lg">{currentModule.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{currentModule.progress}%</div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{currentModule.completedLessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons Done</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {currentModule.totalLessons - currentModule.completedLessons}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{currentModule.stories.length}</div>
                    <div className="text-sm text-muted-foreground">Success Stories</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">Cultural Context</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentModule.culturalContext}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
              <Button
                variant={activeTab === "lessons" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("lessons")}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Lessons
              </Button>
              <Button
                variant={activeTab === "stories" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("stories")}
                className="gap-2"
              >
                <Users className="w-4 h-4" />
                Success Stories
              </Button>
            </div>

            {/* Lessons Tab */}
            {activeTab === "lessons" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Lessons</h2>
                <div className="space-y-3">
                  {currentModule.lessons.map((lesson, index) => (
                    <Card
                      key={lesson.id}
                      className={`transition-all hover:shadow-md ${
                        lesson.locked ? "opacity-60" : "cursor-pointer"
                      } ${lesson.completed ? "bg-muted/30" : ""}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                lesson.completed
                                  ? "bg-primary text-primary-foreground"
                                  : lesson.locked
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-primary/10 text-primary"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : lesson.locked ? (
                                <span className="text-sm font-medium">{index + 1}</span>
                              ) : (
                                <Play className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">{lesson.title}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.type}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {lesson.difficulty}
                                </Badge>
                                {lesson.type === "story" && (
                                  <Badge className="text-xs bg-purple-100 text-purple-800">
                                    <Heart className="w-3 h-3 mr-1" />
                                    Inspiring
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {lesson.points} points
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {lesson.completed && (
                              <Badge variant="secondary" className="text-xs">
                                Completed
                              </Badge>
                            )}
                            {!lesson.locked && (
                              <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                                {lesson.completed ? "Review" : "Start"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "stories" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Success Stories</h2>
                  <Badge variant="outline" className="gap-1">
                    <Users className="w-3 h-3" />
                    Real People, Real Success
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentModule.stories.map((story) => (
                    <Card key={story.id} className="cursor-pointer hover:shadow-lg transition-all group">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getStoryIcon(story.category)}
                          <Badge className={`text-xs ${getStoryBadgeColor(story.category)}`}>{story.category}</Badge>
                          <span className="text-xs text-muted-foreground">{story.readTime}</span>
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{story.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{story.summary}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">{story.author.split(" ")[0][0]}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{story.author}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Heart className="w-3 h-3" />
                            {story.likes}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">📖</div>
                    <h3 className="font-semibold mb-2">Share Your Success Story</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Inspire others by sharing your financial journey and achievements with the TrustWise community.
                    </p>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Heart className="w-4 h-4" />
                      Share Your Story
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
