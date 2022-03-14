import Footer from "../components/Footer";
import Head from "next/head";
import { Form, FieldTextBox } from "../components/Core/Form";
import { Button } from "../components/Core/Button";
import { Card, CardMobile } from "../components/Card";

export default function Home() {
  return (
    <div>
      <Head>
        <title>StackingUp</title>
      </Head>
      <main className=" lg:h-screen">
        <div className="crossfade w-full h-full">
          <figure>
            {/* Seachbar */}
            <div className="w-full h-full">
              <div className=" float-left w-2/3 h-full">
                <div className="top-1/2 left-1/4 relative">
                  <div className="w-3/5 opacity-85">
                    <form>
                      <div className="w-4/5 float-left">

                        {/* Search bar */}
                        <label className="pl-2 font-medium">
                          <input type="text" name="Search" placeholder="Ciudad, barrio, zona..." className="bg-gray-200 opacity-90 appearance-none border-2 border-gray-200 rounded w-11/12 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" ></input>
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
              <div className="float-left w-1/3 h-full bg-gray-100 overflow-y-scroll">
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <Card title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
              </div>

            </div>
          </figure>
        </div>
        <div className="flex flex-col items-center justify-center lg:hidden w-full h-full overflow-auto bg-gray-100">
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                <CardMobile title="Habitación" surface="5" rating="4" price="220" unitPrice="€/h" tags={["enchufe", "agua", "wifi", "iluminacion", "cerrado"]} URLimage={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
