import Footer from "../components/Footer";
import Head from "next/head";
import { Card, CardMobile } from "../components/Card";
import { Paragraph, Title, Subtitle } from "../components/Core/Text";

import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { withRouter } from "next/router";

function Home(props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);


  useEffect(() => {
    if (props.router.query.alertMessage) {
      alert(props.router.query.alertMessage);
    }
  }, [])

  const [selector, setSelector] = useState("recent");

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces${selector == 'recent' ? '?orderBy=publishDate-desc&limit=6' : ''}`)
      .then(async (response) => {
        for (let i = 0; i < response.data.length; i++) {
          const ratings = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${response.data[i].ownerId}/ratings?filter=received`)
            .then(rat => rat.data).catch(() => { return [] });
          response.data[i].rating = ratings.reduce((acc, cur) => acc + cur.rating / ratings.length, 0);
        }
        setData(response.data)
      })
      .catch(error => {
        setData([])
      });
  }, [selector]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim().length > 3)
      router.push(`/search?search=${search.trim()}`);
    else {
      router.push(`/search`);
    }
  };

  const handleSmart = () => {
    router.push("/smartSearch");
  };

  return (
    <div className="h-screenC">
      <Head>
        <title>StackingUp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <main className="h-full">
        <div className="w-full h-full hidden md:grid md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1">
          <section className="imageBackground md:row-span-2 lg:col-span-2 h-full">
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
                      <input type="text" name="Search" value={search} onChange={(e) => { setSearch(e.target.value); }} placeholder="Ciudad, barrio, zona..." className="bg-gray-200 opacity-90 appearance-none border-2 border-gray-200 rounded w-11/12 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" ></input>
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
                </form>""
              </div>
            </div>
          </section>
          <section className="h-full bg-gray-100 overflow-y-scroll flex md:flex-row lg:flex-col md:overflow-y-hidden lg:overflow-y-scroll">

            <div className="grid md:grid-cols-1 lg:grid-cols-2 object-cover min-w-[200px] items-center relative top-2">
              <div className="flex justify-center transition duration-150 text-blue-bondi text-center">
                {
                  selector === "recent" ?
                    <Title>Recientes</Title>
                    : selector === "nearyou" ?
                      <Title>Cerca de ti</Title>
                      : selector === "rating" ?
                        <Title>Destacados</Title>
                        : null
                }
              </div>
              <form>
                <menu className="flex justify-center">
                  <fieldset className='p-4 w-full max-w-[250px]'>
                    <ul className='grid grid-cols-3 font-semibold text-webcolor-50'>
                      <li className='border rounded-l border-webcolor-50'>
                        <input className='hidden peer' type="radio" id="RECENT" name="selector" value="recent" checked={selector === "recent"} onChange={() => setSelector("recent")} />
                        <label htmlFor="RECENT" className='flex justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </label>
                      </li>
                      <li className='border-y border-webcolor-50 text-center'>
                        <input className='hidden peer' type="radio" id="RATING" name="type" value="rating" checked={selector === "rating"} onChange={() => setSelector("rating")} />
                        <label htmlFor="RATING" className='flex justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </label>
                      </li>
                      <li className='border rounded-r border-webcolor-50 text-center'>
                        <input className='hidden peer' type="radio" id="NEARYOU" name="selector" value="nearyou" checked={selector === "nearyou"} onChange={() => setSelector("nearyou")} />
                        <label htmlFor="NEARYOU" className='flex justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </label>
                      </li>
                    </ul>
                  </fieldset>
                </menu>
              </form>
            </div>
            <div className="md:hidden lg:block relative flex py-2 items-center">
              <div className="flex-grow border-t-[2px] border-gray-400"></div>
            </div>

            {data && data.length > 0 ?
              data.map((item, index) => (
                <article key={index} className="shrink-0 md:basis-1/2 lg:basis-1/4">
                  <Link href={`/space/${item.id}`} passHref className="w-full h-full">
                    <a className="w-full h-full">
                      <Card
                        space={item}
                      />
                    </a>
                  </Link>
                </article>
              )) : <h1 className="h-full w-full min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>}
          </section>
        </div>
        {/* Mobile */}
        <div className="block md:hidden h-full">
          <div className="grid grid-cols-1 object-cover min-w-[200px] items-center relative top-2">
            <div className="flex justify-center transition duration-150 text-blue-bondi">
              {
                selector === "recent" ?
                  <Title>Recientes</Title>
                  : selector === "nearyou" ?
                    <Title>Cerca de ti</Title>
                    : selector === "rating" ?
                      <Title>Destacados</Title>
                      : null
              }
            </div>
            <form>
              <menu className="flex justify-center">
                <fieldset className='p-4 w-full max-w-[300px]'>
                  <ul className='grid grid-cols-3 font-semibold text-webcolor-50'>
                    <li className='border rounded-l border-webcolor-50'>
                      <input className='hidden peer' type="radio" id="RECENT" name="selector" value="recent" checked={selector === "recent"} onChange={() => setSelector("recent")} />
                      <label htmlFor="RECENT" className='flex justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </label>
                    </li>
                    <li className='border-y border-webcolor-50 text-center'>
                      <input className='hidden peer' type="radio" id="RATING" name="type" value="rating" checked={selector === "rating"} onChange={() => setSelector("rating")} />
                      <label htmlFor="RATING" className='flex justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </label>
                    </li>
                    <li className='border rounded-r border-webcolor-50 text-center'>
                      <input className='hidden peer' type="radio" id="NEARYOU" name="selector" value="nearyou" checked={selector === "nearyou"} onChange={() => setSelector("nearyou")} />
                      <label htmlFor="NEARYOU" className='flex justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </label>
                    </li>
                  </ul>
                </fieldset>
              </menu>
            </form>
          </div>
          {data && data.length > 0 ?
            data.map((item, index) => (
              <div key={'mobile' + index} className="shrink-0 basis-1/4 p-4 px-8 flex justify-center">
                <Link href={`/space/${item.id}`} passHref className="w-full h-full">
                  <a className="w-full h-full flex justify-center">
                    <CardMobile
                      space={item}
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

export default withRouter(Home)