import type React from "react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  step: number
}

export default function FeatureCard({ icon, title, description, step }: FeatureCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow card-hover-effect">
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
        {step}
      </div>
      <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
