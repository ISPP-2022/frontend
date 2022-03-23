import AdvertisementForm from '../../components/forms/AdvertisementForm'
import jwt from 'jsonwebtoken'
import Head from 'next/head';

export default function index(props) {
  return (
    <div>
      <Head>
        <title>Publicar espacio</title>
      </Head>
      <AdvertisementForm isEdit={false} userId={props.user.userId} />
    </div>
  )
}


export function getServerSideProps(ctx) {
  const cookies = ctx.req.cookies;
  const user = jwt.decode(cookies.authToken);

  console.log(user)
  if (parseInt(ctx.query?.userId) === user.userId) {
    return {
      props: {
        user: user,
      }
    }
  }

  return {
    redirect: {
      destination: '/publish/add?userId=' + user.userId,
      permanent: false,
    }
  }
}