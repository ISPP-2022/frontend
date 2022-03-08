import React from 'react'
import Image from 'next/image'
import room_svg from '../../public/images/room.svg'
import garage_svg from '../../public/images/garage.svg'
import basement_svg from '../../public/images/basement.svg'
import storage_room_svg from '../../public/images/storage-room.svg'
import warehouse_svg from '../../public/images/warehouse.svg'
import other_svg from '../../public/images/other.svg'
import paperplane_svg from '../../public/images/paperplane.svg'
import tag_svg from '../../public/images/tag.svg'
import image_svg from '../../public/images/image.svg'
import { useState } from 'react'

export default function AdvertisementForm() {

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
        <main className='grid bg-webcolor-50 place-items-center md:py-4 md:w-screen'>
            <form className='bg-white text-webcolor-50 p-6 md:rounded-xl space-y-4 divide-y-2'>
                <p className='text-center'>INFORMACIÓN DE TU ESPACIO</p>
                <fieldset className='space-y-4'>
                    <p className='py-4'>Tipo de espacio</p>
                    <ul className='grid grid-cols-3'>
                        <li>
                            <input className='hidden peer' type="radio" id="room" name="space" value="room" />
                            <label htmlFor="room" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={room_svg} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Habitación</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="garage" name="space" value="garage" />
                            <label htmlFor="garage" className='flex justify-center  rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={garage_svg} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Garaje</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="basement" name="space" value="basement" />
                            <label htmlFor="basement" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={basement_svg} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Sótano</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="storage-room" name="space" value="storage-room" />
                            <label htmlFor="storage-room" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={storage_room_svg} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Trastero</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="warehouse" name="space" value="warehouse" />
                            <label htmlFor="warehouse" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={warehouse_svg} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Almacén</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="other" name="space" value="other" />
                            <label htmlFor="other" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={other_svg} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Otro</p>
                        </li>
                    </ul>           
                </fieldset>

                <fieldset className='space-y-4'>
                    <p className='py-4'>Tipo de alquiler</p>
                    <ul className='grid grid-cols-3'>
                        <li className='border-2'>
                            <input className='hidden peer' type="radio" id="hours" name="type" value="hours" onChange={(e) => setIsChecked(true)} />
                            <label htmlFor="hours" className='flex justify-center hover:bg-slate-100 peer-checked:bg-slate-200'>Horas</label>
                        </li>
                        <li className='border-2 text-center'>
                            <input className='hidden peer' type="radio" id="days" name="type" value="days" onChange={(e) => setIsChecked(false)} />
                            <label htmlFor="days" className='flex justify-center hover:bg-slate-100 peer-checked:bg-slate-200'>Días</label>
                        </li>
                        <li className='border-2 text-center'>
                            <input className='hidden peer' type="radio" id="months" name="type" value="months" onChange={(e) => setIsChecked(false)} />
                            <label htmlFor="months" className='flex justify-center hover:bg-slate-100 peer-checked:bg-slate-200'>Meses</label>
                        </li>
                    </ul>

                    <div className='md:grid md:grid-cols-2'>
                        <div className='py-4'>
                            <label htmlFor="start_hour" className='pr-4'>Hora de inicio</label>
                            <input className='border' disabled={!isChecked} type="time" id="start_hour"/>
                        </div>
                        <div className='py-4'>
                            <label htmlFor='end_hour' className='pr-9 md:pr-4'>Hora de fin</label>
                            <input className='border' disabled={!isChecked} type="time" id="end_hour"/>
                        </div>
                    </div>

                </fieldset>

                <fieldset className='grid grid-cols-3 gap-3 pt-4 '>
                    <label htmlFor="price">Precio</label>
                    <input className='border' type="number" id="price" step="0.01" min="0" />
                    <span>€</span>
                    
                    <label htmlFor="surface">Superficie</label>            
                    <input className='border' type="number" id="surface" step="0.1" min="0" />
                    <span>m&#178;</span>
                </fieldset>

                <fieldset className='space-y-4 space-x-4'>
                    <label htmlFor="location">Ubicación</label>
                    <input className="border" type="text" id="location" />
                </fieldset>

                <fieldset className='flex flex-row'>
                    <label htmlFor="availability" className='pt-4 pr-4'>
                        <span className='pr-4'>Disponibilidad</span>
                        <input className='border' type="date" id="availability"/>
                    </label>

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

                <fieldset className='space-y-4 space-x-4'>
                    <label htmlFor="tags">
                        <Image src={tag_svg} width="35"  height="35" />    
                    </label>
                    <select id="tags" multiple>
                        <option value="1">Etiqueta 1</option>    
                        <option value="2">Etiqueta 2</option>
                    </select>
                </fieldset>

                <fieldset className='space-x-4 pt-4 flex flex-row'>
                    <label className='inline-block' htmlFor='img'>
                        <Image src={image_svg} width='35' height='35' />    
                    </label>
                    <input className='pt-0' type="file" multiple id="img" name="img" accept="image/*" />
                </fieldset>

                <div className='pt-10 flex items-center justify-center'>
                    <button className='border-2 p-2 border-webcolor-50 hover:bg-slate-100' type="submit">
                        <span className='pr-2'>Publicar</span>
                        <Image src={paperplane_svg} width="15" height="15"/>
                    </button>
                </div>
            </form>
        </main>
    </div>
  )
}
