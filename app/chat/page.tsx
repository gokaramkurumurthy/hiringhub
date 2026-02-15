"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Search, Phone, Video, MoreVertical, ImageIcon, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ConversationList from "@/components/chat/conversation-list"
import { conversations, messages as initialMessages } from "@/app/data/mock-data"

export default function ChatPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [activeChat, setActiveChat] = useState(conversations[0]?.id)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/chat")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim()) {
      const message = {
        id: `msg-${Date.now()}`,
        conversationId: activeChat,
        senderId: user?.uid || "current-user", // Current user is always the sender
        text: newMessage,
        timestamp: new Date().toISOString(),
        isRead: true,
      }

      setMessages([...messages, message])
      setNewMessage("")

      // Simulate response after 1 second
      setTimeout(() => {
        const response = {
          id: `msg-${Date.now() + 1}`,
          conversationId: activeChat,
          senderId: conversations.find((c) => c.id === activeChat)?.participantId || "",
          text: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date().toISOString(),
          isRead: false,
        }

        setMessages((prev) => [...prev, response])
      }, 1000)
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentConversation = conversations.find((conv) => conv.id === activeChat)
  const currentMessages = messages.filter((msg) => msg.conversationId === activeChat)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl h-[calc(100vh-4rem)] px-0 sm:px-4 py-4">
        <div className="flex h-full rounded-lg overflow-hidden border">
          {/* Sidebar */}
          <div className="w-full sm:w-80 border-r flex flex-col bg-card">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="flex-1 flex flex-col">
              <div className="px-2 pt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="flex-1 overflow-y-auto">
                <ConversationList
                  conversations={filteredConversations}
                  messages={messages}
                  activeChat={activeChat}
                  onSelectChat={setActiveChat}
                />
              </TabsContent>

              <TabsContent value="unread" className="flex-1 overflow-y-auto">
                <ConversationList
                  conversations={filteredConversations.filter((conv) => {
                    // Check if there are unread messages in this conversation
                    return messages.some(
                      (msg) => msg.conversationId === conv.id && msg.senderId !== user?.uid && !msg.isRead,
                    )
                  })}
                  messages={messages}
                  activeChat={activeChat}
                  onSelectChat={setActiveChat}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="hidden sm:flex flex-1 flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={currentConversation?.participantImage || "/placeholder.svg?height=40&width=40"}
                      />
                      <AvatarFallback>{currentConversation?.participantName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{currentConversation?.participantName}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentConversation?.lastSeen
                          ? `Last seen ${format(new Date(currentConversation.lastSeen), "PP")}`
                          : "Online"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="bg-muted/50 p-4 rounded-full mb-4">
                        <MessageSquare className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No messages yet</h3>
                      <p className="text-muted-foreground">Start the conversation by sending a message below.</p>
                    </div>
                  ) : (
                    currentMessages.map((message) => {
                      const isCurrentUser = message.senderId === user?.uid || message.senderId === "current-user"

                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                          <div className="flex items-end gap-2 max-w-[75%]">
                            {!isCurrentUser && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={currentConversation?.participantImage || "/placeholder.svg?height=32&width=32"}
                                />
                                <AvatarFallback>{currentConversation?.participantName.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}

                            <div
                              className={`rounded-lg p-3 ${
                                isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p>{message.text}</p>
                              <div
                                className={`text-xs mt-1 ${
                                  isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                                }`}
                              >
                                {format(new Date(message.timestamp), "p")}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="bg-muted/50 p-6 rounded-full mb-4">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold mb-2">Your Messages</h2>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the sidebar or start a new one by searching for a professional.
                </p>
              </div>
            )}
          </div>

          {/* Mobile: No chat selected */}
          <div className="flex-1 flex flex-col items-center justify-center sm:hidden">
            <div className="bg-muted/50 p-6 rounded-full mb-4">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your Messages</h2>
            <p className="text-muted-foreground max-w-md text-center">Select a conversation to view messages</p>
          </div>
        </div>
      </div>
    </div>
  )
}
