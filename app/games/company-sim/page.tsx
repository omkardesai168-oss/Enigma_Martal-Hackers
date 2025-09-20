"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, TrendingUp, Users, DollarSign, Target, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface CompanyStats {
  cash: number
  revenue: number
  employees: number
  marketShare: number
  customerSatisfaction: number
  month: number
}

interface Investment {
  id: string
  name: string
  cost: number
  monthlyReturn: number
  description: string
  category: "marketing" | "product" | "operations" | "hr"
  risk: "low" | "medium" | "high"
}

interface Event {
  id: string
  title: string
  description: string
  impact: {
    cash?: number
    revenue?: number
    employees?: number
    marketShare?: number
    customerSatisfaction?: number
  }
  choices: {
    text: string
    cost: number
    outcome: string
  }[]
}

export default function CompanySimulationGame() {
  const [gameStats, setGameStats] = useState<CompanyStats>({
    cash: 1000000, // ₹10 lakh starting capital
    revenue: 50000,
    employees: 10,
    marketShare: 5,
    customerSatisfaction: 70,
    month: 1,
  })

  const [gameStarted, setGameStarted] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [gameHistory, setGameHistory] = useState<string[]>([])
  const [isGameOver, setIsGameOver] = useState(false)

  const investments: Investment[] = [
    {
      id: "1",
      name: "Digital Marketing Campaign",
      cost: 50000,
      monthlyReturn: 15000,
      description: "Boost online presence and customer acquisition",
      category: "marketing",
      risk: "medium",
    },
    {
      id: "2",
      name: "Product Development",
      cost: 100000,
      monthlyReturn: 25000,
      description: "Develop new features and improve product quality",
      category: "product",
      risk: "high",
    },
    {
      id: "3",
      name: "Hire Sales Team",
      cost: 80000,
      monthlyReturn: 20000,
      description: "Expand sales force to reach more customers",
      category: "hr",
      risk: "low",
    },
    {
      id: "4",
      name: "Automation System",
      cost: 150000,
      monthlyReturn: 30000,
      description: "Reduce operational costs through automation",
      category: "operations",
      risk: "medium",
    },
    {
      id: "5",
      name: "Customer Support Center",
      cost: 60000,
      monthlyReturn: 10000,
      description: "Improve customer satisfaction and retention",
      category: "operations",
      risk: "low",
    },
    {
      id: "6",
      name: "Market Research",
      cost: 30000,
      monthlyReturn: 8000,
      description: "Better understand market trends and opportunities",
      category: "marketing",
      risk: "low",
    },
  ]

  const events: Event[] = [
    {
      id: "1",
      title: "Economic Downturn",
      description: "The economy is facing challenges. How do you respond?",
      impact: { revenue: -20000, marketShare: -2 },
      choices: [
        { text: "Cut costs and wait", cost: 0, outcome: "Survived but lost market share" },
        { text: "Invest in marketing", cost: 40000, outcome: "Maintained market position" },
        { text: "Diversify products", cost: 80000, outcome: "Found new revenue streams" },
      ],
    },
    {
      id: "2",
      title: "Competitor Launch",
      description: "A major competitor launched a similar product. Your response?",
      impact: { marketShare: -3, customerSatisfaction: -5 },
      choices: [
        { text: "Price war", cost: 0, outcome: "Reduced profits but kept customers" },
        { text: "Improve features", cost: 60000, outcome: "Differentiated from competition" },
        { text: "Focus on service", cost: 30000, outcome: "Built customer loyalty" },
      ],
    },
    {
      id: "3",
      title: "Talent Shortage",
      description: "Key employees are leaving for better opportunities.",
      impact: { employees: -3, revenue: -15000 },
      choices: [
        { text: "Increase salaries", cost: 50000, outcome: "Retained talent but increased costs" },
        { text: "Hire freelancers", cost: 25000, outcome: "Maintained operations temporarily" },
        { text: "Automate processes", cost: 100000, outcome: "Reduced dependency on staff" },
      ],
    },
  ]

  const startGame = () => {
    setGameStarted(true)
    setGameHistory(["🚀 Started TechCorp with ₹10 lakh capital!"])
  }

  const makeInvestment = (investment: Investment) => {
    if (gameStats.cash >= investment.cost) {
      setGameStats((prev) => ({
        ...prev,
        cash: prev.cash - investment.cost,
        revenue: prev.revenue + investment.monthlyReturn,
        employees: investment.category === "hr" ? prev.employees + 2 : prev.employees,
        marketShare: investment.category === "marketing" ? prev.marketShare + 1 : prev.marketShare,
        customerSatisfaction:
          investment.category === "operations" ? prev.customerSatisfaction + 5 : prev.customerSatisfaction,
      }))

      setGameHistory((prev) => [...prev, `💰 Invested ₹${investment.cost.toLocaleString()} in ${investment.name}`])
    }
  }

  const handleEvent = (choice: Event["choices"][0]) => {
    if (currentEvent && gameStats.cash >= choice.cost) {
      const impact = currentEvent.impact
      setGameStats((prev) => ({
        ...prev,
        cash: prev.cash - choice.cost + (impact.cash || 0),
        revenue: prev.revenue + (impact.revenue || 0),
        employees: prev.employees + (impact.employees || 0),
        marketShare: Math.max(0, prev.marketShare + (impact.marketShare || 0)),
        customerSatisfaction: Math.max(
          0,
          Math.min(100, prev.customerSatisfaction + (impact.customerSatisfaction || 0)),
        ),
      }))

      setGameHistory((prev) => [...prev, `📰 ${currentEvent.title}: ${choice.outcome}`])
      setCurrentEvent(null)
    }
  }

  const nextMonth = () => {
    // Monthly revenue and costs
    const monthlyCosts = gameStats.employees * 5000 // ₹5k per employee
    const monthlyProfit = gameStats.revenue - monthlyCosts

    setGameStats((prev) => ({
      ...prev,
      cash: prev.cash + monthlyProfit,
      month: prev.month + 1,
    }))

    // Random events
    if (Math.random() < 0.3 && !currentEvent) {
      const randomEvent = events[Math.floor(Math.random() * events.length)]
      setCurrentEvent(randomEvent)
    }

    // Check game over conditions
    if (gameStats.cash < 0) {
      setIsGameOver(true)
      setGameHistory((prev) => [...prev, "💔 Company went bankrupt! Game Over."])
    } else if (gameStats.month >= 12 && gameStats.cash > 2000000) {
      setIsGameOver(true)
      setGameHistory((prev) => [...prev, "🎉 Congratulations! You built a successful company!"])
    }
  }

  const resetGame = () => {
    setGameStats({
      cash: 1000000,
      revenue: 50000,
      employees: 10,
      marketShare: 5,
      customerSatisfaction: 70,
      month: 1,
    })
    setGameStarted(false)
    setCurrentEvent(null)
    setGameHistory([])
    setIsGameOver(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "marketing":
        return "📢"
      case "product":
        return "🛠️"
      case "operations":
        return "⚙️"
      case "hr":
        return "👥"
      default:
        return "💼"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/games" className="text-primary hover:text-primary/80 font-medium">
              ← Back to Games
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Company Simulator
              </h1>
              <p className="text-sm text-muted-foreground">Build and manage your virtual company</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!gameStarted ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Welcome to TechCorp!</CardTitle>
              <CardDescription className="text-lg">
                You've been given ₹10 lakh to start and grow a technology company. Make smart investments, handle
                challenges, and see if you can build a successful business in 12 months!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Game Rules:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Start with ₹10 lakh capital</li>
                    <li>• Make strategic investments</li>
                    <li>• Handle random business events</li>
                    <li>• Manage cash flow and growth</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Win Conditions:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Survive 12 months</li>
                    <li>• End with ₹20 lakh+ capital</li>
                    <li>• Don't go bankrupt!</li>
                  </ul>
                </div>
              </div>
              <Button onClick={startGame} className="w-full" size="lg">
                Start Your Company Journey
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Company Stats */}
            <div className="grid md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">Cash</span>
                  </div>
                  <div className={`text-2xl font-bold ${gameStats.cash < 0 ? "text-red-600" : "text-green-600"}`}>
                    ₹{gameStats.cash.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Revenue</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">₹{gameStats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">per month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium">Employees</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{gameStats.employees}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium">Market Share</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{gameStats.marketShare}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Month {gameStats.month}/12</span>
                  </div>
                  <Progress value={(gameStats.month / 12) * 100} className="mb-2" />
                  <div className="text-sm text-muted-foreground">
                    Customer Satisfaction: {gameStats.customerSatisfaction}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Event */}
            {currentEvent && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <AlertTriangle className="h-5 w-5" />
                    {currentEvent.title}
                  </CardTitle>
                  <CardDescription className="text-yellow-700">{currentEvent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {currentEvent.choices.map((choice, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto p-4 bg-transparent"
                        onClick={() => handleEvent(choice)}
                        disabled={gameStats.cash < choice.cost}
                      >
                        <div className="text-left">
                          <div className="font-medium">{choice.text}</div>
                          <div className="text-sm text-muted-foreground">Cost: ₹{choice.cost.toLocaleString()}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="investments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="investments" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Available Investments</h2>
                  <Button onClick={nextMonth} disabled={isGameOver}>
                    {isGameOver ? "Game Over" : "Next Month →"}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {investments.map((investment) => (
                    <Card key={investment.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <span>{getCategoryIcon(investment.category)}</span>
                          {investment.name}
                        </CardTitle>
                        <CardDescription>{investment.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Investment Cost:</span>
                          <span className="font-bold">₹{investment.cost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Monthly Return:</span>
                          <span className="font-bold text-green-600">₹{investment.monthlyReturn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Risk Level:</span>
                          <Badge variant="outline" className={getRiskColor(investment.risk)}>
                            {investment.risk}
                          </Badge>
                        </div>
                        <Button
                          onClick={() => makeInvestment(investment)}
                          disabled={gameStats.cash < investment.cost || isGameOver}
                          className="w-full"
                        >
                          {gameStats.cash < investment.cost ? "Insufficient Funds" : "Invest"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company History</CardTitle>
                    <CardDescription>Track your business decisions and outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {gameHistory.map((event, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="text-sm">{event}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Cash Flow</span>
                          <span
                            className={`font-medium ${gameStats.cash > 500000 ? "text-green-600" : gameStats.cash > 100000 ? "text-yellow-600" : "text-red-600"}`}
                          >
                            {gameStats.cash > 500000 ? "Healthy" : gameStats.cash > 100000 ? "Moderate" : "Critical"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Monthly Costs</span>
                          <span className="font-medium">₹{(gameStats.employees * 5000).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Net Profit</span>
                          <span
                            className={`font-medium ${(gameStats.revenue - gameStats.employees * 5000) > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            ₹{(gameStats.revenue - gameStats.employees * 5000).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Market Share</span>
                            <span className="text-sm">{gameStats.marketShare}%</span>
                          </div>
                          <Progress value={gameStats.marketShare} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Customer Satisfaction</span>
                            <span className="text-sm">{gameStats.customerSatisfaction}%</span>
                          </div>
                          <Progress value={gameStats.customerSatisfaction} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Progress to Goal</span>
                            <span className="text-sm">
                              {Math.min(100, Math.round((gameStats.cash / 2000000) * 100))}%
                            </span>
                          </div>
                          <Progress value={Math.min(100, (gameStats.cash / 2000000) * 100)} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {isGameOver && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        {gameStats.cash > 2000000 ? "Congratulations!" : "Game Over"}
                      </h3>
                      <p className="text-green-700 mb-4">
                        {gameStats.cash > 2000000
                          ? `You successfully built a company worth ₹${gameStats.cash.toLocaleString()}!`
                          : `Your company ended with ₹${gameStats.cash.toLocaleString()}. Try again!`}
                      </p>
                      <Button onClick={resetGame}>Play Again</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
