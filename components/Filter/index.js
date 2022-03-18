import { useState } from "react"
import { FieldSelectorBox} from "../Core/Form"
import { Button} from "../Core/Button"
import {options} from "./options"

const Filter = () => {
    const [tags, setTags] = useState([])

    const [shared, setShared] = useState(false)

    const [minDim, setMinDim] = useState('')
    const [maxDim, setMaxDim] = useState('')

    const [minPriceHour, setMinPriceHour] = useState('')
    const [maxPriceHour, setMaxPriceHour] = useState('')
    const [minPriceDay, setMinPriceDay] = useState('')
    const [maxPriceDay, setMaxPriceDay] = useState('')
    const [minPriceMonth, setMinPriceMonth] = useState('')
    const [maxPriceMonth, setMaxPriceMonth] = useState('')

    const [isRentPerHour, setIsRentPerHour] = useState(false)
    const [isRentPerDay, setIsRentPerDay] = useState(false)
    const [isRentPerMonth, setIsRentPerMonth] = useState(false)

    const enviarFiltros = (event) => {
        event.preventDefault();
        console.log('enviando datos... ' + '\ntags: '+tags+'\nshared: '+shared+
                                        '\nminDim: '+minDim+ ' maxDim: '+maxDim+
                                        '\nminPriceHour: '+minPriceHour+ ' maxPriceHour: '+maxPriceHour+
                                        '\nminPriceDay: '+minPriceDay+ ' maxPriceDay: '+maxPriceDay+
                                        '\nminPriceMonnth: '+minPriceMonth+ ' maxPriceDay: '+maxPriceMonth+
                                        '\nisRentPerHour: '+isRentPerHour+' isRentPerDay: '+isRentPerDay+' isRentPerMonth: '+isRentPerMonth)
    }
    
    return (
        <div>
        <form onSubmit={enviarFiltros} className='bg-white text-webcolor-50 p-6 md:rounded-xl w-full md:w-[750px] space-y-4 divide-y-2'>
            <FieldSelectorBox name="tag" value={tags} label="Tags" multiple={true} options={options} 
                onChange={(event) => {setTags([...event.target.selectedOptions].map(o => o.value))}}/>

            <div className='form-check hidden md:block'>
                <input name="shared" value={shared} onChange={(event) => {setShared(event.target.checked)}}
                className="form-check-input appearance-none 
                h-4 w-4 border border-gray-400 
                rounded-sm bg-white checked:bg-webcolor-50 
                checked:border-webcolor-50  focus:outline-none 
                transition duration-200 mt-1 align-top bg-no-repeat 
                bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="checkbox" id="flexCheckShared"></input>
                <label className="form-check-label inline-block text-webcolor-50" htmlFor="flexCheckShared">
                    Espacio compartido
                </label>
            </div>

            <fieldset className='pt-4 flex'>
                <div className='basis-1/2'>
                    <label htmlFor="minDim">Dimensiones: </label>
                    <input name="minDim" className='border w-1/4' type="number" id="min-dim" step="1" min="1" value={minDim} onChange={(e) => setMinDim(e.target.value)} />
                    <span>a</span>
                    <input name="maxDim" className='border w-1/4' type="number" id="max-dim" step="1" min="1" value={maxDim} onChange={(e) => setMaxDim(e.target.value)} />
                    <span>m<sup>2</sup></span>
                </div> 
            </fieldset>

            <div className='form-check'>
                <input name="isRentPerHour" value={isRentPerHour}
                onChange={(event) => {setIsRentPerHour(event.target.checked)}}
                className="form-check-input appearance-none 
                h-4 w-4 border border-gray-400 
                rounded-sm bg-white checked:bg-webcolor-50 
                checked:border-webcolor-50  focus:outline-none 
                transition duration-200 mt-1 align-top bg-no-repeat 
                bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="checkbox" id="flexCheckIsRentPerHour"></input>
                <label className="form-check-label inline-block text-webcolor-50" htmlFor="flexCheckisRentPerHour">
                    Alquiler por horas
                </label>
            </div>

            {
                isRentPerHour ? 
                <fieldset className='pt-4 flex'>
                    <div className='basis-1/2'>
                        <label htmlFor="minPriceHour">Precio por hora: </label>
                        <input name="minPriceHour" className='border w-1/4' type="number" id="min-price-hour" step="0.1" min="1" value={minPriceHour} onChange={(e) => setMinPriceHour(e.target.value)} />
                        <span>a</span>
                        <input name="maxPriceHour" className='border w-1/4' type="number" id="max-price-hour" step="0.1" min="1" value={maxPriceHour} onChange={(e) => setMaxPriceHour(e.target.value)} />
                        <span>€/hora</span>
                    </div> 
                </fieldset>
                : null
            }
                
            <div className='form-check'>
                <input name="isRentPerDay" value={isRentPerDay}
                onChange={(event) => {setIsRentPerDay(event.target.checked)}}
                className="form-check-input appearance-none 
                h-4 w-4 border border-gray-400 
                rounded-sm bg-white checked:bg-webcolor-50 
                checked:border-webcolor-50  focus:outline-none 
                transition duration-200 mt-1 align-top bg-no-repeat 
                bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="checkbox" id="flexCheckIsRentPerDay"></input>
                <label className="form-check-label inline-block text-webcolor-50" htmlFor="flexCheckisRentPerDay">
                    Alquiler por días
                </label>
            </div>

            {
                isRentPerDay ?
                <fieldset className='pt-4 flex'>
                    <div className='basis-1/2'>
                        <label htmlFor="minPriceDay">Precio por día: </label>
                        <input name="minPriceDay" className='border w-1/4' type="number" id="min-price-day" step="0.1" min="1" value={minPriceDay} onChange={(e) => setMinPriceDay(e.target.value)} />
                        <span>a</span>
                        <input name="maxPriceDay" className='border w-1/4' type="number" id="max-price-day" step="0.1" min="1" value={maxPriceDay} onChange={(e) => setMaxPriceDay(e.target.value)} />
                        <span>€/día</span>
                    </div> 
                </fieldset>
                : null
            }
            

            <div className='form-check'>
                <input name="isRentPerMonth" value={isRentPerMonth}
                onChange={(event) => {setIsRentPerMonth(event.target.checked)}}
                className="form-check-input appearance-none 
                h-4 w-4 border border-gray-400 
                rounded-sm bg-white checked:bg-webcolor-50 
                checked:border-webcolor-50  focus:outline-none 
                transition duration-200 mt-1 align-top bg-no-repeat 
                bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="checkbox" id="flexCheckIsRentPerMonth"></input>
                <label className="form-check-label inline-block text-webcolor-50" htmlFor="flexCheckisRentPerDay">
                    Alquiler por meses
                </label>
            </div>

            {
                isRentPerMonth ?
                <fieldset className='pt-4 flex'>
                    <div className='basis-1/2'>
                        <label htmlFor="minPriceMonth">Precio por mes: </label>
                        <input name="minPriceMonth" className='border w-1/4' type="number" id="min-price-month" step="0.1" min="1" value={minPriceMonth} onChange={(e) => setMinPriceMonth(e.target.value)} />
                        <span>a</span>
                        <input name="maxPriceMonth" className='border w-1/4' type="number" id="max-price-month" step="0.1" min="1" value={maxPriceMonth} onChange={(e) => setMaxPriceMonth(e.target.value)} />
                        <span>€/mes</span>
                    </div> 
                </fieldset>
                : null
            }

            <div className='flex items-center justify-center space-x-10'>
                <Button type='submit' color='secondary' className='text-lg border-2 mt-4'>Filtrar</Button>
            </div>
        </form>
        </div>
    )
}

export default Filter;