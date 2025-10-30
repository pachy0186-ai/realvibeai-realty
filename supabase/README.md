# Supabase Setup for RealVibeAI Realty

This directory contains SQL migrations for the Virtual ISA beta program database.

## Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and API keys from Settings → API

### 2. Run Migrations

In your Supabase project SQL Editor, run the migrations in order:

```sql
-- Run 001_initial_schema.sql first
-- Then run 002_add_admin_fields.sql
```

Or use the Supabase CLI:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

### 3. Configure Environment Variables

Add to your `.env.local` (or Vercel environment variables):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Dashboard
ADMIN_API_TOKEN=your-secure-token
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Feature Flags (Preview only)
NEXT_PUBLIC_FEATURE_VIRTUAL_ISA=true
NEXT_PUBLIC_FEATURE_BETA_FORM=true
NEXT_PUBLIC_FEATURE_BETA_COUNTER=true
NEXT_PUBLIC_FEATURE_ADMIN=true
```

## Database Schema

### `beta_seats`

Tracks seat availability per metro area.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metro | text | Metro area name (e.g., "Miami") |
| total_seats | int | Total seats available (default: 10) |
| claimed_seats | int | Number of claimed seats |
| updated_at | timestamptz | Last update timestamp |

### `beta_signups`

Stores beta program applicant information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| first_name | text | Applicant first name |
| last_name | text | Applicant last name |
| email | text | Applicant email (unique) |
| phone | text | Applicant phone |
| brokerage | text | Brokerage/team name |
| crm | text | Current CRM system |
| lead_volume | text | Monthly lead volume range |
| metro | text | Metro area (optional) |
| referral_source | text | How they heard about us |
| status | text | Application status: pending, approved, rejected |
| admin_notes | text | Admin notes (Phase C) |
| created_at | timestamptz | Application timestamp |
| updated_at | timestamptz | Last update timestamp |

## Row Level Security (RLS)

- **Public read** access to `beta_seats` (for live counter)
- **Public insert** access to `beta_signups` (for form submission)
- **Service role** has full access to both tables (for admin operations)

## API Endpoints

### Public Endpoints

- `GET /api/beta-seats?metro=Miami` - Get seat availability
- `POST /api/beta-signup` - Submit beta application

### Admin Endpoints (require `Authorization: Bearer <token>`)

- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/applicants` - List all applicants (with filters)
- `PATCH /api/admin/applicants` - Update applicant status

## Testing

### Test Seat Availability

```bash
curl http://localhost:3000/api/beta-seats?metro=Miami
```

### Test Beta Signup

```bash
curl -X POST http://localhost:3000/api/beta-signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "brokerage": "Test Realty",
    "crm": "Follow Up Boss",
    "leadVolume": "101-200",
    "metro": "Miami"
  }'
```

### Test Admin Stats

```bash
curl http://localhost:3000/api/admin/stats \
  -H "Authorization: Bearer your-admin-token"
```

## Phase Roadmap

- ✅ **Phase B**: Live counter + beta signup
- ✅ **Phase C**: Admin dashboard + applicant management
- 🔜 **Phase D**: Email notifications + CRM integration
- 🔜 **Phase E**: Analytics + ROI tracking

## Security Notes

- Admin endpoints use simple token auth for Phase C
- Phase D will implement proper authentication (NextAuth.js or Supabase Auth)
- Never commit `.env.local` with real credentials
- Use Vercel environment variables for production secrets
