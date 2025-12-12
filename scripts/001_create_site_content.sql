-- Site content table for storing editable website text
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read site content (public website)
CREATE POLICY "Allow public read access" ON site_content 
  FOR SELECT USING (true);

-- Only authenticated admins can update content
CREATE POLICY "Allow admin update" ON site_content 
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'is_admin' = 'true'
    )
  );

-- Only authenticated admins can insert content
CREATE POLICY "Allow admin insert" ON site_content 
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'is_admin' = 'true'
    )
  );

-- Create index for fast lookups
CREATE INDEX idx_site_content_section_key ON site_content(section_key);
