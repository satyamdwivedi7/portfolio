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
        url: "https://satyamdwivedi.com.np/profile.webp",
        width: 1200,
        height: 630,
        alt: "Satyam Dwivedi - Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://twitter.com/satyam7579",
    creator: "@satyam7579",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://satyamdwivedi.com.np" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Satyam Dwivedi",
              jobTitle: "Full Stack Developer",
              url: "https://satyamdwivedi.com.np",
              image: "https://satyamdwivedi.com.np/profile.webp",
              sameAs: [
                "https://www.linkedin.com/in/satyam7579",
                "https://twitter.com/satyam7579",
                "https://github.com/satyamdwivedi7",
                "https://instagram.com/satyam_7579",
                "https://facebook.com/satyam7579",
              ],
              knowsAbout: [
                "JavaScript",
                "React.js",
                "Next.js",
                "Node.js",
                "MongoDB",
                "Express.js",
                "Full Stack Development",
                "Web Development"
              ],
            }),
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
