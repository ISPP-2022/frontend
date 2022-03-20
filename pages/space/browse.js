import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";

 export async function getServerSideProps(){
    const types =  await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/items/types`);
    const dataTypes = types.data;
    const dimensions =  await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/items/dimensions`);
    const dataDimensions = dimensions.data;

    return{
        props:{
            dataDimensions,
            dataTypes
        }
    }
 }

 function Space({dataDimensions, dataTypes}) {

    const [data, setData] = useState([]);
    
    console.log(dataDimensions);
    console.log(dataTypes);
    const addObject = event => {
        console.log(data);
        event.preventDefault();
        var data1 = {};
        data1.category = event.target.category.value;
        data1.size = event.target.size.value;
        setData([...data, data1]);
    }

    const [buttonPlusPressed, setButtonPlusPressed] =useState(false)

    const [buttonPlusPressedIMG, setButtonPlusPressedIMG] =useState("/images/plus1.svg")
    
    function a1(){
        if(buttonPlusPressed == true){
            setButtonPlusPressedIMG("/images/plus1.svg");
            setButtonPlusPressed(false);
        }else{
            setButtonPlusPressedIMG("/images/subtraction.svg");
            setButtonPlusPressed(true);
        }
            }

  return (
    <div className="max-h-full md:bg-gray-100 flex justify-center items-center">
        <div className="md:bg-white mb-4 p-4 w-80vh md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] ">
          <div className="p-8 mb-5">
            <h1 className="text-3xl flex justify-center items-center font-bold text-[#4aa7c0] ">¿Qué quieres guardar?</h1>
          </div>
          <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden shadow-md sm:rounded-lg ">
                        <table className="min-w-full">
                            <tbody>
                                {data.map((obj, index) => {return (<tr key={index} id={index + '-tr'} className="border-b odd:bg-[#d8ecf4] even:bg-white  odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                        <button onClick={() => {
                                            document.getElementById(index + "-tr").remove();
                                        }}>
                                            <img src="/images/cross.svg" width="14px" ></img>
                                        </button>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                        {obj.category}
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                        {obj.size}
                                    </td>
                                </tr>)})}
                                
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
                      { buttonPlusPressed && <div id="form" className="max-w-[95%] rounded-xl border-2 mb-8 border-[#4aa7c0] ml-5">
                            <form onSubmit={addObject}>
                                <div className="flex flex-row items-center justify-center">
                                    <select id="category" className="form-select appearance-none border border-solid border-[#4aa7c0] rounded transition ease-in-out m-10 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                        {dataTypes.map(obj => {return (<option value={obj} >{obj}</option>)})}
                                    </select>

                                    <select id="size" className="form-select appearance-none border border-solid border-[#4aa7c0] rounded transition ease-in-out m-10 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                        {dataDimensions.map(obj => {return (<option value={obj} >{obj}</option>)})}
                                    </select>

                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <button type="submit" className="text-white bg-[#4aa7c0]  focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Add</button>
                                </div>
                            </form>
                    </div>}
                    <div className="flex flex-row justify-center items-center">
                        <Link href={{ pathname:'/', query: {data: JSON.stringify(data)} }}>
                            <button className="bg-[#4aa7c0] hover:bg-[#4aa7c0] text-white font-bold py-2 px-4 rounded">
                            Start
                            </button>
                        </Link> 
                    </div>
                </div>
            </div>
        </div>
        
        </div>

        
    </div>
  )
}

export default Space