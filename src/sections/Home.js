import Button from "@/components/Button";
import { MdOutlineArrowForward } from "react-icons/md";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  function handleClick() {
    console.log("Contact me button clicked");
  }
  return (
    <section className="w-[100%] ">
      <div className="flex justify-between my-10">
        <div className="flex justify-between flex-col  w-6/12">
          <h1 className="text-5xl  leading-loose tracking-widest">
            I am a <span>MERN-Stack</span> developer
          </h1>
          <p className="text-secondary">
            A third year student at Vellore Institute of Technology pursuing
            B.Tech in Computer Science and Engineering
          </p>
          <div className="flex gap-5">
            <Link href="">
              <FaGithub size={32} />
            </Link>
            <Link href="">
              <FaLinkedin size={32} />
            </Link>
            <Link href="">
              <FaInstagram size={32} />
            </Link>
            <Link href="">
              <FaTwitter size={32} />
            </Link>
          </div>
          <Button text="Contact me" icon={<MdOutlineArrowForward />} />
        </div>
        <Image
          src="/profile.webp"
          alt=""
          className="border-b-2"
          width={450}
          height={450}
        />
      </div>
    </section>
  );
}
