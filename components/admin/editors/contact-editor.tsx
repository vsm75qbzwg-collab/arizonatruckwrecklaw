"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, X } from "lucide-react"

type ContactContent = {
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

export function ContactEditor({
  content,
  onSave,
  isSaving,
}: {
  content: Partial<ContactContent>
  onSave: (data: ContactContent) => void
  isSaving: boolean
}) {
  const [data, setData] = useState<ContactContent>({
    section_label: content.section_label || "",
    section_title: content.section_title || "",
    section_description: content.section_description || "",
    phone: content.phone || "",
    email: content.email || "",
    availability: content.availability || "",
    locations: content.locations || [],
    cta_box: content.cta_box || {
      title: "",
      description: "",
      benefits: [],
      cta_primary: "",
      cta_secondary: "",
    },
  })

  useEffect(() => {
    setData({
      section_label: content.section_label || "",
      section_title: content.section_title || "",
      section_description: content.section_description || "",
      phone: content.phone || "",
      email: content.email || "",
      availability: content.availability || "",
      locations: content.locations || [],
      cta_box: content.cta_box || {
        title: "",
        description: "",
        benefits: [],
        cta_primary: "",
        cta_secondary: "",
      },
    })
  }, [content])

  const addLocation = () => {
    setData((prev) => ({
      ...prev,
      locations: [...prev.locations, { name: "", description: "" }],
    }))
  }

  const updateLocation = (index: number, field: "name" | "description", value: string) => {
    setData((prev) => ({
      ...prev,
      locations: prev.locations.map((loc, i) => (i === index ? { ...loc, [field]: value } : loc)),
    }))
  }

  const removeLocation = (index: number) => {
    setData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }))
  }

  const addBenefit = () => {
    setData((prev) => ({
      ...prev,
      cta_box: {
        ...prev.cta_box,
        benefits: [...prev.cta_box.benefits, ""],
      },
    }))
  }

  const updateBenefit = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      cta_box: {
        ...prev.cta_box,
        benefits: prev.cta_box.benefits.map((b, i) => (i === index ? value : b)),
      },
    }))
  }

  const removeBenefit = (index: number) => {
    setData((prev) => ({
      ...prev,
      cta_box: {
        ...prev.cta_box,
        benefits: prev.cta_box.benefits.filter((_, i) => i !== index),
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="section_label">Section Label</Label>
            <Input
              id="section_label"
              value={data.section_label}
              onChange={(e) => setData((prev) => ({ ...prev, section_label: e.target.value }))}
              placeholder="Get Started"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="section_title">Section Title</Label>
            <Input
              id="section_title"
              value={data.section_title}
              onChange={(e) => setData((prev) => ({ ...prev, section_title: e.target.value }))}
              placeholder="Request Your Free Consultation"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="section_description">Section Description</Label>
          <Textarea
            id="section_description"
            value={data.section_description}
            onChange={(e) => setData((prev) => ({ ...prev, section_description: e.target.value }))}
            rows={2}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="928.369.1777"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={data.email}
              onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="peter@petergorski.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="availability">Availability</Label>
            <Input
              id="availability"
              value={data.availability}
              onChange={(e) => setData((prev) => ({ ...prev, availability: e.target.value }))}
              placeholder="By Appointment Only"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Office Locations</Label>
          <div className="space-y-3">
            {data.locations.map((loc, index) => (
              <div key={index} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Location {index + 1}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeLocation(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={loc.name}
                  onChange={(e) => updateLocation(index, "name", e.target.value)}
                  placeholder="Office name"
                />
                <Input
                  value={loc.description}
                  onChange={(e) => updateLocation(index, "description", e.target.value)}
                  placeholder="Location description"
                />
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addLocation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="font-semibold mb-4">CTA Box</h3>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>CTA Title</Label>
              <Input
                value={data.cta_box.title}
                onChange={(e) => setData((prev) => ({ ...prev, cta_box: { ...prev.cta_box, title: e.target.value } }))}
                placeholder="Injured in a Truck Accident?"
              />
            </div>

            <div className="grid gap-2">
              <Label>CTA Description</Label>
              <Textarea
                value={data.cta_box.description}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, cta_box: { ...prev.cta_box, description: e.target.value } }))
                }
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label>Benefits List</Label>
              <div className="space-y-2">
                {data.cta_box.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      placeholder="Benefit..."
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Primary CTA Text</Label>
                <Input
                  value={data.cta_box.cta_primary}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, cta_box: { ...prev.cta_box, cta_primary: e.target.value } }))
                  }
                  placeholder="Start Your Case Review"
                />
              </div>
              <div className="grid gap-2">
                <Label>Secondary CTA Text</Label>
                <Input
                  value={data.cta_box.cta_secondary}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, cta_box: { ...prev.cta_box, cta_secondary: e.target.value } }))
                  }
                  placeholder="Call Now"
                />
              </div>
            </div>
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
