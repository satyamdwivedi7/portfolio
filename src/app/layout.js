import { Fira_Code } from "next/font/google";
import "./globals.css";
import Nav from "@/sections/Nav";
import Footer from "@/sections/Footer";
import SEO from "@/app/next-seo.config";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "Satyam Dwivedi - Portfolio",
  description:
    "Explore Satyam Dwivedi's portfolio showcasing MERN stack web development projects, expertise in React.js, Next.js, and backend technologies.",
  openGraph: {
    title: "Satyam Dwivedi - Portfolio",
    description:
      "Satyam Dwivedi specializes in building scalable web applications using MERN stack technologies.",
    url: "https://satyamdwivedi.com.np",
    images: [
      {
        url: "https://satyamdwivedi.com.np/profile.webp",
        width: 1200,
        height: 630,
        alt: "Satyam Dwivedi - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://twitter.com/satyam7579",
    creator: "@satyam7579",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://satyamdwivedi.com.np" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Satyam Dwivedi",
              url: "https://satyamdwivedi.com.np",
              sameAs: [
                "https://www.linkedin.com/in/satyam7579",
                "https://twitter.com/satyam7579",
                "https://github.com/satyamdwivedi7",
                "https://instagram.com/satyam_7579",
                "https://facebook.com/satyam7579",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${fira_code.className} bg-theme font-medium text-white`}
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundSize: "100%",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center top",
        }}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
