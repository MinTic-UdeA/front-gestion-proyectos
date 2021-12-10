// index en el que se listan todos los usuarios.
import React, { useEffect } from 'react'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { APROBAR_USUARIO } from 'graphql/usuarios/mutations';
import { useQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';

const IndexUsuarios = () => {

    /*  const { userData } = useUser(); */
    const { data, error, loading, refetch } = useQuery(GET_USUARIOS);

    useEffect(() => {
    }, [data])

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los usuarios")
        }
    }, [error])

    if (loading) return <div className="m-4">Cargando....</div>;

    return (
        <PrivateRoute roleList={["LIDER", "ADMINISTRADOR"]} >
            <div>
                <h1 className="px-16 py-7 text-3xl text-gray-800">Listado de Usuarios</h1>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Identificación</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.Usuarios.map((u) => {
                            return (
                                <tr key={u._id}>
                                    <td>{u.nombre}</td>
                                    <td>{u.apellido}</td>
                                    <td>{u.correo}</td>
                                    <td>{u.identificacion}</td>
                                    <td>{Enum_Rol[u.rol]}</td>
                                    <td>{Enum_EstadoUsuario[u.estado]}</td>
                                    <td className="text-center">
                                        <Aprobacion usuario={u} refetch={refetch} />
                                        {/*    <Link to={`/usuarios/editar/${u._id}`}>
                                            <i className='fas fa-times-circle p-1 text-xl text-gray-400 hover:text-red-600 cursor-pointer' />
                                        </Link> */}
                                    </td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </PrivateRoute>
    )
}

const Aprobacion = ({ usuario, refetch  }) => {

    const [aprobarUsuario, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(APROBAR_USUARIO)

    useEffect(() => {
        if (mutationData) {
          refetch();
        }
      }, [mutationData, refetch]);

    const cambiarEstadoUsuario = () => {
        aprobarUsuario({ variables: { _id: usuario._id } });
    };
    return (
        <div>
            <button onClick={() => {cambiarEstadoUsuario();}}>
                <i className='fas fa-check-circle p-1 text-xl text-gray-400 hover:text-green-600 ' />
            </button>
        </div>
    );
};

export default IndexUsuarios

// recordar agregar al sidebar y al app.jsx