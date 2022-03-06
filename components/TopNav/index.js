import Image from "next/image"
import { useState } from "react";
import Link from "next/link"

const imgLoader = ({ src, width, quality }) => {
  return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-100 fixed top-0 inset-x-0 h-16">
      <div className="shadow-md mx-auto px-4">
        <div className="flex justify-between">
          <Link href="/">
            <div className="h-16 w-16 cursor-pointer mr-4 shrink-0 relative md:hidden">
              <Image loader={imgLoader} src="/logo.png" alt="StackingUp Logo" layout="fill" />
            </div>
          </Link>
          <Link href="/">
            <div className="h-16 w-[181px] cursor-pointer relative md:block hidden">
              <Image loader={imgLoader} src="/logolargo.png" alt="StackingUp Logo" layout="fill" />
            </div>
          </Link>

          <input className="bg-transparent focus:outline-none 
            focus:shadow-outline border border-gray-300 focus:border-[#4aa7c0] rounded-lg 
            py-2 px-4 block appearance-none leading-normal my-2 w-full max-w-md
            transition duration-200 ease-in-out md:hidden"
            type="text" placeholder="Search" />

          <div className="hidden md:flex items-center space-x-1">

          </div>

          <div className="md:hidden flex items-center ml-4">
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
              {isOpen ?
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg> :
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }

            </button>
          </div>

        </div>
      </div>

      <div className={`mobile-menu transition ${isOpen ? '' : 'translate-x-full'} h-screen md:hidden flex`} >
        <div onClick={() => setIsOpen(!isOpen)} className="backdrop basis-1/3 bg-black opacity-25 h-screen ">

        </div>
        <div className={`backdrop bg-gray-100 basis-2/3 h-screen border-t-2`}>

        </div>
      </div>
    </nav >

  );
}

export default Navbar;