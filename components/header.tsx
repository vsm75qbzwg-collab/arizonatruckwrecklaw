"use client"

import { useState } from "react"
import Link from "next/link"
import { Scale, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 md:h-8 md:w-8" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight">Gorski Injury Law</span>
              <span className="text-xs text-primary-foreground/80 hidden sm:block">Strong on Results</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#practice-areas" className="text-sm hover:text-accent transition-colors">
              Practice Areas
            </Link>
            <Link href="#about" className="text-sm hover:text-accent transition-colors">
              About
            </Link>
            <Link href="#credentials" className="text-sm hover:text-accent transition-colors">
              Credentials
            </Link>
            <Link href="#contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col text-xs leading-tight">
              <a href="tel:9283691777" className="flex items-center gap-1 hover:text-accent transition-colors">
                <Phone className="h-3 w-3" />
                <span>928-369-1777 (Pinetop)</span>
              </a>
              <a href="tel:4807301777" className="flex items-center gap-1 hover:text-accent transition-colors">
                <Phone className="h-3 w-3" />
                <span>480-730-1777 (Chandler)</span>
              </a>
            </div>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#contact">Free Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-4">
              <Link
                href="#practice-areas"
                className="text-sm hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice Areas
              </Link>
              <Link
                href="#about"
                className="text-sm hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#credentials"
                className="text-sm hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Credentials
              </Link>
              <Link
                href="#contact"
                className="text-sm hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 text-sm">
                <a href="tel:9283691777" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>928-369-1777 (Pinetop)</span>
                </a>
                <a href="tel:4807301777" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>480-730-1777 (Chandler)</span>
                </a>
              </div>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 w-fit">
                <Link href="#contact">Free Consultation</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
