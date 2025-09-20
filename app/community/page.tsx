"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, MessageCircle, Heart, Share2, Search, Plus, Star, MapPin, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

interface CommunityPost {
  id: string
  author: {
    name: string
    avatar: string
    badge: string
    location: string
    level: string
  }
  content: string
  category: "question" | "success" | "tip" | "discussion"
  timestamp: string
  likes: number
  replies: number
  tags: string[]
  isLiked: boolean
}

interface Mentor {
  id: string
  name: string
  avatar: string
  location: string
  specialization: string[]
  experience: string
  rating: number
  studentsHelped: number
  languages: string[]
  isAvailable: boolean
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")

  const [posts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: {
        name: "Rajesh Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Savings Champion",
        location: "Maharashtra",
        level: "Advanced",
      },
      content:
        "Just completed my festival savings goal! 🎉 Started saving ₹1,500 per month 8 months ago for Diwali. Today I have ₹12,000 saved up! The key was setting up automatic transfers and tracking progress weekly. Anyone else working on festival savings?",
      category: "success",
      timestamp: "2 hours ago",
      likes: 24,
      replies: 8,
      tags: ["savings", "festivals", "goals"],
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Budget Master",
        location: "Karnataka",
        level: "Intermediate",
      },
      content:
        "Need advice on managing irregular income from my tailoring business. Some months I earn ₹8,000, others ₹15,000. How do you budget when income varies so much? Any tips for building emergency fund with irregular income?",
      category: "question",
      timestamp: "4 hours ago",
      likes: 12,
      replies: 15,
      tags: ["budgeting", "irregular-income", "emergency-fund"],
      isLiked: true,
    },
    {
      id: "3",
      author: {
        name: "Anita Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Community Helper",
        location: "Gujarat",
        level: "Expert",
      },
      content:
        "Pro tip: Use the 50-30-20 rule but adapt it for seasonal income. During harvest season, save 40% instead of 20%. During lean months, focus on essentials (70%) and reduce wants (10%). This helped me manage my farm income better.",
      category: "tip",
      timestamp: "1 day ago",
      likes: 45,
      replies: 12,
      tags: ["budgeting", "seasonal-income", "farming"],
      isLiked: true,
    },
  ])

  const [mentors] = useState<Mentor[]>([
    {
      id: "1",
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Rajasthan",
      specialization: ["Savings", "Budgeting", "Rural Finance"],
      experience: "5+ years helping farmers with financial planning",
      rating: 4.9,
      studentsHelped: 127,
      languages: ["Hindi", "English", "Rajasthani"],
      isAvailable: true,
    },
    {
      id: "2",
      name: "Meera Reddy",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Telangana",
      specialization: ["Women's Finance", "Microfinance", "SHG Management"],
      experience: "8+ years in women's financial empowerment",
      rating: 4.8,
      studentsHelped: 203,
      languages: ["Telugu", "Hindi", "English"],
      isAvailable: true,
    },
    {
      id: "3",
      name: "Suresh Kumar",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Punjab",
      specialization: ["Credit", "Loans", "Business Finance"],
      experience: "6+ years in rural banking and credit",
      rating: 4.7,
      studentsHelped: 89,
      languages: ["Punjabi", "Hindi", "English"],
      isAvailable: false,
    },
    {
      id: "4",
      name: "Dr. Kavitha Nair",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Kerala",
      specialization: ["Investment Planning", "Retirement Savings", "Insurance"],
      experience: "12+ years as financial advisor specializing in rural investments",
      rating: 4.9,
      studentsHelped: 345,
      languages: ["Malayalam", "Tamil", "Hindi", "English"],
      isAvailable: true,
    },
    {
      id: "5",
      name: "Ramesh Gupta",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Uttar Pradesh",
      specialization: ["Digital Payments", "Mobile Banking", "Financial Literacy"],
      experience: "7+ years helping rural communities adopt digital finance",
      rating: 4.6,
      studentsHelped: 178,
      languages: ["Hindi", "English", "Bhojpuri"],
      isAvailable: true,
    },
    {
      id: "6",
      name: "Sunita Devi",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Bihar",
      specialization: ["Self-Help Groups", "Community Finance", "Women Empowerment"],
      experience: "10+ years leading SHG initiatives and women's financial programs",
      rating: 4.8,
      studentsHelped: 267,
      languages: ["Hindi", "Maithili", "English"],
      isAvailable: true,
    },
    {
      id: "7",
      name: "Arjun Patel",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Gujarat",
      specialization: ["Small Business Finance", "Entrepreneurship", "Market Analysis"],
      experience: "9+ years supporting rural entrepreneurs and small businesses",
      rating: 4.7,
      studentsHelped: 156,
      languages: ["Gujarati", "Hindi", "English"],
      isAvailable: true,
    },
    {
      id: "8",
      name: "Lakshmi Iyer",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Tamil Nadu",
      specialization: ["Agricultural Finance", "Crop Insurance", "Seasonal Planning"],
      experience: "11+ years in agricultural banking and crop finance solutions",
      rating: 4.9,
      studentsHelped: 298,
      languages: ["Tamil", "Telugu", "Hindi", "English"],
      isAvailable: true,
    },
    {
      id: "9",
      name: "Manish Sharma",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Madhya Pradesh",
      specialization: ["Debt Management", "Credit Repair", "Financial Recovery"],
      experience: "8+ years helping families overcome debt and rebuild credit",
      rating: 4.5,
      studentsHelped: 134,
      languages: ["Hindi", "English"],
      isAvailable: false,
    },
    {
      id: "10",
      name: "Geeta Kumari",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Haryana",
      specialization: ["Family Finance", "Education Planning", "Goal Setting"],
      experience: "6+ years in family financial planning and education savings",
      rating: 4.8,
      studentsHelped: 189,
      languages: ["Hindi", "Punjabi", "English"],
      isAvailable: true,
    },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "question":
        return "bg-blue-100 text-blue-700"
      case "success":
        return "bg-green-100 text-green-700"
      case "tip":
        return "bg-purple-100 text-purple-700"
      case "discussion":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "question":
        return "❓"
      case "success":
        return "🎉"
      case "tip":
        return "💡"
      case "discussion":
        return "💬"
      default:
        return "📝"
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
            <h1 className="text-xl font-semibold">Community</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3 h-3" />
              1,247 members
            </Badge>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
            <TabsTrigger value="groups">Local Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search discussions, questions, tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            {/* Community Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-sm text-muted-foreground">Questions Answered</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Success Stories</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-muted-foreground">Active Mentors</div>
                </CardContent>
              </Card>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{post.author.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {post.author.badge}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {post.author.level}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {post.author.location}
                              <span>•</span>
                              <Calendar className="w-3 h-3" />
                              {post.timestamp}
                            </div>
                          </div>
                        </div>
                        <Badge className={`text-xs ${getCategoryColor(post.category)}`}>
                          {getCategoryIcon(post.category)} {post.category}
                        </Badge>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-3">
                        <p className="text-pretty leading-relaxed">{post.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className={`gap-2 ${post.isLiked ? "text-red-600" : ""}`}>
                            <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="w-4 h-4" />
                            {post.replies}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                          </Button>
                        </div>
                        <Button size="sm" variant="outline">
                          View Discussion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Connect with Financial Mentors</h2>
              <p className="text-muted-foreground">
                Get personalized guidance from experienced community members who understand your local context and
                challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {mentor.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{mentor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Students Helped</span>
                        <span className="font-medium">{mentor.studentsHelped}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Specialization</div>
                      <div className="flex flex-wrap gap-1">
                        {mentor.specialization.map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Languages</div>
                      <div className="flex flex-wrap gap-1">
                        {mentor.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{mentor.experience}</p>

                    <Button
                      className="w-full"
                      disabled={!mentor.isAvailable}
                      variant={mentor.isAvailable ? "default" : "secondary"}
                    >
                      {mentor.isAvailable ? "Connect" : "Unavailable"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="success" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Success Stories</h2>
              <p className="text-muted-foreground">
                Be inspired by real stories from community members who have achieved their financial goals.
              </p>
            </div>

            <div className="grid gap-6">
              {posts
                .filter((post) => post.category === "success")
                .map((post) => (
                  <Card key={post.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-lg">{post.author.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {post.author.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {post.author.location}
                            </div>
                          </div>
                        </div>
                        <p className="text-lg leading-relaxed">{post.content}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-green-200">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-green-700">
                              <Heart className="w-4 h-4 fill-current" />
                              {post.likes}
                            </div>
                            <div className="flex items-center gap-1 text-green-700">
                              <MessageCircle className="w-4 h-4" />
                              {post.replies}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 text-green-700 bg-transparent"
                          >
                            Read Full Story
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Local Groups</h2>
              <p className="text-muted-foreground">
                Join groups in your area to connect with neighbors and learn together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Karnataka Farmers Financial Circle",
                  location: "Karnataka",
                  members: 89,
                  category: "Agriculture",
                  description: "Supporting farmers with seasonal budgeting and crop finance planning",
                },
                {
                  name: "Women Entrepreneurs Network",
                  location: "Bangalore",
                  members: 156,
                  category: "Business",
                  description: "Empowering women with business finance and microenterprise skills",
                },
                {
                  name: "Rural Savings Circle",
                  location: "Mysore District",
                  members: 67,
                  category: "Savings",
                  description: "Building savings habits and emergency funds in rural communities",
                },
              ].map((group, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {group.location}
                      <span>•</span>
                      <Users className="w-3 h-3" />
                      {group.members} members
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Badge variant="secondary" className="w-fit">
                      {group.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                    <Button className="w-full">Join Group</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
