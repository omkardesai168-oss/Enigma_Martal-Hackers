"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, MapPin, Calendar, Send } from "lucide-react"
import Link from "next/link"

interface Reply {
  id: string
  author: {
    name: string
    avatar: string
    badge: string
    location: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [newReply, setNewReply] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  // Mock post data - in real app this would come from API
  const post = {
    id: params.id,
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
    isLiked: false,
  }

  const [replies] = useState<Reply[]>([
    {
      id: "1",
      author: {
        name: "Vikram Singh",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Financial Mentor",
        location: "Rajasthan",
      },
      content:
        "Great question! For irregular income, I recommend the 'percentage-based' budgeting approach. Instead of fixed amounts, allocate percentages: 50% for needs, 30% for wants, 20% for savings. In good months, you save more; in lean months, you still maintain the habit. Also, create a 'income smoothing' account - save extra from good months to supplement lean months.",
      timestamp: "3 hours ago",
      likes: 8,
      isLiked: true,
    },
    {
      id: "2",
      author: {
        name: "Anita Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Community Helper",
        location: "Gujarat",
      },
      content:
        "I had the same challenge with my farming income! What helped me was tracking my income for 6 months to find the average. Then I budgeted based on the lowest month's income and treated anything extra as 'bonus' for savings or debt repayment. This way, I never overspent.",
      timestamp: "2 hours ago",
      likes: 12,
      isLiked: false,
    },
    {
      id: "3",
      author: {
        name: "Rajesh Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Savings Champion",
        location: "Maharashtra",
      },
      content:
        "For emergency fund with irregular income, start small but be consistent. Even ₹100 per month adds up. I use the 'pay yourself first' method - as soon as money comes in, I transfer a small amount to savings before spending on anything else. After 2 years, I have 3 months of expenses saved!",
      timestamp: "1 hour ago",
      likes: 6,
      isLiked: true,
    },
  ])

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      // In real app, this would submit to API
      console.log("Submitting reply:", newReply)
      setNewReply("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/community" className="text-muted-foreground hover:text-foreground">
              ← Back to Community
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="font-semibold">Discussion</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Original Post */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Post Header */}
              <div className="flex items-center justify-between">
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
                <Badge className="text-xs bg-blue-100 text-blue-700">❓ question</Badge>
              </div>

              {/* Post Content */}
              <div className="space-y-3">
                <p className="text-lg leading-relaxed">{post.content}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${isLiked ? "text-red-600" : ""}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  {post.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {replies.length}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Replies ({replies.length})</h2>

          {/* Reply Form */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your advice or experience..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Be respectful and helpful. Your experience can make a difference!
                  </p>
                  <Button onClick={handleSubmitReply} disabled={!newReply.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies List */}
          <div className="space-y-4">
            {replies.map((reply) => (
              <Card key={reply.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                        <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reply.author.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {reply.author.badge}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {reply.author.location}
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          {reply.timestamp}
                        </div>
                      </div>
                    </div>
                    <p className="leading-relaxed">{reply.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className={`gap-2 ${reply.isLiked ? "text-red-600" : ""}`}>
                        <Heart className={`w-4 h-4 ${reply.isLiked ? "fill-current" : ""}`} />
                        {reply.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
