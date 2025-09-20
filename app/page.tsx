import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Trophy, TrendingUp, Shield, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">TrustWise</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#journey" className="text-muted-foreground hover:text-foreground transition-colors">
              Journey
            </a>
            <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </a>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Journey-based Financial Learning
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Build trust in <span className="text-primary">digital finance</span> through guided learning
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Empowering underserved communities with contextual financial education, peer mentorship, and
                  culturally-adapted tools that build confidence in digital financial services.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="text-lg px-8">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Trust Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/mobile-phone-showing-financial-app-interface-with-.jpg"
                  alt="TrustWise mobile app interface"
                  className="mx-auto max-w-sm w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl -z-10 transform scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Pathways Section */}
      <section id="journey" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Target className="w-3 h-3 mr-1" />
              Progressive Learning
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-balance">Your Financial Journey, Step by Step</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Advance through carefully designed stages that build knowledge, confidence, and access to real financial
              products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stage: "Stage 1",
                title: "Basic Savings",
                description: "Learn fundamental saving principles and digital wallet basics",
                icon: "💰",
                color: "bg-chart-1/10 border-chart-1/20",
              },
              {
                stage: "Stage 2",
                title: "Smart Spending",
                description: "Master budgeting, expense tracking, and smart financial decisions",
                icon: "📊",
                color: "bg-chart-2/10 border-chart-2/20",
              },
              {
                stage: "Stage 3",
                title: "Credit Readiness",
                description: "Understand credit, loans, and responsible borrowing practices",
                icon: "🏦",
                color: "bg-chart-3/10 border-chart-3/20",
              },
              {
                stage: "Stage 4",
                title: "Investment Awareness",
                description: "Explore investment basics and long-term wealth building",
                icon: "📈",
                color: "bg-chart-4/10 border-chart-4/20",
              },
            ].map((item, index) => (
              <Card key={index} className={`${item.color} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <Badge variant="outline" className="w-fit mx-auto mb-2">
                    {item.stage}
                  </Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-pretty">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Trophy className="w-3 h-3 mr-1" />
              Key Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-balance">Built for Real-World Impact</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Peer Community & Mentorship",
                description: "Connect with local success stories and financial champions who understand your journey",
                icon: <Users className="w-6 h-6" />,
              },
              {
                title: "Gamified Learning",
                description: "Scenario-based challenges like festival budgeting, loan repayment, and harvest planning",
                icon: <Trophy className="w-6 h-6" />,
              },
              {
                title: "Behavioral Finance Toolkit",
                description: "Personalized nudges, predictive alerts, and simple trackers for savings and expenses",
                icon: <TrendingUp className="w-6 h-6" />,
              },
              {
                title: "Cultural Adaptation",
                description: "Localized content in multiple dialects, integrating crop cycles and seasonal incomes",
                icon: <Globe className="w-6 h-6" />,
              },
              {
                title: "Trust Building",
                description: "Recognition system and milestone badges that build confidence in digital finance",
                icon: <Shield className="w-6 h-6" />,
              },
              {
                title: "Real Financial Products",
                description: "Unlock access to actual savings accounts, loans, and investment opportunities",
                icon: <Target className="w-6 h-6" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Ready to Start Your Financial Journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-pretty">
            Join thousands of learners who are building trust and knowledge in digital finance through our
            culturally-adapted platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold">TrustWise</span>
              </div>
              <p className="text-muted-foreground text-pretty">
                Empowering underserved communities through journey-based financial education.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Learning Modules</div>
                <div>Community</div>
                <div>Progress Tracking</div>
                <div>Mentorship</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Help Center</div>
                <div>Local Guides</div>
                <div>Contact Us</div>
                <div>Feedback</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>About Us</div>
                <div>Impact Stories</div>
                <div>Partners</div>
                <div>Careers</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 TrustWise. Building financial trust through education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
