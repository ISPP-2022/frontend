import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export async function getServerSideProps({ req, res, query }) {
  const user = req.cookies.authToken ? jwt.decode(req.cookies.authToken) : null;
  if (user?.userId) {
    if (parseInt(query?.userId) === user.userId) {
      return {
        props: {
          userId: user.userId,
        }
      }
    }

    return {
      redirect: {
        destination: '/smartSearch?userId=' + user.userId,
        permanent: false,
      }
    }
  } else {
    if (query?.userId) {
      return {
        redirect: {
          destination: '/smartSearch',
          permanent: false,
        }
      }
    }
  }
  return {
    props: {
      userId: '',
    }
  }
}

function Selection(props) {
  const router = useRouter();
  return (
    <div className="h-full md:bg-gray-100 flex justify-center items-center">
      <Head>
        <title>SmartSearh</title>
      </Head>
      <div className="md:bg-white p-4 md:h-[75vh] md:w-2/3 md:mt-3 md:min-h-[440px] md:min-w-[600px] md:rounded-xl md:border-2 md:border-[#4aa7c0] flex flex-col">
        <div className="md:block hidden p-8 mb-5">
          <h1 className="text-5xl flex justify-center items-center font-bold text-[#4aa7c0] ">¿Qué buscas?</h1>
        </div>
        <div className="grid grid-cols-1 md:flex md:justify-center md:flex-row md:space-x-9 h-full md:items-center space-y-6 md:space-y-0">
          <Link href='smartSearch/space' passHref>
            <button>
              <div className="grid grid-cols-1 gap-4 w-64 h-64  content-center rounded-xl border-2 border-[#4aa7c0] ">
                <div className="flex justify-center">
                  <Image src="/images/garage.svg" width="100" height="100" className="w-36" alt="garage" />
                </div>
                <div>
                  <h3 className="text-2xl justify-center items-center text-[#4aa7c0]">Buscar Espacios</h3>
                </div>
              </div>
            </button>
          </Link>
          <button onClick={() => {
            if (props.userId) {
              router.push("/smartSearch/renter");
            } else {
              alert("Debes iniciar sesión para poder buscar inquilinos");
            }
          }}>
            <div className="grid grid-cols-1 gap-4 w-64 h-64 content-center rounded-xl border-2 border-[#4aa7c0] ">
              <div className="flex justify-center">
                <Image src="/images/searchPerson1.svg" width="100" height="100" className="w-36" alt="tenant" />
              </div>
              <div>
                <h3 className="text-2xl justify-center items-center text-[#4aa7c0]">Buscar Inquilinos</h3>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Selection;