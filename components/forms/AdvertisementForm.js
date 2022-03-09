import { useState } from 'react'
import Image from 'next/image'
import { Button } from '../Core/Button';

/**
 * Add advertisement form
 * @param  {boolean} isEdit - if true, the form is for creating a new one; if false, 
 * the form is for editing/deleting
 */

export default function AdvertisementForm(props) {

    // Variable para mostrar/ocultar hora de inicio/fin
    const [isChecked, setIsChecked] = useState(false);

    // Variables para los inputs
    const [space, setSpace] = useState('');
    
    const [type, setType] = useState('');

    function handleTypeChange(event) {
        setType(event.target.value);
        if (event.target.value == 'hours') {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');

    const [price, setPrice] = useState(1);
    const [surface1, setSurface1] = useState(1);
    const [surface2, setSurface2] = useState(1);
    const [location, setLocation] = useState('');

    const [startAvailability, setStartAvailability] = useState();
    const [endAvailability, setEndAvailability] = useState();
    
    const [shared, setShared] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isEdit, setIsEdit] = useState(props.isEdit);

    // Faltan etiquetas, imágenes...

    const [errors, setErrors] = useState([]);


    /* Tipos de validaciones:
    - Espacio: not empty. 
    - Tipo de alquiler: not empty.
    - Horas de inicio y fin: deben estar obligatorio si se selecciona "horas", inicio>fin, salto de 1 hora al menos
    - Precio: >0
    - Superficie: >0, >0
    - Ubicación: not empty.
    - Disponibilidad: inicio>fin; si el tipo es "Months" la diferencia debe ser de al menos 30 días
    - Compartido: true o false
    - Título: not empty.
    - Descripción: not empty.
    - Etiquetas: ¿cada una de las escogidas tiene que ser una de las posibles opciones?
    - Imágenes: ¿?
    */

    function handleSubmit(e) {
        e.preventDefault();

        let errorsArray = [];
        if (space == '') {
            errorsArray.push('Escoge un tipo de espacio.');
        }

        if (type == '') {
            errorsArray.push('Escoge un tipo de alquiler.');
        }

        if ((type == 'hours') && (startHour=='' || endHour=='')) {
            errorsArray.push('Selecciona un tramo horario.');
        }

        if ((type == 'hours') && (startHour>endHour)) {
            errorsArray.push('La hora de inicio debe ser anterior a la fecha de fin.');
        }

        if (startAvailability>endAvailability) {
            errorsArray.push('La fecha de inicio de disponibilidad debe ser anterior a la fecha de fin.');
        }

        if (type=='months') {
            const date1 = new Date(startAvailability);
            const date2 = new Date(endAvailability);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if (diffDays<30) {
                errorsArray.push('Si se indica un alquiler de meses, la disponibilidad debe ser al menos de 30 días.');
            }
        }
        
        setErrors(errorsArray);
    }


    return (
        <div>
            <main className='grid bg-[#e6f6fa]  place-items-center md:py-4 '>
                <form onSubmit={handleSubmit}className='bg-white text-webcolor-50 p-6 md:rounded-xl w-full md:w-[750px] space-y-4 divide-y-2'>
                    <p className='text-center'>INFORMACIÓN DE TU ESPACIO</p>
                    <>
                        {errors.map((error) => <p key={error} className='text-red-600'>{error}</p>)}
                    </>

                    {/* Tipos de espacios */}
                    <fieldset className='space-y-4'>
                        <p className='py-4'>Tipo de espacio</p>
                        <ul className='grid grid-cols-3'>
                            <li>
                                <input className='hidden peer' type="radio" id="room" name="space" value="room" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="room" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/room.svg" width="100" height="100" alt='room' />
                                </label>
                                <p className='flex justify-center'>Habitación</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="garage" name="space" value="garage" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="garage" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/garage.svg" width="100" height="100" alt='garage' />
                                </label>
                                <p className='flex justify-center'>Garaje</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="basement" name="space" value="basement" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="basement" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/basement.svg" width="100" height="100" alt='basement' />
                                </label>
                                <p className='flex justify-center'>Sótano</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="storage-room" name="space" value="storage-room" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="storage-room" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/storage-room.svg" width="100" height="100" alt='storage-room' />
                                </label>
                                <p className='flex justify-center'>Trastero</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="warehouse" name="space" value="warehouse" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="warehouse" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/warehouse.svg" width="100" height="100" alt='warehouse' />
                                </label>
                                <p className='flex justify-center'>Almacén</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="other" name="space" value="other" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="other" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/other.svg" width="100" height="100" alt='other' />
                                </label>
                                <p className='flex justify-center'>Otro</p>
                            </li>
                        </ul>
                    </fieldset>

                    {/* Tipos de alquiler:por horas, días o meses */}
                    <fieldset className='space-y-4'>
                        <p className='py-4'>Tipo de alquiler</p>
                        <ul className='grid grid-cols-3'>
                            <li className='border-2 border-webcolor-50'>
                                <input className='hidden peer' type="radio" id="hours" name="type" value="hours" onChange={(e) => handleTypeChange(e)} />
                                <label htmlFor="hours" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Horas</label>
                            </li>
                            <li className='border-2 border-webcolor-50 text-center'>
                                <input className='hidden peer' type="radio" id="days" name="type" value="days" onChange={(e) => handleTypeChange(e)} />
                                <label htmlFor="days" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Días</label>
                            </li>
                            <li className='border-2 border-webcolor-50 text-center'>
                                <input className='hidden peer' type="radio" id="months" name="type" value="months" onChange={(e) => handleTypeChange(e)} />
                                <label htmlFor="months" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Meses</label>
                            </li>
                        </ul>
                        {isChecked ?
                            <div className='md:grid md:grid-cols-2 flex'>
                                <div className='py-4 basis-1/2'>
                                    <label htmlFor="start_hour" className='pr-4'>Hora de inicio</label>
                                    <input className='border' type="time" id="start_hour" onChange={(e) => setStartHour(e.target.value)} />
                                </div>
                                <div className='py-4 basis-1/2'>
                                    <label htmlFor='end_hour' className='pr-9 md:pr-4'>Hora de fin</label>
                                    <input className='border' type="time" id="end_hour" onChange={(e) => setEndHour(e.target.value)} />
                                </div>
                            </div> : <></>
                        }


                    </fieldset>

                    {/* Precio y Superficie */}
                    <fieldset className='pt-4 flex'>
                        <div className='basis-1/2'>
                            <label htmlFor="price">Precio: </label>
                            <input className='border w-1/3' type="number" id="price" step="0.01" min="1" value={price} onChange={(e) => setPrice(e.target.value)} />
                            <span>€</span>
                        </div>
                        <div className='basis-1/2'>
                            <label htmlFor="surface">Superficie: </label>
                            <input className='border w-1/4' required  type="number" id="surface-1" step="0.1" min="1" value={surface1} onChange={(e) => setSurface1(e.target.value)} />
                            x
                            <input className='border w-1/4' required type="number" id="surface-2" step="0.1" min="1" value={surface2} onChange={(e) => setSurface2(e.target.value)}/>
                            <span>m</span>
                        </div>
                    </fieldset>

                    {/* Ubicación */}
                    <fieldset className='space-y-4 space-x-4'>
                        <label htmlFor="location">Ubicación:</label>
                        <input className="border" required type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </fieldset>

                    {/* Disponibilidad */}
                    <fieldset className='flex flex-row'>
                        <label htmlFor="availability" className='pt-4'>
                            <span className='pr-4'>Disponibilidad: </span>
                            <input className='border' required type="date" id="start_availability" value={startAvailability} onChange={(e) => setStartAvailability(e.target.value)}  />
                            -
                            <input className='border' required type="date" id="end_availability" value={endAvailability} onChange={(e) => setEndAvailability(e.target.value)} />
                        </label>


                    </fieldset>

                    {/* ¿Espacio compartido? */}
                    <fieldset className='flex flex-row'>
                        <label htmlFor="share" className="group pt-4">
                            Compartido
                            <input id="share" type="checkbox" className="hidden peer appearance-none rounded-md" value={shared} onChange={(e) => setShared(!shared)}/>
                            <span className="w-12 h-6 inline-flex flex-shrink-0 p-1 ml-4 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                        </label>
                    </fieldset>

                    {/* Título */}
                    <fieldset className='space-y-4 space-x-4'>
                        <label htmlFor="title">Título</label>
                        <input className='border' required type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </fieldset>

                    {/* Descripción */}
                    <fieldset className='space-y-4 space-x-4'>
                        <label htmlFor="description">Descripción</label>
                        <input className='border' required type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </fieldset>

                    {/* Etiquetas */}
                    <fieldset className='space-y-4 space-x-4 flex p-2'>
                        <label htmlFor="tags">
                            <Image src="/images/tag.svg" width="35" height="35" alt='tag' />
                        </label>
                        <select id="tags" multiple>
                            <option value="1">Etiqueta 1</option>
                            <option value="2">Etiqueta 2</option>
                        </select>
                    </fieldset>

                    {/* Imágenes */}
                    <fieldset className='space-x-4 pt-4 flex flex-row'>
                        <label className='inline-block' htmlFor='img'>
                            <Image src="/images/image.svg" width='100' height='100' alt='image' />
                        </label>
                        <input className='pt-0 hidden' type="file" multiple id="img" name="img" accept="image/*" />
                    </fieldset>

                    {isEdit==false &&
                        <div className='pt-10 flex items-center justify-center'>
                            <button className='border-2 py-2 px-4 border-webcolor-50 rounded hover:bg-slate-100 flex items-center' type="submit">
                                <span className='pr-2 text-lg'>Publicar</span>
                                <Image src="/images/paperplane.svg" width="20" height="20" alt='send' />
                            </button>
                        </div>
                    }

                    {isEdit==true &&
                        <div className='flex items-center justify-center space-x-10'>
                            <Button type='submit' color='secondary' onClick='' className='text-lg border-2 mt-4'>Actualizar</Button>
                            <Button type='submit' color='red' onClick='' className='text-lg border-2 mt-4'>Eliminar</Button>
                        </div>
                    }

                </form>
            </main>
        </div>
    )

    rf
}
