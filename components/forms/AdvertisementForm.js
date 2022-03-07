import React from 'react'
import Image from 'next/image'
import house_image from '../../public/images/house.png'
import garage_image from '../../public/images/garage.png'
import basement_image from '../../public/images/basement.png'
import storage_room_image from '../../public/images/storage-room.png'
import warehouse_image from '../../public/images/warehouse.png'
import other_image from '../../public/images/other.png'
import paperplane_image from '../../public/images/paperplane.png'



export default function AdvertisementForm() {
  return (
    <div>
        <main className='grid bg-blue-200 place-items-center py-4 md:w-screen'>
            <form className='bg-white text-blue-400 p-6 rounded-xl space-y-4 divide-y-2'>
                <p className='text-center'>INFORMACIÓN DE TU ESPACIO</p>
                <fieldset className='space-y-4'>
                    <p className='py-4'>Tipo de espacio</p>
                    <ul className='grid grid-cols-3'>
                        <li>
                            <input className='hidden peer' type="radio" id="room" name="space" value="room" />
                            <label htmlFor="room" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={house_image} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Habitación</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="garage" name="space" value="garage" />
                            <label htmlFor="garage" className='flex justify-center  rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={garage_image} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Garaje</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="basement" name="space" value="basement" />
                            <label htmlFor="basement" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={basement_image} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Sótano</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="storage-room" name="space" value="storage-room" />
                            <label htmlFor="storage-room" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={storage_room_image} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Trastero</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="warehouse" name="space" value="warehouse" />
                            <label htmlFor="warehouse" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={warehouse_image} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Almacén</p>
                        </li>

                        <li>
                            <input className='hidden peer' type="radio" id="other" name="space" value="other" />
                            <label htmlFor="other" className='flex justify-center rounded-xl hover:bg-slate-100 peer-checked:bg-slate-200'>
                                <Image src={other_image} width="100" height="100" />
                            </label>
                            <p className='flex justify-center'>Otro</p>
                        </li>
                    </ul>           
                </fieldset>

                <fieldset className='space-y-4'>
                    <p className='py-4'>Tipo de alquiler</p>
                    <ul className='grid grid-cols-3'>
                        <li className='border-2'>
                            <input className='hidden peer' type="radio" id="hours" name="type" value="hours" />
                            <label htmlFor="hours" className='flex justify-center hover:bg-slate-100 peer-checked:bg-slate-200'>Horas</label>
                        </li>
                        <li className='border-2 text-center'>
                            <input className='hidden peer' type="radio" id="days" name="type" value="days" />
                            <label htmlFor="days" className='flex justify-center hover:bg-slate-100 peer-checked:bg-slate-200'>Días</label>
                        </li>
                        <li className='border-2 text-center'>
                            <input className='hidden peer' type="radio" id="months" name="type" value="months" />
                            <label htmlFor="months" className='flex justify-center hover:bg-slate-100 peer-checked:bg-slate-200'>Meses</label>
                        </li>
                    </ul>
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
                    <input className="border" type="text" id="location" size="30" />
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
                    <label htmlFor="tags">Etiquetas</label>
                    <select id="tags" multiple>
                        <option value="1">Etiqueta 1</option>    
                        <option value="2">Etiqueta 2</option>
                    </select>
                </fieldset>

                <fieldset className='space-y-4 space-x-4'>
                    <label>Imágenes</label>
                    <input type="file" multiple id="img" name="img" accept="image/*" />
                </fieldset>

                <div className='pt-10 flex items-center justify-center'>
                    <button className=' border-2 p-2 border-indigo-700' type="submit">
                        <span className='pr-2'>Publicar</span>
                        <Image src={paperplane_image} width="15" height="15"/>
                    </button>
                </div>
            </form>
        </main>
    </div>
  )
}
