import { FaGithub } from "react-icons/fa";
import Button from "./Button";
import Link from "next/link";
export default function Card({
  img,
  techStack,
  title,
  description,
  text,
  url,
  target,
  btn = false,
  URL
}) {
  return (
    <div className="flex flex-col w-56 border border-1 z-10 m-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl shadow-black">
      <div className="w-[100%] h-48">
        <img src={img} className="w-[100%] h-[100%]" width={250} height={250} />
      </div>
      <p className="text-secondary border border-x-0 p-2">{techStack}</p>
      <div className="p-2">
        <div className="flex flex-col">
          <div className="flex flex-col h-20">
            <h1>{title}</h1>
            <p className="text-secondary">{description}</p>
          </div>
          <div className="flex justify-between">
            <Button url={url} target={target} text={text} />
            {btn && (
              <Link href={URL} target="_blank" className="hover:text-primary">
                <FaGithub size={32} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
