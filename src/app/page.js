import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

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
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
