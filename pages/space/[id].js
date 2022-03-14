import SpaceOwner from "../../components/SpaceOwner/index.js";
import EmblaCarousel from "../../components/SpacesCarousel/index.js";
import TopNav from "../../components/TopNav";


const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export default function Space(props) {
    return (
        <>
            <TopNav />
            <div className='md:flex justify-center md:mr-[25%]'>
                <div className="md:border-webcolor-50 md:border-2 md:rounded-md md:mt-4">
                    <EmblaCarousel slides={slides} />
                    <SpaceOwner />
                </div>
            </div>
        </>
    )
}