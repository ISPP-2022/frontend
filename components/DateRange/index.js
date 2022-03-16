import { DateRange } from 'react-date-range';
import { useState } from "react";
import * as locales from 'react-date-range/dist/locale';

export default function DateRangeInput() {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

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
            />
        </div>
    )

}