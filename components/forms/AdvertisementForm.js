import { useState } from 'react'
import Image from 'next/image'

export default function AdvertisementForm() {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <div>
            <main className='grid bg-[#e6f6fa]  place-items-center md:py-4 '>
                <form className='bg-white text-webcolor-50 p-6 md:rounded-xl w-full md:w-[750px] space-y-4 divide-y-2'>
                    <p className='text-center'>INFORMACIÓN DE TU ESPACIO</p>
                    <fieldset className='space-y-4'>
                        <p className='py-4'>Tipo de espacio</p>
                        <ul className='grid grid-cols-3'>
                            <li>
                                <input className='hidden peer' type="radio" id="room" name="space" value="room" />
                                <label htmlFor="room" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                    <Image src="/images/room.svg" width="100" height="100" alt='room' />
                                </label>
                                <p className='flex justify-center'>Habitación</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="garage" name="space" value="garage" />
                                <label htmlFor="garage" className='flex justify-center  rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                    <Image src="/images/garage.svg" width="100" height="100" alt='garage' />
                                </label>
                                <p className='flex justify-center'>Garaje</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="basement" name="space" value="basement" />
                                <label htmlFor="basement" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                    <Image src="/images/basement.svg" width="100" height="100" alt='basement' />
                                </label>
                                <p className='flex justify-center'>Sótano</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="storage-room" name="space" value="storage-room" />
                                <label htmlFor="storage-room" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                    <Image src="/images/storage-room.svg" width="100" height="100" alt='storage-room' />
                                </label>
                                <p className='flex justify-center'>Trastero</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="warehouse" name="space" value="warehouse" />
                                <label htmlFor="warehouse" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                    <Image src="/images/warehouse.svg" width="100" height="100" alt='warehouse' />
                                </label>
                                <p className='flex justify-center'>Almacén</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="other" name="space" value="other" />
                                <label htmlFor="other" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                    <Image src="/images/other.svg" width="100" height="100" alt='other' />
                                </label>
                                <p className='flex justify-center'>Otro</p>
                            </li>
                        </ul>
                    </fieldset>

                    <fieldset className='space-y-4'>
                        <p className='py-4'>Tipo de alquiler</p>
                        <ul className='grid grid-cols-3'>
                            <li className='border-2 border-webcolor-50'>
                                <input className='hidden peer' type="radio" id="hours" name="type" value="hours" onChange={(e) => setIsChecked(true)} />
                                <label htmlFor="hours" className='flex justify-center hover:bg-slate-100 peer-checked:bg-[#e6f6fa]'>Horas</label>
                            </li>
                            <li className='border-2 border-webcolor-50 text-center'>
                                <input className='hidden peer' type="radio" id="days" name="type" value="days" onChange={(e) => setIsChecked(false)} />
                                <label htmlFor="days" className='flex justify-center hover:bg-slate-100 peer-checked:bg-[#e6f6fa]'>Días</label>
                            </li>
                            <li className='border-2 border-webcolor-50 text-center'>
                                <input className='hidden peer' type="radio" id="months" name="type" value="months" onChange={(e) => setIsChecked(false)} />
                                <label htmlFor="months" className='flex justify-center hover:bg-slate-100 peer-checked:bg-[#e6f6fa]'>Meses</label>
                            </li>
                        </ul>
                        {isChecked ?
                            <div className='md:grid md:grid-cols-2 flex'>
                                <div className='py-4 basis-1/2'>
                                    <label htmlFor="start_hour" className='pr-4'>Hora de inicio</label>
                                    <input className='border' type="time" id="start_hour" />
                                </div>
                                <div className='py-4 basis-1/2'>
                                    <label htmlFor='end_hour' className='pr-9 md:pr-4'>Hora de fin</label>
                                    <input className='border' type="time" id="end_hour" />
                                </div>
                            </div> : <></>
                        }


                    </fieldset>

                    <fieldset className='pt-4 flex'>
                        <div className='basis-1/2'>
                            <label htmlFor="price">Precio: </label>
                            <input className='border w-1/3' type="number" id="price" step="0.01" min="0" />
                            <span>€</span>
                        </div>
                        <div className='basis-1/2'>
                            <label htmlFor="surface">Superficie: </label>
                            <input className='border w-1/4' type="number" id="surface" step="0.1" min="0" />
                            x
                            <input className='border w-1/4' type="number" id="surface" step="0.1" min="0" />
                            <span>m</span>
                        </div>
                    </fieldset>

                    <fieldset className='space-y-4 space-x-4'>
                        <label htmlFor="location">Ubicación</label>
                        <input className="border" type="text" id="location" />
                    </fieldset>

                    <fieldset className='flex flex-row'>
                        <label htmlFor="availability" className='pt-4'>
                            <span className='pr-4'>Disponibilidad: </span>
                            <input className='border' type="date" id="start_availability" />
                            -
                            <input className='border' type="date" id="end_availability" />
                        </label>


                    </fieldset>

                    <fieldset className='flex flex-row'>
                        <label htmlFor="share" className="group pt-4">
                            Compartido
                            <input id="share" type="checkbox" className="peer appearance-none rounded-md" />
                            <span className="w-12 h-6 inline-flex flex-shrink-0 p-1 ml-4 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                        </label>
                    </fieldset>

                    <fieldset className='space-y-4 space-x-4'>
                        <label htmlFor="title">Título</label>
                        <input className='border' type="text" id="title" />
                    </fieldset>

                    <fieldset className='space-y-4 space-x-4'>
                        <label htmlFor="description">Descripción</label>
                        <input className='border' type="text" id="description" />
                    </fieldset>

                    <fieldset className='space-y-4 space-x-4 flex p-2'>
                        <label htmlFor="tags">
                            <Image src="/images/tag.svg" width="35" height="35" alt='tag' />
                        </label>
                        <select id="tags" multiple>
                            <option value="1">Etiqueta 1</option>
                            <option value="2">Etiqueta 2</option>
                        </select>
                    </fieldset>

                    <fieldset className='space-x-4 pt-4 flex flex-row'>
                        <label className='inline-block' htmlFor='img'>
                            <Image src="/images/image.svg" width='100' height='100' alt='image' />
                        </label>
                        <input className='pt-0 hidden' type="file" multiple id="img" name="img" accept="image/*" />
                    </fieldset>

                    <div className='pt-10 flex items-center justify-center'>
                        <button className='border-2 py-2 px-4 border-webcolor-50 rounded hover:bg-slate-100 flex items-center' type="submit">
                            <span className='pr-2 text-lg'>Publicar</span>
                            <Image src="/images/paperplane.svg" width="20" height="20" alt='send' />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
