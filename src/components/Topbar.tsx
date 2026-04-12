type Category = {
  _key: string;
  topbarText: string;
};

type Props = {
  list: Category[];
};

export default function Topbar({ list }: Props) {
  return (
    <header className="bg-yellow pt-4 px-3 md:px-6 text-[0.625rem] md:text-base">
      <ul className="flex justify-between gap-4 items-center">
        {list.map((item) => (
          <li key={item._key}>{item.topbarText}</li>
        ))}
      </ul>
    </header>
  );
}
