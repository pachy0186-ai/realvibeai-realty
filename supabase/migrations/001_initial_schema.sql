-- Phase B: Initial schema for beta program

-- Beta seats table (tracks availability per metro)
CREATE TABLE IF NOT EXISTS beta_seats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metro text NOT NULL,
  total_seats int NOT NULL DEFAULT 10,
  claimed_seats int NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS beta_seats_metro_idx ON beta_seats(metro);

-- Beta signups table (applicant records)
CREATE TABLE IF NOT EXISTS beta_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  brokerage text NOT NULL,
  crm text NOT NULL,
  lead_volume text NOT NULL,
  metro text,
  referral_source text,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS beta_signups_email_idx ON beta_signups(email);

-- Enable Row Level Security (RLS)
ALTER TABLE beta_seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Public read access for beta_seats (for live counter)
CREATE POLICY "Allow public read access to beta_seats"
ON beta_seats FOR SELECT
TO anon, authenticated
USING (true);

-- Public insert access for beta_signups (for form submission)
CREATE POLICY "Allow public insert to beta_signups"
ON beta_signups FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Service role has full access (for admin operations)
CREATE POLICY "Service role has full access to beta_seats"
ON beta_seats FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role has full access to beta_signups"
ON beta_signups FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
