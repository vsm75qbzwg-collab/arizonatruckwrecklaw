"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Clock, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

interface IntakeData {
  firstName: string
  lastName: string
  email: string
  phone: string
  caseAnalysis: {
    score: number
    isHighValue: boolean
    reasons: string[]
  }
}

export default function ConfirmationPage() {
  const router = useRouter()
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("intakeData")
    if (stored) {
      setIntakeData(JSON.parse(stored))
    } else {
      router.push("/intake")
    }
  }, [router])

  if (!intakeData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }

  const { caseAnalysis } = intakeData
  const isHighValue = caseAnalysis.isHighValue

  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border">
            <CardHeader className="text-center pb-2">
              <div
                className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isHighValue ? "bg-green-100" : "bg-primary/10"
                }`}
              >
                <CheckCircle className={`h-8 w-8 ${isHighValue ? "text-green-600" : "text-primary"}`} />
              </div>
              <CardTitle className="text-2xl">Thank You, {intakeData.firstName}!</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Your case information has been received. We will review your submission and contact you within 24-48
                hours.
              </p>

              {/* High-Value Case Priority Notice */}
              {isHighValue && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-800">Priority Review</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Based on the information you provided, your case appears to be a strong fit for our practice. We
                        specialize in exactly these types of cases and will prioritize your review.
                      </p>
                      {caseAnalysis.reasons.length > 0 && (
                        <ul className="mt-2 text-sm text-green-700">
                          {caseAnalysis.reasons.map((reason, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">What Happens Next?</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Case Review</p>
                      <p className="text-sm text-muted-foreground">
                        Our team will review your submission and evaluate your case.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Initial Contact</p>
                      <p className="text-sm text-muted-foreground">
                        We will reach out via your preferred contact method to discuss your case.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Consultation</p>
                      <p className="text-sm text-muted-foreground">
                        If we can help, we'll schedule a free consultation to discuss your options.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgent Contact */}
              <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Need Immediate Assistance?</h3>
                <p className="text-sm text-primary-foreground/90 mb-4">
                  If your case is urgent, don't wait — call us directly.
                </p>
                <a
                  href="tel:928-369-1777"
                  className="inline-flex items-center gap-2 text-xl font-bold text-accent hover:text-accent/80 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  928.369.1777
                </a>
              </div>

              {/* Schedule Appointment CTA for High-Value Cases */}
              {isHighValue && (
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">Want to schedule your consultation now?</p>
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/appointment">
                      Schedule Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}

              <div className="text-center pt-4 border-t border-border">
                <Button asChild variant="ghost">
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
