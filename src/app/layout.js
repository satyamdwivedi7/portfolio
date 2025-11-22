import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CursorEffect from "@/components/CursorEffect";
import DataProvider from "@/components/DataProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const fira_code = Fira_Code({ 
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata = {
  metadataBase: new URL('https://satyamdwivedi.com.np'),
  title: {
    default: 'Satyam Dwivedi | Software Development Engineer | Backend & System Design',
    template: '%s | Satyam Dwivedi'
  },
  description: 'Satyam Dwivedi is a Software Development Engineer from VIT Vellore, specializing in backend development, system design, data structures & algorithms, and building scalable distributed systems. Expert in Java, Python, Node.js, and database optimization.',
  applicationName: 'Satyam Dwivedi Portfolio',
  authors: [
    { 
      name: 'Satyam Dwivedi',
      url: 'https://satyamdwivedi.com.np'
    }
  ],
  creator: 'Satyam Dwivedi',
  publisher: 'Satyam Dwivedi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    'Satyam Dwivedi',
    'Satyam Dwivedi VIT',
    'Satyam Dwivedi SDE',
    'Satyam Dwivedi Portfolio',
    'Software Development Engineer',
    'Backend Developer',
    'System Design',
    'Data Structures and Algorithms',
    'DSA Expert',
    'Node.js Developer',
    'Python Developer',
    'Java Developer',
    'Database Optimization',
    'VIT Vellore Developer',
    'Software Engineer India',
    'Distributed Systems',
    'Scalable Architecture',
    'API Development',
    'Satyam Dwivedi GitHub',
    'Satyam Dwivedi LinkedIn',
    'Problem Solving',
    'Competitive Programming',
    'Backend Engineer'
  ],
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://satyamdwivedi.com.np',
    siteName: 'Satyam Dwivedi Portfolio',
    title: 'Satyam Dwivedi | Software Development Engineer | Backend & System Design',
    description: 'Satyam Dwivedi is a Software Development Engineer from VIT Vellore, specializing in backend development, system design, data structures & algorithms, and building scalable distributed systems.',
    images: [
      {
        url: '/satyam-dwivedi.webp',
        width: 1200,
        height: 630,
        alt: 'Satyam Dwivedi - Software Development Engineer',
        type: 'image/webp',
      },
      {
        url: '/avatar.webp',
        width: 800,
        height: 800,
        alt: 'Satyam Dwivedi Profile Picture',
        type: 'image/webp',
      }
    ],
    firstName: 'Satyam',
    lastName: 'Dwivedi',
    username: 'satyamdwivedi7',
    gender: 'male',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@satyam_7579',
    creator: '@satyam_7579',
    title: 'Satyam Dwivedi | Software Development Engineer',
    description: 'Satyam Dwivedi is a Software Development Engineer from VIT Vellore. Expert in backend development, system design, and scalable architecture.',
    images: ['/satyam-dwivedi.webp'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://satyamdwivedi.com.np',
  },
  verification: {
    google: 'dffdb0b8bbf09b2e',
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://satyamdwivedi.com.np/#person",
    name: "Satyam Dwivedi",
    alternateName: ["Satyam", "Satyam Dwivedi VIT", "Satyam Dwivedi SDE"],
    url: "https://satyamdwivedi.com.np",
    image: {
      "@type": "ImageObject",
      url: "https://satyamdwivedi.com.np/satyam-dwivedi.webp",
      width: 1200,
      height: 630,
      caption: "Satyam Dwivedi - Software Development Engineer"
    },
    jobTitle: "Software Development Engineer",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "Vellore Institute of Technology",
      url: "https://vit.ac.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vellore",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN"
      }
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Vellore Institute of Technology",
      url: "https://vit.ac.in"
    },
    email: "contact@satyamdwivedi.com.np",
    telephone: "+91-8438913057",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vellore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN"
    },
    nationality: {
      "@type": "Country",
      name: "India"
    },
    knowsAbout: [
      "Software Development",
      "Backend Development",
      "System Design",
      "Data Structures and Algorithms",
      "Distributed Systems",
      "Database Optimization",
      "RESTful APIs",
      "Microservices Architecture",
      "Node.js",
      "Python",
      "Java",
      "JavaScript",
      "Express.js",
      "MongoDB",
      "SQL",
      "PostgreSQL",
      "Redis",
      "Message Queues",
      "Scalable Architecture",
      "Performance Optimization",
      "Git",
      "Docker",
      "Problem Solving"
    ],
    knowsLanguage: ["English", "Hindi"],
    sameAs: [
      "https://github.com/satyamdwivedi7",
      "https://linkedin.com/in/satyam7579",
      "https://x.com/satyam_7579",
      "https://twitter.com/satyam_7579",
      "https://www.instagram.com/satyam_7579",
      "https://www.facebook.com/satyam7579"
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://satyamdwivedi.com.np"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://satyamdwivedi.com.np/#website",
    url: "https://satyamdwivedi.com.np",
    name: "Satyam Dwivedi Portfolio",
    description: "Official portfolio website of Satyam Dwivedi - Software Development Engineer specializing in Backend & System Design",
    publisher: {
      "@id": "https://satyamdwivedi.com.np/#person"
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://satyamdwivedi.com.np/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://satyamdwivedi.com.np/#profilepage",
    url: "https://satyamdwivedi.com.np",
    name: "Satyam Dwivedi - Software Development Engineer",
    description: "Professional portfolio of Satyam Dwivedi showcasing backend development, system design expertise, and scalable software solutions",
    mainEntity: {
      "@id": "https://satyamdwivedi.com.np/#person"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://satyamdwivedi.com.np"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://satyamdwivedi.com.np#about"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Projects",
          item: "https://satyamdwivedi.com.np#projects"
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Contact",
          item: "https://satyamdwivedi.com.np#contact"
        }
      ]
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="color-scheme" content="dark light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Satyam Dwivedi" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Vellore" />
        <meta name="geo.position" content="12.9699;79.1632" />
        <meta name="ICBM" content="12.9699, 79.1632" />
        <link rel="canonical" href="https://satyamdwivedi.com.np" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://portfolio-api.satyamdwivedi.com.np" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageSchema)
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${fira_code.variable} font-sans bg-black text-white overflow-x-hidden selection:bg-neon-cyan/30 selection:text-white`}
      >
        <DataProvider>
          <AnimatedBackground />
          <CursorEffect />
          <ScrollProgress />
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
