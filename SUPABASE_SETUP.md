# Supabase Setup Guide

Follow these steps to set up Supabase for global theme management.

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: payment-store-theme (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project" and wait ~2 minutes

## 2. Create Database Tables

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Create theme_settings table
CREATE TABLE theme_settings (
  id INT PRIMARY KEY,
  settings JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default theme
INSERT INTO theme_settings (id, settings) VALUES (
  1,
  '{
    "backgroundColor": "#050505",
    "backgroundStyle": "dark",
    "primaryColor": "#ef4444",
    "qrisImage": null,
    "audioUrl": null,
    "logoImage": null,
    "videoClip": null,
    "buttonLabels": {
      "dana": "Dana Balance",
      "shopee": "Shopee Pay",
      "qris": "QRIS Payment",
      "testimonials": "All-Testimonials"
    }
  }'::jsonb
);

-- Create admin_auth table
CREATE TABLE admin_auth (
  id INT PRIMARY KEY,
  password TEXT NOT NULL
);

-- Insert admin password (change 'DANISTORE' to your password)
INSERT INTO admin_auth (id, password) VALUES (1, 'DANISTORE');

-- Enable Row Level Security (RLS)
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_auth ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read theme_settings
CREATE POLICY "Anyone can read theme settings"
  ON theme_settings FOR SELECT
  USING (true);

-- Allow anyone to update theme_settings (password check is in app)
CREATE POLICY "Anyone can update theme settings"
  ON theme_settings FOR ALL
  USING (true);

-- Allow anyone to read admin_auth (for password verification)
CREATE POLICY "Anyone can read admin auth"
  ON admin_auth FOR SELECT
  USING (true);
```

4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## 3. Get Your Supabase Credentials

1. Go to **Project Settings** (gear icon in left sidebar)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## 4. Configure Your App

1. Create a `.env` file in your project root (same folder as package.json)
2. Add your credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the values with your actual credentials from step 3

## 5. Restart Your Dev Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## 6. Test It Works

1. Open your app in a browser
2. Log in to the control panel (password: DANISTORE)
3. Change a theme setting (e.g., primary color)
4. Open your app in a **different browser or incognito window**
5. You should see the same theme changes!

## Security Notes

- The admin password is stored in plain text in Supabase (for simplicity)
- In production, consider using Supabase Auth for better security
- The `anon` key is safe to expose in frontend code
- Row Level Security (RLS) is enabled for basic protection

## Troubleshooting

### "Supabase not configured" warning
- Check your `.env` file exists and has correct values
- Restart your dev server after creating `.env`
- Make sure variable names start with `VITE_`

### "Failed to fetch theme" error
- Check your Supabase project is running (not paused)
- Verify the SQL tables were created successfully
- Check browser console for detailed error messages

### Theme not syncing across devices
- Make sure you're logged in as admin when making changes
- Check browser console for "Failed to sync theme" errors
- Verify your Supabase credentials are correct

## Optional: Change Admin Password

To change the admin password:

1. Go to Supabase SQL Editor
2. Run this query:

```sql
UPDATE admin_auth 
SET password = 'YOUR_NEW_PASSWORD' 
WHERE id = 1;
```

3. Update the password in your app's PasswordModal.jsx if needed
