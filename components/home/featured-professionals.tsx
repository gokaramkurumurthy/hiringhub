"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProfessionalCard from "@/components/professionals/professional-card"
import { useData } from "@/app/contexts/data-context"
import Link from "next/link"

export function FeaturedProfessionals() {
  const { professionals } = useData()
  const [startIndex, setStartIndex] = useState(0)

  // Get first three professionals (recently joined or featured)
  const visibleProfessionals = professionals.slice(startIndex, startIndex + 3)

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 3))
  }

  const handleNext = () => {
    setStartIndex(Math.min(professionals.length - 3, startIndex + 3))
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProfessionals.map((professional) => (
          <ProfessionalCard key={professional.id} professional={professional} showCategory={false} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        <Button variant="outline" size="icon" onClick={handlePrevious} disabled={startIndex === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext} disabled={startIndex >= professionals.length - 3}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-8">
        <Link href="/search">
          <Button className="bg-primary hover:bg-primary/90">Find More Professionals</Button>
        </Link>
      </div>
    </div>
  )
}
