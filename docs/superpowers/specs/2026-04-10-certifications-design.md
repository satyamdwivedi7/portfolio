# Certifications Feature — Design Spec

**Date:** 2026-04-10
**Repos:** `portfolio` (Next.js frontend), `portfolio-api` (Express + MongoDB backend)

---

## Overview

Add a **Certifications** section to the portfolio homepage that showcases professional certifications (AWS, OCI, Anthropic) and college achievements. Certificates are stored in MongoDB and fetched by the frontend — no code changes required to add new certs.

---

## Architecture

Follows the exact same pattern as the existing Projects and Skills features:

```
POST /new-certification (secret middleware)  →  MongoDB (certifications collection)
GET  /certifications (public)               →  Frontend fetchCertifications()
                                            →  Certifications component (badge cards)
```

---

## Data Model (`portfolio-api/model/certifications.js`)

```js
{
  title:         String,   // e.g. "AWS Solutions Architect – Associate"
  issuer:        String,   // e.g. "Amazon Web Services"
  issuedDate:    String,   // e.g. "Jan 2024" (display string, not a Date)
  credentialUrl: String,   // Official verification URL or Google Drive share link
  category:      String,   // "cloud-ai" | "college" (used for accent color grouping)
  icon:          String,   // Emoji, e.g. "☁️"
  order:         Number,   // Display order (ascending, lower = first)
  createdAt:     Date,     // Auto-set (default: Date.now)
}
```

**Seed data to POST after deployment:**

| title | issuer | category | icon |
|---|---|---|---|
| AWS Solutions Architect – Associate | Amazon Web Services | cloud-ai | ☁️ |
| OCI AI Foundations | Oracle Cloud | cloud-ai | 🤖 |
| OCI Generative AI Professional | Oracle Cloud | cloud-ai | 🦾 |
| Claude Code In Action | Anthropic | cloud-ai | 🧠 |
| Certificate of Participation | College | college | 🎓 |
| (other college achievements) | College | college | 🏆 |

---

## API (`portfolio-api`)

### New files
- `model/certifications.js` — Mongoose schema above
- `controller/certifications.controller.js` — `createCertification`, `getCertifications`

### Route additions (`routes.js`)
```
GET  /certifications       → getCertifications (public, sorted by order asc)
POST /new-certification    → secretMiddleware → createCertification
```

---

## Frontend (`portfolio`)

### New file
- `src/components/Certifications.js` — badge card grid component

### Modified files
- `src/lib/api.js` — add `fetchCertifications()` with 5-min localStorage cache (same pattern as `fetchProjects`)
- `src/app/page.js` — import `<Certifications />`, place between `<Projects />` and `<Contact />`

### Component behaviour
- Fetches `/certifications` on mount, caches in localStorage for 5 minutes
- Renders responsive grid of badge cards: circle icon + title + issuer + issued date + "View Certificate ↗" button
- "View Certificate" opens `credentialUrl` in a new tab
- Accent color on the button is determined by `category`: blue for `cloud-ai`, green for `college`
- Loading skeleton shown while fetching; empty state shown if no certs returned
- Section heading: "Certifications" with subheading "ACHIEVEMENTS" label, consistent with existing section styling

### Page order
`Hero → About → Skills → Projects → **Certifications** → Contact`

---

## Adding New Certificates (no code changes)

```bash
curl -X POST https://portfolio-api.satyamdwivedi.com.np/new-certification \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "<your-secret>",
    "title": "New Cert Title",
    "issuer": "Issuer Name",
    "issuedDate": "Apr 2026",
    "credentialUrl": "https://...",
    "category": "cloud-ai",
    "icon": "🏅",
    "order": 5
  }'
```

For Google Drive certs: set sharing to "Anyone with the link can view", copy the share URL as `credentialUrl`.

---

## Out of Scope

- Admin UI for adding certs (API call is sufficient)
- PDF upload/hosting (external links only)
- Certificate image thumbnails/previews
- Filtering or sorting UI on the frontend
