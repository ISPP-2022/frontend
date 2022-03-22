import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { useState, useEffect } from "react";

export async function getServerSideProps(ctx) {

    const cookies = ctx.req.cookies;
    const user = jwt.decode(cookies.authToken);
    const userId = user.userId;
    let spaces
    try {
        let spacesres = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${userId}/spaces`);
        spaces = spacesres.data
    }
    catch (error) {
        console.log(error)
    }
    return {
        props: {
            spaces: spaces ? spaces : []
        }
    }
}

function Renter({ spaces }) {

    const [selected, setSelected] = useState(0);
    const [pageN, setPageN] = useState(0);
    const [page, setPage] = useState([]);
    const [spacesWhites, setSpacesWhites] = useState([]);
    const [scroll, setScroll] = useState(false);

    function setItemsPerPage() {
        setScroll(false);
        let items = [];
        if (window.innerWidth > 1280) {
            items = [...spaces.slice(0 + (pageN * 8), 8 * (pageN + 1))];
            setPage(items);
            setSpacesWhites(Array(8 - items.length > 0 ? 8 - items.length : 0).fill(0))
        }
        else if (768 < window.innerWidth && window.innerWidth < 1280) {
            items = [...spaces.slice(0 + (pageN * 6), 6 * (pageN + 1))];
            setPage(items);
            setSpacesWhites(Array(8 - items.length > 0 ? 6 - items.length : 0).fill(0))
        }
        else {
            setScroll(true);
            items = [...spaces];
            setPage(items);
            setSpacesWhites([])
        }
    }

    useEffect(() => {
        window.onresize = setItemsPerPage;
        setItemsPerPage()
    }, [])

    useEffect(() => {
        setItemsPerPage()
    }, [pageN])


    return (
        <div className="h-full md:bg-gray-100 flex justify-center items-center">
            <div className="md:bg-white mb-4 p-4 w-[80vw] md:w-2/3 h-full md:h-3/4 md:min-h-[548px] md:mt-3 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
                <div className="p-5 md:mb-5 ">
                    <h1 className=" text-2xl md:text-3xl flex justify-center items-center text-center font-bold text-[#4aa7c0] ">Elige tu espacio</h1>
                </div>
                {
                    scroll ? <></> : <div>
                        <button onClick={() => pageN > 0 ? setPageN(pageN - 1) : ''} className={`absolute top-[44%] -left-8 text-white rounded-full ${pageN > 0 ? 'bg-blue-bondi hover:bg-blue-bondi-dark' : 'bg-gray-400'} p-3 z-40 `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={() => spacesWhites.length > 0 ? '' : setPageN(pageN + 1)} className={`absolute top-[44%] -right-8 text-white rounded-full ${spacesWhites.length === 0 ? 'bg-blue-bondi hover:bg-blue-bondi-dark' : 'bg-gray-400'} p-3 z-40`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                }

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:grid-rows-2 gap-4 grid-flow-row overflow-y-auto justify-items-center h-4/6">
                    {page.map((obj, index) => {
                        return (
                            <div key={index} onClick={() => setSelected(index)} id={index} className={`rounded-md max-h-[120px] overflow-hidden min-h-[150px] w-full border  border-[#4aa7c0] ${selected === index ? 'bg-[#4aa7c0] text-white font-bold' : 'hover:bg-gray-200'}`}>
                                <div className="relative w-full h-5/6">
                                    <Image src={obj.images?.length > 0 ? `data:${obj.images[0].mimetipe};base64, ${obj.images[0].image}` : '/spacePlaceholder.jpg'} layout='fill' objectFit="cover" alt={`space${index}`} />
                                </div>
                                <h1 className="text-center z-50">{obj.name}</h1>
                            </div>
                        )
                    })}
                    {spacesWhites?.length === 0 ? '' : spacesWhites.map((obj, index) => {
                        return (
                            <div key={`White${index}`} className={`rounded-md max-h-[120px] overflow-hidden min-h-[150px] w-full border border-gray-300 bg-gray-200`}>

                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-center items-center mt-5">
                    <Link href={{ pathname: '/smartSearch/renter/results', query: { space: page[selected]?.id } }}>
                        <button disabled={!page[selected]?.id} className={`text-white font-bold py-2 px-4 rounded ${!page[selected]?.id ? 'bg-gray-300 text-gray-500' : 'bg-[#4aa7c0] hover:bg-blue-bondi-dark'}`}>
                            Start
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Renter