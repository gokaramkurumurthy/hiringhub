"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useServiceRequest } from "@/app/contexts/service-request-context"
import { useAuth } from "@/app/contexts/auth-context"
import { useRouter } from "next/navigation"
import type { Professional } from "@/app/contexts/data-context"

interface ServiceRequestFormProps {
  professional: Professional
  onCancel?: () => void
  selectedService?: string
}

export default function ServiceRequestForm({ professional, onCancel, selectedService }: ServiceRequestFormProps) {
  const { toast } = useToast()
  const { createServiceRequest } = useServiceRequest()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    serviceTitle: selectedService || "",
    description: "",
    budget: "",
    timeline: "As soon as possible",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to send a service request",
        variant: "destructive",
      })
      router.push(`/login?redirect=/profile/${professional.id}?request=true`)
      return
    }

    if (!formData.serviceTitle || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await createServiceRequest({
        userId: user.uid,
        professionalId: professional.id,
        serviceTitle: formData.serviceTitle,
        description: formData.description,
        budget: formData.budget,
        timeline: formData.timeline,
      })

      toast({
        title: "Request Sent",
        description: "Your service request has been sent successfully!",
      })

      // Redirect to services obtained page
      router.push("/dashboard/services-obtained")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      if (onCancel) onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="serviceTitle">
          Service Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="serviceTitle"
          placeholder="E.g., Website Development, Plumbing Repair"
          value={formData.serviceTitle}
          onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what you need help with in detail..."
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (Optional)</Label>
          <Input
            id="budget"
            placeholder="Your budget for this service"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Input
            id="timeline"
            placeholder="When do you need this completed?"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
          {isSubmitting ? "Sending..." : "Send Request"}
        </Button>
      </div>
    </form>
  )
}
