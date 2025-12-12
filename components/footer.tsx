import Link from "next/link"
import { Scale } from "lucide-react"

type FooterContent = {
  tagline: string
  copyright_text: string
  disclaimer: string
}

const defaultFooterContent: FooterContent = {
  tagline: "Strong on Results!!",
  copyright_text: "Gorski Injury Law. All rights reserved.",
  disclaimer:
    "This website is for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by using this site.",
}

export function Footer(props: { content?: FooterContent } = { content: defaultFooterContent }) {
  const footerContent = props.content ?? defaultFooterContent

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scale className="h-6 w-6" />
              <span className="text-lg font-bold">Gorski Injury Law</span>
            </Link>
            <p className="text-accent font-semibold mb-2">{footerContent.tagline}</p>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Dedicated to representing victims of catastrophic accidents throughout Arizona since 1983.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Practice Areas</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Commercial Truck Accidents</li>
              <li>Other Serious Vehicle Crashes</li>
              <li>Traumatic Head & Brain Injuries</li>
              <li>Spinal Injuries</li>
              <li>Wrongful Death</li>
              <li>Amputations</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="tel:9283691777" className="hover:text-accent transition-colors">
                  928-369-1777 (Pinetop)
                </a>
              </li>
              <li>
                <a href="tel:4807301777" className="hover:text-accent transition-colors">
                  480-730-1777 (Chandler)
                </a>
              </li>
              <li>
                <a href="mailto:peter@petergorski.com" className="hover:text-accent transition-colors">
                  peter@petergorski.com
                </a>
              </li>
              <li>Pinetop & Chandler, Arizona</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              &copy; {new Date().getFullYear()} {footerContent.copyright_text}
            </p>
            <p className="text-xs max-w-xl text-center md:text-right">{footerContent.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
