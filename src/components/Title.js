import { FaLongArrowAltRight } from "react-icons/fa";
export default function Title({ heading, prefix, viewAll = null }) {
  return (
    <div className="w-[100%] flex justify-between items-center my-10">
      <div className="flex text-xl">
        <span className="text-primary">{prefix}</span>
        <h1>{heading}</h1>
        <hr className="w-4/5 ms-5 border-primary rounded-full" />
      </div>
      {viewAll && (
        <a href={viewAll} className="flex items-center hover:text-primary hover:cursor-pointer">
          View All <FaLongArrowAltRight />
        </a>
      )}
    </div>
  );
}
