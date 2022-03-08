import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>StackingUp</title>
      </Head>
      <main>
        <div className="crossfade">
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
      </div>
      </main>
    </div>
  )
}
