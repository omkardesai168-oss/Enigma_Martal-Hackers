"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Lock } from "lucide-react"

interface JourneyStage {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  status: "completed" | "current" | "locked"
  lessons: number
  completedLessons: number
}

interface JourneyProgressProps {
  stages: JourneyStage[]
  compact?: boolean
}

export function JourneyProgress({ stages, compact = false }: JourneyProgressProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center gap-2 min-w-fit">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                stage.status === "completed"
                  ? "bg-primary text-primary-foreground"
                  : stage.status === "current"
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {stage.status === "completed" && <CheckCircle className="w-4 h-4" />}
              {stage.status === "current" && <Circle className="w-4 h-4" />}
              {stage.status === "locked" && <Lock className="w-4 h-4" />}
            </div>
            <span className="text-sm font-medium min-w-fit">{stage.title}</span>
            {index < stages.length - 1 && (
              <div className={`w-8 h-0.5 ${stage.status === "completed" ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {stages.map((stage) => (
        <Card key={stage.id} className={`${stage.status === "current" ? "ring-2 ring-primary/20" : ""}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{stage.icon}</div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {stage.title}
                    {stage.status === "completed" && <CheckCircle className="w-4 h-4 text-primary" />}
                    {stage.status === "current" && <Circle className="w-4 h-4 text-primary" />}
                    {stage.status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </div>
              <Badge variant={stage.status === "current" ? "default" : "secondary"}>
                {stage.completedLessons}/{stage.lessons}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{stage.progress}%</span>
              </div>
              <Progress value={stage.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
