# GIST CSE Department Web Platform — Developer Guide

Welcome to the **Geethanjali Institute of Science & Technology (GIST) - Computer Science & Engineering (CSE) Department Web Platform** developer guide. This document serves as a comprehensive technical reference for present and future software engineers, UI/UX designers, and system maintainers working on this codebase.

---

## 1. Project Overview & Objectives

The GIST CSE Web Platform is a modern, high-performance, full-stack web application and AI-powered portal for the Department of Computer Science & Engineering at GIST. It combines a rich, interactive, server-side rendered (SSR) web portal with an integrated AI Chatbot assistant that answers queries grounded strictly in official department data.

### Core Objectives

1. **Interactive Department Showcase**: Present comprehensive details regarding academic programs, faculty profiles, state-of-the-art laboratories, industry MOUs, placements, research areas, newsletters, and student association (VOICE) events.
2. **AI-Powered Virtual Assistant**: Provide real-time streaming AI assistance (`AIChatWidget`) grounded strictly on department data, eliminating hallucinations.
3. **Optimized Performance & SEO**: Native SSR and SSG capabilities powered by TanStack Start, Vite, and Cloudflare Nitro runtime with automated sitemap generator.
4. **Modular & Scalable Design System**: Built with Tailwind CSS v4, Radix UI primitives, Lucide icons, and Shadcn UI architecture.

---

## 2. Technical Architecture & Technology Stack

### 2.1 Core Programming Languages

- **TypeScript (`^5.8.3`)**: Strict mode type checking across server logic, client components, routing trees, and API definitions.
- **HTML5 & Modern CSS3**: Semantic HTML markup with custom CSS variables, Tailwind CSS v4 directives, and glassmorphism styling tokens.

### 2.2 Web & Server Frameworks

