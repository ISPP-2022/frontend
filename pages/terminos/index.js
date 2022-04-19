import Head from 'next/head';

function Terminos(){
    return (
        <div className='md:bg-gray-100 flex justify-center items-center'>
        <Head>
            <title>Términos y condiciones del servicio.</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta> 
        </Head>
        <div className='md:bg-white p-4 md:mb-14 md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] flex flex-col'>
        <div className='md:block p-8 m-5'>
            <h1 className='text-5xl flex justify-center items-center font-bold text-[#4aa7c0] font-black mt-1'>Términos y condiciones de uso</h1>
        </div>
        <h2 className='text-lg font-bold text-[#256172] mb-2 mt-2'>Condiciones de servicio de StackingUp</h2>
        <p>{condiciones}</p>
        <ol className='list-decimal ml-14'>
            <li>para facilitar el uso de la plataforma y</li>
            <li>la mediación de pagos y cobros entre arrendadores y arrendatarios.</li>
        </ol>
        <p>{condiciones2}</p>
        <h2 className='text-lg font-bold text-[#256172] mb-2 mt-2'>Acceso a la plataforma</h2>
        <p>{acceso}</p>
        <h2 className='text-lg font-bold text-[#256172] mb-2 mt-2'>Cuentas de usuarios en StackingUp</h2>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Registro de cuenta</h3>
        <p>{registro}</p>
        <ol className='list-decimal ml-14'>
            <li>Crear varias cuentas de StackingUp</li>
            <li>Si la información proporcionada es falsa</li>
            <li>Violación de estos términos.</li>
        </ol>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Información del inquilino</h3>
        <p>{inquilino}</p>
        <h2 className='text-lg font-bold text-[#256172] mb-2 mt-2'>Anuncios en StackingUp</h2>
        <p>{anuncio}</p>
        <h2 className='text-lg font-bold text-[#256172] mb-2 mt-2'>Condiciones de reserva y financieras</h2>
        <p>{condiciones_reserva}</p>
        <p className='font-bold text-[#256172] mb-2'>1) Arrendador</p>
        <p>{arrendador}</p>
        <p className='font-bold text-[#256172] mb-2'>2) Inquilino</p>
        <p>{inquilino2}</p>
        <ol className='list-decimal ml-14'>
            <li>Obtener una preautorización en su tarjeta de crédito en nombre del arrendador o</li>
            <li>Cobrar a su tarjeta de crédito una tarifa temporal para la verificación a su entera discreción</li>
        </ol>
        <p>{inquilino2_2}</p>
        <p className='font-bold text-[#256172] mb-2'>3) Inquilino ingresa al local </p>
        <p>{inquilino_local}</p>
        <p className='font-bold text-[#256172] mb-2'>4) Desalojo del espacio después de la finalización del contrato de arrendamiento </p>
        <p>{desalojo}</p>
        <p className='font-bold text-[#256172] mb-2'>5) Pago al propietario  </p>
        <p>{pago}</p>
        <p className='font-bold text-[#256172] mb-2'>6) Tarifas  </p>
        <p>{tarifas}</p>
        <p className='font-bold text-[#256172] mb-2'>7) Pago garantizado  </p>
        <p>{pagos}</p>
        <p className='font-bold text-[#256172] mb-2'>8) Cancelaciones y reembolsos </p>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Cancelación por parte del arrendatario</h3>
        <p>{cancelaciones1}<a className='text-[#4aa7c0]' href="mailto:info@stackingup.es">info@stackingup.es</a>{cancelaciones1_end}</p>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Cancelación por parte del arrendador  </h3>
        <p>{cancelaciones2}</p>
        <p className='font-bold text-[#256172] mb-2'>9) Chat </p>
        <p>{chat}</p>
        <p className='font-bold text-[#256172] mb-2'>10) Impuestos </p>
        <p>{impuestos}</p>
        <p className='font-bold text-[#256172] mb-2'>11) Varias ranuras de daño  </p>
        <p>{danyos}</p>
        <ol className='list-decimal ml-14'>
            <li>Materiales explosivos y combustibles </li>
            <li>Residuos </li>
            <li>Armas de fuego  </li>
            <li>Drogas o sustancias ilegales </li>
            <li>Propiedad robada  </li>
            <li>Bienes perecederos </li>
        </ol>
        <p>{danyos2}</p>
        <p>{danyos3}</p>
        <p>{danyos4}</p>
        <p>El arrendatario incumple si:</p>
        <ol className='list-decimal ml-14'>
            <li>El arrendatario no cumple con su obligación de pagar la renta </li>
            <li>El arrendatario proporciona información falsa o inexacta al inquilino o a StackingUp. </li>
            <li>El arrendatario no recoge el objeto al final del período de arrendamiento o en el momento requerido por el arrendador (siempre cumple con estas condiciones) </li>
            <li>El incumplimiento por parte del arrendatario de los puntos principales de estos términos y condiciones </li>
        </ol>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Medidas de StackingUp</h3>
        <p>{medidas}</p>
        <ol className='list-decimal ml-14'>
            <li>{medidas1}</li>
            <li>{medidas2}</li>
        </ol>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Cobro</h3>
        <p>{cobro}</p>
        <ol className='list-decimal ml-14'>
            <li>Violación de las leyes o regulaciones actuales </li>
            <li>Use un software artesanal o automático para hacer "scraping" en la plataforma.</li>
            <li>Use una plataforma con fines comerciales u otros fines que no sean compatibles en estos términos. </li>
            <li>Intervención o dañar la plataforma a través del uso de virus informáticos, bots, troyano o tecnología similar.</li>
            <li>Use la plataforma para distribuir correos electrónicos de comercio no deseados ("SPAM") o publicidad </li>
            <li>Acosar a otros usuarios en nuestra plataforma o recopilar o almacenar cualquier información de identidad personal sobre cualquier otro usuario, diferente del propósito de negociar como propietarios o inquilinos </li>
            <li>Recomendar, como propietarios, espacios que no son de su propiedad y no tenga permisos para ser alquilado. </li>
            <li>Ponerse en contacto con el arrendador para propósitos que no sean relacionados con el alquiler o su espacio publicitario. </li>
            <li>Contactar a los inquilinos en cualquier propósito, que no sea relacionada con la reserva o el uso de su espacio. </li>
            <li>La propuesta de un usuario a un servicio o sitio web de terceros como competidores de StackingUp sin el consentimiento por escrito de StackingUp. </li>
            <li>Hacerse pasar por otra persona </li>
            <li>Use la plataforma para encontrar un servidor o inquilino, y luego complete las transacciones fuera a la plataforma</li>
            <li>Publicar, descargar, enviar o transferir cualquier contenido:</li>
                <ol className='list-decimal ml-20'>
                    <li>Infrinja, se apropie indebidamente o viole la patente los derechos de autor, la marca comercial, el secreto comercial, los derechos morales u otros derechos de propiedad intelectual de un tercero, o los derechos de publicidad o privacidad. </li>
                    <li>Violar o contribuir a todos los actos de infringir cualquier ley o reglamento aplicable o conducir a la responsabilidad civil. </li>
                    <li>Sea fraudulento, falso, engañoso o engañoso. </li>
                    <li>Sea difamatorio, obsceno, pornográfico, vulgar u ofensivo. </li>
                    <li>Promover la discriminación, intolerancia, racismo, odio, persecución o daño de cada persona o grupo. </li>
                    <li>Sea violento o amenazante o contribuya a la violencia o a acciones que amenazan a cualquier otra persona. </li>
                    <li>Contribuir a las acciones o sustancias ilegales o dañinas. </li>
                </ol>
            <li>Vulnerar la propiedad intelectual de StackingUp </li>
        </ol>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Compensación</h3>
        <p>{compensacion}</p>
            <ol className='list-decimal ml-14'>
                <li>Acceso a esta plataforma o violación de las condiciones. </li>
                <li>Su contenido publicado como usuario de StackingUp. </li>
                <li>Cualquier daño que ocurra con cada persona o propiedad debido a uso, ocupación, desconexión o de entrada o salida de cualquier espacio convertido. </li>
                <li>Interacción con cualquier miembro de la reserva de un espacio o su uso, condiciones o ubicaciones arrendadas por usted, incluso a lesiones, perdidas o daños de cualquier tipo debido a la relación o el resultado de la contratación, la reserva o el uso espacial. </li>
                <li>Cualquier disputa entre usted y otro usuario del sitio web o servicio. </li>
                <li>Cualquier violación o tareas ilegales de terceros. </li>
            </ol>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Enlaces</h3>
        <p>{enlaces}</p>
            <ol className='list-decimal ml-14'>
                <li>Disponibilidad o precisión de dichos sitios web o recursos.</li>
                <li>Contenido, productos o servicios o disponibles en lugares o recursos. </li>
            </ol>
        <p>{enlaces2} <a className='text-[#4aa7c0]' target="_blank" href="https://www.mapbox.com/legal/tos">https://www.mapbox.com/legal/tos</a></p>
        <h3 className='text-md font-bold text-[#256172] italic mb-2 mt-2'>Modificación de condiciones</h3>
        <p>{modificacionCondiciones}</p>
        <h3 className='text-md font-bold italic text-[#256172] italic mb-2 mt-2'>Política contra la discriminación </h3>
        <p>{discriminacion}</p>
        </div>
        </div>
    )
}

