import Item from "./Item";
import { ABOUTUS, RESOURCES, RENTS} from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-8 px-5 py-16 border-x-4 border-[#4CA6C4] text-lg">
      <Item Links={ABOUTUS} title="SOBRE NOSOTROS" />
      <Item Links={RESOURCES} title="ESPACIOS" />
      <Item Links={RENTS} title="ALQUILERES" />
    </div>
  );
};

export default ItemsContainer;