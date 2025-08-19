import Card from "@/components/Card";
import Title from "@/components/Title";

export const metadata = {
  title: "Projects | Satyam Dwivedi",
  description:
    "Explore the projects by Satyam Dwivedi, showcasing expertise in full-stack web development, React.js, Next.js, and backend technologies.",
  openGraph: {
    title: "Projects | Satyam Dwivedi",
    description:
      "Satyam Dwivedi specializes in building scalable web applications using MERN stack technologies.",
    url: "https://satyamdwivedi.com.np/projects",
    images: [
      {
        url: "https://satyamdwivedi.com.np/projects-thumbnail.webp",
        width: 1200,
        height: 630,
        alt: "Projects by Satyam Dwivedi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://twitter.com/satyam7579",
    creator: "@satyam7579",
  },
};

async function fetchProjects() {
  try {
    const response = await fetch(
      "https://portfolio-api.satyamdwivedi.com.np/projects?filter=all",
      { cache: "no-store" }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Page() {
  const projects = await fetchProjects();

  return (
    <main className="flex min-h-screen flex-col items-center mx-6 pt-6 sm:pt-6 md:mx-20 md:pt-12 xl:mx-36 xl:pt-20">
      <Title prefix="/" heading="projects" />
      <div className="flex flex-wrap justify-center sm:justify-normal gap-10">
        {projects.map((project) => (
          <Card
            key={project._id}
            img={project.image}
            techStack={project.techStack.join(" ")}
            title={project.title}
            description={project.description}
            text="Live"
            url={project.live}
            target="_blank"
            btn={true}
            URL={project.github}
          />
        ))}
      </div>
    </main>
  );
}
