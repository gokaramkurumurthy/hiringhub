"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SearchFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["categories", "experience", "location"]} className="space-y-4">
        <AccordionItem value="categories" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-medium text-base">Categories</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {["Technology", "Education", "Healthcare", "Business", "Support"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={category} className="text-sm cursor-pointer flex justify-between w-full">
                    {category}
                    <Badge variant="outline" className="ml-auto">
                      {Math.floor(Math.random() * 100) + 1}
                    </Badge>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-medium text-base">Location</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {["Within 5 miles", "Within 10 miles", "Within 25 miles", "Anywhere"].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox id={location} />
                  <Label htmlFor={location} className="text-sm cursor-pointer">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-medium text-base">Experience Level</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {["Entry Level", "Intermediate", "Expert", "Any Experience"].map((exp) => (
                <div key={exp} className="flex items-center space-x-2">
                  <Checkbox id={exp} />
                  <Label htmlFor={exp} className="text-sm cursor-pointer">
                    {exp}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-medium text-base">Availability</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {["Available Now", "Available Today", "Available This Week", "Any Time"].map((avail) => (
                <div key={avail} className="flex items-center space-x-2">
                  <Checkbox id={avail} />
                  <Label htmlFor={avail} className="text-sm cursor-pointer">
                    {avail}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
