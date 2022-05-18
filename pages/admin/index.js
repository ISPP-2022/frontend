import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Admin() {
  const router = useRouter();
  const [type, setType] = useState('user');
  const [page, setPage] = useState(0);
  const [data, setData] = useState([])

  const typeTransate = {
    'MONTH': 'Mensual',
    'HOUR': 'Por horas',
    "DAY": 'Por días',
  }

  const header = {
    user: { 'ID': 'id', 'Nombre': 'name', 'Apellido': 'surname', 'Email': 'email', 'Rol': 'role', 'Numero de telefono': 'phoneNumber' },
    space: { 'Nombre': 'name', 'Fecha de inicio': 'initialDate', 'Fecha de fin': 'finalDate', 'Ciudad': 'city' },
    rentals: { 'ID': 'id', 'Inquilino': 'renterId', 'Espacio': 'spaceId', 'Fecha de inicio': 'initialDate', 'Fecha de fin': 'finalDate', 'Tipo': 'type' },
  }

  const table = {
    user: (<table className="w-full">
      <thead className="h-14 bg-blue-bondi-dark text-white">
        <tr>
          {header[type] && Object.keys(header[type]).map((key, index) => {
            return (
              <th key={index} className='border'>{key}</th>
            )
          })}
          <th className='border'>
            Editar
          </th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, index) => {
          return (
            <tr key={index} className='border h-12 odd:bg-gray-400 even:bg-gray-300'>
              {Object.values(header[type]).map((key, index) => {
                return (
                  <td key={index} onClick={() => router.push('/user/' + item.id)} className='border text-center font-semibold'>{item[key] || '-'}</td>
                )
              })}
              <td className='border text-center'>
                <svg onClick={() => router.push('/user/edit/' + item['id'])} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 m-auto cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>),
    space: (<table className="w-full">
      <thead className="h-14 bg-blue-bondi-dark text-white">
        <tr>
          <th className='border'>ID</th>
          <th className='border'>Dueño</th>
          {header[type] && Object.keys(header[type]).map((key, index) => {
            return (
              <th key={index} className='border'>{key}</th>
            )
          })}
          <th className='border'>
            Compartido
          </th>
          <th className='border'>
            Editar
          </th>
          <th className='border'>
            Eliminar
          </th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, index) => {
          return (
            <tr key={index} className='border h-12 odd:bg-gray-400 even:bg-gray-300 '>
              <td onClick={() => router.push('/space/' + item.id)} className='border text-center font-semibold'>{item['id'] || '-'}</td>
              <td onClick={() => router.push('/space/' + item.id)} className='border text-center font-semibold'>{item['ownerId'] || '-'}</td>
              {Object.values(header[type]).map((key, index) => {
                return (
                  <td onClick={() => router.push('/space/' + item.id)} key={index} className='border text-center font-semibold'>{item[key] || '-'}</td>
                )
              })}
              <td className='border text-center font-semibold'>{item['shared'] ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }</td>
              <td className='border text-center'>
                <svg onClick={() => router.push('/publish/edit/' + item['id'])} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 m-auto cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </td>
              <td className='border text-center'>
                <svg onClick={() => {
                  confirm('¿Estas seguro de eliminar este espacio?') &&
                    axios.delete(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${item.id}`, { withCredentials: true }).then(() => {
                      alert('Borrado exitosamente')
                      setType('user')
                      setType('space')
                    })
                      .catch(err => {
                        if (err.response?.status === 400) {
                          if (err.response.data === 'Cannot delete space containing rentals') {
                            alert('No se puede eliminar este espacio porque tiene alguna reserva asociada')
                          }
                        }
                      })
                }} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 m-auto text-red-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>),
    rentals: (<table className="w-full">
      <thead className="h-14 bg-blue-bondi-dark text-white">
        <tr>
          {header[type] && Object.keys(header[type]).map((key, index) => {
            return (
              <th key={index} className='border'>{key}</th>
            )
          })}
          <th className='border'>
            Factura
          </th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, index) => {
          return (
            <tr key={index} className='border h-12 odd:bg-gray-400 even:bg-gray-300'>
              {Object.values(header[type]).filter(x => x !== 'type').map((key, index) => {
                return (
                  <td key={index} className='border text-center font-semibold'>{item[key] || '-'}</td>
                )
              })}
              <td className='border text-center font-semibold'>
                {typeTransate[item['type']]}
              </td>
              <td onClick={() => router.push('/payment/invoice/' + item['id'])} className='border text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 m-auto cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>),
  }

  useEffect(() => {
    setData(null)
    const fetchData = async () => {
      let url;
      switch (type) {
        case 'user':
          url = `${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users?offset=${page * 10}&limit=10`
          break;
        case 'space':
          url = `${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces?offset=${page * 10}&limit=10`
          break;
        case 'rentals':
          url = `${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/rentals?offset=${page * 10}&limit=10`
          break;
        default:
          url = `${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users?offset=${page * 10}&limit=10`
          break;
      }
      const result = await axios.get(url)
        .then(res => res.data)
      if (type === 'user') {
        result.map(item => {
          item.email = item.auth.email
          item.role = item.auth.role
          return item
        })
      }
      setData(result)
    }
    fetchData()
  }, [type, page])

  useEffect(() => {
    setPage(0)
  }, [type])

  return (
    <>
      {/*Screen */}
      <div className="flex h-screenC p-10 justify-center">
        <main className="grid h-full w-11/12 grid-rows-[100px_1fr] xl:grid-cols-[250px_1fr]">
          <menu className="p-2 ">
            <ul className="flex flex-row xl:flex-col xl:h-44">
              <li onClick={() => setType('user')} className="bg-blue-bondi-dark basis-1/3 h-20 flex justify-center items-center rounded-l-xl xl:rounded-bl-none xl:rounded-t-xl text-2xl font-bold text-white hover:opacity-75 hover:cursor-pointer">
                <p>Usuarios</p>
              </li>
              <li onClick={() => setType('space')} className="bg-blue-bondi basis-1/3 h-20 flex justify-center items-center text-2xl font-bold text-white hover:opacity-75 hover:cursor-pointer">
                <p>Espacios</p>
              </li>
              <li onClick={() => setType('rentals')} className="bg-blue-bondi-dark basis-1/3  h-20 flex justify-center items-center rounded-r-xl xl:rounded-tr-none xl:rounded-b-xl text-2xl font-bold text-white hover:opacity-75 hover:cursor-pointer">
                <p>Alquileres</p>
              </li>
            </ul>
          </menu>
          <section className="xl:px-10">
            {table[type]}
            {data && data.length > 0 &&
              <footer className="flex justify-end">
                <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${page === 0 ? 'text-gray-400' : 'text-gray-700 cursor-pointer'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <p className="inline text-lg text-gray-700 font-semibold">{page * 10 + 1}-{page * 10 + data.length}</p>
                <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${data.length < 10 ? 'text-gray-400' : 'text-gray-700 cursor-pointer'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </footer>
            }
          </section>
        </main>
      </div>
    </>
  )
}