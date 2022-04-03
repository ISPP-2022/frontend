import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Thumb from "./carouselThumb";
import Image from "next/image"
import thumbByIndex from "./media/index";


const SpaceSearchCarousel = ({ slides }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mainViewportRef, embla] = useEmblaCarousel({});
    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
        axis: "y",
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
        <div className="flex flex-row justify-start w-full h-full min-h-[200px]">
            <div className="basis-full lg:basis-2/3 relative overflow-hidden" ref={mainViewportRef}>
                <div className="flex select-none h-full">
                    {slides?.length > 0 ? slides.map((image, index) => (
                        <div className="relative min-w-full h-full shadow-lg" key={index}>
                            <Image
                                layout="fill"
                                className="relative mx-auto block touch-manipulation rounded-lg"
                                src={`data:${image.mimetype};base64,${image.image}`}
                                alt="Imágenes del espacio no encontradas"
                            />
                        </div>
                    )) : <div className="relative min-w-full h-full shadow-lg">
                        <Image
                            layout="fill"
                            className="relative mx-auto block touch-manipulation rounded-lg"
                            src={`/spacePlaceholder.jpg`}
                            alt="Imágenes del espacio no encontradas"
                        />
                    </div>}
                </div>
            </div>
            <div className="hidden basis-0 lg:block lg:basis-1/3 relative overflow-hidden" ref={thumbViewportRef}>
                <div className="flex flex-col select-none h-10">
                    {slides?.length > 0 ? slides.map((image, index) => (
                        <div className="mx-2" key={index}>
                            <Thumb
                                onClick={() => onThumbClick(index)}
                                imgSrc={`data:${image.mimetype};base64,${image.image}`}
                                key={index}
                            />
                        </div>
                    )) : <div className="mx-2">
                        <Thumb
                            imgSrc={`/spacePlaceholder.jpg`}
                        />
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default SpaceSearchCarousel;