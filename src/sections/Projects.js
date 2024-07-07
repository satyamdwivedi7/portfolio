"use client";
import { useEffect, useState } from "react";

import Card from "@/components/Card";
import Title from "@/components/Title";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://portfolio-api.satyamdwivedi.com.np/projects`,
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
    <section id="my-works">
      <Title prefix="#" heading="projects" viewAll="/projects" />
      <div className="flex flex-wrap justify-center">
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
        {/* <Card
          img="/elcar.webp"
          techStack="HTML, CSS, JavaScript"
          title="Elcar"
          description="Electric cars website"
          text="Live"
          url="https://elcar.satyamdwivedi.com.np"
          target="_blank"
          btn={true}
          URL="https://github.com/satyamdwivedi7/elcar"
        />
        <Card
          img="/meme-generator.png"
          techStack="React.js"
          title="Meme-Generator"
          description="A meme generating website"
          text="Live"
          url="https://meme-generator.satyamdwivedi.com.np"
          target="_blank"
          btn={true}
          URL="https://github.com/satyamdwivedi7/meme-generator"
        />
        <Card
          img="/todo.png"
          techStack="Node.js, Express.js"
          title="Todo List"
          description="A todo list website"
          text="GitHub"
          url="https://github.com/satyamdwivedi7/todo"
          target="_blank"
        />
        <Card
          img="/blog.png"
          techStack="Node.js Express.js"
          title="Blog"
          description="A blog website"
          text="GitHub"
          url="https://github.com/satyamdwivedi7/blog"
          target="_blank"
        /> */}
      </div>
    </section>
  );
}
