# Auditions Adda — Enhanced V3

India's Smart Casting Marketplace. A full-stack two-sided marketplace connecting Artists with Casting Agents.

---

## 🚀 Quick Start

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # open http://localhost:3000
```

### Demo Login (No backend needed)
| Role | Email | Password |
|------|-------|----------|
| Actor | actor@example.com | password |
| Director | director@example.com | password |
| Admin | admin@example.com | password |

---

## ✨ All Features

### Core Platform
| Feature | Route | Role |
|---------|-------|------|
| Landing Page | `/` | Public |
| Actor Dashboard | `/dashboard` | Actor |
| Director Dashboard | `/director-dashboard` | Director |
| Audition Listings | `/auditions` | Both |
| Post Audition | `/post-audition` | Director |
| Actor Database | `/actors` | Director |
| Actor Profile | `/profile` | Actor |
| Director Profile | `/director-profile` | Director |
| Analytics | `/analytics` | Director |
| Submissions | `/submissions` | Actor |
| Saved Alerts | `/alerts` | Actor |
| Bookmarks | `/bookmarks` | Actor |
| My Projects | `/my-projects` | Director |
| Virtual Audition | `/virtual-audition` | Both |
| AI Assistant | `/ai-assistant` | Both |
| Admin Panel | `/admin` | Admin |

### NEW Features (V3 — Competitive Gap Analysis)
| Feature | Route | Role | Based On |
|---------|-------|------|----------|
| Networking Hub | `/networking` | Actor | Mandy ecosystem |
| Self-Tape Studio | `/self-tape` | Actor | Actors Access Eco Cast |
| Shortlist Manager | `/shortlist-manager` | Director | Casting Networks tools |
| Verification & Badges | `/verification` | Actor | iActor/SAG-AFTRA |
| Regional Auditions | `/regional` | Actor | NYCastings segmentation |
| Team Collaboration | `/team-collab` | Director | Casting Networks enterprise |

---

## 🏗️ Tech Stack
React 19 + TypeScript · Vite 6 · Tailwind CSS v4 · Supabase · Google Gemini AI · Recharts · Motion · Lucide React

## 🗄️ Database Setup
Run in your Supabase SQL editor in this order:
1. `supabase-schema-v2-enhanced.sql`
2. `supabase-seed-data.sql`
3. `supabase-signup-storage.sql`
4. `supabase-login-storage.sql`
5. `supabase-newsletter.sql`

## 🔑 Environment Variables
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GEMINI_API_KEY=your-gemini-key
```

## Unique Features vs Competitors
| Feature | Others | Auditions Adda V3 |
|---------|--------|-------------------|
| AI Matching | None | ✅ |
| Blurred Identity | None | ✅ |
| Self-Tape Studio | Actors Access only | ✅ Full Studio |
| Team Collaboration | Casting Networks | ✅ + Chat |
| Networking Hub | None | ✅ |
| Verification Badges | iActor (union only) | ✅ All Artists |
| Regional Segmentation | NYCastings (NY only) | ✅ All India |
