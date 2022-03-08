import Footer from "../components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>StackingUp</title>
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline ">
          Hello Home!
        </h1>
        <Footer />
      </main>
    </div>
  )
}
