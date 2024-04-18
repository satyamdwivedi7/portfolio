export default function Button({ text, icon = null }) {
  return (
    <button className="text-base hover:bg-primary font-semibold hover:text-theme border-primary border-2 w-max py-2 px-4 flex items-center">
      {text} &nbsp;
      {icon}
    </button>
  );
}
