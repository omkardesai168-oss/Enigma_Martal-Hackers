"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Coins,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Target,
  HelpCircle,
  Volume2,
  BookOpen,
  Users,
  Home,
  Tractor,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"

interface Position {
  x: number
  y: number
}

interface LoanOffer {
  id: string
  amount: number
  interest: number
  term: number
  description: string
  hindiDescription: string
  purpose: string
  hindiPurpose: string
  riskLevel: "low" | "medium" | "high"
  monthlyPayment: number
  icon: React.ReactNode
}

interface GameState {
  playerPos: Position
  trustPoints: number
  money: number
  currentLoan: LoanOffer | null
  repaymentDue: number
  daysLeft: number
  level: number
  gameOver: boolean
  won: boolean
  shortcuts: Position[]
  bonuses: Position[]
  penalties: Position[]
  completedTutorial: boolean
  hintsUsed: number
}

const MAZE_SIZE = 12
const INITIAL_TRUST = 100
const INITIAL_MONEY = 10000

// Enhanced maze layout with more educational elements
const MAZE_LAYOUT = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 2, 1, 0, 0, 6, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 2, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 6, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 6, 0, 0, 1, 2, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 3, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// Rural-focused loan offers with visual icons and Hindi support
const LOAN_OFFERS: LoanOffer[] = [
  {
    id: "crop",
    amount: 15000,
    interest: 8,
    term: 6,
    description: "Crop Loan - For seeds, fertilizers, and farming needs",
    hindiDescription: "फसल ऋण - बीज, खाद और खेती की जरूरतों के लिए",
    purpose: "Agriculture & Farming",
    hindiPurpose: "कृषि और खेती",
    riskLevel: "low",
    monthlyPayment: 2700,
    icon: <Tractor className="w-5 h-5 text-green-600" />,
  },
  {
    id: "home",
    amount: 50000,
    interest: 12,
    term: 24,
    description: "Home Improvement Loan - For house repairs and upgrades",
    hindiDescription: "घर सुधार ऋण - घर की मरम्मत और सुधार के लिए",
    purpose: "Home & Family",
    hindiPurpose: "घर और परिवार",
    riskLevel: "medium",
    monthlyPayment: 2500,
    icon: <Home className="w-5 h-5 text-blue-600" />,
  },
  {
    id: "business",
    amount: 25000,
    interest: 15,
    term: 12,
    description: "Small Business Loan - For shop, equipment, or trade",
    hindiDescription: "छोटा व्यापार ऋण - दुकान, उपकरण या व्यापार के लिए",
    purpose: "Business & Trade",
    hindiPurpose: "व्यापार और धंधा",
    riskLevel: "medium",
    monthlyPayment: 2400,
    icon: <ShoppingCart className="w-5 h-5 text-purple-600" />,
  },
  {
    id: "emergency",
    amount: 8000,
    interest: 20,
    term: 3,
    description: "Emergency Loan - Quick money for urgent needs",
    hindiDescription: "आपातकालीन ऋण - तुरंत जरूरत के लिए पैसा",
    purpose: "Emergency & Health",
    hindiPurpose: "आपातकाल और स्वास्थ्य",
    riskLevel: "high",
    monthlyPayment: 3200,
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
  },
]

