import { Video } from "lucide-react"

export function AnnouncementBanner() {
  return (
    <div className="bg-accent text-accent-foreground py-3 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-sm font-medium">
          <Video className="h-4 w-4 flex-shrink-0" />
          <p>
            <span className="font-bold">For your convenience:</span> Consultations available via Zoom or other
            videoconference platforms. We also travel to locations throughout Arizona when necessary.
          </p>
        </div>
      </div>
    </div>
  )
}
