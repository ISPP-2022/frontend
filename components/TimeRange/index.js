import { useState } from "react"

export default function TimeRangeInput() {

    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('');

    return (
        <>
            <div className='flex justify-center mt-4'>
                <div >
                    <input type={'time'} label={'Hora de inicio'} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div >
                    <input type={'time'} label={'Hora de fin'} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
            </div>
        </>
    )
}