export default function LoanLabyrinthGame() {
  const [gameState, setGameState] = useState<GameState>({
    playerPos: { x: 1, y: 1 },
    trustPoints: INITIAL_TRUST,
    money: INITIAL_MONEY,
    currentLoan: null,
    repaymentDue: 0,
    daysLeft: 0,
    level: 1,
    gameOver: false,
    won: false,
    shortcuts: [],
    bonuses: [],
    penalties: [],
    completedTutorial: false,
    hintsUsed: 0,
  })

  const [selectedLoan, setSelectedLoan] = useState<LoanOffer | null>(null)
  const [showLoanModal, setShowLoanModal] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [gameMessage, setGameMessage] = useState("")
  const [userLanguage, setUserLanguage] = useState<string>("en")
  const [currentHint, setCurrentHint] = useState("")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"
    setUserLanguage(savedLanguage)

    const tutorialCompleted = localStorage.getItem("loanLabyrinthTutorial")
    if (tutorialCompleted) {
      setShowTutorial(false)
      setGameState((prev) => ({ ...prev, completedTutorial: true }))
    }
  }, [])

  const movePlayer = useCallback(
    (direction: string) => {
      if (gameState.gameOver || showTutorial) return

      setGameState((prev) => {
        const newPos = { ...prev.playerPos }

        switch (direction) {
          case "up":
            newPos.y = Math.max(0, newPos.y - 1)
            break
          case "down":
            newPos.y = Math.min(MAZE_SIZE - 1, newPos.y + 1)
            break
          case "left":
            newPos.x = Math.max(0, newPos.x - 1)
            break
          case "right":
            newPos.x = Math.min(MAZE_SIZE - 1, newPos.x + 1)
            break
        }

        if (MAZE_LAYOUT[newPos.y][newPos.x] === 1) {
          return prev
        }

        const cellType = MAZE_LAYOUT[newPos.y][newPos.x]
        const newState = { ...prev, playerPos: newPos }

        switch (cellType) {
          case 2: // Loan offer
            setShowLoanModal(true)
            const messages = {
              en: "Loan opportunity available! Choose carefully.",
              hi: "ऋण का अवसर उपलब्ध है! सोच-समझकर चुनें।",
            }
            setGameMessage(messages[userLanguage as keyof typeof messages] || messages.en)
            break
          case 3: // Goal
            if (prev.currentLoan && prev.repaymentDue > 0) {
              const messages = {
                en: "Complete your loan repayment first!",
                hi: "पहले अपना ऋण चुकाएं!",
              }
              setGameMessage(messages[userLanguage as keyof typeof messages] || messages.en)
            } else {
              newState.won = true
              newState.gameOver = true
              const messages = {
                en: "Congratulations! You've mastered loan management!",
                hi: "बधाई हो! आपने ऋण प्रबंधन में महारत हासिल की!",
              }
              setGameMessage(messages[userLanguage as keyof typeof messages] || messages.en)
            }
            break
          case 6: // Education point
            setShowEducationModal(true)
            const eduMessages = {
              en: "Financial education point! Learn something new.",
              hi: "वित्तीय शिक्षा बिंदु! कुछ नया सीखें।",
            }
            setGameMessage(eduMessages[userLanguage as keyof typeof eduMessages] || eduMessages.en)
            break
        }

        return newState
      })
    },
    [gameState.gameOver, showTutorial, userLanguage],
  )

  const takeLoan = (loan: LoanOffer) => {
    setGameState((prev) => ({
      ...prev,
      currentLoan: loan,
      money: prev.money + loan.amount,
      repaymentDue: loan.amount + (loan.amount * loan.interest) / 100,
      daysLeft: loan.term * 30,
    }))
    setShowLoanModal(false)

    const messages = {
      en: `Loan approved! ₹${loan.amount.toLocaleString()} added. Monthly payment: ₹${loan.monthlyPayment}`,
      hi: `ऋण स्वीकृत! ₹${loan.amount.toLocaleString()} जोड़ा गया। मासिक भुगतान: ₹${loan.monthlyPayment}`,
    }
    setGameMessage(messages[userLanguage as keyof typeof messages] || messages.en)
  }

  const makeRepayment = () => {
    if (!gameState.currentLoan || gameState.money < gameState.repaymentDue) {
      const messages = {
        en: "Not enough money for repayment! Try earning more first.",
        hi: "भुगतान के लिए पर्याप्त पैसा नहीं है! पहले और कमाने की कोशिश करें।",
      }
      setGameMessage(messages[userLanguage as keyof typeof messages] || messages.en)
      return
    }

    setGameState((prev) => {
      const trustBonus = prev.daysLeft > prev.currentLoan!.term * 20 ? 30 : 20 // Early payment bonus
      const newState = {
        ...prev,
        money: prev.money - prev.repaymentDue,
        currentLoan: null,
        repaymentDue: 0,
        daysLeft: 0,
        trustPoints: Math.min(100, prev.trustPoints + trustBonus),
        shortcuts: [...prev.shortcuts, { x: 4, y: 4 }, { x: 7, y: 6 }, { x: 9, y: 8 }],
        bonuses: [...prev.bonuses, { x: 2, y: 5 }, { x: 6, y: 3 }, { x: 8, y: 7 }],
      }
      return newState
    })

    const messages = {
      en: "Excellent! Loan repaid successfully. Trust increased and new paths unlocked!",
      hi: "बहुत बढ़िया! ऋण सफलतापूर्वक चुकाया गया। विश्वास बढ़ा और नए रास्ते खुले!",
    }
    setGameMessage(messages[userLanguage as keyof typeof messages] || messages.en)
  }

  const getHint = () => {
    const hints = {
      en: [
        "Look for green paths - they're safer loan options!",
        "Red loans have high interest. Only take them for real emergencies.",
        "Pay loans early to build trust and unlock shortcuts.",
        "Education points (books) teach you valuable financial lessons.",
        "Your trust score affects future loan offers.",
      ],
      hi: [
        "हरे रास्ते देखें - वे सुरक्षित ऋण विकल्प हैं!",
        "लाल ऋणों में अधिक ब्याज है। केवल वास्तविक आपातकाल के लिए लें।",
        "विश्वास बनाने और शॉर्टकट खोलने के लिए ऋण जल्दी चुकाएं।",
        "शिक्षा बिंदु (किताबें) आपको मूल्यवान वित्तीय सबक सिखाते हैं।",
        "आपका विश्वास स्कोर भविष्य के ऋण प्रस्तावों को प्रभावित करता है।",
      ],
    }

    const languageHints = hints[userLanguage as keyof typeof hints] || hints.en
    const randomHint = languageHints[Math.floor(Math.random() * languageHints.length)]
    setCurrentHint(randomHint)
    setGameState((prev) => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }))
  }

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = userLanguage === "hi" ? "hi-IN" : "en-US"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const resetGame = () => {
    setGameState({
      playerPos: { x: 1, y: 1 },
      trustPoints: INITIAL_TRUST,
      money: INITIAL_MONEY,
      currentLoan: null,
      repaymentDue: 0,
      daysLeft: 0,
      level: 1,
      gameOver: false,
      won: false,
      shortcuts: [],
      bonuses: [],
      penalties: [],
      completedTutorial: true,
      hintsUsed: 0,
    })
    setGameMessage("")
    setShowLoanModal(false)
    setCurrentHint("")
  }

  const completeTutorial = () => {
    setShowTutorial(false)
    setGameState((prev) => ({ ...prev, completedTutorial: true }))
    localStorage.setItem("loanLabyrinthTutorial", "completed")
  }

  const getCellContent = (x: number, y: number) => {
    if (gameState.playerPos.x === x && gameState.playerPos.y === y) {
      return (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <Users className="w-4 h-4 text-white" />
        </div>
      )
    }

    const cellType = MAZE_LAYOUT[y][x]
    switch (cellType) {
      case 1: // Wall
        return <div className="w-full h-full bg-gray-800 rounded-sm"></div>
      case 2: // Loan offer
        return <Coins className="w-6 h-6 text-yellow-500 animate-bounce" />
      case 3: // Goal
        return <Trophy className="w-6 h-6 text-yellow-600 animate-pulse" />
      case 6: // Education point
        return <BookOpen className="w-6 h-6 text-blue-500 animate-pulse" />
      default:
        return null
    }
  }

  const uiText = {
    en: {
      title: "Loan Labyrinth",
      subtitle: "Learn smart borrowing for rural life",
      backToGames: "← Back to Games",
      gameStats: "Game Stats",
      trustPoints: "Trust Points",
      money: "Money",
      level: "Level",
      activeLoan: "Active Loan",
      repaymentDue: "Amount Due",
      daysLeft: "Days Left",
      repayNow: "Pay Now",
      skipPayment: "Skip Payment",
      controls: "Controls",
      maze: "Village Path",
      mazeDesc: "Navigate to success while managing loans wisely",
      loanOffer: "Loan Offer",
      goal: "Success",
      education: "Learn",
      shortcut: "Fast Path",
      playAgain: "Play Again",
      getHint: "Get Hint",
      tutorial: "Tutorial",
    },
    hi: {
      title: "ऋण भूलभुलैया",
      subtitle: "ग्रामीण जीवन के लिए स्मार्ट उधार सीखें",
      backToGames: "← खेलों पर वापस",
      gameStats: "खेल आंकड़े",
      trustPoints: "विश्वास अंक",
      money: "पैसा",
      level: "स्तर",
      activeLoan: "सक्रिय ऋण",
      repaymentDue: "देय राशि",
      daysLeft: "बचे दिन",
      repayNow: "अभी भुगतान करें",
      skipPayment: "भुगतान छोड़ें",
      controls: "नियंत्रण",
      maze: "गांव का रास्ता",
      mazeDesc: "ऋण को समझदारी से प्रबंधित करते हुए सफलता की ओर बढ़ें",
      loanOffer: "ऋण प्रस्ताव",
      goal: "सफलता",
      education: "सीखें",
      shortcut: "तेज़ रास्ता",
      playAgain: "फिर से खेलें",
      getHint: "सुझाव लें",
      tutorial: "ट्यूटोरियल",
    },
  }

  const currentText = uiText[userLanguage as keyof typeof uiText] || uiText.en

  return (
    <div className="min-h-screen bg-background">
      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-6 w-6" />
                {userLanguage === "hi" ? "खेल कैसे खेलें" : "How to Play"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    {userLanguage === "hi" ? "ऋण प्रस्ताव" : "Loan Offers"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {userLanguage === "hi"
                      ? "सोने के सिक्के ऋण के अवसर दिखाते हैं। सावधानी से चुनें!"
                      : "Gold coins show loan opportunities. Choose carefully!"}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    {userLanguage === "hi" ? "शिक्षा बिंदु" : "Education Points"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {userLanguage === "hi"
                      ? "किताबें वित्तीय ज्ञान सिखाती हैं। इन्हें इकट्ठा करें!"
                      : "Books teach financial knowledge. Collect them!"}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  {userLanguage === "hi" ? "महत्वपूर्ण सुझाव:" : "Important Tips:"}
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>
                    • {userLanguage === "hi" ? "समय पर भुगतान करें विश्वास बढ़ाने के लिए" : "Pay on time to build trust"}
                  </li>
                  <li>• {userLanguage === "hi" ? "केवल जरूरत के लिए ऋण लें" : "Only borrow what you need"}</li>
                  <li>• {userLanguage === "hi" ? "ब्याज दरों की तुलना करें" : "Compare interest rates"}</li>
                </ul>
              </div>

              <Button onClick={completeTutorial} className="w-full">
                {userLanguage === "hi" ? "खेल शुरू करें" : "Start Playing"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/games" className="text-primary hover:text-primary/80 font-medium">
              {currentText.backToGames}
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Target className="h-6 w-6" />
                {currentText.title}
              </h1>
              <p className="text-sm text-muted-foreground">{currentText.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={getHint}>
              <HelpCircle className="w-4 h-4 mr-1" />
              {currentText.getHint}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowTutorial(true)}>
              {currentText.tutorial}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{currentText.gameStats}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{currentText.trustPoints}</span>
                    <Badge
                      variant={
                        gameState.trustPoints > 70
                          ? "default"
                          : gameState.trustPoints > 30
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {gameState.trustPoints}/100
                    </Badge>
                  </div>
                  <Progress value={gameState.trustPoints} className="h-3" />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{currentText.money}</span>
                  <span className="font-bold text-green-600 text-lg">₹{gameState.money.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{currentText.level}</span>
                  <Badge variant="outline">{gameState.level}</Badge>
                </div>

                {gameState.hintsUsed > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{userLanguage === "hi" ? "सुझाव उपयोग" : "Hints Used"}</span>
                    <Badge variant="secondary">{gameState.hintsUsed}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Hint */}
            {currentHint && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                    {userLanguage === "hi" ? "सुझाव" : "Hint"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-800">{currentHint}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakMessage(currentHint)}
                    className="mt-2 p-0 h-auto text-blue-600"
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    {userLanguage === "hi" ? "सुनें" : "Listen"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Current Loan Info */}
            {gameState.currentLoan && (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    {currentText.activeLoan}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {gameState.currentLoan.icon}
                    <div className="text-sm">
                      <div className="font-medium">
                        {userLanguage === "hi"
                          ? gameState.currentLoan.hindiDescription
                          : gameState.currentLoan.description}
                      </div>
                      <div className="text-muted-foreground">
                        {userLanguage === "hi" ? "राशि" : "Amount"}: ₹{gameState.currentLoan.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{currentText.repaymentDue}</span>
                      <span className="font-bold text-red-600">₹{gameState.repaymentDue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{currentText.daysLeft}</span>
                      <span className={`font-bold ${gameState.daysLeft < 30 ? "text-red-600" : "text-orange-600"}`}>
                        {gameState.daysLeft}
                      </span>
                    </div>
                    <Progress value={(gameState.daysLeft / (gameState.currentLoan.term * 30)) * 100} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={makeRepayment}
                      size="sm"
                      className="flex-1"
                      disabled={gameState.money < gameState.repaymentDue}
                    >
                      {currentText.repayNow}
                    </Button>
                    <Button onClick={() => {}} size="sm" variant="outline" className="flex-1">
                      {currentText.skipPayment}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{currentText.controls}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div></div>
                  <Button variant="outline" size="sm" onClick={() => movePlayer("up")}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button variant="outline" size="sm" onClick={() => movePlayer("left")}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button variant="outline" size="sm" onClick={() => movePlayer("right")}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button variant="outline" size="sm" onClick={() => movePlayer("down")}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <div></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {userLanguage === "hi" ? "तीर कुंजी या WASD का उपयोग करके चलें" : "Use arrow keys or WASD to move"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{currentText.maze}</CardTitle>
                <CardDescription>{currentText.mazeDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-1 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  {MAZE_LAYOUT.map((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className="w-8 h-8 flex items-center justify-center border border-green-200 bg-white rounded-sm"
                      >
                        {getCellContent(x, y)}
                      </div>
                    )),
                  )}
                </div>

                {/* Enhanced Legend */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span>{currentText.loanOffer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span>{currentText.goal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>{currentText.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{userLanguage === "hi" ? "आप" : "You"}</span>
                  </div>
                </div>

                {/* Game Message */}
                {gameMessage && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-blue-800">{gameMessage}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakMessage(gameMessage)}
                        className="p-1 h-auto"
                      >
                        <Volume2 className="w-4 h-4 text-blue-600" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Game Over/Win Screen */}
                {gameState.gameOver && (
                  <div className="mt-4 p-4 bg-gray-50 border rounded-lg text-center">
                    {gameState.won ? (
                      <div className="space-y-2">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <h3 className="text-lg font-bold text-green-700">
                          {userLanguage === "hi" ? "बधाई हो!" : "Congratulations!"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {userLanguage === "hi"
                            ? "आपने ऋण प्रबंधन में सफलता पाई है!"
                            : "You've successfully mastered loan management!"}
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          {userLanguage === "hi" ? "सुझाव उपयोग" : "Hints used"}: {gameState.hintsUsed}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
                        <h3 className="text-lg font-bold text-red-700">
                          {userLanguage === "hi" ? "खेल समाप्त" : "Game Over"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {userLanguage === "hi"
                            ? "आपके विश्वास अंक शून्य हो गए। अगली बार बेहतर ऋण प्रबंधन करें!"
                            : "Your trust points reached zero. Better loan management next time!"}
                        </p>
                      </div>
                    )}
                    <Button onClick={resetGame} className="mt-4">
                      {currentText.playAgain}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Loan Modal */}
        {showLoanModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>{userLanguage === "hi" ? "उपलब्ध ऋण विकल्प" : "Available Loan Options"}</CardTitle>
                <CardDescription>
                  {userLanguage === "hi"
                    ? "सावधानी से चुनें - आपके विश्वास अंक इस पर निर्भर करते हैं!"
                    : "Choose wisely - your trust points depend on it!"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {LOAN_OFFERS.map((loan) => (
                  <div
                    key={loan.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedLoan?.id === loan.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50 hover:shadow-sm"
                    }`}
                    onClick={() => setSelectedLoan(loan)}
                  >
                    <div className="flex items-start gap-3">
                      {loan.icon}
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {userLanguage === "hi" ? loan.hindiDescription : loan.description}
                          <Badge
                            variant={
                              loan.riskLevel === "low"
                                ? "default"
                                : loan.riskLevel === "medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {loan.riskLevel === "low"
                              ? userLanguage === "hi"
                                ? "कम जोखिम"
                                : "Low Risk"
                              : loan.riskLevel === "medium"
                                ? userLanguage === "hi"
                                  ? "मध्यम जोखिम"
                                  : "Medium Risk"
                                : userLanguage === "hi"
                                  ? "उच्च जोखिम"
                                  : "High Risk"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {userLanguage === "hi" ? loan.hindiPurpose : loan.purpose}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">{userLanguage === "hi" ? "राशि:" : "Amount:"}</span>
                            <span className="font-medium ml-1">₹{loan.amount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              {userLanguage === "hi" ? "ब्याज:" : "Interest:"}
                            </span>
                            <span className="font-medium ml-1">{loan.interest}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{userLanguage === "hi" ? "अवधि:" : "Term:"}</span>
                            <span className="font-medium ml-1">
                              {loan.term} {userLanguage === "hi" ? "महीने" : "months"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              {userLanguage === "hi" ? "मासिक:" : "Monthly:"}
                            </span>
                            <span className="font-medium ml-1">₹{loan.monthlyPayment.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-red-600 mt-2">
                          {userLanguage === "hi" ? "कुल भुगतान:" : "Total Repayment:"} ₹
                          {(loan.amount + (loan.amount * loan.interest) / 100).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => selectedLoan && takeLoan(selectedLoan)}
                    disabled={!selectedLoan}
                    className="flex-1"
                  >
                    {userLanguage === "hi" ? "ऋण लें" : "Take Loan"}
                  </Button>
                  <Button onClick={() => setShowLoanModal(false)} variant="outline" className="flex-1">
                    {userLanguage === "hi" ? "मना करें" : "Decline"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Education Modal */}
        {showEducationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-lg mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                  {userLanguage === "hi" ? "वित्तीय शिक्षा" : "Financial Education"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {userLanguage === "hi" ? "आज का सबक:" : "Today's Lesson:"}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {userLanguage === "hi"
                      ? "समय पर ऋण चुकाना आपकी साख बढ़ाता है और भविष्य में बेहतर ऋण दरें मिलती हैं। यह आपके परिवार की वित्तीय सुरक्षा के लिए महत्वपूर्ण है।"
                      : "Paying loans on time builds your credit score and helps you get better loan rates in the future. This is crucial for your family's financial security."}
                  </p>
                </div>
                <Button onClick={() => setShowEducationModal(false)} className="w-full">
                  {userLanguage === "hi" ? "समझ गया" : "Got It"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
