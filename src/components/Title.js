import { FaLongArrowAltRight } from "react-icons/fa";
export default function Title({ heading, prefix, viewAll = null }) {
  return (
    <div className="w-[100%] flex justify-between my-10">
      <div className="flex items-center text-xl w-[100%]">
        <span className="text-primary">{prefix}</span>
        <h1 className="w-[100%] sm:w-[30%] md:w-[20%] lg:w-[15%]">{heading}</h1>
        <hr className="sm:w-4/5 ms-5 border-primary rounded-full" />
      </div>
      {viewAll && (
        <a href={viewAll} className="flex w-[70%] sm:w-[30%] justify-end items-center hover:text-primary hover:cursor-pointer">
          View All <FaLongArrowAltRight />
        </a>
      )}
    </div>
  );
}
