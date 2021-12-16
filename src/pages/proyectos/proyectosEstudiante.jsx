import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';
import { useUser } from 'context/userContext';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { INSCRIBIR_PROYECTO } from 'graphql/proyectos/mutations';

const ProyectosEstudiante = () => {

    const { userData } = useUser();
    
    const { data, error, loading, refetch } = useQuery(GET_PROYECTOS);

    useEffect(() => {

    }, [data, refetch])

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
                            <th>Inscribirme</th>
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
                                        <PrivateComponent roleList={["ESTUDIANTE"]}>
                                            <InscribirProyecto proyecto={p} estudiante={userData} refetch={refetch} classname={"fas fa-sign-in-alt p-1 text-xl text-gray-400 hover:text-green-600"} />
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

const InscribirProyecto = ({ proyecto, estudiante, refetch, classname }) => {

    const [inscribirProyecto, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(INSCRIBIR_PROYECTO)

    useEffect(() => {
        if (mutationData) {
            refetch();
        }
    }, [mutationData, refetch]);

    const inscribirse = () => {
        inscribirProyecto({ variables: { proyecto: proyecto._id, estudiante: estudiante._id } });
    };
    return (
        <button onClick={() => { inscribirse(); }}>
            <i className={classname} />
        </button>
    );
}
export default ProyectosEstudiante
