"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { professionals as initialProfessionals, reviews as initialReviews } from "@/app/data/mock-data"

export interface Professional {
  id: string
  name: string
  profession: string
  image?: string
  location: string
  rating: number
  reviewCount: number
  experience?: string
  companies?: string[]
  dates?: string[]
  bio?: string
  skills?: string[]
  category: string
  email?: string
  phone?: string
  services?: {
    name: string
    price?: string
    description: string
    tags?: string[]
  }[]
  portfolio?: {
    title: string
    description: string
    image?: string
    link?: string
    technologies?: string[]
  }[]
}

export interface Review {
  id: string
  professionalId: string
  userId: string
  userName: string
  userImage?: string
  rating: number
  text: string
  date: string
}

export interface Service {
  id: string
  userId: string
  title: string
  category: string
  subcategory?: string
  description: string
  pricing?: string
  pricingType: string
  location?: string
  availability: Date[]
  skills: string[]
  images: string[]
  createdAt: string
}

interface DataContextType {
  professionals: Professional[]
  reviews: Review[]
  services: Service[]
  addProfessional: (professional: Professional) => void
  addReview: (review: Review) => void
  addService: (service: Service) => void
  getProfessionalsByCategory: (category: string) => Professional[]
  getServicesByUser: (userId: string) => Service[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    // Load data from localStorage or use initial data
    const storedProfessionals = localStorage.getItem("hireeasy_professionals")
    const storedReviews = localStorage.getItem("hireeasy_reviews")
    const storedServices = localStorage.getItem("hireeasy_services")

    setProfessionals(storedProfessionals ? JSON.parse(storedProfessionals) : initialProfessionals)
    setReviews(storedReviews ? JSON.parse(storedReviews) : initialReviews)
    setServices(storedServices ? JSON.parse(storedServices) : [])
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (professionals.length > 0) {
      localStorage.setItem("hireeasy_professionals", JSON.stringify(professionals))
    }
  }, [professionals])

  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("hireeasy_reviews", JSON.stringify(reviews))
    }
  }, [reviews])

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem("hireeasy_services", JSON.stringify(services))
    }
  }, [services])

  const addProfessional = (professional: Professional) => {
    setProfessionals([...professionals, professional])
  }

  const addReview = (review: Review) => {
    setReviews([...reviews, review])
  }

  const addService = (service: Service) => {
    setServices([...services, service])
  }

  const getProfessionalsByCategory = (category: string) => {
    if (!category || category === "all") return professionals
    return professionals.filter((pro) => pro.category === category)
  }

  const getServicesByUser = (userId: string) => {
    return services.filter((service) => service.userId === userId)
  }

  return (
    <DataContext.Provider
      value={{
        professionals,
        reviews,
        services,
        addProfessional,
        addReview,
        addService,
        getProfessionalsByCategory,
        getServicesByUser,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
