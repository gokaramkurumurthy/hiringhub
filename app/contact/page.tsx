"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
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
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      })
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        reason: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have questions about FindEasy? Want to join as a professional? Or just want to say hello? We'd love to hear
            from you!
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">support@findeasy.com</p>
                <p className="text-sm text-muted-foreground">For general inquiries and support</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">(123) 456-7890</p>
                <p className="text-sm text-muted-foreground">Monday to Friday, 9am to 6pm</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-muted-foreground">123 Main Street, Suite 456</p>
                <p className="text-muted-foreground">San Francisco, CA 94105</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-6 w-6 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Contact Reason</Label>
              <Select value={formData.reason} onValueChange={(value) => setFormData({ ...formData, reason: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason for contact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="professional">Become a Professional</SelectItem>
                  <SelectItem value="partnership">Business Partnership</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject of your message"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
