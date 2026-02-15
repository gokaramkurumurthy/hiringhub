import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Users, MessageSquare, Award, Check, Briefcase } from "lucide-react"
import FeatureCard from "@/components/home/feature-card"
import TestimonialCard from "@/components/home/testimonial-card"
import { FeaturedProfessionals } from "@/components/home/featured-professionals"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-36 overflow-hidden bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-white/50 bg-[size:20px_20px]" />
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40" />
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
            alt="Professional collaboration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Hire Professionals Directly & Instantly
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                Discover and hire top professionals instantly. Search by skills, experience, and roles without intermediaries or job postings.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                <Link href="/search#top">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                    Find Professionals
                  </Button>
                </Link>
                <Link href="/login?redirect=/post-service#top">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Join as a Professional
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Professional services"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How HireEasy Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Finding the right professional or offering your services has never been easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Star className="h-8 w-8 text-primary" />}
              title="Search & Discover"
              description="Find professionals by category, location, ratings, and more."
              step={1}
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              title="Connect Directly"
              description="Contact professionals directly with no intermediaries."
              step={2}
            />
            <FeatureCard
              icon={<Award className="h-8 w-8 text-primary" />}
              title="Hire Instantly"
              description="Interview, hire, and onboard professionals in minutes."
              step={3}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Popular Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Browse professionals across various categories</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "💻",
                title: "Technology",
                count: 120,
                href: "/search?category=technology#top",
                image:
                  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                features: ["Frontend Developers", "Backend Developers", "Full Stack Developers"],
              },
              {
                icon: "📚",
                title: "Education",
                count: 85,
                href: "/search?category=education#top",
                image:
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                features: ["Teachers", "Instructors", "Trainers"],
              },
              {
                icon: "🏥",
                title: "Healthcare",
                count: 37,
                href: "/search?category=healthcare#top",
                image:
                  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                features: ["Doctors", "Nurses", "Specialists"],
              },
              {
                icon: "🎨",
                title: "Design & Creative",
                count: 58,
                href: "/search?category=design#top",
                image:
                  "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
                features: ["Designers", "Creatives", "Artists"],
              },
              {
                icon: "💼",
                title: "Business & Finance",
                count: 45,
                href: "/search?category=business#top",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                features: ["Accountants", "Consultants", "Analysts"],
              },
              {
                icon: "📞",
                title: "Customer Support",
                count: 72,
                href: "/search?category=support#top",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                features: ["Executives", "Specialists", "Coordinators"],
              },
            ].map((category) => (
              <Link key={category.title} href={category.href} className="block">
                <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border">
                  <div className="relative h-40 w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                        <p className="text-sm text-white/80">{category.count} professionals</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/search#top">
              <Button variant="outline" className="transition-all duration-300 hover:bg-primary/10 hover:text-primary bg-transparent">
                View All Categories
                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Professionals</h2>
              <p className="text-muted-foreground max-w-2xl">Top-rated experts ready to help you</p>
            </div>
          </div>

          <FeaturedProfessionals />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                alt="Why choose HireEasy"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Why Choose HireEasy</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
                    <p className="text-muted-foreground">
                      All professionals undergo a thorough verification process to ensure quality and reliability.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
                    <p className="text-muted-foreground">
                      Connect directly with professionals via in-app chat, email, or phone call.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">
                      Our customer support team is available around the clock to assist you with any issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recruiters and professionals achieving great results on HireEasy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Johnson"
              role="Hiring Manager"
              image="https://randomuser.me/api/portraits/women/44.jpg"
              quote="We hired a talented senior developer through HireEasy in just 48 hours. The quality and professionalism exceeded our expectations!"
              rating={5}
            />
            <TestimonialCard
              name="Michael Chen"
              role="Software Engineer"
              image="https://randomuser.me/api/portraits/men/32.jpg"
              quote="I landed an amazing full-time role after joining HireEasy. Recruiters found me based on my profile and skills. Great platform!"
              rating={5}
            />
            <TestimonialCard
              name="Robert Williams"
              role="Recruitment Director"
              image="https://randomuser.me/api/portraits/men/46.jpg"
              quote="HireEasy streamlined our hiring process. We can now find and contact qualified professionals instantly without job postings."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find the Perfect Professional?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of users who have already found the right professionals for their needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/search#top">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 min-w-[180px]">
                Find Professionals
              </Button>
            </Link>
            <Link href="/login?redirect=/post-service#top">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 min-w-[180px]"
              >
                Join as Professional
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="text-3xl font-bold">50,000+</p>
              <p className="text-muted-foreground">Active Professionals</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <p className="text-3xl font-bold">10,000+</p>
              <p className="text-muted-foreground">Hires Completed</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <p className="text-3xl font-bold">500,000+</p>
              <p className="text-muted-foreground">Direct Messages</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
      <div id="top"></div>
    </div>
  )
}
