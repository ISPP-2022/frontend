import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Thumb from "./carouselThumb";
import Image from "next/image"
import thumbByIndex from "./media/index";


const EmblaCarousel = ({ slides }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mainViewportRef, embla] = useEmblaCarousel({});
    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
        axis: "y",
        containScroll: "keepSnaps",
        selectedClass: "",
        dragFree: true
    });

    const onThumbClick = useCallback(
        (index) => {
            if (!embla || !emblaThumbs) return;
            if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
        },
        [embla, emblaThumbs]
    );

    const onSelect = useCallback(() => {
        if (!embla || !emblaThumbs) return;
        setSelectedIndex(embla.selectedScrollSnap());
        emblaThumbs.scrollTo(embla.selectedScrollSnap());
    }, [embla, emblaThumbs, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();
        embla.on("select", onSelect);
    }, [embla, onSelect]);

    return (
        <div className="justify-center">
            <div className="inline-flex justify-start  mt-4 ml-4 mr-4">
                <div className="embla embla--thumb hidden md:flex">
                    <div className="embla__viewport" ref={thumbViewportRef}>
                        <div className="embla__container--thumb">
                            {slides.map((index) => (
                                <Thumb
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    imgSrc={thumbByIndex(index)}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="embla">
                    <div className="embla__viewport" ref={mainViewportRef}>
                        <div className="embla__container">
                            {slides.map((index) => (
                                <div className="embla__slide embla__slide__inner" key={index}>
                                    <Image
                                        layout="fill"
                                        className="embla__slide__img"
                                        src={thumbByIndex(index)}
                                        alt="Imágenes del espacio no encontradas"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;