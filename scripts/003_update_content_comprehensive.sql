-- Comprehensive content update based on client requirements
-- Updated: Phone numbers, practice areas order, attorney bio, removed "specialize" terminology

UPDATE site_content SET content = '{
  "heading_line1": "Commercial Trucking &",
  "heading_line2": "Severe Injury Attorneys",
  "subheading": "Over 40 years of experience fighting for good people injured in serious, life-changing, and catastrophic accidents. I also represent families of loved ones who have died in accidents.",
  "trust_indicators": ["Since 1983", "Academy of Truck Accident Attorneys", "Keenan Trial Institute Graduate"],
  "cta_primary": "Request Free Consultation",
  "cta_secondary": "Call Now",
  "appointment_notice": "By Appointment Only — Offices in Pinetop and Chandler, Arizona"
}'::jsonb
WHERE section_key = 'hero';

-- Update credentials to 3 items with revised descriptions
UPDATE site_content SET content = '{
  "section_label": "Why Choose Us",
  "section_title": "Credentials That Matter",
  "items": [
    {
      "title": "40+ Years Experience",
      "description": "With nearly four decades of practice focused on holding trucking companies accountable, Peter Gorski provides seasoned legal guidance for serious injury claims throughout Arizona."
    },
    {
      "title": "Proven Track Record",
      "description": "Dedicated representation that has helped many good people and families recover compensation to move forward with their lives after catastrophic accidents."
    },
    {
      "title": "Personalized Attention",
      "description": "By appointment only practice ensures every client receives the focused time and attention their complex case deserves."
    }
  ]
}'::jsonb
WHERE section_key = 'credentials';

-- Update practice areas with new order and comprehensive details
UPDATE site_content SET content = '{
  "section_label": "AREAS OF PRACTICE",
  "section_title": "Our Focus",
  "section_description": "We focus on tractor trailer, flat bed, dump, cement, logging, gravel, tanker, and other big rig trucks, delivery trucks of all sizes, buses, and other commercial motor vehicles and the liability insurance companies that represent them. We also handle auto, motorcycle, bicycle accidents and pedestrians hit by vehicles.",
  "accident_causes": "We handle accidents caused by: rear end, T-bone, failure to stop for red lights and stop signs, failure to yield, speeding, unsafe lane change, crossing the center line, rollovers, mechanical failure, drugs, alcohol, driver fatigue and many other causes.",
  "injury_types": "We represent clients who have suffered traumatic head, brain and spine injuries, fractures, traumatic joint injuries, surgeries, amputations, wrongful death and many other types of severe bodily injury.",
  "service_area": "Our office handles cases throughout Arizona and also represents Arizonans and others while injured in other states. We represent truck drivers who have been injured due to unsafe conduct by other truckers and companies.",
  "items": [
    {"title": "Commercial Truck Accidents", "description": "Tractor trailers, semi-trucks, 18-wheelers, flat beds, dump trucks, cement trucks, logging trucks, gravel trucks, tankers, delivery trucks, buses, and other commercial vehicles."},
    {"title": "Other Serious Vehicle Crashes", "description": "Passenger vehicles, motorcycles, buses, bicycles, and pedestrians hit by vehicles causing serious injuries or death."},
    {"title": "Traumatic Head & Brain Injuries", "description": "Traumatic brain injuries, concussions, skull fractures, and severe head trauma from serious accidents with long-term consequences."},
    {"title": "Spinal Injuries", "description": "Spinal injuries, paralysis, herniated discs, fractures, and other debilitating spine-related injuries requiring extensive medical care."},
    {"title": "Wrongful Death", "description": "Compassionate representation for families who have lost loved ones in catastrophic accidents caused by negligence."},
    {"title": "Amputations", "description": "Loss of limbs and extremities due to negligent accidents, including prosthetic needs and long-term care planning."}
  ]
}'::jsonb
WHERE section_key = 'practice_areas';

-- Update about section with new attorney bio text
UPDATE site_content SET content = '{
  "section_label": "Meet Your Attorney",
  "name": "Peter Gorski",
  "title": "Attorney and Counselor at Law, since 1983",
  "paragraphs": [
    "For nearly four decades, Peter has dedicated his practice to representing victims of serious and catastrophic vehicle crashes throughout Arizona. His focused knowledge and experience in commercial trucking litigation and other serious vehicle crash claims has helped many good people and families recover money compensation to help them move forward with their lives.",
    "The firm operates by appointment only to provide the time and attention each client''s case deserves, and for those who would like, offers convenient videoconference calling by means of Zoom and other similar platforms. When necessary, we will travel to meet you at your home, hospital, or other location convenient for you."
  ],
  "credentials_badges": ["Academy of Truck Accident Attorneys", "Keenan Trial Institute Graduate"],
  "years_experience": "40+"
}'::jsonb
WHERE section_key = 'about';

-- Update contact section with both phone numbers
UPDATE site_content SET content = '{
  "section_label": "Get Started",
  "section_title": "Request Your Free Consultation",
  "section_description": "If you or a loved one has been seriously injured in a commercial truck accident, other serious vehicle crash, or other catastrophic incident, contact us today to discuss your case.",
  "phone_pinetop": "928-369-1777",
  "phone_chandler": "480-730-1777",
  "email": "peter@petergorski.com",
  "availability": "By Appointment Only",
  "locations": [
    {"name": "Pinetop Office", "description": "White Mountains & Surrounding Areas"},
    {"name": "Chandler Office", "description": "Valleywide & Throughout Arizona"}
  ],
  "cta_box": {
    "title": "Injured in a Truck Accident?",
    "description": "Time is critical in trucking accident cases. Evidence can disappear quickly, and trucking companies begin their investigation immediately. Contact us now to protect your rights and explore your legal options.",
    "benefits": ["Free case evaluation", "No fee unless we win", "40+ years of experience", "Practice focused on trucking litigation"],
    "cta_primary": "Start Your Case Review",
    "cta_secondary": "Call Now"
  }
}'::jsonb
WHERE section_key = 'contact';

-- Update footer
UPDATE site_content SET content = '{
  "tagline": "Strong on Results!!",
  "copyright_text": "Gorski Injury Law. All rights reserved.",
  "disclaimer": "This website is for informational purposes only and does not constitute legal advice. Contacting this firm does not create an attorney-client relationship."
}'::jsonb
WHERE section_key = 'footer';

-- Update site settings with both phone numbers
UPDATE site_content SET content = '{
  "firm_name": "Gorski Injury Law",
  "phone_pinetop": "928-369-1777",
  "phone_chandler": "480-730-1777",
  "email": "peter@petergorski.com"
}'::jsonb
WHERE section_key = 'site_settings';
