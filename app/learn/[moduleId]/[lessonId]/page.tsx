"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, ArrowRight, ArrowLeft, BookOpen, Target } from "lucide-react"
import Link from "next/link"

export default function LessonPage({ params }: { params: { moduleId: string; lessonId: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)

  // Mock lesson data - in real app this would come from API/database
  const lesson = {
    id: "festival-savings",
    title: "Festival Savings Challenge",
    description: "Plan and save for upcoming festivals and celebrations",
    type: "scenario",
    duration: "12 min",
    points: 100,
    steps: [
      {
        type: "intro",
        title: "Festival Season is Coming!",
        content:
          "Diwali is just 6 months away, and you want to celebrate properly with your family. You need to buy new clothes, gifts, sweets, and decorations. Let's learn how to save for this important celebration.",
        image: "/indian-festival-celebration-diwali-lights.jpg",
      },
      {
        type: "scenario",
        title: "Your Current Situation",
        content:
          "You earn ₹15,000 per month from your small business. Your monthly expenses are ₹12,000. You want to spend ₹8,000 on Diwali celebrations. How much should you save each month?",
        options: [
          { id: "a", text: "₹1,000 per month", correct: false },
          { id: "b", text: "₹1,333 per month", correct: true },
          { id: "c", text: "₹2,000 per month", correct: false },
          { id: "d", text: "₹500 per month", correct: false },
        ],
      },
      {
        type: "explanation",
        title: "Great Choice!",
        content:
          "You're right! To save ₹8,000 in 6 months, you need to save ₹1,333 per month. This leaves you with ₹1,667 from your surplus of ₹3,000 for other savings or unexpected expenses.",
        tips: [
          "Set up automatic transfers to a separate festival savings account",
          "Track your progress monthly to stay motivated",
          "Consider earning extra income during festival season",
        ],
      },
      {
        type: "interactive",
        title: "Create Your Savings Plan",
        content: "Now let's create a practical savings plan. What's the best strategy for you?",
        options: [
          { id: "a", text: "Save ₹1,333 on the 1st of every month", correct: true },
          { id: "b", text: "Save ₹333 every week", correct: true },
          { id: "c", text: "Save ₹44 every day", correct: true },
          { id: "d", text: "Save everything in the last month", correct: false },
        ],
      },
    ],
  }

  const currentStepData = lesson.steps[currentStep]
  const isLastStep = currentStep === lesson.steps.length - 1

  const handleNext = () => {
    if (currentStepData.type === "scenario" || currentStepData.type === "interactive") {
      setShowResult(true)
      setTimeout(() => {
        setShowResult(false)
        setSelectedAnswer("")
        if (!isLastStep) {
          setCurrentStep(currentStep + 1)
        }
      }, 2000)
    } else {
      if (!isLastStep) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowResult(false)
      setSelectedAnswer("")
    }
  }

  const progressPercentage = ((currentStep + 1) / lesson.steps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/learn" className="text-muted-foreground hover:text-foreground">
                ← Back to Lessons
              </Link>
              <div className="h-4 w-px bg-border" />
              <div>
                <h1 className="font-semibold">{lesson.title}</h1>
                <p className="text-sm text-muted-foreground">{lesson.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{lesson.type}</Badge>
              <Badge variant="outline">{lesson.duration}</Badge>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="min-h-[500px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
              <Badge variant="outline">
                Step {currentStep + 1} of {lesson.steps.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content based on step type */}
            {currentStepData.type === "intro" && (
              <div className="space-y-6">
                <div className="text-center">
                  <img
                    src={currentStepData.image || "/placeholder.svg"}
                    alt="Festival celebration"
                    className="mx-auto rounded-lg shadow-lg max-w-md w-full"
                  />
                </div>
                <p className="text-lg leading-relaxed text-center">{currentStepData.content}</p>
              </div>
            )}

            {(currentStepData.type === "scenario" || currentStepData.type === "interactive") && (
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">{currentStepData.content}</p>

                {!showResult && (
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    <div className="space-y-3">
                      {currentStepData.options?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {showResult && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span className="font-medium">Excellent!</span>
                      </div>
                      <p className="text-sm">You've made a great choice. Moving to the next step...</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {currentStepData.type === "explanation" && (
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">{currentStepData.content}</p>

                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Pro Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentStepData.tips?.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>
                  {currentStep + 1} of {lesson.steps.length}
                </span>
              </div>

              <Button
                onClick={handleNext}
                disabled={
                  (currentStepData.type === "scenario" || currentStepData.type === "interactive") &&
                  !selectedAnswer &&
                  !showResult
                }
              >
                {isLastStep ? "Complete Lesson" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lesson completion card */}
        {isLastStep && currentStep === lesson.steps.length - 1 && (
          <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lesson Complete!</h3>
                  <p className="text-muted-foreground">
                    You've earned {lesson.points} points and learned valuable festival savings strategies.
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/learn">
                    <Button variant="outline">Back to Lessons</Button>
                  </Link>
                  <Button>Next Lesson</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
