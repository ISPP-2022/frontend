import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useRouter } from 'next/router';

function Confirmation(props) {


  const [comisions, setComisions] = useState(0.1);
  const [iva, setIva] = useState(0.1);
  const [total, setTotal] = useState(0.1);

  const router = useRouter();

  useEffect(() => {
    let coste = parseFloat(props.cost).toFixed(2);
    let comisions = 0.0;
    if (props.userSession.role !== 'SUBSCRIBED') {
      comisions = (+coste * 0.06).toFixed(2);
    }
    let iva = ((+coste + +comisions) * 0.21).toFixed(2);

    setComisions(comisions);
    setIva(iva);
    setTotal((+coste + +comisions + +iva).toFixed(2));

  }, []);


  function parseDates(initialDate, finalDate) {
    let IDSplitted = initialDate.split(',');
    let IDSplitted2 = IDSplitted[0].split("/");
    let newInitialDate = IDSplitted2[2] + "-" + IDSplitted2[1] + "-" + IDSplitted2[0] + IDSplitted[1]

    let FDSplitted = finalDate.split(',');
    let FDSplitted2 = FDSplitted[0].split("/");
    let newFinalDate = FDSplitted2[2] + "-" + FDSplitted2[1] + "-" + FDSplitted2[0] + FDSplitted[1]

    return [newInitialDate, newFinalDate];
  }

  // Hace POST del alquiler y redirige
  async function handleRent() {
    let dateRange = parseDates(props.initialDate, props.finalDate);

    (await axios.post(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/rentals/confirmation`, {
      "rentalToken": props.token
    }, {
      withCredentials: true,
    }).then(res => {
      const rentId = res.data.rentalId;
      router.push(`/payment/invoice/${rentId}`);
    }).catch(err => {
      const alertMessage = "Hubo un error al hacer la reserva. Inténtelo más tarde."
      router.push({
        pathname: "/",
        query: {
          alertMessage: alertMessage
        }
      }, "/");
    }));
  }


  return (
    <>
      <main className='grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-4 '>
        {/* Datos de la reserva */}
        <div className='border border-blue-bondi bg-white shadow-lg rounded-lg'>
          <h2 className='font-bold py-2 text-3xl text-blue-bondi text-center'>Confirmación de reserva</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 space-y-3'>
            <h2 className="pl-2 font-bold text-2xl lg:text-3xl">Nombre del espacio:</h2>
            <p className='text-blue-bondi text-xl pl-2 my-0'>{props.name}</p>

            <h2 className="pl-2 font-bold text-2xl lg:text-3xl">Dirección:</h2>
            <p className='text-blue-bondi text-xl pl-2'>{props.city + "," + props.province}</p>

            <h2 className="pl-2 font-bold text-2xl lg:text-3xl">Periodo de tiempo:</h2>
            <p className='text-blue-bondi text-xl pl-2'>{props.initialDate + " - " + props.finalDate}</p>

            <h2 className="pl-2 font-bold text-2xl lg:text-3xl">Superficie:</h2>
            <p className='text-blue-bondi text-xl pl-2'>{props.meters + " metros cuadrados"}</p>

            <h2 className="pl-2 font-bold text-2xl lg:text-3xl">Precio inicial:</h2>
            <p className='text-blue-bondi text-xl pl-2'>{props.cost + " euros"}</p>

            { props.userSession.role !== 'SUBSCRIBED' &&
              <>
                <h2 className="pl-2 font-bold text-2xl lg:text-3xl">Comisiones (6%):</h2>
                <p className='text-blue-bondi text-xl pl-2'>{comisions + " euros"}</p>
              </>
            }

            <h2 className="pl-2 font-bold text-2xl lg:text-3xl">IVA (21%):</h2>
            <p className='text-blue-bondi text-xl pl-2'>{iva + " euros"}</p>

            <h2 className="pl-2 font-bold text-2xl lg:text-3xl">PRECIO TOTAL:</h2>
            <p className='text-blue-bondi text-xl pl-2 pb-10 font-bold'>{total + " euros"}</p>

          </div>

        </div>

        {/* Métodos de pago */}
        <div className='border border-blue-bondi bg-white shadow-lg rounded-lg '>
          <h2 className='font-bold py-2 text-3xl text-blue-bondi text-center'>Selecciona un método de pago</h2>

          <div className='px-[10%] py-[5%] align-center '>
            <PayPalButton
              options={{
                currency: "EUR",
                clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'}`
              }}
              amount={total.toString()}
              onSuccess={(details, data) => {
                handleRent();
                return
              }}
              onError={console.log("Error in the transaction.")}
              onCancel={console.log("Transaction cancelled")}
            />
          </div>
        </div>
      </main>

    </>
  )
}

export default Confirmation