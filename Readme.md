![logo wikidotexe](https://github.com/user-attachments/assets/da82fc30-1dbe-48bf-b57c-033dec2ceb9d)

# wikidotexe — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-EF0E7B?logo=framer)](https://www.framer.com/motion/)

Personal portfolio of **Dwiki Arlian Maulana** — IT Support & System Engineer with 6+ years of experience managing networks, servers, cloud infrastructure, and end-user systems.

---

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Styling** — Tailwind CSS v4 with custom brutalist design tokens
- **Animations** — Framer Motion (`motion/react`)
- **Smooth Scroll** — Lenis
- **Fonts** — Space Grotesk (display), Inter (body)

---

## Project Structure

```
wikidotexe-studio/
├── public/
│   ├── certificate/      # Certificate images (.webp)
│   ├── logo/             # Site logo
│   ├── projects/         # Project screenshots (.webp)
│   └── portrait.jpg      # Profile photo
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles & Tailwind config
│   │   ├── layout.tsx    # Root layout & metadata
│   │   ├── not-found.tsx # 404 page
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   ├── custom-cursor.tsx
│   │   ├── motion-primitives.tsx
│   │   ├── portfolio.tsx  # Main portfolio content
│   │   └── ui/           # shadcn/ui components
│   └── hooks/
│       └── use-lenis.ts
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

- Custom animated cursor with hover states
- Lenis smooth scroll
- Certificate viewer with modal popup and credential links
- Work experience timeline
- Projects gallery with live demo / docs links
- Skills grid (5 categories)
- Grain texture overlay & brutalist design system
- Fully responsive

---

## License

MIT License — feel free to use this as inspiration for your own portfolio.
    