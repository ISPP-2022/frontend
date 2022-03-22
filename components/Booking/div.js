import DateRangeInput from "../DateRange";
import TimeRangeInput from "../TimeRange";
import { Button } from "../Core/Button";
import axios from "axios";
import { differenceInCalendarMonths, differenceInCalendarDays, differenceInHours, setMinutes, setHours } from "date-fns";


export default function BookingDiv(props) {

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
        await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/rentals`).then(res =>
            rentalDates = res.data.filter(rental => (
                initialDate >= rental.initialDate && initialDate <= rental.finalDate) ||
                (finalDate >= rental.initialDate && finalDate <= rental.finalDate) ||
                (initialDate <= rental.initialDate && finalDate >= rental.finalDate))
        ).catch(err => console.log(`No rentals found for space ${props.space.id}`));

        if (rentalDates.length > 0) {
            alert("La fecha seleccionada está ocupada");
            return false;
        }

        return true;
    };

    //Devuelve el tipo de coste más barato según  
    const rentalCost = (initialDate, finalDate) => {
        const costs = [
            { rentalType: 'HOUR', price: differenceInHours(finalDate, initialDate, "ceil") * props.space.priceHour },
            { rentalType: 'DAY', price: (differenceInCalendarDays(finalDate, initialDate) || 1) * props.space.priceDay },
            { rentalType: 'MONTH', price: (differenceInCalendarMonths(finalDate, initialDate) || 1) * props.space.priceMonth }
        ];

        return costs.filter(o => o.price).reduce((min, obj) => min.price < obj.price ? min : obj);

    };

    const rent = async () => {
        const initialTime = props.timeRange.initialTime.split(":");
        const finalTime = props.timeRange.finalTime.split(":");
        let initialDate = setMinutes(setHours(props.dateRange[0].startDate, ~~initialTime[0] + 1), ~~initialTime[1]);
        let finalDate = setMinutes(setHours(props.dateRange[0].endDate, ~~finalTime[0] + 1), ~~finalTime[1]);

        if (rentalValidation(initialDate, finalDate)) {
            const cost = rentalCost(initialTime, finalTime)
            confirm(`¿Está seguro que desea reservar el espacio ${props.space.name} por ${cost.price}€?`) &&
                (await axios.post(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/rentals`, {
                    initialDate: initialDate,
                    finalDate: finalDate,
                    cost: cost.price,
                    type: cost.rentalType,
                    meters: 4,
                    spaceId: props.space.id,
                    renterId: props.user.userId,
                }, {
                    withCredentials: true,
                }).then(res => {
                    console.log(res);
                }).catch(err => console.log(err.response.data)));
        }
    };

    return (
        <div className="hidden lg:block lg:border-webcolor-50 lg:border-2 lg:rounded-lg lg:mt-4 lg:ml-4">
            <h2 className="text-webcolor-50 text-2xl font-bold Disponibilidad mb-4 mt-2 ml-10">
                Reservar
            </h2>
            <DateRangeInput rentalsDates={props.rentalsDates} dateRange={props.dateRange} setDateRange={props.setDateRange} />
            <hr className=" bg-webcolor-50 w-[80%] m-auto" />
            <TimeRangeInput timeRange={props.timeRange} setTimeRange={props.setTimeRange} />
            <div className='flex justify-center'>
                <Button onClick={() => rent()}
                    type="button" className="fill-webcolor-50 mt-4">
                    Reservar
                </Button>
            </div>
        </div>
    );
};