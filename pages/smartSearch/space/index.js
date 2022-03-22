import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/router";

import enumTranslator from "../../../public/enumTranslator.json";
import jwt from "jsonwebtoken";

export async function getServerSideProps(ctx) {
    const types = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/items/types`);
    const dataTypes = types.data;
    const dimensions = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/items/dimensions`);
    const datadimensions = dimensions.data;

    const user = ctx.req.cookies.authToken ? jwt.decode(ctx.req.cookies.authToken) : null;

    let items;
    if (user) {
        let itemsdata = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${user.userId}/items`);
        items = itemsdata.data;
    }

    items = items || [];
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
        data.some(element => element.type === data1.type && element.dimensions === data1.dimensions) ? alert("Ya has introducido ese objeto") : setData([...data, data1]);
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
                })
            }

            navigator.geolocation.getCurrentPosition(async function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let result = await axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/smartSearch/spaces?latitude=${lat}&longitude=${lon}`, data, {
                    withCredentials: true
                })
                router.push({
                    pathname: `/smartSearch/spaces/results`,
                    query: {
                        data: result.data?.map(item => item.id)
                    },
                });
            }, function (error) {
                alert('Es necesario activar la geolocalización para poder acceder a esta funcion');
            });
        }
    }

    return (
        <div className="h-full md:bg-gray-100 flex justify-center items-center">
            <div className="md:bg-white mb-4 p-4 w-80vh md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] ">
                <div className="p-8 mb-5">
                    <h1 className=" text-2xl md:text-3xl flex justify-center items-center font-bold text-[#4aa7c0] ">¿Qué quieres guardar?</h1>
                </div>
                <div className="grid grid-cols-1 justify-items-center">
                    <div className="w-[95vw] md:w-full">
                        <table className="md:min-w-full w-[100%]">
                            <tbody>
                                {data.map((obj, index) => {
                                    return (<tr key={index} id={index + '-tr'} className="border-b odd:bg-[#d8ecf4] even:bg-white  odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                                        <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                            <button onClick={() => {
                                                let arr = [...data];
                                                arr.splice(index, 1);
                                                setData(arr);
                                            }}>
                                                <img src="/images/cross.svg" width="14px" ></img>
                                            </button>
                                        </td>
                                        <td className="py-4 text-xl font-medium text-gray-900 whitespace-nowrap">
                                            {enumTranslator.types[obj.type]}
                                        </td>
                                        <td className="py-4 text-xl font-medium text-gray-900 whitespace-nowrap">
                                            {enumTranslator.dimensions[obj.dimensions]}
                                        </td>
                                    </tr>)
                                })}

                                <tr className="border-b odd:bg-[#d8ecf4] even:bg-white odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                                    <td className="py-4 px-6 flex items-center justify-center">
                                        <button id="plus" onClick={a1}>
                                            <img src={buttonPlusPressedIMG} width="25px" className=" fill-[#4aa7c0] "></img>
                                        </button>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">

                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap ">

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    {buttonPlusPressed &&
                        <div className="grid grid-cols-1 justify-items-center">
                            <div id="form" className="md:max-w-[95%] rounded-xl border-2 mb-8 border-[#4aa7c0] ">
                                <form onSubmit={addObject}>
                                    <div className="flex flex-col md:flex-row items-center justify-center">
                                        <select id="type" className="form-select appearance-none border border-solid border-[#4aa7c0] rounded transition ease-in-out m-5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                            {dataTypes.map(obj => { return (<option key={obj} value={obj} >{enumTranslator.types[obj]}</option>) })}
                                        </select>

                                        <select id="dimensions" className="form-select appearance-none border border-solid border-[#4aa7c0] rounded transition ease-in-out m-5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                            {datadimensions.map(obj => { return (<option key={obj} value={obj} >{enumTranslator.dimensions[obj]}</option>) })}
                                        </select>

                                    </div>
                                    <div className="flex flex-row items-center justify-center">
                                        <button type="submit" className="text-white bg-[#4aa7c0]  focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>}
                    <div className="flex flex-row justify-center items-center">
                        <button onClick={() => handleStart()} disabled={data.length === 0} className={`${data.length === 0 ? 'bg-gray-300 text-gray-400' : 'bg-blue-bondi hover:bg-blue-bondi-dark'} text-white font-bold py-2 px-4 rounded`}>
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Space