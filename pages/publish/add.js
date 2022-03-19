import AdvertisementForm from '../../components/forms/AdvertisementForm'
import jwt from 'jsonwebtoken'

export default function index(props) {
  return (
    <div>
      <AdvertisementForm isEdit={false} userId={props.user.userId} />
    </div>
  )
}


export function getServerSideProps(ctx) {
  const cookies = ctx.req.cookies;
  const user = jwt.decode(cookies.authToken);
  return {
    props: {
      user: user,
    },
  };
}