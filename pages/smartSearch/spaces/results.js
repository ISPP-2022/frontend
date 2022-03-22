import axios from 'axios';
import SpaceOwner from '../../../components/SpaceOwner';
import SpaceSearchCarousel from '../../../components/SpacesCarousel/searchCarousel';
import TopNav from '../../../components/TopNav';
import { Button } from '../../../components/Core/Button';
import { useState } from 'react';


const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export default function SpaceSmartSearch(props) {

    const [type, setType] = useState('');

    const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);

    console.log(props.spaces);
    return (
        <>
            <TopNav />
            <div className=" flex justify-center ">
                <div id="main" className='md:border-webcolor-50 md:border-2 md:rounded-md md:mt-4 w-1/2'>
                    <div className='flex'>
                        <SpaceSearchCarousel slides={slides} />
                        <div>
                            <div className='flex flex-col h-[33%] mt-10'>
                                <h2 className="ml-8 text-4xl font text-justify mt-4">{props.spaces[selectedSpaceIndex].name}</h2>
                                <p className='py-4'>Tipo de alquiler</p>
                                <ul className='grid grid-cols-3 rounded-lg'>
                                    <li className={`border-2 border-webcolor-50 text-center rounded-md ${props.spaces[selectedSpaceIndex].priceHour ? '' : 'bg-gray-400'}`}>
                                        <input className='hidden peer' type="radio" id="hours" name="type" value="hours" onChange={(e) => setType(e.target.value)} disabled={props.spaces[selectedSpaceIndex].priceHour === undefined} />
                                        <label htmlFor="hours" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Horas</label>
                                    </li>
                                    <li className={`border-2 border-webcolor-50 text-center rounded-md ${props.spaces[selectedSpaceIndex].priceDay ? '' : 'bg-gray-400'}`}>
                                        <input className='hidden peer' type="radio" id="days" name="type" value="days" onChange={(e) => setType(e.target.value)} disabled={props.spaces[selectedSpaceIndex].priceDay === undefined} />
                                        <label htmlFor="days" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Días</label>
                                    </li>
                                    <li className={`border-2 border-webcolor-50 text-center rounded-md  ${props.spaces[selectedSpaceIndex].priceMonth ? '' : 'bg-gray-400'}`}>
                                        <input className='hidden peer' type="radio" id="months" name="type" value="months" onChange={(e) => setType(e.target.value)} disabled={props.spaces[selectedSpaceIndex].priceMonth === undefined} />
                                        <label htmlFor="months" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Meses</label>
                                    </li>
                                </ul>
                            </div>

                            <div className='flex justify-between h-[30%]'>
                                <div>
                                    {props.spaces[selectedSpaceIndex].priceHour && type === 'hours' && <h2 className="ml-8 text-2xl font text-left">{props.spaces[selectedSpaceIndex].priceHour} €/hora</h2>}
                                    {props.spaces[selectedSpaceIndex].priceDay && type === 'days' && <h2 className="ml-8 text-2xl font text-left">{props.spaces[selectedSpaceIndex].priceDay} €/día</h2>}
                                    {props.spaces[selectedSpaceIndex].priceMonth && type === 'months' && <h2 className="ml-8 text-2xl font text-left">{props.spaces[selectedSpaceIndex].priceMonth} €/mes</h2>}
                                </div>

                                <h2 className="mr-4 text-2xl font content-center">{props.spaces[selectedSpaceIndex].dimensions}</h2>
                            </div>
                            <div className='h-[17%] flex justify-between'>
                                <SpaceOwner />
                                <Button type="button" className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl mr-4">
                                    Chat
                                </Button>
                            </div>

                        </div>
                    </div>

                    <hr className=" bg-webcolor-50 w-[80%] mx-auto" />

                    <div className="flex justify-center overflow-x-auto whitespace-nowrap my-3 hover:overflow-x-scroll">
                        {props.spaces[selectedSpaceIndex].tags.map(tag => (
                            <Button type="button" className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl inline-block" key={tag.tag} >
                                {tag.tag}
                            </Button>
                        ))}
                    </div>

                    <hr className=" bg-webcolor-50 w-[80%] m-auto mb-4" />
                    <div className='flex justify-center overflow-x-auto whitespace-nowrap my-3 '>
                        <Button type="button" className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl">
                            Más info.
                        </Button>
                    </div>

                    <hr className=" bg-webcolor-50 w-[80%] m-auto mb-4" />

                    <div className="flex justify-center overflow-x-auto whitespace-nowrap my-3 ">
                        <Button type="button" onClick={() => setSelectedSpaceIndex((selectedSpaceIndex - 1 + props.spaces.length) % props.spaces.length)} className="bg-webcolor-50 text-gray-50 border-webcolor-50 border-2 rounded-2xl">
                            Anterior
                        </Button>
                        <Button type="button" onClick={() => setSelectedSpaceIndex((selectedSpaceIndex + 1) % props.spaces.length)} className="bg-webcolor-50 text-gray-50 border-webcolor-50 border-2 rounded-2xl">
                            Siguiente
                        </Button>
                    </div>


                </div>
            </div>
        </>)
};

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




