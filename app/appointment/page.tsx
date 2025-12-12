import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AppointmentScheduler } from "@/components/appointment-scheduler"
import { Scale, MapPin, Clock, Phone } from "lucide-react"

export const metadata = {
  title: "Schedule Appointment | Gorski Injury Law",
  description:
    "Schedule a consultation with Peter Gorski, Attorney at Law. Offices in Pinetop and Chandler, Arizona. By appointment only.",
}

export default function AppointmentPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Scale className="h-8 w-8 text-primary" />
                <div className="h-px bg-primary/30 w-16" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Schedule Your Consultation</h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Request an appointment at one of our Arizona offices. We operate by appointment only to ensure each
                client receives dedicated, personalized attention.
              </p>

              {/* Office Locations */}
              <div className="space-y-6 mb-8">
                <h2 className="text-xl font-semibold text-foreground">Our Offices</h2>

                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-card-foreground">Pinetop Office</h3>
                        <p className="text-sm text-muted-foreground">White Mountains Region</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Serving Navajo County, Apache County, and the White Mountains communities
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-card-foreground">Chandler Office</h3>
                        <p className="text-sm text-muted-foreground">Phoenix Metro Area</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Serving Maricopa County, Pinal County, and the greater Phoenix area
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-foreground">What to Expect</h2>

                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <p>Initial consultations typically last 30-60 minutes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p>Bring any documents related to your accident (police reports, medical records, photos)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p>We'll discuss your case, answer questions, and explain your legal options</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p>There's no fee for the initial consultation</p>
                  </div>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Need to speak with us now?</h3>
                <p className="text-sm text-primary-foreground/90 mb-4">
                  Call directly to discuss your case or schedule an appointment.
                </p>
                <a
                  href="tel:928-369-1777"
                  className="inline-flex items-center gap-2 text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  928.369.1777
                </a>
              </div>
            </div>

            {/* Right Column - Scheduler */}
            <div>
              <AppointmentScheduler />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
