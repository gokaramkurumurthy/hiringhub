"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, AlertTriangle, Loader2, MessageSquare, ThumbsUp, Star } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useServiceRequest } from "@/app/contexts/service-request-context"
import { format } from "date-fns"
import type { ServiceRequestStatus } from "@/app/types/service-request"

interface WorkStatusTrackerProps {
  requestId: string
  isProfessional?: boolean
}

export default function WorkStatusTracker({ requestId, isProfessional = false }: WorkStatusTrackerProps) {
  const { toast } = useToast()
  const { getServiceRequestById, updateServiceRequestStatus, addServiceRequestMessage, markServiceAsReviewed } =
    useServiceRequest()

  const [message, setMessage] = useState("")
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const request = getServiceRequestById(requestId)

  if (!request) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Service request not found.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Get status information (icon, color, label)
  const getStatusInfo = (status: ServiceRequestStatus) => {
    const statusMap = {
      pending: {
        icon: <Clock className="h-5 w-5" />,
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Pending",
      },
      accepted: {
        icon: <CheckCircle className="h-5 w-5" />,
        color: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Accepted",
      },
      in_progress: {
        icon: <Loader2 className="h-5 w-5" />,
        color: "bg-purple-100 text-purple-800 border-purple-200",
        label: "In Progress",
      },
      awaiting_confirmation: {
        icon: <AlertTriangle className="h-5 w-5" />,
        color: "bg-orange-100 text-orange-800 border-orange-200",
        label: "Awaiting Confirmation",
      },
      completed: {
        icon: <CheckCircle className="h-5 w-5" />,
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Completed",
      },
      cancelled: {
        icon: <XCircle className="h-5 w-5" />,
        color: "bg-red-100 text-red-800 border-red-200",
        label: "Cancelled",
      },
      rejected: {
        icon: <XCircle className="h-5 w-5" />,
        color: "bg-red-100 text-red-800 border-red-200",
        label: "Rejected",
      },
    }

    return statusMap[status]
  }

  // Get available status transitions based on current status and user type
  const getAvailableStatusTransitions = () => {
    if (isProfessional) {
      switch (request.status) {
        case "pending":
          return [
            { status: "accepted", label: "Accept Request", color: "bg-green-600 hover:bg-green-700" },
            { status: "rejected", label: "Reject Request", color: "bg-red-600 hover:bg-red-700" },
          ]
        case "accepted":
          return [
            { status: "in_progress", label: "Start Work", color: "bg-blue-600 hover:bg-blue-700" },
            { status: "cancelled", label: "Cancel Request", color: "bg-red-600 hover:bg-red-700" },
          ]
        case "in_progress":
          return [
            { status: "awaiting_confirmation", label: "Mark as Complete", color: "bg-orange-600 hover:bg-orange-700" },
          ]
        default:
          return []
      }
    } else {
      // Client user
      switch (request.status) {
        case "pending":
          return [{ status: "cancelled", label: "Cancel Request", color: "bg-red-600 hover:bg-red-700" }]
        case "awaiting_confirmation":
          return [{ status: "completed", label: "Confirm Completion", color: "bg-green-600 hover:bg-green-700" }]
        default:
          return []
      }
    }
  }

  const handleStatusChange = async (newStatus: ServiceRequestStatus) => {
    try {
      await updateServiceRequestStatus(requestId, newStatus)
      toast({
        title: "Status Updated",
        description: `Service request has been updated to ${getStatusInfo(newStatus).label}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    setIsSubmittingMessage(true)
    try {
      await addServiceRequestMessage(requestId, message)
      setMessage("")
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingMessage(false)
    }
  }

  const handleSubmitReview = async () => {
    if (!review.trim()) {
      toast({
        title: "Review Required",
        description: "Please provide a review before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingReview(true)
    try {
      // In a real app, you would create a review and get back the ID
      const reviewId = `review-${Date.now()}`
      await markServiceAsReviewed(requestId, reviewId)

      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const statusInfo = getStatusInfo(request.status)
  const availableTransitions = getAvailableStatusTransitions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Status Tracker</CardTitle>
        <CardDescription>Track and manage the progress of this service request</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Current Status</h3>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className={`${statusInfo.color} flex items-center gap-1 px-3 py-1`}>
                {statusInfo.icon}
                <span>{statusInfo.label}</span>
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="text-sm font-medium">{format(new Date(request.updatedAt), "MMM d, yyyy h:mm a")}</p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="relative pt-2 pb-6">
          <div className="absolute left-2.5 top-2.5 h-full w-0.5 bg-muted"></div>

          <div className="relative flex items-center mb-4">
            <div className="z-10 flex items-center justify-center w-5 h-5 bg-primary rounded-full">
              <CheckCircle className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="flex-1 ml-4">
              <div className="font-medium">Request Created</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(request.createdAt), "MMM d, yyyy h:mm a")}
              </div>
            </div>
          </div>

          {request.status !== "pending" && (
            <div className="relative flex items-center mb-4">
              <div className="z-10 flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <div className="font-medium">Request Accepted</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(request.updatedAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
            </div>
          )}

          {(request.status === "in_progress" ||
            request.status === "awaiting_confirmation" ||
            request.status === "completed") && (
            <div className="relative flex items-center mb-4">
              <div className="z-10 flex items-center justify-center w-5 h-5 bg-purple-500 rounded-full">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <div className="font-medium">Work In Progress</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(request.updatedAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
            </div>
          )}

          {(request.status === "awaiting_confirmation" || request.status === "completed") && (
            <div className="relative flex items-center mb-4">
              <div className="z-10 flex items-center justify-center w-5 h-5 bg-orange-500 rounded-full">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <div className="font-medium">Work Completed</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(request.updatedAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
            </div>
          )}

          {request.status === "completed" && (
            <div className="relative flex items-center">
              <div className="z-10 flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <div className="font-medium">Request Confirmed & Completed</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(request.completedAt || request.updatedAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
            </div>
          )}

          {request.status === "cancelled" && (
            <div className="relative flex items-center">
              <div className="z-10 flex items-center justify-center w-5 h-5 bg-red-500 rounded-full">
                <XCircle className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <div className="font-medium">Request Cancelled</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(request.updatedAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
            </div>
          )}

          {request.status === "rejected" && (
            <div className="relative flex items-center">
              <div className="z-10 flex items-center justify-center w-5 h-5 bg-red-500 rounded-full">
                <XCircle className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <div className="font-medium">Request Rejected</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(request.updatedAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Actions */}
        {availableTransitions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Available Actions</h3>
            <div className="flex flex-wrap gap-2">
              {availableTransitions.map((transition) => (
                <Button
                  key={transition.status}
                  onClick={() => handleStatusChange(transition.status as ServiceRequestStatus)}
                  className={transition.color}
                >
                  {transition.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div>
          <h3 className="text-sm font-medium mb-2">Communication</h3>
          <div className="border rounded-md p-3 max-h-[200px] overflow-y-auto mb-3">
            {request.messages.length > 0 ? (
              <div className="space-y-3">
                {request.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.senderId === request.userId ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.senderId === request.userId ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(msg.timestamp), "MMM d, h:mm a")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">No messages yet. Start the conversation!</p>
            )}
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px]"
            />
            <Button className="self-end" onClick={handleSendMessage} disabled={isSubmittingMessage || !message.trim()}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

        {/* Review Section - only show for client when service is completed and not yet reviewed */}
        {!isProfessional && request.status === "completed" && !request.reviewed && (
          <div>
            <h3 className="text-sm font-medium mb-2">Leave a Review</h3>
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <Textarea
                placeholder="Share your experience with this service..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mb-3"
              />
              <Button onClick={handleSubmitReview} disabled={isSubmittingReview || !review.trim()} className="w-full">
                <ThumbsUp className="h-4 w-4 mr-2" />
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
