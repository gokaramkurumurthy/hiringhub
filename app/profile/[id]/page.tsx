"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, ExternalLink, ChevronLeft, Github, Linkedin } from "lucide-react"
import { useData } from "@/app/contexts/data-context"

export default function ProfessionalProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const { professionals } = useData()

  // Find the professional based on the ID param
  const professional = professionals.find((p) => p.id === id) || professionals[0]

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Professional not found</h2>
          <p className="mt-2 text-gray-600">The professional you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="p-0">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <h1 className="text-lg font-semibold flex-1 text-center">{professional.name}</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/10 shadow-md">
                <Image
                  src={professional.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}
                  alt={professional.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1">{professional.name}</h2>
              <p className="text-lg text-primary font-semibold mb-4">{professional.profession}</p>
              
              <div className="space-y-2 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{professional.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${professional.email}`} className="text-primary hover:underline">
                    {professional.email || "contact@example.com"}
                  </a>
                </div>
                {professional.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${professional.phone}`} className="text-primary hover:underline">
                      {professional.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <a href={`mailto:${professional.email}`}>
                <Button className="bg-primary hover:bg-primary/90">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Now
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            {professional.bio && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-3">Professional Overview</h3>
                <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
              </div>
            )}

            {/* Experience */}
            {professional.companies && professional.companies.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Experience</h3>
                <div className="space-y-4">
                  {professional.companies.map((company, index) => (
                    <div key={index} className="pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-gray-900">{professional.experience?.split(", ")[index] || "Position"}</h4>
                        <span className="text-sm text-gray-500">{professional.dates?.[index] || ""}</span>
                      </div>
                      <p className="text-gray-600">{company}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {professional.portfolio && professional.portfolio.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Portfolio</h3>
                <div className="space-y-4">
                  {professional.portfolio.map((item, index) => (
                    <div key={index} className="pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {professional.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Social Links</h3>
              <div className="space-y-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">LinkedIn</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <Github className="h-5 w-5 text-gray-800" />
                  <span className="text-gray-700">GitHub</span>
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <div className="space-y-3">
                <a href={`mailto:${professional.email}`} className="flex items-center gap-2 text-gray-700 hover:text-primary">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm break-all">{professional.email || "email@example.com"}</span>
                </a>
                {professional.phone && (
                  <a href={`tel:${professional.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-primary">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{professional.phone}</span>
                  </a>
                )}
              </div>
              <a href={`mailto:${professional.email}`} className="w-full mt-4">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Email Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
