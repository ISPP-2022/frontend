import React from 'react'
import niceInvoice from 'nice-invoice';
import Invoice from '../../../components/Payment/Invoice';
import jwt from 'jsonwebtoken'
import axios from 'axios';


function invoice(props) {
   
  return (
    <>
    <Invoice rentId={props.rentId}/>
    </>
  )
}

export async function getServerSideProps(ctx) {  

    const rentalId = ctx.params.id;
    const cookies = ctx.req.cookies;
    const user = jwt.decode(cookies.authToken);
    
    /*
    if (user===null) {
      console.log("AAAAAAAAAAAAAAAAAAA");
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    } */

    let rental = null;
    let space = null;
    let renter = null;
    let owner = null;

    const result = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/rentals/${rentalId}`)
    .then(res => {
        rental = res.data;
    }).catch(err => {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    })
    
    const result2 = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${rental.spaceId}`)
    .then(res => {
      space = res.data;
    }).catch(err => {
      console.log("Error retrieving the space")
    });

    const result3 = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${rental.renterId}`)
    .then(res => {
      renter = res.data;
    }).catch(err => {
      console.log("Error retrieving the renter user")
    });

    if (user.userId!==rental.renterId) {
      console.log("BBBBBBBBBBBBB");
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    } 

    const result4 = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.ownerId}`)
    .then(res => {
      owner = res.data;
    }).catch(err => {
      console.log("Error retrieving the owner user")
    });

    let costWithoutIva = rental.cost / 1.21;

    const invoiceDetail = {
        shipping: {
        name: renter.name + " " + renter.surname,
        address: "Desconocido",
        city: "Desconocido",
        state: "Desconocido",
        country: "España",
        postal_code: "Desconocido"
        },
        items: [
        {
            item: space.name,
            description: "         Espacio para guardar objetos.",
            owner: owner.name + " " + owner.surname,
            price: costWithoutIva , 
            quantity: 1,
            tax: "21 % (IVA)",
        }
        ],
        subtotal: rental.cost,
        total: rental.cost,
        order_number: rental.id,
        header:{
            company_name: "Reserva de espacio",
            company_logo: "public/logo.png",
            company_address: "Stacking Up           Avenida Reina Mercedes, Sevilla, 41012"
        },
        footer:{
        text: "El coste unitario incluye las comisiones de StackingUp. Contacto: stackingup13@gmail.com"
        },
        currency_symbol:"€", 
        date: {
        billing_date: "No procede",
        due_date: "No procede",
        }
    };

    niceInvoice(invoiceDetail, `public/invoices/${rentalId}.pdf`);

    return {
        props: {
            rentId: rentalId,
        }
    }
}
  

export default invoice