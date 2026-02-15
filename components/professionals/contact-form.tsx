"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useData } from "@/app/contexts/data-context"

interface ContactFormProps {
  professionalId: string
  onCancel?: () => void
}

export default function ContactForm({ professionalId, onCancel }: ContactFormProps) {
  const { toast } = useToast()
  const { professionals } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    service: "",
    attachment: "",
    sendCopy: false,
  })

  const professional = professionals.find((p) => p.id === professionalId)
  const services = professional?.services || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully",
        description: "The professional will respond to your inquiry soon.",
      })
      setIsSubmitting(false)
      if (onCancel) onCancel()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">
          Subject <span className="text-red-500">*</span>
        </Label>
        <Input
          id="subject"
          placeholder="How can they help you?"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service Interested In</Label>
        <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service (optional)" />
          </SelectTrigger>
          <SelectContent>
            {services.length > 0 ? (
              services.map((service, index) => (
                <SelectItem key={index} value={service.name}>
                  {service.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="general">General Inquiry</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Describe what you need help with..."
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment">Attachment</Label>
        <Input
          id="attachment"
          type="file"
          className="cursor-pointer"
          onChange={(e) => setFormData({ ...formData, attachment: e.target.value })}
        />
        <p className="text-xs text-gray-500">You can attach files (PDF, DOC, JPG) up to 5MB</p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="send-copy"
          checked={formData.sendCopy}
          onCheckedChange={(checked) => setFormData({ ...formData, sendCopy: checked === true })}
        />
        <Label htmlFor="send-copy" className="text-sm">
          Send me a copy of this message
        </Label>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  )
}
