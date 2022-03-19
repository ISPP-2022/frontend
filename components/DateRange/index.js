import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import { useState } from "react";
import * as locales from 'react-date-range/dist/locale';

export default function DateRangeInput(props) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    let disabledDates = [];
    if (props.rentalsDates) {
        props.rentalsDates.forEach(rental => {
            let currentDate = rental.initialDate;
            while (currentDate <= rental.finalDate) {
                disabledDates.push(new Date(currentDate));
                currentDate = addDays(currentDate, 1);
            }
        });
    }

    return (
        <div className='flex justify-center'>
            <DateRange
                editableDateInputs={false}
                onChange={item => setState([item.selection])}
                ranges={state}
                locale={locales.es}
                minDate={new Date()}
                maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                dateDisplayFormat={"d/MM/yyyy"}
                disabledDates={disabledDates}

            />
        </div>
    )

}