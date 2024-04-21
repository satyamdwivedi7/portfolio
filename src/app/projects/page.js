"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Title from "@/components/Title";
import Transition from "@/app/transition";
function Page() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://portfolio-api.satyamdwivedi.com.np/projects?filter=all`,
          { cache: "no-store" }
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mx-32 pt-32">
      <Title prefix="/" heading="projects" />
      <div className="grid gap-10 grid-cols-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            img={project.image}
            techStack={project.techStack.map((tech) => tech).join(" ")}
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

export default Transition(Page);
