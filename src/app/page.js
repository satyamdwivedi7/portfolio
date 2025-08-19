import Projects from "@/sections/Projects";
import Home from "@/sections/Home";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

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

async function fetchProjects(filter) {
  try {
    const res = await fetch(
      `https://portfolio-api.satyamdwivedi.com.np/projects?filter=${filter}`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Page() {
  const [allProjectsData, topProjectsData] = await Promise.all([
    fetchProjects("all"),
    fetchProjects("4"),
  ]);

  return (
    <main className="flex min-h-screen flex-col justify-between md:items-start mx-6 pt-6 md:mx-20 md:pt-20 xl:mx-36 xl:pt-36">
      <Home />
      <Projects api={topProjectsData} />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
