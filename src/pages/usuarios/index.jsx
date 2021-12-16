// index en el que se listan todos los usuarios.
import React, { useEffect } from 'react'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { CAMBIAR_ESTADO_USUARIO } from 'graphql/usuarios/mutations';
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';


const IndexUsuarios = () => {

    const {  data: queryData, error: queryError, loading: queryLoading, refetch } = useQuery(GET_USUARIOS);

    useEffect(() => {
    }, [queryData])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los usuarios")
        }
    }, [queryError])

    if (queryLoading) return <div className="m-4">Cargando....</div>;

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
                        {queryData && queryData.Usuarios.map((u) => {
                            return (
                                <tr key={u._id}>
                                    <td>{u.nombre}</td>
                                    <td>{u.apellido}</td>
                                    <td>{u.correo}</td>
                                    <td>{u.identificacion}</td>
                                    <td>{Enum_Rol[u.rol]}</td>
                                    <td>{Enum_EstadoUsuario[u.estado]}</td>
                                    <td className="text-center">
                                        <PrivateComponent roleList={["ADMINISTRADOR"]}>
                                            <EstadoUsuario usuario={u} refetch={refetch} estado={"AUTORIZADO"} classname={"fas fa-check-circle p-1 text-xl text-gray-400 hover:text-green-600"} />
                                            <EstadoUsuario usuario={u} refetch={refetch} estado={"NO_AUTORIZADO"} classname={"fas fa-times-circle p-1 text-xl text-gray-400 hover:text-red-600"} />
                                        </PrivateComponent>
                                        <PrivateComponent roleList={["LIDER"]}>
                                            <EstadoUsuario usuario={u} refetch={refetch} estado={"AUTORIZADO"} classname={"fas fa-check-circle p-1 text-xl text-gray-400 hover:text-green-600"} />
                                            <EstadoUsuario usuario={u} refetch={refetch} estado={"PENDIENTE"} classname={"fas fa-minus-circle p-1 text-xl text-gray-400 hover:text-yellow-400"} />
                                        </PrivateComponent>
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

const EstadoUsuario = ({ usuario, refetch, estado, classname }) => {

    const [cambiarEstadoUsuario, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(CAMBIAR_ESTADO_USUARIO)

    useEffect(() => {
        if (mutationData) {
            refetch();
        }
    }, [mutationData, refetch]);

    const cambiarEstado = () => {
        cambiarEstadoUsuario({ variables: { _id: usuario._id, estado: estado } });
    };
    return (
        <button onClick={() => { cambiarEstado(); }}>
            <i className={classname} />
        </button>
    );
};

export default IndexUsuarios

// recordar agregar al sidebar y al app.jsx