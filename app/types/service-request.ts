export type ServiceRequestStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "awaiting_confirmation"
  | "completed"
  | "cancelled"
  | "rejected"

export interface ServiceRequest {
  id: string
  userId: string
  professionalId: string
  serviceTitle: string
  description: string
  budget?: string
  status: ServiceRequestStatus
  createdAt: string
  updatedAt: string
  completedAt?: string
  timeline?: string
  messages: ServiceRequestMessage[]
  reviewed: boolean
  reviewId?: string
}

export interface ServiceRequestMessage {
  id: string
  senderId: string
  message: string
  timestamp: string
  isRead: boolean
}
