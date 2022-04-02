import React from 'react'



function Invoice(props) {
  return (
    <>
    <h2 className='font-bold py-2 text-3xl text-blue-bondi text-center'>¡Espacio reservado! Si hay algún dato erróneo, ponte en contacto con nosotros.</h2>

    <iframe className='h-screen w-full' src={"http://localhost:3000/invoices/" + props.rentId + ".pdf"} 
        type="application/pdf" />
    </>
  )
}


export default Invoice