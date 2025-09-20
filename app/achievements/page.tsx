"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Coins, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "community" | "streak" | "savings"
  points: number
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Challenge {
  id: string
  title: string
  description: string
  icon: string
  type: "daily" | "weekly" | "monthly"
  progress: number
  maxProgress: number
  reward: number
  expiresIn: string
  completed: boolean
}

export default function AchievementsPage() {
  const [achievements] = useState<Achievement[]>([
    {
      id: "first-lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      category: "learning",
      points: 50,
      earned: true,
      earnedDate: "2 days ago",
      rarity: "common",
    },
    {
      id: "savings-champion",
      title: "Savings Champion",
      description: "Complete the Basic Savings module",
      icon: "💰",
      category: "learning",
      points: 200,
      earned: true,
      earnedDate: "1 week ago",
      rarity: "rare",
    },
    {
      id: "budget-master",
      title: "Budget Master",
      description: "Complete 5 budgeting lessons",
      icon: "📊",
      category: "learning",
      points: 150,
      earned: true,
      earnedDate: "3 days ago",
      rarity: "rare",
    },
    {
      id: "streak-warrior",
      title: "Streak Warrior",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      category: "streak",
      points: 100,
      earned: true,
      earnedDate: "1 day ago",
      rarity: "common",
    },
    {
      id: "community-helper",
      title: "Community Helper",
      description: "Help 10 community members",
      icon: "🤝",
      category: "community",
      points: 250,
      earned: false,
      progress: 7,
      maxProgress: 10,
      rarity: "epic",
    },
    {
      id: "festival-saver",
      title: "Festival Saver",
      description: "Complete festival savings challenge",
      icon: "🎉",
      category: "savings",
      points: 300,
      earned: false,
      progress: 80,
      maxProgress: 100,
      rarity: "epic",
    },
    {
      id: "financial-guru",
      title: "Financial Guru",
      description: "Complete all learning modules",
      icon: "🧠",
      category: "learning",
      points: 1000,
      earned: false,
      progress: 2,
      maxProgress: 4,
      rarity: "legendary",
    },
  ])

  const [challenges] = useState<Challenge[]>([
    {
      id: "daily-lesson",
      title: "Daily Learner",
      description: "Complete 1 lesson today",
      icon: "📚",
      type: "daily",
      progress: 1,
      maxProgress: 1,
      reward: 25,
      expiresIn: "18h",
      completed: true,
    },
    {
      id: "weekly-streak",
      title: "Weekly Warrior",
      description: "Learn for 5 days this week",
      icon: "⚡",
      type: "weekly",
      progress: 3,
      maxProgress: 5,
      reward: 100,
      expiresIn: "4d",
      completed: false,
    },
    {
      id: "community-engage",
      title: "Community Connector",
      description: "Help 3 community members this week",
      icon: "👥",
      type: "weekly",
      progress: 1,
      maxProgress: 3,
      reward: 75,
      expiresIn: "4d",
      completed: false,
    },
    {
      id: "monthly-master",
      title: "Monthly Master",
      description: "Complete 20 lessons this month",
      icon: "🏆",
      type: "monthly",
      progress: 12,
      maxProgress: 20,
      reward: 500,
      expiresIn: "12d",
      completed: false,
    },
  ])

  const earnedAchievements = achievements.filter((a) => a.earned)
  const unearned = achievements.filter((a) => !a.earned)
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100"
      case "rare":
        return "text-blue-600 bg-blue-100"
      case "epic":
        return "text-purple-600 bg-purple-100"
      case "legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "bg-green-100 text-green-700"
      case "weekly":
        return "bg-blue-100 text-blue-700"
      case "monthly":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
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
            <h1 className="text-xl font-semibold">Achievements & Challenges</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1">
              <Trophy className="w-3 h-3" />
              {earnedAchievements.length} badges
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Coins className="w-3 h-3" />
              {totalPoints} points
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{earnedAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{challenges.filter((c) => c.completed).length}</div>
              <div className="text-sm text-muted-foreground">Challenges Done</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">#47</div>
              <div className="text-sm text-muted-foreground">Leaderboard Rank</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Earned Achievements */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Badges</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedAchievements.map((achievement) => (
                  <Card key={achievement.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center pb-3">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>{achievement.rarity}</Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          {achievement.points} pts
                        </span>
                        <span className="text-muted-foreground">{achievement.earnedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Progress Achievements */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">In Progress</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {unearned.map((achievement) => (
                  <Card key={achievement.id} className="hover:shadow-lg transition-all duration-300 opacity-80">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl opacity-60">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{achievement.title}</h3>
                            <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                          {achievement.progress !== undefined && achievement.maxProgress && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(achievement.progress / achievement.maxProgress) * 100}
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-medium text-primary">
                            <Coins className="w-4 h-4" />
                            {achievement.points}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Active Challenges</h2>
              <div className="grid gap-4">
                {challenges.map((challenge) => (
                  <Card
                    key={challenge.id}
                    className={`hover:shadow-lg transition-all duration-300 ${
                      challenge.completed ? "bg-muted/30" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{challenge.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{challenge.title}</h3>
                              <Badge className={`text-xs ${getChallengeTypeColor(challenge.type)}`}>
                                {challenge.type}
                              </Badge>
                              {challenge.completed && (
                                <Badge variant="secondary" className="text-xs">
                                  <Trophy className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>
                                  {challenge.progress}/{challenge.maxProgress}
                                </span>
                              </div>
                              <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center gap-1 text-sm font-medium text-primary">
                            <Coins className="w-4 h-4" />
                            {challenge.reward}
                          </div>
                          <div className="text-xs text-muted-foreground">Expires in {challenge.expiresIn}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Community Leaderboard</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { rank: 1, name: "Rajesh Kumar", points: 4250, badge: "🏆", region: "Maharashtra" },
                      { rank: 2, name: "Anita Sharma", points: 3890, badge: "🥈", region: "Punjab" },
                      { rank: 3, name: "Vikram Singh", points: 3650, badge: "🥉", region: "Rajasthan" },
                      { rank: 4, name: "Meera Patel", points: 3420, badge: "⭐", region: "Gujarat" },
                      { rank: 5, name: "Suresh Reddy", points: 3200, badge: "⭐", region: "Telangana" },
                      {
                        rank: 47,
                        name: "Priya Sharma (You)",
                        points: 2450,
                        badge: "",
                        region: "Karnataka",
                        isUser: true,
                      },
                    ].map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.isUser ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 text-center font-bold">
                            {user.rank <= 3 ? user.badge : `#${user.rank}`}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.region}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 font-medium">
                          <Coins className="w-4 h-4 text-primary" />
                          {user.points.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
