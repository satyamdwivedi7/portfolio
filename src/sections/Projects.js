import Card from "@/components/Card";
import Title from "@/components/Title";

export default function Projects() {
  return (
    <section id="my-works">
      <Title prefix="#" heading="projects" viewAll="/projects" />
      <div className=" w-[100%] grid grid-cols-4">
        <Card
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
        />
      </div>
    </section>
  );
}
