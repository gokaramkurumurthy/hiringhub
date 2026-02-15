import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function MessagesList() {
  // Mock messages data
  const messages = [
    {
      id: "1",
      from: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      preview: "I need help with a web development project...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      from: "John Smith",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      preview: "Thank you for the information. When can we start?",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      from: "Emily Davis",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      preview: "Are you available for a quick call tomorrow?",
      time: "3 days ago",
      unread: false,
    },
    {
      id: "4",
      from: "Michael Chen",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      preview: "I've sent you the project requirements as requested.",
      time: "4 days ago",
      unread: false,
    },
    {
      id: "5",
      from: "Jessica Martinez",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      preview: "The design mockups are ready for your review.",
      time: "1 week ago",
      unread: false,
    },
  ]

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Link href={`/chat?conversation=${message.id}#top`} key={message.id}>
          <div className="flex items-start space-x-4 p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={message.image} alt={message.from} />
              <AvatarFallback>{message.from[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                    {message.from}
                  </p>
                  <p className={`text-sm line-clamp-1 ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                    {message.preview}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                  {message.unread && (
                    <Badge className="mt-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">New</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
