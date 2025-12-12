"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, X } from "lucide-react"

type AboutContent = {
  section_label: string
  name: string
  title: string
  paragraphs: string[]
  credentials_badges: string[]
  years_experience: string
}

export function AboutEditor({
  content,
  onSave,
  isSaving,
}: {
  content: Partial<AboutContent>
  onSave: (data: AboutContent) => void
  isSaving: boolean
}) {
  const [data, setData] = useState<AboutContent>({
    section_label: content.section_label || "",
    name: content.name || "",
    title: content.title || "",
    paragraphs: content.paragraphs || [],
    credentials_badges: content.credentials_badges || [],
    years_experience: content.years_experience || "",
  })

  useEffect(() => {
    setData({
      section_label: content.section_label || "",
      name: content.name || "",
      title: content.title || "",
      paragraphs: content.paragraphs || [],
      credentials_badges: content.credentials_badges || [],
      years_experience: content.years_experience || "",
    })
  }, [content])

  const addParagraph = () => {
    setData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }))
  }

  const updateParagraph = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) => (i === index ? value : p)),
    }))
  }

  const removeParagraph = (index: number) => {
    setData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }))
  }

  const addBadge = () => {
    setData((prev) => ({
      ...prev,
      credentials_badges: [...prev.credentials_badges, ""],
    }))
  }

  const updateBadge = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      credentials_badges: prev.credentials_badges.map((b, i) => (i === index ? value : b)),
    }))
  }

  const removeBadge = (index: number) => {
    setData((prev) => ({
      ...prev,
      credentials_badges: prev.credentials_badges.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="section_label">Section Label</Label>
          <Input
            id="section_label"
            value={data.section_label}
            onChange={(e) => setData((prev) => ({ ...prev, section_label: e.target.value }))}
            placeholder="Meet Your Attorney"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Attorney Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Peter Gorski"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Attorney at Law, Since 1983"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="years_experience">Years Experience (for badge)</Label>
          <Input
            id="years_experience"
            value={data.years_experience}
            onChange={(e) => setData((prev) => ({ ...prev, years_experience: e.target.value }))}
            placeholder="40+"
          />
        </div>

        <div className="grid gap-2">
          <Label>Bio Paragraphs</Label>
          <div className="space-y-3">
            {data.paragraphs.map((paragraph, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={paragraph}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  placeholder="Paragraph content..."
                  rows={3}
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeParagraph(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addParagraph}>
              <Plus className="h-4 w-4 mr-2" />
              Add Paragraph
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Credentials Badges</Label>
          <div className="space-y-2">
            {data.credentials_badges.map((badge, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={badge}
                  onChange={(e) => updateBadge(index, e.target.value)}
                  placeholder="e.g., Keenan Trial Institute Graduate"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeBadge(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addBadge}>
              <Plus className="h-4 w-4 mr-2" />
              Add Badge
            </Button>
          </div>
        </div>
      </div>

      <Button onClick={() => onSave(data)} disabled={isSaving}>
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}
