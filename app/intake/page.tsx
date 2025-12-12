import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IntakeForm } from "@/components/intake-form"
import { Scale, Shield, Clock, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Free Case Evaluation | Gorski Injury Law",
  description:
    "Request a free case evaluation for your commercial trucking accident or severe injury case. Speak with an experienced attorney.",
}

export default function IntakePage() {
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

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Free Case Evaluation</h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Tell us about your case and we'll determine if we can help. All consultations are confidential and
                there's no obligation.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">No Fee Unless We Win</h3>
                    <p className="text-sm text-muted-foreground">
                      We work on a contingency basis. You pay nothing unless we recover compensation for you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Confidential Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Your information is protected by attorney-client privilege from the moment you contact us.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      We review submissions promptly and will contact you within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Prefer to speak directly?</h3>
                <p className="text-sm text-primary-foreground/90 mb-4">Call us now for an immediate consultation.</p>
                <a
                  href="tel:928-369-1777"
                  className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
                >
                  928.369.1777
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <IntakeForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
