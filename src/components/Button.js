export default function Button({ text, icon = null, url, target  }) {
  return (
    <a href={url} target={target} className="text-base hover:bg-primary font-semibold hover:text-theme hover:cursor-pointer border-primary border-2 w-max py-1 px-4 flex items-center">
      {text} &nbsp;
      {icon}
    </a>
  );
}
