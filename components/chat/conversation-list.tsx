"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useAuth } from "@/app/contexts/auth-context"

interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantImage?: string
  lastSeen?: string
}

interface Message {
  id: string
  conversationId: string
  senderId: string
  text: string
  timestamp: string
  isRead: boolean
}

interface ConversationListProps {
  conversations: Conversation[]
  messages: Message[]
  activeChat: string
  onSelectChat: (id: string) => void
}

export default function ConversationList({ conversations, messages, activeChat, onSelectChat }: ConversationListProps) {
  const { user } = useAuth()

  // Helper to get the last message in a conversation
  const getLastMessage = (conversationId: string) => {
    const conversationMessages = messages.filter((msg) => msg.conversationId === conversationId)

    if (conversationMessages.length === 0) return null

    return conversationMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
  }

  // Helper to count unread messages in a conversation
  const getUnreadCount = (conversationId: string) => {
    return messages.filter((msg) => msg.conversationId === conversationId && msg.senderId !== user?.uid && !msg.isRead)
      .length
  }

  return (
    <div className="space-y-1 p-2">
      {conversations.length > 0 ? (
        conversations.map((conversation) => {
          const lastMessage = getLastMessage(conversation.id)
          const unreadCount = getUnreadCount(conversation.id)

          return (
            <div
              key={conversation.id}
              className={cn(
                "flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors",
                activeChat === conversation.id ? "bg-muted" : "hover:bg-muted/50",
              )}
              onClick={() => onSelectChat(conversation.id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={conversation.participantImage || "/placeholder.svg?height=40&width=40"}
                  alt={conversation.participantName}
                />
                <AvatarFallback>{conversation.participantName.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p
                    className={cn(
                      "font-medium truncate",
                      unreadCount > 0 ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {conversation.participantName}
                  </p>
                  {lastMessage && (
                    <p className="text-xs text-muted-foreground">{format(new Date(lastMessage.timestamp), "p")}</p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  {lastMessage ? (
                    <p
                      className={cn("text-sm truncate", unreadCount > 0 ? "text-foreground" : "text-muted-foreground")}
                    >
                      {lastMessage.senderId === user?.uid ? "You: " : ""}
                      {lastMessage.text}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No messages yet</p>
                  )}

                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground text-xs">{unreadCount}</Badge>
                  )}
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No conversations yet.</p>
        </div>
      )}
    </div>
  )
}
