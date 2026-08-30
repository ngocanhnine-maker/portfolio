# Tran Ngoc Anh — Academic & Research Portfolio

A curated, bilingual (English / Vietnamese) academic, research, and professional portfolio archive of **Tran Ngoc Anh** (Hanoi–Amsterdam High School for the Gifted).

---

## 🌟 Overview & Highlights

This portfolio bridges quantitative finance, chemical research, econometric modelling, and social leadership into an interactive editorial dossier.

- **Bilingual Support (EN / VI)**: Global language toggle with persistent user preference and localized data across all sections.
- **Interactive Verification Modals**: Integrated PDF score reports, official award certificates, high-resolution galleries, and research paper viewers.
- **Ask AI Navigator**: Interactive conversational companion indexing verified portfolio documentation and academic achievements.
- **Editorial Design System**: High-contrast, typography-first warm neutral palette (`#F2EBDD` canvas, `#292929` deep charcoal, `#676749` olive accents).

---

## 📑 Portfolio Sections

| # | Section | Description |
|---|---|---|
| **01** | **About Me** | Editorial profile, academic major, and cross-disciplinary background |
| **02** | **Honors & Awards** | International, national, and regional awards (WICO Gold Medal, VEO 1st Prize, AXGO Gold, National Chemistry Olympiad) |
| **03** | **Education** | Academic GPA milestones (9.6 & 9.8 / 10.0), SAT (1520), IELTS (7.5), and A-Level Mathematics |
| **04** | **Projects** | Machine learning and econometric analytics suites (SME Financial Distress Forecaster, Green Lending Suite, GTEL Telecom Planning) |
| **05** | **Research** | Peer-reviewed publication (*Journal of Management Research*, 2026) and WICO 2026 AI SME Credit Risk Research |
| **06** | **Leadership** | Executive leadership initiatives and organizational stewardship |
| **07** | **Activities** | Professional internships (GTEL), community leadership (*Peace Village — Thanh Xuan*), and mentoring programs |
| **08** | **Interests** | Interdisciplinary academic pursuits and personal exploratory domains |
| **CV** | **Resume** | Full Curriculum Vitae with competency matrix and PDF download |
| **AI** | **Ask AI** | Real-time question answering assistant powered by portfolio context |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Engine**: [PDF.js](https://mozilla.github.io/pdf.js/)

---

## 📂 Repository Structure

```text
.
├── public/
│   ├── certificates/      # Verified award certificates & test score reports (PDF + JPG)
│   ├── documents/         # Official reports and activity letters
│   ├── gallery/           # Curated event & conference photography
│   │   ├── axgo/
│   │   ├── national-chem/
│   │   ├── peace-village/
│   │   └── wico/
│   ├── papers/            # Research publication PDFs and first-page previews
│   └── profile/           # High-resolution optimized profile photography
│
├── src/
│   ├── components/        # Modular page components, modals, sidebar, and landing
│   ├── context/           # React context providers (LanguageContext)
│   ├── data/              # Bilingual portfolio data and localization dictionaries
│   │   ├── portfolioData.ts
│   │   └── translations.ts
│   ├── types.ts           # Core TypeScript data schemas and interface declarations
│   ├── utils/             # Utility helpers (PDF.js rendering helpers)
│   ├── App.tsx            # Main application root layout & routing state
│   ├── main.tsx           # Application entry point
│   └── index.css          # Tailwind CSS global stylesheet
│
├── .env.example           # Template for environment configuration
├── .gitignore             # Git ignore definitions
├── metadata.json          # Platform metadata
├── package.json           # Project dependencies and npm scripts
├── tsconfig.json          # TypeScript compiler configuration
└── vite.config.ts         # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

This repository is maintained for personal academic and professional portfolio presentation. All rights reserved.
