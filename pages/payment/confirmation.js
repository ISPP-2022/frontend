import React from 'react'
import Confirmation from '../../components/Payment/Confirmation'
import { withRouter } from 'next/router'
import { useState } from 'react'

function confirmation(props) {

  const [initialDate, setInitialDate] = useState(props.router.query.initialDate);
  const [finalDate, setFinalDate] = useState(props.router.query.finalDate);
  const [type, setType] = useState(props.router.query.type);
  const [cost, setCost] = useState(props.router.query.cost);
  const [meters, setMeters] = useState(props.router.query.meters);
  const [spaceId, setSpaceId] = useState(props.router.query.spaceId);
  const [renterId, setRenterId] = useState(props.router.query.renterId);
  const [city, setCity] = useState(props.router.query.city);
  const [province, setProvince] = useState(props.router.query.province);
  const [name, setName] = useState(props.router.query.name);  
  const [token, setToken] = useState(props.router.query.token);

  return (
    <>
    {/* token === undefined significa que ha accedido poniendo en la URL /payment/confirmation, no por reserva */}
    {token !== undefined ? (
    <Confirmation 
      initialDate={initialDate} 
      finalDate={finalDate}
      type={type}
      cost={cost}
      meters={meters}
      spaceId={spaceId}
      renterId={renterId}
      city={city}
      province={province}
      name={name}
      token={token}
    /> ) : <></>}

    </>
  )

}

export default withRouter(confirmation)
