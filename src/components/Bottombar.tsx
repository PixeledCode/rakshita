type Category = {
  _key: string;
  bottombarText: string;
};

type Props = {
  list: Category[];
};

export default function Bottombar({ list }: Props) {
  return (
    <header className="pt-4 py-4 px-4 md:px-6 text-[0.625rem] md:text-base">
      <ul className="flex justify-between gap-4 items-center">
        {list.map((item, i) => (
          <li
            key={item._key}
            className={[
              i === list.length - 1 ? "text-[8px] md:text-xs" : "",
              i === 2 ? "max-[490px]:hidden" : "",
            ]
              .join(" ")
              .trim()}
          >
            {item.bottombarText}
          </li>
        ))}
      </ul>
    </header>
  );
}
