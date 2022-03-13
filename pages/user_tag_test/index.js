import Head from "next/head";
import { Title } from "../../components/Core/Text";
import { Tags } from "../../components/Tags";

function User() {
  return (
    <div>
      <Head>
        <title>Página de test usuario</title>
      </Head>
      <Title>Página de test usuario</Title>
      <div className="md:w-1/2 border-2 rounded-lg border-blue-bondi">
        <div id="relleno" className="h-96">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          nunc felis, rhoncus at sagittis eget, suscipit at mi. Vivamus
          sollicitudin malesuada tristique. Morbi sed mauris cursus, pulvinar
          dui ac, blandit elit. Integer ex nisi, tincidunt in nibh id, maximus
          pulvinar velit. Praesent malesuada justo at felis commodo congue.
          Mauris faucibus interdum libero a sollicitudin. Pellentesque auctor
          lorem elit, ut pellentesque neque vulputate commodo. Nunc sed neque
          imperdiet, tempor dolor non, molestie erat.
        </div>
        <Tags
          tags={[
            "Limpio",
            "Espacioso",
            "Enchufe",
            "Compartido",
            "Cerrado",
            "Iluminado",
            "Agua",
          ]}
        ></Tags>
        <div id="relleno2" className="h-96">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          nunc felis, rhoncus at sagittis eget, suscipit at mi. Vivamus
          sollicitudin malesuada tristique. Morbi sed mauris cursus, pulvinar
          dui ac, blandit elit. Integer ex nisi, tincidunt in nibh id, maximus
          pulvinar velit. Praesent malesuada justo at felis commodo congue.
          Mauris faucibus interdum libero a sollicitudin. Pellentesque auctor
          lorem elit, ut pellentesque neque vulputate commodo. Nunc sed neque
          imperdiet, tempor dolor non, molestie erat.
        </div>
      </div>
    </div>
  );
}

export default User;
