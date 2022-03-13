import Footer from "../components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>StackingUp</title>
      </Head>
      <main className=" h-screen">
        <div className="crossfade w-full h-full">
          <figure></figure>
        </div>
      </main>
      <Footer />
    </div>
  )
}
