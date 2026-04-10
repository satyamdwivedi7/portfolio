# Certifications Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Certifications section to the portfolio homepage, backed by MongoDB and fetched from the existing Express API — no code changes needed to add new certificates after deployment.

**Architecture:** Follows the existing projects/skills pattern: a Mongoose model and controller in `portfolio-api`, two routes (public GET + secret-protected POST), a `fetchCertifications()` function in the frontend's `api.js` with localStorage caching, and a `Certifications.js` component placed between Projects and Contact on the homepage.

**Tech Stack:** Node.js, Express, Mongoose (portfolio-api) · Next.js 14, React, Tailwind CSS, Framer Motion, Lucide React (portfolio)

---

## File Map

**portfolio-api — new files:**
- `model/certifications.js` — Mongoose schema for a certification
- `controller/certifications.controller.js` — `createCertification`, `getCertifications`

**portfolio-api — modified files:**
- `routes.js` — add `GET /certifications` and `POST /new-certification`

**portfolio — new files:**
- `src/components/Certifications.js` — badge card grid component

**portfolio — modified files:**
- `src/lib/api.js` — add `fetchCertifications()` with localStorage cache
- `src/app/page.js` — import `<Certifications />`, place between `<Projects />` and `<Contact />`

---

## Task 1: Certification Mongoose Model

**Repo:** `portfolio-api`

**Files:**
- Create: `model/certifications.js`

- [ ] **Step 1: Create the model file**

```js
// portfolio-api/model/certifications.js
const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: 'String',
  issuer: 'String',
  issuedDate: 'String',
  credentialUrl: 'String',
  category: 'String',
  icon: 'String',
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Certification = mongoose.model('Certification', certificationSchema);
module.exports = Certification;
```

- [ ] **Step 2: Verify the file exists**

```bash
cat portfolio-api/model/certifications.js
```
Expected: file contents printed without error.

- [ ] **Step 3: Commit**

```bash
cd portfolio-api
git add model/certifications.js
git commit -m "feat: add Certification mongoose model"
```

---

## Task 2: Certifications Controller

**Repo:** `portfolio-api`

**Files:**
- Create: `controller/certifications.controller.js`

- [ ] **Step 1: Create the controller file**

```js
// portfolio-api/controller/certifications.controller.js
const Certification = require('../model/certifications');

module.exports.createCertification = async (req, res) => {
  const { title, issuer, issuedDate, credentialUrl, category, icon, order } = req.body;
  try {
    const certification = new Certification({
      title,
      issuer,
      issuedDate,
      credentialUrl,
      category,
      icon,
      order: order || 0,
    });
    await certification.save();
    res.status(201).send(certification);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports.getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ order: 1 });
    res.status(200).send(certifications);
  } catch (error) {
    res.status(400).send(error);
  }
};
```

- [ ] **Step 2: Verify the file exists**

```bash
cat portfolio-api/controller/certifications.controller.js
```
Expected: file contents printed without error.

- [ ] **Step 3: Commit**

```bash
git add controller/certifications.controller.js
git commit -m "feat: add certifications controller"
```

---

## Task 3: Add Routes

**Repo:** `portfolio-api`

**Files:**
- Modify: `routes.js`

- [ ] **Step 1: Add the imports and routes to `routes.js`**

Add after the existing `require` statements at the top:
```js
const {
  createCertification,
  getCertifications,
} = require('./controller/certifications.controller');
```

Add before `module.exports = router;`:
```js
router.get('/certifications', getCertifications);
router.post('/new-certification', secretMiddleware, createCertification);
```

The final `routes.js` should look like:
```js
const { Router } = require("express");
const router = Router();

const {
  createProject,
  getProjects,
} = require("./controller/projects.controller");
const secretMiddleware = require("./middleware/secret.middlleware");

const { createSkill, getSkill } = require("./controller/skills.controller");
const { sendMail } = require("./mail/mail");

const {
  createCertification,
  getCertifications,
} = require('./controller/certifications.controller');

router.get("/", (req, res) => {
  res.send("API is running successfully");
});
router.post("/naya-project", secretMiddleware, createProject);
router.get("/projects", getProjects);
module.exports = router;

router.post("/new-skillset", secretMiddleware, createSkill);
router.get("/skills", getSkill);

router.post("/sendmail", secretMiddleware, async (req, res) => {
  try {
    const { to, name, messageFromVisitor } = req.body;
    await sendMail(to, name, messageFromVisitor);
    res.status(200).json({ message: "Mail sent" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/certifications', getCertifications);
router.post('/new-certification', secretMiddleware, createCertification);
```

- [ ] **Step 2: Commit**

```bash
git add routes.js
git commit -m "feat: add certifications routes"
```

---

