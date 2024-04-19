import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa6";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-[100%] mt-20 py-10 px-32 gap-1">
      <div className="flex justify-between py-10 border-t">
        <div>
          <div className="flex items-center">
            <Image src="/logo.svg" width={35} height={35} />
            <h1>Satyam</h1> &nbsp;
            <p className="text-secondary">satyamdwivedi419@gmail.com</p>
          </div>
          <p>&nbsp;Web Developer</p>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Media</h1>
          <div className="flex gap-5">
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
        <p className="text-secondary">Copyright &#169; 2024. Made by Satyam</p>
      </div>
    </footer>
  );
}
