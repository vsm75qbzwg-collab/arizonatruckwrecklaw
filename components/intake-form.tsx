"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react"

type FormStep = 1 | 2 | 3 | 4

interface FormData {
  // Step 1 - Accident Type
  accidentType: string

  // Step 2 - Injury Details
  injuryTypes: string[]
  injurySeverity: string

  // Step 3 - Case Details
  accidentDate: string
  accidentLocation: string
  atFault: string
  hasAttorney: string

  // Step 4 - Contact Info
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContact: string
  additionalDetails: string
}

const accidentTypes = [
  { id: "commercial-truck", label: "Commercial Truck / 18-Wheeler", highValue: true },
  { id: "semi-truck", label: "Semi-Truck / Tractor-Trailer", highValue: true },
  { id: "delivery-truck", label: "Delivery Truck (FedEx, UPS, Amazon)", highValue: true },
  { id: "bus", label: "Bus Accident", highValue: true },
  { id: "car-accident", label: "Car Accident", highValue: false },
  { id: "motorcycle", label: "Motorcycle Accident", highValue: false },
  { id: "pedestrian", label: "Pedestrian Accident", highValue: false },
  { id: "other", label: "Other", highValue: false },
]

const injuryTypeOptions = [
  { id: "spinal", label: "Spinal Cord Injury / Paralysis", highValue: true },
  { id: "tbi", label: "Traumatic Brain Injury", highValue: true },
  { id: "burns", label: "Severe Burns", highValue: true },
  { id: "amputation", label: "Amputation / Loss of Limb", highValue: true },
  { id: "fractures", label: "Multiple Fractures", highValue: true },
  { id: "internal", label: "Internal Organ Damage", highValue: true },
  { id: "wrongful-death", label: "Wrongful Death", highValue: true },
  { id: "soft-tissue", label: "Soft Tissue / Whiplash", highValue: false },
  { id: "minor", label: "Minor Injuries", highValue: false },
  { id: "other", label: "Other", highValue: false },
]

const severityOptions = [
  {
    id: "catastrophic",
    label: "Catastrophic / Life-Altering",
    description: "Permanent disability, paralysis, or significant impairment",
  },
  { id: "severe", label: "Severe", description: "Extended hospitalization, surgery required, long-term treatment" },
  { id: "moderate", label: "Moderate", description: "Medical treatment needed, temporary disability" },
  { id: "minor", label: "Minor", description: "Minor medical treatment, quick recovery expected" },
]

