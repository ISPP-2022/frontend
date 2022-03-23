import DateRangeInput from "../DateRange";
import TimeRangeInput from "../TimeRange";
import { Button } from "../Core/Button";
import axios from "axios";
import { addDays, differenceInCalendarMonths, differenceInCalendarDays, differenceInHours, setMinutes, setHours, isSameDay, isAfter, isBefore } from "date-fns";
import { useState } from "react";


export default function BookingDiv(props) {

    const dimensions = props?.space?.dimensions?.split('x').reduce((acc, curr) => acc * curr, 1)

    const [metros, setMetros] = useState(dimensions);
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

    //Devuelve el tipo de coste más barato según  
    const rentalCost = (initialDate, finalDate) => {
        const costs = [
            { rentalType: 'HOUR', price: (differenceInHours(finalDate, initialDate, { roundingMethod: "ceil" }) || 1) * props.space.priceHour },
            { rentalType: 'DAY', price: (differenceInCalendarDays(finalDate, initialDate) || 1) * props.space.priceDay },
            { rentalType: 'MONTH', price: (differenceInCalendarMonths(finalDate, initialDate) || 1) * props.space.priceMonth }
        ];

        return costs.filter(o => o.price).reduce((min, obj) => min.price < obj.price ? min : obj);

    };

    const rent = async () => {
        if (props.user) {
            const initialTime = props.timeRange.initialTime.split(":");
            const finalTime = props.timeRange.finalTime.split(":");
            let initialDate = setMinutes(setHours(props.dateRange[0].startDate, ~~initialTime[0] + 1), ~~initialTime[1]);
            let finalDate = setMinutes(setHours(props.dateRange[0].endDate, ~~finalTime[0] + 1), ~~finalTime[1]);

            if (await rentalValidation(initialDate, finalDate)) {
                const cost = rentalCost(initialDate, finalDate)
                confirm(`¿Está seguro que desea reservar el espacio ${props.space.name} por ${cost.price}€?`) &&
                    (await axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/rentals`, {
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
            }
        } else {
            alert("Por favor, inicie sesión para realizar una reserva");
        }
    };

    return (
        <div className="lg:bg-white hidden ml-4 lg:block lg:h-3/4 lg:min-h-[769px] mb-4 p-5 pl-6 pr-6 lg:mt-3 lg:rounded-xl lg:border lg:border-[#4aa7c0] relative lg:shadow-lg">
            <h2 className="text-webcolor-50 text-2xl font-bold Disponibilidad mb-4 mt-2 w-full text-center">
                Reservar
            </h2>
            <DateRangeInput dateRange={props.dateRange} setDateRange={props.setDateRange} disabledDates={props.disabledDates} />
            <hr className=" bg-webcolor-50 w-[80%] m-auto" />
            <TimeRangeInput timeRange={props.timeRange} setTimeRange={props.setTimeRange} />
            {props.space.shared ?
                <div className="flex flex-col items-center"><hr className=" bg-webcolor-50 w-[80%] my-4" />
                    <input type="number" placeholder="metros" className="rounded-full" value={metros} max={dimensions} min={0} onChange={(e) => setMetros(e.target.value)} /></div> : null
            }
            <div className='flex justify-center'>
                <Button onClick={() => rent()}
                    type="button" className="fill-webcolor-50 mt-4">
                    Reservar
                </Button>
            </div>
        </div>
    );
};