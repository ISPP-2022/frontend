import Link from "next/link";

const Item = ({ Links, title }) => {
  return (
    <ul className="w-full text-center">
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a href={link.link} className="text-gray-600 hover:text-[#37798F] hover:font-bold duration-100
            text-lg cursor-pointer leading-6">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Item;