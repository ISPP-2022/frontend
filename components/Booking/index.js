import DateRangeInput from "../DateRange";
import TimeRangeInput from "../TimeRange";
import { Button } from "../Core/Button";
import axios from "axios";
import { addDays, differenceInCalendarMonths, differenceInCalendarDays, differenceInHours, setMinutes, setHours, setMonth, getMonth, isSameDay, isAfter, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



export default function Booking(props) {

  const dimensions = props?.space?.dimensions?.split('x').reduce((acc, curr) => acc * curr, 1).toFixed(2);

  const [monthNumber, setMonthNumber] = useState(1)

  const [cost, setCost] = useState(0)

  let startHourS = new Date(props.space.startHour)?.toLocaleTimeString().split(":");
  startHourS.pop();
  let endHourS = new Date(props.space.endHour)?.toLocaleTimeString().split(":");
  endHourS.pop();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [metros, setMetros] = useState(dimensions);
  const rentalValidation = async (initialDate, finalDate, renterId) => {

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
    await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/rentals`).then(res => {
      rentalDates = res.data.filter(rental =>
        isAfter(initialDate, new Date(rental.initialDate)) && isBefore(initialDate, new Date(rental.finalDate)) ||
        isAfter(finalDate, new Date(rental.initialDate)) && isBefore(finalDate, new Date(rental.finalDate)) ||
        isBefore(initialDate, new Date(rental.initialDate)) && isAfter(finalDate, new Date(rental.finalDate)) ||
        isAfter(initialDate, new Date(rental.initialDate)) && isBefore(finalDate, new Date(rental.finalDate))
      )
    }
    ).catch(() => { });

    if (rentalDates.length > 0) {
      alert(`La fecha seleccionada está ocupada por la siguiente reserva:
            ${new Date(rentalDates[0].initialDate).toUTCString()} - ${new Date(rentalDates[0].finalDate).toUTCString()}`);
      return false;
    }

    return true;
  };

  let minDate = tomorrow > new Date(props.space.initialDate) ? tomorrow : new Date(props.space.initialDate);
  minDate = minDate.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')
  let maxDate = new Date(props.space.finalDate).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')

  let maxNumber = differenceInCalendarMonths(new Date(props.space.finalDate), props.dateRange[0].startDate) + 1;
  const dateInputValue = props.dateRange[0].startDate.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')

  //Devuelve el tipo de coste más barato según  
  const rentalCost = (initialDate, finalDate, type) => {
    const costs = {
      HOUR: (differenceInHours(finalDate, initialDate, { roundingMethod: "ceil" }) || 1) * props.space.priceHour,
      DAY: (differenceInCalendarDays(finalDate, initialDate) + 1) * props.space.priceDay,
      MONTH: (differenceInCalendarMonths(finalDate, initialDate) + 1) * props.space.priceMonth
    };
    if (props.space.shared) {
      setCost(costs[type] * (metros / dimensions))
      return costs[type] * (metros / dimensions);
    }
    setCost(costs[type])
    return costs[type];
  };


  function validateBeforeConfirm(initialDate, finalDate, cost) {
    
    // AXIOS PARA COMPROBAR RENTAL

    router.push({
      pathname: "/payment/confirmation",
      query: {
        initialDate: initialDate.toLocaleString(),
        finalDate: finalDate.toLocaleString(),
        type: props.type,
        meters: metros,
        spaceId: props.space.id,
        renterId: props.user.userId,
        city: props.city,
        province: props.province,
        cost: cost,
        name: props.space.name
      }
    }, "/payment/confirmation")
  }

  const router = useRouter();

  const rent = async () => {
    if (props.user) {
      const initialTime = props.timeRange.initialTime.split(":");
      const finalTime = props.timeRange.finalTime.split(":");
      let initialDate = setMinutes(setHours(props.dateRange[0].startDate, ~~initialTime[0]), ~~initialTime[1]);
      let finalDate = setMinutes(setHours(props.dateRange[0].endDate, finalTime[0]), ~~finalTime[1]);
      if (props.type !== 'HOUR') {
        finalDate.setHours(23, 59, 59, 999);
      }
      if (await rentalValidation(initialDate, finalDate, props.user.userId)) {
        const cost2 = rentalCost(initialDate, finalDate, props.type)
        
        confirm(`¿Está seguro que desea reservar el espacio ${props.space.name} por ${cost2}€?`) && 
          validateBeforeConfirm(initialDate, finalDate, cost2)
          /*
          (await axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/rentals`, {
            initialDate: initialDate,
            finalDate: finalDate,
            type: props.type,
            meters: metros,
            spaceId: props.space.id,
            renterId: props.user.userId,
            cost: cost,
            renterConfirmation: false
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
          }).catch(err => {
            if (err.response.status === 400)
              if (err.response.data === 'Bad Request: Missing required attributes')
                alert('Error: Ingrese todos los atributos requeridos');
              else {
                alert(err.response.data);
              }
            else
              alert("Error al realizar la reserva");
          }));
          */
      }
    } else {
      alert("Por favor, inicie sesión para realizar una reserva");
    }
  };

  useEffect(() => {

    props.setTimeRange({
      initialTime: startHourS.join(":"),
      finalTime: endHourS.join(":")
    })
    props.setDateRange([{
      startDate: tomorrow,
      endDate: tomorrow,
      key: 'selection'
    }])
  }, [props.type])

  useEffect(() => {
    if (props.type === 'MONTH')
      props.setDateRange([{
        startDate: props.dateRange[0].startDate,
        endDate: setMonth(props.dateRange[0].startDate, getMonth(props.dateRange[0].startDate) + parseInt(monthNumber)),
        key: 'selection'
      }])
  }, [monthNumber])

  useEffect(() => {
    rentalCost(props.dateRange[0].startDate, props.dateRange[0].endDate, props.type)
  }, [props.dateRange[0].startDate, props.dateRange[0].endDate, props.type])

  const bookingBody = {
    "HOUR": (
      <>
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>D&iacute;a</h3>
        <div className="flex justify-center my-3">
          <input type={'date'}
            value={dateInputValue}
            min={minDate}
            max={maxDate}
            onChange={(e) => {
              props.setDateRange([{
                startDate: new Date(e.target.value),
                endDate: new Date(e.target.value),
                key: 'selection'
              }])
            }} />
        </div>
        <hr className=" bg-webcolor-50 w-[80%] m-auto" />
        <TimeRangeInput timeRange={props.timeRange} setTimeRange={props.setTimeRange} min={startHourS.join(":")} max={endHourS.join(":")} />
        {props.space.shared ?
          <div className="flex flex-col items-center"><hr className=" bg-webcolor-50 w-[80%] my-4" />
            <input type="number" placeholder="metros" className="rounded-full" value={metros} max={dimensions} min={0} onChange={(e) => setMetros(e.target.value)} /></div> : null
        }
      </>
    ),
    "DAY": (
      <>
        <DateRangeInput dateRange={props.dateRange} setDateRange={props.setDateRange} disabledDates={props.disabledDates} space={props.space} />
        <hr className=" bg-webcolor-50 w-[80%] m-auto" />
        {props.space.shared ?
          <div className="flex flex-col items-center"><hr className=" bg-webcolor-50 w-[80%] my-4" />
            <input type="number" placeholder="metros" className="rounded-full" value={metros} max={dimensions} min={0} onChange={(e) => setMetros(e.target.value)} /></div> : null
        }
      </>
    ),
    "MONTH": (
      <>
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>D&iacute;a de Inicio</h3>
        <div className="flex justify-center my-3">
          <input type={'date'}
            value={dateInputValue}
            min={minDate}
            max={maxDate}
            onChange={(e) => {
              setMonthNumber(1)
              props.setDateRange([{
                startDate: new Date(e.target.value),
                endDate: setMonth(new Date(e.target.value), getMonth(new Date(e.target.value)) + 1),
                key: 'selection'
              }])
            }} />
        </div>
        <hr className=" bg-webcolor-50 w-[80%] m-auto" />
        <h3 className='text-webcolor-50 text-2xl text-center mt-4'>N&uacute;mero de meses</h3>
        <div className="flex justify-center my-3">
          <input type={'number'}
            value={monthNumber}
            min={1}
            max={maxNumber}
            onChange={(e) => {
              setMonthNumber(e.target.value);
            }} />
        </div>
        {props.space.shared ?
          <div className="flex flex-col items-center"><hr className=" bg-webcolor-50 w-[80%] my-4" />
            <input type="number" placeholder="metros" className="rounded-full" value={metros} max={dimensions} min={0} onChange={(e) => setMetros(e.target.value)} /></div> : null
        }
      </>
    ),
  }

  return (
    <form className={props.formStyle}>
      <h2 className="text-webcolor-50 text-2xl font-bold Disponibilidad mb-4 mt-2 w-full text-center">
        Reservar
      </h2>
      <menu className="flex justify-center">
        <fieldset className='p-4 w-full max-w-[400px]'>
          <ul className='grid grid-cols-3 font-semibold text-webcolor-50'>
            <li className='border rounded-l border-webcolor-50'>
              <input disabled={!props.space.priceHour} className='hidden peer' type="radio" id="HOUR" name="type" value="HOUR" checked={props.type === 'HOUR'} onChange={(e) => props.setType(e.target.value)} />
              <label htmlFor="HOUR" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa] peer-disabled:bg-gray-300 peer-disabled:text-white'>Horas</label>
            </li>
            <li className='border-y border-webcolor-50 text-center'>
              <input disabled={!props.space.priceDay} className='hidden peer' type="radio" id="DAY" name="type" value="DAY" checked={props.type === 'DAY'} onChange={(e) => props.setType(e.target.value)} />
              <label htmlFor="DAY" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa] peer-disabled:bg-gray-300 peer-disabled:text-white'>Días</label>
            </li>
            <li className='border rounded-r border-webcolor-50 text-center'>
              <input disabled={!props.space.priceMonth} className='hidden peer' type="radio" id="MONTH" name="type" value="MONTH" checked={props.type === 'MONTH'} onChange={(e) => props.setType(e.target.value)} />
              <label htmlFor="MONTH" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa] peer-disabled:bg-gray-300 peer-disabled:text-white'>Meses</label>
            </li>
          </ul>
        </fieldset>
      </menu>
      <hr className=" bg-webcolor-50 w-[95%] m-auto mb-6" />
      {bookingBody[props.type]}
      <div className='flex justify-center'>
        <Button onClick={() => rent()}
          type="button" className="fill-webcolor-50 mt-4">
          Reservar
        </Button>
      </div>
      <div>
        <hr className=" bg-webcolor-50 w-[95%] m-auto mb-6" />
        <h1 className="text-center text-webcolor-50 text-5xl">
          Total: <b>{cost.toFixed(2)}€</b>
        </h1>
      </div>
    </form>
  );
};

