// index en el que se listan todos los usuarios.
import React, { useEffect } from 'react'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';

const IndexUsuarios = () => {

    const { data, error, loading } = useQuery(GET_USUARIOS);

    useEffect(() => {
        console.log("data log", data)
    }, [data])

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los usuarios")
        }
    }, [error])

    if (loading) return <div className="m-4">Cargando....</div>;

    return (
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
                        <th>Editar</th>
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
                                    <Link to={`/usuarios/editar/${u._id}`}>
                                        <i className='fas fa-pen text-gray-400 hover:text-gray-600 cursor-pointer' />
                                    </Link>
                                </td>
                            </tr>
                        );
                    }

                    )}
                </tbody>
            </table>
        </div>
    )
}

export default IndexUsuarios

// recordar agregar al sidebar y al app.jsx