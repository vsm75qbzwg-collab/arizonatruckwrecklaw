import type React from "react"
import { Scale, TrendingUp, Heart } from "lucide-react"

type CredentialsContent = {
  section_label: string
  section_title: string
  items: Array<{ title: string; description: string }>
}

const iconMap: Record<number, React.ElementType> = {
  0: Scale,
  1: TrendingUp,
  2: Heart,
}

export function CredentialsSection({ content }: { content: CredentialsContent }) {
  const displayItems = content.items.slice(0, 3)

  return (
    <section id="credentials" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{content.section_label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{content.section_title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayItems.map((credential, index) => {
            const Icon = iconMap[index % 3] || Scale
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <Icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{credential.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{credential.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
