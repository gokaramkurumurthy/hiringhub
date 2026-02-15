"use client"

import { MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Professional } from "@/app/contexts/data-context"
import { useAuth } from "@/app/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfessionalCardProps {
  professional: Professional
  showCategory?: boolean
}

export default function ProfessionalCard({ professional, showCategory = true }: ProfessionalCardProps) {
  const { isAuthenticated } = useAuth()

  // Function to get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: "bg-blue-100 text-blue-800",
      education: "bg-green-100 text-green-800",
      healthcare: "bg-red-100 text-red-800",
      "home-services": "bg-amber-100 text-amber-800",
      transportation: "bg-purple-100 text-purple-800",
      design: "bg-indigo-100 text-indigo-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header with image and basic info */}
        <div className="flex items-start gap-4 mb-3">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
            <Image
              src={
                professional.image ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" ||
                "/placeholder.svg"
               || "/placeholder.svg"}
              alt={professional.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{professional.name}</h3>
            <p className="text-gray-600 truncate">{professional.profession}</p>

            <div className="flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500 truncate">{professional.location}</span>
            </div>
          </div>

          {/* Category badge - only shown when showCategory is true */}
          {showCategory && (
            <Badge className={`${getCategoryColor(professional.category)} border-0 font-medium flex-shrink-0`}>
              {professional.category.charAt(0).toUpperCase() + professional.category.slice(1)}
            </Badge>
          )}
        </div>



        {/* Bio - fixed height with proper truncation */}
        <div className="mb-4 h-[45px] overflow-hidden">
          <p className="text-sm text-gray-600 line-clamp-2">{professional.bio || "Professional bio not available."}</p>
        </div>

        {/* Skills/Tags - fixed height with proper alignment */}
        <div className="flex flex-wrap gap-2 mb-4 h-[40px] overflow-hidden">
          {professional.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary truncate max-w-full"
            >
              {skill}
            </span>
          ))}
          {professional.skills && professional.skills.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
              +{professional.skills.length - 3}
            </span>
          )}
        </div>

        {/* Actions - at the bottom with mt-auto to push to bottom */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/profile/${professional.id}`} className="flex-1">
            <Button variant="default" className="w-full bg-primary text-white hover:bg-primary/90">
              View Profile
            </Button>
          </Link>
          <Link
            href={
              isAuthenticated
                ? `/profile/${professional.id}?contact=true`
                : `/login?redirect=/profile/${professional.id}?contact=true`
            }
            className="flex-1"
          >
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent">
              Contact
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
