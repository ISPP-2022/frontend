import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { FieldCheckBox, FieldSelectorBox, FieldTextBox } from '../../components/Core/Form';
import { Paragraph, Title } from '../../components/Core/Text';
import { Loading } from "../../components/Core/Loading";

import { Card, CardMobile } from '../../components/Card';
import { Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, RadioGroup, Radio, Switch } from '@mui/material';
import { optionTags } from '../../components/Filter/options';
import { Button } from '../../components/Core/Button';
import { SearchFilter } from '../../components/Filter';
import InteractiveMapBox from '../../components/InteractiveMapBox';
import Link from 'next/link';
import Head from 'next/head';

const Search = () => {

    const router = useRouter();
    //set query data cloning router.query
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [tag, setTag] = useState([]);

    const [search, setSearch] = useState("");

    const [isRentPerDay, setIsRentPerDay] = useState(false);
    const [isRentPerHour, setIsRentPerHour] = useState(false);
    const [isRentPerMonth, setIsRentPerMonth] = useState(false);

    const [minDim, setMinDim] = useState(0);
    const [maxDim, setMaxDim] = useState(0);

    const [minPriceDay, setMinPriceDay] = useState(0);
    const [maxPriceDay, setMaxPriceDay] = useState(0);
    const [minPriceHour, setMinPriceHour] = useState(0);
    const [maxPriceHour, setMaxPriceHour] = useState(0);
    const [minPriceMonth, setMinPriceMonth] = useState(0);
    const [maxPriceMonth, setMaxPriceMonth] = useState(0);

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        console.log(lat1, lon1, lat2, lon2);
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    };

    const parseQueryToState = (qr) => {
        const { search, tag, isRentPerDay, isRentPerHour, isRentPerMonth, minDim, maxDim, minPriceDay, maxPriceDay, minPriceHour, maxPriceHour, minPriceMonth, maxPriceMonth } = qr;
        setSearch(search ?? "");
        setIsRentPerDay(isRentPerDay === "true");
        setIsRentPerHour(isRentPerHour === "true");
        setIsRentPerMonth(isRentPerMonth === "true");
        setMinDim(minDim ?? 0);
        setMaxDim(maxDim ?? 0);
        setMinPriceDay(minPriceDay ?? 0);
        setMaxPriceDay(maxPriceDay ?? 0);
        setMinPriceHour(minPriceHour ?? 0);
        setMaxPriceHour(maxPriceHour ?? 0);
        setMinPriceMonth(minPriceMonth ?? 0);
        setMaxPriceMonth(maxPriceMonth ?? 0);
        setTag(tag?.split(',') ?? []);
    }

    const parseStateToQuery = () => {
        let tempSearch = router.query.search;
        if (search.trim().length > 3)
            tempSearch = search;
        else {
            tempSearch = "";
        }
        return { search: tempSearch, isRentPerDay, isRentPerHour, isRentPerMonth, minDim, maxDim, minPriceDay, maxPriceDay, minPriceHour, maxPriceHour, minPriceMonth, maxPriceMonth, tag: tag.join(",") };
    }

    function processQuery(query) {
        let finalQuery = {}
        finalQuery.isRentPerDay = query.isRentPerDay
        finalQuery.isRentPerHour = query.isRentPerHour
        finalQuery.isRentPerMonth = query.isRentPerMonth
        if (query.isRentPerDay) {
            finalQuery.maxPriceDay = query.maxPriceDay > 0 ? query.maxPriceDay : null
            finalQuery.minPriceDay = query.minPriceDay > 0 ? query.minPriceDay : null
        }
        if (query.isRentPerHour) {
            finalQuery.maxPriceHour = query.maxPriceHour > 0 ? query.maxPriceHour : null
            finalQuery.minPriceHour = query.minPriceHour > 0 ? query.minPriceHour : null
        }
        if (query.isRentPerMonth) {
            finalQuery.maxPriceMonth = query.maxPriceMonth > 0 ? query.maxPriceMonth : null
            finalQuery.minPriceMonth = query.minPriceMonth > 0 ? query.minPriceMonth : null
        }
        finalQuery.maxDim = query.maxDim > 0 ? query.maxDim : 0
        finalQuery.minDim = query.minDim > 0 ? query.minDim : 0
        finalQuery.search = query.search
        finalQuery.tag = query.tag

        return Object.fromEntries(Object.entries(finalQuery).filter(([key, value]) => !!value))
    }

    useEffect(() => {
        const fecthData = async () => {
            setLoading(true);
            parseQueryToState(router.query);
            const mapSearch = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${router.query.search}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}&country=es&limit=1`)
                .then(res => {
                    if (res.data.features.length > 0) {
                        const latitudSearch = res.data.features[0].geometry.coordinates[1];
                        const longitudSearch = res.data.features[0].geometry.coordinates[0];
                        return { latitudSearch, longitudSearch };
                    }
                })
            console.log(mapSearch);
            axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces`, { params: router.query })
                .then(async (response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        const ratings = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${response.data[i].ownerId}/ratings?filter=received`)
                            .then(rat => rat.data).catch(() => { return [] });
                        response.data[i].rating = ratings.reduce((acc, cur) => acc + cur.rating / ratings.length, 0);
                    }
                    if (mapSearch) {
                        console.log("1", response.data)
                        response.data.map(space => {
                            let spaceLocation = space.location.split(',');
                            space.distance = getDistanceFromLatLonInKm(mapSearch.latitudSearch, mapSearch.longitudSearch, parseFloat(spaceLocation[0]), parseFloat(spaceLocation[1]));
                            return space;
                        });
                        response.data.sort((a, b) => a.distance - b.distance);
                        console.log("2", response.data)
                    }
                    setData(response.data)
                    setLoading(false);
                })
                .catch(error => {
                    setData([])
                });
        }
        fecthData();
    }, []);

    useEffect(() => {
        const fecthData = async () => {
            setLoading(true);
            parseQueryToState(router.query);
            const mapSearch = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${router.query.search}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}&country=es&limit=1`)
                .then(res => {
                    if (res.data.features.length > 0) {
                        const latitudSearch = res.data.features[0].geometry.coordinates[1];
                        const longitudSearch = res.data.features[0].geometry.coordinates[0];
                        return { latitudSearch, longitudSearch };
                    }
                })
            console.log(mapSearch);
            axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces`, { params: router.query })
                .then(async (response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        const ratings = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${response.data[i].ownerId}/ratings?filter=received`)
                            .then(rat => rat.data).catch(() => { return [] });
                        response.data[i].rating = ratings.reduce((acc, cur) => acc + cur.rating / ratings.length, 0);
                    }
                    if (mapSearch) {
                        response.data.map(space => {
                            let spaceLocation = space.location.split(',');
                            space.distance = getDistanceFromLatLonInKm(mapSearch.latitudSearch, mapSearch.longitudSearch, parseFloat(spaceLocation[0]), parseFloat(spaceLocation[1]));
                            return space;
                        });
                        response.data.sort((a, b) => a.distance - b.distance);
                    }
                    setData(response.data)
                    setLoading(false);
                })
                .catch(error => {
                    setData([])
                });
        }
        fecthData();
    }, [router.query]);

    const handleTagChange = (event) => {
        var tempTag = [...tag];
        if (event.target.checked === true) {
            tempTag.push(event.target.name);
            setTag(tempTag);
        } else {
            var newTagList = tempTag.filter(tag => tag !== event.target.name);
            setTag(newTagList);
        }
    };

    const enviarDatos = async (event) => {
        event.preventDefault();
        const tempQuery = parseStateToQuery();

        const processedQuery = processQuery(tempQuery);

        router.push({
            pathname: `/search`,
            query: processedQuery,
        });

    };



    return (
        <>
            <Head>
                <title>B&uacute;squeda</title>
            </Head>
            <main className='w-full p-5'>
                {/* Header */}
                {!data ?
                    <div>
                        <Title>Error</Title>
                        <Paragraph>No se ha podido obtener la información.</Paragraph>
                        <Paragraph>Por favor, inténtelo de nuevo más tarde.</Paragraph>
                    </div>
                    :
                    <menu>
                        <Paragraph>{data.length} resultados encontrados</Paragraph>
                        {/* Filter mobile version */}
                        {/* TODO LUCAS: Código duplicado, extraer en un componente y hacer dos llamadas */}
                        <div className="lg:hidden w-full">
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary expandIcon={<ExpandIcon />}>
                                    <Paragraph><b>Filtrar por:</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>


                                    <FormControl onSubmit={enviarDatos}>
                                        <Accordion defaultExpanded={false}>
                                            <AccordionSummary
                                                expandIcon={<ExpandIcon />}>
                                                <Paragraph><Switch label=" " checked={isRentPerHour === undefined ? false : isRentPerHour} name="isRentPerHour" onChange={(e) => { setIsRentPerHour(e.target.checked) }} /><b>Precio por hora</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className='float-left pr-3'>
                                                    <FieldTextBox type={'number'} min={0} label="Mínimo (€)" value={minPriceHour} name="minPriceHour" onChange={(e) => { setMinPriceHour(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} min={0} label="Máximo (€)" value={maxPriceHour} name="maxPriceHour" onChange={(e) => { setMaxPriceHour(e.target.value) }} />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion defaultExpanded={false}>
                                            <AccordionSummary
                                                expandIcon={<ExpandIcon />}>
                                                <Paragraph><Switch label=" " checked={isRentPerDay === undefined ? false : isRentPerDay} name="isRentPerDay" onChange={(e) => { setIsRentPerDay(e.target.checked) }} /><b>Precio por día</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className='float-left pr-3'>
                                                    <FieldTextBox type={'number'} min={0} label="Mínimo (€)" value={minPriceDay} name="minPriceDay" onChange={(e) => { setMinPriceDay(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} min={0} label="Máximo (€)" value={maxPriceDay} name="maxPriceDay" onChange={(e) => { setMaxPriceDay(e.target.value) }} />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion defaultExpanded={false}>
                                            <AccordionSummary
                                                expandIcon={<ExpandIcon />}>
                                                <Paragraph><Switch label=" " checked={isRentPerMonth === undefined ? false : isRentPerMonth} name="isRentPerMonth" onChange={(e) => { setIsRentPerMonth(e.target.checked) }} /><b>Precio por mes</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className='float-left pr-3'>
                                                    <FieldTextBox type={'number'} min={0} label="Mínimo (€)" value={minPriceMonth} name="minPriceMonth" onChange={(e) => { setMinPriceMonth(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} min={0} label="Máximo (€)" value={maxPriceMonth} name="maxPriceMonth" onChange={(e) => { setMaxPriceMonth(e.target.value) }} />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion defaultExpanded={false}>
                                            <AccordionSummary
                                                expandIcon={<ExpandIcon />}>
                                                <Paragraph><b>Etiquetas</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {
                                                    optionTags.map((t, index) => <FieldCheckBox
                                                        key={index}
                                                        label={t.label}
                                                        name={t.value}
                                                        onChange={handleTagChange}
                                                        checked={tag !== undefined ? tag.includes(t.value) : false} />)
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion defaultExpanded={false}>
                                            <AccordionSummary
                                                expandIcon={<ExpandIcon />}>
                                                <Paragraph><b>Dimensiones</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className='float-left pr-3'>
                                                    <FieldTextBox type={'number'} min={0} label="Mínimo (m)" value={minDim} name="minDim" onChange={(e) => { setMinDim(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} min={0} label="Máximo (m)" value={maxDim} name="maxDim" onChange={(e) => { setMaxDim(e.target.value) }} />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Button onClick={enviarDatos}>Aplicar filtros</Button>
                                    </FormControl>



                                </AccordionDetails>
                            </Accordion>
                        </div>

                    </menu>}
                {/* Content */}
                <div className='mt-4'>
                    {/* Filters */}
                    <menu className='w-1/5 float-left hidden lg:block'>
                        <form className="w-full h-16 py-2 px-4 flex  items-center" onSubmit={enviarDatos}>
                            <input className="bg-transparent focus:outline-none h-full
                                focus:shadow-outline border border-blue-bondi focus:border-[#4aa7c0] rounded-lg 
                                 appearance-none leading-normal w-full max-w-lg
                                transition duration-200 ease-in-out"
                                type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        </form>

                        <Paragraph><b>Filtrar por:</b></Paragraph>
                        <FormControl onSubmit={enviarDatos}>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><Switch label=" " checked={isRentPerHour === undefined ? false : isRentPerHour} name="isRentPerHour" onChange={(e) => { setIsRentPerHour(e.target.checked) }} /><b>Precio por hora</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='float-left pr-3'>
                                        <FieldTextBox type={'number'} min={0} label="Mínimo (€)" value={minPriceHour} name="minPriceHour" onChange={(e) => { setMinPriceHour(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} min={0} label="Máximo (€)" value={maxPriceHour} name="maxPriceHour" onChange={(e) => { setMaxPriceHour(e.target.value) }} />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><Switch label=" " checked={isRentPerDay === undefined ? false : isRentPerDay} name="isRentPerDay" onChange={(e) => { setIsRentPerDay(e.target.checked) }} /><b>Precio por día</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='float-left pr-3'>
                                        <FieldTextBox type={'number'} min={0} label="Mínimo (€)" value={minPriceDay} name="minPriceDay" onChange={(e) => { setMinPriceDay(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} min={0} label="Máximo (€)" value={maxPriceDay} name="maxPriceDay" onChange={(e) => { setMaxPriceDay(e.target.value) }} />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><Switch label=" " checked={isRentPerMonth === undefined ? false : isRentPerMonth} name="isRentPerMonth" onChange={(e) => { setIsRentPerMonth(e.target.checked) }} /><b>Precio por mes</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='float-left pr-3'>
                                        <FieldTextBox type={'number'} min={0} label="Mínimo (€)" value={minPriceMonth} name="minPriceMonth" onChange={(e) => { setMinPriceMonth(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} min={0} label="Máximo (€)" value={maxPriceMonth} name="maxPriceMonth" onChange={(e) => { setMaxPriceMonth(e.target.value) }} />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><b>Etiquetas</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        optionTags.map((t, index) => <FieldCheckBox
                                            key={index}
                                            label={t.label}
                                            name={t.value}
                                            onChange={handleTagChange}
                                            checked={tag !== undefined ? tag.includes(t.value) : false} />)
                                    }
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><b>Dimensiones</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='float-left pr-3'>
                                        <FieldTextBox type={'number'} min={0} label="Mínimo (m)" value={minDim} name="minDim" onChange={(e) => { setMinDim(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} min={0} label="Máximo (m)" value={maxDim} name="maxDim" onChange={(e) => { setMaxDim(e.target.value) }} />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Button onClick={enviarDatos}>Aplicar filtros</Button>
                        </FormControl>
                    </menu>
                    <form className="w-full h-16 py-2 px-4  justify-center items-center hidden md:flex lg:hidden" onSubmit={enviarDatos}>
                        <input className="bg-transparent focus:outline-none h-full
                                focus:shadow-outline border border-gray-300 focus:border-[#4aa7c0] rounded-lg 
                                 appearance-none leading-normal w-full max-w-lg
                                transition duration-200 ease-in-out  "
                            type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    </form>


                    {/* Mapa interactivo */}
                    {
                        !loading && data && data.length > 0 &&
                        <>
                            <div className='flex justify-end items-center'>

                                <Switch label=" " checked={showMap} name="ShowMap" onChange={(e) => { setShowMap(e.target.checked) }} />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            {
                                showMap && <InteractiveMapBox spaces={data} />
                            }
                        </>
                    }
                    <div className='flex justify-end w-full lg:w-4/5 ml-auto'>
                        <section className='w-full hidden sm:grid mx-auto justify-end grid-cols-2 xl:grid-cols-3 gap-1 lg:gap-2 xl:gap-1'>
                            {
                                loading ? <div className="flex justify-center h-screenC col-span-2 row-span-4 items-center"> <Loading size="large"></Loading></div>
                                    : data && data.length > 0 ?
                                        data.map((espacio, index) => {
                                            return (
                                                <div key={index} className='h-[220px]'>
                                                    <Link href={`/space/${espacio.id}`} passHref>
                                                        <a>
                                                            <Card key={index}
                                                                space={espacio}
                                                            />
                                                        </a>
                                                    </Link>
                                                </div>
                                            );
                                        }) : <h1 className="h-full w-full col-span-2 min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>
                            }
                        </section>
                    </div>
                    <section className='sm:hidden w-full flex flex-col px-5 justify-center' >
                        {
                            loading ? <div className="flex justify-center h-screenC items-center"> <Loading size="large"></Loading></div>
                                : data && data.length > 0 ?
                                    data.map((espacio, index) => {
                                        return (
                                            <div key={index} className='py-2'>
                                                <Link href={`/space/${espacio.id}`}>
                                                    <a>
                                                        <CardMobile key={index}
                                                            space={espacio}
                                                        />
                                                    </a>
                                                </Link>
                                            </div>
                                        );
                                    }) : <h1 className="h-full w-full col-span-2 min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>
                        }
                    </section>
                </div>
            </main>
        </>
    );
};

export default Search;

const ExpandIcon = () => {
    return (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>);
};