## Task 4: Deploy API and Verify Endpoints

**Repo:** `portfolio-api`

- [ ] **Step 1: Deploy to Vercel (or restart local server)**

Push to trigger Vercel deployment, or start the server locally:
```bash
# Local test
node index.js
```

- [ ] **Step 2: Verify GET /certifications returns empty array**

```bash
curl https://portfolio-api.satyamdwivedi.com.np/certifications
```
Expected: `[]`

- [ ] **Step 3: POST a test certificate**

```bash
curl -X POST https://portfolio-api.satyamdwivedi.com.np/new-certification \
  -H "Content-Type: application/json" \
  -H "secret: <your-secret-key>" \
  -d '{
    "title": "Test Certificate",
    "issuer": "Test Issuer",
    "issuedDate": "Apr 2026",
    "credentialUrl": "https://example.com",
    "category": "cloud-ai",
    "icon": "🧪",
    "order": 99
  }'
```
Expected: `201` response with the created object including `_id`.

- [ ] **Step 4: Verify GET returns the new certificate**

```bash
curl https://portfolio-api.satyamdwivedi.com.np/certifications
```
Expected: array with 1 item — the test certificate.

- [ ] **Step 5: Delete the test certificate via MongoDB Atlas**

Log in to MongoDB Atlas, find the `certifications` collection, delete the document with `title: "Test Certificate"`.

---

## Task 5: Add `fetchCertifications` to Frontend API Utility

**Repo:** `portfolio`

**Files:**
- Modify: `src/lib/api.js`

- [ ] **Step 1: Add `fetchCertifications` to `src/lib/api.js`**

Append after the `fetchSkills` function:

```js
export async function fetchCertifications() {
  try {
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem('portfolio-certifications');
      const cacheTimestamp = localStorage.getItem('portfolio-certifications-timestamp');
      const now = Date.now();

      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_BASE_URL}/certifications`, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch certifications: ${response.status}`);
    }

    const data = await response.json();

    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-certifications', JSON.stringify(data));
      localStorage.setItem('portfolio-certifications-timestamp', Date.now().toString());
    }

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection.');
    }
    console.error('Error fetching certifications:', err);
    throw err;
  }
}
```

- [ ] **Step 2: Verify no syntax errors**

```bash
cd portfolio
node -e "import('./src/lib/api.js').then(() => console.log('OK')).catch(e => console.error(e))"
```
Expected: `OK` (or no error about syntax).

- [ ] **Step 3: Commit**

```bash
git add src/lib/api.js
git commit -m "feat: add fetchCertifications to api utility"
```

---

## Task 6: Build the Certifications Component

**Repo:** `portfolio`

**Files:**
- Create: `src/components/Certifications.js`

- [ ] **Step 1: Create the component**

