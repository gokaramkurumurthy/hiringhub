"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/app/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import type { ServiceRequest, ServiceRequestStatus } from "@/app/types/service-request"

interface ServiceRequestContextType {
  serviceRequests: ServiceRequest[]
  getRequestsByUser: (userId: string) => ServiceRequest[]
  getRequestsByProfessional: (professionalId: string) => ServiceRequest[]
  createServiceRequest: (
    request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt" | "status" | "messages" | "reviewed">,
  ) => Promise<ServiceRequest>
  updateServiceRequestStatus: (requestId: string, status: ServiceRequestStatus) => Promise<void>
  addServiceRequestMessage: (requestId: string, message: string) => Promise<void>
  markServiceAsReviewed: (requestId: string, reviewId: string) => Promise<void>
  getServiceRequestById: (requestId: string) => ServiceRequest | undefined
}

const ServiceRequestContext = createContext<ServiceRequestContextType | undefined>(undefined)

export function ServiceRequestProvider({ children }: { children: ReactNode }) {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // Initialize with some sample data if none exists
    const storedRequests = localStorage.getItem("findeasy_service_requests")
    if (!storedRequests) {
      const initialData = [
        {
          id: "req-1",
          userId: "user-123",
          professionalId: "prof-1",
          serviceTitle: "Website Development",
          description: "I need a professional website for my small business",
          budget: "$500-1000",
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: [],
          reviewed: false,
        },
      ]
      localStorage.setItem("findeasy_service_requests", JSON.stringify(initialData))
      setServiceRequests(initialData)
    }
  }, [])

  // Load data from localStorage
  useEffect(() => {
    const storedRequests = localStorage.getItem("findeasy_service_requests")
    if (storedRequests) {
      setServiceRequests(JSON.parse(storedRequests))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (serviceRequests.length > 0) {
      localStorage.setItem("findeasy_service_requests", JSON.stringify(serviceRequests))
    }
  }, [serviceRequests])

  const getRequestsByUser = (userId: string) => {
    return serviceRequests.filter((request) => request.userId === userId)
  }

  const getRequestsByProfessional = (professionalId: string) => {
    return serviceRequests.filter((request) => request.professionalId === professionalId)
  }

  const getServiceRequestById = (requestId: string) => {
    return serviceRequests.find((request) => request.id === requestId)
  }

  const createServiceRequest = async (
    request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt" | "status" | "messages" | "reviewed">,
  ) => {
    // Create a new service request
    const now = new Date().toISOString()
    const newRequest: ServiceRequest = {
      id: `req-${Date.now()}`,
      status: "pending",
      createdAt: now,
      updatedAt: now,
      messages: [],
      reviewed: false,
      ...request,
    }

    setServiceRequests((prev) => [...prev, newRequest])

    toast({
      title: "Service Request Sent",
      description: "Your request has been sent to the professional.",
    })

    return newRequest
  }

  const updateServiceRequestStatus = async (requestId: string, status: ServiceRequestStatus) => {
    setServiceRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status,
              updatedAt: new Date().toISOString(),
              ...(status === "completed" ? { completedAt: new Date().toISOString() } : {}),
            }
          : request,
      ),
    )

    const statusMessages = {
      pending: "Service request is now pending.",
      accepted: "Service request has been accepted.",
      in_progress: "Service is now in progress.",
      awaiting_confirmation: "Service is awaiting confirmation of completion.",
      completed: "Service has been marked as completed.",
      cancelled: "Service request has been cancelled.",
      rejected: "Service request has been rejected.",
    }

    toast({
      title: "Status Updated",
      description: statusMessages[status],
    })
  }

  const addServiceRequestMessage = async (requestId: string, message: string) => {
    if (!user) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.uid,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    setServiceRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              messages: [...request.messages, newMessage],
              updatedAt: new Date().toISOString(),
            }
          : request,
      ),
    )
  }

  const markServiceAsReviewed = async (requestId: string, reviewId: string) => {
    setServiceRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              reviewed: true,
              reviewId,
              updatedAt: new Date().toISOString(),
            }
          : request,
      ),
    )

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })
  }

  return (
    <ServiceRequestContext.Provider
      value={{
        serviceRequests,
        getRequestsByUser,
        getRequestsByProfessional,
        createServiceRequest,
        updateServiceRequestStatus,
        addServiceRequestMessage,
        markServiceAsReviewed,
        getServiceRequestById,
      }}
    >
      {children}
    </ServiceRequestContext.Provider>
  )
}

export function useServiceRequest() {
  const context = useContext(ServiceRequestContext)
  if (context === undefined) {
    throw new Error("useServiceRequest must be used within a ServiceRequestProvider")
  }
  return context
}
