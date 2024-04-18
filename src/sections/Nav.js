import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-[100%] flex justify-between my-10 px-32 fixed">
      <h1 className="text-2xl font-sans">Satyam</h1>
      <div className="flex gap-3">
        <Link href="/"><span >#</span>home</Link>
        <Link href="/"><span >#</span>my-works</Link>
        <Link href="/"><span >#</span>about-me</Link>
        <Link href="/"><span >#</span>contacts</Link>
      </div>
    </nav>
  );
}
