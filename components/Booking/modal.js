import { useState } from "react";
import DateRangeInput from "../DateRange/index.js";
import TimeRangeInput from "../TimeRange/index.js";
import { Button } from "../Core/Button/index.js";
import axios from "axios";

export default function BookingModal({ childerns, ...props }) {
  const { handleClose, setIsLogged } = props;

  const [errors, setErrors] = useState({ response: "" });

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
      <div className="fixed inset-0 mt-4 z-50">
        <div onClick={handleClose} className="absolute inset-0 bg-gray-900 opacity-50" />
        <div className="fixed block top-1/2 left-1/2 w-full h-full sm:w-[30rem] sm:h-3/4 min-h-[550px] bg-white -translate-x-1/2 -translate-y-1/2 sm:border-webcolor-50 sm:border-2 sm:rounded-sm sm:my-4 sm:mx-4 justify-center">
          <header className="flex justify-end items-center sm:hidden ">
            <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#4aa7c0" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </header>
          <h2 className="text-webcolor-50 text-2xl font-bold Disponibilidad mb-4 mt-2 ml-10">
            Reservar
          </h2>
          <DateRangeInput />
          <hr className=" bg-webcolor-50 w-[80%] m-auto" />
          <TimeRangeInput />
          <div className='flex justify-center'>
            <Button type="button" className="fill-webcolor-50 mt-4">
              Reservar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}




