# PulseDev — MERN stack website

A full-stack agency website: React (Vite + Framer Motion) frontend, Express API backend,
MongoDB database. Services, portfolio projects, and contact messages are all stored and
served from the database — nothing is hardcoded in production.

## Structure

```
pulsedev-mern/
  server/     Express API + MongoDB models (Contact, Service, Project)
  client/     React app (Vite) with animated sections
```

## Prerequisites

- Node.js 18+
- A MongoDB instance — either:
  - Local: install MongoDB Community Server and run `mongod`, or
  - Free cloud: create a free cluster at https://www.mongodb.com/cloud/atlas and copy its connection string

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and set `MONGO_URI` to your database:

```
MONGO_URI=mongodb://127.0.0.1:27017/pulsedev
# or, for Atlas:
# MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/pulsedev
```

Seed the database with initial services and projects:

```bash
npm run seed
```

Start the API server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Check it's alive at `http://localhost:5000/api/health`.

## 2. Frontend setup

In a new terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The site runs at `http://localhost:5173` and talks to the API automatically.

## What's wired to the database

- **Services section** — fetched live from `GET /api/services`
- **Work/portfolio section** — fetched live from `GET /api/projects`
- **Contact form** — submits to `POST /api/contact`, which saves the message in MongoDB
  (with `name`, `email`, `message`, timestamp, and a `status` field for follow-up tracking)

To view submitted contact messages, hit `GET /api/contact` (e.g. with Postman, or by adding
an admin page later) — every form submission is stored permanently in your database.

## Deploying

- **Backend**: Render, Railway, or Fly.io all support Node + MongoDB Atlas easily. Set
  `MONGO_URI` and `CLIENT_ORIGIN` (your deployed frontend URL) as environment variables.
- **Frontend**: `npm run build` in `client/` produces a static `dist/` folder — deploy it to
  Vercel, Netlify, or any static host. Set `VITE_API_URL` to your deployed backend's URL.

## Customizing content

Edit `server/seed.js` and re-run `npm run seed` to change services or portfolio projects —
no frontend code changes needed, since the UI just reflects whatever is in the database.
