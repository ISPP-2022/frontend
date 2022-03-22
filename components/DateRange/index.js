import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';

export default function DateRangeInput(props) {

    return (
        <div className='flex justify-center'>
            <DateRange
                editableDateInputs={false}
                onChange={item => props.setDateRange([item.selection])}
                ranges={props.dateRange}
                locale={locales.es}
                minDate={new Date()}
                maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                dateDisplayFormat={"d/MM/yyyy"}
                disabledDates={props.disabledDates}

            />
        </div>
    )

}