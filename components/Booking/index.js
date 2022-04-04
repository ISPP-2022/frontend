import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { Button } from '../Core/Button';
import { addDays, addHours, setHours, addMonths, addSeconds, differenceInHours, differenceInDays } from 'date-fns';
import axios from 'axios';


const tupleToHours = (tuple) => {
  const [hours, minutes] = tuple;
  const string = hours.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ':' + minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 });
  return string;
}

const hoursStringToTuple = (hoursString) => {
  const [hours, minutes] = hoursString.split(':');
  return [parseInt(hours), parseInt(minutes)];
}

export default function Booking({ user, space, type, setType, formStyle, disabledDates }) {

  const dimensions = space.dimensions.split('x').reduce((acc, curr) => acc * curr).toFixed(2);

  const iDate = new Date(space.initialDate) < addDays(new Date(), 1) ? addDays(new Date(), 1) : new Date(space.initialDate);

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
        costTemp = (differenceInHours(fD, iD)) * space.priceHour;
        break;
      case 'DAY':
        costTemp = (differenceInDays(fD, iD) + 1) * space.priceDay;
        break;
      case 'MONTH':
        costTemp = months * space.priceMonth;
        break;
      default:
        costTemp = 0;
        break;
    }
    costTemp = costTemp / dimensions * meters
    setCost(costTemp < 0 ? 0 : costTemp);
  }

  const rent = () => {
    let initialDateBody = new Date(initialDate);
    initialDateBody.setHours(startHour[0]);
    initialDateBody.setMinutes(startHour[1]);
    initialDateBody.setSeconds(0)
    initialDateBody.setMilliseconds(0)

    let finalDateBody = new Date(finalDate);
    finalDateBody.setHours(endHour[0]);
    finalDateBody.setMinutes(endHour[1]);
    finalDateBody.setSeconds(0)
    finalDateBody.setMilliseconds(0)

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

    axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${space.id}/rentals`, rentBody, { withCredentials: true })
      .then(res => {
        alert('Rentado con éxito');
      })
      .catch(err => {
        alert('Error al reservar->' + err.response.data);
      })

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
    initialDateBody.setHours(startHour[0]);
    initialDateBody.setMinutes(startHour[1]);

    let finalDateBody = new Date(finalDate);
    finalDateBody.setHours(endHour[0]);
    finalDateBody.setMinutes(endHour[1]);
    calcCost(initialDateBody, finalDateBody, type);
  }, [initialDate, finalDate, meters, type, startHour, endHour])

  const bookingBody = {
    "HOUR": (
      <>
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>D&iacute;a</h3>
        <div className="flex justify-center my-3">
          <input type={'date'} value={initialDate.toISOString().split('T')[0]} onChange={(e) => { setInitialDate(new Date(e.target.value)); setFinalDate(new Date(e.target.value)) }} />
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
            disabledDates={disabledDates}
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
          <input type={'date'} value={initialDate.toISOString().split('T')[0]} onChange={(e) => { setInitialDate(new Date(e.target.value)); setFinalDate(addMonths(new Date(e.target.value), months)) }} />
        </div>
        <hr className=" bg-webcolor-50 w-[80%] m-auto" />
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>N&uacute;mero de meses</h3>
        <div className="flex justify-center my-3">
          <input type={'number'} value={months} min={1} onChange={e => { setMonths(e.target.value); setFinalDate(addMonths(initialDate, e.target.value)) }} />
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
      {bookingBody[type]}
      {space.shared ?
        <>


          <div className="flex flex-col items-center">
            <hr className=" bg-webcolor-50 w-[80%] my-4" />
            <h3 className='text-webcolor-50 text-2xl text-center mb-4'>Metros alquilados</h3>
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