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
import PrivateComponent from 'components/PrivateComponent';
import { CREAR_OBSERVACION } from 'graphql/avances/mutations';

const VerAvances = () => {

    const { userData } = useUser()

    const { proyectoId } = useParams();

    const [openDialog, setOpenDialog] = useState(false);

    const { data: queryData, error: queryError, loading: queryLoading, refetch } = useQuery(GET_AVANCES, { variables: { proyectoId } });

    useEffect(() => {
        refetch();
        console.log(queryData)
    }, [queryData, refetch])

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando los avances")
        }
    }, [queryError])

    if (queryLoading) return <div className="mx-16 my-8 text-3xl text-gray-800"> Cargando la información... </div>;

    return (
        <PrivateRoute roleList={['LIDER', 'ESTUDIANTE']}>
            <div>
                <Link to='/avances'>
                    <i className='mt-8 ml-8 fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                </Link>
                <div className="flex justify-between">
                    <h1 className="mx-16 my-8 text-3xl text-gray-800">Listado de Avances por proyecto</h1>

                    <PrivateComponent roleList={['ESTUDIANTE']}>
                        <button
                            onClick={() => setOpenDialog(true)}
                            className='w-40 my-8 p-1 mx-16 text-white text-center text-lg rounded-xl bg-blue-500 hover:bg-blue-600 shadow-md disabled:opacity-50 disabled:bg-gray-700 cursor-pointer'
                            type='button'
                        >
                            Nuevo Avance
                        </button>
                    </PrivateComponent>
                </div>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Creado por:</th>
                            <th>Observaciones</th>
                            {userData.rol === "ESTUDIANTE" ? (<th>Editar Avance</th>) : (<th>Nueva Observación</th>)}
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    {queryData.Avances.length === 0 ? (
                        <div className="my-10"> No hay avances para este proyecto</div>
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

    const { userData } = useUser()

    return (
        <tr key={avance._id}>
            <td>{avance.descripcion}</td>
            <td>{avance.fecha}</td>
            <td>{avance.creadoPor.correo}</td>
            <td >
            {avance.observaciones !== 0 && avance.observaciones.map( obs => { return (
                        <div>
                          <span className="fas fa-angle-right mr-2"></span>
                          <span className="text-black">{obs}</span>
                        </div> )})}
            </td>
            {userData.rol === "LIDER" ? (<td className="text-center"><NuevaObservacion avance={avance._id} ></NuevaObservacion></td>) : (<td></td>)}
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
        } else if (mutationError) {
            toast.error('No se pudo crear el avance');
        }
    }, [mutationData, setOpenDialog, mutationError]);

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

const NuevaObservacion = ({ avance }) => {

    const [crearObservacion, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(CREAR_OBSERVACION, { variables: { _id: avance } })

    const [openDialog, setOpenDialog] = useState(false);
    const { form, formData, updateFormData } = useFormData();

    const submitForm = (e) => {
        e.preventDefault();
        crearObservacion({ variables: { ...formData, avance } });
    };

    useEffect(() => {
        if (mutationData) {
            toast.success("Obervación creada con éxito")
            setOpenDialog(false)
        } else if (mutationError) {
            toast.error('No se pudo crear la observación');
        }
    }, [mutationData, setOpenDialog, mutationError]);

    return (
        <>
            <button onClick={() => setOpenDialog(true)}>
                <i class="fas fa-plus-circle text-xl text-gray-400 hover:text-blue-600"></i>
            </button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                {/* se debe abrir el siguiente formulario */}
                <h1 className='mt-6 text-center text-2xl font-bold text-gray-900'>Crear nueva Observación</h1>
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className='flex flex-col p-6'
                >
                    <div className='flex items-center justify-center'>
                        <div className='mx-10'>
                            <label htmlFor="observacion" className='text-center flex flex-col'>Ingrese la observación del Avance
                                <textarea name='observacion' id='observacion' label='observacion' required={true} className="input my-6" />
                            </label>
                        </div>
                    </div>
                    <ButtonLoading text='Crear Observación' disabled={false} loading={mutationLoading} />
                </form>
            </Dialog>

        </>
    )

}


export default VerAvances