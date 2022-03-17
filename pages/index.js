import Footer from "../components/Footer";
import Head from "next/head";
import { Card, CardMobile } from "../components/Card";
import { Title } from "../components/Core/Text";

import { useRouter } from "next/router";
import { useState } from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <Head>
        <title>StackingUp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <main className="h-screen w-screen">
        {/* Seachbar */}
        <div className="w-full h-full hidden md:grid md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1">
          <div className="imageBackground md:row-span-2 lg:col-span-2 h-full">
            <div className="top-1/2 left-1/4 relative">
              <div className="w-3/5 opacity-85">
                <form onSubmit={handleSubmit}>
                  <div className="w-4/5 float-left">
                    {/* Search bar */}
                    <label className="pl-2 font-medium">
                      <input type="text" name="Search" value={search} onChange={handleChange} placeholder="Ciudad, barrio, zona..." className="bg-gray-200 opacity-90 appearance-none border-2 border-gray-200 rounded w-11/12 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" ></input>
                    </label>
                  </div>
                  <div className="w-1/5 float-left">
                    {/* Search button */}
                    <button className="bg-blue-bondi hover:bg-blue-bondi-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="h-full bg-gray-100 overflow-y-scroll flex md:flex-row lg:flex-col md:overflow-y-hidden lg:overflow-y-scroll">
            {arr.map((item) => (
              <div key={item} className="shrink-0 md:basis-1/2 lg:basis-1/4">
                <Card title="Habitación" surface="5" rating={4} price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} />
              </div>
            ))}
          </div>
        </div>
        <div className="block md:hidden">
          <div className="p-3 text-blue-bondi-dark">
            <Title>Cerca de ti</Title>
          </div>
          {arr.map((item) => (
            <div key={item} className="shrink-0 basis-1/4 p-4 px-8 flex justify-center">
              <CardMobile title="Habitación" surface="5" rating={4} price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
