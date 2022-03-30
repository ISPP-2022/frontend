import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/router";

import enumTranslator from "../../../public/enumTranslator.json";
import jwt from "jsonwebtoken";

export async function getServerSideProps(ctx) {
    const types = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/items/types`)
        .then(res => res).catch(() => { return { data: Object.keys(enumTranslator.types) } });
    const dataTypes = types.data;
    const dimensions = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/items/dimensions`)
        .then(res => res).catch(() => { return { data: Object.keys(enumTranslator.dimensions) } });
    const datadimensions = dimensions.data;

    const user = ctx.req.cookies.authToken ? jwt.decode(ctx.req.cookies.authToken) : null;

    let items = [];
    if (user) {
        let itemsdata = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${user.userId}/items`).then(res => res.data).catch(() => { return [] });
        items = itemsdata;
    }
    if (user?.userId) {
        if (parseInt(ctx.query?.userId) === user.userId) {
            return {
                props: {
                    datadimensions,
                    dataTypes,
                    user,
                    items
                }
            }
        }

        return {
            redirect: {
                destination: '/smartSearch/space?userId=' + user.userId,
                permanent: false,
            }
        }
    }
    return {
        props: {
            datadimensions,
            dataTypes,
            user,
            items
        }
    }
}

function Space({ datadimensions, dataTypes, user, items }) {
    const router = useRouter();

    const [data, setData] = useState(items);

    const addObject = event => {
        event.preventDefault();
        var data1 = {};
        data1.type = event.target.type.value;
        data1.dimensions = event.target.dimensions.value;
        data1.amount = parseInt(event.target.amount.value);
        data.some(element => element.type === data1.type && element.dimensions === data1.dimensions)
            ? alert("Ya has introducido ese objeto") :
            setData([...data, data1]);
    }

    const [buttonPlusPressed, setButtonPlusPressed] = useState(false)

    const [buttonPlusPressedIMG, setButtonPlusPressedIMG] = useState("/images/plus1.svg")

    function a1() {
        if (buttonPlusPressed == true) {
            setButtonPlusPressedIMG("/images/plus1.svg");
            setButtonPlusPressed(false);
        } else {
            setButtonPlusPressedIMG("/images/subtraction.svg");
            setButtonPlusPressed(true);
        }
    }

    const handleStart = () => {
        if (data.length > 0) {
            if (user) {
                axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/items`, data, {
                    withCredentials: true
                }).catch(() => {
                });
            }

            navigator.geolocation.getCurrentPosition(async function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let result = await axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/smartSearch/spaces?latitude=${lat}&longitude=${lon}`, data, {
                    withCredentials: true
                }).then(res => res.data).catch(() => { return [] });
                sessionStorage.setItem("smartSearch", JSON.stringify(result));
                router.push({
                    pathname: `/smartSearch/space/results`,
                });
            }, function (error) {
                alert('Es necesario activar la geolocalización para poder acceder a esta funcion');
            });
        }
    }

    return (
        <div className="h-screenC md:bg-gray-100 flex justify-center items-center">
            <Head>
                <title>Buscador de espacios</title>
            </Head>
            <main className="md:bg-white mb-4 p-4 w-80vh md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] ">
                <header className="p-8 mb-5">
                    <h1 className=" text-2xl md:text-3xl flex justify-center items-center text-center font-bold text-[#4aa7c0] ">¿Qué quieres guardar?</h1>
                </header>
                <div className="grid grid-cols-1 justify-items-center">
                    <div className="w-[95vw] md:w-full relative">
                        <menu className="has-tooltip absolute -top-4 -left-4 ">
                            <div className="tooltip rounded shadow-lg p-4 border-[#4aa7c0] border bg-white w-[300px] top-5 left-5">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Dimension</th>
                                            <th className="text-center">Tamaño aprox.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-t border-blue-bondi">
                                        <tr>
                                            <th className="text-base font-normal">Muy grande</th>
                                            <th className="text-base font-normal">&gt;2 &#13217;</th>
                                        </tr>
                                        <tr>
                                            <th className="text-base font-normal">Grande</th>
                                            <th className="text-base font-normal">1-2 &#13217;</th>
                                        </tr>
                                        <tr>
                                            <th className="text-base font-normal">Mediano</th>
                                            <th className="text-base font-normal">0,5-1 &#13217;</th>
                                        </tr>
                                        <tr>
                                            <th className="text-base font-normal">Pequeño</th>
                                            <th className="text-base font-normal">&lt;0,5 &#13217;</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-bondi" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </menu>
                        <section className="md:min-w-full w-[100%]">
                            <div className="items-center justify-between overflow-y-auto w-full" style={{ maxHeight: '30vh' }}>
                                {data.map((obj, index) => {
                                    return (
                                        <div key={index} id={index + '-tr'} className="h-16 flex border-b odd:bg-[#d8ecf4] even:bg-white  odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                                            <div className="py-1 xs:py-4 basis-1/12 xs:basis-1/5 px-1 xs:px-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                                <button onClick={() => {
                                                    let arr = [...data];
                                                    arr.splice(index, 1);
                                                    setData(arr);
                                                }}>
                                                    <img src="/images/cross.svg" width="14px" ></img>
                                                </button>
                                            </div>
                                            <div className="py-4 flex items-center basis-5/12 xs:basis-2/5 text-sm xs:text-xl font-medium text-gray-900 whitespace-nowrap justify-center">
                                                {enumTranslator.types[obj.type]}
                                            </div>
                                            <div className="py-4 flex items-center basis-4/12 xs:basis-1/5 text-sm xs:text-xl font-medium text-gray-900 whitespace-nowrap justify-center">
                                                {enumTranslator.dimensions[obj.dimensions]}
                                            </div>
                                            <div className="py-4 flex items-center basis-2/12 xs:basis-1/5 text-sm xs:text-xl font-medium text-gray-900 whitespace-nowrap justify-center">
                                                {obj.amount}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="border-b odd:bg-[#d8ecf4] even:bg-white odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                                <td className="py-4 px-6 flex items-center justify-center">
                                    <button id="plus" onClick={a1}>
                                        <img src={buttonPlusPressedIMG} width="25px" className=" fill-[#4aa7c0] "></img>
                                    </button>
                                </td>
                                {buttonPlusPressed &&
                                    <div className="grid grid-cols-1 justify-items-center">
                                        <div id="form" className="w-2/3 md:w-4/5 min-w-fit rounded-xl border mb-8 border-[#4aa7c0] ">
                                            <form onSubmit={addObject}>
                                                <div className="flex flex-col sm:flex-row items-center justify-center p-3 sm:space-y-0 space-y-2">
                                                    <select id="type" className="form-select appearance-none border border-solid border-[#4aa7c0] mx-2 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                                        {dataTypes.map(obj => { return (<option key={obj} value={obj} >{enumTranslator.types[obj] || obj}</option>) })}
                                                    </select>

                                                    <select id="dimensions" className="form-select appearance-none border border-solid border-[#4aa7c0] mx-2 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                                        {datadimensions.map(obj => { return (<option key={obj} value={obj} >{enumTranslator.dimensions[obj] || obj}</option>) })}
                                                    </select>
                                                    <input id="amount" step="1" className="mx-2 border border-solid border-[#4aa7c0] rounded" type={"number"} defaultValue={1} min={1} />
                                                </div>
                                                <div className="flex flex-row items-center justify-center">
                                                    <button type="submit" className="text-white bg-[#4aa7c0] focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Add</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>
                    </div>
                    <br></br>
                    <footer className="flex flex-row justify-center items-center">
                        <button onClick={() => handleStart()} disabled={data.length === 0} className={`${data.length === 0 ? 'bg-gray-300 text-gray-400' : 'bg-blue-bondi hover:bg-blue-bondi-dark'} text-white font-bold py-2 px-4 rounded`}>
                            Start
                        </button>
                    </footer>
                </div>
            </main>
        </div>
    )
}

export default Space