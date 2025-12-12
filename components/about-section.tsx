import Image from "next/image"

type AboutContent = {
  section_label: string
  name: string
  title: string
  paragraphs: string[]
  credentials_badges: string[]
  years_experience: string
}

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden border-4 border-accent/30">
              <Image
                src="/images/peter-gorski-headshot.jpg"
                alt={`${content.name}, Attorney at Law`}
                fill
                className="object-cover object-top"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-xl">
              <div className="text-center">
                <span className="block text-4xl font-bold">{content.years_experience}</span>
                <span className="text-sm">Years Experience</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm uppercase tracking-wider text-accent mb-2">{content.section_label}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.name}
              <span className="block text-xl font-normal text-primary-foreground/80 mt-2">{content.title}</span>
            </h2>

            <div className="space-y-4 text-primary-foreground/90 leading-relaxed">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {content.credentials_badges.map((badge, index) => (
                <div key={index} className="bg-primary-foreground/10 px-4 py-2 rounded">
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
