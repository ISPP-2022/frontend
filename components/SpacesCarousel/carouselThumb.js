import Image from "next/image"

const Thumb = ({ selected, onClick, imgSrc }) => (
    <div className={`embla__slide embla__slide--thumb ${selected ? "is-selected" : ""}`}    >
        <button
            onClick={onClick}
            className="embla__slide__inner embla__slide__inner--thumb"
            type="button">
            <Image layout="fill" className="embla__slide__thumbnail rounded-sm" src={imgSrc} alt="No se encontraron imágenes del espacio" />
        </button>
    </div>
);

export default Thumb;