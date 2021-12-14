import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { APROBAR_PROYECTO } from 'graphql/proyectos/mutations';
import { DESACTIVAR_PROYECTO } from 'graphql/proyectos/mutations';
import { TERMINAR_PROYECTO } from 'graphql/proyectos/mutations';
import { REACTIVAR_PROYECTO } from 'graphql/proyectos/mutations';

const ProyectosAdmin = () => {

    const { data, error, loading } = useQuery(GET_PROYECTOS);

    useEffect(() => {

    }, [data])

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los proyectos")
        }
    }, [error])

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
                                    <td>{Enum_FaseProyecto[p.fase]}
                                    {p.estado === "ACTIVO" && p.fase ==="DESARROLLO" ? (  <TerminarProyecto proyecto={p._id}></TerminarProyecto>) : (<></>)}
                                    
                                    </td>
                                    <td>{p.lider.correo}</td>
                                    <td className="text-center"> 
                                    {p.estado === "INACTIVO" && p.fase ==="NULO" ? (  <AprobarProyecto proyecto={p._id}></AprobarProyecto>) : (<></>)}
                                    {(p.estado === "ACTIVO") && (p.fase === "DESARROLLO" || p.fase === "INICIADO") ? (  <DesactivarProyecto proyecto={p._id}></DesactivarProyecto>) : (<></>)}
                                    {/* {p.estado === "ACTIVO" && p.fase ==="NULO" ? (  <TerminarProyecto proyecto={p._id}></TerminarProyecto>) : (<></>)} */}
                                    {(p.estado === "INACTIVO") && (p.fase === "DESARROLLO" || p.fase === "INICIADO") ? (  <ReactivarProyecto proyecto={p._id}></ReactivarProyecto>) : (<></>)} 
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

const AprobarProyecto = ({proyecto}) => {

    const [aprobarProyecto, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(APROBAR_PROYECTO)

    useEffect(() => {
        if (mutationData) {
        }
    }, [mutationData]);

    const aprobarProyectoBoton = () => {
        aprobarProyecto({ variables: { _id: proyecto._id, ...proyecto } });
    };

    return (
        <button className="mini-input bg-green-500 hover:bg-green-600" onClick={() => { aprobarProyectoBoton(); }}>
            APROBAR
        </button>
    )
}

const DesactivarProyecto = ({proyecto}) => {
    const [desactivarProyecto, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(DESACTIVAR_PROYECTO)

    useEffect(() => {
        if (mutationData) {
        }
    }, [mutationData]);

    const desactivarProyectoBoton = () => {
        desactivarProyecto({ variables: { _id: proyecto._id, ...proyecto } });
    };

    return (
        <button className="mini-input bg-yellow-400 hover:bg-yellow-500" onClick={() => { desactivarProyectoBoton(); }}>
            DESACTIVAR
        </button>
    )
}

const TerminarProyecto = ({proyecto}) => {
    const [terminarProyecto, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(TERMINAR_PROYECTO)

    useEffect(() => {
        if (mutationData) {
        }
    }, [mutationData]);

    const terminarProyectoBoton = () => {
        terminarProyecto({ variables: { _id: proyecto._id, ...proyecto } });
    };

    return (
        <button className="mini-input hover:bg-red-300" onClick={() => { terminarProyectoBoton(); }}>
            TERMINAR
        </button>
    )
}


const ReactivarProyecto = ({proyecto}) => {
    const [reactivarProyecto, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(REACTIVAR_PROYECTO)

    useEffect(() => {
        if (mutationData) {
        }
    }, [mutationData]);

    const reactivarProyectoBoton = () => {
        reactivarProyecto({ variables: { _id: proyecto._id, ...proyecto } });
    };

    return (
        <button className="mini-input bg-gray-500 hover:bg-gray-600" onClick={() => { reactivarProyectoBoton(); }}>
            REACTIVAR
        </button>
    )
}

export default ProyectosAdmin
