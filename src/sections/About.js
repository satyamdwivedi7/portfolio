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
            I am a web programmer based in Vellore, India. I can make responsive
            web applications from scratch and raise them into modern
            user-friendly web experiences.
          </p>
          <p>
            Transforming my creativity and knowledge into a websites has been my
            passion for over a year. I have been helping various clients to
            establish their presence online. I always strive to learn about the
            newest technologies and frameworks.
          </p>
          <Button
            text="Resume"
            url="/Satyam_Dwivedi_Resume.pdf"
            target={"_blank"}
            icon={<MdOutlineArrowForward />}
          />
        </div>
        <img
          src="/profile.webp"
          alt=""
          className="border-b-2 flex justify-center"
          width={275}
          height={200}
        />
      </div>
    </section>
  );
}
