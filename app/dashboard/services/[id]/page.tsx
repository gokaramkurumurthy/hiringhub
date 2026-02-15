"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ServiceDetailsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/post-service")
  }, [router])

  return null
}
