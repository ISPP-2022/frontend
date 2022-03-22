import Image from "next/image"

const Thumb = ({ onClick, imgSrc }) => (
    <div className={`min-w-full my-[8%] relative`}    >
        <button
            onClick={onClick}
            className="relative my-[8%] min-w-full overflow-hidden rounded-lg mr-1 h-36
            touch-manipulation cursor-pointer bg-transparent block w-[200px]"
            type="button">
            <Image layout="fill" className="absolute opacity-100 transition-opacity rounded-sm" src={imgSrc} alt="No se encontraron imágenes del espacio" />
        </button>
    </div>
);

export default Thumb;