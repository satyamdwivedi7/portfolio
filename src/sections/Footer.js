import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa6";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-[100%] mt-20 py-10 gap-1">
      <div className="flex flex-col justify-between items-center md:flex-row py-10 pt-5 md:mx-20 md:pt-20 xl:mx-36 xl:pt-36 border-t">
        <div className="w-[85%] ">
          <div className="flex items-center">
            <Image priority src="/logo.png" width={45} height={55} alt="" />
            <p className="text-secondary">contact@satyamdwivedi.com.np</p>
          </div>
          <p>&nbsp;Web Developer</p>
        </div>
        <div className="flex flex-col gap-3 w-[80%] md:w-[40%] lg:w-[25%]">
          <h1>Media</h1>
          <div className="flex gap-5 justify-between">
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
        </div>
      </div>
      <div className="flex justify-center items-center mb-0 pb-0">
        <p className="text-secondary">Copyright &#169; {new Date().getFullYear()}. Made by Satyam</p>
      </div>
    </footer>
  );
}
