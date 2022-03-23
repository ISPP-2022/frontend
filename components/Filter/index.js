import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { FieldCheckBox, FieldSelectorBox, FieldTextBox } from '../Core/Form';
import { Paragraph, Title } from '../Core/Text';
import { Card, CardMobile } from '../Card';
import { Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, RadioGroup, Radio, Switch } from '@mui/material';
import {optionTags} from '../Filter/options';
import {Button} from '../Core/Button';

const SearchFilter = (query, handleSwitchChange, handleInputChange, handleTagChange, enviarDatos) => {
    return (
        <>
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
        </>
    )
}

export default SearchFilter;