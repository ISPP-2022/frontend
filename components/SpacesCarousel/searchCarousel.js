import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Thumb from "./carouselThumb";
import Image from "next/image"
import thumbByIndex from "./media/index";


const SpaceSearchCarousel = ({ slides }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mainViewportRef, embla] = useEmblaCarousel({});
    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
        axis: "x",
        containScroll: "keepSnaps",
        selectedClass: "",
        dragFree: true,
        loop: true

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
        <div className="justify-start mt-4 ml-4 mr-4 w-2/3">
            <div className="mx-auto">
                <div className="overflow-hidden relative block mx-auto" ref={mainViewportRef}>
                    <div className="flex select-none">
                        {slides.map((index) => (
                            <div className="relative my-[8%] min-w-full overflow-hidden rounded-lg mr-1 h-80" key={index}>
                                <Image
                                    layout="fill"
                                    className="relative mx-auto block touch-manipulation"
                                    src={thumbByIndex(index)}
                                    alt="Imágenes del espacio no encontradas"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-auto p-3 pt-0">
                <div className="overflow-hidden relative block mx-auto" ref={thumbViewportRef}>
                    <div className="flex select-none w-[200px]">
                        {slides.map((index) => (
                            <div className="mx-1" key={index}>
                                <Thumb
                                    onClick={() => onThumbClick(index)}
                                    imgSrc={thumbByIndex(index)}
                                    className="w-[200px]"
                                    key={index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SpaceSearchCarousel;