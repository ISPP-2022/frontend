import { Comments } from "../../components/Comments";
import { Subtitle, Title } from "../../components/Core/Text";
import Head from "next/head";
import axios from "axios";

/** A partir del context proporcionado por getServerSideProps(context), 
 * saca el id del usuario y obtiene las reseñas que se le han hecho.
 * Devuelve las reseñas y un objeto cuyas claves son los id de las reseñas 
 * y los valores son el nombre completo del usuario que realizó la reseña
 * 
 * @param {*} param0 
 * @returns {object} data
 */
async function getRatingComponentData({query}){
  const ratings = await axios.get(
    `${process.env.DATA_API_URL}/api/v1/users/${query.id}/ratings`
  );

  const reviewers = {};

  for(var id in ratings.data){
    const rating = ratings.data[id]
    const user = await axios.get(
      `${process.env.DATA_API_URL}/api/v1/users/${rating.reviewerId}`
    );
    const ratingId = rating.rating;
    reviewers[ratingId] = user.data.name + " " + user.data.surname;
  }
  return { ratings: ratings.data || [], reviewers: reviewers || [] };
}

export function getServerSideProps(context) {
  return {
    props: getRatingComponentData(context),
  };
}

function User(props) {
  const { ratings } = props;
  const { reviewers } = props;
  return (
    <div>
      <Head>
        <title>Usuario</title>
      </Head>
      <Title> Página del usuario ª</Title>
      <Comments ratings={ratings} reviewers={reviewers}/>
    </div>
  );
}

export default User;
