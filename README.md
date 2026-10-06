# Deepesh Patel — Personal Portfolio

An interactive, high-performance personal portfolio built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **React Bits** UI components.

🌐 **Live Website**: [Vercel Deployment](https://portfolio-deepesh-patel.vercel.app/) (or configured custom domain)  
📄 **Documentation & Project Links**: [`docs/project-references.md`](docs/project-references.md)

---

## 🌟 Key Features

- **Dynamic WebGL Gradient Waves**: Full-screen interactive fluid background rendered with WebGL (`ogl`) and custom shaders, dynamically responding to color themes.
- **Organic Sage Theme**: Tailored color palette with light and dark modes based on modern earth-tone aesthetics (`#9CB080`, `#618764`, `#2B5748`, `#273338`).
- **Floating Top Dock Navbar**: Glassmorphism dock navigation bar with smooth scrolling, section anchors, theme switching, and language toggle.
- **Dual-Language Support**: Seamless instant toggle between English and Hindi (`EN` / `हिंदी`) across all sections, headings, descriptions, and chatbot responses.
- **Interactive AI Assistant**: Embedded bilingual AI assistant chat widget (`Chatbox.tsx`) capable of answering questions about Deepesh's background, education, projects, skills, and certifications.
- **Clean Responsive Layout**: Mobile-first architecture tested across mobile viewports, tablets, and ultra-wide desktop displays.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component rendering |
| **TypeScript** | Type-safe development with strict validation |
| **Vite 6** | Ultra-fast development server & production bundler |
| **Tailwind CSS v4** | Utility-first CSS styling engine |
| **OGL / WebGL** | Lightweight WebGL library powering animated wave shaders |
| **Lucide React** | Consistent, modern vector iconography |
| **Geist Font** | Clean, contemporary typography |

---

## 📁 Repository Structure

```
├── docs/                             # Project references and external documentation
│   └── project-references.md         # Catalog of live demos, certifications & profiles
├── public/                           # Static assets served at root
│   ├── deepesh-patel-resume.pdf      # Resume download asset
│   ├── favicon.svg                   # Browser tab favicon
│   ├── profile-deepesh-patel.png     # Profile photograph
│   ├── project-books-recommender.png # Thumbnail: Books Recommender
│   ├── project-laptop-recommender.png# Thumbnail: Laptop Recommender
│   └── project-reflect-ai.png        # Thumbnail: Reflect AI
├── src/                              # Application source code
│   ├── components/                   # UI and layout components
│   │   ├── Chatbox.tsx               # AI assistant interactive chatbot
│   │   ├── DecayCard.tsx             # Physics-based interactive decay card
│   │   ├── Dock.tsx                  # Top floating navigation dock
│   │   ├── GradientWaves.css         # Shaders and layout styles for WebGL canvas
│   │   ├── GradientWaves.d.ts        # TypeScript declaration for WebGL component
│   │   ├── GradientWaves.jsx         # WebGL shader-based animated background
│   │   ├── MaskedHeading.tsx         # Gradient masked heading text effect
│   │   ├── ShinyText.tsx             # Shimmer animated text component
│   │   ├── SpotlightCard.tsx         # Mouse-tracking radial spotlight card
│   │   ├── TextPressure.tsx          # Variable font pressure animation
│   │   └── TiltedCard.tsx            # 3D perspective hover card
│   ├── lib/
│   │   └── utils.ts                  # Class merging utility (clsx + tailwind-merge)
│   ├── types/
│   │   └── maath.d.ts                # Math helper type definitions
│   ├── App.css                       # Global custom CSS rules
│   ├── App.tsx                       # Main portfolio application page
│   ├── index.css                     # Tailwind CSS v4 entry point & design tokens
│   └── main.tsx                      # Vite React DOM entry point
├── components.json                   # UI component registry configuration
├── eslint.config.mjs                 # ESLint flat configuration
├── index.html                        # Application HTML entry document
├── package.json                      # Project metadata, dependencies and scripts
├── tsconfig.app.json                 # TypeScript compiler configuration for application
├── tsconfig.json                     # Root TypeScript configuration
├── tsconfig.node.json                # TypeScript compiler configuration for Vite/Node
├── vercel.json                       # Vercel deployment routing configuration
└── vite.config.ts                    # Vite build configuration with Tailwind plugin
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18+ or 20+ recommended)
- npm (version 9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/deepesh-45/portfolio-deepesh-patel.git
cd portfolio-deepesh-patel

# Install dependencies
npm install
```

### Development

```bash
# Start local Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Type-Check & Build

```bash
# Validate TypeScript types
npm run type-check

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📬 Contact & Links

- **Email**: `pateldeepesh1408@gmail.com`
- **GitHub**: [@deepesh-45](https://github.com/deepesh-45)
- **LinkedIn**: [Deepesh Patel](https://www.linkedin.com/in/deepesh-patel-564b35398)
