import '../styles/globals.css'
import '../styles/SpacesCarousel.css';
import TopNav from '../components/TopNav'
import App from 'next/app'
import jwt from 'jsonwebtoken';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopNav user={pageProps.user} />
      <div className='pt-16 h-screen'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const authToken = appContext.ctx.req ? appContext.ctx.req.cookies.authToken : null;
  if (authToken) {
    try {
      appProps.pageProps.user = jwt.decode(authToken);
    } catch (error) {
      console.log('Invalid token');
    }
  }
  return { ...appProps }
}

export default MyApp
