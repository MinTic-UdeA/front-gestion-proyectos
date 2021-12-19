import React, { useEffect } from 'react'
import PrivateRoute from 'components/PrivateRoute'
import { useQuery } from '@apollo/client'
import { useUser } from 'context/userContext';
import { GET_PROYECTOS } from 'graphql/proyectos/queries'
import { toast } from 'react-toastify';
import { Enum_FaseProyecto } from 'utils/enums';
import { Link } from 'react-router-dom';

// Index de avances donde se listan los proyectos activos. En estudiante se muestran en los que está inscrito, y en líder los que están activos y están a cargo de él. 

const IndexAvances = () => {

    const { userData } = useUser()

    const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_PROYECTOS);

    useEffect(() => {
    }, [queryData])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los proyectos")
        }
    }, [queryError])
    
    if (queryLoading) return <div className="mx-16 my-8 text-3xl text-gray-800">  Cargando la información ... </div>;

    return (
        <PrivateRoute roleList={['LIDER', 'ESTUDIANTE']}>
            <div>
                <div className="flex justify-between">
                {userData.rol === "ESTUDIANTE" ? (<h1 className="mx-16 my-8 text-3xl text-gray-800"> Proyectos inscritos y aceptados </h1>) : (<h1 className="mx-16 my-8 text-3xl text-gray-800"> Proyectos liderados </h1>)}
                </div>

                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Fase</th>
                            <th>Lider</th>
                            <th>Avances</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryData && queryData.Proyectos.map((p) => {
                            return (
                                <tr key={p._id}>
                                    <td>{p.nombre}</td>
                                    <td>{Enum_FaseProyecto[p.fase]}</td>
                                    <td>{p.lider.correo}</td>
                                    <td className="text-center">
                                            <Link to={`/avances/veravances/${p._id}`}>
                                            <button className="mini-input bg-blue-500 hover:bg-blue-600" >
                                                Ver Avances
                                            </button>

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


export default IndexAvances
// recordar agregar al sidebar y al app.jsx