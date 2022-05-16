import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { Button } from '../Core/Button';
import { addDays, format, setHours, addMonths, addSeconds, differenceInHours, differenceInDays } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/router';


const tupleToHours = (tuple) => {
  const [hours, minutes] = tuple;
  const string = hours.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ':' + minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 });
  return string;
}

const hoursStringToTuple = (hoursString) => {
  const [hours, minutes] = hoursString.split(':');
  return [parseInt(hours), parseInt(minutes)];
}

const calculateDisableDates = (space, rentals) => {
  let disabled = [];
  let shared = [];
  if (!space.shared) {
    rentals.forEach(rental => {
      let i = new Date(rental.initialDate);
      while (i <= new Date(rental.finalDate)) {
        disabled.push(i);
        i = addDays(i, 1);
      }
    });
    disabled = new Array(new Set(disabled));
  } else {
    let temp = []
    rentals.forEach(rental => {
      let i = new Date(rental.initialDate);
      while (i <= new Date(rental.finalDate)) {
        temp.push({ date: i, space: rental.meters });
        i = addDays(i, 1);
      }
    });
    temp = temp.reduce((acc, curr) => {
      acc.find((value, index) => {
        if (value.date.getTime() === curr.date.getTime()) {
          acc[index].space += curr.space;
          return true;
        }
        return false;
      }) || acc.push(curr);
      return acc;
    }, []);
    temp.forEach((rental) => {
      if (rental.space === space.dimensions.split('x').reduce((ac, cu) => ac * cu))
        disabled.push(rental.date);
      else
        shared.push(rental.date);
    })
  }

  return [disabled, shared];
}

const customDayContent = (day, shared) => {
  let extraDot = null;
  if (shared.find(date => date.getTime() === day.getTime())) {
    extraDot = (
      <div
        style={{
          height: "5px",
          width: "5px",
          borderRadius: "100%",
          background: "orange",
          position: "absolute",
          top: 2,
          right: 2,
        }}
      />
    )
  }
  return (
    <div>
      {extraDot}
      <span>{format(day, "d")}</span>
    </div>
  )
}

