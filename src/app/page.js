import Projects from "@/sections/Projects";
import Home from "../sections/Home";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mx-32 pt-32">
      <Home />
      <Projects />
      <Skills />
      <About/>
      <Contact/>
    </main>
  );
}
