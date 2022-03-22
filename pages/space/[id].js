import SpaceOwner from "../../components/SpaceOwner/index.js";
import EmblaCarousel from "../../components/SpacesCarousel/index.js";
import TopNav from "../../components/TopNav";
import { addDays, isSameDay } from "date-fns";
import BookingModal from "../../components/Booking/modal.js";
import BookingDiv from "../../components/Booking/div.js";
import { useState } from "react";
import axios from "axios";
import SpaceInfo from "../../components/SpaceInfo/index.js";

const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export default function Space(props) {
    if (props.space == null) {
        return <div>Loading...</div>;
    }

    const [showModal, setShowModal] = useState(false);

    const [dateRange, setDateRange] = useState(
        [{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }]
    );

    const [timeRange, setTimeRange] = useState(
        {
            initialTime: '00:00',
            finalTime: '00:00'
        }
    );

    const calculateDisabledDates = () => {
        let disabledDates = [];
        if (props.rentalsDates) {
            props.rentalsDates.forEach(rental => {
                let currentDate = rental.initialDate;
                while (currentDate <= rental.finalDate) {
                    disabledDates.push(new Date(currentDate));
                    currentDate = addDays(currentDate, 1);
                }
            });
        }
        return disabledDates;
    };




    const [disabledDates, setDisabledDates] = useState(calculateDisabledDates());

    return (
        <>
            <TopNav />
            <div className='flex justify-center items-start'>
                <div className="lg:border-webcolor-50 md:border-2 md:rounded-md md:mt-4 lg:w-2/3 w-full ">
                    <EmblaCarousel slides={slides} />
                    <SpaceInfo space={props.space} owner={props.owner} showModal={showModal} setShowModal={setShowModal} />
                </div>
                <div className="">
                    <BookingDiv user={props.user} space={props.space} dateRange={dateRange} setDateRange={setDateRange} timeRange={timeRange} setTimeRange={setTimeRange}
                        disabledDates={disabledDates} setDisabledDates={setDisabledDates} />
                    {showModal && (
                        <BookingModal user={props.user} space={props.space} disabledDates={disabledDates} setDisabledDates={setDisabledDates} dateRange={dateRange} setDateRange={setDateRange} timeRange={timeRange} setTimeRange={setTimeRange} handleClose={() => setShowModal(false)} />
                    )}
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const spaces = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces`);
    const paths = spaces.data.map(space => ({
        params: {
            id: space.id.toString(),
        }
    }));
    return {
        paths,
        fallback: true
    };
}

export async function getStaticProps({ params }) {
    const space = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}`);

    const owner = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.data.ownerId}`);

    // const ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.data.ownerId}`);

    let rentalDates = [];
    await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}/rentals`).then(res => {
        rentalDates = res.data.filter(rental => new Date(rental.initialDate) >= new Date() &&
            !isSameDay(new Date(rental.finalDate), new Date(rental.initialDate)))
            .map(rental => {
                return {
                    initialDate: new Date(rental.initialDate).getTime(),
                    finalDate: new Date(rental.finalDate).getTime()
                };
            })
    }
    ).catch(err => console.log(`No rentals found for space ${params.id}`));




    return {
        props: {
            space: space.data,
            owner: owner.data,
            // rating: ratings.data.map(rating => rating.rating).reduce((a, b) => a + b, 0) / ratings.data.length,
            rentalsDates: rentalDates
        },
        revalidate: 1000
    };
}

