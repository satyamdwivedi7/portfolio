import Box from "@/components/Box";
import Title from "@/components/Title";

export default function Skills() {
  return (
    <section id="skills">
      <Title prefix="#" heading="skills" />
      <div className="w-[50%] grid grid-cols-3 gap-4 ">
        <Box heading="Languages" description="Python C C++ Java Javascript" />
        <Box heading="Frameworks" description="React.js Next.js Express.js" />
        <Box heading="Tools" description="VSCode Git Linux" />
        <Box heading="Databases" description="MondoDB MySQL" />
        <Box heading="Others" description="HTML CSS EJS jQuery" />
      </div>
      <div className="mt-4">
        <Box heading="Others" description="HTML CSS EJS jQuery" />
      </div>
    </section>
  );
}
