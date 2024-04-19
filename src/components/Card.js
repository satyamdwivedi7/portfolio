import Button from "./Button";
import Image from "next/image";
export default function Card({ img, techStack, title, description, github , url}) {
  return (
    <div className="flex flex-col w-max border border-1">
      <img src={img} width={250} height={250} />
      <p className="text-secondary border border-x-0 p-2">{techStack}</p>
      <div className="p-2">
        <div className="flex flex-col gap-3">
          <h1>{title}</h1>
          <p className="text-secondary">{description}</p>
          <div className="flex">
            <Button url={url} text="Live" />
          </div>
        </div>
      </div>
    </div>
  );
}
