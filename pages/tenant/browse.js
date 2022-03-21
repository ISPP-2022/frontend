import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { useState, useRef, useEffect } from "react";
import { height } from "@mui/system";

 export async function getServerSideProps(ctx){
    
    const cookies = ctx.req.cookies;
    const user = jwt.decode(cookies.authToken);
    const userId = user.userId;
    const spaces =  await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${userId}/spaces`);
    return{
        props:{
            spaces: spaces.data
        }
    }
 }

 function Space({spaces}) {

    const [data, setData] = useState();
    const [eventData, setEvent] = useState();
 
 function selectSpace(event){
     if(typeof data == 'undefined'){
        event.target.parentElement.children[1].style.backgroundColor = "#4aa7c0";
        setData(event.target.parentElement.id);
        setEvent(event);
    }else{
        eventData.target.parentElement.children[1].style.backgroundColor = "";
        event.target.parentElement.children[1].style.backgroundColor = "#4aa7c0";
        setData(event.target.parentElement.id);
        setEvent(event);
    }
 }

 
  return (
    <div className="max-h-full md:bg-gray-100 flex justify-center items-center">
        <div className="md:bg-white mb-4 p-4 w-80vh md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] ">
            <div className="p-8 md:mb-5 ">
                <h1 className=" text-2xl md:text-3xl flex justify-center items-center font-bold text-[#4aa7c0] ">Elige tu espacio</h1>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4 justify-items-center ">
            {spaces.map((obj, index) => {return (
                <button onClick={selectSpace}>
                    <div id={index} className="rounded-xl border-2 border-[#4aa7c0]">
                        <img className="h-[30vh]" src="/TrasteroStatic.webp"></img>
                        <h1 className=" text-center">{obj.name}</h1>
                    </div>
                </button>
            )})}
            </div>
            <div className="flex flex-row justify-center items-center mt-5">
                <Link href={{
            pathname: '/space/[data]',
            query: { data: data },
          }}>
                    <button className="bg-[#4aa7c0] hover:bg-[#4aa7c0] text-white font-bold py-2 px-4 rounded">
                    Start
                    </button>
                </Link> 
            </div>
        </div>
        
        
    </div>
  )
}

export default Space