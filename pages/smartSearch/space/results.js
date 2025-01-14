import axios from 'axios';
import Image from 'next/image';
import { Rating } from "@mui/material";
import SpaceSearchCarousel from '../../../components/SpacesCarousel';
import { Button } from '../../../components/Core/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import enumTranslator from '../../../public/enumTranslator.json';
import Head from 'next/head';

export default function SpaceSmartSearch() {
    const router = useRouter();
    const [type, setType] = useState('hours');

    const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);
    const [spaces, setSpaces] = useState([]);

    useEffect(() => {

        let data = sessionStorage.getItem('smartSearch')
        data = JSON.parse(data);
        if (data.length > 0) {
            Promise.all(
                data.map((item) =>
                    axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${item.id}`)
                        .then(async res => {
                            let images = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${item.id}/images`)
                                .then(imageres => imageres.data)
                                .catch(() => { console.log('holap'); return [] });
                            if (images) res.data.images = images;

                            const owner = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${res.data.ownerId}`)
                                .then(async resOwner => {
                                    let avatar = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${resOwner.data.id}/avatar`)
                                        .then(avatarres => avatarres.data)
                                        .catch(() => { });
                                    if (avatar) resOwner.data.avatar = avatar;
                                    return resOwner.data;
                                });

                            const ratings = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${res.data.ownerId}/ratings?filter=received`)
                                .then(rat => rat.data)
                                .catch(() => { });
                            res.data.owner = owner;
                            if (ratings) res.data.owner.rating = ratings.reduce((acc, cur, _idx, arr) => { return acc + cur.rating / arr.length }, 0);
                            return res.data;
                        })
                )).then(resSpaces => {
                    setSpaces(resSpaces);
                })
        } else {
            alert('No se ha encontrado ningún espacio');
            router.push('/smartSearch/space');
        }
    }, []);

    useEffect(() => {
        if (spaces[selectedSpaceIndex]?.priceHour) {
            setType('hours');
        } else if (spaces[selectedSpaceIndex]?.priceDay) {
            setType('days');
        } else if (spaces[selectedSpaceIndex]?.priceMonth) {
            setType('months');
        }
    }, [selectedSpaceIndex, spaces]);
    return (
        <div className="h-screenC md:bg-gray-100 flex justify-center items-center">
            <Head>
                <title>Espacios</title>
            </Head>
            <main id="main" className="md:bg-white mb-4 p-5 pl-10 pr-10 md:w-2/3 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-3 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
                {/* Main body */}
                <article className='flex flex-col h-[90%]'>
                    {/* Title */}
                    <header className='basis[30px] md:basis-[56px] flex flex-row justify-center'>
                        <h2 className='font-bold text-[25px] md:text-[40px] py-2 text-blue-bondi'>{spaces[selectedSpaceIndex]?.name}</h2>
                    </header>

                    {/* Caroussel and price */}
                    <section className=' basis-1/2 relative w-full h-full'>
                        <SpaceSearchCarousel slides={spaces[selectedSpaceIndex]?.images} />

                        <div className='flex flex-row justify-center absolute bottom-2 left-2'>
                            <div className="text-white font-bold bg-blue-bondi rounded-full p-2 xl:p-5 py-2">
                                {spaces[selectedSpaceIndex]?.priceHour && type === 'hours' && <h2 className="text-sm xl:text-2xl">{spaces[selectedSpaceIndex]?.priceHour} €/hora</h2>}
                                {spaces[selectedSpaceIndex]?.priceDay && type === 'days' && <h2 className="text-sm xl:text-2xl">{spaces[selectedSpaceIndex]?.priceDay} €/día</h2>}
                                {spaces[selectedSpaceIndex]?.priceMonth && type === 'months' && <h2 className="text-sm xl:text-2xl">{spaces[selectedSpaceIndex]?.priceMonth} €/mes</h2>}
                            </div>
                            {spaces[selectedSpaceIndex]?.shared ?
                                <div className="text-white font-bold bg-blue-bondi rounded-full p-2 xl:p-5 py-2">
                                    <h2 className="text-sm xl:text-2xl">Espacio compartido</h2>
                                </div> : null
                            }
                        </div>
                    </section>

                    {/* Space data */}
                    <data className='basis-1/2 flex flex-col sm:flex-row pt-3'>

                        {/* User and price selector */}
                        <section className='basis-1/3 flex flex-col'>
                            <div className="basis-1/2 md:basis-5/6 xl:basis-[40%] relative flex flex-col xl:flex-row items-center">
                                <div className="basis-[55%] md:basis-1/2 xl:basis-1/4 relative justify-center w-1/2 xl:h-[80%]">
                                    <Image src={spaces[selectedSpaceIndex]?.owner.avatar ? `data:${spaces[selectedSpaceIndex]?.owner.avatar.mimetipe};base64, ${spaces[selectedSpaceIndex]?.owner.avatar.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" layout="fill"></Image>
                                </div>
                                <div className="basis-[45%] md:basis-1/2 xl:basis-3/4 flex flex-col items-center xl:items-start justify-start pl-2 pr-2 w-full mt-2 xl:mt-0">
                                    <p className="font-bold text-ellipsis whitespace-nowrap">{spaces[selectedSpaceIndex]?.owner.name || 'SomeUser'}</p>
                                    <Rating value={spaces[selectedSpaceIndex]?.owner.rating || 0} readOnly />
                                </div>
                            </div>
                            <div className='basis-1/2 md:basis-1/6 xl:basis-[60%]'>
                                <div className='flex flex-col md:flex-row justify-evenly xl:justify-center items-center lg:items-end xl:items-center h-full w-full'>
                                    <Button type="button" onClick={() => setType('hours')} disabled={!spaces[selectedSpaceIndex]?.priceHour || type === 'hours'} color={type === 'hours' ? 'secondary' : 'primary'} className="rounded-3xl h-[30px] my-[2px] w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">H</Button>
                                    <Button type="button" onClick={() => setType('days')} disabled={!spaces[selectedSpaceIndex]?.priceDay || type === 'days'} color={type === 'days' ? 'secondary' : 'primary'} className="rounded-3xl h-[30px] my-[2px] w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">D</Button>
                                    <Button type="button" onClick={() => setType('months')} disabled={!spaces[selectedSpaceIndex]?.priceMonth || type === 'months'} color={type === 'months' ? 'secondary' : 'primary'} className="rounded-3xl h-[30px] my-[2px] w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-full lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">M</Button>
                                </div>
                            </div>
                        </section>

                        {/* Tags and description */}
                        <section className='basis-2/3 flex flex-col pt-3 max-h-100'>
                            <div className='basis-1/2 md:basis-[72%] xl:basis-1/2 flex flex-col xl:flex-row items-center'>
                                <p className='basis-5/6 line-clamp-3 xl:line-clamp-6  text-blue-bondi h-full'><b>Descripci&oacute;n:&nbsp;</b>{spaces[selectedSpaceIndex]?.description}</p>
                                <Button type="button" onClick={() => router.push(`/space/${spaces[selectedSpaceIndex]?.id}`)} className="basis-1/6 h-12 bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl whitespace-nowrap text-ellipsis+">
                                    M&aacute;s info.
                                </Button>
                            </div>
                            <hr className=" bg-webcolor-50 w-full mx-auto my-1" />
                            <div className='basis-1/2 py-1 shrink-0 overflow-auto'>
                                {spaces[selectedSpaceIndex]?.tags.map((tag, index) => (
                                    <span key={`t-${index}`} className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl inline-block px-2 py-1 my-1 md:my-3 mr-2">
                                        {enumTranslator.tags[tag.tag]}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </data>
                </article>

                {/* Back and Next buttons */}
                <hr className=" bg-webcolor-50 w-[97%] m-auto mb-4" />
                <footer className="h-[8%] md:h-[10%] flex justify-center overflow-x-auto whitespace-nowrap my-3 ">

                    <Button type="button" disabled={selectedSpaceIndex === 0} onClick={() => setSelectedSpaceIndex((selectedSpaceIndex - 1))} className="flex items-center justify-center rounded-3xl disabled:bg-gray-200 p-2 md:px-6 w-[90px] md:w-auto">
                        Anterior
                    </Button>
                    <Button type="button" onClick={() => router.push(`/chat?user=${spaces[selectedSpaceIndex].owner.id}`)} className="flex items-center justify-center bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl p-2 md:px-6 w-[30px] md:w-auto">
                        Chat
                    </Button>
                    <Button type="button" disabled={selectedSpaceIndex + 1 === spaces.length} onClick={() => setSelectedSpaceIndex((selectedSpaceIndex + 1))} className="flex items-center justify-center rounded-3xl disabled:bg-gray-200 p-2 md:px-6 w-[90px] md:w-auto">
                        Siguiente
                    </Button>

                </footer>
            </main>
        </div>
    )
};




