export default function Button({ text, icon = null, url  }) {
  return (
    <a href={url} className="text-base hover:bg-primary font-semibold hover:text-theme hover:cursor-pointer border-primary border-2 w-max py-1 px-4 flex items-center">
      {text} &nbsp;
      {icon}
    </a>
  );
}
