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
        <div className="flex justify-center mt-4 mx-4">
            <div className="p-2 mx-auto pt-0 hidden md:flex">
                <div className="overflow-hidden relative block mx-auto" ref={thumbViewportRef}>
                    <div className="cursor-default select-none h-[300px] w-[200px]">
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
            <div className="p-2 mx-auto">
                <div className="overflow-hidden bg-contain relative block mx-auto" ref={mainViewportRef}>
                    <div className="flex select-none w-auto sm:w-[500px]">
                        {slides.map((index) => (
                            <div className="min-w-full my-[8%] relative h-[300px] rounded:md mx-2 px-2" key={index}>
                                <Image
                                    layout="fill"
                                    className="touch-manipulation relative block mx-auto rounded-md"
                                    src={thumbByIndex(index)}
                                    alt="Imágenes del espacio no encontradas"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;