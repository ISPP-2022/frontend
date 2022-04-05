import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
//get tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function DateRangeInput(props) {

    let minDate = tomorrow > new Date(props.space.initialDate) ? tomorrow : new Date(props.space.initialDate);
    console.log(props.dateRange)
    return (
        <div className='flex justify-center'>
            <DateRange
                editableDateInputs={false}
                onChange={item => { console.log([item.selection]); props.setDateRange([item.selection]) }}
                ranges={props.dateRange}
                locale={locales.es}
                minDate={minDate}
                maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                dateDisplayFormat={"d/MM/yyyy"}
                {...props}
            />
        </div>
    )

}