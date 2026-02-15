import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageSquare, Users, Eye } from "lucide-react"

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <Card className="border-l-4 border-l-primary">
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
              <Eye className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Profile Views</p>
              <p className="text-lg sm:text-2xl font-bold">246</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-amber-100 p-2 sm:p-3 rounded-full">
              <Star className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Reviews</p>
              <p className="text-lg sm:text-2xl font-bold">4.8</p>
              <p className="text-xs">From 32 reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
              <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Messages</p>
              <p className="text-lg sm:text-2xl font-bold">18</p>
              <p className="text-xs text-amber-600">3 unread</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-green-100 p-2 sm:p-3 rounded-full">
              <Users className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Connections</p>
              <p className="text-lg sm:text-2xl font-bold">57</p>
              <p className="text-xs text-green-600">+5 this week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
