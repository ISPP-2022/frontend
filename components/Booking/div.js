import DateRangeInput from "../DateRange";
import TimeRangeInput from "../TimeRange";
import { Button } from "../Core/Button";


export default function BookingDiv() {
    return (
        <div className="hidden lg:block lg:border-webcolor-50 lg:border-2 lg:rounded-lg lg:mt-4 lg:ml-4">
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
    );
};