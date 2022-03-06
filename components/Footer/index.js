import ItemsContainer from "./ItemsContainer";

export default function Footer(){
    return(
    <footer className="bg-[#DBECF3] text-[#37798F] invisible sm:visible inset-x-0 bottom-0">
        <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#DBECF3] py-7 border-4 border-[#4CA6C4]">
            <h1
            className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
            md:w-2/5"
            >
            <span>Stacking Up</span> 
            </h1>
            <div>
            <span>¿Tienes un problema?</span>
            <button
                className="bg-sky-400 hover:bg-sky-500 duration-300 px-5 py-2.5
            rounded-md text-white md:w-auto w-full"
            >
                Contáctanos
            </button>
            </div>
        </div>
        <ItemsContainer />
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
        text-center pt-2 text-[#37798F] text-sm pb-8 border-x-4 border-[#4CA6C4] md:items-center"
        >
            <span>© 2022 Copyright: Stacking Up</span>
        </div>
    </footer>
    )
}