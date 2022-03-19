import { Comment } from "../../components/Comment";
import { Subtitle, Title } from "../../components/Core/Text";
import Head from "next/head";
import axios from "axios";

async function getCommentComponentData({query}){
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
  return { ratings: ratings.data, reviewers: reviewers };
}

export function getServerSideProps(context) {
  return {
    props: getCommentComponentData(context),
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
      <Comment ratings={ratings} reviewers={reviewers} ></Comment>
    </div>
  );
}

export default User;
