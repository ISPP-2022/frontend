import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { FieldCheckBox, FieldSelectorBox, FieldTextBox } from '../../components/Core/Form';
import { Paragraph, Title } from '../../components/Core/Text';
import { Card, CardMobile } from '../../components/Card';
import { Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, RadioGroup, Radio, Switch } from '@mui/material';
import { optionTags } from '../../components/Filter/options';
import { Button } from '../../components/Core/Button';
import { SearchFilter } from '../../components/Filter';
import Link from 'next/link';
import Head from 'next/head';

const Search = () => {
    const router = useRouter();
    //set query data cloning router.query
    const [data, setData] = useState([]);
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

    useEffect(() => {
        parseQueryToState(router.query);
        axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces`, { params: router.query })
            .then(async (response) => {
                for (let i = 0; i < response.data.length; i++) {
                    const ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${response.data[i].ownerId}/ratings?filter=received`)
                        .then(rat => rat.data).catch(() => { return [] });
                    response.data[i].rating = ratings.reduce((acc, cur) => acc + cur.rating / ratings.length, 0);
                }
                setData(response.data)
            })
            .catch(error => { });
    }, []);

    useEffect(() => {
        parseQueryToState(router.query);
        axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces`, { params: router.query })
            .then(async (response) => {
                for (let i = 0; i < response.data.length; i++) {
                    const ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${response.data[i].ownerId}/ratings?filter=received`)
                        .then(rat => rat.data).catch(() => { return [] });
                    response.data[i].rating = ratings.reduce((acc, cur) => acc + cur.rating / ratings.length, 0);
                }
                setData(response.data)
            })
            .catch(error => { });
    }, [router.query]);

    const calculateSurface = (dimensions) => {
        const [width, height] = dimensions.split('x');
        return parseInt(width) * parseInt(height);
    };

    const calculateUnitPrice = (priceHour, priceDay, priceMonth) => {
        if (priceHour) {
            return { amount: priceHour, unit: "€/h" };
        } else if (priceDay) {
            return { amount: priceDay, unit: "€/d" };
        } else if (priceMonth) {
            return { amount: priceMonth, unit: "€/m" };
        } else {
            return { amount: "-", unit: "" };
        }
    };

    const calculateTags = (inputTag) => {
        if (inputTag.length > 0 && inputTag.length < 3) {
            return inputTag;
        } else if (inputTag.length > 2) {
            return inputTag.slice(0, 2);
        } else {
            return ["empty"];
        }
    };


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
        const processedQuery = Object.fromEntries(Object.entries(tempQuery).filter(([key, value]) => value));

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
            <div className='w-full p-5'>
                {/* Header */}
                {!data ?
                    <div>
                        <Title>Error</Title>
                        <Paragraph>No se ha podido obtener la información.</Paragraph>
                        <Paragraph>Por favor, inténtelo de nuevo más tarde.</Paragraph>
                    </div>
                    :
                    <div>
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
                                                    <FieldTextBox type={'number'} label="Mínimo (€)" value={minPriceHour} name="minPriceHour" onChange={(e) => { setMinPriceHour(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} label="Máximo (€)" value={maxPriceHour} name="maxPriceHour" onChange={(e) => { setMaxPriceHour(e.target.value) }} />
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
                                                    <FieldTextBox type={'number'} label="Mínimo (€)" value={minPriceDay} name="minPriceDay" onChange={(e) => { setMinPriceDay(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} label="Máximo (€)" value={maxPriceDay} name="maxPriceDay" onChange={(e) => { setMaxPriceDay(e.target.value) }} />
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
                                                    <FieldTextBox type={'number'} label="Mínimo (€)" value={minPriceMonth} name="minPriceMonth" onChange={(e) => { setMinPriceMonth(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} label="Máximo (€)" value={maxPriceMonth} name="maxPriceMonth" onChange={(e) => { setMaxPriceMonth(e.target.value) }} />
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
                                                    <FieldTextBox type={'number'} label="Mínimo (€)" value={minPriceMonth} name="minPriceMonth" onChange={(e) => { setMinPriceMonth(e.target.value) }} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox type={'number'} label="Máximo (€)" value={maxPriceMonth} name="maxPriceMonth" onChange={(e) => { setMaxPriceMonth(e.target.value) }} />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Button onClick={enviarDatos}>Aplicar filtros</Button>
                                    </FormControl>



                                </AccordionDetails>
                            </Accordion>
                        </div>

                    </div>}
                {/* Content */}
                <div className='mt-4'>
                    {/* Filters */}
                    <div className='w-1/5 float-left hidden lg:block'>
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
                                        <FieldTextBox type={'number'} label="Mínimo (€)" value={minPriceHour} name="minPriceHour" onChange={(e) => { setMinPriceHour(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} label="Máximo (€)" value={maxPriceHour} name="maxPriceHour" onChange={(e) => { setMaxPriceHour(e.target.value) }} />
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
                                        <FieldTextBox type={'number'} label="Mínimo (€)" value={minPriceDay} name="minPriceDay" onChange={(e) => { setMinPriceDay(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} label="Máximo (€)" value={maxPriceDay} name="maxPriceDay" onChange={(e) => { setMaxPriceDay(e.target.value) }} />
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
                                        <FieldTextBox type={'number'} label="Mínimo (€)" value={minPriceMonth} name="minPriceMonth" onChange={(e) => { setMinPriceMonth(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} label="Máximo (€)" value={maxPriceMonth} name="maxPriceMonth" onChange={(e) => { setMaxPriceMonth(e.target.value) }} />
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
                                        <FieldTextBox type={'number'} label="Mínimo (m)" value={minDim} name="minDim" onChange={(e) => { setMinDim(e.target.value) }} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox type={'number'} label="Máximo (m)" value={maxDim} name="maxDim" onChange={(e) => { setMaxDim(e.target.value) }} />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Button onClick={enviarDatos}>Aplicar filtros</Button>
                        </FormControl>
                    </div>
                    <form className="w-full h-16 py-2 px-4  justify-center items-center hidden md:flex lg:hidden" onSubmit={enviarDatos}>
                        <input className="bg-transparent focus:outline-none h-full
                                focus:shadow-outline border border-gray-300 focus:border-[#4aa7c0] rounded-lg 
                                 appearance-none leading-normal w-full max-w-lg
                                transition duration-200 ease-in-out  "
                            type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    </form>
                    <div className='w-full hidden sm:grid sm:w-4/5 mx-auto justify-center lg:grid-cols-2 lg:gap-2 md:grid-cols-1 md:gap-1'>
                        {
                            data && data.length > 0 ?
                                data.map((espacio, index) => {
                                    return (
                                        <div key={index} className='h-[220px]'>
                                            <Link href={`/space/${espacio.id}`} passHref>
                                                <a>
                                                    <Card key={index}
                                                        title={espacio.name}
                                                        surface={calculateSurface(espacio.dimensions)}
                                                        rating={espacio.rating}
                                                        price={calculateUnitPrice(espacio.priceHour, espacio.priceDay, espacio.priceMonth).amount}
                                                        unitPrice={calculateUnitPrice(espacio.priceHour, espacio.priceDay, espacio.priceMonth).unit}
                                                        tag={espacio.tags !== undefined ? calculateTags(espacio.tags) : undefined}
                                                        images={espacio.images ? espacio.images : undefined}
                                                    />
                                                </a>
                                            </Link>
                                        </div>
                                    );
                                }) : <h1 className="h-full w-full col-span-2 min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>
                        }
                    </div>
                    <div className='sm:hidden w-full flex flex-col px-5 justify-center' >
                        {
                            data && data.length > 0 ?
                                data.map((espacio, index) => {
                                    return (
                                        <div key={index} className='py-2'>
                                            <Link href={`/space/${espacio.id}`}>
                                                <a>
                                                    <CardMobile key={index}
                                                        title={espacio.name}
                                                        surface={calculateSurface(espacio.dimensions)}
                                                        rating={espacio.rating}
                                                        price={calculateUnitPrice(espacio.priceHour, espacio.priceDay, espacio.priceMonth).amount}
                                                        unitPrice={calculateUnitPrice(espacio.priceHour, espacio.priceDay, espacio.priceMonth).unit}
                                                        tag={espacio.tags !== undefined ? calculateTags(espacio.tags) : undefined}
                                                        images={espacio.images ? espacio.images : undefined}
                                                    />
                                                </a>
                                            </Link>
                                        </div>
                                    );
                                }) : <h1 className="h-full w-full col-span-2 min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    );

};

export default Search;

const ExpandIcon = () => {
    return (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>);
};