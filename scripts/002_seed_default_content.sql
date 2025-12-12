-- Seed default content for all editable sections
INSERT INTO site_content (section_key, content) VALUES
-- Hero Section
-- Updated subheading to remove "Specializing" per AZ attorney rules
('hero', '{
  "heading_line1": "Commercial Trucking &",
  "heading_line2": "Severe Injury Attorneys",
  "subheading": "Over 40 years of experience fighting for good people injured in serious, life-changing, and catastrophic accidents. We also represent families of loved ones who have died in accidents.",
  "trust_indicators": ["Since 1983", "Academy of Truck Accident Attorneys", "Keenan Trial Institute Graduate"],
  "cta_primary": "Request Free Consultation",
  "cta_secondary": "Call 928.369.1777",
  "appointment_notice": "By Appointment Only — Offices in Pinetop and Chandler, Arizona"
}'::jsonb),

-- Credentials Section
('credentials', '{
  "section_label": "Why Choose Us",
  "section_title": "Credentials That Matter",
  "items": [
    {
      "title": "Academy of Truck Accident Attorneys",
      "description": "Member of the elite national organization dedicated to improving the quality of legal representation for truck accident victims."
    },
    {
      "title": "Keenan Trial Institute Graduate",
      "description": "Advanced trial advocacy training from one of the nation''s premier plaintiff litigation programs."
    },
    {
      "title": "ITLG Member",
      "description": "Interstate Trucking Litigation Group member, focused on holding trucking companies accountable."
    },
    {
      "title": "40+ Years Experience",
      "description": "Practicing law since 1983, with decades of experience handling complex injury cases throughout Arizona."
    }
  ]
}'::jsonb),

-- Practice Areas Section
-- Added comprehensive practice area details per client's request
('practice_areas', '{
  "section_label": "AREAS OF PRACTICE",
  "section_title": "Our Practice Areas",
  "section_description": "We focus on tractor trailer, flat bed, dump, cement, logging, gravel, tanker, and other big rig trucks, delivery trucks of all sizes, buses, and other commercial motor vehicles and the liability insurance companies that represent them. We also handle auto, motorcycle, bicycle accidents and pedestrians hit by vehicles.",
  "detailed_description": "We have substantial experience with the various corporate entities responsible for putting dangerous trucks on our roads, including freight shippers and brokers.",
  "accident_causes": "We handle accidents caused by: rear end, T-bone, failure to stop for red lights and stop signs, failure to yield, speeding, unsafe lane change, crossing the center line, rollovers, mechanical failure, drugs, alcohol, driver fatigue and many other causes.",
  "injury_types": "We represent clients who have suffered traumatic head, brain and spine injuries, fractures, traumatic joint injuries, surgeries, amputations, wrongful death and many other types of severe bodily injury.",
  "service_area": "Our office handles cases throughout Arizona and also represents Arizonans and others while injured in other states. We represent truck drivers who have been injured due to unsafe conduct by other truckers and companies.",
  "items": [
    {"title": "Commercial Truck Accidents", "description": "Tractor trailers, semi-trucks, 18-wheelers, flat beds, dump trucks, cement trucks, logging trucks, gravel trucks, tankers, and other big rigs."},
    {"title": "Commercial Motor Vehicles", "description": "Delivery trucks of all sizes, buses, and other commercial vehicles and their liability insurance companies."},
    {"title": "Auto & Motorcycle Accidents", "description": "Serious car accidents, motorcycle collisions, bicycle accidents, and pedestrians hit by vehicles."},
    {"title": "Traumatic Brain & Head Injuries", "description": "Traumatic brain injuries, concussions, skull fractures, and severe head trauma from serious accidents."},
    {"title": "Spinal Cord Injuries", "description": "Spinal injuries, paralysis, herniated discs, fractures, and other debilitating spine-related injuries."},
    {"title": "Catastrophic Injuries", "description": "Severe burns, amputations, traumatic joint injuries, surgeries, and wrongful death cases."}
  ]
}'::jsonb),

-- About Section
-- Updated text to remove "specializing" terminology
('about', '{
  "section_label": "Meet Your Attorney",
  "name": "Peter Gorski",
  "title": "Attorney at Law, Since 1983",
  "paragraphs": [
    "For over four decades, Peter Gorski has dedicated his practice to representing victims of catastrophic accidents throughout Arizona. His focused expertise in commercial trucking litigation has helped countless families recover the compensation they deserve.",
    "As a member of the Academy of Truck Accident Attorneys and a graduate of the prestigious Keenan Trial Institute, Mr. Gorski brings focused knowledge and trial-tested strategies to every case. His commitment to his clients extends beyond the courtroom—he believes in personal attention and transparent communication throughout the legal process.",
    "With offices in both Pinetop and Chandler, Gorski Injury Law serves clients across Arizona who have suffered life-altering injuries due to negligence. The firm operates by appointment only to ensure each client receives the dedicated attention their case deserves."
  ],
  "credentials_badges": ["Academy of Truck Accident Attorneys", "Keenan Trial Institute Graduate", "ITLG Member"],
  "years_experience": "40+"
}'::jsonb),

-- Contact Section
('contact', '{
  "section_label": "Get Started",
  "section_title": "Request Your Free Consultation",
  "section_description": "If you or a loved one has been seriously injured in a commercial truck accident or other catastrophic incident, contact us today to discuss your case.",
  "phone": "928.369.1777",
  "email": "peter@petergorski.com",
  "availability": "By Appointment Only",
  "locations": [
    {"name": "Pinetop Office", "description": "White Mountains, Arizona"},
    {"name": "Chandler Office", "description": "Phoenix Metro Area, Arizona"}
  ],
  "cta_box": {
    "title": "Injured in a Truck Accident?",
    "description": "Time is critical in trucking accident cases. Evidence can disappear quickly, and trucking companies begin their investigation immediately. Contact us now to protect your rights and explore your legal options.",
    "benefits": ["Free case evaluation", "No fee unless we win", "40+ years of experience", "Focused trucking litigation expertise"],
    "cta_primary": "Start Your Case Review",
    "cta_secondary": "Call Now"
  }
}'::jsonb),

-- Footer
('footer', '{
  "tagline": "Strong on Results!!",
  "copyright_text": "Gorski Injury Law. All rights reserved.",
  "disclaimer": "This website is for informational purposes only and does not constitute legal advice. Contacting this firm does not create an attorney-client relationship."
}'::jsonb),

-- General Site Settings
('site_settings', '{
  "firm_name": "Gorski Injury Law",
  "phone": "928.369.1777",
  "email": "peter@petergorski.com"
}'::jsonb)

ON CONFLICT (section_key) DO NOTHING;
