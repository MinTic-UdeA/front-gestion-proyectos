import React, { useEffect } from 'react'
import { useUser } from 'context/userContext';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
import { RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
import PrivateRoute from 'components/PrivateRoute';
import { Link } from 'react-router-dom';
import { Enum_EstadoInscripcion } from 'utils/enums';

const IndexInscripciones = () => {

    const { data: queryData, error: queryError, loading: queryLoading, refetch } = useQuery(GET_INSCRIPCIONES);

    useEffect(() => {
    }, [queryData])

    return (
        <div>
            <PrivateRoute roleList={["LIDER"]} >
                <div>
                    <div className="flex justify-between">
                        <h1 className="mx-16 my-8 text-3xl text-gray-800">Listado de Inscripciones</h1>
                        {/*    <Link to="/proyectoslider/nuevo">
                            <div className="w-40 my-8 p-1 mx-16 bg-indigo-700 text-white text-center text-lg rounded-xl hover:bg-indigo-500 shadow-md disabled:opacity-50 disabled:bg-gray-700 cursor-pointer">Nuevo Proyecto</div>
                        </Link> */}
                    </div>
                    <table className='tabla'>
                        <thead>
                            <tr>
                                <th>Proyecto</th>
                                <th>Estudiante</th>
                                <th>Fecha Ingreso</th>
                                <th>Fecha Egreso</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queryData && queryData.listarInscripciones.map((i) => {
                                return (
                                    <tr key={i._id}>
                                        <td>{i.proyecto.nombre}</td>
                                        <td>{i.estudiante.correo}</td>
                                        <td>{i.fechaIngreso}</td>
                                        <td>{i.fechaEgreso}</td>
                                        <td>{Enum_EstadoInscripcion[i.estado]}</td>

                                        <td className="text-center">
                                            {i.estado === "PENDIENTE" ? (<AprobarInscripcion inscripcion={i._id} refetch={refetch}></AprobarInscripcion >) : (<></>)}
                                            {i.estado === "PENDIENTE" ? (<RechazarInscripcion inscripcion={i._id} refetch={refetch}></RechazarInscripcion >) : (<></>)}
                                        </td>
                                    </tr>
                                );
                            }
                            )}

                        </tbody>
                    </table>
                </div>
            </PrivateRoute>
        </div>
    )
}

const AprobarInscripcion = ({ inscripcion, refetch }) => {

    const [aprobarInscripcion, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(APROBAR_INSCRIPCION)

    useEffect(() => {
        refetch()
    }, [mutationData]);

    const aprobarInscripcionBoton = () => {
        aprobarInscripcion({ variables: { _id: inscripcion } });
    };

    return (
        <button className="mini-input2 bg-blue-500 hover:bg-blue-600" onClick={() => { aprobarInscripcionBoton(); }}>
            ACEPTAR
        </button>
    )
}

const RechazarInscripcion = ({ inscripcion, refetch }) => {

    const [rechazarInscripcion, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(RECHAZAR_INSCRIPCION)

    useEffect(() => {
        refetch()
    }, [mutationData]);

    const rechazarInscripcionBoton = () => {
        rechazarInscripcion({ variables: { _id: inscripcion } });
    }

    return (
        <button className="mini-input2 bg-gray-500 hover:bg-red-600" onClick={() => { rechazarInscripcionBoton(); }}>
            RECHAZAR
        </button>
    )

}

export default IndexInscripciones
// recordar agregar al sidebar y al app.jsx