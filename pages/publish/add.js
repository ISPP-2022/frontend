import AdvertisementForm from '../../components/forms/AdvertisementForm'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


export default function index() {
  return (
    <div>
      <AdvertisementForm isEdit={false}/>
    </div>
  )
}