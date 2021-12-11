import React, { useEffect } from 'react'
import { GET_PROYECTOS } from 'graphql/proyectos/queries'
import { useQuery } from '@apollo/client'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
// import ButtonLoading from 'components/ButtonLoading';
import PrivateRoute from 'components/PrivateRoute';

const IndexProyectos = () => {

    //const { data, error, loading } = useQuery(GET_PROYECTOS);
    const { data, error } = useQuery(GET_PROYECTOS);


    useEffect(() => {
    }, [data])

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los proyectos")
        }
    }, [error])

    return (
        <PrivateRoute roleList={["LIDER", "ADMINISTRADOR", "ESTUDIANTE"]} >
            <div>
                <div className="flex justify-between">
                    <h1 className="mx-16 my-8 text-3xl text-gray-800">Listado de Proyectos</h1>
                    <Link to="/proyectos/nuevo">
                        <div className="w-40 my-8 p-1 mx-16 bg-indigo-700 text-white text-center text-lg rounded-xl hover:bg-indigo-500 shadow-md disabled:opacity-50 disabled:bg-gray-700 cursor-pointer">Nuevo Proyecto</div>
                    </Link>
                </div>

                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Obj. General</th>
                            <th>Obj. Especificos</th>
                            <th>Presupuesto</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Estado</th>
                            <th>Fase</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.Proyectos.map((p) => {
                            return (
                                <tr key={p._id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.objGeneral}</td>
                                    <td>{p.objEspecificos}</td>
                                    <td>{p.presupuesto}</td>
                                    <td>{p.fechaInicio}</td>
                                    <td>{p.fechaFin}</td>
                                    <td>{Enum_EstadoProyecto[p.estado]}</td>
                                    <td>{Enum_FaseProyecto[p.fase]}</td>
                                    <td className="text-center">
                                        <Link to={`/proyectos/editar/${p._id}`}>
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
        </PrivateRoute>
    )
}

export default IndexProyectos


