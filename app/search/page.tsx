"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProfessionalCard from "@/components/professionals/professional-card"
import SearchFilters from "@/components/search/search-filters"
import { useData } from "@/app/contexts/data-context"
import Link from "next/link"

export default function SearchPage() {
  const { professionals, getProfessionalsByCategory } = useData()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals)

  // Apply filters whenever search parameters change
  useEffect(() => {
    let filtered = selectedCategory ? getProfessionalsByCategory(selectedCategory) : professionals

    if (searchTerm) {
      filtered = filtered.filter(
        (pro) =>
          pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pro.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pro.skills?.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProfessionals(filtered)
  }, [searchTerm, selectedCategory, professionals, getProfessionalsByCategory])

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtering is already handled by the useEffect
  }

  // Group professionals by category
  const professionalsByCategory = filteredProfessionals.reduce(
    (acc, professional) => {
      const category = professional.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(professional)
      return acc
    },
    {} as Record<string, typeof professionals>,
  )

  return (
    <div className="min-h-screen bg-background flex" id="top">
      {/* Fixed Sidebar - Desktop */}
      <div className="hidden md:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-hidden border-r">
        <div className="h-full overflow-y-auto p-4 no-scrollbar">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <SearchFilters />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-y-auto">
        <div className="bg-primary py-10 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl font-bold text-white mb-6">Find Professionals</h1>

            <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for professionals, services..."
                  className="pl-10 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px] bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="business">Business & Finance</SelectItem>
                  <SelectItem value="design">Design & Creative</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                </SelectContent>
              </Select>

              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full bg-white">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-lg">
                    <SearchFilters />
                  </SheetContent>
                </Sheet>
              </div>

              <Button type="submit" className="bg-primary text-white border border-white hover:bg-primary/90">
                Search
              </Button>
            </form>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center mt-4 gap-2">
                <span className="text-sm text-white/80">Active filters:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1 bg-white/20 text-white"
                  >
                    {filter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilters([])}
                  className="text-xs text-white hover:bg-white/10"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Found <span className="font-medium text-gray-900">{filteredProfessionals.length}</span> professionals
            </p>
            <Select defaultValue="experience-high">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="experience-high">Most Experienced</SelectItem>
                <SelectItem value="experience-low">Recently Joined</SelectItem>
                <SelectItem value="name-az">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-12">
            {selectedCategory ? (
              // If a category is selected, show professionals in that category
              <>
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold capitalize">{selectedCategory}</h2>
                  </div>

                  {filteredProfessionals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProfessionals.map((professional) => (
                        <ProfessionalCard key={professional.id} professional={professional} showCategory={false} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                      <p className="text-lg text-gray-600">No professionals found in this category.</p>
                      <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // If no category is selected, group professionals by category
              Object.entries(professionalsByCategory).map(([category, categoryProfessionals]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold capitalize">{category}</h2>
                    <Link href={`/search?category=${category}`}>
                      <Button variant="outline" className="text-primary bg-transparent">
                        View All
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Show only first 6 professionals per category */}
                    {categoryProfessionals.slice(0, 6).map((professional) => (
                      <ProfessionalCard key={professional.id} professional={professional} showCategory={false} />
                    ))}
                  </div>
                </div>
              ))
            )}

            {filteredProfessionals.length === 0 && !selectedCategory && (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <p className="text-lg text-gray-600">No professionals found matching your criteria.</p>
                <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>

          {filteredProfessionals.length > 6 && selectedCategory && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
