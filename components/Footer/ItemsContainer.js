import Item from "./Item";
import { ABOUTUS, RESOURCES, RENTS } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="px-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-x-4 border-t-4 border-[#4CA6C4] text-lg">
      <Item Links={ABOUTUS} title="SOBRE NOSOTROS" />
      <Item Links={RESOURCES} title="ESPACIOS" />
      <Item Links={RENTS} title="ALQUILERES" />
      <div className="justify-center">
        <span className="grid gap-5">¿Tienes un problema?
          <a type="button" href="mailto:stackingup13@gmail.com" className="justify-center transform motion-safe:hover:scale-110 bg-[#4CA6C4] hover:bg-sky-400 duration-300 px-10 py-4
        rounded-md text-white md:w-auto w-full"
          >
            Contáctanos
          </a></span>
      </div>
    </div>
  );
};

export default ItemsContainer;