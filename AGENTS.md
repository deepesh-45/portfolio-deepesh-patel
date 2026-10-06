# AI Agent Guidelines — Deepesh Patel Portfolio

This repository contains the personal portfolio website of Deepesh Patel, an AI & Machine Learning Engineer.

## 🛠️ Architecture & Tech Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Vanilla CSS
- **Graphics**: WebGL via `ogl` for animated fluid waves (`GradientWaves.jsx`)
- **UI Components**: React Bits interactive components (`SpotlightCard`, `TextPressure`, `ShinyText`, `TiltedCard`, `DecayCard`, `Dock`)
- **Icons**: Lucide React
- **Deployment**: Vercel (configured via `vercel.json` with standard `vite build`)

## 📋 Build & Quality Commands

- `npm run dev`: Starts local Vite development server.
- `npm run build`: Executes `vite build` to produce production output in `dist/`.
- `npm run type-check`: Executes `tsc -b` for strict TypeScript validation.
- `npx oxlint`: Runs fast lint checks.

## 🚨 Development Conventions

1. **Do not introduce Next.js artifacts**: This project was migrated to Vite + React. Do not import `next/*` or add Next.js configurations.
2. **Asset Organization**:
   - Static assets served at `/` belong in `public/` using clean kebab-case names (e.g. `project-*.png`, `deepesh-patel-resume.pdf`).
   - Do not commit boilerplate or unused icons (`file.svg`, `globe.svg`, `next.svg`, etc.).
3. **Styling**:
   - Tailwind CSS v4 is imported via `@import "tailwindcss";` in `src/index.css`.
   - Do not import `tw-animate-css` directly as it is incompatible with Vite v4 bundler.
4. **Bilingual Support**:
   - Maintain dual-language consistency (`EN` and `हिंदी`) whenever updating text copy in `App.tsx` or `Chatbox.tsx`.
