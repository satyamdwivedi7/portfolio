import Card from "@/components/Card";
import Title from "@/components/Title";

export default function Projects({api}) {
  return (
    <section id="my-works">
      <Title prefix="#" heading="projects" viewAll="/projects" />
      <div className="flex flex-wrap justify-center md:justify-between">
        {api.map((project) => (
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
    </section>
  );
}
