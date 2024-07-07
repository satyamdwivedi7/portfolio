"use client";
const { useEffect, useState } = require("react");

import Projects from "@/sections/Projects";
import Home from "../sections/Home";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
export default function Page() {
 
  return (
    <main className="flex min-h-screen flex-col justify-between md:items-start mx-6 pt-6 md:mx-20 md:pt-20 xl:mx-36 xl:pt-36">
      <Home />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}