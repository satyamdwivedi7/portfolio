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
    <main className="flex min-h-screen flex-col  items-center justify-between mx-6 pt-32 sm:pt-6 md:mx-20 md:pt-20 xl:mx-36 xl:pt-36">
      <Title prefix="/" heading="projects" />
      <div className="flex flex-wrap justify-center sm:justify-between">
        {projects.map((project) => (
          <Card
            key={project._id}
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