export function IntakeForm() {
  const router = useRouter()
  const [step, setStep] = useState<FormStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    accidentType: "",
    injuryTypes: [],
    injurySeverity: "",
    accidentDate: "",
    accidentLocation: "",
    atFault: "",
    hasAttorney: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "phone",
    additionalDetails: "",
  })

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleInjuryType = (injuryId: string) => {
    setFormData((prev) => ({
      ...prev,
      injuryTypes: prev.injuryTypes.includes(injuryId)
        ? prev.injuryTypes.filter((id) => id !== injuryId)
        : [...prev.injuryTypes, injuryId],
    }))
  }

  const calculateCaseScore = (): { score: number; isHighValue: boolean; reasons: string[] } => {
    let score = 0
    const reasons: string[] = []

    // Accident type scoring
    const selectedAccident = accidentTypes.find((t) => t.id === formData.accidentType)
    if (selectedAccident?.highValue) {
      score += 30
      reasons.push("Commercial vehicle accident")
    }

    // Injury type scoring
    const highValueInjuries = formData.injuryTypes.filter(
      (id) => injuryTypeOptions.find((opt) => opt.id === id)?.highValue,
    )
    score += highValueInjuries.length * 15
    if (highValueInjuries.length > 0) {
      reasons.push(`${highValueInjuries.length} severe injury type(s)`)
    }

    // Severity scoring
    if (formData.injurySeverity === "catastrophic") {
      score += 30
      reasons.push("Catastrophic injury severity")
    } else if (formData.injurySeverity === "severe") {
      score += 20
      reasons.push("Severe injury")
    } else if (formData.injurySeverity === "moderate") {
      score += 10
    }

    // Not at fault bonus
    if (formData.atFault === "no") {
      score += 10
      reasons.push("Not at fault")
    }

    // No existing attorney
    if (formData.hasAttorney === "no") {
      score += 5
    }

    return {
      score,
      isHighValue: score >= 50,
      reasons,
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const caseAnalysis = calculateCaseScore()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store form data in session storage for the confirmation page
    sessionStorage.setItem(
      "intakeData",
      JSON.stringify({
        ...formData,
        caseAnalysis,
      }),
    )

    router.push("/intake/confirmation")
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return formData.accidentType !== ""
      case 2:
        return formData.injuryTypes.length > 0 && formData.injurySeverity !== ""
      case 3:
        return formData.accidentDate !== "" && formData.atFault !== "" && formData.hasAttorney !== ""
      case 4:
        return formData.firstName !== "" && formData.lastName !== "" && formData.email !== "" && formData.phone !== ""
      default:
        return false
    }
  }

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-xl">Case Evaluation Form</CardTitle>
        <CardDescription>Step {step} of 4</CardDescription>
        {/* Progress Bar */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Step 1 - Accident Type */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">What type of accident were you involved in?</h3>
              <p className="text-sm text-muted-foreground mb-4">Select the option that best describes your accident.</p>
            </div>

            <RadioGroup
              value={formData.accidentType}
              onValueChange={(value) => updateFormData("accidentType", value)}
              className="space-y-3"
            >
              {accidentTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id} className="flex items-center gap-2 cursor-pointer">
                    {type.label}
                    {type.highValue && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Our Focus</span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 2 - Injury Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">What injuries did you sustain?</h3>
              <p className="text-sm text-muted-foreground mb-4">Select all that apply.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {injuryTypeOptions.map((injury) => (
                <div key={injury.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={injury.id}
                    checked={formData.injuryTypes.includes(injury.id)}
                    onCheckedChange={() => toggleInjuryType(injury.id)}
                  />
                  <Label htmlFor={injury.id} className="flex items-center gap-2 cursor-pointer text-sm">
                    {injury.label}
                    {injury.highValue && (
                      <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">Severe</span>
                    )}
                  </Label>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold text-lg mb-2">How severe are your injuries?</h3>
              <RadioGroup
                value={formData.injurySeverity}
                onValueChange={(value) => updateFormData("injurySeverity", value)}
                className="space-y-3"
              >
                {severityOptions.map((severity) => (
                  <div key={severity.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={severity.id} id={`severity-${severity.id}`} className="mt-1" />
                    <Label htmlFor={`severity-${severity.id}`} className="cursor-pointer">
                      <span className="font-medium">{severity.label}</span>
                      <span className="block text-sm text-muted-foreground">{severity.description}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 3 - Case Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Tell us more about your case</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="accidentDate">When did the accident occur?</Label>
                <Input
                  id="accidentDate"
                  type="date"
                  value={formData.accidentDate}
                  onChange={(e) => updateFormData("accidentDate", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="accidentLocation">Where did the accident occur?</Label>
                <Input
                  id="accidentLocation"
                  placeholder="City, State or Highway"
                  value={formData.accidentLocation}
                  onChange={(e) => updateFormData("accidentLocation", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="block mb-2">Were you at fault for the accident?</Label>
                <RadioGroup
                  value={formData.atFault}
                  onValueChange={(value) => updateFormData("atFault", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="not-at-fault" />
                    <Label htmlFor="not-at-fault">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial-fault" />
                    <Label htmlFor="partial-fault">Partially</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="at-fault" />
                    <Label htmlFor="at-fault">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unsure" id="unsure-fault" />
                    <Label htmlFor="unsure-fault">Unsure</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="block mb-2">Do you currently have an attorney for this case?</Label>
                <RadioGroup
                  value={formData.hasAttorney}
                  onValueChange={(value) => updateFormData("hasAttorney", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no-attorney" />
                    <Label htmlFor="no-attorney">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="has-attorney" />
                    <Label htmlFor="has-attorney">Yes</Label>
                  </div>
                </RadioGroup>
                {formData.hasAttorney === "yes" && (
                  <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    You may still be able to switch attorneys. We can discuss your options.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4 - Contact Info */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Your Contact Information</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label className="block mb-2">Preferred contact method</Label>
              <RadioGroup
                value={formData.preferredContact}
                onValueChange={(value) => updateFormData("preferredContact", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="prefer-phone" />
                  <Label htmlFor="prefer-phone">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="prefer-email" />
                  <Label htmlFor="prefer-email">Email</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
              <Textarea
                id="additionalDetails"
                placeholder="Please share any additional information about your case that you think is important..."
                value={formData.additionalDetails}
                onChange={(e) => updateFormData("additionalDetails", e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              By submitting this form, you agree to be contacted by Gorski Injury Law regarding your case. Your
              information is confidential and protected by attorney-client privilege.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep((step - 1) as FormStep)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              onClick={() => setStep((step + 1) as FormStep)}
              disabled={!canProceed()}
              className="bg-primary text-primary-foreground"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Case Review
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
