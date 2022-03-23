import { useState } from "react";
import Image from "next/image"
import axios from "axios";
import { useRouter } from "next/router";


export default function AuthModal({ childerns, ...props }) {
  const { handleClose, setIsLogged } = props;
  const router = useRouter();

  const [type, setType] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "", response: "" });

  const content = {
    "default": () => {
      return (
        <main className="flex flex-col justify-center items-center md:h-full space-y-[5vh] py-10">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-[#4aa7c0]">Bienvenido a StackingUp</h1>
            <p className="text-lg text-[#4aa7c0]">Regístrate o inicia sesión</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button className="bg-red-500 rounded text-white py-3 px-7 hover:bg-red-400">
              <span className="text-lg">Entrar con Google</span>
            </button>
          </div>
          <div className="flex w-full flex-col justify-center items-center space-y-4">
            <p className="text-[#4aa7c0]">O continua con tu email</p>
            <div className="flex w-full justify-center space-x-3">
              <p onClick={() => setType('login')} className="text-sm text-[#4aa7c0] underline cursor-pointer">Inicia Sesión</p>
              <div className="border-r-2" />
              <p onClick={() => setType('register')} className="text-sm text-[#4aa7c0] underline cursor-pointer">Regístrate</p>
            </div>
          </div>
          <footer className="flex justify-end items-center ">
            <p className="text-xs text-gray-300 w-full text-center">
              Registrándote aceptas nuestras <br /> <a className="underline" href="#">Condiciones de uso</a> y <a className="underline" href="#">Políticas de privacidad</a>
            </p>
          </footer>
        </main>
      )
    },
    "login": () => {
      return (
        <main className="flex flex-col justify-center md:h-full items-center space-y-[5vh] py-8">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-[#4aa7c0]">Bienvenido a StackingUp</h1>
            <p className="text-lg text-[#4aa7c0]">Escribe tus datos</p>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <form className=" w-2/3 md:w-full px-6 md:px-10 space-y-[2vh]">

              <input
                type="email"
                placeholder="Email"
                className={`bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500 ${errors.email || errors.response ? 'border-red-500 placeholder:text-red-500' : ''} `}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span
                className={`border-red-500 text-red-500`}>
                {errors.email}
              </span>
              <input
                type="password"
                placeholder="Contraseña"
                className={`bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500 ${errors.password || errors.response ? 'border-red-500 placeholder:text-red-500' : ''} `}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                er
              />
              <span
                className={`border-red-500 text-red-500`}>
                {errors.password || errors.response}
              </span>
              <div className="flex justify-center">
                <button onClick={logic.login} className="bg-[#4aa7c0] rounded text-white py-3 px-7 hover:bg-[#34778a]">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
          <div className="flex w-full flex-col justify-center items-center space-y-4">
            {/*  <div className="flex w-full justify-center space-x-3">
              <p className="text-sm text-[#4aa7c0] underline">Recuperar contraseña</p>
              <div className="border-r-2" />
              <p onClick={() => setType('register')} className="text-sm text-[#4aa7c0] underline cursor-pointer">Regístrate</p>
            </div> */}
          </div>
          <footer className="flex justify-end items-center ">
            <p className="text-xs text-gray-600 w-full text-center">
              Registrándote aceptas nuestras <br /> <a className="underline" href="#">Condiciones de uso</a> y <a className="underline" href="#">Políticas de privacidad</a>
            </p>
          </footer>
        </main>
      )
    },
    "register": () => {
      return (
        <main className="flex flex-col justify-center md:h-full items-center space-y-[2vh] py-8">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Bienvenido a StackingUp</h1>
            <p className="">Escribe tus datos</p>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <form className=" w-2/3 md:w-full px-6 md:px-10 space-y-[2vh]">
              <input
                type="text"
                placeholder="Nombre"
                className="bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center items-center w-full space-x-3">
                <input type="checkbox" value={check} onChange={(e) => setCheck(e.target.value)} /> <span className="text-sm">Acepto los términos y condiciones</span>
              </div>
              <div className="flex justify-center">
                <button className="bg-[#4aa7c0] rounded text-white py-2 px-7 hover:bg-[#34778a]">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
          <div className="flex w-full flex-col justify-center items-center space-y-4">
            <div className="flex w-full justify-center space-x-3">
              <p onClick={() => setType('login')} className="text-sm text-[#4aa7c0] underline cursor-pointer">Inicia Sesión</p>
            </div>
          </div>
          <footer className="flex justify-end items-center ">
            <p className="text-xs text-gray-600 w-full text-center">
              Registrándote aceptas nuestras <br /> <a className="underline" href="#">Condiciones de uso</a> y <a className="underline" href="#">Políticas de privacidad</a>
            </p>
          </footer>
        </main>
      )
    }
  }

  const validateLogin = () => {
    let valid = true
    const errorsTemp = {};
    if (!email) {
      errorsTemp.email = 'El email es requerido'
      valid = false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errorsTemp.email = 'El email no es válido'
      valid = false
    }

    if (!password) {
      errorsTemp.password = 'La contraseña es requerida'
      valid = false
    } else if (password.length < 6) {
      errorsTemp.password = 'La contraseña debe tener al menos 6 caracteres'
      valid = false
    }

    setErrors(errorsTemp);
    return valid;
  }

  const logic = {
    "login": (event) => {
      event.preventDefault()
      let valid = validateLogin()
      if (!valid) {
        return
      }
      axios.post(`${process.env.AUTH_API_URL || 'http://localhost:4000'}/api/v1/login`, {
        username: email,
        password
      }, {
        withCredentials: true,
      })
        .then(res => {
          setIsLogged(res.data)
          handleClose()
          if (router.route === '/') router.reload()
          router.push("/");
        })
        .catch(err => {
          if (err.response.status === 400) {
            setErrors({
              response: 'El email o la contraseña son incorrectos'
            })
          }
          console.log(err)
        })
    },
    "register": () => {

    },
  }

  return (
    <>
      <div className="fixed inset-0 z-10">
        <div onClick={handleClose} className="absolute inset-0 bg-gray-900 opacity-50" />
        <div className="fixed block top-1/2 left-1/2 w-full h-full md:w-[30rem] md:h-2/3 min-h-[350px] bg-white -translate-x-1/2 -translate-y-1/2 rounded">
          <header className="flex justify-end items-center md:hidden ">
            <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#4aa7c0" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </header>
          {content[type]()}
          <div className="shrink-0 flex md:hidden justify-center my-16">
            <Image src="/logolargo.png" alt="StackingUp Logo" width={200} height={70} layout="intrinsic" />
          </div>
        </div>
      </div>
    </>
  );
}