```jsx
// src/components/Certifications.js
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchCertifications } from '@/lib/api';

const accentColors = {
  'cloud-ai': {
    border: 'border-blue-500/20',
    button: 'bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20',
  },
  'college': {
    border: 'border-green-500/20',
    button: 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20',
  },
};

const defaultAccent = {
  border: 'border-white/10',
  button: 'bg-white/5 border border-white/20 text-gray-400 hover:bg-white/10',
};

function CertCard({ cert }) {
  const accent = accentColors[cert.category] || defaultAccent;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={`flex flex-col items-center text-center p-6 rounded-2xl glass border ${accent.border} gap-3`}
    >
      <div className="w-14 h-14 rounded-full bg-dark-800 flex items-center justify-center text-3xl">
        {cert.icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-white leading-tight">{cert.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{cert.issuer}</p>
        <p className="text-xs text-gray-600 mt-1">{cert.issuedDate}</p>
      </div>
      <a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-xs px-4 py-1.5 rounded-full transition-colors duration-200 ${accent.button}`}
      >
        View Certificate ↗
      </a>
    </motion.div>
  );
}

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCertifications();
        if (isMounted) {
          setCertifications(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching certifications:', err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-blue-500 text-xs tracking-widest uppercase mb-3">ACHIEVEMENTS</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional certifications and academic achievements that validate my expertise.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-neon-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Loading Certifications...</h3>
            <p className="text-gray-400">Fetching data from the server</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Error Loading Certifications</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neon-cyan text-dark-950 rounded-lg font-semibold hover:bg-neon-cyan/90 transition-colors duration-300"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && certifications.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🏅</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Certifications Yet</h3>
            <p className="text-gray-400">Check back soon.</p>
          </motion.div>
        )}

        {/* Certification Cards Grid */}
        {!loading && !error && certifications.length > 0 && (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {certifications.map((cert) => (
              <CertCard key={cert._id} cert={cert} />
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Certifications.js
git commit -m "feat: add Certifications badge card component"
```

---

## Task 7: Wire Certifications into the Homepage

**Repo:** `portfolio`

**Files:**
- Modify: `src/app/page.js`

- [ ] **Step 1: Add the import and component to `page.js`**

The final `page.js` should be:

```js
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Certifications from "@/components/Certifications";

export const metadata = {
  title: "Satyam Dwivedi - Full Stack Developer Portfolio",
  description:
    "Innovative Full Stack Developer specializing in MERN stack, Next.js, and cutting-edge web technologies. Explore my projects and let's build something amazing together.",
  openGraph: {
    title: "Satyam Dwivedi - Full Stack Developer Portfolio",
    description:
      "Innovative Full Stack Developer crafting exceptional digital experiences with modern web technologies.",
    url: "https://satyamdwivedi.com.np",
    images: [
      {
        url: "https://satyamdwivedi.com.np/satyam-dwivedi.webp",
        width: 1200,
        height: 630,
        alt: "Satyam Dwivedi - Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://twitter.com/satyam_7579",
    creator: "@satyam_7579",
  },
  keywords: [
    "Full Stack Developer",
    "React.js",
    "Next.js",
    "Node.js",
    "MERN Stack",
    "Web Development",
    "Portfolio",
    "Satyam Dwivedi"
  ],
  authors: [{ name: "Satyam Dwivedi" }],
  creator: "Satyam Dwivedi",
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
}
```

- [ ] **Step 2: Run the dev server and verify the section renders**

```bash
cd portfolio
npm run dev
```

Open `http://localhost:3000` and scroll to the Certifications section. Expected: section heading visible, loading spinner shown while fetching, empty state or cards shown after fetch.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.js
git commit -m "feat: add Certifications section to homepage"
```

---

## Task 8: Seed Initial Certificates

After both repos are deployed, add your actual certificates via the API. Run each `curl` command below (replace `<your-secret-key>` with your actual secret):

- [ ] **Step 1: Add AWS SAA**

```bash
curl -X POST https://portfolio-api.satyamdwivedi.com.np/new-certification \
  -H "Content-Type: application/json" \
  -H "secret: <your-secret-key>" \
  -d '{
    "title": "AWS Solutions Architect – Associate",
    "issuer": "Amazon Web Services",
    "issuedDate": "<your-issue-date>",
    "credentialUrl": "<your-aws-credential-url>",
    "category": "cloud-ai",
    "icon": "☁️",
    "order": 1
  }'
```

- [ ] **Step 2: Add OCI AI Foundations**

```bash
curl -X POST https://portfolio-api.satyamdwivedi.com.np/new-certification \
  -H "Content-Type: application/json" \
  -H "secret: <your-secret-key>" \
  -d '{
    "title": "OCI AI Foundations",
    "issuer": "Oracle Cloud",
    "issuedDate": "<your-issue-date>",
    "credentialUrl": "<your-oci-ai-url>",
    "category": "cloud-ai",
    "icon": "🤖",
    "order": 2
  }'
```

- [ ] **Step 3: Add OCI GenAI Professional**

```bash
curl -X POST https://portfolio-api.satyamdwivedi.com.np/new-certification \
  -H "Content-Type: application/json" \
  -H "secret: <your-secret-key>" \
  -d '{
    "title": "OCI Generative AI Professional",
    "issuer": "Oracle Cloud",
    "issuedDate": "<your-issue-date>",
    "credentialUrl": "<your-oci-genai-url>",
    "category": "cloud-ai",
    "icon": "🦾",
    "order": 3
  }'
```

- [ ] **Step 4: Add Claude Code In Action**

```bash
curl -X POST https://portfolio-api.satyamdwivedi.com.np/new-certification \
  -H "Content-Type: application/json" \
  -H "secret: <your-secret-key>" \
  -d '{
    "title": "Claude Code In Action",
    "issuer": "Anthropic",
    "issuedDate": "<your-issue-date>",
    "credentialUrl": "<your-anthropic-credential-url>",
    "category": "cloud-ai",
    "icon": "🧠",
    "order": 4
  }'
```

- [ ] **Step 5: Add college certificates**

For each college certificate (repeat this command, adjusting fields):
```bash
curl -X POST https://portfolio-api.satyamdwivedi.com.np/new-certification \
  -H "Content-Type: application/json" \
  -H "secret: <your-secret-key>" \
  -d '{
    "title": "<certificate-title>",
    "issuer": "College",
    "issuedDate": "<year>",
    "credentialUrl": "<google-drive-share-link>",
    "category": "college",
    "icon": "🎓",
    "order": 5
  }'
```

- [ ] **Step 6: Verify all certs appear on the live site**

Open `https://satyamdwivedi.com.np` and scroll to Certifications. All seeded certs should render as badge cards.
