import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className=" w-[100%] bg-theme flex justify-between py-10 px-32 fixed">
      <div className="flex justify-center items-center">
        <Image src="/logo.svg" width={35} height={35} text-white/>
        <h1 className="text-2xl font-sans">Satyam</h1>
      </div>
      <div className="flex gap-3">
        <Link href="#home">
          <span>#</span>home
        </Link>
        <Link href="#my-works">
          <span>#</span>my-works
        </Link>
        <Link href="#about-me">
          <span>#</span>about-me
        </Link>
        <Link href="#contacts">
          <span>#</span>contacts
        </Link>
      </div>
    </nav>
  );
}
