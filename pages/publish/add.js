import AdvertisementForm from '../../components/forms/AdvertisementForm'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
var jwt = require('jsonwebtoken');

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