"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface AvailabilityCalendarProps {
  professionalId: string
}

export default function AvailabilityCalendar({ professionalId }: AvailabilityCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // This would normally come from an API, but for demo we'll create some mock availability
  const availableDays = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29]

  const isAvailable = (day: Date) => {
    return availableDays.includes(day.getDate())
  }

  // Time slots for the selected day
  const timeSlots = [
    { time: "09:00 AM", available: isAvailable(date || new Date()) },
    { time: "10:00 AM", available: isAvailable(date || new Date()) },
    { time: "11:00 AM", available: isAvailable(date || new Date()) },
    { time: "01:00 PM", available: false },
    { time: "02:00 PM", available: isAvailable(date || new Date()) },
    { time: "03:00 PM", available: isAvailable(date || new Date()) },
    { time: "04:00 PM", available: false },
    { time: "05:00 PM", available: isAvailable(date || new Date()) },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md"
            modifiers={{
              available: (date) => isAvailable(date),
            }}
            modifiersClassNames={{
              available: "bg-green-100 text-green-900 hover:bg-green-200",
            }}
            disabled={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              return date < today
            }}
          />
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-100 mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-muted mr-2"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
          {date ? (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  disabled={!slot.available}
                  className={cn(
                    "p-2 text-center rounded-md border transition-colors text-sm",
                    slot.available
                      ? "hover:bg-primary hover:text-primary-foreground"
                      : "opacity-50 cursor-not-allowed bg-muted",
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Please select a date to view available time slots.</p>
          )}
        </div>
      </div>
    </div>
  )
}
