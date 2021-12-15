import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import { useUser } from 'context/userContext';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import PrivateRoute from 'components/PrivateRoute';


// QUERY: GET PROYECTOS, TODOS LOS QUE ESTÉN ACTIVOS

// MUTACIONES: 


const ProyectosEstudiante = () => {

    const { data, error, loading, refetch } = useQuery(GET_PROYECTOS);
    useEffect(() => {
    }, [data])

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los proyectos")
        }
    }, [error])


    return (
        <PrivateRoute roleList={["ESTUDIANTE"]} >
            <div>
                <div className="flex justify-between">
                    <h1 className="mx-16 my-8 text-3xl text-gray-800">Listado de Proyectos</h1>
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
                            <th>Lider</th>
                            <th>Acción</th>
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
                                    <td className="w-28">{p.fechaInicio}</td>
                                    <td className="w-28">{p.fechaFin}</td>
                                    <td>{Enum_EstadoProyecto[p.estado]}</td>
                                    <td>{Enum_FaseProyecto[p.fase]}
                                        {/* {p.estado === "ACTIVO" && p.fase === "DESARROLLO" ? (<TerminarProyecto proyecto={p._id} refetch={refetch}></TerminarProyecto>) : (<></>)} */}
                                    </td>
                                    <td>{p.lider.correo}</td>
                                    <td className="text-center">
                                        {/* {p.estado === "INACTIVO" && p.fase === "NULO" ? (<AprobarProyecto proyecto={p._id} refetch={refetch}></AprobarProyecto >) : (<></>)}
                                        {(p.estado === "ACTIVO") && (p.fase === "DESARROLLO" || p.fase === "INICIADO") ? (<DesactivarProyecto proyecto={p._id} refetch={refetch}></DesactivarProyecto>) : (<></>)}

                                        {(p.estado === "INACTIVO") && (p.fase === "DESARROLLO" || p.fase === "INICIADO") ? (<ReactivarProyecto proyecto={p._id} refetch={refetch}></ReactivarProyecto>) : (<></>)} */}
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

export default ProyectosEstudiante
