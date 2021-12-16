import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import { useUser } from 'context/userContext';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import PrivateRoute from 'components/PrivateRoute';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutations';


// QUERY: GET PROYECTOS, TODOS LOS QUE ESTÉN ACTIVOS
// MUTACIONES: GENERAR INSCRIPCIÓN


const ProyectosEstudiante = () => {

    const { userData } = useUser()

    const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_PROYECTOS);

    useEffect(() => {
    }, [queryData])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los proyectos")
        }
    }, [queryError])

    const [crearInscripcion, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(CREAR_INSCRIPCION)

    const crearInscripcionEstudiante = (p) => {

        crearInscripcion({ variables: { proyecto: p._id, estudiante: userData._id } })
        toast.success("Inscripción realizada con éxito");

    };

    useEffect(() => {

    }, [mutationData]);

    return (
        <PrivateRoute roleList={["ESTUDIANTE"]} >
            <div>
                <div className="flex justify-between">
                    <h1 className="mx-16 my-8 text-3xl text-gray-800">Listado de proyectos activos</h1>
                </div>

                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Obj. General</th>
                            <th>Obj. Especificos</th>
                            <th>Ppto.</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Fase</th>
                            <th>Lider</th>
                            <th>Acción</th>
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
                                    <td className="w-28">{p.fechaInicio}</td>
                                    <td className="w-28">{p.fechaFin}</td>
                                    <td>{Enum_FaseProyecto[p.fase]}
                                        {/* {p.estado === "ACTIVO" && p.fase === "DESARROLLO" ? (<TerminarProyecto proyecto={p._id} refetch={refetch}></TerminarProyecto>) : (<></>)} */}
                                    </td>
                                    <td>{p.lider.correo}</td>
                                    <td className="text-center">
                                        <button className="mini-input bg-green-500 hover:bg-green-600" onClick={() => { crearInscripcionEstudiante(p) }}>
                                            Inscribirse
                                        </button>

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
