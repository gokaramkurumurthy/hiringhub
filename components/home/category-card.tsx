import Image from "next/image"
import { Check } from "lucide-react"

interface CategoryCardProps {
  icon: string
  title: string
  count: number
  href: string
  image?: string
  features?: string[]
}

export default function CategoryCard({ icon, title, count, href, image, features = [] }: CategoryCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border h-full flex flex-col">
      <div className="relative h-40 w-full">
        <Image
          src={image || `/placeholder.svg?height=200&width=300&text=${title}`}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <div className="flex items-center">
              <span className="text-2xl mr-2">{icon}</span>
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-white/80">{count} professionals</p>
          </div>
        </div>
      </div>
      {features.length > 0 && (
        <div className="p-4 flex-grow">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground line-clamp-2">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// original