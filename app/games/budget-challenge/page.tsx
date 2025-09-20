"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Coins,
  TrendingUp,
  Home,
  Car,
  ShoppingCart,
  Heart,
  Gamepad2,
  Trophy,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface GameState {
  month: number
  balance: number
  monthlyIncome: number
  expenses: {
    rent: number
    food: number
    transport: number
    utilities: number
    entertainment: number
    savings: number
  }
  emergencyFund: number
  score: number
  gameOver: boolean
  gameWon: boolean
}

interface Scenario {
  id: string
  month: number
  title: string
  description: string
  type: "expense" | "income" | "choice"
  amount?: number
  choices?: {
    id: string
    text: string
    cost: number
    consequence: string
  }[]
}

const scenarios: Scenario[] = [
  {
    id: "festival-shopping",
    month: 2,
    title: "Festival Season",
    description: "Diwali is approaching and you want to buy new clothes and gifts for family.",
    type: "choice",
    choices: [
      {
        id: "expensive",
        text: "Buy expensive clothes and gifts",
        cost: 8000,
        consequence: "Family is very happy, but budget is tight",
      },
      {
        id: "moderate",
        text: "Buy moderate gifts within budget",
        cost: 4000,
        consequence: "Good balance of celebration and savings",
      },
      {
        id: "minimal",
        text: "Celebrate simply with homemade gifts",
        cost: 1500,
        consequence: "Family appreciates thoughtfulness, savings intact",
      },
    ],
  },
  {
    id: "medical-emergency",
    month: 4,
    title: "Medical Emergency",
    description: "Your father needs urgent medical treatment costing ₹15,000.",
    type: "expense",
    amount: 15000,
  },
  {
    id: "bonus",
    month: 6,
    title: "Work Bonus",
    description: "You received a performance bonus at work!",
    type: "income",
    amount: 12000,
  },
  {
    id: "wedding-invitation",
    month: 8,
    title: "Cousin's Wedding",
    description: "Your cousin is getting married and you need to attend the wedding.",
    type: "choice",
    choices: [
      {
        id: "lavish",
        text: "Give expensive gift and new clothes",
        cost: 6000,
        consequence: "Great impression but expensive",
      },
      {
        id: "appropriate",
        text: "Give appropriate gift and wear existing clothes",
        cost: 2500,
        consequence: "Respectful and budget-friendly",
      },
      {
        id: "minimal",
        text: "Attend with minimal expenses",
        cost: 1000,
        consequence: "Family understands your situation",
      },
    ],
  },
  {
    id: "job-opportunity",
    month: 10,
    title: "Job Opportunity",
    description: "You got an offer for a better job, but need to spend on interview preparation.",
    type: "choice",
    choices: [
      {
        id: "invest",
        text: "Invest in courses and preparation",
        cost: 5000,
        consequence: "Higher chance of getting the job",
      },
      {
        id: "basic",
        text: "Basic preparation with free resources",
        cost: 1000,
        consequence: "Good preparation within budget",
      },
      { id: "skip", text: "Skip the opportunity", cost: 0, consequence: "No immediate cost but missed opportunity" },
    ],
  },
]

