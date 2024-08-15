import Button from "@/components/Button";
import { MdOutlineArrowForward } from "react-icons/md";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <section id="home">
      <div className="flex flex-col items-center justify-between mt-32 md:mt-8 md:flex-row md:items-start gap-8">
        <div className="flex justify-center text-justify items-center flex-col md:w-[50%] md:text-left md:items-start">
          <h1 className="text-3xl md:text-5xl leading-loose tracking-widest">
            I am a <span>MERN-Stack</span> developer
          </h1>
          <p className="text-secondary m-2 ml-0">
            A third year student at Vellore Institute of Technology pursuing
            B.Tech in Computer Science and Engineering
          </p>
          <div className="flex gap-11 m-4 ml-0">
            <Link target="_blank" href="https://github.com/satyamdwivedi7">
              <FaGithub size={32} />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/satyam-dwivedi-66434719a/"
            >
              <FaLinkedin size={32} />
            </Link>
            <Link target="_blank" href="https://www.instagram.com/satyam_7579/">
              <FaInstagram size={32} />
            </Link>
            <Link target="_blank" href="https://twitter.com/satyam_7579">
              <FaTwitter size={32} />
            </Link>
          </div>
          <Button
            text="Contact me"
            icon={<MdOutlineArrowForward />}
            url="#contacts"
          />
        </div>
        <Image
          src="/avatar.webp"
          alt="avatar"
          className="border-b-2 hidden sm:block sm:w-56 sm:h-56 md:w-72 md:h-[100%]"
          height={410}
          width={400}
        />
      </div>
    </section>
  );
}
