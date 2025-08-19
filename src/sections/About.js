import Button from "@/components/Button";
import Title from "@/components/Title";
import { MdOutlineArrowForward } from "react-icons/md";
export default function About() {
  return (
    <section id="about-me">
      <Title prefix="#" heading="about-me" />
      <div className="flex flex-col-reverse md:flex-row justify-between">
        <div className="flex flex-col md:w-[50%] gap-8 mt-2 text-secondary text-justify">
          <p>Hello, i'm Satyam</p>
          <p>
            A final-year Computer Science and Engineering student at VIT
            Vellore, and an AWS Certified Solutions Architect &mdash; Associate.
            I specialize in full-stack web development, mobile application
            development, and scalable backend systems. My core tech stack
            includes JavaScript, TypeScript, React.js, Next.js, Node.js,
            Flutter, and MongoDB.
          </p>
          <p>
            With hands-on experience in real-world projects—ranging from a
            collaborative story-writing platform and news apps to CRM and ERP
            systems during my internship at Nepbyte Technologies—I've built
            systems that are both user-friendly and production-ready. I've also
            developed tools like a bulk emailer using Nodemailer and a
            Crunchyroll clone with Next.js and TypeScript.
          </p>
          <p>
            I actively participate in hackathons and continuously upskill with a
            strong interest in open-source contribution, particularly aiming to
            contribute to Webpack. I'm driven by a passion for problem-solving,
            cloud architecture, and creating impactful digital products.
          </p>
          <p>Let's connect and build what's next.</p>
          <Button
            text="Resume"
            url="/Resume_Satyam_Dwivedi.pdf"
            target={"_blank"}
            icon={<MdOutlineArrowForward />}
          />
        </div>
        <img
          src="/profile.webp"
          alt=""
          className="border-b-2 flex justify-center w-2/5" 
          width={275}
          height={200}
          loading="lazy"
        />
      </div>
    </section>
  );
}
