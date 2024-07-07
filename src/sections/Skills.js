"use client";
const { useEffect, useState } = require("react");
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
  return (
    <section id="skills">
      <Title prefix="#" heading="skills" />
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {skills.map((skill) => (
          <Box
            key={skill._id}
            heading={skill.title}
            description={skill.skillSet.map(skill => skill).join(" ")}
          />
        ))}
      </div>
      <div className="mt-4">
      </div>
    </section>
  );
}
