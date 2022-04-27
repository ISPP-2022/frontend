import Head from 'next/head';
import FrequentQuestions from '../../components/FrequentQuestions';
import Footer from '../../components/Footer';

export default function index(props) {
  return (
    <div>
      <Head>
        <title>Preguntas frecuentes</title>
      </Head>
      <FrequentQuestions/>
      <Footer/>
    </div>
  )
}