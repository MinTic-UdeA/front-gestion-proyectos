import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { APROBAR_PROYECTO } from 'graphql/proyectos/mutations';
import { DESACTIVAR_PROYECTO } from 'graphql/proyectos/mutations';
import { TERMINAR_PROYECTO } from 'graphql/proyectos/mutations';
import { REACTIVAR_PROYECTO } from 'graphql/proyectos/mutations';

const ProyectosAdmin = () => {

    const { data: queryData, error: queryError, loading: queryLoading, refetch } = useQuery(GET_PROYECTOS);

    useEffect(() => {
    }, [queryData])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los proyectos")
        }
    }, [queryError])

    if (queryLoading) return <div className="mx-16 my-8 text-3xl text-gray-800"> Cargando la información... </div>;

    return (
        <PrivateRoute roleList={["ADMINISTRADOR"]} >
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
                        {queryData && queryData.Proyectos.map((p) => {
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
                                        {p.estado === "ACTIVO" && p.fase === "DESARROLLO" ? (<TerminarProyecto proyecto={p._id} refetch={refetch}></TerminarProyecto>) : (<></>)}
                                    </td>
                                    <td>{p.lider.correo}</td>
                                    <td className="text-center">
                                        {p.estado === "INACTIVO" && p.fase === "NULO" ? (<AprobarProyecto proyecto={p._id} refetch={refetch}></AprobarProyecto >) : (<></>)}
                                        {(p.estado === "ACTIVO") && (p.fase === "DESARROLLO" || p.fase === "INICIADO") ? (<DesactivarProyecto proyecto={p._id} refetch={refetch}></DesactivarProyecto>) : (<></>)}

                                        {(p.estado === "INACTIVO") && (p.fase === "DESARROLLO" || p.fase === "INICIADO") ? (<ReactivarProyecto proyecto={p._id} refetch={refetch}></ReactivarProyecto>) : (<></>)}
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

const AprobarProyecto = ({ proyecto, refetch }) => {

    const [aprobarProyecto, { data: mutationData, error: mutationError }] = useMutation(APROBAR_PROYECTO)

    useEffect(() => {
        refetch()
    }, [mutationData, refetch]);

    useEffect(() => {
        if (mutationError) {
            toast.error("Error aprobando el proyecto")
        }
    }, [mutationError])

    const aprobarProyectoBoton = () => {
        aprobarProyecto({ variables: { _id: proyecto } });
    };

    return (
        <button className="mini-input bg-green-500 hover:bg-green-600" onClick={() => { aprobarProyectoBoton(); }}>
            APROBAR
        </button>
    )
}

const DesactivarProyecto = ({ proyecto, refetch }) => {
    const [desactivarProyecto, { data: mutationData, error: mutationError }] = useMutation(DESACTIVAR_PROYECTO)

    useEffect(() => {
        refetch()
    }, [mutationData, refetch]);

    useEffect(() => {
        if (mutationError) {
            toast.error("Error desactivando el proyecto")
        }
    }, [mutationError]);

    const desactivarProyectoBoton = () => {
        desactivarProyecto({ variables: { _id: proyecto } });
    };

    return (
        <button className="mini-input bg-yellow-400 hover:bg-yellow-500" onClick={() => { desactivarProyectoBoton(); }}>
            DESACTIVAR
        </button>
    )
}

const TerminarProyecto = ({ proyecto, refetch }) => {
    const [terminarProyecto, { data: mutationData, error: mutationError }] = useMutation(TERMINAR_PROYECTO)

    useEffect(() => {
        refetch()
    }, [mutationData, refetch]);

    useEffect(() => {
        if (mutationError) {
            toast.error("Error terminando el proyecto")
        }
    }, [mutationError]);


    const terminarProyectoBoton = () => {
        terminarProyecto({ variables: { _id: proyecto } });
    };

    return (
        <button className="mini-input hover:bg-red-300" onClick={() => { terminarProyectoBoton(); }}>
            TERMINAR
        </button>
    )
}


const ReactivarProyecto = ({ proyecto, refetch }) => {
    const [reactivarProyecto, { data: mutationData, error: mutationError }] = useMutation(REACTIVAR_PROYECTO)

    useEffect(() => {
        refetch()
    }, [mutationData, refetch]);

    useEffect(() => {
        if (mutationError) {
            toast.error("Error reactivando el proyecto")
        }
    }, [mutationError]);


    const reactivarProyectoBoton = () => {
        console.log(proyecto)
        reactivarProyecto({ variables: { _id: proyecto } });

    };

    return (
        <button className="mini-input bg-gray-500 hover:bg-gray-600" onClick={() => { reactivarProyectoBoton(); }}>
            REACTIVAR
        </button>
    )
}

export default ProyectosAdmin
