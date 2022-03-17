import AdvertisementForm from '../../../components/forms/AdvertisementForm'
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function index(props) {

  
  const [correctUser, setCorrectUser] = useState(false);
  const router = useRouter();

  // Comprobación para que un usuario solo pueda modificar sus espacios
  useEffect(() => {
    axios.get(`http://localhost:4100/api/v1/spaces/${props.spaceId}`)
    .then(res => {
      let ownerId = res.data.ownerId;
      if (ownerId == props.user.userId) {
        setCorrectUser(true);
      } else {
        router.push("/");
      }
      
    }).catch(err => {
      router.push("/"); 
    });

  }, [])
  

  return (
    <>
      {correctUser==true &&
      <div>
        <AdvertisementForm isEdit={true} userId={props.user.userId} spaceId={props.spaceId}/>
      </div>
      }
    </>
  )
}


export function getServerSideProps(ctx) {
  const spaceId = ctx.params.id
  const cookies = ctx.req.cookies;
  const user = jwt.decode(cookies.authToken);

  return {
    props: {
      user: user,
      spaceId: spaceId,
    },
  };
}