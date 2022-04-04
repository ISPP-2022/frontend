import { Comments } from "../../components/Comments";
import { Subtitle, Title } from "../../components/Core/Text";
import Head from "next/head";
import axios from "axios";
import jwt from "jsonwebtoken";

/** A partir del context proporcionado por getServerSideProps(context),
 * saca el id del usuario y obtiene las reseñas que se le han hecho.
 * Devuelve las reseñas y un objeto cuyas claves son los id de las reseñas
 * y los valores son el nombre completo del usuario que realizó la reseña
 *
 * @param {*} param0
 * @returns {object} data
 */
async function getRatingComponentData({ query }) {
  const ratings = await axios
    .get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${query.id}/ratings`)
    .catch(() => {
      return { data: [] };
    });

  const reviewers = {};

  ratings.data = ratings.data.filter((value) => {
    return value.reviewerId !== parseInt(query.id);
  });

  for (var id in ratings.data) {
    const rating = ratings.data[id];

    const user = await axios
      .get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${rating.reviewerId}`)
      .catch(() => {
        return { data: { id: -1, name: "Usuario", surname: "Anónimo" } };
      });

    const ratingId = rating.rating;
    reviewers[ratingId] = {};
    reviewers[ratingId].userName = user.data.name + " " + user.data.surname;
    reviewers[ratingId].userId = user.data.id;
  }
  return { ratings: ratings.data || [], reviewers: reviewers || [] };
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  const user = jwt.decode(cookies.authToken);
  const isLogged = user !== null;
  const prp = await getRatingComponentData(context);
  prp.loggedIn = isLogged;
  prp.loggedUserId = user === null ? -1 : user.userId;
  prp.userId = context.query.id
  return {
    props: prp,
  };
}

function User(props) {
  const { ratings, reviewers, loggedIn, userId, loggedUserId } = props;

  return (
    <div>
      <Head>
        <title>Usuario</title>
      </Head>
      <Title> Página del usuario ª</Title>
      <Comments userId={userId} loggedUserId={loggedUserId} ratings={ratings} reviewers={reviewers} userUrl="/user/${id}" loggedIn={loggedIn} />
    </div>
  );
}

export default User;
