import '../styles/globals.css'
import TopNav from '../components/TopNav'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className=' absolute z-10'>
        <TopNav className="z-10" />
      </div>
      <div className='my-16 z-10'>
        <Component {...pageProps} />
      </div>
    </>

  )
}

export default MyApp
