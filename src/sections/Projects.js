import Card from "@/components/Card";
import Title from "@/components/Title";

export default function Projects() {
  return (
    <section id="my-works">
      <Title prefix="#" heading="projects" viewAll={true} />
      <div className=" w-[100%] grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
        <Card
          img="/elcar.webp"
          techStack="HTML, CSS, JavaScript"
          title="Elcar"
          description="Electric cars website"
          url="https://elcar.satyamdwivedi.com.np"
          target="_blank"
        />
        <Card
          img="/meme-generator.png"
          techStack="React.js CSS"
          title="Meme-Generator"
          description="A meme generating website"
          url="https://meme-generator.satyamdwivedi.com.np"
          target="_blank"
        />
        <Card
          img="/elcar.webp"
          techStack="HTML, CSS, JavaScript"
          title="Elcar"
          description="Electric cars website"
        />
        <Card
          img="/elcar.webp"
          techStack="HTML, CSS, JavaScript"
          title="Elcar"
          description="Electric cars website"
        />
      </div>
    </section>
  );
}
