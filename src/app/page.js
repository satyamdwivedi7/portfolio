import Projects from "@/sections/Projects";
import Home from "../sections/Home";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
export default async function Page() {
      const allProjects = await fetch(
        `https://portfolio-api.satyamdwivedi.com.np/projects?filter=all`,
        { cache: "no-store" }
      );
      const topProjects = await fetch('https://portfolio-api.satyamdwivedi.com.np/projects?filter=4', { cache: "no-store" });
      const allProjectsData = await allProjects.json();
      const topProjectsData = await topProjects.json();
 
  return (
    <main className="flex min-h-screen flex-col justify-between md:items-start mx-6 pt-6 md:mx-20 md:pt-20 xl:mx-36 xl:pt-36">
      <Home />
      <Projects api={topProjectsData}/>
      <Skills />
      <About />
      <Contact />
    </main>
  );
}