import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import type { Review } from "@/app/contexts/data-context"

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-start">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={review.userImage || "/placeholder.svg?height=40&width=40"} alt={review.userName} />
          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-medium">{review.userName}</h4>
              <p className="text-sm text-gray-500">{format(new Date(review.date), "PP")}</p>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-gray-600">{review.text}</p>
        </div>
      </div>
    </div>
  )
}
