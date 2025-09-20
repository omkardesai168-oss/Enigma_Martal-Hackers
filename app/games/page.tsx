"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Building2, Calculator, TrendingUp, Users, Target, Haze as Maze, Heart } from "lucide-react"
import Link from "next/link"

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-primary hover:text-primary/80 font-medium">
              ← Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                Financial Games
              </h1>
              <p className="text-sm text-muted-foreground">Learn money management through interactive games</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Budget Challenge Game */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-emerald-600" />
                Budget Challenge
              </CardTitle>
              <CardDescription>Master personal finance through 12 months of real-life scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>₹50,000 starting balance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>12-month challenge</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">What you'll learn:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Monthly budget management</li>
                  <li>• Emergency fund planning</li>
                  <li>• Smart spending decisions</li>
                  <li>• Cultural financial scenarios</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/games/budget-challenge">Play Budget Challenge</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company Simulation Game */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                Company Simulator
              </CardTitle>
              <CardDescription>Build and manage your own virtual company with ₹10 lakh capital</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>₹10 lakh starting capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Business management</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">What you'll learn:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Investment decision making</li>
                  <li>• Cash flow management</li>
                  <li>• Risk assessment</li>
                  <li>• Business strategy</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/games/company-sim">Play Company Simulator</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Maze className="h-6 w-6 text-purple-600" />
                Loan Labyrinth
              </CardTitle>
              <CardDescription>Navigate smart borrowing decisions through an interactive maze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span>100 trust points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span>Maze navigation</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">What you'll learn:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Loan decision making</li>
                  <li>• Repayment consequences</li>
                  <li>• Credit score impact</li>
                  <li>• Trust building rewards</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/games/loan-labyrinth">Play Loan Labyrinth</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Benefits Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Why Play Financial Games?</CardTitle>
            <CardDescription>
              Interactive learning makes financial concepts easier to understand and remember
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Gamepad2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold">Safe Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Make financial mistakes and learn from them without real-world consequences
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Real Scenarios</h3>
                <p className="text-sm text-muted-foreground">
                  Experience culturally relevant financial situations you might face in real life
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Skill Building</h3>
                <p className="text-sm text-muted-foreground">
                  Develop critical thinking and decision-making skills for better financial outcomes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
