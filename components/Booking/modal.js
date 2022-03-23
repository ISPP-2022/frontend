import { useState } from "react";
import DateRangeInput from "../DateRange/index.js";
import TimeRangeInput from "../TimeRange/index.js";
import { Button } from "../Core/Button/index.js";
import axios from "axios";
import { addDays, differenceInCalendarMonths, differenceInCalendarDays, differenceInHours, setMinutes, setHours, isSameDay, isAfter, isBefore } from "date-fns";

export default function BookingModal({ childrens, ...props }) {
  const { handleClose, setIsLogged } = props;
  const [metros, setMetros] = useState(1);
  const [errors, setErrors] = useState({ response: "" });

  const rentalValidation = async (initialDate, finalDate) => {

    if (!initialDate || !finalDate) {
      alert("Por favor, seleccione un rango de fechas");
      return false;
    }

    // Si la fecha de inicio es mayor que la fecha final
    if (initialDate.getTime() > finalDate.getTime()) {
      alert("La fecha de inicio no puede ser posterior a la fecha final");
      return false;
    }

    // Si hay concurrencia de reservas
    let rentalDates = [];
    await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/rentals`).then(res => {
      console.log(res.data);
      rentalDates = res.data.filter(rental =>
        isAfter(initialDate, new Date(rental.initialDate)) && isBefore(initialDate, new Date(rental.finalDate)) ||
        isAfter(finalDate, new Date(rental.initialDate)) && isBefore(finalDate, new Date(rental.finalDate)) ||
        isBefore(initialDate, new Date(rental.initialDate)) && isAfter(finalDate, new Date(rental.finalDate)) ||
        isAfter(initialDate, new Date(rental.initialDate)) && isBefore(finalDate, new Date(rental.finalDate))
      )
    }
    ).catch(() => console.log(`No se ha encontrado concurrencia de fechas para el espacio ${props.space.id}`));

    console.log(rentalDates);

    if (rentalDates.length > 0) {
      alert(`La fecha seleccionada está ocupada por la siguiente reserva:
        ${new Date(rentalDates[0].initialDate).toUTCString()} - ${new Date(rentalDates[0].finalDate).toUTCString()}`);
      return false;
    }

    return true;
  };

  //Devuelve el tipo de coste más barato según  
  const rentalCost = (initialDate, finalDate) => {
    const costs = [
      { rentalType: 'HOUR', price: (differenceInHours(finalDate, initialDate, { roundingMethod: "ceil" }) || 1) * props.space.priceHour },
      { rentalType: 'DAY', price: (differenceInCalendarDays(finalDate, initialDate) || 1) * props.space.priceDay },
      { rentalType: 'MONTH', price: (differenceInCalendarMonths(finalDate, initialDate) || 1) * props.space.priceMonth }
    ];

    costs.forEach(cost => console.log(cost.price));

    return costs.filter(o => o.price).reduce((min, obj) => min.price < obj.price ? min : obj);

  };

  const rent = async () => {
    const initialTime = props.timeRange.initialTime.split(":");
    const finalTime = props.timeRange.finalTime.split(":");
    let initialDate = setMinutes(setHours(props.dateRange[0].startDate, ~~initialTime[0] + 1), ~~initialTime[1]);
    let finalDate = setMinutes(setHours(props.dateRange[0].endDate, ~~finalTime[0] + 1), ~~finalTime[1]);

    if (await rentalValidation(initialDate, finalDate)) {
      const cost = rentalCost(initialDate, finalDate)
      confirm(`¿Está seguro que desea reservar el espacio ${props.space.name} por ${cost.price}€?`) &&
        (await axios.post(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/rentals`, {
          initialDate: initialDate,
          finalDate: finalDate,
          cost: cost.price,
          type: cost.rentalType,
          meters: metros,
          spaceId: props.space.id,
          renterId: props.user.userId,
        }, {
          withCredentials: true,
        }).then(() => {
          alert("Reserva realizada con éxito");
          props.setDateRange([{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
          }]);

          props.setTimeRange({
            initialTime: '00:00',
            finalTime: '00:00'
          });

          // La de inicio y fin no se desactiva por si se pudieran alquilar algunas horas de esos días
          let newDisabledDates = props.disabledDates;
          let currentDate = addDays(currentDate, 1);
          while (!isSameDay(currentDate, finalDate)) {
            newDisabledDates.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
          }
          props.setDisabledDates(newDisabledDates);
        }).catch(err => console.log(err.response.data)));
    }
  };

  return (
    <>
      <div className="fixed inset-0 mt-4 z-50">
        <div onClick={handleClose} className="absolute inset-0 bg-gray-900 opacity-50" />
        <div className="fixed block top-1/2 left-1/2 w-full h-full md:w-[30rem] md:h-3/4 min-h-[550px] bg-white -translate-x-1/2 -translate-y-1/2 md:border-webcolor-50 md:border-2 md:rounded-md md:my-4 md:mx-4 justify-center">
          <header className="flex justify-end items-center md:hidden ">
            <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#4aa7c0" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </header>
          <h2 className="text-webcolor-50 text-2xl font-bold Disponibilidad mb-4 mt-2 ml-10">
            Reservar
          </h2>
          <DateRangeInput disabledDates={props.disabledDates} dateRange={props.dateRange} setDateRange={props.setDateRange} />
          <hr className=" bg-webcolor-50 w-[80%] m-auto" />
          <TimeRangeInput timeRange={props.timeRange} setTimeRange={props.setTimeRange} />
          {props.space.shared ?
                <div className="flex flex-col items-center"><hr className=" bg-webcolor-50 w-[80%] my-4" />
                <input type="number" placeholder="metros" className="rounded-full" onChange={(e) => setMetros(e.target.value)}/></div> : null
            }
          <div className='flex justify-center'>
            <Button onClick={() => rent()} type="button" className="fill-webcolor-50 mt-4">
              Reservar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}




