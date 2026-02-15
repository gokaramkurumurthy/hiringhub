"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import type { Service } from "@/app/contexts/data-context"
import { useState } from "react"
import { format } from "date-fns"

interface ServicesListProps {
  services: Service[]
}

export default function ServicesList({ services }: ServicesListProps) {
  const [activeServices, setActiveServices] = useState<Record<string, boolean>>({})

  // Initialize active state for each service
  useState(() => {
    const initialState: Record<string, boolean> = {}
    services.forEach((service) => {
      initialState[service.id] = true
    })
    setActiveServices(initialState)
  })

  const toggleServiceStatus = (serviceId: string) => {
    setActiveServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }))
  }

  return (
    <div className="space-y-4">
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{service.title}</h3>
                  <Badge variant={activeServices[service.id] ? "default" : "secondary"} className="ml-2">
                    {activeServices[service.id] ? "Active" : "Paused"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{service.category}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center mr-2">
                  <Switch
                    checked={activeServices[service.id]}
                    id={`status-${service.id}`}
                    onCheckedChange={() => toggleServiceStatus(service.id)}
                  />
                  <label htmlFor={`status-${service.id}`} className="ml-2 text-sm">
                    {activeServices[service.id] ? "Active" : "Paused"}
                  </label>
                </div>

                <Link href={`/dashboard/services/${service.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>

                <Link href={`/profile/preview/${service.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </Link>

                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
              <div>
                <span className="text-muted-foreground">Price:</span> ${service.pricing}/{service.pricingType}
              </div>
              <div>
                <span className="text-muted-foreground">Created:</span>{" "}
                {format(new Date(service.createdAt), "MMM d, yyyy")}
              </div>
              <div>
                <span className="text-muted-foreground">Views:</span> {Math.floor(Math.random() * 100) + 10}
              </div>
              <div>
                <span className="text-muted-foreground">Inquiries:</span> {Math.floor(Math.random() * 10)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
          <p className="text-muted-foreground">You haven't posted any services yet.</p>
          <Link href="/post-service">
            <Button className="mt-4 bg-primary hover:bg-primary/90">Post Your First Service</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
