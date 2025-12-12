import { createClient } from "@/lib/supabase/server"

export type SiteContent = {
  hero: {
    heading_line1: string
    heading_line2: string
    subheading: string
    trust_indicators: string[]
    cta_primary: string
    cta_secondary: string
    appointment_notice: string
  }
  credentials: {
    section_label: string
    section_title: string
    items: Array<{ title: string; description: string }>
  }
  practice_areas: {
    section_label: string
    section_title: string
    section_description: string
    items: Array<{ title: string; description: string }>
  }
  about: {
    section_label: string
    name: string
    title: string
    paragraphs: string[]
    credentials_badges: string[]
    years_experience: string
  }
  contact: {
    section_label: string
    section_title: string
    section_description: string
    phone: string
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
  footer: {
    tagline: string
    copyright_text: string
    disclaimer: string
  }
  site_settings: {
    firm_name: string
    phone: string
    email: string
  }
}

// Default content fallback
const defaultContent: SiteContent = {
  hero: {
    heading_line1: "Commercial Trucking &",
    heading_line2: "Severe Injury Attorneys",
    subheading: "Over 40 years of experience fighting for victims of catastrophic accidents.",
    trust_indicators: ["Since 1983", "Academy of Truck Accident Attorneys", "Keenan Trial Institute Graduate"],
    cta_primary: "Request Free Consultation",
    cta_secondary: "Call 928.369.1777",
    appointment_notice: "By Appointment Only — Offices in Pinetop and Chandler, Arizona",
  },
  credentials: {
    section_label: "Why Choose Us",
    section_title: "Credentials That Matter",
    items: [],
  },
  practice_areas: {
    section_label: "Our Focus",
    section_title: "Severe Injury & Wrongful Death Cases",
    section_description: "",
    items: [],
  },
  about: {
    section_label: "Meet Your Attorney",
    name: "Peter Gorski",
    title: "Attorney at Law, Since 1983",
    paragraphs: [],
    credentials_badges: [],
    years_experience: "40+",
  },
  contact: {
    section_label: "Get Started",
    section_title: "Request Your Free Consultation",
    section_description: "",
    phone: "928.369.1777",
    email: "peter@petergorski.com",
    availability: "By Appointment Only",
    locations: [],
    cta_box: {
      title: "Injured in a Truck Accident?",
      description: "",
      benefits: [],
      cta_primary: "Start Your Case Review",
      cta_secondary: "Call Now",
    },
  },
  footer: {
    tagline: "Strong on Results!!",
    copyright_text: "Gorski Injury Law. All rights reserved.",
    disclaimer: "",
  },
  site_settings: {
    firm_name: "Gorski Injury Law",
    phone: "928.369.1777",
    email: "peter@petergorski.com",
  },
}

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("site_content").select("section_key, content")

  if (error || !data) {
    console.error("Error fetching site content:", error)
    return defaultContent
  }

  const content = { ...defaultContent }

  for (const row of data) {
    const key = row.section_key as keyof SiteContent
    if (key in content) {
      content[key] = row.content as any
    }
  }

  return content
}

export async function getSectionContent<K extends keyof SiteContent>(sectionKey: K): Promise<SiteContent[K]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("site_content").select("content").eq("section_key", sectionKey).single()

  if (error || !data) {
    return defaultContent[sectionKey]
  }

  return data.content as SiteContent[K]
}
