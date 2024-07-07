"use client";
const { useEffect, useState } = require("react");

import Projects from "@/sections/Projects";
import Home from "../sections/Home";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
export default function Page() {
 
  return (
    <main className="flex min-h-screen flex-col justify-between items-center mx-16 pt-16 sm:mx-32 sm:pt-32">
      <Home />
      <Projects />
      <Skills />
      {/* <About />
      <Contact /> */}
    </main>
  );
}