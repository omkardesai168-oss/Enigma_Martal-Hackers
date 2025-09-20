"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Coins, Flame, Gift } from "lucide-react"

interface StreakWidgetProps {
  currentStreak: number
  longestStreak: number
}

export function StreakWidget({ currentStreak, longestStreak }: StreakWidgetProps) {
  return (
    <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-700">{currentStreak}</div>
              <div className="text-sm text-orange-600">Day Streak</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Best: {longestStreak} days</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PointsWidgetProps {
  totalPoints: number
  todayPoints: number
}

export function PointsWidget({ totalPoints, todayPoints }: PointsWidgetProps) {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Coins className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">{totalPoints.toLocaleString()}</div>
              <div className="text-sm text-green-600">Total Points</div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="text-xs">
              +{todayPoints} today
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface QuickChallengeProps {
  title: string
  description: string
  progress: number
  maxProgress: number
  reward: number
  timeLeft: string
}

export function QuickChallenge({ title, description, progress, maxProgress, reward, timeLeft }: QuickChallengeProps) {
  const progressPercent = (progress / maxProgress) * 100

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {timeLeft}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {progress}/{maxProgress}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <Gift className="w-4 h-4" />
            {reward} points
          </div>
          <Button size="sm" disabled={progress >= maxProgress}>
            {progress >= maxProgress ? "Complete!" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface RecentBadgeProps {
  title: string
  icon: string
  earnedDate: string
  points: number
}

export function RecentBadge({ title, icon, earnedDate, points }: RecentBadgeProps) {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div className="flex-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{earnedDate}</div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <Coins className="w-4 h-4" />+{points}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface LeaderboardPreviewProps {
  userRank: number
  userPoints: number
  totalUsers: number
}

export function LeaderboardPreview({ userRank, userPoints, totalUsers }: LeaderboardPreviewProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Your Ranking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">#{userRank}</div>
          <div className="text-sm text-muted-foreground">out of {totalUsers.toLocaleString()} learners</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Your Points</span>
          <span className="font-medium">{userPoints.toLocaleString()}</span>
        </div>
        <Button size="sm" variant="outline" className="w-full bg-transparent">
          View Full Leaderboard
        </Button>
      </CardContent>
    </Card>
  )
}
