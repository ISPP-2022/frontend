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

const Search = () => {
    const router = useRouter();
    const url = `${process.env.AUTH_API_URL || 'http://localhost:4100'}`;
    const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: 'KO' });
    // const [query, setQuery] = useState({search: router.query.search});
    const [query, setQuery] = useState(router.query);
    const [tag, setTag] = useState([]);

    useEffect(async () => {

        console.log(query);

        await axios.get(url + `/api/v1/spaces`, { params: query })
            .then(response => { setRespuestaAPI({ respuesta: 'OK', data: response.data }) })
            .catch(error => { setRespuestaAPI({ respuesta: 'KO', error: error.message }) });

        console.log(url + `/api/v1/spaces`);
    }, []);

    const calculateSurface = (dimensions) => {
        const [width, height] = dimensions.split('x');
        return parseInt(width) * parseInt(height);
    };

    const calculatePrice = (priceHour, priceDay, priceMonth) => {
        if (priceHour !== null) {
            return priceHour;
        } else if (priceDay !== null) {
            return priceDay;
        } else if (priceMonth !== null) {
            return priceMonth;
        } else {
            return "-";
        }
    };

    const calculateUnitPrice = (priceHour, priceDay, priceMonth) => {
        if (priceHour !== null) {
            return "€/h";
        } else if (priceDay !== null) {
            return "€/d";
        } else {
            return "€/m";
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

    const handleInputChange = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
        console.log(query);
    };

    const handleTagChange = (event) => {
        var tempTag = tag;
        if (event.target.checked === true) {
            tempTag.push(event.target.name);
            setTag(tempTag);
            setQuery({ ...query, tag: tempTag });
        } else {
            var newTagList = tempTag.filter(tag => tag !== event.target.name);
            setTag(newTagList);
            setQuery({ ...query, tag: newTagList });
        }
        console.log(query);
    };

    const handleSwitchChange = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.checked });
        console.log(query);
    };


    const enviarDatos = async (event) => {
        event.preventDefault();
        console.log(query);

        router.push({
            pathname: `/search/${query.search}`,
            query: query
        });
    };


    return (
        <>
            <div className='sm:py-4 sm:px-20 w-full px-4 py-4'>
                {/* Header */}
                {respuestaAPI.respuesta === 'KO' ?
                    <div>
                        <Title>Error</Title>
                        <Paragraph>No se ha podido obtener la información.</Paragraph>
                        <Paragraph>Por favor, inténtelo de nuevo más tarde.</Paragraph>
                    </div>
                    :
                    <div>
                        <Title>Resultados para "{query.search}"</Title>
                        <Paragraph>{respuestaAPI.data.length} resultados encontrados</Paragraph>
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
                                                <Paragraph><Switch label=" " checked={query.isRentPerHour === undefined ? false : query.isRentPerHour} name="isRentPerHour" onChange={handleSwitchChange} /><b>Precio por hora</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className='float-left pr-3'>
                                                    <FieldTextBox label="Mínimo (€)" value={query.minPriceHour} name="minPriceHour" onChange={handleInputChange} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox label="Máximo (€)" value={query.maxPriceHour} name="maxPriceHour" onChange={handleInputChange} />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion defaultExpanded={false}>
                                            <AccordionSummary
                                                expandIcon={<ExpandIcon />}>
                                                <Paragraph><Switch label=" " checked={query.isRentPerDay === undefined ? false : query.isRentPerDay} name="isRentPerDay" onChange={handleSwitchChange} /><b>Precio por día</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className='float-left pr-3'>
                                                    <FieldTextBox label="Mínimo (€)" value={query.minPriceDay} name="minPriceDay" onChange={handleInputChange} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox label="Máximo (€)" value={query.maxPriceDay} name="maxPriceDay" onChange={handleInputChange} />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion defaultExpanded={false}>
                                            <AccordionSummary
                                                expandIcon={<ExpandIcon />}>
                                                <Paragraph><Switch label=" " checked={query.isRentPerMonth === undefined ? false : query.isRentPerMonth} name="isRentPerMonth" onChange={handleSwitchChange} /><b>Precio por mes</b></Paragraph>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className='float-left pr-3'>
                                                    <FieldTextBox label="Mínimo (€)" value={query.minPriceMonth} name="minPriceMonth" onChange={handleInputChange} />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox label="Máximo (€)" value={query.maxPriceMonth} name="maxPriceMonth" onChange={handleInputChange} />
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
                                                    optionTags.map((tag, index) => <FieldCheckBox
                                                        key={index}
                                                        label={tag.label}
                                                        name={tag.value}
                                                        onChange={handleTagChange}
                                                        checked={query.tag !== undefined ? query.tag.includes(tag.value) : false} />)
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
                                                    <FieldTextBox label="Mínimo (m)" value={query.minDim} name="minDim" />
                                                </div>
                                                <div className='float-left pr-3 mb-4'>
                                                    <FieldTextBox label="Máximo (m)" value={query.maxDim} name="maxDim" />
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
                        <Paragraph><b>Filtrar por:</b></Paragraph>
                        <FormControl onSubmit={enviarDatos}>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><Switch label=" " checked={query.isRentPerHour === undefined ? false : query.isRentPerHour} name="isRentPerHour" onChange={handleSwitchChange} /><b>Precio por hora</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='float-left pr-3'>
                                        <FieldTextBox label="Mínimo (€)" value={query.minPriceHour} name="minPriceHour" onChange={handleInputChange} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox label="Máximo (€)" value={query.maxPriceHour} name="maxPriceHour" onChange={handleInputChange} />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><Switch label=" " checked={query.isRentPerDay === undefined ? false : query.isRentPerDay} name="isRentPerDay" onChange={handleSwitchChange} /><b>Precio por día</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='float-left pr-3'>
                                        <FieldTextBox label="Mínimo (€)" value={query.minPriceDay} name="minPriceDay" onChange={handleInputChange} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox label="Máximo (€)" value={query.maxPriceDay} name="maxPriceDay" onChange={handleInputChange} />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandIcon />}>
                                    <Paragraph><Switch label=" " checked={query.isRentPerMonth === undefined ? false : query.isRentPerMonth} name="isRentPerMonth" onChange={handleSwitchChange} /><b>Precio por mes</b></Paragraph>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='float-left pr-3'>
                                        <FieldTextBox label="Mínimo (€)" value={query.minPriceMonth} name="minPriceMonth" onChange={handleInputChange} />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox label="Máximo (€)" value={query.maxPriceMonth} name="maxPriceMonth" onChange={handleInputChange} />
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
                                        optionTags.map((tag, index) => <FieldCheckBox
                                            key={index}
                                            label={tag.label}
                                            name={tag.value}
                                            onChange={handleTagChange}
                                            checked={query.tag !== undefined ? query.tag.includes(tag.value) : false} />)
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
                                        <FieldTextBox label="Mínimo (m)" value={query.minDim} name="minDim" />
                                    </div>
                                    <div className='float-left pr-3 mb-4'>
                                        <FieldTextBox label="Máximo (m)" value={query.maxDim} name="maxDim" />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Button onClick={enviarDatos}>Aplicar filtros</Button>
                        </FormControl>
                    </div>
                    <div className='w-full sm:w-4/5 float-left grid lg:grid-cols-2 lg:gap-2 md:grid-cols-1 md:gap-1'>
                        {
                            respuestaAPI.respuesta === 'OK' ?
                                respuestaAPI.data.map((espacio, index) => {
                                    return (
                                        <div>
                                            <Card key={index}
                                                title={espacio.name}
                                                surface={calculateSurface(espacio.dimensions)}
                                                rating={espacio.rating}
                                                price={calculatePrice(espacio.priceHour, espacio.priceDay, espacio.priceMonth)}
                                                unitPrice={calculateUnitPrice(espacio.priceHour, espacio.priceDay, espacio.priceMonth)}
                                                tag={espacio.tags !== undefined ? calculateTags(espacio.tags) : undefined}
                                                images={espacio.images?espacio.images:undefined}
                                            />
                                        </div>
                                    );
                                }) : <></>
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