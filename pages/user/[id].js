import { Comment } from "../../components/Comment";
import { Subtitle, Title } from "../../components/Core/Text";
import Head from "next/head";

function Space() {
  return <div>
    <Head>
      <title>Usuario</title>
    </Head>
    <Title> Página de un usuario </Title>
    <Comment></Comment>
    </div>
}

export default Space