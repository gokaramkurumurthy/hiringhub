"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/auth-context"
import { useData } from "@/app/contexts/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, ChevronLeft, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const addService = (service: any) => {
  // Placeholder for addService logic
  console.log("Adding service:", service);
}

export default function PostServicePage() {
  const { user, isAuthenticated } = useAuth()
  const { addProfessional } = useData()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/post-service")
      return
    }

    // Redirect recruiters to settings
    if (user?.role === "recruiter") {
      router.push("/account-settings")
      return
    }
  }, [isAuthenticated, user?.role, router])

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    experience: "",
    description: "",
    location: "",
    locationType: "",
    noticePeriod: "",
    skills: [] as string[],
    currentSkill: "",
    portfolioLinks: "",
    images: [] as string[],
  })

  const handleSkillAdd = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.currentSkill.trim()],
        currentSkill: "",
      })
    }
  }

  const handleSkillRemove = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const handleImageRemove = (image: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== image),
    })
  }

  const handleImageUpload = () => {
    // Placeholder for image upload logic
    console.log("Image upload logic here");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Create new professional profile
    const newProfessional = {
      id: `pro-${Date.now()}`,
      name: user?.displayName || "Professional",
      profession: formData.title,
      title: formData.title,
      category: formData.category,
      overview: formData.description,
      bio: formData.description,
      location: formData.location || "Not specified",
      locationType: formData.locationType,
      experience: formData.experience,
      noticePeriod: formData.noticePeriod,
      skills: formData.skills,
      portfolioLinks: formData.portfolioLinks ? formData.portfolioLinks.split("\n").filter((link) => link.trim()) : [],
      rating: 5,
      reviewCount: 0,
      email: user?.email,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName}`,
    }

    // Add to context
    addProfessional(newProfessional)

    // Success toast and redirect
    toast({
      title: "Profile Created Successfully",
      description: "Your professional profile is now live and discoverable by recruiters.",
    })

    router.push("/search")
  }

  // If not authenticated, return null (will redirect in useEffect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Join as a Professional</h1>
          <p className="text-muted-foreground mt-2">Create your professional profile and get discovered by recruiters instantly</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Build Your Professional Profile</h2>
              <p className="text-muted-foreground mt-2">Get discovered by top recruiters. Create a complete profile with your skills, experience, and portfolio links.</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Professional Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Full Stack Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Professional Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="business">Business & Finance</SelectItem>
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 Year</SelectItem>
                      <SelectItem value="1-3">1-3 Years</SelectItem>
                      <SelectItem value="3-5">3-5 Years</SelectItem>
                      <SelectItem value="5+">5+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Professional Summary <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell recruiters about your experience, expertise, and career goals..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  Highlight your achievements, years of experience, and what makes you a great fit for positions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Hyderabad"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationType">Work Type</Label>
                  <Select
                    value={formData.locationType}
                    onValueChange={(value) => setFormData({ ...formData, locationType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="noticePeriod">Notice Period</Label>
                <Select
                  value={formData.noticePeriod}
                  onValueChange={(value) => setFormData({ ...formData, noticePeriod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notice period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="1-2-weeks">1-2 Weeks</SelectItem>
                    <SelectItem value="2-4-weeks">2-4 Weeks</SelectItem>
                    <SelectItem value="1-2-months">1-2 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioLinks">Portfolio Links</Label>
                <Textarea
                  id="portfolioLinks"
                  placeholder="Add links to GitHub, LinkedIn, personal website, etc. (one per line)"
                  rows={3}
                  value={formData.portfolioLinks}
                  onChange={(e) => setFormData({ ...formData, portfolioLinks: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
                <div className="flex space-x-2">
                  <Input
                    id="skills"
                    placeholder="e.g., React, Python, Project Management"
                    value={formData.currentSkill}
                    onChange={(e) => setFormData({ ...formData, currentSkill: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSkillAdd()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleSkillAdd} disabled={!formData.currentSkill.trim()}>
                    Add
                  </Button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleSkillRemove(skill)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Create Profile
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
