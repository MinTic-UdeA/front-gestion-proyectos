import React, { useEffect } from 'react'
import { GET_USUARIO } from 'graphql/usuarios/queries'
import PrivateRoute from 'components/PrivateRoute';
import { useQuery, useMutation } from '@apollo/client';
// import PrivateComponent from 'components/PrivateComponent';
import { useUser } from 'context/userContext';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';

const IndexPerfil = () => {

  const { userData } = useUser();

  console.log(userData)

  // const _id = userData.id ;
  // const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_USUARIO, { variables: { _id } });

  // useEffect(() => {
  // }, [queryData])

  // if (queryLoading) return <div className="m-4">Cargando....</div>;

  return (
    <PrivateRoute roleList={["LIDER", "ESTUDIANTE"]} >
      <div>
        <h1 className="px-16 py-7 text-3xl text-gray-800">Gestión del perfil</h1>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr key={userData._id}>
              <td>{userData.nombre}</td>
              <td>{userData.apellido}</td>
              <td>{userData.correo}</td>
              <td>{userData.identificacion}</td>
              <td>{Enum_Rol[userData.rol]}</td>
              <td>{Enum_EstadoUsuario[userData.estado]}</td>
              <td className="text-center">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  )
}
export default IndexPerfil;

