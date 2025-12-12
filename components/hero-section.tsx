import { Button } from "@/components/ui/button"
import { Scale, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

type HeroContent = {
  heading_line1: string
  heading_line2: string
  subheading: string
  trust_indicators: string[]
  cta_primary: string
  cta_secondary: string
  appointment_notice: string
}

export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section className="relative bg-primary text-primary-foreground py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl">
          {/* Scale Icon */}
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-10 w-10 md:h-12 md:w-12 text-accent" />
            <div className="h-px bg-accent/50 w-16 md:w-24" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
            {content.heading_line1}
            <span className="block text-accent">{content.heading_line2}</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
            {content.subheading}
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 mb-10 text-sm text-primary-foreground/80">
            {content.trust_indicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>{indicator}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base">
              <Link href="#contact">
                {content.cta_primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white text-base font-bold">
              <a href="tel:4807301777">
                <Phone className="mr-2 h-5 w-5" />
                CALL NOW (480) 730-1777
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-primary-foreground/80">
            <a href="tel:9283691777" className="hover:text-accent transition-colors">
              📞 928-369-1777 — White Mountains & Surrounding Areas
            </a>
            <a href="tel:4807301777" className="hover:text-accent transition-colors">
              📞 480-730-1777 — Valleywide & Throughout Arizona
            </a>
          </div>

          {/* Appointment Notice */}
          <p className="mt-8 text-sm text-primary-foreground/70 italic">{content.appointment_notice}</p>
        </div>
      </div>
    </section>
  )
}
