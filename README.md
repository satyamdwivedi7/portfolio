# Satyam Dwivedi — Portfolio

Personal portfolio website built with Next.js 16, featuring a dark theme, smooth animations, and fully API-driven content.

Live: [satyamdwivedi.com.np](https://satyamdwivedi.com.np)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19, Tailwind CSS 3 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Fonts | Inter, Fira Code (via next/font) |
| Deployment | Vercel |

---

## Features

- **API-driven content** — Projects, Skills, and Certifications are fetched from the backend with 5-minute localStorage caching
- **Server-side contact proxy** — Contact form routes through `/api/contact` keeping `API_SECRET` out of the browser bundle
- **SEO** — JSON-LD structured data (Person, WebSite, ProfilePage), Open Graph, Twitter cards, sitemap, robots.txt, Google Search Console verified
- **Responsive** — Mobile-first, single column on small screens
- **Dark theme** — Glassmorphism cards, neon accent colors, canvas grid background
- **Custom cursor and scroll progress indicator**

## Sections

- Hero
- About
- Skills
- Projects
- Certifications
- Contact

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/satyamdwivedi7/portfolio.git
cd portfolio
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
API_BASE_URL=https://portfolio-api.satyamdwivedi.com.np
API_SECRET=your_api_secret
```

Both are server-only variables (no `NEXT_PUBLIC_` prefix) and are never sent to the browser. `API_SECRET` must match the value configured in the backend.

### Run

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## Project Structure

```
src/
  app/
    api/contact/route.js   # Server-side proxy for contact form
    layout.js              # Root layout, metadata, JSON-LD schemas
    page.js                # Home page
  components/
    About.js
    AnimatedBackground.js
    Certifications.js
    Contact.js
    CursorEffect.js
    DataProvider.js
    Footer.js
    Hero.js
    Navbar.js
    Projects.js
    ScrollProgress.js
    Skills.js
    SocialIcons.js         # Inline SVG brand icons
  lib/
    api.js                 # Data fetching with localStorage caching
```

---

## Backend

API source: [portfolio-api](https://github.com/satyamdwivedi7/portfolio-api)
