"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, X } from "lucide-react"

type HeroContent = {
  heading_line1: string
  heading_line2: string
  subheading: string
  trust_indicators: string[]
  cta_primary: string
  cta_secondary: string
  appointment_notice: string
}

export function HeroEditor({
  content,
  onSave,
  isSaving,
}: {
  content: Partial<HeroContent>
  onSave: (data: HeroContent) => void
  isSaving: boolean
}) {
  const [data, setData] = useState<HeroContent>({
    heading_line1: content.heading_line1 || "",
    heading_line2: content.heading_line2 || "",
    subheading: content.subheading || "",
    trust_indicators: content.trust_indicators || [],
    cta_primary: content.cta_primary || "",
    cta_secondary: content.cta_secondary || "",
    appointment_notice: content.appointment_notice || "",
  })

  useEffect(() => {
    setData({
      heading_line1: content.heading_line1 || "",
      heading_line2: content.heading_line2 || "",
      subheading: content.subheading || "",
      trust_indicators: content.trust_indicators || [],
      cta_primary: content.cta_primary || "",
      cta_secondary: content.cta_secondary || "",
      appointment_notice: content.appointment_notice || "",
    })
  }, [content])

  const addTrustIndicator = () => {
    setData((prev) => ({
      ...prev,
      trust_indicators: [...prev.trust_indicators, ""],
    }))
  }

  const updateTrustIndicator = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      trust_indicators: prev.trust_indicators.map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeTrustIndicator = (index: number) => {
    setData((prev) => ({
      ...prev,
      trust_indicators: prev.trust_indicators.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="heading_line1">Heading Line 1</Label>
          <Input
            id="heading_line1"
            value={data.heading_line1}
            onChange={(e) => setData((prev) => ({ ...prev, heading_line1: e.target.value }))}
            placeholder="Commercial Trucking &"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="heading_line2">Heading Line 2 (Highlighted)</Label>
          <Input
            id="heading_line2"
            value={data.heading_line2}
            onChange={(e) => setData((prev) => ({ ...prev, heading_line2: e.target.value }))}
            placeholder="Severe Injury Attorneys"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subheading">Subheading</Label>
          <Textarea
            id="subheading"
            value={data.subheading}
            onChange={(e) => setData((prev) => ({ ...prev, subheading: e.target.value }))}
            placeholder="Over 40 years of experience..."
            rows={3}
          />
        </div>

        <div className="grid gap-2">
          <Label>Trust Indicators</Label>
          <div className="space-y-2">
            {data.trust_indicators.map((indicator, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={indicator}
                  onChange={(e) => updateTrustIndicator(index, e.target.value)}
                  placeholder="e.g., Since 1983"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeTrustIndicator(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addTrustIndicator}>
              <Plus className="h-4 w-4 mr-2" />
              Add Indicator
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="cta_primary">Primary CTA Text</Label>
            <Input
              id="cta_primary"
              value={data.cta_primary}
              onChange={(e) => setData((prev) => ({ ...prev, cta_primary: e.target.value }))}
              placeholder="Request Free Consultation"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cta_secondary">Secondary CTA Text</Label>
            <Input
              id="cta_secondary"
              value={data.cta_secondary}
              onChange={(e) => setData((prev) => ({ ...prev, cta_secondary: e.target.value }))}
              placeholder="Call 928.369.1777"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="appointment_notice">Appointment Notice</Label>
          <Input
            id="appointment_notice"
            value={data.appointment_notice}
            onChange={(e) => setData((prev) => ({ ...prev, appointment_notice: e.target.value }))}
            placeholder="By Appointment Only..."
          />
        </div>
      </div>

      <Button onClick={() => onSave(data)} disabled={isSaving}>
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}
