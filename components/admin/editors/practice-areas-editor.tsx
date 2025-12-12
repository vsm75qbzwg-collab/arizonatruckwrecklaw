"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, X } from "lucide-react"

type PracticeAreasContent = {
  section_label: string
  section_title: string
  section_description: string
  items: Array<{ title: string; description: string }>
}

export function PracticeAreasEditor({
  content,
  onSave,
  isSaving,
}: {
  content: Partial<PracticeAreasContent>
  onSave: (data: PracticeAreasContent) => void
  isSaving: boolean
}) {
  const [data, setData] = useState<PracticeAreasContent>({
    section_label: content.section_label || "",
    section_title: content.section_title || "",
    section_description: content.section_description || "",
    items: content.items || [],
  })

  useEffect(() => {
    setData({
      section_label: content.section_label || "",
      section_title: content.section_title || "",
      section_description: content.section_description || "",
      items: content.items || [],
    })
  }, [content])

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { title: "", description: "" }],
    }))
  }

  const updateItem = (index: number, field: "title" | "description", value: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const removeItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
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
              placeholder="Our Focus"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="section_title">Section Title</Label>
            <Input
              id="section_title"
              value={data.section_title}
              onChange={(e) => setData((prev) => ({ ...prev, section_title: e.target.value }))}
              placeholder="Practice Areas"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="section_description">Section Description</Label>
          <Textarea
            id="section_description"
            value={data.section_description}
            onChange={(e) => setData((prev) => ({ ...prev, section_description: e.target.value }))}
            placeholder="We exclusively handle..."
            rows={2}
          />
        </div>

        <div className="grid gap-2">
          <Label>Practice Areas</Label>
          <div className="space-y-4">
            {data.items.map((item, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Practice Area {index + 1}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={item.title}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                  placeholder="Practice area title"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, "description", e.target.value)}
                  placeholder="Description"
                  rows={2}
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Practice Area
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
