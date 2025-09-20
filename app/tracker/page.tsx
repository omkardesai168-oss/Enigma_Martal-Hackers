"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, TrendingUp, TrendingDown, Target, Wallet, PiggyBank } from "lucide-react"
import Link from "next/link"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: "expense" | "income"
}

interface SavingsGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
}

interface BudgetCategory {
  name: string
  allocated: number
  spent: number
  icon: string
}

export default function FinancialTrackerPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", amount: 500, category: "Food", description: "Grocery shopping", date: "2024-01-15", type: "expense" },
    { id: "2", amount: 25000, category: "Salary", description: "Monthly salary", date: "2024-01-01", type: "income" },
    { id: "3", amount: 1200, category: "Transport", description: "Auto rickshaw", date: "2024-01-14", type: "expense" },
    { id: "4", amount: 800, category: "Healthcare", description: "Medicine", date: "2024-01-13", type: "expense" },
  ])

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      title: "Emergency Fund",
      targetAmount: 50000,
      currentAmount: 15000,
      deadline: "2024-12-31",
      category: "Emergency",
    },
    {
      id: "2",
      title: "Festival Shopping",
      targetAmount: 10000,
      currentAmount: 3500,
      deadline: "2024-10-15",
      category: "Festival",
    },
    {
      id: "3",
      title: "New Phone",
      targetAmount: 20000,
      currentAmount: 8000,
      deadline: "2024-06-30",
      category: "Electronics",
    },
  ])

  const [budgetCategories] = useState<BudgetCategory[]>([
    { name: "Food", allocated: 6000, spent: 4200, icon: "🍽️" },
    { name: "Transport", allocated: 3000, spent: 2100, icon: "🚗" },
    { name: "Healthcare", allocated: 2000, spent: 800, icon: "🏥" },
    { name: "Entertainment", allocated: 2000, spent: 1500, icon: "🎬" },
    { name: "Shopping", allocated: 3000, spent: 2800, icon: "🛍️" },
  ])

  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
    type: "expense" as "expense" | "income",
  })

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
    category: "",
  })

  const totalIncome = expenses.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0)
  const totalExpenses = expenses.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0)
  const netSavings = totalIncome - totalExpenses

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)

  const addExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      const expense: Expense = {
        id: Date.now().toString(),
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: new Date().toISOString().split("T")[0],
        type: newExpense.type,
      }
      setExpenses([expense, ...expenses])
      setNewExpense({ amount: "", category: "", description: "", type: "expense" })
    }
  }

  const addSavingsGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.deadline && newGoal.category) {
      const goal: SavingsGoal = {
        id: Date.now().toString(),
        title: newGoal.title,
        targetAmount: Number.parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        deadline: newGoal.deadline,
        category: newGoal.category,
      }
      setSavingsGoals([...savingsGoals, goal])
      setNewGoal({ title: "", targetAmount: "", deadline: "", category: "" })
    }
  }

  const expensesByCategory = expenses
    .filter((e) => e.type === "expense")
    .reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const pieChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    percentage: Math.round((amount / totalExpenses) * 100),
  }))

  const monthlyData = [
    { month: "Oct", income: 22000, expenses: 18000, savings: 4000 },
    { month: "Nov", income: 24000, expenses: 19500, savings: 4500 },
    { month: "Dec", income: 26000, expenses: 21000, savings: 5000 },
    { month: "Jan", income: totalIncome, expenses: totalExpenses, savings: netSavings },
  ]

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-primary hover:text-primary/80 font-medium">
              ← Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Financial Tracker</h1>
              <p className="text-sm text-muted-foreground">Manage your money, track expenses, and achieve goals</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Financial Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Income</span>
              </div>
              <div className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium">Expenses</span>
              </div>
              <div className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Net Savings</span>
              </div>
              <div className={`text-2xl font-bold ${netSavings > 0 ? "text-blue-600" : "text-red-600"}`}>
                ₹{netSavings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Budget Used</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{Math.round((totalSpent / totalBudget) * 100)}%</div>
              <p className="text-xs text-muted-foreground">Of monthly budget</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="goals">Savings Goals</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            {/* Add New Expense */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Add Transaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newExpense.type}
                      onValueChange={(value: "expense" | "income") => setNewExpense({ ...newExpense, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="₹0"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Transport">Transport</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="What was this for?"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addExpense} className="w-full">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenses.slice(0, 10).map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            expense.type === "income" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {expense.type === "income" ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {expense.category} • {expense.date}
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold ${expense.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {expense.type === "income" ? "+" : "-"}₹{expense.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>Your spending by category this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {pieChartData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{entry.name}</span>
                        <span className="text-sm font-medium ml-auto">{entry.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Income vs expenses over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
                        <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                        <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Savings" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Budget Overview</CardTitle>
                <CardDescription>Track your spending against your budget categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgetCategories.map((category) => {
                    const percentage = (category.spent / category.allocated) * 100
                    const isOverBudget = percentage > 100

                    return (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              ₹{category.spent.toLocaleString()} / ₹{category.allocated.toLocaleString()}
                            </div>
                            <div className={`text-sm ${isOverBudget ? "text-red-600" : "text-muted-foreground"}`}>
                              {Math.round(percentage)}% used
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={Math.min(percentage, 100)}
                          className={`h-2 ${isOverBudget ? "[&>div]:bg-red-500" : ""}`}
                        />
                        {isOverBudget && (
                          <p className="text-sm text-red-600">
                            ⚠️ Over budget by ₹{(category.spent - category.allocated).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            {/* Add New Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Create Savings Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="goalTitle">Goal Title</Label>
                    <Input
                      id="goalTitle"
                      placeholder="e.g., Emergency Fund"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAmount">Target Amount</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="₹0"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addSavingsGoal} className="w-full">
                      Create Goal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Goals */}
            <div className="grid md:grid-cols-2 gap-6">
              {savingsGoals.map((goal) => {
                const percentage = (goal.currentAmount / goal.targetAmount) * 100
                const remaining = goal.targetAmount - goal.currentAmount

                return (
                  <Card key={goal.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{Math.round(percentage)}%</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>₹{goal.currentAmount.toLocaleString()}</span>
                          <span>₹{goal.targetAmount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Remaining</p>
                          <p className="font-bold text-primary">₹{remaining.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium">{new Date(goal.deadline).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Your financial performance over the last 4 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]} />
                      <Legend />
                      <Bar dataKey="income" fill="#10b981" name="Income" />
                      <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                      <Bar dataKey="savings" fill="#3b82f6" name="Savings" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Spending Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Top spending category</span>
                      <Badge>Food - ₹4,200</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average daily spending</span>
                      <span className="font-medium">₹{Math.round(totalExpenses / 30).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings rate</span>
                      <span className="font-medium text-green-600">
                        {Math.round((netSavings / totalIncome) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Financial Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergency fund status</span>
                      <Badge variant="outline" className="text-yellow-600">
                        Building
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Budget adherence</span>
                      <span className="font-medium text-green-600">Good</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings goals on track</span>
                      <span className="font-medium">2 of 3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Increase Emergency Fund</p>
                      <p className="text-sm text-muted-foreground">
                        Try to save ₹2,000 more monthly to reach your emergency fund goal faster.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Great Budget Control</p>
                      <p className="text-sm text-muted-foreground">
                        You're staying within budget in most categories. Keep it up!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Review Shopping Expenses</p>
                      <p className="text-sm text-muted-foreground">
                        Your shopping expenses are close to budget limit. Consider reviewing non-essential purchases.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
