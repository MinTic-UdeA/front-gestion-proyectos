import React, { useEffect, useState } from 'react'
import PrivateRoute from 'components/PrivateRoute'
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { GET_AVANCES } from 'graphql/avances/queries';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { useUser } from 'context/userContext';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import { Dialog } from '@mui/material';


const VerAvances = () => {

    const { proyectoId } = useParams();

    const [openDialog, setOpenDialog] = useState(false);

    const { data: queryData, error: queryError, loading: queryLoading, refetch } = useQuery(GET_AVANCES, { variables: { proyectoId } });

    useEffect(() => {
        refetch();
        console.log(queryData)
    }, [queryData])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los avances")
        }
    }, [queryError])

    if (queryLoading) return <div>Loading...</div>;

    return (
        <PrivateRoute roleList={['LIDER', 'ESTUDIANTE']}>
            <div>
                <Link to='/avances'>
                    <i className='mt-8 ml-8 fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                </Link>
                <div className="flex justify-between">

                    <h1 className="mx-16 my-8 text-3xl text-gray-800"> Avances del proyecto </h1>

                    <button
                        onClick={() => setOpenDialog(true)}
                        className='w-40 my-8 p-1 mx-16 text-white text-center text-lg rounded-xl bg-blue-500 hover:bg-blue-600 shadow-md disabled:opacity-50 disabled:bg-gray-700 cursor-pointer'
                        type='button'
                    >
                        Nuevo Avance
                    </button>

                </div>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Creado por:</th>
                            <th>Observaciones</th>
                           {/*  <th>Editar</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    {queryData.Avances.length === 0 ? (
                        <div className="my-40"> No tienes avances para este proyecto</div>
                    ) : (
                        queryData.Avances.map((avance) => {
                            return (<Avance avance={avance} ></Avance>
                            )
                        })
                    )}
                </table>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <NuevoAvance proyecto={proyectoId} setOpenDialog={setOpenDialog} />
                </Dialog>
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
            <td>{avance.observaciones}</td>
           {/*  <td>
            </td> */}
        </tr>
    );
};

const NuevoAvance = ({ proyecto, setOpenDialog }) => {

    const { userData } = useUser();

    const { form, formData, updateFormData } = useFormData();

    const [crearAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_AVANCE, {
            refetchQueries: [GET_AVANCES]
        });

    const submitForm = (e) => {
        e.preventDefault();

        crearAvance({ variables: { ...formData, proyecto, creadoPor: userData._id } });
    };

    useEffect(() => {
        if (mutationData) {
            toast.success("Avance creado con éxito")
            setOpenDialog(false)
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('No se pudo crear el avance');
        }
    }, [mutationError]);

    if (mutationLoading) return <div>...Loading</div>;


    return (
        <PrivateRoute roleList={['ESTUDIANTE']}>
            <h1 className='mt-6 text-center text-2xl font-bold text-gray-900'>Crear Nuevo Avance</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='flex flex-col p-6'
            >
                <div className='flex items-center justify-center'>
                    <div className='mx-10'>

                        <label htmlFor="descripcion" className='text-center flex flex-col mt-6'>Ingrese la descripción del Avance
                            <textarea name='descripcion' id='descripcion' label='descripcion' required={true} className="input my-6" />
                        </label>

                    </div>
                </div>
                <ButtonLoading text='Crear Avance' loading={mutationLoading} disabled={false} />
            </form>
        </PrivateRoute>
    )
}


export default VerAvances