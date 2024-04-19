import Button from "@/components/Button";
import Title from "@/components/Title";
import { MdOutlineArrowForward } from "react-icons/md";
import Image from "next/image";
export default function About() {
  return (
    <section id="about-me">
      <Title prefix="#" heading="about-me" />
      <div className="flex justify-between">
        <div className="flex flex-col gap-8 w-[50%] text-secondary text-justify">
          <p>Hello, i'm Satyam</p>
          <p>
            I am a web programmer based in Birgunj, Nepal. I can make responsive
            web applications from scratch and raise them into modern
            user-friendly web experiences.
          </p>
          <p>
            Transforming my creativity and knowledge into a websites has been my
            passion for over a year. I have been helping various clients to
            establish their presence online. I always strive to learn about the
            newest technologies and frameworks.
          </p>
          <Button text="Read More" url="#" icon={<MdOutlineArrowForward />} />
        </div>
          <img src="/Profile.webp" alt=""className="border-b-2" width={275} height={200} />
      </div>
    </section>
  );
}
