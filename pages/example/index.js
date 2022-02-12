import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";

import ExampleComponent from "../../components/Example";

function ExamplePage() {

  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const posts = await res.json()
    setData(posts)
  }, [])

  return (
    <div>
      <Head>
        <title>Example Page</title>
      </Head>
      <ExampleComponent classname='text-indigo-600 text-3xl font-bold'>Hello Example!</ExampleComponent>
      <Link href="/">
        <a> Home </a>
      </Link>
      <div className="grid gap-4 grid-cols-3 grid-rows-3">
        {data?.map(item => (
          <div className="p-4 bg-indigo-500 shadow-xl shadow-indigo-700/60 rounded-lg" key={item.id}>
            <p className="text-blue-100">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


export default ExamplePage