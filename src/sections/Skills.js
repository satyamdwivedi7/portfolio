"use client";
import { useEffect, useState } from "react";
import Box from "@/components/Box";
import Title from "@/components/Title";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://portfolio-api.satyamdwivedi.com.np/skills`,
          { cache: "no-store" }
        );
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Dynamically load the Credly embed script on the client
    const script = document.createElement("script");
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="skills" className="w-full px-4 sm:px-8">
      <Title prefix="#" heading="skills" />
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {skills.map((skill) => (
            <Box
              key={skill._id}
              heading={skill.title}
              description={skill.skillSet.map((skill) => skill).join(" ")}
              className="text-black dark:text-white min-w-[150px] max-w-full sm:max-w-[250px] flex-1"
            />
          ))}
        </div>
        <div
          className="text-black dark:text-white flex justify-center items-center sm:justify-center w-full"
          data-iframe-width="150"
          data-iframe-height="270"
          data-share-badge-id="82eee4b2-a979-4d18-b7ba-e3ca8dedc35e"
          data-share-badge-host="https://www.credly.com"
        ></div>
      </div>
      <div className="mt-4"></div>
    </section>
  );
}
