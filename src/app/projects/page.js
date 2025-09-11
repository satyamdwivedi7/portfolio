import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects | Satyam Dwivedi - Full Stack Developer",
  description:
    "Explore the innovative projects by Satyam Dwivedi, showcasing expertise in full-stack web development, React.js, Next.js, MERN stack, and modern web technologies.",
  openGraph: {
    title: "Projects | Satyam Dwivedi - Full Stack Developer",
    description:
      "Discover cutting-edge web applications and innovative solutions built with modern technologies.",
    url: "https://satyamdwivedi.com.np/projects",
    images: [
      {
        url: "https://satyamdwivedi.com.np/profile.webp",
        width: 1200,
        height: 630,
        alt: "Projects by Satyam Dwivedi",
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
    "Portfolio Projects",
    "Web Development",
    "React Projects",
    "Next.js Applications",
    "Full Stack Projects",
    "MERN Stack",
    "JavaScript Projects"
  ],
};

export default function Page() {
  return (
    <div className="min-h-screen pt-20">
      <Projects />
    </div>
  );
}
