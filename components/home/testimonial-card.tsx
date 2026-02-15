import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  quote: string
  rating?: number
}

export default function TestimonialCard({ name, role, image, quote }: TestimonialCardProps) {
  return (
    <Card className="h-full card-hover-effect">
      <CardContent className="pt-6">
        <blockquote className="text-muted-foreground mb-6 italic">"{quote}"</blockquote>

        <div className="flex items-center mt-auto">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={image || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
