"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`)

    return (
      <Link href={href} className="relative px-3 py-2 inline-block">
        <span
          className={cn(
            "text-sm transition-colors",
            isActive ? "text-primary font-medium" : "text-foreground hover:text-primary",
          )}
        >
          {children}
        </span>
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-primary transition-transform duration-200 ease-out",
            "inline-block",
            isActive ? "w-full" : "w-0 group-hover:w-full",
          )}
          style={{
            width: isActive ? "100%" : "0%",
            transformOrigin: "left",
            transition: "width 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!isActive) e.currentTarget.style.width = "100%"
          }}
          onMouseLeave={(e) => {
            if (!isActive) e.currentTarget.style.width = "0%"
          }}
        />
      </Link>
    )
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-white dark:bg-gray-900 border-b shadow-md"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                <span className="font-semibold text-sm text-primary-foreground">FE</span>
              </div>
              <span className="font-bold text-xl text-primary">FindEasy</span>
            </Link>

            <div className="hidden md:flex ml-8">
              <div className="flex gap-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/search">Find Professionals</NavLink>
                <NavLink href="/about">About Us</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-3">
            {isAuthenticated ? (
              <>
                <ModeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full md:h-auto md:w-auto md:pl-3 md:pr-1"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                          alt={user?.displayName || "User"}
                        />
                        <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline font-medium text-sm ml-2">{user?.displayName || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email || "user@example.com"}
                        </p>
                        <p className="text-xs leading-none text-primary font-medium capitalize mt-1">{user?.role}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.role === "professional" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/post-service">Professional Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/account-settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <ModeToggle />

                <div className="hidden md:block">
                  <Link href="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                </div>

                <div className="hidden md:block">
                  <Link href="/login?tab=signup">
                    <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
                  </Link>
                </div>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 py-6">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                      <span className="font-semibold text-sm text-primary-foreground">FE</span>
                    </div>
                    <span className="font-bold text-xl text-primary">FindEasy</span>
                  </div>

                  <div className="grid gap-3">
                    <Link href="/">
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start", pathname === "/" && "text-primary bg-primary/10")}
                      >
                        Home
                      </Button>
                    </Link>
                    <Link href="/search">
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start", pathname === "/search" && "text-primary bg-primary/10")}
                      >
                        Find Professionals
                      </Button>
                    </Link>
                    <Link href={isAuthenticated ? "/post-service" : "/login?redirect=/post-service"}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          pathname === "/post-service" && "text-primary bg-primary/10",
                        )}
                      >
                        Join as Professional
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start", pathname === "/about" && "text-primary bg-primary/10")}
                      >
                        About Us
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start", pathname === "/contact" && "text-primary bg-primary/10")}
                      >
                        Contact
                      </Button>
                    </Link>

                    {isAuthenticated ? (
                      <>
                        <Link href="/dashboard">
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start",
                              pathname === "/dashboard" && "text-primary bg-primary/10",
                            )}
                          >
                            Dashboard
                          </Button>
                        </Link>
                        <Link href="/chat">
                          <Button
                            variant="ghost"
                            className={cn("w-full justify-start", pathname === "/chat" && "text-primary bg-primary/10")}
                          >
                            Messages
                          </Button>
                        </Link>
                        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                          Log Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button variant="outline" className="w-full bg-transparent">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/login?tab=signup">
                          <Button className="w-full bg-primary hover:bg-primary/90">Sign Up</Button>
                        </Link>
                      </>
                    )}

                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