| Layer              | Technology                                     | Version           | Description                                                                       |
| :----------------- | :--------------------------------------------- | :---------------- | :-------------------------------------------------------------------------------- |
| **Framework**      | [React](https://react.dev/)                    | `^19.2.0`         | Core UI library for component structure and reactive state.                       |
| **Full-Stack SSR** | [TanStack Start](https://tanstack.com/start)   | `^1.168.26`       | Full-stack React framework built on TanStack Router for server-rendered web apps. |
| **Routing**        | [TanStack Router](https://tanstack.com/router) | `^1.170.16`       | Type-safe file-based router with client and server route loaders.                 |
| **Build System**   | [Vite](https://vitejs.dev/)                    | `^8.0.16`         | Next-generation frontend build tooling and HMR dev server.                        |
| **Server Engine**  | [Nitro](https://nitro.unjs.io/)                | `3.0.260603-beta` | Deployment engine pre-configured with `cloudflare-module` preset.                 |
| **Data Fetching**  | [TanStack Query](https://tanstack.com/query)   | `^5.101.1`        | Asynchronous state management and client-side caching wrapper.                    |

### 2.3 UI / UX Design System & Component Infrastructure

| Library                 | Version                                                | Usage                                                                                                          |
| :---------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| **Tailwind CSS**        | `^4.2.1`                                               | Utility-first CSS engine via `@tailwindcss/vite`.                                                              |
| **Radix UI Primitives** | `@radix-ui/react-*`                                    | Accessible, unstyled UI primitives (Accordion, Dialog, Select, Dropdown, Tabs, Tooltip, Sheet, Menubar, etc.). |
| **Shadcn Architecture** | `new-york` style                                       | Utility helpers: `class-variance-authority` (`^0.7.1`), `clsx` (`^2.1.1`), `tailwind-merge` (`^3.5.0`).        |
| **Iconography**         | `lucide-react` (`^0.575.0`)                            | Clean, modern vector SVG icons.                                                                                |
| **Carousels & Motion**  | `embla-carousel-react` (`^8.6.0`)                      | Touch-enabled smooth responsive carousels.                                                                     |
| **Drawers & Sheets**    | `vaul` (`^1.1.2`)                                      | Mobile-friendly slide-over drawers.                                                                            |
| **Data Visualization**  | `recharts` (`^2.15.4`)                                 | Interactive SVG chart components.                                                                              |
| **Toast Notifications** | `sonner` (`^2.0.7`)                                    | Toast notification banner system.                                                                              |
| **Forms & Validation**  | `react-hook-form` (`^7.71.2`) + `zod` (`^4.4.3`)       | Schema-driven client/server form validation.                                                                   |
| **Markdown Parser**     | `react-markdown` (`^10.1.0`) + `remark-gfm` (`^4.0.1`) | Markdown rendering engine for AI response formatting.                                                          |

### 2.4 AI Gateway & LLM Integration Engine

- **SDK**: Vercel AI SDK (`ai` `^7.0.31`, `@ai-sdk/react` `^4.0.34`, `@ai-sdk/openai-compatible` `^3.0.12`).
- **Primary AI Provider**: Google Gemini 2.5 Flash (`gemini-2.5-flash`) via `https://generativelanguage.googleapis.com/v1beta/openai/` OpenAI-compatible API gateway.
- **Fallback AI Provider**: OpenAI GPT-4o Mini (`gpt-4o-mini`).
- **System Prompt & RAG Grounding Engine**: Grounding prompt builder (`src/lib/knowledge-base.ts`) sourcing static department data from `src/lib/department-data.ts`.

---

## 3. Repository Directory Structure

```
gist-ai-hub/
├── .output/                      # Build output folder (nitro worker bundles)
├── public/                       # Static public assets (logos, images, favicon)
│   └── gist-logo.jpg
├── src/
│   ├── assets/                   # Image assets and illustrations
│   ├── components/               # React components
│   │   ├── site/                 # Application site shell & interactive widgets
│   │   │   ├── AIChatWidget.tsx  # AI Assistant floating chat widget
│   │   │   ├── Footer.tsx        # Responsive footer with department links & contacts
│   │   │   ├── Header.tsx        # Sticky navigation bar & mobile menu
│   │   │   └── PageShell.tsx     # Page layout wrapper (Header + Main + Footer)
│   │   └── ui/                   # 46 accessible UI primitives (Shadcn / Radix)
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Core business logic, data models & server utilities
│   │   ├── ai-gateway.server.ts  # Multi-provider AI Gateway initializer
│   │   ├── department-data.ts    # Comprehensive department data repository
│   │   ├── error-capture.ts      # Unhandled error hook & listener
│   │   ├── error-page.ts         # Custom 500 error page template generator
│   │   ├── knowledge-base.ts     # AI System Prompt builder & RAG context compiler
│   │   └── utils.ts              # Class name merger helper (`cn`)
│   ├── routes/                   # TanStack Start File-Based Route handlers
│   │   ├── api/
│   │   │   └── chat.ts           # POST /api/chat AI streaming endpoint
│   │   ├── __root.tsx            # Global layout shell, Head HTML, Error & 404 handler
│   │   ├── index.tsx             # Home Page (Hero, Highlights, Vision/Mission, HOD Note)
│   │   ├── about.tsx             # About Department, PEOs, PSOs, POs
│   │   ├── chat.tsx              # Full-page dedicated AI Chat interface
│   │   ├── contact.tsx           # Contact details, map, and query form
│   │   ├── downloads.tsx         # Syllabi, Newsletters, Tech Magazines
│   │   ├── events.tsx            # Student Association (VOICE) events & activities
│   │   ├── faculty.tsx           # Faculty roster, designations, qualifications & profiles
│   │   ├── gallery.tsx           # Department photo gallery
│   │   ├── labs.tsx              # Laboratories infrastructure & specifications
│   │   ├── placements.tsx        # Placement stats, top recruiters & salary packages
│   │   ├── programs.tsx          # B.Tech & M.Tech academic programs and intake
│   │   ├── research.tsx          # Research areas, publications & MOUs
│   │   └── sitemap[.]xml.ts      # Dynamic XML sitemap generator
│   ├── routeTree.gen.ts          # Auto-generated TanStack route tree
│   ├── router.tsx                # TanStack Router instantiation
│   ├── server.ts                 # Nitro server entry & Catastrophic SSR error handler
│   ├── start.ts                  # Client entry bootstrap script
│   └── styles.css                # Global Design System tokens & CSS styling
├── .prettierrc                   # Prettier formatting rules
├── bunfig.toml                   # Bun package manager configuration & security rules
├── components.json               # Shadcn UI configuration file
├── eslint.config.js              # Flat ESLint configuration
├── package.json                  # Dependencies & npm scripts
├── tsconfig.json                 # TypeScript paths and configuration
└── vite.config.ts                # Vite build config with TanStack & Nitro plugins
```

---

## 4. Core Technical Implementations

### 4.1 Routing Engine (TanStack Start & Router)

The application utilizes file-based routing provided by `@tanstack/react-router`.

- Routes are placed under `src/routes/`.
- Every page exports a `Route` defined via `createFileRoute("/route-name")`.
- `routeTree.gen.ts` is automatically synchronized by the Vite plugin (`@tanstack/router-plugin`) on save or dev server startup.
- `src/routes/__root.tsx` defines the outer document root (`<html>`, `<head>`, `<body>`), global CSS styles, meta tags, and wraps the tree in `QueryClientProvider` and `AIChatWidget`.

### 4.2 Server-Side Rendering (SSR) & Cloudflare Nitro Runtime

- Entry point for server rendering is defined in `src/server.ts` and configured in `vite.config.ts` via `tanstackStart({ server: { entry: "server" } })`.
- Nitro preset is configured as `preset: "cloudflare-module"` to support instant deployment on Cloudflare Workers / Cloudflare Pages.
- Handlers run edge-compatible serverless functions.

### 4.3 Error Handling & Catastrophic SSR Recovery System

To prevent unhandled server-side rendering errors from presenting raw JSON error payloads to users, `src/server.ts` includes `normalizeCatastrophicSsrResponse`:

- Intercepts h3 runtime swallowed HTTP 500 JSON responses.
- Uses `src/lib/error-capture.ts` to log original stack traces.
- Renders a clean, accessible fallback HTML error page using `src/lib/error-page.ts`.

### 4.4 AI Assistant & RAG System Prompt Engine

The AI assistant provides real-time streaming answers grounded strictly on department data.

#### Server Endpoint (`src/routes/api/chat.ts`):

1. Receives incoming message payload via `POST /api/chat`.
2. Reads environment key `GEMINI_API_KEY` (or fallback `OPENAI_API_KEY`).
3. Instantiates `@ai-sdk/openai-compatible` provider pointing to Gemini 2.5 Flash endpoint (`https://generativelanguage.googleapis.com/v1beta/openai/`).
4. Compiles system prompt using `buildSystemPrompt()` from `src/lib/knowledge-base.ts`.
5. Uses `streamText` from `ai` package and returns `toUIMessageStreamResponse()`.
6. If no API key is provided, returns a helpful structured instructions response explaining how to configure `.env`.

#### RAG System Prompt (`src/lib/knowledge-base.ts`):

Contains strict anti-hallucination rules:

```
STRICT RESPONSE RULES:
1. DIRECT RELEVANCE ONLY: Answer ONLY the specific question asked by the user.
2. FACULTY PROFILES: Output detailed profiles only when explicitly asked.
3. GROUNDING RULE (NO HALLUCINATION): Rely ONLY on official GIST CSE data.
4. MISSING DATA RULE: If data is absent, reply strictly: "Data is not available for this query."
```

---

## 5. UI/UX Design System & Styling Token Engine

The UI design system is located in `src/styles.css`.

### Brand Color Tokens

- **GIST Orange (Primary Action)**: `#E45C04` (`--gist-orange`)
- **Deep Navy (Brand Dark Accent)**: `#0B192C` (`--navy-deep`)
- **Navy Light (Sub-headings / Cards)**: `#1E3E62` (`--navy`) & `#2E5A88` (`--navy-light`)
- **Gold Highlight**: `#D4AF37` (`--gold`) & `#F4C430` (`--gold-soft`)
- **Background**: `#F8FAFC` (`--bg`)
- **Surface Card**: `#FFFFFF` (`--surface`)

### Typography

- **Headings**: `Plus Jakarta Sans` (Weights: 500, 600, 700, 800)
- **Body**: `Inter` (Weights: 300, 400, 500, 600, 700)

### Theme Utilities

- Glassmorphism backdrop filters (`.glass-card`, `.glass-header`).
- Custom scrollbar styling.
- Smooth transitions (`cubic-bezier(0.4, 0, 0.2, 1)`).

---

## 6. Data Model (`src/lib/department-data.ts`)

The central truth source for department data contains typed JavaScript structures for:

- `DEPARTMENT`: Basic info, accreditation (NAAC 'A+', NBA), affiliation (JNTUA), HOD details, vision, mission, PEOs, PSOs, POs, research areas, and contact details.
- `FACULTY`: Array of faculty members (name, designation, qualification, specialization, profile link).
- `LABORATORIES`: 6 specialized labs (AI & ML Lab, Data Structures Lab, Python Programming Lab, Web Technologies Lab, Object Oriented Programming Lab, Computer Networks Lab) with computer count, hardware config, and lab incharge details.
- `PROGRAMMES`: B.Tech CSE (Intake 180), B.Tech AI & ML (Intake 60), B.Tech Data Science (Intake 60), M.Tech CSE (Intake 18).
- `MOUS`: Industry collaborations (Oracle Academy, AWS Academy, Cisco Networking Academy, Palo Alto Networks, Red Hat Academy, Eduskills).
- `INTERNSHIPS` & `INDUSTRIAL_VISITS`: Historical academic year statistics.
- `ROLL_OF_HONOUR`: Academic toppers list with roll numbers and CGPA.
- `VOICE_COMMITTEE` & `VOICE_EVENTS`: Student association committee members and organized workshops/events.

---

## 7. Development & Environment Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Bun**: v1.1.0+ (recommended package manager) or standard `npm` / `pnpm`

### Installation

```bash
# Clone repository
git clone <repository-url>
cd gist-ai-hub

# Install dependencies using Bun
bun install
```

### Environment Variables Setup

Create a `.env` file in the root directory:

```env
# Gemini API Key (Recommended)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI API Key (Optional Fallback)
OPENAI_API_KEY=your_openai_api_key_here
```

### Available Scripts

| Command       | Action                                                          |
| :------------ | :-------------------------------------------------------------- |
| `bun dev`     | Starts Vite development server with HMR.                        |
| `bun build`   | Compiles client and server production assets with Vite & Nitro. |
| `bun preview` | Previews the production build locally.                          |
| `bun lint`    | Runs ESLint across the codebase.                                |
| `bun format`  | Formats source files using Prettier.                            |

---

## 8. Developer Maintenance Playbook

### 8.1 Adding a New Page

1. Create a new file in `src/routes/your-page.tsx`.
2. Define the route using `createFileRoute`:
   ```tsx
   import { createFileRoute } from "@tanstack/react-router";
   import { PageShell } from "@/components/site/PageShell";

   export const Route = createFileRoute("/your-page")({
     component: YourPageContent,
   });

   function YourPageContent() {
     return (
       <PageShell title="Your Page Title" description="Brief summary">
         <div className="container py-8">{/* Your Content Here */}</div>
       </PageShell>
     );
   }
   ```
3. Save the file. TanStack Router plugin will automatically regenerate `src/routeTree.gen.ts`.
4. Add the navigation item to `src/components/site/Header.tsx` and `src/components/site/Footer.tsx`.

### 8.2 Updating AI Knowledge Base Data

1. Modify or add entries in `src/lib/department-data.ts`.
2. The AI system prompt generator (`src/lib/knowledge-base.ts`) automatically ingests updated exports.
3. No prompt re-engineering required — the AI Assistant will instantly reference new data.

### 8.3 Adding New UI Components

Use standard Shadcn / Radix UI patterns. Place new primitive components in `src/components/ui/` and export them following existing conventions (using `cn()` for Tailwind class merging).

---

## 9. Conclusion & Further Support

This developer guide provides all necessary technical foundation for developing, maintaining, and scaling the GIST CSE Department Web Platform. For questions or structural changes, refer to the code comments or consult the repository maintainers.
