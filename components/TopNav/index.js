import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link"
import AuthModal from "../AuthModal";
import axios from "axios";
import { useRouter } from "next/router";

function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    setIsLogged(user);
  }, []);

  const handleLogout = () => {
    axios.post(`${process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4000'}/api/v1/logout`, {}, { withCredentials: true })
      .then(res => {
        setIsLogged(undefined)
        setIsOpen(false);
        if (router.route === '/') router.reload()
        router.push("/");
      })
  }

  const handlePublish = () => {
    isLogged.role === 'USER' ? alert('Tienes que verificarte') : router.push("/publish/add");
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 3)
      router.push(`/search?search=${search.trim()}`);
    else {
      router.push(`/search`);
    }
  };

  const handleSmart = () => {
    router.push("/smartSearch")
    setIsOpen(false);
  }

  return (

    <header className="bg-gray-100 fixed top-0 inset-x-0 h-16 z-50 w-screen">
      <section className="shadow-lg mx-auto px-4">
        <nav className="flex justify-between">
          {/* Logos */}
          <Link href="/" passHref>
            <a className="h-16 w-16 cursor-pointer mr-4 shrink-0 relative md:hidden">
              <div className="relative h-full w-full">
                <Image priority src="/logo.png" alt="StackingUp Logo" layout="fill" />
              </div>
            </a>
          </Link>
          <Link href="/" passHref>
            <a className="h-16 w-[181px] cursor-pointer relative md:block hidden">
              <div className="relative h-full w-full">
                <Image priority src="/logolargo.png" alt="StackingUp Logo" layout="fill" />
              </div>
            </a>
          </Link>
          {/* Barra de busqueda */}
          <form className="w-full max-w-lg py-2 px-4 items-center block md:hidden" onSubmit={handleSubmit}>
            <input className="bg-transparent focus:outline-none 
            focus:shadow-outline border border-gray-300 focus:border-[#4aa7c0] rounded-lg 
              appearance-none leading-normal w-full max-w-lg
            transition duration-200 ease-in-out "
              type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
          </form>
          {/* Botones vista navegador */}

          {
            isLogged ? (

              <div className="mr-5 align-middle md:flex hidden space-x-2">
                <button className="text-white bg-[#4aa7c0] px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" enableBackground="new 0 0 612 612" viewBox="0 0 612 612"><path d="M273.053,273.046c75.399,0,136.524-61.124,136.524-136.523S348.454,0,273.053,0c-75.4,0-136.522,61.124-136.522,136.523   S197.654,273.046,273.053,273.046z M338.347,191.161c-6.209,20.535-32.814,35.971-64.698,35.971   c-31.885,0-58.489-15.437-64.699-35.971H338.347z M566.878,582.625l-52.115-52.102c16.502-18.348,26.629-42.539,26.629-69.158   c0-57.199-46.369-103.568-103.57-103.568c-57.199,0-103.568,46.369-103.568,103.568c0,57.201,46.369,103.57,103.568,103.57   c16.871,0,32.748-4.119,46.824-11.275l55.605,55.594c3.662,3.662,9.654,3.66,13.314,0l13.312-13.312   C570.54,592.279,570.54,586.287,566.878,582.625z M437.823,527.273c-36.4,0-65.908-29.508-65.908-65.908   c0-36.398,29.508-65.906,65.908-65.906c36.398,0,65.908,29.508,65.908,65.906C503.731,497.766,474.222,527.273,437.823,527.273z    M310.716,461.363c0,16.277,3.188,31.795,8.787,46.113c-14.46,0.613-29.923,0.955-46.45,0.955   c-131.637,0-196.056-21.51-219.673-32.02c-6.094-2.711-11.004-10.463-11.004-17.133v-45.002   c0-67.436,51.344-123.381,116.86-130.874c1.991-0.228,4.943,0.624,6.565,1.799c30.208,21.87,67.191,34.92,107.25,34.92   c40.06,0,77.042-13.051,107.251-34.92c1.621-1.175,4.574-2.027,6.564-1.799c39.754,4.547,74.201,26.995,95.215,58.962   c-13.807-5.154-28.68-8.109-44.262-8.109C367.735,334.256,310.716,391.271,310.716,461.363z" fill="#ffffff" className="color000 svgShape" /></svg>
                  <Link href={`/user/${isLogged.userId}`} passHref>
                    <a>Mi perfil</a>
                  </Link>
                </button>
                <button onClick={handleLogout} className="text-white bg-[#4aa7c0] px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <p>Desconectar</p>
                </button>
                <button onClick={handlePublish} className="text-white bg-[#4aa7c0] px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Publicar</p>
                </button>
              </div>) : (
              <div className="mr-5 align-middle md:flex hidden">
                <button onClick={() => setShowModal(true)} className="text-white bg-[#4aa7c0] px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <p>Conectar</p>
                </button>
              </div>
            )
          }

          {/* Menu movil */}
          <div className="md:hidden flex items-center ml-4">
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
              {isOpen ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg> :
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            </button>
          </div>
        </nav>
      </section>
      {/* Modal menu movil */}
      <menu className={`mobile-menu transition ${isOpen ? '' : 'translate-x-full'}  absolute inset-0 md:hidden flex`} >
        <div onClick={() => setIsOpen(!isOpen)} className="backdrop basis-1/3 bg-black opacity-25 h-screen ">

        </div>
        <div className={`backdrop bg-gray-100 basis-2/3 h-screen border-t-2 grid-rows-9 grid`}>
          <header className=" text-center w-full py-1 my-auto">
            <Image className="shrink-0" src="/logolargo.png" alt="StackingUp Logo" width={180} height={65} layout="intrinsic" />
          </header>
          <nav className="row-span-4 text-center space-y-5">
            <div className="mx-6 border-t-2" />
            {/* Botones movil */}
            {
              isLogged ? (<>
                <button onClick={handleLogout} className="text-white bg-[#4aa7c0] w-4/5 px-5 py-2 text-2xl align-middle space-x-4 my-2 rounded hover:bg-[#34778a] font-semibold transition-colors duration-100">
                  <p>Desconectar</p>
                </button>
                <button onClick={handlePublish} className="text-white bg-[#4aa7c0] w-4/5 px-5 py-2 text-2xl align-middle space-x-4 my-2 rounded hover:bg-[#34778a] font-semibold transition-colors duration-100">
                  <p>Publicar</p>
                </button>
                <button className="text-white bg-[#4aa7c0] w-4/5 px-5 py-2 text-2xl align-middle space-x-4 my-2 rounded hover:bg-[#34778a] font-semibold transition-colors duration-100">
                  <Link href={`/user/${isLogged.userId}`} passHref>
                    <a>Mi perfil</a>
                  </Link>
                </button>
              </>
              ) : (
                <button onClick={() => setShowModal(true)} className="text-white bg-[#4aa7c0] w-4/5 px-5 py-2 text-2xl align-middle space-x-4 my-2 rounded hover:bg-[#34778a] font-semibold transition-colors duration-100">
                  <p>Conectar</p>
                </button>
              )
            }
            <button onClick={handleSmart} className="text-white bg-[#4aa7c0] w-4/5 px-5 py-2 text-2xl  space-x-4 my-2 rounded hover:bg-[#34778a] font-semibold transition-colors duration-100">
              Smart Search
              <svg className="hidden xs:block float-right mt-1 ml-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </button>
          </nav>
          <section className="row-span-4 space-y-0.5">
            <div className="mx-6 border-t-2" />
            <div className="h-2/6 text-center">
              <p>¿Tienes un problema?</p>
              <button className="text-white bg-[#4aa7c0] px-5 py-3 text-2xl my-2 rounded hover:bg-[#34778a] transition-colors duration-100">Contactanos</button>
            </div>
            <div className="mx-6 border-t-2" />
            <article className="mx-3 h-3/6 space-y-2">
              <p className="text-[#4aa7c0] underline">Preguntas frecuentes</p>
              <p className="text-[#4aa7c0] underline">Términos y condiciones</p>
              <p className="text-[#4aa7c0] underline">Política de privacidad</p>
              <p className="text-[#4aa7c0] underline">Sobre nosotros</p>
              <p className="text-[#4aa7c0] underline">Sitemap</p>
            </article>
            <div className="flex justify-end text-[#4aa7c0] space-x-3 mx-3">
              <a href="https://twitter.com/StackingUp_">
                <svg className="fill-[#4aa7c0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
              <a href="https://instagram.com/stackingup__">
                <svg className="fill-[#4aa7c0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <svg className="fill-[#4aa7c0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
            </div>
          </section>
        </div>
      </menu>
      {showModal && (
        <AuthModal setIsLogged={setIsLogged} handleClose={() => setShowModal(false)} />
      )}
    </header >
  );
}

export default Navbar;