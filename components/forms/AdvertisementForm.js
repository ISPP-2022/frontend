import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../Core/Button';
import Head from 'next/head';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import PostUpdateVerification, { CreateNewSpaceObject } from './PostUpdateAuxiliar';
import axios from 'axios';

/**
 * Add advertisement form
 * @param  {boolean} isEdit - if true, the form is for creating a new one; if false, 
 * the form is for editing/deleting
 * @param  {int} userId - id from authToken 
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

    const [startAvailability, setStartAvailability] = useState('');
    const [endAvailability, setEndAvailability] = useState();
    
    const [shared, setShared] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isEdit, setIsEdit] = useState(props.isEdit);

    const [tags, setTags] = useState([]);

    function handleChangeTags(e) {
        const updatedTags = [...e.target.options]
            .filter(option => option.selected)
            .map(x => x.value);
        setTags(updatedTags);
    }

    const [images, setImages] = useState([]);

    {/* Convierte los archivos a base64 y los guarda en images */}
    async function handleFiles(e) {
        setImages([]);      
        let array1 = Array.from(e.target.files);
        let array2 = [];
        for (let file of array1) {
            var imageBase64 = await readFileAsDataURL(file);
            array2.push(imageBase64.split(',')[1]);
        }
        setImages(array2);
    }

    async function readFileAsDataURL(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
        return result_base64;
    }

    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);


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

    // Cargar campo para introducir dirección
    useEffect(() => {
            
        const geocoder = new MapboxGeocoder({
            countries: 'es',
            accessToken: process.env.NEXT_PUBLIC_API_KEY_MAPBOX
        });
        
        geocoder.addTo('#geocoder');
        
        // Add geocoder result to container.
        geocoder.on('result', (e) => {
            if (e.result.geometry.coordinates[0].toString()!=null && e.result.geometry.coordinates[1].toString()!=null) {
                setLocation(e.result.geometry.coordinates[1].toString() + ',' + e.result.geometry.coordinates[0].toString());
            }
        });
    }, []);


    function handleSubmit(e) {
        e.preventDefault();

        // Vacía los errores al hacer un nuevo submit
        setErrors([]);
        setSuccess(false);

        // Realiza las validaciones
        let errorsArray = (PostUpdateVerification(startHour, endHour, startAvailability, endAvailability, location, 
            shared, type, space));


        // Si no hay errores, hacemos POST/UPDATE
        if (errorsArray.length == 0) {
            // Crea un objeto con los atributos adecuados
            let newSpace = CreateNewSpaceObject(props.userId, title, description, startAvailability, endAvailability, location,
                surface1, surface2, shared, type, price, tags, space, images);

            console.log(newSpace);
            
            axios.post(`http://localhost:4100/api/v1/spaces`, newSpace, {
                withCredentials: true,
            })
            .then(res => {
                setSuccess(true);
            }).catch(err => {
                setErrors(['Datos no válidos']);
            });

        } else {
            setErrors(errorsArray);
        }
    }


    return (
        <>
        {/* Estilo para el input de localizacion */}
        <Head>
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet"/>
        </Head>

        {/*Localizacion*/ }
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css"></link>
        
        <div>
            <main className='grid bg-[#e6f6fa]  place-items-center md:py-4 '>
                <form onSubmit={handleSubmit} className='bg-white text-webcolor-50 p-6 md:rounded-xl w-full md:w-[750px] space-y-4 divide-y-2'>
                    <p className='text-center'>INFORMACIÓN DE TU ESPACIO</p>

                    {/* Tipos de espacios */}
                    <fieldset className='space-y-4'>
                        <p className='py-4'>Tipo de espacio</p>
                        <ul className='grid grid-cols-3'>
                            <li>
                                <input className='hidden peer' type="radio" id="room" name="space" value="HOUSE_ROOM" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="room" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/room.svg" width="100" height="100" alt='room' />
                                </label>
                                <p className='flex justify-center'>Habitación</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="garage" name="space" value="GARAGE" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="garage" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/garage.svg" width="100" height="100" alt='garage' />
                                </label>
                                <p className='flex justify-center'>Garaje</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="basement" name="space" value="BASEMENT" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="basement" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/basement.svg" width="100" height="100" alt='basement' />
                                </label>
                                <p className='flex justify-center'>Sótano</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="storage-room" name="space" value="STORAGE_ROOM" onChange={(e) => setSpace(e.target.value)} />
                                <label htmlFor="storage-room" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                    <Image src="/images/storage-room.svg" width="100" height="100" alt='storage-room' />
                                </label>
                                <p className='flex justify-center'>Trastero</p>
                            </li>

                            <li>
                                <input className='hidden peer' type="radio" id="warehouse" name="space" value="INDUSTRIAL_WAREHOUSE" onChange={(e) => setSpace(e.target.value)} />
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
                        <label htmlFor="geocoder">Ubicación:</label>
                        <div id="geocoder"></div>
                    </fieldset>

                    {/* Disponibilidad */}
                    <fieldset className='flex flex-row'>
                        <label htmlFor="availability" className='pt-4'>
                            <span className='pr-4'>Disponibilidad: </span>
                            <input className='border' required type="date" id="start_availability" value={startAvailability} onChange={(e) => setStartAvailability(e.target.value)}  />
                            -
                            <input className='border' type="date" id="end_availability" value={endAvailability} onChange={(e) => setEndAvailability(e.target.value)} />
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
                        <input className='border' required type="text" id="title" minLength="3" maxLength="50" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                        <select id="tags" multiple 
                            onChange={handleChangeTags} value={tags}>
                            <option value="GROUND_FLOOR">Planta baja</option>
                            <option value="FLOOR_1">Primera planta</option>
                            <option value="FLOOR_2">Segunda planta</option>
                            <option value="FLOOR_3UP">Tercera planta o superior</option>
                            <option value="OFFICE_ROOM">Oficina</option>
                            <option value="PENTHOUSE">Ático</option>
                            <option value="ELEVATOR">Con ascensor</option>
                            <option value="WET">Húmedo</option>
                            <option value="DRY">Seco</option>
                            <option value="COLD">Frío</option>
                            <option value="WARM">Templado</option>
                            <option value="HOT">Caluroso</option>
                            <option value="SECURITY_ALARM">Alarma de seguridad</option>
                            <option value="VIDEO_MONITORING">Videovigilancia</option>
                            <option value="FIRE_ALARM">Alarma antiincendios</option>
                            <option value="SOCKET">Con enchufe</option>
                            <option value="INDOOR">Interior</option>
                            <option value="OUTDOOR">Exterior</option>
                            <option value="NARROW_ACCESS">Acceso estrecho</option>
                            <option value="MEDIUM_WIDTH_ACCESS">Acceso de anchura media</option>
                            <option value="WIDE_ACCESS">Acceso amplio</option>
                        </select>
                    </fieldset>

                    {/* Imágenes */}
                    <fieldset className='space-x-4 pt-4 flex flex-row'>
                        <label className='inline-block' htmlFor='img'>
                            <Image src="/images/image.svg" width='100' height='100' alt='image' />
                        </label>
                        <div className='pt-10'>Suba imágenes pulsando el icono (PNG o JPEG). {images.length} imágenes subidas.</div>
                        <input className='pt-0 hidden' onChange={handleFiles} type="file" multiple id="img" name="img" accept="image/png,image/jpeg" />
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

                    <>
                        {errors.map((error) => <p key={error} className='text-red-600'>{error}</p>)}
                        {success==true &&
                            <p className='text-green-600'>Espacio creado con éxito.</p>
                        
                        }
                    </>
                </form>
            </main>
        </div>
        </>
    )

}
