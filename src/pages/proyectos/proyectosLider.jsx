import React, { useEffect } from 'react'
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { useQuery } from '@apollo/client'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';

const ProyectosLider = () => {

    const { userData } = useUser();

    const { data: queryData, error: queryError, loading: queryLoading, refetch } = useQuery(GET_PROYECTOS);
    
    useEffect(() => {
        refetch()
    }, [queryData, refetch])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los proyectos")
        }
    }, [queryError])

    return (
        <PrivateRoute roleList={["LIDER"]} >
            <div>
                <div className="flex justify-between">
                    <h1 className="mx-16 my-8 text-3xl text-gray-800">Listado de Proyectos</h1>
                    <Link to="/proyectoslider/nuevo">
                        <div className="w-40 my-8 p-1 mx-16 bg-blue-600 text-white text-center text-lg rounded-xl hover:bg-blue-500 shadow-md disabled:opacity-50 disabled:bg-gray-700 cursor-pointer">Nuevo Proyecto</div>
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
                        {queryData && queryData.Proyectos.map((p) => {
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
                                        {p.estado === "ACTIVO" ? (
                                        <Link to={`/proyectos/editar/${p._id}`}>
                                            <i className='fas fa-pen text-gray-400 hover:text-gray-600 cursor-pointer' />
                                        </Link>) : (<div></div>)}
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

export default ProyectosLider


