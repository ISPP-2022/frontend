import Head from "next/head";
import Link from "next/link";

export default function Selection() {
  return (
    <div className="max-h-full md:bg-gray-100 flex justify-center items-center">
        <div className="md:bg-white p-4 md:w-[95vh] md:h-[75vh] md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] ">
          <div className="md:block hidden p-8 mb-5">
            <h1 className="text-3xl flex justify-center items-center font-bold text-[#4aa7c0] ">¿Qué buscas?</h1>
          </div>
          <div className="grid grid-cols-1 md:flex md:justify-center md:flex-row md:space-x-9 ">
            <Link href='space/browse'>
              <button >
                <div className="grid grid-cols-1 gap-4 w-64 h-64  content-center rounded-xl border-2 border-[#4aa7c0] ">
                  <div className="flex justify-center">
                    <img src="/images/garage.svg" width="100" height="100" className="w-36"></img>
                  </div>
                  <div>
                    <h3 className="text-2xl justify-center items-center text-[#4aa7c0]">Buscar Espacios</h3>
                  </div>
                </div>
              </button>
            </Link>
            <div className="md:hidden">
              <br></br>
            </div>
            <Link href='tenant/browse'>
              <button>
                <div className="grid grid-cols-1 gap-4 w-64 h-64 content-center rounded-xl border-2 border-[#4aa7c0] ">
                  <div className="flex justify-center">
                    <img src="/images/searchPerson1.svg" width="100" height="100" className="w-36"></img>
                  </div>
                  <div>
                    <h3 className="text-2xl justify-center items-center text-[#4aa7c0]">Buscar Inquilinos</h3>
                  </div>
                </div>
              </button>
            </Link>
            
          </div>
            
         
            
          
        </div>

        
    </div>
  )
}