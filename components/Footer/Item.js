const Item = ({ Links, title }) => {
    return (
      <ul>
        <h1 className="mb-1 font-semibold">{title}</h1>
        {Links.map((link) => (
          <li key={link.name}>
            <a className="text-gray-600 hover:text-[#37798F] hover:font-bold duration-100
            text-lg cursor-pointer leading-6" href={link.link}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };
  
export default Item;