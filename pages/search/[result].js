import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { FieldCheckBox, FieldSelectorBox, FieldTextBox } from '../../components/Core/Form';
import { Paragraph, Title } from '../../components/Core/Text';
import { Card, CardMobile } from '../../components/Card';
import { Accordion, AccordionDetails, AccordionSummary, FormControlLabel, FormLabel, Radio } from '@mui/material';
import { RadioGroup } from '@headlessui/react';

const Search = () => {
    const router = useRouter();
    const { result } = router.query;
    const url = `${process.env.AUTH_API_URL || 'http://localhost:4100'}`;
    const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: 'KO' });

    useEffect(async () => {
        const consultaAPI = await axios.get(url + "/api/v1/spaces/" + result)
            .then(response => setRespuestaAPI({ respuesta: 'OK', data: response.data }))
            .catch(error => setRespuestaAPI({ respuesta: 'KO' }));

        const consulta =
        {
            respuesta: 'OK',
            data: [
                {
                    "id": 1,
                    "name": "Espacio 1",
                    "description": "Desc espacio 1",
                    "initialDate": "2022-01-01T00:00:00.000Z",
                    "location": "Seville",
                    "dimensions": "20x20",
                    "priceHour": 12,
                    "priceDay": 12,
                    "priceMonth": 12,
                    "shared": false,
                    "ownerId": 1,
                    "tags": ["empty", "empty"]
                },
                {
                    "id": 2,
                    "name": "Espacio 2",
                    "description": "Desc espacio 2",
                    "initialDate": "2022-01-01T00:00:00.000Z",
                    "location": "Seville",
                    "dimensions": "20x20",
                    "priceHour": 12,
                    "priceDay": 12,
                    "priceMonth": 12,
                    "shared": false,
                    "ownerId": 1,
                    "tags": ["enchufe", "wifi"]
                },
                {
                    "id": 3,
                    "name": "Espacio 3",
                    "description": "Desc espacio 3",
                    "initialDate": "2022-01-01T00:00:00.000Z",
                    "location": "Seville",
                    "dimensions": "20x20",
                    "priceHour": 12,
                    "priceDay": 12,
                    "priceMonth": 12,
                    "shared": false,
                    "ownerId": 1,
                    "tags": ["empty"]
                },
                {
                    "id": 4,
                    "name": "Espacio 4",
                    "description": "Desc espacio 4",
                    "initialDate": "2022-01-01T00:00:00.000Z",
                    "location": "Seville",
                    "dimensions": "20x20",
                    "priceHour": 12,
                    "priceDay": 12,
                    "priceMonth": 12,
                    "shared": false,
                    "ownerId": 1,
                    "tags": ["empty", "empty"]
                }
            ]
        }

        setRespuestaAPI(consulta);
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

    const calculateTags = (tags) => {
        if (tags.length > 0 && tags.length < 3) {
            return tags;
        } else if (tags.length > 2) {
            return tags.slice(0, 2);
        } else {
            return ["empty"];
        }
    };


    return (
        <>
            <div className='py-4 px-20'>
                {/* Header */}
                {respuestaAPI.respuesta === 'KO' ?
                    <div>
                        <Title>Error</Title>
                        <Paragraph>No se ha podido obtener la información.</Paragraph>
                        <Paragraph>Por favor, inténtelo de nuevo más tarde.</Paragraph>
                    </div>
                    :
                    <div>
                        <Title>Resultados para "{result}"</Title>
                        <Paragraph>{respuestaAPI.data.length} resultados encontrados</Paragraph>
                    </div>}
                {/* Content */}
                <div className='mt-4'>
                    {/* Filters */}
                    <div className='w-1/5 float-left'>
                        <Paragraph><b>Filtrar por:</b></Paragraph>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandIcon />}>
                                <Paragraph><b>Tipo de alquiler</b></Paragraph>
                            </AccordionSummary>
                            <AccordionDetails>
                                <RadioGroup
                                    name="tipoAlquiler"
                                    defaultValue={"dias"}>
                                    <FormControlLabel value="horas" label="Horas" control={<Radio />} />
                                    <FormControlLabel value="dias" label="Días" control={<Radio />} />
                                    <FormControlLabel value="meses" label="Meses" control={<Radio />} />
                                </RadioGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandIcon />}>
                                <Paragraph><b>Precio</b></Paragraph>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='float-left pr-3'>
                                    <FieldTextBox label="Precio mínimo" />
                                </div>
                                <div className='float-left pr-3 mb-4'>
                                    <FieldTextBox label="Precio máximo" />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandIcon />}>
                                <Paragraph><b>Dimensiones</b></Paragraph>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='float-left pr-3'>
                                    <FieldTextBox label="Ancho (m)" />
                                </div>
                                <div className='float-left pr-3 mb-4'>
                                    <FieldTextBox label="Largo (m)" />
                                </div>
                            </AccordionDetails>
                        </Accordion>



                    </div>
                    {/* Results { title, surface, rating, price, unitPrice, tags, URLimage } */}
                    <div className='w-4/5 float-left grid lg:grid-cols-2 lg:gap-2 md:grid-cols-1 md:gap-1'>
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
                                                tags={calculateTags(espacio.tags)}
                                            //URLimage={espacio.i}
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