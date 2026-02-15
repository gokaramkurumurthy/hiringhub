"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/app/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft } from "lucide-react"

export default function AccountSettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, updateUserProfile, logout } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    companyName: "",
    companyWebsite: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        phone: user.phone || "",
        companyName: user.companyName || "",
        companyWebsite: user.companyWebsite || "",
      })
    }
  }, [user, isAuthenticated, router])

  const handleSave = async () => {
    if (!formData.displayName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
      })

      toast({
        title: "Settings Updated",
        description: "Your account settings have been saved successfully.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recruiter Information */}
        {user.role === "recruiter" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Your company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                  placeholder="https://company.com"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Type */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 capitalize">
              <span className="font-semibold">{user.role}</span>
              {user.role === "professional" && " - Looking for opportunities and get discovered by recruiters"}
              {user.role === "recruiter" && " - Hiring and finding top talent"}
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={isLoading} className="flex-1">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          <Button onClick={handleLogout} variant="outline" className="flex-1 bg-transparent">
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
