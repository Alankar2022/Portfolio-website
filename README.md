# React Developer Portfolio (Next.js + Tailwind + Framer Motion)

A modern portfolio website for a React developer, built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**.

## Tech Stack

- **Framework:** Next.js 14
- **UI:** React 18 + Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```bash
.
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx
│   └── template.jsx
├── components/
│   ├── sections/
│   │   ├── AboutSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   └── SkillsSection.jsx
│   └── ui/
│       ├── AnimatedBackdrop.jsx
│       ├── AnimatedSection.jsx
│       ├── ScrollProgress.jsx
│       └── SectionShell.jsx
├── lib/
│   └── data.js
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tailwind.config.js
```

---

## Getting Started

### 1) Clone repository

```bash
git clone <your-repo-url>
cd Portfolio-website
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run development server

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## Available Scripts

- `npm run dev` → start local development server
- `npm run build` → build production app
- `npm run start` → run production build locally
- `npm run lint` → run Next.js ESLint checks

---

## Build for Production

```bash
npm run build
npm run start
```

---

## Customization Guide

### Update portfolio content

Edit:

- `lib/data.js` for project cards and skills data.
- `components/sections/*` for section text and CTA content.

### Update design system

Edit:

- `tailwind.config.js` for color/theme tokens.
- `app/globals.css` for shared utilities such as `.glass`, `.muted`, and `.section-title`.

---

## Animation Notes

Current animation features:

- Page enter transition (`app/template.jsx`)
- Scroll progress bar (`components/ui/ScrollProgress.jsx`)
- Fade + slide on scroll (`components/ui/AnimatedSection.jsx`)
- Gentle card/button hover interactions
- Subtle hero parallax using Framer Motion transforms

---

## Deployment

You can deploy directly to **Vercel** (recommended for Next.js):

1. Push this repository to GitHub.
2. Import project into Vercel.
3. Use default Next.js build settings.

---

## License

This project is provided for portfolio/demo use. Add your preferred license if needed.
