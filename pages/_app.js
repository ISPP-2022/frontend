import '../styles/globals.css'
import '../styles/SpacesCarousel.css';
import TopNav from '../components/TopNav'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopNav />
      <div className='mt-16'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
