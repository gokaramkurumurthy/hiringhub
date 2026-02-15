import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Star, UserPlus, FileText } from "lucide-react"

export default function RecentActivities() {
  // Mock activities data
  const activities = [
    {
      id: "1",
      type: "message",
      title: "New message from Sarah Johnson",
      description: "I need help with a web development project...",
      time: "2 hours ago",
      icon: <MessageSquare className="h-4 w-4" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      user: {
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "2",
      type: "review",
      title: "You received a 5-star review",
      description: "John Smith left a review on your Web Development service",
      time: "Yesterday",
      icon: <Star className="h-4 w-4" />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      user: {
        name: "John Smith",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "3",
      type: "connection",
      title: "New connection request",
      description: "Mike Davis wants to connect with you",
      time: "2 days ago",
      icon: <UserPlus className="h-4 w-4" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      user: {
        name: "Mike Davis",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "4",
      type: "service",
      title: "Your service was approved",
      description: "Mobile App Development is now live",
      time: "3 days ago",
      icon: <FileText className="h-4 w-4" />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-4 p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
        >
          <div className={`${activity.iconBg} p-2 rounded-full ${activity.iconColor}`}>{activity.icon}</div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              {activity.user && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.image} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
          </div>
        </div>
      ))}

      {activities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No recent activities.</p>
        </div>
      )}
    </div>
  )
}
