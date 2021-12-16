import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';

const IndexInscripciones = () => {
    const { userData } = useUser();

    console.log(userData._id)

    const { data, error, loading, refetch } = useQuery(GET_INSCRIPCIONES, { variables: {lider: userData._id} });

    useEffect(() => {
        refetch()
    }, [data, refetch])

    useEffect(() => {
        if (error) {
            toast.error("Error consultando las inscripciones")
        }
    }, [error])

    return (
        <div>
            todas las inscripciones
            {data}
        </div>
    )
}

export default IndexInscripciones
// recordar agregar al sidebar y al app.jsx