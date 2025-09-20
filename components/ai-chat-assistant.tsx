"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [userLanguage, setUserLanguage] = useState<string>("en")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"
    setUserLanguage(savedLanguage)

    const welcomeMessages = {
      en: "Hello! I'm your TrustWise AI assistant. I can help you with financial questions, explain concepts, or guide you through your learning journey. How can I assist you today?",
      hi: "नमस्ते! मैं आपका TrustWise AI सहायक हूं। मैं आपकी वित्तीय प्रश्नों में मदद कर सकता हूं, अवधारणाओं को समझा सकता हूं, या आपकी सीखने की यात्रा में मार्गदर्शन कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    }

    setMessages([
      {
        id: "1",
        type: "assistant",
        content: welcomeMessages[savedLanguage as keyof typeof welcomeMessages] || welcomeMessages.en,
        timestamp: new Date(),
      },
    ])
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = userLanguage === "hi" ? "hi-IN" : "en-US"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [userLanguage])

  const detectLanguage = (text: string): string => {
    const hindiPattern = /[\u0900-\u097F]/
    return hindiPattern.test(text) ? "hi" : "en"
  }

  const generateAIResponse = async (userMessage: string, detectedLang: string): Promise<string> => {
    const responses = {
      en: {
        budget:
          "That's a great question about budgeting! Let me help you understand the 50/30/20 rule - allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
        investment:
          "I can see you're interested in learning about investments. Start with understanding the basics: risk vs return, diversification, and the power of compound interest.",
        saving:
          "For saving money effectively, try the envelope method or use our Budget Challenge game to practice different scenarios!",
        credit:
          "Credit scores are important for your financial health. They're calculated based on payment history, credit utilization, length of credit history, and types of credit.",
        emergency:
          "Emergency funds should cover 3-6 months of expenses. Start small - even ₹500 per month can build a substantial emergency fund over time.",
        digital:
          "Digital payments are secure when you use trusted platforms. Always verify the recipient and keep your PIN/passwords private.",
        loan: "When taking a loan, compare interest rates, understand EMI calculations, and ensure you can comfortably afford the monthly payments.",
        default:
          "I'm here to help with your financial questions! You can ask me about budgeting, investments, savings, loans, or any other financial topic.",
      },
      hi: {
        budget:
          "बजटिंग के बारे में यह बहुत अच्छा प्रश्न है! मैं आपको 50/30/20 नियम समझाता हूं - 50% जरूरतों के लिए, 30% इच्छाओं के लिए, और 20% बचत और कर्ज चुकाने के लिए आवंटित करें।",
        investment:
          "मैं देख सकता हूं कि आप निवेश के बारे में सीखने में रुचि रखते हैं। मूल बातों से शुरुआत करें: जोखिम बनाम रिटर्न, विविधीकरण, और चक्रवृद्धि ब्याज की शक्ति।",
        saving:
          "पैसे की प्रभावी बचत के लिए, लिफाफा विधि आजमाएं या विभिन्न परिस्थितियों का अभ्यास करने के लिए हमारे बजट चैलेंज गेम का उपयोग करें!",
        credit:
          "क्रेडिट स्कोर आपके वित्तीय स्वास्थ्य के लिए महत्वपूर्ण हैं। ये भुगतान इतिहास, क्रेडिट उपयोग, क्रेडिट इतिहास की लंबाई, और क्रेडिट के प्रकारों के आधार पर गणना किए जाते हैं।",
        emergency:
          "आपातकालीन फंड में 3-6 महीने के खर्च को कवर करना चाहिए। छोटी शुरुआत करें - महीने में केवल ₹500 भी समय के साथ एक पर्याप्त आपातकालीन फंड बना सकते हैं।",
        digital:
          "डिजिटल भुगतान तब सुरक्षित होते हैं जब आप विश्वसनीय प्लेटफॉर्म का उपयोग करते हैं। हमेशा प्राप्तकर्ता की पुष्टि करें और अपना PIN/पासवर्ड निजी रखें।",
        loan: "लोन लेते समय, ब्याज दरों की तुलना करें, EMI की गणना समझें, और सुनिश्चित करें कि आप मासिक भुगतान आराम से कर सकते हैं।",
        default:
          "मैं आपके वित्तीय प्रश्नों में मदद के लिए यहां हूं! आप मुझसे बजटिंग, निवेश, बचत, लोन, या किसी भी अन्य वित्तीय विषय के बारे में पूछ सकते हैं।",
      },
    }

    const languageResponses = responses[detectedLang as keyof typeof responses] || responses.en
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("budget") || lowerMessage.includes("बजट")) return languageResponses.budget
    if (lowerMessage.includes("invest") || lowerMessage.includes("निवेश")) return languageResponses.investment
    if (lowerMessage.includes("save") || lowerMessage.includes("बचत")) return languageResponses.saving
    if (lowerMessage.includes("credit") || lowerMessage.includes("क्रेडिट")) return languageResponses.credit
    if (lowerMessage.includes("emergency") || lowerMessage.includes("आपातकाल")) return languageResponses.emergency
    if (lowerMessage.includes("digital") || lowerMessage.includes("डिजिटल")) return languageResponses.digital
    if (lowerMessage.includes("loan") || lowerMessage.includes("लोन") || lowerMessage.includes("कर्ज"))
      return languageResponses.loan

    return languageResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputMessage
    setInputMessage("")
    setIsTyping(true)

    setTimeout(async () => {
      const detectedLanguage = detectLanguage(currentInput)
      const responseContent = await generateAIResponse(currentInput, detectedLanguage)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const handleTextToSpeech = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = userLanguage === "hi" ? "hi-IN" : "en-US"
      utterance.rate = 0.9
      utterance.pitch = 1

      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) => voice.lang.startsWith(userLanguage === "hi" ? "hi" : "en"))
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const uiText = {
    en: {
      title: "TrustWise AI Assistant",
      subtitle: "Always here to help",
      placeholder: "Ask me anything about finance...",
      listening: "Listening...",
      micHint: "Click mic for voice input",
    },
    hi: {
      title: "TrustWise AI सहायक",
      subtitle: "हमेशा मदद के लिए तैयार",
      placeholder: "वित्त के बारे में कुछ भी पूछें...",
      listening: "सुन रहा हूं...",
      micHint: "वॉइस इनपुट के लिए माइक पर क्लिक करें",
    },
  }

  const currentText = uiText[userLanguage as keyof typeof uiText] || uiText.en

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Badge className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-1 text-xs">AI</Badge>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-[500px]"}`}>
        <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary-foreground text-primary">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">{currentText.title}</CardTitle>
                <p className="text-xs opacity-90">{currentText.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "assistant" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      {message.type === "assistant" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTextToSpeech(message.content)}
                          className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </Button>
                      )}
                    </div>
                  </div>
                  {message.type === "user" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentText.placeholder}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                      isListening ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button onClick={handleSendMessage} size="sm" className="px-3">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-center mt-2">
                <Badge variant="secondary" className="text-xs">
                  {isListening ? currentText.listening : currentText.micHint}
                </Badge>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
