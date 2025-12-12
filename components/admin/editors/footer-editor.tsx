"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

type FooterContent = {
  tagline: string
  copyright_text: string
  disclaimer: string
}

export function FooterEditor({
  content,
  onSave,
  isSaving,
}: {
  content: Partial<FooterContent>
  onSave: (data: FooterContent) => void
  isSaving: boolean
}) {
  const [data, setData] = useState<FooterContent>({
    tagline: content.tagline || "",
    copyright_text: content.copyright_text || "",
    disclaimer: content.disclaimer || "",
  })

  useEffect(() => {
    setData({
      tagline: content.tagline || "",
      copyright_text: content.copyright_text || "",
      disclaimer: content.disclaimer || "",
    })
  }, [content])

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={data.tagline}
            onChange={(e) => setData((prev) => ({ ...prev, tagline: e.target.value }))}
            placeholder="Strong on Results!!"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="copyright_text">Copyright Text</Label>
          <Input
            id="copyright_text"
            value={data.copyright_text}
            onChange={(e) => setData((prev) => ({ ...prev, copyright_text: e.target.value }))}
            placeholder="Gorski Injury Law. All rights reserved."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="disclaimer">Legal Disclaimer</Label>
          <Textarea
            id="disclaimer"
            value={data.disclaimer}
            onChange={(e) => setData((prev) => ({ ...prev, disclaimer: e.target.value }))}
            placeholder="This website is for informational purposes only..."
            rows={4}
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
