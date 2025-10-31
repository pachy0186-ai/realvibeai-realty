-- Phase C: Add admin management fields to beta_signups table

-- Add status column (pending, approved, rejected)
ALTER TABLE beta_signups 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Add admin notes column
ALTER TABLE beta_signups 
ADD COLUMN IF NOT EXISTS admin_notes text;

-- Add updated_at column
ALTER TABLE beta_signups 
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS beta_signups_status_idx ON beta_signups(status);

-- Add trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_beta_signups_updated_at 
BEFORE UPDATE ON beta_signups 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
