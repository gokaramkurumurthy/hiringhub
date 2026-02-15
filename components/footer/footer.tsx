import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                <span className="font-semibold text-sm text-primary-foreground">FE</span>
              </div>
              <span className="font-bold text-xl">FindEasy</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Connect with professionals across various fields quickly and easily.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find Professionals
                </Link>
              </li>
              <li>
                <Link href="/post-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Post a Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/search?category=technology"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=education"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Education
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter to get updates on new professionals and features.
            </p>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FindEasy. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
