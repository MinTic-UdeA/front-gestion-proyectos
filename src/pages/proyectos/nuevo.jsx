import React, { useEffect, useState } from 'react';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations'
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import PrivateRoute from 'components/PrivateRoute';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { useUser } from 'context/userContext';

// new Date().toISOString().split("T")[0]

const NuevoProyecto = () => {

    const { userData } = useUser();

    const { form, formData, updateFormData } = useFormData();

    const _id = userData._id;

    const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_USUARIO, { variables: { _id: _id } });

    const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_PROYECTO);

    // useEffect(() => {
    // }, [queryData]);

    const submitForm = (e) => {
        e.preventDefault();
        formData.presupuesto = parseFloat(formData.presupuesto);
        crearProyecto({ variables: { lider: userData._id, ...formData } });
    };

    useEffect(() => {
        if (mutationData) {
            toast.success("Proyecto creado con éxito")
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('No se pudo registrar el usuario');
        }
    }, [mutationError]);

    if (mutationLoading) return <div>...Loading</div>;

    // if (queryData)
    return (
        <>
            <PrivateRoute roleList={["LIDER"]}>
                <Link to='/proyectos'>
                    <i className='mt-4 ml-4 fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                </Link>
                <h1 className='text-3xl text-center'>Creación de proyecto</h1>
                {queryData && queryData.Usuario ? (
                    <>
                        <form
                            onSubmit={submitForm}
                            onChange={updateFormData}
                            ref={form}
                            className='flex flex-col'
                        >
                            <div className='flex items-center justify-center'>
                                <div className='mx-10'>
                                    <Input name='nombre' label='Nombre del Proyecto' required={true} type='text' />
                                    <Input name='presupuesto' label='Presupuesto del Proyecto' required={true} type='number' />
                                    <label htmlFor="objGeneral" className='flex flex-col my-3'>Objetivo General
                                        <textarea name='objGeneral' id='objGeneral' required={true} className="input" />
                                    </label>
                                    <label htmlFor="objEspecificos" className='flex flex-col my-3'>Objetivos Específicos
                                        <textarea name='objEspecificos' label='Objetivos Específicos' required={true} className="input" />
                                    </label>
                                    <Input name='lider' label='Líder' required={true} type='text' disabled={true} defaultValue={queryData?.Usuario.nombre + " " + queryData?.Usuario.apellido} />
                                </div>
                            </div>
                            <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
                        </form>
                    </>
                ) : (
                    <div>No autorizado</div>
                )}
            </PrivateRoute>
        </>

    );
}

export default NuevoProyecto


