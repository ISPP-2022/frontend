import { Button } from "../../components/Core/Button";
import axios from "axios";
import UserInfo from "../../components/User/index.js";
import format from "date-fns/format";
import Link from "next/link";
import { CardMobile } from "../../components/Card/";

export default function User({ user, spaces, ratings, rentals }) {

  return (
    <div className="mt-16 h-screenC md:bg-gray-100 flex justify-center items-center">
      <main id='main' className="md:bg-white mb-4 p-5 pl-10 pr-10 md:w-4/5 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-16 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">

        <div className="md:flex md:justify-center">
          <UserInfo user={user} ratings={ratings} />
          <div className="flex justify-center mt-4">
            <Button className="px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2" color="secondary" onClick={() => alert('Iniciando chat')}>
              <div className="flex items-center justify-center">
                <img src="/images/paperplane.svg" className="w-5 h-5" />
                <p className="ml-2"> Chat</p>
              </div>
            </Button>
          </div>
        </div>

        <hr className="my-4" />

        <div className="md:flex">
          <div id="UserDetails" className="md:w-1/2 flex-col justify-center text-center">
            <h2 className="text-2xl font-bold mt-4 text-webcolor-50 underline mb-2">
              Más información acerca de {user?.name.split(" ")[0] || SomeUser}
            </h2>
            {user?.birthDate &&
              <div className="flex items-center justify-center relative">

                <p>Fecha de nacimiento: {format(new Date(user.birthDate), "dd/MM/yyyy")}</p>

              </div>
            }

            {user?.location &&
              <div className="flex items-center justify-center">
                <p className="ml-2" >Ubicación: {user.location}</p>
              </div>
            }

          </div>

          <div id="Stats" className="md:w-1/2 flex-col justify-center text-center">
            <h2 className="text-2xl font-bold mt-4 mb-2 text-webcolor-50 underline"> Estadísticas</h2>

            <div className="flex items-center justify-center">
              <p className="ml-2" >Espacios: {spaces.length}</p>
            </div>

            <div className="flex items-center justify-center">
              <p className="ml-2" >Alquileres: {rentals}</p>
            </div>

          </div>

        </div>

        <hr className="my-4" />

        <h2 className="text-2xl font-bold mt-4 text-webcolor-50 underline mb-2">
          Espacios
        </h2>
        <div className="relative w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap">
          {spaces && spaces.length > 0 ?
            spaces.map((space, index) => (
              <div key={'mobile' + index} className="shrink-0 basis-1/4 p-4 px-8 inline-block">
                <Link href={`/space/${space.id}`} passHref className="w-full h-full">
                  <a className="w-full h-full flex justify-center">
                    <CardMobile
                      space={space}
                    />
                  </a>
                </Link>
              </div>
            )) : <h1 className="h-full w-full min-h-[200px] flex items-center justify-center text-7xl text-center text-gray-500">Sin resultados</h1>}
        </div>
      </main >
    </div >
  )
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  const user = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}`)
    .then(res => res.data);

  const spaces = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces?userId=${id}`)
    .then(res => res.data).catch(() => []);

  const rentals = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/rentals?userId=${id}`)
    .then(res => res.data.length).catch(() => 0);

  // const spacesImages = await Promise.all(
  //   spaces.map(async space => {
  //     return await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${space.id}/images`)
  //       .then(res => res.data);
  //   }));

  const ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}/ratings?filter=received`).then(res => res.data.map(e => e.rating)).catch(() => []);

  return {
    props: {
      user: user,
      spaces: spaces,
      // spacesImages: spacesImages,
      ratings: ratings,
      rentals: rentals
    },
  };
};
