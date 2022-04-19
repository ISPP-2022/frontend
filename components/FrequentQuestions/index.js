import React, { useState } from "react";
import { Paragraph, Title, Subtitle } from "../../components/Core/Text";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from "next/image"

function FAQ() {
    return (
        <>
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div role="article" className="bg-gray-100 py-12 md:px-8">
                        <div className="px-4 xl:px-0 py-10">
                            <div className="flex flex-col lg:flex-row flex-wrap">
                                <div className="mt-4 lg:mt-0 lg:w-3/5 text-blue-bondi">
                                    <Title>Preguntas frecuentes</Title>
                                </div>      
                            </div>
                        </div>
                        <div className="px-6 xl:px-0">
                            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 pb-6 gap-8">
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>General</Subtitle>
                                        </div>
                                        <div className="my-5">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Qué es Stacking Up?</h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Stacking Up es una plataforma intermediaria que pretende resolver los problemas de espacio de las 
                                                personas permitiendo que otros usuarios ganen dinero alquilando el suyo de la forma más flexible, segura y eficaz. 
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Por qué Stacking Up? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                En Stacking Up priorizamos la facilidad de uso y la seguridad de nuestros usuarios, 
                                                por lo que al usar nuestra plataforma comenzarás a disfrutar de manera instantánea, entre algunas otras, de las siguientes características: 
                                                    <br></br>
                                                    <br></br>
                                                    <a className="font-semibold">Verificación de usuarios:</a> Al ofertar espacios o alquilar los mismos se le solicitarán al usuario datos como el número de teléfono o documentación que permita ofrecer un entorno seguro y eficaz 
                                                    <br></br>
                                                    <br></br>
                                                    <a className="font-semibold">Alquiler compartido:</a> ¿Por qué pagar por espacio que no usas? Stacking Up te permite no solo realizar la reserva de un espacio sino alquilar únicamente una parte del mismo. <a className="text-blue-bondi font-semibold">[*]</a> 
                                                    <br></br>
                                                    <br></br>
                                                    <a className="font-semibold">Búsqueda inteligente:</a> Stacking Up posee un sistema de búsqueda avanzado que te permite encontrar un espacio que se adecúe a tus necesidades rellenando un sencillo formulario personalizado al igual que encontrar inquilinos que tengan necesidades que puedes resolver.
                                                    <br></br>
                                                    <br></br>
                                                    <a className="font-semibold">Alquiler por horas:</a> Como inquilino tendrás al alcance de tu mano la posibilidad de reservar un espacio según tus necesidades temporales, desde contratos tradicionales por meses hasta reservas por días e incluso horas. <a className="text-blue-bondi font-semibold">[*]</a> 
                                                    <br></br>
                                                    <br></br>
                                                    <a className="font-semibold">Comisiones:</a> En Stacking Up hemos escuchado a los anfitriones de espacios de los principales portales de la red, y en consecuencia nuestro servicio ofrece las comisiones más bajas posibles. Comisiones del 6% para usuarios no premium y del 0% para usuarios premium (suscripción indefinida de pago único).
                                                    <br></br>
                                                    <br></br>
                                                    <a className="text-blue-bondi font-semibold">[*]</a> Sujeto a disponibilidad según el espacio y preferencias del anfitrión 
                                                   </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cuál es la mejor manera de gestionar el intercambio de llaves?</h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Recomendamos encarecidamente el uso de nuestro chat para concertar una cita y realizar el intercambio de llaves. 
                                                Otras posibles opciones son el uso de algún sistema de terceros como cajetines o locales específicos que ofrecen este tipo de servicios. 
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cómo gestiona Stacking Up el pago de las reservas? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Dispondrás de tres opciones en la pasarela de pago para reservar un espacio. Estas son el pago a través de Paypal, Sofort o usando tu tarjeta de débito o crédito. 
                                                Para garantizar el cumplimiento de las condiciones acordadas nos hacemos cargo del importe abonado, que se liberará al anfitrión una vez finalizada la reserva.     
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        </div>
                                    </div>
                                </div>
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>Inquilinos</Subtitle>
                                        </div>
                                        <div className="my-5">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cómo convertirme en inquilino?</h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Para convertirte en inquilino bastará con crearte una cuenta de usuario y completar información personal básica, así como métodos de pago. Una vez hecho esto ya podrás 
                                                navegar entre los distintos espacios que se oferten en la aplicación y reservar aquel que se adapte a tus necesidades temporales y espaciales, hablar con los anfitriones y realizar la reserva. 
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cómo y cuándo podré acceder a mis objetos? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Podrás acceder al espacio que estás alquilando la totalidad del tiempo que dure la reserva de este, estando el instante inicial y final sujeto a disponibilidad horaria del anfitrión para la entrega de llaves. 
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Puedo hablar con el anfitrión antes de hacer una reserva? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Puedes establecer contacto con un anfitrión a través del chat de Stacking Up de manera previa a la reserva, durante la misma y posteriormente. De igual manera, puedes contactar con el soporte técnico de 
                                                Stacking Up para cualquier tipo de incidencia. ¡Estaremos encantados de ayudarte!  
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cómo encuentro un espacio que se adecúe a mis necesidades? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Tras escuchar a los inquilinos en Stacking Up hemos implementado un sistema de búsqueda inteligente que te permite, a través de un sencillo formulario, 
                                                demandar el espacio que necesitas para encontrar de una manera más rápida el espacio que necesitas sin tener que navegar entre las múltiples opciones que existen en la plataforma.
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        </div>
                                    </div>
                                </div>
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>Anfitrión</Subtitle>
                                        </div>
                                        <div className="my-5">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cómo convertirme en anfitrión? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Para convertirte en anfitrión bastará con crearte una cuenta de usuario y completar información personal básica. Una vez hecho esto, podrás publicar tu primer espacio subiendo algunas fotos, 
                                                declarando las modalidades de reserva que ofreces, etiquetas predefinidas y adjuntando un título y una descripción. Si quieres mejorar como anfitrión te recomendamos consultar <a className="font-semibold">“¿Cómo aumentar el número de inquilinos?”</a>   
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cuánto cuesta publicar un espacio? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                ¡Absolutamente nada! Podrás publicar tus espacios de manera gratuita en nuestra aplicación tan rápido como te pongas manos a la obra. Puedes consultar <a className="font-semibold">“¿Cómo convertirme en anfitrión?”</a> para más información al respecto. 
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cuánto puedo ganar? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Tu espacio, tus normas. Tú mismo eres el encargado de fijar los precios de las posibles reservas, tanto por horas, como por días, como por meses. StackingUp se lleva una pequeña comisión del 6% para anfitriones normales y del 0% para anfitriones premium. 
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Qué tendré que hacer para recibir los pagos? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Para recibir tus pagos tendrás que configurar un método de pago estándar como Paypal, Sofort o tarjeta de crédito. Tras recibir una reserva el inquilino realiza el pago, que como intermediario almacenamos hasta que finalice la reserva. 
                                                Una vez finalice, se liberará el pago al anfitrión. 
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">¿Cómo aumentar el número de inquilinos? </h4>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Paragraph>
                                                Desde nuestra plataforma lamentamos comunicarte que no existe una receta inequívoca para elevar el número de inquilinos que reserven tu espacio, pero te podemos ofrecer algunos consejos. 
                                                <br></br>
                                                <br></br>
                                                <a className="text-blue-bondi font-semibold">1. </a>Verifica tus datos lo antes posible: Cuanto antes confirmemos tu identidad antes podrás comenzar a recibir inquilinos en tu espacio
                                                <br></br>
                                                <br></br>
                                                <a className="text-blue-bondi font-semibold">2. </a>Completa tu perfil personal: Nada mejor para causar una buena impresión que tener la posibilidad de presentarte ante los demás. Te recomendamos encarecidamente que añadas una foto a tu perfil lo antes posible además de tu descripción personal para que el resto sepa más de ti.
                                                <br></br>
                                                <br></br>
                                                <a className="text-blue-bondi font-semibold">3. </a>Ofrece un buen servicio a tus inquilinos: Cuanto mejor sea el servicio que ofrezcas a tus inquilinos mejores serán las valoraciones que estos te dejen en tu perfil. Más valoraciones implica una mejor percepción por parte de posibles inquilinos. ¿Lo vas captando?
                                                <br></br>
                                                <br></br>
                                                <a className="text-blue-bondi font-semibold">4. </a>Adquiere la suscripción premium de StackingUp: Adquiriendo el servicio premium de StackingUp obtienes entre otras ventajas la eliminación completa de comisiones y prioridad para que tu espacio se publicite en el servicio de búsqueda inteligente.
                                            </Paragraph>
                                            </AccordionDetails>
                                        </Accordion>
                                        </div>
                                    </div>
                                </div>
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>Si tienes alguna otra duda, no dudes en contactarnos en:</Subtitle>
                                            <br></br>
                                            <div className="text-center">
                                                <Subtitle><a  href="mailto:stackingup13@gmail.com">stackingup13@gmail.com</a></Subtitle>
                                            </div>
                                        </div>
                                        <div className="pt-8">
                                            <Image
                                                width={870}
                                                height={310}
                                                className=""
                                                src={`/logolargo.png`}
                                                alt="Imágenes del espacio no encontradas"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQ;