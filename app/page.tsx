import { Header } from "@/components/header"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { HeroSection } from "@/components/hero-section"
import { CredentialsSection } from "@/components/credentials-section"
import { PracticeAreasSection } from "@/components/practice-areas-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getSiteContent } from "@/lib/content"

export default async function HomePage() {
  const content = await getSiteContent()

  return (
    <main className="min-h-screen">
      <AnnouncementBanner />
      <Header />
      <HeroSection content={content.hero} />
      <CredentialsSection content={content.credentials} />
      <PracticeAreasSection content={content.practice_areas} />
      <AboutSection content={content.about} />
      <ContactSection content={content.contact} />
      <Footer content={content.footer} />
    </main>
  )
}
