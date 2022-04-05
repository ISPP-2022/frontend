import React from 'react'
import Invoice from '../../../components/Payment/Invoice';
import jwt from 'jsonwebtoken'
import Head from 'next/head';


function invoice(props) {

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,500;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </Head>
      <Invoice user={props.user} />
    </>
  )
}

export async function getServerSideProps(ctx) {

  const cookies = ctx.req.cookies;
  const user = jwt.decode(cookies.authToken);

  // Si no está logueado, redirige a la página principal
  if (user === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  return {
    props: {
      user: user,
    }
  }
}


export default invoice