export default Terminos;

const condiciones = "StackingUp proporciona una plataforma para que los posibles inquilinos y propietarios a conozcan los servicios de reserva y alojamiento en línea. StackingUp no posee propiedades y no proporciona servicios de corretaje de bienes raíces. Las responsabilidades de StackingUp se limitan a: "
const condiciones2 = "Al usar la plataforma, usted acepta estar sujeto legalmente a estos Términos de servicio. Estos términos condicionan su acceso y uso de la plataforma formando así un contrato legalmente vinculante entre usted y StackingUp. Si no está de acuerdo con estos términos, no estará autorizado a utilizar los servicios proporcionados por StackingUp. StackingUp no es responsable sobre el contenido de un anuncio o el estado, la legalidad o la idoneidad de cualquier espacio. "
const acceso = "No estar registrado no prohíbe el acceso para ver los anuncios de la plataforma, pero si para reservar su lugar o crear una oferta. Para obtener esos permisos, primero debe convertirse en miembro registrándose en una cuenta de StackingUp. Los visitantes y los miembros no registrados aceptan cumplir con todos los términos y condiciones establecidos en este documento. StackingUp no permite el uso de sus servicios a menores de 18 años. Al acceder o utilizar la Plataforma, usted declara que tiene 18 años o más. "
const registro = "No puede tener más de una (1) cuenta de StackingUp activa. Usted garantiza que la información proporcionada durante el registro es y seguirá siendo cierta. StackingUp se reserva el derecho de suspender o cerrar su cuenta y acceso a la Plataforma sin causa y previo aviso. Algunas posibles razones de cancelación incluyen: "
const inquilino = "Es responsabilidad del arrendador verificar el pasado, el historial crediticio y/o los antecedentes penales del arrendatario y denegar la tenencia del arrendatario, si corresponde. StackingUp se reserva el derecho, pero no tiene la obligación, de realizar las mismas verificaciones de antecedentes penales o verificaciones de crédito, pero no es responsable de tales antecedentes, y usted exime a StackingUp por cualquier responsabilidad que surja de la actividad o violaciones del anfitrión. Dichas comprobaciones o acciones las lleva a cabo el arrendador tras recibir información básica sobre el arrendatario. Por la presente, acepta el uso por parte de StackingUp de servicios de terceros para verificaciones de antecedentes razonables, a exclusivo criterio de StackingUp, para su uso de estos términos y su uso del Sitio y Su servicio. StackingUp se reserva el derecho de negarse a proporcionar cualquier servicio a cualquier usuario en función de las verificaciones de antecedentes descritas anteriormente. "
const anuncio = "Como miembro de StackingUp, podrá publicar anuncios. Para hacer esto, se le harán una variedad de preguntas sobre el espacio, incluidas, entre otras, la ubicación, el tamaño, la disponibilidad, el precio y otra información adicional. Cada espacio debe tener una dirección física válida. Usted reconoce y acepta que es responsable de los anuncios publicados. Por la presente declara y garantiza que cualquier publicidad que realice y cualquier reserva o uso de cualquier espacio cumplirá con la ley aplicable y no violará ningún acuerdo con terceros. Tenga en cuenta que StackingUp no es responsable del cumplimiento de las leyes, normas y reglamentos aplicables por parte de los propietarios. StackingUp se reserva el derecho de eliminar o bloquear el acceso a cualquier publicidad en cualquier momento y por cualquier motivo, incluso en violación de estos términos o que se considere perjudicial para la plataforma o la comunidad de StackingUp sin previo aviso. "
const condiciones_reserva = "Después de reservar en la plataforma, los usuarios deben firmar un contrato de alquiler específico si así lo desean, y StackingUp no será parte de ese contrato. "
const arrendador = "El espacio se tiene que reservar 24 horas antes como mínimo. Una vez realizada la reserva queda en manos del arrendador y el inquilino ponerse de acuerdo para el traslado de los objetos. Tras finalizar el periodo de arrendamiento, o del mes, se realizará el pago por parte de StackingUp al arrendador de su parte correspondiente. "
const inquilino2 = "Antes de finalizar la reserva, usted acepta pagar a StackingUp la cantidad especificada. Usted comprende y acepta que StackingUp tiene derecho a  "
const inquilino2_2 = "Usted reconoce y acepta que StackingUp y el arrendador no son responsables de los artículos almacenados sin previo aviso. Para las solicitudes de reserva, se le pedirá que proporcione su información de pago habitual (incluidos los datos de la tarjeta de crédito). Por la presente, autoriza a StackingUp a pagar dichos pagos directa o indirectamente a través de un procesador de pagos en línea de terceros o a través de uno de los métodos de pago descritos en el sitio web o el servicio. Los servicios de tarjeta de crédito están disponibles en la aplicación de reserva. Si se le redirige a un procesador de pagos externo de StackingUp, es posible que esté sujeto a las condiciones de uso y las prácticas de recopilación de datos personales de ese tercero. "
const inquilino_local = "Los propietarios notificarán a los inquilinos cuando se pueda acceder a los artículos almacenados. En algunos casos, los propietarios pueden ofrecer a los inquilinos acceso ilimitado. A menos que se especifique lo contrario en un acuerdo entre propietario e inquilino por escrito, los inquilinos deben comunicarse con el propietario al menos con 24 horas de anticipación para solicitar acceso. "
const desalojo = "Los inquilinos deben liberar todos los espacios al final del período de reserva. Los inquilinos deben retirar todos los artículos y mantener el espacio en buenas condiciones. Después de que el inquilino haya retirado todos los artículos almacenados, pagado todas las tarifas pendientes, restaurado el espacio a la condición deseada y cancelado el contrato de arrendamiento, el inquilino ya no tendrá acceso ni ocupará espacio. "
const pago = "El importe correspondiente a la renta se ingresará en la cuenta del arrendador cada mes. Los organizadores proporcionarán información auténtica al respecto. El arrendador se compromete a nunca pedirle al inquilino que pague directamente por parte o la totalidad del espacio y el inquilino se compromete a nunca realizar un pago directo al arrendador. Si un usuario incumple esta prohibición, StackingUp podrá cancelar la cuenta del propietario o arrendatario de forma inmediata, quien será responsable del pago de los costes. Cualquier disputa y/o litigio entre inquilinos y propietarios con respecto al pago directo en violación de esta disposición se resolverá únicamente entre dichas partes y StackingUp no se intercambiará.  "
const tarifas = "StackingUp cobra a los inquilinos una comisión basada en un porcentaje de la oferta establecida por el propietario. Estas tarifas no son reembolsables a menos que se indique lo contrario en este documento. "
const pagos = "StackingUp ofrece a los propietarios una garantía de pago limitada. Después de confirmar la reserva y confirmar el pago del primer mes, StackingUp garantiza que en los meses siguientes, si el inquilino no paga todo o parte del costo total, StackingUp reembolsará al arrendador la cantidad máxima de dinero de un mes de alquiler. "
const cancelaciones1 = "Es responsabilidad del arrendatario, no del arrendador, cancelar un alquiler una vez que el arrendatario haya trasladado sus artículos almacenados. Si un arrendatario cancela una reserva antes de su fecha de inicio, no se cobrará ningún importe en concepto de precio de alquiler o de comisiones. Por otras cuestiones deberá ponerse en contacto con "
const cancelaciones1_end = " para que se encargue el equipo correspondiente a dar una solución lo más rápido posible."
const cancelaciones2 = "Si un arrendador necesita cancelar un alquiler antes de que el arrendatario almacene sus pertenencias, deberá cancelar la reserva con el botón correspondiente. Si por alguna razón un arrendador necesita cancelar una reserva después de que el arrendatario haya almacenado sus artículos y sin mediar incumplimiento por parte del arrendatario, el anfitrión deberá notificar al arrendatario cuando se producirá recogida del objeto y se le cobrará lo que estaba estipulado en el contrato. "
const chat = "La aplicación dispone de un método de mensajería para ponerse en contacta los arrendadores con los arrendatarios. Esta opción no dispone de un método de cifrado de los mensajes por lo que podrán ser revisados por administradores de la aplicación por si se le notificará alguna incidencia. StackingUp se reserva el derecho del uso de estos mensajes. "
const impuestos = "Usted comprende y acepta que es el único responsable de determinar los requisitos de contabilidad fiscal aplicables. "
const danyos = "Propietarios e inquilinos son los únicos responsables de su relación contractual y acuerdan no incluir a StackingUp en cualquier disputa entre ellos, a menos que estos Términos exijan expresamente la participación de StackingUp. Uso prohibido del espacio y las instalaciones del inquilino para ningún propósito ilegal. Los siguientes artículos están prohibidos: "
const danyos2 = "Si el arrendador observa que un inquilino almacena uno de estos artículos ilegales, se reservan el derecho de cancelar la reserva de inmediato y exigir que el inquilino retire cualquier elemento almacenado en su espacio. Si el arrendador no repara el incumplimiento o no se deshace de dichos artículos guardados dentro de un tiempo razonable, el arrendador, a su exclusivo criterio, puede tomar cualquier medida permitida por la ley, que puede incluir, entre otros, la confiscación de dichos artículos de conformidad con ley aplicable. Los propietarios también pueden comunicarse con la policía u otras autoridades para denunciar posibles actividades ilegales por parte de los inquilinos.  "
const danyos3 = "Riesgo de lesiones por negligencia del propietario: Si un objeto en el tiempo de almacenamiento se rompe o se deteriora, el responsable, en este caso es del arrendatario. El arrendatario tiene derecho a observar, en la medida de lo posible, el objeto que va a ser almacenado en su espacio para comprobar el estado de este.  "
const danyos4 = "Normas del propietario: El inquilino se compromete a cumplir las normas y reglamentos del propietario y cualquier otra regla contenida en la oferta o acordada con el inquilino. De lo contrario, StackingUp se reserva el derecho de tomar las medidas contenidas en estos términos y condiciones. "
const medidas = "Si el Inquilino está en \"incumplimiento\", StackingUp tomará las medidas razonables para notificar al inquilino sobre el incumplimiento y permitirle que lo resuelva dentro de un tiempo razonable. Si el arrendatario no soluciona dichas violaciones, StackingUp puede tomar una o más de las siguientes acciones:  "
const medidas1 = "Notificar al arrendatario con tres (3) días de anticipación para recoger el objeto hasta la terminación del contrato de arrendamiento. Si el inquilino no recoge el objeto en el plazo estipulado, además de que el precio de dicho alquiler de espacio en ese tiempo deberá ser pagado, el objeto será derivado a un almacén. Si el inquilino, en un plazo de quince (15) días no lo hace, el arrendador perderá la propiedad del objeto. "
const medidas2 = "Notificar a StackingUp de dichas violaciones donde el arrendador deberá cooperar con StackingUp de cara a cualquier acción contra el arrendatario. "
const cobro = "El inquilino acepta tomar todos los costos necesarios, si es necesario para solicitar acusaciones con jueces o cualquier otro. Con respecto al uso de la plataforma StackingUp, los usuarios no necesitan ninguno de los siguientes puntos:  "
const compensacion = "Usted acepta mantener al margen a StackingUp y sus socios (incluidos los empleados, los agentes, etc.), en todas las quejas sobre la responsabilidad, el daño, la pérdida y el costo debido a:  "
const enlaces = "La plataforma puede contener enlaces a sitios web o recursos de otras compañías. Reconoce y acepta que StackingUp no es responsable de:  "
const enlaces2 = "Los enlaces a estas páginas o recursos no están relacionados con dicho patrocinio StackingUp. Algunas secciones de la plataforma StackingUp implementan servicios de mapeo. Su uso está sujeto a las siguientes condiciones:"
const modificacionCondiciones = "StackingUp se reserva el derecho de modificar la plataforma o estos términos y condiciones, incluidas las tarifas pagadas en virtud de este acuerdo, en cualquier momento a su exclusivo criterio y sin previo aviso. "
const discriminacion = "StackingUp es una aplicación web gratuita dedicada a conectar personas para mejorar la accesibilidad de almacenamiento físico. StackingUp da la bienvenida y sirve a una comunidad increíblemente diversa que conecta a seres humanos de diferentes culturas, valores y normas. Debe cumplir con todas las leyes aplicables para mantener su usuario dentro de la plataforma. Los arrendadores deben recordar que a nadie le gusta ser rechazado. Un arrendador puede tener y declarar una razón razonable y válida para negarle a un inquilino potencial, pero hacerlo puede causar incomodidad o descalificación para un miembro de nuestra comunidad si no dispone de dichas razones. Los arrendadores deben hacer todo lo posible para dar la bienvenida a los inquilinos en todos los ámbitos de la vida. "
