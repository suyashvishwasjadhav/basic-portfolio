# Suyash Vishwas Jadhav — Portfolio & Systems Workspace

A futuristic, high-performance portfolio and systems workspace built with React, Vite, TailwindCSS, GSAP, Framer Motion, and Lenis smooth scrolling.

---

## ⚡ Quick Start

### 1. Requirements
- **Node.js**: v20+ or v24+
- **pnpm**: v9+ or v12+

Enable `pnpm` via Corepack if not already activated:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
To launch the portfolio website:
```bash
pnpm run dev
# or
pnpm run dev:portfolio
```
The application will start at **`http://localhost:5173`**.

---

## 📁 Repository Structure & Directory Roles

```text
SJ/
├── artifacts/
│   ├── portfolio/         # Main portfolio React application (Vite + GSAP + TailwindCSS)
│   ├── api-server/        # Express 5 backend API service
│   └── mockup-sandbox/    # Component preview & experimentation sandbox
├── attached_assets/       # Video backgrounds, 3D props & media assets
├── lib/                   # Shared TypeScript packages & schemas
│   ├── api-client-react/  # Auto-generated React query hooks for the API
│   ├── api-spec/          # OpenAPI contracts & generator config
│   ├── api-zod/           # Zod schema definitions
│   └── db/                # Drizzle ORM schema & database client
├── scripts/               # Utility scripts & build helpers
├── package.json           # Root workspace scripts & dev tools
└── pnpm-workspace.yaml    # Monorepo configuration and platform overrides
```

### Is the `artifacts/` folder necessary?
**Yes, absolutely.**  
This repository is configured as a **pnpm monorepo workspace**. The actual source code of your portfolio frontend lives inside `artifacts/portfolio`. The other sub-projects in `artifacts/` provide backend (`api-server`) and sandbox capabilities (`mockup-sandbox`).

---

## 🛠 Available Commands

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Starts the portfolio frontend in development mode (`port 5173`) |
| `pnpm run dev:portfolio` | Explicit command to run the portfolio frontend |
| `pnpm run dev:api` | Starts the Express backend API server (`port 5000`) |
| `pnpm run build` | Typechecks and builds all workspace packages |
| `pnpm run build:portfolio` | Builds production assets for the portfolio frontend |
| `pnpm run typecheck` | Validates TypeScript types across the entire project |

---

## 🎨 Tech Stack

- **Framework**: React 19 + Vite 7
- **Styling**: TailwindCSS 4
- **Motion & Scroll**: GSAP + ScrollTrigger, Lenis Smooth Scrolling, Framer Motion
- **Icons & UI**: Lucide React, React Icons, Radix UI Primitives
- **Backend (Optional)**: Node.js, Express 5, PostgreSQL, Drizzle ORM
