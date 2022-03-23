import axios from 'axios';
import Image  from 'next/image';
import { Rating } from "@mui/material";
import SpaceSearchCarousel from '../../../components/SpacesCarousel/searchCarousel';
import { Button } from '../../../components/Core/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';


const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export default function SpaceSmartSearch(props) {
    let data;
    const router = useRouter();
    const [type, setType] = useState('hours');

    const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);

    return (
            <div className="h-full md:bg-gray-100 flex justify-center items-center">
                <div id="main" className="md:bg-white mb-4 p-5 pl-10 pr-10 md:w-2/3 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-3 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
                    {/* Main body */}
                    <div className='flex flex-col h-[90%]'>
                        {/* Title */}
                        <div className='basis-[56px] flex flex-row justify-center'>
                            <h2 className='font-bold text-[40px] py-2 text-blue-bondi'>{props.spaces[selectedSpaceIndex].name}</h2>
                        </div>

                        {/* Caroussel and price */}
                        <div className=' basis-1/2 relative w-full h-full'>
                            <SpaceSearchCarousel slides={slides} />
                            
                            <div className='flex justify-center absolute text-white font-bold bg-blue-bondi rounded-full p-5 py-2 bottom-2 left-2'>
                                <div>
                                    {props.spaces[selectedSpaceIndex].priceHour && type === 'hours' && <h2 className="text-2xl">{props.spaces[selectedSpaceIndex].priceHour} €/hora</h2>}
                                    {props.spaces[selectedSpaceIndex].priceDay && type === 'days' && <h2 className="text-2xl">{props.spaces[selectedSpaceIndex].priceDay} €/día</h2>}
                                    {props.spaces[selectedSpaceIndex].priceMonth && type === 'months' && <h2 className="text-2xl">{props.spaces[selectedSpaceIndex].priceMonth} €/mes</h2>}
                                </div>
                            </div>
                        </div>

                        {/* Space data */}
                        <div className='basis-1/2 flex flex-row pt-3'>

                            {/* User and price selector */}
                            <div className='basis-1/3 flex flex-col'>
                                <div className="basis-1/2 md:basis-5/6 xl:basis-[40%] relative flex flex-col xl:flex-row items-center">
                                    <div className="basis-[55%] md:basis-1/2 xl:basis-1/4 relative justify-center w-1/2 xl:h-[80%]">
                                        <Image src={data?.image ? `data:${data.image.mimetipe};base64, ${data.image.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" layout="fill"></Image>
                                    </div>
                                    <div className="basis-[45%] md:basis-1/2 xl:basis-3/4 flex flex-col items-center xl:items-start justify-start pl-2 pr-2 w-full mt-2 xl:mt-0">
                                        <p className="font-bold text-ellipsis whitespace-nowrap">{data?.name || 'SomeUser'}</p>
                                        <Rating value={data?.rating || 0} readOnly />
                                    </div>
                                </div>
                                <div className='basis-1/2 md:basis-1/6 xl:basis-[60%]'>
                                    <div className='flex flex-col md:flex-row justify-evenly xl:justify-center items-center lg:items-end xl:items-center h-full w-full'>
                                        <Button type="button" onClick={() => setType('hours')} disabled={!props.spaces[selectedSpaceIndex].priceHour || type==='hours'} color={type==='hours' ? 'secondary':'primary'} className="rounded-3xl w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">H</Button>
                                        <Button type="button" onClick={() => setType('days')} disabled={!props.spaces[selectedSpaceIndex].priceDay || type==='days'} color={type==='days' ? 'secondary':'primary'} className="rounded-3xl w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">D</Button>
                                        <Button type="button" onClick={() => setType('months')} disabled={!props.spaces[selectedSpaceIndex].priceMonth || type==='months'} color={type==='months' ? 'secondary':'primary'} className="rounded-3xl w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">M</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Tags and description */}
                            <div className='basis-2/3 flex flex-col pt-3 max-h-100'>
                                <div className='basis-1/2 md:basis-[72%] xl:basis-1/2 flex flex-col xl:flex-row items-center'>
                                    <p className='basis-5/6 line-clamp-3 xl:line-clamp-6  text-blue-bondi h-full'><b>Descripci&oacute;n:&nbsp;</b>{props.spaces[selectedSpaceIndex].description}</p>
                                    <Button type="button" onClick={() => router.push(`/space/${props.spaces[selectedSpaceIndex].id}`)} className="basis-1/6 h-12 bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl whitespace-nowrap text-ellipsis+">
                                        M&aacute;s info.
                                    </Button>
                                </div>
                                <hr className=" bg-webcolor-50 w-full mx-auto my-1" />
                                <div className='basis-1/2 md:basis-[28%] xl:basis-1/2 line-clamp-3 md:line-clamp-2'>
                                    {props.spaces[selectedSpaceIndex].tags.map(tag => (
                                        <span className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl inline-block px-2 py-1 my-3 mr-2">
                                            {tag.tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>                 
                    </div>
                    
                    {/* Back and Next buttons */}
                    <hr className=" bg-webcolor-50 w-[97%] m-auto mb-4" />
                    <div className="h-[10%] flex justify-center overflow-x-auto whitespace-nowrap my-3 ">
                        <Button type="button" onClick={() => setSelectedSpaceIndex((selectedSpaceIndex - 1 + props.spaces.length) % props.spaces.length)} className="bg-webcolor-50 text-gray-50 border-webcolor-50 border-2 rounded-2xl">
                            Anterior
                        </Button>
                        <Button type="button" onClick={() => alert('Proximamente...')} className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl">
                            Chat
                        </Button>
                        <Button type="button" onClick={() => setSelectedSpaceIndex((selectedSpaceIndex + 1) % props.spaces.length)} className="bg-webcolor-50 text-gray-50 border-webcolor-50 border-2 rounded-2xl">
                            Siguiente
                        </Button>
                    </div>
                </div>
            </div>
)};

export async function getServerSideProps() {
    const scores = [
        {
            id: 1,
            score: 0.5,
        },
        {
            id: 2,
            score: 0.34,
        },
    ].sort((min, obj) => min.score - obj.score);

    const res = await Promise.all(scores.map((score) => axios.get(`${process.env.DATA_API_URLDATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${score.id}`)));

    const spaces = res.map((res) => res.data);

    return {
        props: {
            spaces: spaces
        }
    }
}




