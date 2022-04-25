import Image from "next/image";
import { Rating } from "@mui/material";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from "axios";
import enumTranslator from '../../../public/enumTranslator.json'
import Head from "next/head";

export default function Results() {
    const router = useRouter();
    const [smartResult, setSmartResult] = useState([])
    const [data, setData] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/smartSearch/renters?spaceId=${router.query.space}`, { withCredentials: true }).then((res) => {
            setSmartResult(res.data)
            setSelectedIndex(0)
            setLoading(false)
        }).catch(err => {
            let responseError = err.response?.data
            if (responseError === 'No users found to recommend')
                alert('No se ha encontrado ningun usuario para este espacio')
            else if (responseError === 'Space cannot be found or has no tags to recommend users based on')
                alert('Espacio no disponible para la recomendación, asegurese de tener las etiquetas asignadas')

            router.push('/smartSearch/renter')
        })
    }, [])

    useEffect(() => {
        if (smartResult[selectedIndex]) {
            const userEndpoint = `${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${smartResult[selectedIndex].id}`
            axios.get(userEndpoint)
                .then(async (res) => {
                    let tempData = { ...res.data }
                    let rating = 0
                    await axios.get(`${userEndpoint}/avatar`)
                        .then(resAvatar => {
                            tempData = { ...tempData, image: resAvatar.data }
                        }).catch(() => { })
                    await axios.get(`${userEndpoint}/ratings`)
                        .then(resRating => {
                            if (resRating.data.length > 0)
                                rating = resRating.data.reduce((acc, element) => acc + element.rating, 0);

                            tempData = { ...tempData, rating }
                        }).catch(() => { })
                    await axios.get(`${userEndpoint}/spaces`)
                        .then(resSpaces => {
                            tempData = { ...tempData, nSpaces: resSpaces.data?.length }
                        }).catch(() => { })
                    await axios.get(`${userEndpoint}/rentals`)
                        .then(resRentals => {
                            tempData = { ...tempData, nRentals: resRentals.data?.length }
                        }).catch(() => { })
                    await axios.get(`${userEndpoint}/items`)
                        .then(resItems => {
                            tempData = { ...tempData, items: resItems.data }
                        }).catch(() => { })
                    setData(tempData)
                })
                .catch(() => {

                })
        }
    }, [selectedIndex])

    const handlePageChange = (pageChange) => {
        const newPage = selectedIndex + pageChange
        if (0 <= newPage && newPage + 1 <= smartResult.length)
            setSelectedIndex(newPage)
    }

    return (
        <div className="h-screenC md:bg-gray-100 flex justify-center items-center">
            <Head>
                <title>
                    Inquilinos
                </title>
            </Head>
            <main className="md:bg-white mb-4 p-5 md:w-2/3 w-full h-full md:h-3/4 md:min-h-[500px] md:mt-3 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
                {/* Main box */}
                <article className="flex lg:flex-row flex-col md:h-3/4 h-5/6">
                    {/* User data */}
                    <section className="flex basis-1/3 sm:basis-1/4 md:basis-1/3 lg:basis-1/2 xl:basis-1/3 flex-col sm:flex-row lg:flex-col h-full">
                        <div className="relative flex flex-row items-center h-full lg:h-[29%] w-full sm:w-2/3 lg:w-full min-h-[100px]">
                            <div className="relative basis-1/3 h-full">
                                <Image src={data?.image ? `data:${data.image.mimetipe};base64, ${data.image.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" layout="fill"></Image>
                            </div>
                            <div className="flex xl:basis-2/3 basis-1/2 flex-col items-start justify-start pl-2 pr-2 w-full">
                                <p className="font-bold text-ellipsis whitespace-nowrap">{data?.name}</p>
                                <Rating value={data?.rating || 0} readOnly />
                            </div>
                            {
                                selectedIndex === 0 ?
                                    <div className="top-0 left-1/4 absolute rounded-2xl bg-blue-bondi text-white font-semibold pl-3 pr-3 pb-1 pt-1 inline-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-yellow-300" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                                        </svg>
                                        <p className="ml-1">Tu mejor opci&oacute;n</p>
                                    </div>
                                    : <></>
                            }
                        </div>
                        <div className="font-bold text-blue-bondi ml-4 flex flex-col sm:justify-center lg:justify-start">
                            <div className="inline-flex mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <p className="ml-1">Espacios: {data?.nSpaces || 0}</p>
                            </div>
                            <div className="inline-flex mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <p className="ml-1">Alquileres: {data?.nRentals || 0}</p>
                            </div>
                        </div>

                    </section>

                    {/* User items table */}
                    <section className="flex basis-2/3 sm:basis-3/4 md:basis-2/3 pt-4 lg:pt-0 items-start justify-center h-full">
                        <table className="w-full border-collapse rounded-t-2xl">
                            <thead>
                                <tr>
                                    <td>
                                        <table className="w-full border-collapse rounded-t-2xl">
                                            <tr className="h-12 text-white bg-blue-bondi">
                                                <th colSpan={2} className="rounded-t-2xl">Objetos a almacenar</th>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <div className="w-full h-[28vh] md:h-[30vh] lg:h-[40vh] overflow-auto">
                                    <table className="w-full border-collapse">
                                        {
                                            data?.items.map((item, index) =>
                                                <tr key={`tr-${index}`} className="odd:bg-[#d8ecf4] even:bg-white text-blue-bondi h-10">
                                                    <td className="pl-2">{enumTranslator.types[item.type]}</td>
                                                    <td>{enumTranslator.dimensions[item.dimensions]}</td>
                                                </tr>
                                            )
                                        }
                                    </table>
                                </div>
                            </tbody>
                        </table>
                    </section>
                </article>

                {/* Buttons */}
                <nav className="flex flex-col md:h-1/4 h-1/6">
                    <div className="flex basis-1/2 justify-center">
                        <button onClick={() => router.push(`/chat?user=${data.id}`)} className="rounded-full bg-white w-36 border border-[#4aa7c0] text-blue-bondi font-bold inline-flex items-center justify-center hover:bg-blue-bondi hover:text-white">
                            <p className="mr-2">Chat</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex basis-1 border-t border-blue-bondi mt-5 mb-5"></div>
                    <div className="flex basis-1/2 justify-center">
                        <button disabled={selectedIndex === 0} onClick={() => handlePageChange(-1)} className={`rounded-full w-36 ml-4 ${selectedIndex === 0 ? 'bg-gray-300' : 'bg-blue-bondi text-white hover:bg-blue-bondi-dark'}`}>
                            <p>Anterior</p>
                        </button>
                        <button disabled={selectedIndex + 1 === smartResult.length} onClick={() => handlePageChange(1)} className={`rounded-full w-36 ml-4 ${selectedIndex + 1 === smartResult.length ? 'bg-gray-300' : 'bg-blue-bondi  text-white  hover:bg-blue-bondi-dark'}`}>
                            <p>Siguiente</p>
                        </button>
                    </div>
                </nav>
            </main>
        </div>
    );
}