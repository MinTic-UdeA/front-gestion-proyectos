import React, { useEffect, useState } from 'react'
import PrivateRoute from 'components/PrivateRoute'
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { GET_AVANCES } from 'graphql/auth/avances/queries';
import { Link } from 'react-router-dom';


const VerAvances = () => {

    const { proyectoId } = useParams();

    console.log(proyectoId)

    const { data: queryData, error: queryError, refetch  } = useQuery(GET_AVANCES, { variables: { proyectoId } });

    useEffect(() => {
        refetch();
        console.log(queryData)
    }, [queryData])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los avances")
        }
    }, [queryError])

    return (
        <PrivateRoute roleList={['LIDER', 'ESTUDIANTE']}>
            <div>
            <Link to='/avances'>
                <i className='mt-8 ml-8 fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
                <div className="flex justify-between">
                    
                    <h1 className="mx-16 my-8 text-3xl text-gray-800"> Avances del proyecto </h1>
                    
                    <Link to="/avances/veravances/nuevo">
                        <div className="w-40 my-8 p-1 mx-16 text-white text-center text-lg rounded-xl bg-blue-500 hover:bg-blue-600 shadow-md disabled:opacity-50 disabled:bg-gray-700 cursor-pointer">Nuevo Avance</div>
                    </Link>
                </div>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Creado por:</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    { queryData.Avances.length === 0 ? (
                        <div className="my-40"> No tienes avances para este proyecto</div>
                    ) : (
                        queryData.Avances.map((avance) => {
                            return ( <Avance avance={avance} ></Avance>
                            )
                        })
                    )}
                </table>
            </div>
        </PrivateRoute>
    )
}

const Avance = ({ avance }) => {

    return (
        <tr key={avance._id}>
        <td>{avance.proyecto.nombre}</td>
        <td>{avance.descripcion}</td>
        <td>{avance.fecha}</td>
        <td>{avance.creadoPor.correo}</td>
        <td>
        </td>
    </tr>
    );
};


export default VerAvances