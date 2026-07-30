# PulseDev — React + Supabase

A full-stack agency website: React (Vite + Framer Motion) frontend with a Supabase backend.
Services, portfolio projects, and contact/booking submissions are powered by the database.

## Structure

```
pulsedev/
  supabase/   Database migrations and config
  client/     React app (Vite) with animated sections
  archive/    Old server code (archived)
```

## Prerequisites

- Node.js 18+
- Supabase CLI (`npm i -g supabase`)

## 1. Backend setup

Link the repo to your Supabase project:
```bash
npx supabase link --project-ref your-project-ref
```

Push the database schemas (creates tables and RLS policies):
```bash
npx supabase db push
```

## 2. Frontend setup

In the `client` directory:
```bash
cd client
npm install
```

Set up your environment variables:
```bash
cp .env.example .env
```
Edit `.env` and set your Supabase credentials:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Start the dev server:
```bash
npm run dev
```

The site runs at `http://localhost:5173` and talks directly to your Supabase backend.

## What's wired to the database

- **Contact & Booking forms** — Submit directly to the `submissions` table in Supabase via the Supabase client.
- **Admin Dashboard** — Access `/admin` to view, search, and update status for all submissions. Protected by Supabase Auth.

## Deploying

Deploy the `client/` folder to Vercel, Netlify, or Cloudflare Pages.
Make sure to add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your deployment environment variables!
