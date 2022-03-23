import { addDays, isSameDay } from "date-fns";
import SpacesCarousel from "../../components/SpacesCarousel"
import BookingModal from "../../components/Booking/modal.js";
import BookingDiv from "../../components/Booking/div.js";
import Image from "next/image";
import { Button } from '../../components/Core/Button';
import { Rating } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import enumTranslator from "../../public/enumTranslator.json";

export default function Space(props) {
    if (props.space == null) {
        return <div>Loading...</div>;
    }

    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('hours');
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
        <div className="h-full md:bg-gray-100 flex justify-center items-center">
            <div id="main" className="md:bg-white mb-4 p-5 pl-10 pr-10 md:w-2/3 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-3 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
                {/* Main body */}
                <div className='flex flex-col h-[90%] lg:h-full'>
                    {/* Title */}
                    <div className='basis-[56px] flex flex-row justify-center'>
                        <h2 className='font-bold text-[40px] py-2 text-blue-bondi'>{props.space.name}</h2>
                    </div>

                    {/* Caroussel and price */}
                    <div className=' basis-1/2 relative w-full h-full'>
                        <SpacesCarousel slides={props.space.images} />

                        <div className='flex flex-row justify-center absolute bottom-2 left-2'>
                            <div className="text-white font-bold bg-blue-bondi rounded-full p-5 py-2">
                                {props.space.priceHour && type === 'hours' && <h2 className="text-2xl">{props.space.priceHour} €/hora</h2>}
                                {props.space.priceDay && type === 'days' && <h2 className="text-2xl">{props.space.priceDay} €/día</h2>}
                                {props.space.priceMonth && type === 'months' && <h2 className="text-2xl">{props.space.priceMonth} €/mes</h2>}
                            </div>
                            {props.space.shared ?
                                <div className="text-white font-bold bg-blue-bondi rounded-full p-5 py-2">
                                    <h2 className="text-2xl">Espacio compartido</h2>
                                </div> : null
                            }
                        </div>
                    </div>

                    {/* Space data */}
                    <div className='basis-1/2 flex flex-row pt-3'>

                        {/* User and price selector */}
                        <div className='basis-1/3 flex flex-col'>
                            <div className="basis-1/2 md:basis-5/6 xl:basis-[40%] relative flex flex-col xl:flex-row items-center">
                                <div className="basis-[55%] md:basis-1/2 xl:basis-1/4 relative justify-center w-1/2 xl:h-[80%]">
                                    <Image src={props.owner?.avatar ? `data:${props.owner.avatar.mimetype};base64, ${props.owner.avatar.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" layout="fill"></Image>
                                </div>
                                <div className="basis-[45%] md:basis-1/2 xl:basis-3/4 flex flex-col items-center xl:items-start justify-start pl-2 pr-2 w-full mt-2 xl:mt-0">
                                    <p className="font-bold text-ellipsis whitespace-nowrap">{props.owner?.name || 'SomeUser'}</p>
                                    <Rating value={props.rating || 0} readOnly />
                                </div>
                            </div>
                            <div className='basis-1/2 md:basis-1/6 xl:basis-[60%]'>
                                <div className='flex flex-col md:flex-row justify-evenly xl:justify-center items-center lg:items-end xl:items-center h-full w-full'>
                                    <Button type="button" onClick={() => setType('hours')} disabled={!props.space.priceHour || type === 'hours'} color={type === 'hours' ? 'secondary' : 'primary'} className="rounded-3xl w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">H</Button>
                                    <Button type="button" onClick={() => setType('days')} disabled={!props.space.priceDay || type === 'days'} color={type === 'days' ? 'secondary' : 'primary'} className="rounded-3xl w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">D</Button>
                                    <Button type="button" onClick={() => setType('months')} disabled={!props.space.priceMonth || type === 'months'} color={type === 'months' ? 'secondary' : 'primary'} className="rounded-3xl w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">M</Button>
                                </div>
                            </div>
                        </div>

                        {/* Tags and description */}
                        <div className='basis-2/3 flex flex-col pt-3 max-h-100'>
                            <div className='basis-1/2 md:basis-[72%] xl:basis-1/2 flex flex-col xl:flex-row items-center overflow-auto max-h-[200px]'>
                                <p className='text-blue-bondi h-full'><b>Descripci&oacute;n:&nbsp;</b>{props.space.description}</p>
                            </div>
                            <hr className=" bg-webcolor-50 w-full mx-auto my-1" />
                            <div className='basis-1/2 md:basis-[28%] xl:basis-1/2 line-clamp-4 md:line-clamp-2 xl:line-clamp-3 hover:overflow-auto'>
                                {props.space.tags.map(tag => (
                                    <span className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl inline-block px-2 py-1 my-2 mr-2">
                                        {enumTranslator.tags[tag.tag]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Rent button */}
                <hr className="lg:hidden bg-webcolor-50 w-[97%] m-auto mb-4" />
                <div className="lg:hidden h-[7%] flex justify-center overflow-x-auto whitespace-nowrap my-3 ">
                    <Button type="button" onClick={() => setShowModal(true)} className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl flex items-center">
                        Reserva
                    </Button>
                </div>
            </div>
            <div className="">
                <BookingDiv user={props.user} space={props.space} dateRange={dateRange} setDateRange={setDateRange} timeRange={timeRange} setTimeRange={setTimeRange}
                    disabledDates={disabledDates} setDisabledDates={setDisabledDates} />
                {showModal && (
                    <BookingModal user={props.user} space={props.space} disabledDates={disabledDates} setDisabledDates={setDisabledDates} dateRange={dateRange} setDateRange={setDateRange} timeRange={timeRange} setTimeRange={setTimeRange} handleClose={() => setShowModal(false)} />
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const space = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}`).then(async res => {
        let images = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}/images`).then(imageres => imageres.data).catch(() => { });
        if (images) res.data.images = images;
        return res.data;
    });
    const owner = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.ownerId}`).then(async res => {
        let avatar = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${res.data.id}/avatar`).then(avatarres => avatarres.data).catch(() => { });
        if (avatar) res.data.avatar = avatar;
        return res.data;
    });
    const ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.ownerId}/ratings?filter=received`).then(res => res.data).catch(() => { });

    let rentalDates = [];
    await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}/rentals`).then(res => {
        rentalDates = res.data.filter(rental => new Date(rental.finalDate) > new Date() &&
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
            space: space,
            owner: owner,
            rating: ratings ? ratings.reduce((acc, val, _idx, arr) => { return acc + val.rating / arr.length }, 0) : 0,
            rentalsDates: rentalDates
        }
    };
}