export default function Booking({ user, space, type, setType, formStyle, rentals }) {
  const router = useRouter();
  const dimensions = space.dimensions.split('x').reduce((acc, curr) => acc * curr).toFixed(2);

  const iDate = new Date(space.initialDate) < addDays(new Date(), 2) ? addDays(new Date(), 2) : new Date(space.initialDate);

  const [cost, setCost] = useState(0);
  const [initialDate, setInitialDate] = useState(iDate);
  const [finalDate, setFinalDate] = useState(iDate);
  const [startHour, setStartHour] = useState([0, 0]);
  const [endHour, setEndHour] = useState([0, 0]);
  const [meters, setMeters] = useState(dimensions);
  const [months, setMonths] = useState(1);

  const minHour = `${(new Date(space.startHour).getUTCHours() - new Date().getTimezoneOffset() / 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${new Date(space.startHour).getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
  const maxHour = `${(new Date(space.endHour).getUTCHours() - new Date().getTimezoneOffset() / 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${new Date(space.endHour).getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;

  const calcCost = (iD, fD, type) => {
    let costTemp = 0;
    switch (type) {
      case 'HOUR':
        costTemp = (differenceInHours(fD, iD, { roundingMethod: 'ceil' })) * space.priceHour;
        break;
      case 'DAY':
        costTemp = ((fD.getTime() - iD.getTime()) / (1000 * 60 * 60 * 24)).toPrecision(2) * space.priceDay;
        break;
      case 'MONTH':
        costTemp = months * space.priceMonth;
        break;
      default:
        costTemp = 0;
        break;
    }
    costTemp = costTemp / dimensions * meters
    if (costTemp < 1) costTemp = 1;
    setCost(costTemp < 0 ? 0 : costTemp);
  }

  const rent = async () => {
    if (!user) {
      alert('Debe iniciar sesión para realizar una reserva');
      return;
    }
    let initialDateBody = new Date(initialDate);
    initialDateBody.setHours(startHour[0], startHour[1], 0, 0);

    let finalDateBody = new Date(finalDate);
    finalDateBody.setHours(endHour[0], endHour[1], 0, 0);

    if (type !== 'HOUR') {
      finalDateBody = addDays(finalDateBody, 1);
      finalDateBody = addSeconds(finalDateBody, -1);
    }

    let rentBody = {
      renterId: parseInt(user.userId),
      spaceId: parseInt(space.id),
      type: type,
      initialDate: initialDateBody,
      finalDate: finalDateBody,
      meters
    }

    await axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${space.id}/rentals`,
      rentBody,
      {
        withCredentials: true,
      })
      .then(res => {
        const token = res.data;
        router.push({
          pathname: "/payment/confirmation",
          query: {
            initialDate: initialDateBody.toLocaleString(),
            finalDate: finalDateBody.toLocaleString(),
            type: type,
            meters: meters,
            spaceId: space.id,
            renterId: user.userId,
            city: space.city,
            province: space.province,
            cost: cost,
            name: space.name,
            token: token,
            renterConfirmation: false
          }
        }, "/payment/confirmation")
      }).catch(err => {
        console.log(err);
        if (err.response.status === 400)
          if (err.response.data === 'Bad Request: Missing required attributes')
            alert('Error: Ingrese todos los atributos requeridos');
          else if (err.response.data === 'Cannot rent space twice. Please update or delete your previous rental of this space') {
            alert("No puedes alquilar el mismo espacio dos veces. Edita o elimina el alquiler anterior.");
          } else if (err.response.data === "Bad Request: Initial date must be between space dates") {
            alert("La fecha de inicio debe estar en el rango de fechas válidas.")
          } else if (err.response.data === "Bad Request: Initial hour must be between space hours") {
            alert("La hora de inicio debe estar en el rango de horas válidas.")
          } else if (err.response.data === "Bad Request: Final hour must be between space hours") {
            alert("La hora de fin debe estar en el rango de horas válidas.")
          } else if (err.response.data === "Bad Request: Initial date must be a Date after today") {
            alert("La fecha de inicio debe ser posterior a la fecha de hoy.")
          } else if (err.response.data === "Bad Request: Final date must be a Date after today") {
            alert("La fecha de fin debe ser posterior a la fecha de hoy.")
          } else if (err.response.data === "Bad Request: Final date must be between space dates") {
            alert("La fecha de fin debe estar en el rango de disponibilidad del espacio.")
          } else if (err.response.data === "Bad Request: Space not available or space capacity exceeded") {
            space.shared ? alert("Se ha excedido la superficie máxima disponible en el espacio compartido durante el periodo") : alert("El espacio no esta disponible en ese intervalo de fechas")
          } else if (err.response.data === "Bad Request: Initial date must be after 24 hours from now") {
            alert("La fecha inicial debe ser con al menos 24 horas de anticipación.")
          }
          else
            if (err.response.data === "Cannot rent your own space") {
              alert("No puedes alquilar tu propio espacio");
            } else {
              alert("Error al realizar la reserva");
            }
      });

  }

  useEffect(() => {
    if (type === 'HOUR') {
      setStartHour(minHour.split(':').map(x => parseInt(x)));
      setEndHour(maxHour.split(':').map(x => parseInt(x)));
    } else {
      setStartHour([0, 0]);
      setEndHour([0, 0]);
    }

    if (type === 'MONTH') {
      setInitialDate(iDate);
      setFinalDate(addMonths(iDate, 1));
    } else {
      setInitialDate(iDate);
      setFinalDate(iDate);
    }

    setMeters(dimensions);
  }, [type])

  useEffect(() => {
    let initialDateBody = new Date(initialDate);
    initialDateBody.setHours(startHour[0], startHour[1], 0);

    let finalDateBody = new Date(finalDate);
    finalDateBody.setHours(endHour[0], endHour[1], 0);

    if (type === 'DAY') {
      finalDateBody.setDate(finalDateBody.getDate() + 1);
      finalDateBody.setSeconds(finalDateBody.getSeconds() - 1)
    }

    calcCost(initialDateBody, finalDateBody, type);
  }, [initialDate, finalDate, meters, type, startHour, endHour])


  const [disabled, shared] = calculateDisableDates(space, rentals)
  const bookingBody = {
    "HOUR": (
      <>
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>D&iacute;a</h3>
        <div className="flex justify-center my-3">
          <input type={'date'} min={iDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', }).split('/').reverse().join('-')} value={initialDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', }).split('/').reverse().join('-')} onChange={(e) => { setInitialDate(new Date(e.target.value)); setFinalDate(new Date(e.target.value)) }} />
        </div>
        <hr className=" bg-webcolor-50 w-[80%] m-auto" />
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>Hora llegada - Hora salida</h3>
        <div className='flex justify-center mt-4'>
          <div>
            <input type={'time'} label={'Hora de inicio'} min={minHour} max={maxHour} value={tupleToHours(startHour)} onChange={e => setStartHour(hoursStringToTuple(e.target.value))} className="rounded-tl-full rounded-bl-full" />
          </div>
          <div >
            <input type={'time'} label={'Hora de fin'} min={minHour} max={maxHour} value={tupleToHours(endHour)} onChange={e => setEndHour(hoursStringToTuple(e.target.value))} className="rounded-tr-full rounded-br-full" />
          </div>
        </div>
      </>
    ),
    "DAY": (
      <>
        <div className='flex justify-center'>
          <DateRange
            editableDateInputs={false}
            locale={locales.es}
            minDate={iDate}
            ranges={[{ startDate: initialDate, endDate: finalDate }]}
            disabledDates={disabled}
            dayContentRenderer={(day) => customDayContent(day, shared)}
            onChange={item => {
              if (item.range1.startDate < item.range1.endDate) {
                setInitialDate(item.range1.startDate);
                setFinalDate(item.range1.endDate);
              } else {
                setInitialDate(item.range1.endDate);
                setFinalDate(item.range1.startDate);
              }
            }}
            dateDisplayFormat={"d/MM/yyyy"}
          />
        </div>
        <hr className=" bg-webcolor-50 w-[80%] m-auto" />
      </>
    ),
    "MONTH": (
      <>
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>D&iacute;a de Inicio</h3>
        <div className="flex justify-center my-3">
          <input type={'date'} min={iDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', }).split('/').reverse().join('-')} value={initialDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', }).split('/').reverse().join('-')} onChange={(e) => { setInitialDate(new Date(e.target.value)); setFinalDate(addDays(new Date(e.target.value), 30 * months)) }} />
        </div>
        <hr className=" bg-webcolor-50 w-[80%] m-auto" />
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>N&uacute;mero de meses</h3>
        <div className="flex justify-center my-3">
          <input type={'number'} value={months} min={1} step={1} pattern="^[1-9][0-9]*$" onChange={e => { setMonths(parseInt(e.target.value)); setFinalDate(addDays(initialDate, 30 * e.target.value)) }} />
        </div>
      </>
    ),
  }

  return (
    <form className={formStyle}>
      <h2 className="text-webcolor-50 text-2xl font-bold Disponibilidad mb-4 mt-2 w-full text-center">
        Reservar
      </h2>
      <menu className="flex justify-center">
        <fieldset className='p-4 w-full max-w-[400px]'>
          <ul className='grid grid-cols-3 font-semibold text-webcolor-50'>
            <li className='border rounded-l border-webcolor-50'>
              <input disabled={!space.priceHour} className='hidden peer' type="radio" id="HOUR" name="type" value="HOUR" checked={type === 'HOUR'} onChange={(e) => setType(e.target.value)} />
              <label htmlFor="HOUR" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa] peer-disabled:bg-gray-300 peer-disabled:text-white'>Horas</label>
            </li>
            <li className='border-y border-webcolor-50 text-center'>
              <input disabled={!space.priceDay} className='hidden peer' type="radio" id="DAY" name="type" value="DAY" checked={type === 'DAY'} onChange={(e) => setType(e.target.value)} />
              <label htmlFor="DAY" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa] peer-disabled:bg-gray-300 peer-disabled:text-white'>Días</label>
            </li>
            <li className='border rounded-r border-webcolor-50 text-center'>
              <input disabled={!space.priceMonth} className='hidden peer' type="radio" id="MONTH" name="type" value="MONTH" checked={type === 'MONTH'} onChange={(e) => setType(e.target.value)} />
              <label htmlFor="MONTH" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa] peer-disabled:bg-gray-300 peer-disabled:text-white'>Meses</label>
            </li>
          </ul>
        </fieldset>
      </menu>
      <hr className=" bg-webcolor-50 w-[95%] m-auto mb-6" />
      <h2 className="text-webcolor-50 text-xl font-bold Disponibilidad mb-4 mt-2 w-full text-center">
        Disponibilidad
      </h2>
      <p className="text-webcolor-50 text-lg Disponibilidad mb-4 mt-2 w-full text-center ">
        Desde: {new Date(space.initialDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <p className="text-webcolor-50 text-lg Disponibilidad mb-4 mt-2 w-full text-center ">
        {space.finalDate ? ` Hasta: ${new Date(space.finalDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : ``}
      </p>
      <hr className=" bg-webcolor-50 w-[95%] m-auto mb-6" />
      {bookingBody[type]}
      {space.shared ?
        <>
          <div className="flex flex-col items-center">
            <hr className=" bg-webcolor-50 w-[80%] my-4" />
            <h3 className='text-webcolor-50 text-2xl text-center mb-4'>Superficie alquilada (m²)</h3>
            <input type="number" placeholder="metros" className="rounded-full" value={meters} max={dimensions} min={0.1} onChange={(e) => {
              setMeters(parseFloat(e.target.value))
            }} /></div>
        </>
        : null
      }
      <div className='flex justify-center'>
        <Button onClick={rent} type="button" className="fill-webcolor-50 mt-4">
          Reservar
        </Button>
      </div>
      <div>
        <hr className=" bg-webcolor-50 w-[95%] m-auto mb-6" />
        <h1 className="text-center text-webcolor-50 text-5xl">
          {cost > 0 ? <>
            <p> Total: <b>{cost.toFixed(2)}€</b>*</p>
            <p className='text-base mt-2'>* Coste sin IVA ni comisiones</p>
          </> : <p className='text-red-500'> Invalido</p>}
        </h1>
      </div>
    </form>
  )
}