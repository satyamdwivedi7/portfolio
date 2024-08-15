import Card from "@/components/Card";
import Title from "@/components/Title";
async function Page() {
  const response = await fetch(
    `https://portfolio-api.satyamdwivedi.com.np/projects?filter=all`,
    { cache: "no-store" }
  );
  const projects = await response.json();
  return (
    <main className="flex min-h-screen flex-col  items-center mx-6 pt-32 sm:pt-6 md:mx-20 md:pt-20 xl:mx-36 xl:pt-36">
      <Title prefix="/" heading="projects" />
      <div className="flex flex-wrap justify-center sm:justify-normal gap-16">
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

export default Page;
