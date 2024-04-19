import { FaGithub } from "react-icons/fa";
import Button from "./Button";
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
    <div className="flex flex-col w-56 border border-1">
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
              <a href={URL} target="_blank" className="hover:text-primary">
                <FaGithub size={32} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
