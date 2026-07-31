# 🏫 GIST CSE Department Web Platform

> **Department of Computer Science & Engineering** — Geethanjali Institute of Science & Technology (GIST), Nellore, A.P.

A modern, high-performance, full-stack web application and AI-powered portal for the **Department of Computer Science & Engineering** at **GIST**. Built with **TanStack Start**, **React 19**, **Vite**, **Tailwind CSS v4**, and an integrated **AI Chatbot Assistant** grounded strictly in official department data.

---

## ✨ Features

### 📄 Interactive Department Showcase
- Complete department information — vision, mission, PEOs, PSOs, POs, accreditation details
- **Faculty Directory** — 49 faculty members with search/filter, designations & qualifications
- **Academic Programs** — B.Tech CSE, AI & ML, Data Science, Cyber Security, M.Tech CSE
- **Laboratories** — 8 labs including NVIDIA AI & Deep Learning Lab with specs
- **Placements & Roll of Honour** — Batch toppers (2008–2023) with CGPA records
- **Downloads & Resources** — Syllabi (RG23, RG22), newsletters, tech magazines, MOUs, calendars
- **VOICE Student Association** — Committee members, event history & activities
- **Research Areas** — AI, ML, Cloud Computing, Cybersecurity & more
- **Photo Gallery & Media Hub** — YouTube embeds, reels, and video lightbox
- **Industry MOUs** — Oracle Academy, AWS Academy, Cisco, Palo Alto Networks, EduSkills
- **Events & TechFest** — GIST TECHFEST/2k21 prize winners & event details
- **Contact & Location** — Department contact info, social media, map links

### 🤖 AI-Powered Virtual Assistant
- **Floating Chat Widget** — Ask questions about faculty, labs, placements, programs, events
- **Full-page Chat Interface** — `/chat` route with dedicated AI conversation space
- **Dual AI Engine**: Primary — **Google Gemini 2.5 Flash** via OpenAI-compatible gateway; Fallback — **OpenAI GPT-4o Mini**
- **Grounded RAG System** — Anti-hallucination prompt that strictly uses verified department data
- **Offline Fallback** — If no API key is configured, the client-side `getAccurateDepartmentReply()` provides instant rule-based answers
- **Quick Action Chips** — One-click queries for common topics

### 🎨 Design System
- **Brand Colors**: GIST Orange (`#E45C04`), Deep Navy (`#0B192C`), Gold Highlights (`#D4AF37`)
- **Typography**: Plus Jakarta Sans (headings) + Inter (body) + JetBrains Mono (code)
- **Glassmorphism** — Backdrop blur effects on cards and navigation
- **Responsive** — Mobile-first design with collapsible navigation
- **Interactive** — Hover states, transitions, scroll-triggered counters, animated sections
- **Shadcn UI** — Accessible Radix UI primitives with Tailwind styling
- **Lucide Icons** — Consistent, modern vector icon set

