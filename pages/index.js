import Footer from "../components/Footer";
import Head from "next/head";
import { Card, CardMobile } from "../components/Card";
import { Paragraph, Title } from "../components/Core/Text";

import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.AUTH_API_URL || 'http://localhost:4100'}/api/v1/spaces`)
      .then(async (response) => {
        for (let i = 0; i < response.data.length; i++) {
          const ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${response.data[i].ownerId}/ratings?filter=received`)
            .then(rat => rat.data).catch(() => { return [] });
          response.data[i].rating = ratings.reduce((acc, cur) => acc + cur.rating / ratings.length, 0);
        }
        setData(response.data)
      })
      .catch(error => { });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 3)
      router.push(`/search?search=${search.trim()}`);
    else {
      router.push(`/search`);
    }
  };

  const calculateSurface = (dimensions) => {
    const [width, height] = dimensions.split('x');
    return parseInt(width) * parseInt(height);
  };


  const calculateUnitPrice = (priceHour, priceDay, priceMonth) => {
    if (priceHour) {
      return { amount: priceHour, unit: "€/h" };
    } else if (priceDay) {
      return { amount: priceDay, unit: "€/d" };
    } else if (priceMonth) {
      return { amount: priceMonth, unit: "€/m" };
    } else {
      return { amount: "-", unit: "" };
    }
  };

  const calculateTags = (inputTag) => {
    if (inputTag.length > 0 && inputTag.length < 3) {
      return inputTag;
    } else if (inputTag.length > 2) {
      return inputTag.slice(0, 2);
    } else {
      return ["empty"];
    }
  };
  const handleSmart = () => {
    router.push("/smartSearch");
  }

  return (
    <div className="h-full">
      <Head>
        <title>StackingUp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <main className="h-full">
        {/* Seachbar */}
        <div className="w-full h-full hidden md:grid md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1">
          <div className="imageBackground md:row-span-2 lg:col-span-2 h-full">
            {/* SmartSearch*/}
            <div className="flex justify-end m-3 top-1/5 left-1/5">
              <button
                onClick={handleSmart}
                className="rounded-full bg-white transition duration-150 ease-in-out border-2 border-blue-bondi hover:border-blue-bondi-dark hover:bg-blue-bondi-dark text-blue-bondi hover:text-white font-bold py-5 px-8 focus:outline-none focus:shadow-outline">
                Smart Search
                <svg className="float-right h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </button>
            </div>
            <div className="top-1/3 left-1/4 relative">
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
            {data && data.length > 0 ?
              data.map((item, index) => (
                <div key={index} className="shrink-0 md:basis-1/2 lg:basis-1/4">
                  <Link href={`/space/${item.id}`} passHref className="w-full h-full">
                    <a className="w-full h-full">
                      <Card
                        title={item.name}
                        surface={item.dimensions ? calculateSurface(item.dimensions) : undefined}
                        rating={item.rating ? item.rating : undefined}
                        price={calculateUnitPrice(item.priceHour, item.priceDay, item.priceMonth).amount}
                        unitPrice={calculateUnitPrice(item.priceHour, item.priceDay, item.priceMonth).unit}
                        tags={item.tags ? calculateTags(item.tags) : undefined}
                        images={item.images ? item.images : undefined}
                      />
                    </a>
                  </Link>
                </div>
              )) : <h1 className="h-full w-full min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>}
          </div>
        </div>
        <div className="block md:hidden h-full">
          <div className="p-3 text-blue-bondi-dark">
            <Title>Cerca de ti</Title>
          </div>
          {data && data.length > 0 ?
            data.map((item, index) => (
              <div key={'mobile' + index} className="shrink-0 basis-1/4 p-4 px-8 flex justify-center">
                <Link href={`/space/${item.id}`} passHref className="w-full h-full">
                  <a className="w-full h-full flex justify-center">
                    <CardMobile
                      title={item.name}
                      surface={item.dimensions ? calculateSurface(item.dimensions) : undefined}
                      rating={item.rating ? item.rating : undefined}
                      price={calculateUnitPrice(item.priceHour, item.priceDay, item.priceMonth).amount}
                      unitPrice={calculateUnitPrice(item.priceHour, item.priceDay, item.priceMonth).unit}
                      tags={item.tags ? calculateTags(item.tags) : undefined}
                      images={item.images ? item.images : undefined}
                    />
                  </a>
                </Link>
              </div>
            )) : <h1 className="h-full w-full min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>}
        </div>
      </main>
      <Footer />
    </div>
  )
}