export default function BudgetChallengePage() {
  const [gameState, setGameState] = useState<GameState>({
    month: 1,
    balance: 50000,
    monthlyIncome: 25000,
    expenses: {
      rent: 8000,
      food: 4000,
      transport: 2000,
      utilities: 1500,
      entertainment: 2000,
      savings: 5000,
    },
    emergencyFund: 0,
    score: 0,
    gameOver: false,
    gameWon: false,
  })

  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [monthlyResult, setMonthlyResult] = useState<string>("")

  useEffect(() => {
    if (gameStarted && !gameState.gameOver) {
      const scenario = scenarios.find((s) => s.month === gameState.month)
      setCurrentScenario(scenario || null)
    }
  }, [gameState.month, gameStarted])

  const startGame = () => {
    setGameStarted(true)
    setGameState({
      month: 1,
      balance: 50000,
      monthlyIncome: 25000,
      expenses: {
        rent: 8000,
        food: 4000,
        transport: 2000,
        utilities: 1500,
        entertainment: 2000,
        savings: 5000,
      },
      emergencyFund: 0,
      score: 0,
      gameOver: false,
      gameWon: false,
    })
  }

  const calculateMonthlyExpenses = () => {
    const { rent, food, transport, utilities, entertainment, savings } = gameState.expenses
    return rent + food + transport + utilities + entertainment + savings
  }

  const processMonth = (scenarioChoice?: { cost: number; consequence: string }) => {
    const totalExpenses = calculateMonthlyExpenses()
    let newBalance = gameState.balance + gameState.monthlyIncome - totalExpenses
    const newEmergencyFund = gameState.emergencyFund + gameState.expenses.savings
    let scoreChange = 0
    let result = ""

    // Handle scenario
    if (currentScenario) {
      if (currentScenario.type === "expense") {
        newBalance -= currentScenario.amount!
        result = `Emergency expense of ₹${currentScenario.amount} handled.`
        scoreChange -= 10
      } else if (currentScenario.type === "income") {
        newBalance += currentScenario.amount!
        result = `Bonus income of ₹${currentScenario.amount} received!`
        scoreChange += 20
      } else if (scenarioChoice) {
        newBalance -= scenarioChoice.cost
        result = scenarioChoice.consequence
        scoreChange += scenarioChoice.cost < 3000 ? 15 : scenarioChoice.cost < 6000 ? 5 : -5
      }
    }

    // Calculate score based on financial health
    if (newBalance > 30000) scoreChange += 10
    if (newEmergencyFund > 20000) scoreChange += 15
    if (newBalance < 10000) scoreChange -= 20

    const newScore = Math.max(0, gameState.score + scoreChange)

    // Check game over conditions
    const gameOver = newBalance < 0 || gameState.month >= 12
    const gameWon = gameState.month >= 12 && newBalance > 0 && newEmergencyFund > 15000

    setGameState((prev) => ({
      ...prev,
      month: prev.month + 1,
      balance: newBalance,
      emergencyFund: newEmergencyFund,
      score: newScore,
      gameOver,
      gameWon,
    }))

    setMonthlyResult(result)
    setCurrentScenario(null)
  }

  const handleScenarioChoice = (choice: { cost: number; consequence: string }) => {
    processMonth(choice)
  }

  const updateExpense = (category: keyof typeof gameState.expenses, value: number) => {
    setGameState((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: value,
      },
    }))
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/games" className="text-primary hover:text-primary/80 font-medium">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Games
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                Budget Challenge
              </h1>
              <p className="text-sm text-muted-foreground">Master personal finance through 12 months of scenarios</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Welcome to Budget Challenge!</CardTitle>
              <CardDescription className="text-lg">
                Can you manage ₹50,000 for 12 months while handling real-life financial scenarios?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <Coins className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Starting Balance</h3>
                  <p className="text-2xl font-bold text-emerald-600">₹50,000</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-2xl font-bold text-blue-600">12 Months</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Goal</h3>
                  <p className="text-lg font-bold text-purple-600">Survive & Save</p>
                </div>
              </div>

              <div className="text-left space-y-4">
                <h3 className="font-semibold text-lg">Game Rules:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Manage your monthly budget of ₹25,000 income</li>
                  <li>• Handle unexpected expenses and opportunities</li>
                  <li>• Make smart choices during festivals and emergencies</li>
                  <li>• Build an emergency fund for financial security</li>
                  <li>• Survive all 12 months without going bankrupt</li>
                </ul>
              </div>

              <Button onClick={startGame} size="lg" className="text-lg px-8">
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState.gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/games" className="text-primary hover:text-primary/80 font-medium">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Games
            </Link>
            <h1 className="text-2xl font-bold">Game Over</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="text-center">
            <CardHeader>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  gameState.gameWon ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {gameState.gameWon ? (
                  <Trophy className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                )}
              </div>
              <CardTitle className="text-3xl">{gameState.gameWon ? "Congratulations!" : "Game Over"}</CardTitle>
              <CardDescription className="text-lg">
                {gameState.gameWon
                  ? "You successfully managed your finances for 12 months!"
                  : "You ran out of money. Better luck next time!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold">Final Balance</h3>
                  <p className={`text-2xl font-bold ${gameState.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ₹{gameState.balance.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold">Emergency Fund</h3>
                  <p className="text-2xl font-bold text-purple-600">₹{gameState.emergencyFund.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold">Final Score</h3>
                  <p className="text-2xl font-bold text-yellow-600">{gameState.score}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What you learned:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                    <h4 className="font-semibold">Budget Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Balancing income and expenses across different categories
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                    <h4 className="font-semibold">Emergency Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Building funds for unexpected expenses and opportunities
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                    <h4 className="font-semibold">Smart Choices</h4>
                    <p className="text-sm text-muted-foreground">
                      Making financial decisions during festivals and life events
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                    <h4 className="font-semibold">Long-term Thinking</h4>
                    <p className="text-sm text-muted-foreground">
                      Planning for the future while managing present needs
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={startGame} size="lg">
                  Play Again
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/games">Back to Games</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/games" className="text-primary hover:text-primary/80 font-medium">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Games
            </Link>
            <div>
              <h1 className="text-xl font-bold">Budget Challenge - Month {gameState.month}</h1>
              <p className="text-sm text-muted-foreground">Score: {gameState.score} points</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">Month {gameState.month}/12</Badge>
            <Badge
              variant={gameState.balance > 20000 ? "default" : gameState.balance > 10000 ? "secondary" : "destructive"}
            >
              ₹{gameState.balance.toLocaleString()}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{gameState.month}/12 months</span>
            </div>
            <Progress value={(gameState.month / 12) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Financial Status */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Financial Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current Balance</span>
                  <span className={`font-bold ${gameState.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ₹{gameState.balance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Emergency Fund</span>
                  <span className="font-bold text-blue-600">₹{gameState.emergencyFund.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Income</span>
                  <span className="font-bold text-green-600">₹{gameState.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Expenses</span>
                  <span className="font-bold text-red-600">₹{calculateMonthlyExpenses().toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {monthlyResult && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{monthlyResult}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Scenario */}
            {currentScenario ? (
              <Card>
                <CardHeader>
                  <CardTitle>{currentScenario.title}</CardTitle>
                  <CardDescription>{currentScenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {currentScenario.type === "choice" && currentScenario.choices ? (
                    <div className="space-y-3">
                      {currentScenario.choices.map((choice) => (
                        <Button
                          key={choice.id}
                          variant="outline"
                          className="w-full text-left h-auto p-4 bg-transparent"
                          onClick={() => handleScenarioChoice({ cost: choice.cost, consequence: choice.consequence })}
                        >
                          <div className="flex justify-between items-start w-full">
                            <div>
                              <div className="font-medium">{choice.text}</div>
                              <div className="text-sm text-muted-foreground mt-1">{choice.consequence}</div>
                            </div>
                            <Badge
                              variant={
                                choice.cost > 5000 ? "destructive" : choice.cost > 2000 ? "secondary" : "default"
                              }
                            >
                              ₹{choice.cost}
                            </Badge>
                          </div>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div
                        className={`text-2xl font-bold ${
                          currentScenario.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {currentScenario.type === "income" ? "+" : "-"}₹{currentScenario.amount?.toLocaleString()}
                      </div>
                      <Button onClick={() => processMonth()}>
                        {currentScenario.type === "income" ? "Receive Money" : "Pay Expense"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Monthly Budget Planning */
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Budget - Month {gameState.month}</CardTitle>
                  <CardDescription>
                    Allocate your ₹{gameState.monthlyIncome.toLocaleString()} monthly income
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4" />
                          <span>Rent</span>
                        </div>
                        <span>₹{gameState.expenses.rent}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Fixed expense</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Food</span>
                        </div>
                        <input
                          type="range"
                          min="2000"
                          max="8000"
                          step="500"
                          value={gameState.expenses.food}
                          onChange={(e) => updateExpense("food", Number.parseInt(e.target.value))}
                          className="w-20"
                        />
                        <span>₹{gameState.expenses.food}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4" />
                          <span>Transport</span>
                        </div>
                        <input
                          type="range"
                          min="1000"
                          max="5000"
                          step="500"
                          value={gameState.expenses.transport}
                          onChange={(e) => updateExpense("transport", Number.parseInt(e.target.value))}
                          className="w-20"
                        />
                        <span>₹{gameState.expenses.transport}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          <span>Entertainment</span>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="5000"
                          step="500"
                          value={gameState.expenses.entertainment}
                          onChange={(e) => updateExpense("entertainment", Number.parseInt(e.target.value))}
                          className="w-20"
                        />
                        <span>₹{gameState.expenses.entertainment}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>Savings</span>
                        </div>
                        <input
                          type="range"
                          min="1000"
                          max="10000"
                          step="500"
                          value={gameState.expenses.savings}
                          onChange={(e) => updateExpense("savings", Number.parseInt(e.target.value))}
                          className="w-20"
                        />
                        <span>₹{gameState.expenses.savings}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Utilities</span>
                        <span>₹{gameState.expenses.utilities}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Fixed expense</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Expenses</span>
                      <span
                        className={
                          calculateMonthlyExpenses() > gameState.monthlyIncome ? "text-red-600" : "text-green-600"
                        }
                      >
                        ₹{calculateMonthlyExpenses().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Remaining</span>
                      <span>₹{(gameState.monthlyIncome - calculateMonthlyExpenses()).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => processMonth()}
                    className="w-full"
                    disabled={calculateMonthlyExpenses() > gameState.monthlyIncome}
                  >
                    {calculateMonthlyExpenses() > gameState.monthlyIncome
                      ? "Budget exceeds income!"
                      : "Confirm Budget & Continue"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
