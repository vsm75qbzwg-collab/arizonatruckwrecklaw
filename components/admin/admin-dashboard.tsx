"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, LogOut, Eye, Home, FileText, Award, Briefcase, User, Phone, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { HeroEditor } from "./editors/hero-editor"
import { CredentialsEditor } from "./editors/credentials-editor"
import { PracticeAreasEditor } from "./editors/practice-areas-editor"
import { AboutEditor } from "./editors/about-editor"
import { ContactEditor } from "./editors/contact-editor"
import { FooterEditor } from "./editors/footer-editor"

type ContentRow = {
  id: string
  section_key: string
  content: Record<string, any>
  updated_at: string
}

const sectionIcons: Record<string, React.ElementType> = {
  hero: Home,
  credentials: Award,
  practice_areas: Briefcase,
  about: User,
  contact: Phone,
  footer: FileText,
  site_settings: Settings,
}

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  credentials: "Credentials",
  practice_areas: "Practice Areas",
  about: "About Section",
  contact: "Contact Section",
  footer: "Footer",
  site_settings: "Site Settings",
}

export function AdminDashboard({
  user,
  initialContent,
}: {
  user: SupabaseUser
  initialContent: ContentRow[]
}) {
  const [content, setContent] = useState<ContentRow[]>(initialContent)
  const [activeTab, setActiveTab] = useState("hero")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const getContentByKey = (key: string) => {
    return content.find((c) => c.section_key === key)?.content || {}
  }

  const updateContent = async (sectionKey: string, newContent: Record<string, any>) => {
    setIsSaving(true)
    setSaveMessage(null)

    const supabase = createClient()

    const { error } = await supabase
      .from("site_content")
      .update({
        content: newContent,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })
      .eq("section_key", sectionKey)

    if (error) {
      setSaveMessage("Error saving changes")
      console.error("Save error:", error)
    } else {
      setSaveMessage("Changes saved successfully!")
      setContent((prev) =>
        prev.map((c) =>
          c.section_key === sectionKey ? { ...c, content: newContent, updated_at: new Date().toISOString() } : c,
        ),
      )
    }

    setIsSaving(false)
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const sections = ["hero", "credentials", "practice_areas", "about", "contact", "footer"]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
        <div className="flex items-center gap-2 text-primary mb-8">
          <Scale className="h-6 w-6" />
          <span className="font-bold">Admin Portal</span>
        </div>

        <nav className="flex-1 space-y-1">
          {sections.map((section) => {
            const Icon = sectionIcons[section] || FileText
            return (
              <button
                key={section}
                onClick={() => setActiveTab(section)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === section ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {sectionLabels[section]}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-border pt-4 space-y-2">
          <Button asChild variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              View Site
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            size="sm"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{sectionLabels[activeTab]}</h1>
              <p className="text-sm text-muted-foreground">Edit the content displayed on your website</p>
            </div>

            {saveMessage && (
              <div
                className={`px-4 py-2 rounded-lg text-sm ${
                  saveMessage.includes("Error")
                    ? "bg-destructive/10 text-destructive"
                    : "bg-green-500/10 text-green-600"
                }`}
              >
                {saveMessage}
              </div>
            )}
          </div>

          <Card>
            <CardContent className="pt-6">
              {activeTab === "hero" && (
                <HeroEditor
                  content={getContentByKey("hero")}
                  onSave={(data) => updateContent("hero", data)}
                  isSaving={isSaving}
                />
              )}
              {activeTab === "credentials" && (
                <CredentialsEditor
                  content={getContentByKey("credentials")}
                  onSave={(data) => updateContent("credentials", data)}
                  isSaving={isSaving}
                />
              )}
              {activeTab === "practice_areas" && (
                <PracticeAreasEditor
                  content={getContentByKey("practice_areas")}
                  onSave={(data) => updateContent("practice_areas", data)}
                  isSaving={isSaving}
                />
              )}
              {activeTab === "about" && (
                <AboutEditor
                  content={getContentByKey("about")}
                  onSave={(data) => updateContent("about", data)}
                  isSaving={isSaving}
                />
              )}
              {activeTab === "contact" && (
                <ContactEditor
                  content={getContentByKey("contact")}
                  onSave={(data) => updateContent("contact", data)}
                  isSaving={isSaving}
                />
              )}
              {activeTab === "footer" && (
                <FooterEditor
                  content={getContentByKey("footer")}
                  onSave={(data) => updateContent("footer", data)}
                  isSaving={isSaving}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
