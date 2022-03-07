import Item from "./Item";
import {ABOUTUS, RESOURCES, RENTS} from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 border-x-4 border-t-4 border-[#4CA6C4] text-lg">
      <Item Links={ABOUTUS} title="SOBRE NOSOTROS" />
      <Item Links={RESOURCES} title="ESPACIOS" />
      <Item Links={RENTS} title="ALQUILERES" />
      <div>
        <span>¿Tienes un problema?</span>
        <br/>
        <a type="button" href="mailto:stackingup13@gmail.com" className="bg-[#4CA6C4] hover:bg-sky-400 duration-300 px-10 py-4
        rounded-md text-white md:w-auto w-full"
        >
            Contáctanos
        </a>
      </div>
    </div>
  );
};

export default ItemsContainer;