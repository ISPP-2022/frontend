import EmblaCarousel from "../../components/SpacesCarousel/index.js";
import TopNav from "../../components/TopNav";


const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export default function Space(props) {
    return (
        <>
            <TopNav />
            <div className='md:flex justify-center md:mr-[25%]'>
                <EmblaCarousel slides={slides} />
            </div>
        </>
    )
}