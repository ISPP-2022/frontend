import { useState } from "react";

export default function NavbarAdmin() {
        const [buttonPlusPressed, setButtonPlusPressed] = useState(false);
        const [buttonPressed, setButtonPressed] = useState(false);

        function a1() {
            if (buttonPlusPressed == true) {
                setButtonPlusPressed(false);
            } else {
                setButtonPlusPressed(true);
            }
        }
        function a2() {
            if (buttonPressed == true) {
                setButtonPressed(false);
            } else {
                setButtonPressed(true);
            }
        }

        return (
            <div>
                <div className="md:hidden flex flex-col">
                    <button onClick={a2} className="static flex-row flex bg-[#4aa7c0]">
                        <svg className="w-[100vw] h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                            </path>
                        </svg>
                    </button>

                    {buttonPressed && <div className=" bg-[#4aa7c0] flex flex-row">
                        <div className="flex flex-col justify-start items-center w-[100vw] ">
                            <button className=" border-b-2 border-t-2 border-[#62c1db] focus:bg-[#62c1db] hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center w-[100vw] py-5 ">
                                <p className="text-sm leading-5 uppercase text-white">Users</p>                    
                            </button>
                            <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center w-[100vw] py-5 space-x-14  ">
                                    <p className="text-sm leading-5 uppercase text-white">Spaces</p>                    
                            </button>
                            <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center w-[100vw] py-5 space-x-14  ">
                                    <p className="text-sm leading-5 uppercase text-white ">Rentals</p>                    
                            </button>
                            <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center w-[100vw] py-5 space-x-14  ">
                                    <p className="text-sm leading-5 uppercase text-white">SpaceTags</p>                    
                            </button>
                            <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center w-[100vw] py-5 space-x-14  ">
                                    <p className="text-sm leading-5 uppercase text-white ">SmartSearch</p>                    
                            </button>
                            <button onClick={a1} className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center   w-[100vw] py-5 ">
                                <p className="text-sm leading-5 text-white uppercase">Items</p>                
                            </button>
                            {buttonPlusPressed &&
                            <div className="flex justify-start flex-col items-start w-[100vw]">
                                <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-12 items-center w-[100vw] py-3 space-x-14">
                                    <p className="text-sm leading-5 text-white">Types</p>                        
                                </button>
                                <button className=" border-b-2  border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-12 items-center w-[100vw] py-3 space-x-14">
                                    <p className="text-sm leading-5 text-white ">Dimension</p>                        
                                </button>
                            </div>}
                        </div>
                    </div>}
                </div>
                <div id="Main"  className=" fixed justify-start items-start h-[100vh]  hidden min-w-[150px] md:flex  w-[15vw] bg-[#4aa7c0] flex-col">
                
                    <div className="flex flex-col justify-start items-center  w-full ">
                        <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center  w-full py-5 ">
                            <p className="text-sm leading-5 uppercase ">Users</p>                    
                        </button>
                        <hr color="#FF0000"></hr>
                        <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center   w-full py-5 space-x-14  ">
                                <p className="text-sm leading-5 uppercase ">Spaces</p>                    
                        </button>
                        <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center   w-full py-5 space-x-14  ">
                                <p className="text-sm leading-5 uppercase ">Rentals</p>                    
                        </button>
                        <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center   w-full py-5 space-x-14  ">
                                <p className="text-sm leading-5 uppercase ">SpaceTags</p>                    
                        </button>
                        <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center   w-full py-5 space-x-14  ">
                                <p className="text-sm leading-5 uppercase ">SmartSearch</p>                    
                        </button>
                        <button onClick={a1} className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-6 items-center   w-full py-5 space-x-14  ">
                            <p className="text-sm leading-5  uppercase">Items</p>                
                        </button>
                        {buttonPlusPressed &&
                        <div className="flex justify-start flex-col w-full md:w-full items-start">
                            <button className=" border-b-2 border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-12 items-center w-full py-3 space-x-14">
                                <p className="text-sm leading-5 ">Types</p>                        
                            </button>
                            <button className=" border-b-2  border-[#62c1db] focus:bg-[#62c1db]  hover:bg-[#62c1db] text-left   flex justify-between pl-12 items-center w-full py-3 space-x-14">
                                <p className="text-sm leading-5 ">Dimension</p>                        
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        )
      }