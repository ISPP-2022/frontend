import { useState } from "react";
import Link from 'next/link'

export const NavbarAdmin = () => {
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
        var layout = "border-b-2 bg-blue-bondi/[0.7] hover:bg-blue-bondi/[0.6] text-left flex justify-between pl-6 items-center w-full py-5 space-x-14"
        var responsiveLayout = "focus:bg-blue-bondi/[0.6] text-left flex justify-between pl-6 items-center w-[100vw] py-5 space-x-14"
        return (
            <div className="md:flex">
                <div className="md:hidden my-1">
                    <button onClick={() => {setButtonPressed(!buttonPressed)}} className="static flex-row flex bg-blue-bondi/[0.6]">
                        <svg className="w-[100vw] h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                            </path>
                        </svg>
                    </button>

                    {buttonPressed && <div className="bg-blue-bondi/[0.6] flex flex-row">
                        <div className="divide-y  flex flex-col justify-start items-center w-[100vw] ">
                            <Link href="/admin/users">
                                <button className={responsiveLayout} >
                                    <p className="text-sm leading-5 uppercase text-white">Users</p>                    
                                </button>
                            </Link>
                            <Link href="/admin/spaces">
                            <button className={responsiveLayout}>
                                    <p className="text-sm leading-5 uppercase text-white">Spaces</p>                    
                            </button>
                            </Link>
                            <Link href="/admin/rentals">
                            <button className={responsiveLayout}>
                                    <p className="text-sm leading-5 uppercase text-white ">Rentals</p>                    
                            </button>
                            </Link>
                            <Link href="/admin/spaceTags">
                            <button className={responsiveLayout}>
                                    <p className="text-sm leading-5 uppercase text-white">SpaceTags</p>                    
                            </button>
                            </Link>
                            <Link href="/admin/smartSearch">
                            <button className={responsiveLayout}>
                                    <p className="text-sm leading-5 uppercase text-white ">SmartSearch</p>                    
                            </button>
                            </Link>
                            
                            <button onClick={() => {setButtonPlusPressed(!buttonPlusPressed)}} className={responsiveLayout}>
                                <p className="text-sm leading-5 text-white uppercase">Items</p>                
                            </button>
                         
                            {buttonPlusPressed &&
                            <div className="flex justify-start flex-col items-start w-[100vw]">
                                <Link href="/admin/types">
                                <button className={responsiveLayout.replace("pl-6", "pl-12").replace("py-5", "py-3")}>
                                    <p className="text-sm leading-5 text-white">Types</p>                        
                                </button>
                                </Link>
                                <Link href="/admin/dimension">
                                <button className={responsiveLayout.replace("pl-6", "pl-12").replace("py-5", "py-3")}>
                                    <p className="text-sm leading-5 text-white ">Dimension</p>                        
                                </button>
                                </Link>
                            </div>}
                        </div>
                    </div>}
                </div>
                <div id="Main"  className="divide-y justify-start items-start h-[100vh]  hidden min-w-[150px] md:flex  w-[15vw] flex-col">
                
                    <div className="flex flex-col justify-start items-center  w-full ">
                        <Link href="/admin/users">
                            <button className={layout}>
                                <p className="text-sm leading-5 uppercase ">Users</p>                    
                            </button>
                        </Link>
                        <Link href="/admin/spaces">
                        <button className={layout}>
                                <p className="text-sm leading-5 uppercase ">Spaces</p>                    
                        </button>
                        </Link>
                        <Link href="/admin/rentals">
                        <button className={layout}>
                                <p className="text-sm leading-5 uppercase ">Rentals</p>                    
                        </button>
                        </Link>
                        <Link href="/admin/spaceTags">
                        <button className={layout}>
                                <p className="text-sm leading-5 uppercase ">SpaceTags</p>                    
                        </button>
                        </Link>
                        <Link href="/admin/smartSearch">
                        <button className={layout}>
                                <p className="text-sm leading-5 uppercase ">SmartSearch</p>                    
                        </button>
                        </Link>
                        
                        <button onClick={() => {setButtonPlusPressed(!buttonPlusPressed)}} className={layout}>
                            <p className="text-sm leading-5  uppercase">Items</p>                
                        </button>
                        
                        {buttonPlusPressed &&
                        <div className="flex justify-start flex-col w-full md:w-full items-start">
                            
                            <Link href="/admin/types">
                            <button className={layout.replace("pl-6", "pl-12").replace("py-5", "py-3")}>
                                <p className="text-sm leading-5 ">Types</p>                        
                            </button>
                            </Link>
                            <Link href="/admin/dimension">
                            <button className={layout.replace("pl-6", "pl-12").replace("py-5", "py-3")}>
                                <p className="text-sm leading-5 ">Dimension</p>                        
                            </button>
                            </Link>
                        </div>}
                    </div>
                </div>
            </div>
        )
      }