import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../Core/Button';
import Head from 'next/head';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import PostUpdateVerification, { CreateNewSpaceObject } from './PostUpdateAuxiliar';
import axios from 'axios';
import { useRouter } from 'next/router';

/**
 * Add advertisement form
 * @param  {boolean} isEdit - if true, the form is for creating a new one; if false, 
 * the form is for editing/deleting
 * @param  {int} userId - id from authToken 
 */


export default function AdvertisementForm(props) {
    // Para redirigir en caso de publish/edit/idquenoexiste
    const router = useRouter();

    // Variables para los inputs
    const [space, setSpace] = useState('');

    const [type, setType] = useState('');
    const [startHour, setStartHour] = useState('00:00');
    const [endHour, setEndHour] = useState('00:00');
    const [price, setPrice] = useState(1);
    const [surface1, setSurface1] = useState(1);
    const [surface2, setSurface2] = useState(1);
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');

    const [startAvailability, setStartAvailability] = useState('');
    const [endAvailability, setEndAvailability] = useState('');

    const [shared, setShared] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [tags, setTags] = useState([]);

    function handleChangeTags(e) {
        const updatedTags = [...e.target.options]
            .filter(option => option.selected)
            .map(x => x.value);
        setTags(updatedTags);
    }

    const [images, setImages] = useState([]);

    // Convierte los archivos a base64 y los guarda en images
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

    // Cargar campo para introducir dirección
    useEffect(() => {
        if (props.isEdit) {
            fillForm(props.space);
        } else {
            setGeocoder();
        }
    }, []);

    // Gestiona la API de Mapbox
    // query: opcional, son un par de coordenadas para obtener la dirección al editar el espacio
    function setGeocoder(query) {
        const geocoder = new MapboxGeocoder({
            countries: 'es',
            types: 'address',
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
            reverseGeocode: true
        });

        geocoder.addTo('#geocoder');
        if (query) {
            geocoder.query(query);
        }

        // Add geocoder result to container.
        geocoder.on('result', (e) => {
            if (e.result.geometry.coordinates[0].toString() != null && e.result.geometry.coordinates[1].toString() != null) {
                let placeName = e.result.place_name;
                let placeNameArray = placeName.split(',');
                let cityS = placeNameArray[1].trim().split(' ').splice(1).join(' ');
                let provinceS = placeNameArray[2].trim();
                let countryS = placeNameArray[3].trim();
                setCity(cityS);
                setProvince(provinceS);
                setCountry(countryS);
                setLocation(e.result.geometry.coordinates[1].toString() + ',' + e.result.geometry.coordinates[0].toString());
            }
        });
    }


    // Se usa al editar para rellenar los campos del formulario automáticamente
    function fillForm(space) {
        setTitle(space.name);
        setDescription(space.description);

        setStartAvailability(space.initialDate.split('T')[0]);

        if ('finalDate' in space) {
            setEndAvailability(space.finalDate.split('T')[0]);
        }

        // Crea Geocoder y pasa de coordenadas a dirección
        setGeocoder(space.location);

        let dimensions = space.dimensions.split('x');
        setSurface1(dimensions[0]);
        setSurface2(dimensions[1]);

        if ('priceHour' in space) {
            setType('hours');
            setPrice(space.priceHour);
            document.getElementById('hours').checked = true;
        } else if ('priceDay' in space) {
            setType('days');
            setPrice(space.priceDay);
            document.getElementById('days').checked = true;
        } else if ('priceMonth' in space) {
            setType('months');
            setPrice(space.priceMonth);
            document.getElementById('months').checked = true;
        }

        if (space.shared) {
            document.getElementById('share').checked = true;
        }

        setShared(space.shared);

        for (var i = 0; i < space.tags.length; i++) {
            var tag = space.tags[i].tag;
            if (['HOUSE_ROOM', 'GARAGE', 'BASEMENT', 'WAREHOUSE', 'STORAGE_ROOM', 'OTHER'].includes(tag)) {
                document.getElementById(tag).checked = true;
                setSpace(tag);
            }
        }

        setTags(tags);

        // Petición para coger las imágenes
        // Da 404 si no tiene imágenes o el id no existe
        axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}/images`)
            .then(res => {
                setImages(res.data);
            }).catch(err => {
                setImages([]);
            })
    }


    function handleSubmit(e) {
        e.preventDefault();

        // Vacía los errores al hacer un nuevo submit
        setErrors([]);

        let startHourdate = (new Date()).setHours(startHour.split(':')[0], startHour.split(':')[1]);
        let endHourdate = (new Date()).setHours(endHour.split(':')[0], endHour.split(':')[1]);
        // Realiza las validaciones
        let errorsArray = (PostUpdateVerification(startHourdate, endHourdate, startAvailability, endAvailability, location,
            shared, type, space, title, description));

        // Si no hay errores, hacemos POST/UPDATE
        if (errorsArray.length == 0) {
            // Crea un objeto con los atributos adecuados
            let newSpace = CreateNewSpaceObject(props.userId, title, description, startAvailability, endAvailability, location,
                surface1, surface2, shared, type, price, tags, space, images, startHourdate, endHourdate, city, province, country);
            console.log(newSpace);
            // Si es edit --> PUT
            if (props.isEdit) {
                axios.put(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}`, newSpace, {
                    withCredentials: true,
                })
                    .then(res => {
                        setSuccess(true);
                        router.push('/');
                    }).catch(err => {
                        setErrors(['Ha habido un problema. Inténtelo más tarde.']);
                    });

                // Si no es edit --> POST
            } else {
                axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces`, newSpace, {
                    withCredentials: true,
                })
                    .then(res => {
                        setSuccess(true);
                        router.push('/')
                    }).catch(err => {
                        setErrors(['Ha habido un problema. Inténtelo más tarde.']);
                    });
            }
        } else {
            setErrors(errorsArray);
        }
    }

    function handleDelete() {
        axios.delete(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${props.space.id}`, {
            withCredentials: true,
        })
            .then(res => {
                router.push("/");
            }).catch(err => {
                setErrors(['Ha habido un problema. Inténtelo más tarde.']);
            });
    }


    return (
        <>
            {/* Estilo para el input de localizacion */}
            <Head>
                <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet" />
            </Head>

            {/*Localizacion*/}
            <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css"></link>

            <div>
                <main className='grid bg-gray-100  place-items-center md:py-4 '>
                    <form onSubmit={handleSubmit} className='bg-white text-webcolor-50 p-6 md:rounded-xl w-full md:w-[750px] space-y-4 divide-y-2'>
                        <p className='text-center'>INFORMACIÓN DE TU ESPACIO</p>

                        {/* Tipos de espacios */}
                        <fieldset className='space-y-4'>
                            <p className='py-4'>Tipo de espacio</p>
                            <ul className='grid grid-cols-3'>
                                <li>
                                    <input className='hidden peer' type="radio" id="HOUSE_ROOM" name="space" value="HOUSE_ROOM" onChange={(e) => setSpace(e.target.value)} />
                                    <label htmlFor="HOUSE_ROOM" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                        <Image src="/images/room.svg" width="100" height="100" alt='room' />
                                    </label>
                                    <p className='flex justify-center'>Habitación</p>
                                </li>

                                <li>
                                    <input className='hidden peer' type="radio" id="GARAGE" name="space" value="GARAGE" onChange={(e) => setSpace(e.target.value)} />
                                    <label htmlFor="GARAGE" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                        <Image src="/images/garage.svg" width="100" height="100" alt='garage' />
                                    </label>
                                    <p className='flex justify-center'>Garaje</p>
                                </li>

                                <li>
                                    <input className='hidden peer' type="radio" id="BASEMENT" name="space" value="BASEMENT" onChange={(e) => setSpace(e.target.value)} />
                                    <label htmlFor="BASEMENT" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                        <Image src="/images/basement.svg" width="100" height="100" alt='basement' />
                                    </label>
                                    <p className='flex justify-center'>Sótano</p>
                                </li>

                                <li>
                                    <input className='hidden peer' type="radio" id="STORAGE_ROOM" name="space" value="STORAGE_ROOM" onChange={(e) => setSpace(e.target.value)} />
                                    <label htmlFor="STORAGE_ROOM" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                        <Image src="/images/storage-room.svg" width="100" height="100" alt='storage-room' />
                                    </label>
                                    <p className='flex justify-center'>Trastero</p>
                                </li>

                                <li>
                                    <input className='hidden peer' type="radio" id="WAREHOUSE" name="space" value="INDUSTRIAL_WAREHOUSE" onChange={(e) => setSpace(e.target.value)} />
                                    <label htmlFor="WAREHOUSE" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
                                        <Image src="/images/warehouse.svg" width="100" height="100" alt='warehouse' />
                                    </label>
                                    <p className='flex justify-center'>Almacén</p>
                                </li>

                                <li>
                                    <input className='hidden peer' type="radio" id="OTHER" name="space" value="OTHERS" onChange={(e) => setSpace(e.target.value)} />
                                    <label htmlFor="OTHER" className='flex justify-center rounded-xl hover:bg-gray-200 peer-checked:bg-[#e6f6fa]'>
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
                                    <input className='hidden peer' type="radio" id="hours" name="type" value="hours" onChange={(e) => setType(e.target.value)} />
                                    <label htmlFor="hours" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Horas</label>
                                </li>
                                <li className='border-2 border-webcolor-50 text-center'>
                                    <input className='hidden peer' type="radio" id="days" name="type" value="days" onChange={(e) => setType(e.target.value)} />
                                    <label htmlFor="days" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Días</label>
                                </li>
                                <li className='border-2 border-webcolor-50 text-center'>
                                    <input className='hidden peer' type="radio" id="months" name="type" value="months" onChange={(e) => setType(e.target.value)} />
                                    <label htmlFor="months" className='flex justify-center hover:bg-gray-100 peer-checked:bg-[#e6f6fa]'>Meses</label>
                                </li>
                            </ul>
                        </fieldset>

                        {type === 'hours' ? (
                            <fieldset className='pt-4 flex space-x-2'>
                                <div className='basis-1/2 flex justify-end'>
                                    <input type="time" value={startHour} onChange={(e) => { setStartHour(e.target.value) }} />
                                </div>
                                <div className='basis-1/2'>
                                    <input type="time" value={endHour} onChange={(e) => { setEndHour(e.target.value) }} />
                                </div>
                            </fieldset>
                        ) : <></>}

                        {/* Precio y Superficie */}
                        <fieldset className='pt-4 flex'>
                            <div className='basis-1/2'>
                                <label htmlFor="price">Precio: </label>
                                <input className='border w-1/3' type="number" id="price" step="0.01" min="1" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <span>€</span>
                            </div>
                            <div className='basis-1/2'>
                                <label htmlFor="surface">Superficie: </label>
                                <input className='border w-1/4' required type="number" id="surface-1" step="0.1" min="1" value={surface1} onChange={(e) => setSurface1(e.target.value)} />
                                x
                                <input className='border w-1/4' required type="number" id="surface-2" step="0.1" min="1" value={surface2} onChange={(e) => setSurface2(e.target.value)} />
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
                                <input className='border' required type="date" id="start_availability" value={startAvailability} onChange={(e) => setStartAvailability(e.target.value)} />
                                -
                                <input className='border' type="date" id="end_availability" value={endAvailability} onChange={(e) => setEndAvailability(e.target.value)} />
                            </label>


                        </fieldset>

                        {/* ¿Espacio compartido? */}
                        <fieldset className='flex flex-row'>
                            <label htmlFor="share" className="group pt-4">
                                Compartido
                                <input id="share" type="checkbox" className="hidden peer appearance-none rounded-md" value={shared} onChange={(e) => setShared(!shared)} />
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
                                <option id="GROUND_FLOOR" value="GROUND_FLOOR">Planta baja</option>
                                <option id="FLOOR_1" value="FLOOR_1">Primera planta</option>
                                <option id="FLOOR_2" value="FLOOR_2">Segunda planta</option>
                                <option id="FLOOR_3UP" value="FLOOR_3UP">Tercera planta o superior</option>
                                <option id="OFFICE_ROOM" value="OFFICE_ROOM">Oficina</option>
                                <option id="PENTHOUSE" value="PENTHOUSE">Ático</option>
                                <option id="ELEVATOR" value="ELEVATOR">Con ascensor</option>
                                <option id="WET" value="WET">Húmedo</option>
                                <option id="DRY" value="DRY">Seco</option>
                                <option id="COLD" value="COLD">Frío</option>
                                <option id="WARM" value="WARM">Templado</option>
                                <option id="HOT" value="HOT">Caluroso</option>
                                <option id="SECURITY_ALARM" value="SECURITY_ALARM">Alarma de seguridad</option>
                                <option id="VIDEO_MONITORING" value="VIDEO_MONITORING">Videovigilancia</option>
                                <option id="FIRE_ALARM" value="FIRE_ALARM">Alarma antiincendios</option>
                                <option id="SOCKET" value="SOCKET">Con enchufe</option>
                                <option id="INDOOR" value="INDOOR">Interior</option>
                                <option id="OUTDOOR" value="OUTDOOR">Exterior</option>
                                <option id="NARROW_ACCESS" value="NARROW_ACCESS">Acceso estrecho</option>
                                <option id="MEDIUM_WIDTH_ACCESS" value="MEDIUM_WIDTH_ACCESS">Acceso de anchura media</option>
                                <option id="WIDE_ACCESS" value="WIDE_ACCESS">Acceso amplio</option>
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

                        {props.isEdit == false &&
                            <div className='pt-10 flex items-center justify-center'>
                                <button className='border-2 py-2 px-4 border-webcolor-50 rounded hover:bg-slate-100 flex items-center' type="submit">
                                    <span className='pr-2 text-lg'>Publicar</span>
                                    <Image src="/images/paperplane.svg" width="20" height="20" alt='send' />
                                </button>
                            </div>
                        }

                        {props.isEdit == true &&
                            <div className='flex items-center justify-center space-x-10'>
                                <Button type='submit' color='secondary' onClick={handleSubmit} className='text-lg border-2 mt-4'>Actualizar</Button>
                                <Button color='red' onClick={handleDelete} className='text-lg border-2 mt-4'>Eliminar</Button>
                            </div>
                        }

                        <>
                            {errors.map((error) => <p key={error} className='text-red-600'>{error}</p>)}
                            {success == true &&
                                <p className='text-green-600'>Espacio guardado con éxito.</p>
                            }
                        </>
                    </form>
                </main>
            </div>
        </>
    )

}
