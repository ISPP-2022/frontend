import SpaceOwner from "../../components/SpaceOwner/index.js";
import EmblaCarousel from "../../components/SpacesCarousel/index.js";
import TopNav from "../../components/TopNav";

import BookingModal from "../../components/Booking/modal.js";
import BookingDiv from "../../components/Booking/div.js";
import { Button } from "../../components/Core/Button/index.js";
import { useState } from "react";

const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export default function Space() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <TopNav />
            <div className='flex justify-center items-start'>
                <div className="md:border-webcolor-50 md:border-2 md:rounded-md md:mt-4">
                    <EmblaCarousel slides={slides} />
                    <SpaceOwner />
                    <div className="flex justify-center my-2">
                        <Button onClick={() => setShowModal(true)} type="button" className="lg:hidden bg-gray-50 text-webcolor-50 border-webcolor-50 border-2">
                            Reservar
                        </Button>
                    </div>
                </div>
                <div>
                    <BookingDiv />
                    {showModal && (
                        <BookingModal handleClose={() => setShowModal(false)} />
                    )}
                </div>
            </div>
        </>
    )
}