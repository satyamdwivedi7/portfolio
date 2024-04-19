export default function Box({ heading, description}) {
  return (
    <div className="flex flex-col w-[fit-content] border border-1">
      <div className="">
        <div className="flex flex-col">
          <h1 className="border-b-[1px] p-2">{heading}</h1>
          <p className="text-secondary p-2 w-44">{description}</p>
        </div>
      </div>
    </div>
  );
}
