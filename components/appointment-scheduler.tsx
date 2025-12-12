"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, CheckCircle, MapPin, Clock } from "lucide-react"
import { format, addDays, isWeekend, isBefore, startOfDay } from "date-fns"

type SchedulerStep = 1 | 2 | 3

interface AppointmentData {
  office: string
  date: Date | undefined
  timeSlot: string
  firstName: string
  lastName: string
  email: string
  phone: string
  caseType: string
  notes: string
}

const offices = [
  { id: "pinetop", name: "Pinetop Office", location: "White Mountains Region" },
  { id: "chandler", name: "Chandler Office", location: "Phoenix Metro Area" },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

const caseTypes = [
  "Commercial Truck Accident",
  "Semi-Truck Collision",
  "Severe Injury",
  "Traumatic Brain Injury",
  "Spinal Cord Injury",
  "Wrongful Death",
  "Other",
]

export function AppointmentScheduler() {
  const router = useRouter()
  const [step, setStep] = useState<SchedulerStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    office: "",
    date: undefined,
    timeSlot: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    notes: "",
  })

  const updateData = <K extends keyof AppointmentData>(key: K, value: AppointmentData[K]) => {
    setAppointmentData((prev) => ({ ...prev, [key]: value }))
  }

  // Get available dates (next 30 days, excluding weekends)
  const today = startOfDay(new Date())
  const minDate = addDays(today, 1) // Start from tomorrow
  const maxDate = addDays(today, 30)

  const isDateDisabled = (date: Date) => {
    return isWeekend(date) || isBefore(date, minDate) || isBefore(maxDate, date)
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return appointmentData.office !== "" && appointmentData.date !== undefined && appointmentData.timeSlot !== ""
      case 2:
        return (
          appointmentData.firstName !== "" &&
          appointmentData.lastName !== "" &&
          appointmentData.email !== "" &&
          appointmentData.phone !== "" &&
          appointmentData.caseType !== ""
        )
      case 3:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store appointment data
    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData))

    router.push("/appointment/confirmed")
  }

  const selectedOffice = offices.find((o) => o.id === appointmentData.office)

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-xl">Request Appointment</CardTitle>
        <CardDescription>
          {step === 1 && "Select your preferred office, date, and time"}
          {step === 2 && "Enter your contact information"}
          {step === 3 && "Review and confirm your appointment request"}
        </CardDescription>
        {/* Progress Bar */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Step 1 - Date/Time Selection */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Office Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Select Office Location</Label>
              <RadioGroup
                value={appointmentData.office}
                onValueChange={(value) => updateData("office", value)}
                className="grid sm:grid-cols-2 gap-3"
              >
                {offices.map((office) => (
                  <div key={office.id}>
                    <RadioGroupItem value={office.id} id={office.id} className="peer sr-only" />
                    <Label
                      htmlFor={office.id}
                      className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-colors"
                    >
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <span className="font-medium block">{office.name}</span>
                        <span className="text-sm text-muted-foreground">{office.location}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Date Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Select Date</Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={appointmentData.date}
                  onSelect={(date) => updateData("date", date)}
                  disabled={isDateDisabled}
                  className="rounded-md border"
                />
              </div>
            </div>

            {/* Time Selection */}
            {appointmentData.date && (
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Select Time for {format(appointmentData.date, "EEEE, MMMM d")}
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={appointmentData.timeSlot === slot ? "default" : "outline"}
                      className="text-sm"
                      onClick={() => updateData("timeSlot", slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2 - Contact Information */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={appointmentData.firstName}
                  onChange={(e) => updateData("firstName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={appointmentData.lastName}
                  onChange={(e) => updateData("lastName", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={appointmentData.email}
                onChange={(e) => updateData("email", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={appointmentData.phone}
                onChange={(e) => updateData("phone", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="caseType">Type of Case *</Label>
              <select
                id="caseType"
                value={appointmentData.caseType}
                onChange={(e) => updateData("caseType", e.target.value)}
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">Select case type...</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific topics you'd like to discuss or questions you have..."
                value={appointmentData.notes}
                onChange={(e) => updateData("notes", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>
        )}

        {/* Step 3 - Review & Confirm */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>
                      {selectedOffice?.name} - {selectedOffice?.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>
                      {appointmentData.date && format(appointmentData.date, "EEEE, MMMM d, yyyy")} at{" "}
                      {appointmentData.timeSlot}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name:</span> {appointmentData.firstName}{" "}
                    {appointmentData.lastName}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span> {appointmentData.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span> {appointmentData.phone}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Case Type:</span> {appointmentData.caseType}
                  </p>
                  {appointmentData.notes && (
                    <p>
                      <span className="text-muted-foreground">Notes:</span> {appointmentData.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
              <p className="text-amber-800">
                <strong>Please Note:</strong> This is a request for an appointment. Our office will contact you to
                confirm the date and time. Appointments are subject to availability.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              By submitting this request, you agree to be contacted by Gorski Injury Law regarding your appointment and
              case. Your information is confidential.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep((step - 1) as SchedulerStep)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep((step + 1) as SchedulerStep)}
              disabled={!canProceed()}
              className="bg-primary text-primary-foreground"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Request Appointment
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
