import SpaceOwner from "../../components/SpaceOwner/index.js";
import EmblaCarousel from "../../components/SpacesCarousel/index.js";
import TopNav from "../../components/TopNav";

import DateRangeInput from "../../components/DateRange/index.js";
import { Button } from "../../components/Core/Button/index.js";

const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export default function Space() {

    return (
        <>
            <TopNav />
            <div className='md:flex justify-center items-start'>
                <div className="md:border-webcolor-50 md:border-2 md:rounded-md md:mt-4">
                    <EmblaCarousel slides={slides} />
                    <SpaceOwner />
                </div>
                <div className="md:border-webcolor-50 md:border-2 md:rounded-md md:mt-4 md:ml-4 justify-center">
                    <DateRangeInput />
                    <div className='flex justify-center'>
                        <Button type="button" className="fill-webcolor-50 mt-4">
                            Reservar
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}