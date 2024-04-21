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
         console.log(data);
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
      <div className="w-[50%] grid grid-cols-3 gap-4 ">
        {/* <Box heading="Languages" description="Python C C++ Java Javascript" />
        <Box heading="Frameworks" description="React.js Next.js Express.js" />
        <Box heading="Tools" description="VSCode Git Linux" />
        <Box heading="Databases" description="MondoDB MySQL" />
        <Box heading="Others" description="HTML CSS EJS jQuery" /> */}
        {skills.map((skill) => (
          <Box
            key={skill.id}
            heading={skill.title}
            description={skill.skillSet.map(skill => skill).join(" ")}
          />
        ))}
      </div>
      <div className="mt-4">
        {/* <Box heading="Others" description="HTML CSS EJS jQuery" /> */}
      </div>
    </section>
  );
}
