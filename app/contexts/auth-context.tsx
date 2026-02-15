"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "professional" | "recruiter"

export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: UserRole
  phone?: string
  companyName?: string
  companyWebsite?: string
  profileCompleted?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  signup: (name: string, email: string, password: string, phone: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
  updateUserProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage (for demo purposes)
    const storedUser = localStorage.getItem("findeasy_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      uid: "user-123",
      email: email,
      displayName: email.split("@")[0],
      photoURL: null,
      role: role,
      profileCompleted: false,
    }

    localStorage.setItem("findeasy_user", JSON.stringify(mockUser))
    setUser(mockUser)
    setIsLoading(false)
  }

  const signup = async (name: string, email: string, password: string, phone: string, role: UserRole) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      uid: "user-" + Date.now(),
      email: email,
      displayName: name,
      photoURL: null,
      phone: phone,
      role: role,
      profileCompleted: false,
    }

    localStorage.setItem("findeasy_user", JSON.stringify(mockUser))
    setUser(mockUser)
    setIsLoading(false)
  }

  const logout = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    localStorage.removeItem("findeasy_user")
    setUser(null)
    setIsLoading(false)
  }

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...updates }
    localStorage.setItem("findeasy_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
