import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type ContactContent = {
  section_label: string
  section_title: string
  section_description: string
  phone_pinetop: string
  phone_chandler: string
  email: string
  availability: string
  locations: Array<{ name: string; description: string }>
  cta_box: {
    title: string
    description: string
    benefits: string[]
    cta_primary: string
    cta_secondary: string
  }
}

export function ContactSection({ content }: { content: ContactContent }) {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{content.section_label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{content.section_title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content.section_description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>

              <div className="space-y-4">
                <a href="tel:9283691777" className="flex items-center gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">White Mountains & Surrounding Areas</p>
                    <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {content.phone_pinetop}
                    </p>
                  </div>
                </a>

                <a href="tel:4807301777" className="flex items-center gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valleywide & Throughout Arizona</p>
                    <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {content.phone_chandler}
                    </p>
                  </div>
                </a>

                <a href={`mailto:${content.email}`} className="flex items-center gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {content.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="text-lg font-semibold text-foreground">{content.availability}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Office Locations</h3>

              <div className="space-y-4">
                {content.locations.map((location, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{location.name}</p>
                      <p className="text-muted-foreground">{location.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-primary text-primary-foreground p-8 md:p-10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{content.cta_box.title}</h3>
            <p className="text-primary-foreground/90 mb-6 leading-relaxed">{content.cta_box.description}</p>

            <ul className="space-y-3 mb-8">
              {content.cta_box.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 mb-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg">
                <a href="tel:4807301777">
                  <Phone className="mr-2 h-5 w-5" />
                  CALL NOW (480) 730-1777
                </a>
              </Button>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/intake">{content.cta_box.cta_primary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
