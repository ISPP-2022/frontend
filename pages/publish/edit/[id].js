import AdvertisementForm from '../../../components/forms/AdvertisementForm'
import axios from 'axios';
import jwt from 'jsonwebtoken'
import Head from 'next/head';

function Edit(props) {
  return (
    <>
      <div>
        <Head>
          <title>Editor de espacios</title>
        </Head>
        <AdvertisementForm isEdit={true} userId={props.user.userId} space={props.space} />
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {

  const spaceId = ctx.params.id
  const cookies = ctx.req.cookies;
  const user = jwt.decode(cookies.authToken);
  let space = null;

  const result = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${spaceId}`)
    .then(res => {
      space = res.data;
      if (space.ownerId !== user.userId || space === null) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          }
        }
      }
      return {}
    }).catch(err => {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    });

  return {
    redirect: result.redirect,
    props: {
      user: user,
      space: space,
    },
  };
}

export default Edit;