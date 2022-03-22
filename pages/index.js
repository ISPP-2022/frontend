import Footer from "../components/Footer";
import Head from "next/head";
import { Card, CardMobile } from "../components/Card";
import { Paragraph, Title } from "../components/Core/Text";

import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const url = `${process.env.AUTH_API_URL || 'http://localhost:4100'}`;
  const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: 'KO' });

  useEffect(async () => {
    await axios.get(url + `/api/v1/spaces`)
      .then(response => { setRespuestaAPI({ respuesta: 'OK', data: response.data }) })
      .catch(error => { setRespuestaAPI({ respuesta: 'KO', error: error.message }) });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  const calculateSurface = (dimensions) => {
    const [width, height] = dimensions.split('x');
    return parseInt(width) * parseInt(height);
  };

  const calculatePrice = (priceHour, priceDay, priceMonth) => {
    if (priceHour !== null) {
      return priceHour;
    } else if (priceDay !== null) {
      return priceDay;
    } else if (priceMonth !== null) {
      return priceMonth;
    } else {
      return "-";
    }
  };

  const calculateUnitPrice = (priceHour, priceDay, priceMonth) => {
    if (priceHour !== null) {
      return "€/h";
    } else if (priceDay !== null) {
      return "€/d";
    } else {
      return "€/m";
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
            {respuestaAPI.respuesta === "OK" ?
              respuestaAPI.data.map((item) => (
                <div key={item} className="shrink-0 md:basis-1/2 lg:basis-1/4">
                  <Card
                    title={item.name}
                    surface={item.dimensions ? calculateSurface(item.dimensions) : undefined}
                    rating={item.rating ? item.rating : undefined}
                    price={calculatePrice(item.priceHour, item.priceDay, item.priceMonth)}
                    unitPrice={calculateUnitPrice(item.priceHour, item.priceDay, item.priceMonth)}
                    tags={item.tags ? calculateTags(item.tags) : undefined} />
                </div>
              )) : <Paragraph>Ha ocurrido un error.</Paragraph>}
          </div>
        </div>
        <div className="block md:hidden">
          <div className="p-3 text-blue-bondi-dark">
            <Title>Cerca de ti</Title>
          </div>
          {respuestaAPI.respuesta === "OK" ?
            respuestaAPI.data.map((item, index) => (
              <div key={index} className="shrink-0 basis-1/4 p-4 px-8 flex justify-center">
                <CardMobile
                  title={item.name}
                  surface={item.dimensions ? calculateSurface(item.dimensions) : undefined}
                  rating={item.rating ? item.rating : undefined}
                  price={calculatePrice(item.priceHour, item.priceDay, item.priceMonth)}
                  unitPrice={calculateUnitPrice(item.priceHour, item.priceDay, item.priceMonth)}
                  tags={item.tags ? calculateTags(item.tags) : undefined} />
              </div>
            )) : <Paragraph>Ha ocurrido un error.</Paragraph>}
        </div>
      </main>
      <Footer />
    </div>
  )
}
