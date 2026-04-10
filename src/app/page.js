import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Certifications from "@/components/Certifications";

export const metadata = {
  title: "Satyam Dwivedi - Software Development Engineer Portfolio",
  description:
    "Satyam Dwivedi is a Software Development Engineer specializing in backend development, system design, and scalable web technologies. Explore projects and get in touch.",
  openGraph: {
    title: "Satyam Dwivedi - Software Development Engineer Portfolio",
    description:
      "Satyam Dwivedi is a Software Development Engineer building scalable backend systems and modern web applications.",
    url: "https://satyamdwivedi.com.np",
    images: [
      {
        url: "https://satyamdwivedi.com.np/satyam-dwivedi.webp",
        width: 1200,
        height: 630,
        alt: "Satyam Dwivedi - Software Development Engineer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@satyam_7579",
    creator: "@satyam_7579",
  },
  keywords: [
    "Satyam Dwivedi",
    "Software Development Engineer",
    "Backend Developer",
    "System Design",
    "React.js",
    "Next.js",
    "Node.js",
    "Web Development",
    "Portfolio",
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
