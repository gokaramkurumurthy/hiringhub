import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Shield, Globe, CheckCircle, Heart, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
            alt="Team collaboration"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-background"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About FindEasy</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connecting skilled professionals with clients who need their expertise since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6">
                FindEasy was founded in 2020 with a simple mission: to create a platform that connects skilled
                professionals with clients who need their expertise, making the process seamless and efficient for both
                parties.
              </p>
              <p className="text-lg mb-6">
                What started as a small startup with just 5 team members has grown into a thriving marketplace with
                thousands of professionals across various fields. Our journey has been driven by a passion for solving
                the common challenges faced by both service providers and clients.
              </p>
              <p className="text-lg">
                Today, FindEasy operates in over 50 cities, helping professionals grow their businesses while providing
                clients with easy access to quality services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-muted-foreground">Guided by strong values and a clear purpose</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-4">
                  To empower professionals to showcase their skills and grow their businesses while providing clients
                  with easy access to quality services through a transparent, secure, and efficient platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Connecting talent with opportunity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Building trust through transparency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Simplifying the service discovery process</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground mb-4">
                  To become the world's leading platform for connecting professionals and clients, creating economic
                  opportunities and improving lives through technology.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Global expansion across all service categories</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Innovative solutions for service delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Creating economic opportunities worldwide</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
              <p className="text-muted-foreground">
                We prioritize creating a secure environment through verification processes, secure payments, and
                transparent reviews.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-muted-foreground">
                We build features and policies that benefit both professionals and clients, creating a balanced
                ecosystem.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                We're committed to making professional services accessible to everyone, regardless of location or
                background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground">The passionate individuals driving FindEasy forward</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Co-Founder",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                bio: "Former tech executive with 15+ years of experience in marketplace platforms.",
              },
              {
                name: "Michael Chen",
                role: "CTO & Co-Founder",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                bio: "Software engineer with expertise in building scalable platforms and AI solutions.",
              },
              {
                name: "Jessica Martinez",
                role: "Chief Marketing Officer",
                image: "https://randomuser.me/api/portraits/women/63.jpg",
                bio: "Digital marketing strategist with a background in growth and user acquisition.",
              },
              {
                name: "David Thompson",
                role: "Chief Operations Officer",
                image: "https://randomuser.me/api/portraits/men/52.jpg",
                bio: "Operations expert focused on creating efficient processes and exceptional experiences.",
              },
            ].map((member, index) => (
              <div key={index} className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">Key milestones in our growth story</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

            <div className="space-y-12">
              {[
                {
                  year: "2020",
                  title: "FindEasy Founded",
                  description: "Started with a small team of 5 in San Francisco, focusing on tech professionals.",
                },
                {
                  year: "2021",
                  title: "Expanded Categories",
                  description: "Added education, healthcare, and home services to our platform.",
                },
                {
                  year: "2022",
                  title: "National Expansion",
                  description: "Expanded to 25 major cities across the United States.",
                },
                {
                  year: "2023",
                  title: "Mobile App Launch",
                  description: "Released our mobile applications for iOS and Android.",
                },
                {
                  year: "2024",
                  title: "International Launch",
                  description: "Expanded to Canada, UK, and Australia, with plans for further global growth.",
                },
              ].map((milestone, index) => (
                <div key={index} className="relative flex items-center">
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 ml-auto"}`}>
                    <div className="bg-card p-6 rounded-lg border shadow-sm">
                      <div className="text-primary font-bold text-xl mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FindEasy by the Numbers</h2>
            <p className="text-lg text-muted-foreground">Our impact in connecting professionals and clients</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-lg font-medium">Cities</p>
              <p className="text-sm text-muted-foreground">Across 4 countries</p>
            </div>

            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <p className="text-lg font-medium">Professionals</p>
              <p className="text-sm text-muted-foreground">Verified experts</p>
            </div>

            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">100k+</div>
              <p className="text-lg font-medium">Clients</p>
              <p className="text-sm text-muted-foreground">Satisfied customers</p>
            </div>

            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">250k+</div>
              <p className="text-lg font-medium">Services</p>
              <p className="text-sm text-muted-foreground">Successfully completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What People Say About Us</h2>
            <p className="text-lg text-muted-foreground">Testimonials from our community</p>
          </div>

          <Tabs defaultValue="professionals" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="professionals">Professionals</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="professionals" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "James Wilson",
                    role: "Software Engineer",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    quote:
                      "FindEasy has transformed my freelance career. I've been able to connect with clients I would never have found otherwise and grow my business significantly.",
                  },
                  {
                    name: "Maria Garcia",
                    role: "Spanish Teacher",
                    image: "https://randomuser.me/api/portraits/women/68.jpg",
                    quote:
                      "As a language teacher, finding new students was always challenging. With FindEasy, I now have a steady stream of students and can focus on what I love - teaching.",
                  },
                  {
                    name: "Robert Smith",
                    role: "Physical Therapist",
                    image: "https://randomuser.me/api/portraits/men/41.jpg",
                    quote:
                      "The platform makes it easy to manage appointments, communicate with clients, and handle payments. It's been a game-changer for my practice.",
                  },
                ].map((testimonial, index) => (
                  <Card key={index} className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clients" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Emily Davis",
                    role: "Small Business Owner",
                    image: "https://randomuser.me/api/portraits/women/42.jpg",
                    quote:
                      "FindEasy helped me find a web developer for my small business website. The process was smooth, and I was able to choose from several qualified professionals.",
                  },
                  {
                    name: "Michael Johnson",
                    role: "Parent",
                    image: "https://randomuser.me/api/portraits/men/22.jpg",
                    quote:
                      "Finding a math tutor for my daughter was so easy with this platform. We were able to read reviews, compare rates, and find the perfect match.",
                  },
                  {
                    name: "Sarah Miller",
                    role: "Homeowner",
                    image: "https://randomuser.me/api/portraits/women/42.jpg",
                    quote:
                      "When I needed urgent plumbing repairs, FindEasy connected me with a qualified professional within hours. The service was excellent and reasonably priced.",
                  },
                ].map((testimonial, index) => (
                  <Card key={index} className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-lg text-muted-foreground">Organizations we work with to deliver the best experience</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex justify-center">
                <div className="h-16 w-40 bg-muted/50 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">Partner {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
            <p className="text-xl mb-8 text-white/80">
              Whether you're a professional looking to grow your business or a client seeking services, FindEasy is here
              to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login?tab=signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Add missing components
const Avatar = ({ className, children }) => (
  <div className={`relative rounded-full overflow-hidden ${className}`}>{children}</div>
)

const AvatarImage = ({ src, alt }) => (
  <Image src={src || "/placeholder.svg"} alt={alt || ""} fill className="object-cover" />
)

const AvatarFallback = ({ children }) => (
  <div className="bg-muted flex items-center justify-center w-full h-full text-foreground font-medium">{children}</div>
)
