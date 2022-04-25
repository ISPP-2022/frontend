import '../styles/globals.css'
import '../styles/SpacesCarousel.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import TopNav from '../components/TopNav'
import App from 'next/app'
import jwt from 'jsonwebtoken';
import CookieConsent, { Cookies } from "react-cookie-consent";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [showCookieConsent, setShowCookieConsent] = useState((Cookies.get("CookieConsent") === "true") ? "hidden" : "show");

  return (
    <>
      <TopNav user={pageProps.user} />

      <div className='pt-16 min-h-screen'>
        <Component {...pageProps} />
      </div>
      <div>
        <CookieConsent
          visible={showCookieConsent}
          buttonText="Acepto"
          buttonStyle={{ backgroundColor: '#4AA7C0' }}
          expires={150}
          hideOnAccept
          onAccept={() => setShowCookieConsent("hidden")}>
          Esta web utiliza cookies para mejorar su experiencia de navegación. Consulte nuestra <a href="/privacyPolicy"><b className='text-blue-bondi'>política de privacidad</b></a> para más información. Si continúa navegando, consideramos que acepta su uso.
        </CookieConsent>
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
    }
  }
  return { ...appProps }
}

export default MyApp
