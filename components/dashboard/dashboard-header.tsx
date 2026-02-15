import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="flex space-x-2">
            <Link href="/post-service">
              <Button>Post a Service</Button>
            </Link>
            <Link href="/search">
              <Button variant="outline">Find Professionals</Button>
            </Link>
          </div>
        </div>

        <div className="flex space-x-2 mt-6 border-b">
          <Link href="/dashboard" className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">
            Dashboard
          </Link>
          <Link href="/dashboard/profile" className="px-4 py-2 text-sm font-medium hover:text-primary">
            Profile
          </Link>
          <Link href="/dashboard/services" className="px-4 py-2 text-sm font-medium hover:text-primary">
            My Services
          </Link>
          <Link href="/dashboard/services-obtained" className="px-4 py-2 text-sm font-medium hover:text-primary">
            Services Obtained
          </Link>
          <Link href="/chat" className="px-4 py-2 text-sm font-medium hover:text-primary">
            Messages
          </Link>
        </div>
      </div>
    </div>
  )
}
