import type React from "react"
import { Truck, Brain, Activity, Skull, Car, Flame } from "lucide-react"
import Link from "next/link"
import { AlertTriangle, MapPin } from "lucide-react"

type PracticeAreasContent = {
  section_label: string
  section_title: string
  section_description: string
  detailed_description?: string
  accident_causes?: string
  injury_types?: string
  service_area?: string
  items: Array<{ title: string; description: string }>
}

const iconMap: Record<number, React.ElementType> = {
  0: Truck,
  1: Car,
  2: Brain,
  3: Activity,
  4: Skull,
  5: Flame,
}

const practiceAreas = [
  {
    title: "Commercial Truck Accidents",
    description: "Semi-trucks, 18-wheelers, and commercial vehicle collisions involving catastrophic injuries.",
  },
  {
    title: "Automobile Accidents",
    description: "Cases involving cars, SUVs, and other passenger vehicles.",
  },
  {
    title: "Traumatic Brain Injuries",
    description: "Concussions, skull fractures, and severe brain trauma from accidents.",
  },
  {
    title: "Spinal Cord Injuries",
    description: "Paralysis, herniated discs, and other debilitating spinal injuries.",
  },
  {
    title: "Severe Burns",
    description: "Third-degree burns, disfigurement, and long-term burn injury treatment cases.",
  },
  {
    title: "Wrongful Death",
    description: "Compassionate representation for families who have lost loved ones.",
  },
]

const defaultContent: PracticeAreasContent = {
  section_label: "Our Focus",
  section_title: "Areas of Practice",
  section_description:
    "We focus on tractor trailer, flat bed, dump, cement, logging, gravel, tanker, and other big rig trucks, delivery trucks of all sizes, buses, and other commercial motor vehicles and the liability insurance companies that represent them. We also handle auto, motorcycle, bicycle accidents and pedestrians hit by vehicles.",
  items: practiceAreas,
}

export function PracticeAreasSection({ content = defaultContent }: { content?: PracticeAreasContent }) {
  return (
    <section id="practice-areas" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{content.section_label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{content.section_title}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">{content.section_description}</p>
        </div>

        {(content.accident_causes || content.injury_types || content.service_area) && (
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
            {content.accident_causes && (
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-card-foreground">Accident Causes</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{content.accident_causes}</p>
              </div>
            )}

            {content.injury_types && (
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <Activity className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-card-foreground">Injury Types</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{content.injury_types}</p>
              </div>
            )}

            {content.service_area && (
              <div className="bg-card p-6 rounded-lg border border-border md:col-span-2">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-card-foreground">Service Area & Client Base</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{content.service_area}</p>
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((area, index) => {
            const Icon = iconMap[index % 6] || Truck
            return (
              <Link
                key={index}
                href="#contact"
                className="group bg-card p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
