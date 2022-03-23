export default function TimeRangeInput(props) {

    return (
        <>
            <h3 className='text-webcolor-50 text-2xl text-center mt-4'>Hora llegada - Hora salida</h3>
            <div className='flex justify-center mt-4'>

                <div>
                    <input type={'time'} label={'Hora de inicio'} value={props.timeRange.initialTime} className="rounded-tl-full rounded-bl-full"
                        onChange={(e) => {
                            props.setTimeRange(
                                {
                                    initialTime: e.target.value,
                                    finalTime: props.timeRange.finalTime

                                }
                            )


                        }} />
                </div>
                <div >
                    <input type={'time'} label={'Hora de fin'} value={props.timeRange.finalTime} className="rounded-tr-full rounded-br-full"
                        onChange={(e) => {
                            props.setTimeRange(
                                {
                                    initialTime: props.timeRange.initialTime,
                                    finalTime: e.target.value

                                }
                            )


                        }} />
                </div>
            </div>
        </>
    )
}