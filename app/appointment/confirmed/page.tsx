"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Clock, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface AppointmentData {
  office: string
  date: string
  timeSlot: string
  firstName: string
  lastName: string
  email: string
  phone: string
  caseType: string
}

const officeNames: Record<string, { name: string; location: string }> = {
  pinetop: { name: "Pinetop Office", location: "White Mountains Region" },
  chandler: { name: "Chandler Office", location: "Phoenix Metro Area" },
}

export default function AppointmentConfirmedPage() {
  const router = useRouter()
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("appointmentData")
    if (stored) {
      setAppointmentData(JSON.parse(stored))
    } else {
      router.push("/appointment")
    }
  }, [router])

  if (!appointmentData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }

  const office = officeNames[appointmentData.office]
  const appointmentDate = new Date(appointmentData.date)

  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Appointment Request Received</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Thank you, {appointmentData.firstName}! We have received your appointment request and will contact you
                shortly to confirm.
              </p>

              {/* Appointment Summary */}
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-center">Requested Appointment</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent" />
                    <span>{format(appointmentDate, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <span>{appointmentData.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>
                      {office?.name} - {office?.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">What Happens Next?</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Confirmation Call</p>
                      <p className="text-sm text-muted-foreground">
                        Our office will call to confirm your appointment time and provide any specific directions to our
                        office.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Prepare Documents</p>
                      <p className="text-sm text-muted-foreground">
                        Gather any relevant documents: police reports, medical records, insurance information, and
                        photos from the accident.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Consultation</p>
                      <p className="text-sm text-muted-foreground">
                        Meet with Mr. Gorski to discuss your case, understand your options, and determine the best path
                        forward.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmation Email */}
              <div className="bg-muted rounded-lg p-4 flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">
                    A confirmation email has been sent to <strong>{appointmentData.email}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    If you don't receive it within a few minutes, please check your spam folder.
                  </p>
                </div>
              </div>

              {/* Contact for Changes */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Need to reschedule or have questions?</p>
                <a
                  href="tel:928-369-1777"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  928.369.1777
                </a>
              </div>

              <div className="text-center">
                <Button asChild variant="outline">
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