### ⚡ Performance & SEO
- **Server-Side Rendering (SSR)** via TanStack Start
- **Dynamic XML Sitemap** — Auto-generated at `/sitemap.xml`
- **TanStack Query** — Efficient client-side caching & data fetching
- **Cloudflare Workers Ready** — Nitro preset for edge deployment
- **Catastrophic SSR Error Recovery** — Custom error page for server crashes
- **Scroll Restoration** — Built-in TanStack Router scroll management

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|:---|:---|:---:|
| **Framework** | [React](https://react.dev/) | ^19.2.0 |
| **Full-Stack SSR** | [TanStack Start](https://tanstack.com/start) | ^1.168.26 |
| **Routing** | [TanStack Router](https://tanstack.com/router) | ^1.170.16 |
| **Build Tool** | [Vite](https://vitejs.dev/) | ^8.0.16 |
| **Server Engine** | [Nitro](https://nitro.unjs.io/) | 3.0.260603-beta |
| **CSS** | [Tailwind CSS](https://tailwindcss.com/) | ^4.2.1 |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) | — |
| **Icons** | [Lucide React](https://lucide.dev/) | ^0.575.0 |
| **AI SDK** | [Vercel AI SDK](https://sdk.vercel.ai/) | ^7.0.31 |
| **AI Provider** | Google Gemini 2.5 Flash / OpenAI GPT-4o Mini | — |
| **State Management** | [TanStack Query](https://tanstack.com/query) | ^5.101.1 |
| **Markdown** | react-markdown + remark-gfm | ^10.1.0 |
| **Package Manager** | [Bun](https://bun.sh/) | ^1.1.0+ |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | ^5.8.3 |

---

## 📁 Project Structure

```
gist-ai-hub/
├── public/                          # Static assets
│   ├── data/
│   │   ├── media-feed.json          # Media content feed
│   │   └── scraped-schema-example.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── site/                    # Site shell components
│   │   │   ├── Header.tsx           # Sticky nav + institutional branding
│   │   │   ├── Footer.tsx           # Multi-column footer with links & contacts
│   │   │   ├── PageShell.tsx        # Reusable page layout wrapper
│   │   │   ├── AIChatWidget.tsx     # Floating AI chat widget (client-side)
│   │   │   ├── GistSpotlight.tsx    # Spotlight/carousel section
│   │   │   └── Testimonials.tsx     # Alumni testimonials
│   │   └── ui/                      # Accessible UI primitives (Shadcn/Radix)
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── sheet.tsx
│   │       ├── tooltip.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── separator.tsx
│   │       ├── skeleton.tsx
│   │       └── toggle.tsx
│   ├── lib/                         # Business logic & utilities
│   │   ├── department-data.ts       # Central department data repository
│   │   ├── knowledge-base.ts        # AI system prompt builder (RAG)
│   │   ├── ai-gateway.server.ts     # Multi-provider AI gateway
│   │   ├── media-fetcher.ts         # Media content fetcher & YouTube helpers
│   │   ├── types/
│   │   │   └── media-content.ts     # Media content type definitions
│   │   ├── error-capture.ts         # Global error listener
│   │   ├── error-page.ts            # Custom 500 error page generator
│   │   └── utils.ts                 # Tailwind class merge utility (cn)
│   ├── routes/                      # File-based routes
│   │   ├── __root.tsx               # App shell, global meta, error/404 boundaries
│   │   ├── index.tsx                # Home page (hero, stats, quick links, HOD, etc.)
│   │   ├── about.tsx                # About department (tabs: Overview, V&M, PEOs, POs, PSOs)
│   │   ├── faculty.tsx              # Faculty directory with search/filter
│   │   ├── labs.tsx                 # Laboratories infrastructure
│   │   ├── programs.tsx             # Academic programs & syllabus
│   │   ├── events.tsx               # Events & VOICE Association
│   │   ├── research.tsx             # Research areas & activities
│   │   ├── placements.tsx           # Roll of Honour & placement resources
│   │   ├── downloads.tsx            # Downloads (calendars, newsletters, MOUs, etc.)
│   │   ├── gallery.tsx              # Media gallery with video playback
│   │   ├── contact.tsx              # Contact information & useful links
│   │   ├── chat.tsx                 # Full-page AI chat interface
│   │   ├── sitemap[.]xml.ts         # Dynamic XML sitemap generator
│   │   ├── README.md                # Routes conventions guide
│   │   └── api/
│   │       ├── chat.ts              # POST /api/chat — AI streaming endpoint
│   │       └── media.ts             # GET /api/media — Media content API
│   ├── routeTree.gen.ts             # Auto-generated route tree
│   ├── router.tsx                   # Router + QueryClient setup
│   ├── server.ts                    # Nitro server entry + SSR error handler
│   ├── start.ts                     # Client entry with error middleware
│   └── styles.css                   # Design system tokens & global styles
├── .prettierrc
├── bunfig.toml
├── components.json                  # Shadcn UI configuration
├── eslint.config.js
├── package.json
├── tsconfig.json
├── vite.config.ts
├── DEVELOPER_GUIDE.md               # Comprehensive developer reference
└── README.md                        # You are here
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0+ (v20+ recommended)
- **Bun** v1.1.0+ (recommended package manager) — install via `curl -fsSL https://bun.sh/install | bash`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gist-ai-hub

# Install dependencies
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Gemini API Key (Primary AI Provider — Recommended)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI API Key (Optional Fallback)
OPENAI_API_KEY=your_openai_api_key_here
```

> 💡 **No API key?** The AI features gracefully fall back to a client-side question-answering engine (`getAccurateDepartmentReply()`) that provides instant rule-based answers grounded in the official department data.

### Development

```bash
# Start the development server with HMR
bun run dev
```

The dev server starts at `http://localhost:3000`.

### Build for Production

```bash
# Build client and server assets
bun run build

# Preview production build locally
bun run preview
```

---

## 📜 Available Scripts

| Command | Description |
|:---|:---|
| `bun run dev` | Start Vite dev server with hot module replacement |
| `bun run build` | Build for production (client + server) |
| `bun run build:dev` | Build in development mode |
| `bun run build:ui` | Build UI assets only |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint across the codebase |
| `bun run format` | Format source files with Prettier |

---

## 🧭 Routes Overview

The application uses **TanStack Start file-based routing** (`@tanstack/react-router`).

| Route | Page | Description |
|:---|:---|:---|
| `/` | **Home** | Hero, stats, quick links, HOD message, programmes, vision/mission, faculty preview, testimonials, AI CTA |
| `/about` | **About** | Department overview, V&M, PEOs, POs, PSOs (tabbed interface) |
| `/faculty` | **Faculty** | 49 faculty with search, role filter, and profile modal |
| `/labs` | **Labs** | 8 laboratories with configurations, incharges, stats |
| `/programs` | **Programs** | B.Tech & M.Tech programmes + syllabus PDF downloads |
| `/events` | **Events** | CSE events, GIST TECHFEST winners, VOICE Association committee & events |
| `/research` | **Research** | Research areas, NPTEL, student publications, PSOs |
| `/placements` | **Placements** | Roll of Honour topper table, placement resources |
| `/downloads` | **Downloads** | Calendars, newsletters, tech magazines, MOUs, internship/visit reports (tabbed) |
| `/gallery` | **Gallery** | Media hub with YouTube embeds, reels, video lightbox |
| `/contact` | **Contact** | Address, phone, email, HOD info, useful links, social media |
| `/chat` | **AI Chat** | Full-page AI Assistant |
| `/sitemap.xml` | **Sitemap** | Dynamic XML sitemap for SEO |

---

## 🤖 AI Assistant Architecture

The chatbot features a **dual-layer response system**:

1. **Server-side AI Streaming** (`POST /api/chat`):
   - Uses **Google Gemini 2.5 Flash** (or OpenAI GPT-4o Mini fallback)
   - System prompt generated by `buildSystemPrompt()` from `src/lib/knowledge-base.ts`
   - Strict anti-hallucination rules — only answers from official department data
   - Returns streaming responses via Vercel AI SDK

2. **Client-side Fallback** (`getAccurateDepartmentReply()`):
   - Instant offline question-answering when the server API is unavailable
   - Covers: greetings, identity, faculty, HOD, programs, labs, placements, MOUs, events, contact, vision/mission
   - Includes guardrails against off-topic queries (weather, recipes, games, etc.)

**Data Grounding**: The AI is fed with complete department data from `src/lib/department-data.ts` including:
- Department info (accreditation, affiliation, codes)
- All 49 faculty members with designations & qualifications
- 8 laboratory specifications & incharges
- 4 programme structures & intakes
- Industry MOUs & collaborations
- Roll of Honour toppers
- VOICE events & committee

---

## 🎨 Design System

The design system is defined in `src/styles.css` with CSS custom properties:

| Token | Value | Usage |
|:---|:---|:---|
| `--gist-orange` | `#E45C04` | Primary actions, highlights, badges |
| `--navy-deep` | `#0B192C` | Dark backgrounds, hero sections, headers |
| `--navy` | `#1E3E62` | Secondary dark surfaces |
| `--gold-soft` | `#F4C430` | Accents, badge text on dark backgrounds |
| `--surface` | `#FFFFFF` | Card backgrounds |
| `--bg` | `#F8FAFC` | Page background |

**Typography**:
- **Headings**: Plus Jakarta Sans (700, 800) with tight letter-spacing
- **Body**: Inter (400, 500, 600) for readability
- **Code/Mono**: JetBrains Mono for technical elements

---

## 🔧 Configuration Files

| File | Purpose |
|:---|:---|
| `vite.config.ts` | Vite plugins (Tailwind, TanStack Start, Nitro, React, TS paths) |
| `tsconfig.json` | TypeScript strict mode with `@/*` path alias |
| `components.json` | Shadcn UI style configuration (New York) |
| `bunfig.toml` | Bun package manager settings (24h supply-chain guard) |
| `eslint.config.js` | Flat ESLint config with TypeScript, React hooks, Prettier |
| `.prettierrc` | Prettier formatting rules (100 char width, single quotes off) |

---

## 📦 Key Dependencies

### Production
- `@tanstack/react-start` — Full-stack SSR framework
- `@tanstack/react-router` — Type-safe file-based routing
- `@tanstack/react-query` — Async state management & caching
- `ai` + `@ai-sdk/openai-compatible` — AI SDK & provider gateway
- `react-markdown` + `remark-gfm` — Markdown rendering for AI responses
- `tailwindcss` — Utility-first CSS framework
- `lucide-react` — Icon library
- `@radix-ui/react-*` — Accessible UI primitives
- `class-variance-authority` + `clsx` + `tailwind-merge` — Shadcn utilities

### Dev
- `vite` — Build tool
- `nitro` — Server engine (Cloudflare Workers preset)
- `typescript` — Type checking
- `eslint` + `prettier` — Code quality & formatting

---

## 🚢 Deployment

The project is pre-configured for **Cloudflare Workers** via Nitro's `cloudflare-module` preset.

```bash
# Build for Cloudflare Workers
bun run build

# Deploy using wrangler
npx wrangler deploy .output/server/index.mjs
```

---

## 🤝 Contributing

1. Ensure you have **Bun** installed
2. Run `bun install` to set up dependencies
3. Create a `.env` file with your API keys (optional)
4. Start developing with `bun run dev`
5. Run `bun run lint` and `bun run format` before committing

---

## 📄 License

This project is proprietary — developed for the **Geethanjali Institute of Science & Technology (GIST)**.

---

## 🙏 Acknowledgments

- **Geethanjali Institute of Science & Technology** for the official department data
- **TanStack** team for React Router, Start, and Query
- **Vercel** for the AI SDK
- **Google** for Gemini API
- **Shadcn** for the UI component architecture

---

<div align="center">
  <p>
    <strong>Department of Computer Science & Engineering</strong><br>
    Geethanjali Institute of Science & Technology<br>
    Nellore, Andhra Pradesh, India<br>
    🌐 <a href="https://gist.edu.in/gist/computer-science-and-engineering/">Official CSE Page</a>
  </p>
</div>
