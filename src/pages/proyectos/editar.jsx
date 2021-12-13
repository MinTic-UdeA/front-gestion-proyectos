import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';

const EditarProyecto = () => {

    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();

    const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_PROYECTO, { variables: { _id } });

    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_PROYECTO);

    useEffect(() => {
    }, [queryData])

    const submitForm = (e) => {
        e.preventDefault();
        formData.presupuesto = parseFloat(formData.presupuesto);
        editarProyecto({ variables: { _id, ...formData } });
    };

    useEffect(() => {
        if (mutationData) {
            toast.success("Información actualizada correctamente");
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('Error modificando el proyecto');
        }

        if (queryError) {
            toast.error('Error consultando el proyecto');
        }
    }, [queryError, mutationError]);

    if (queryLoading) return <div>Cargando....</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 text-center'>Editar Proyecto</h1>
            {queryData && queryData.Proyecto ? (
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className='flex flex-col items-center justify-center'
                >
                    <Input
                        label='Nombre del proyecto:'
                        type='text'
                        name='nombre'
                        defaultValue={queryData?.Proyecto.nombre}
                        required={true}
                    />
                    <label htmlFor="objGeneral" className='flex flex-col my-3'>Objetivo General
                        <textarea name='objGeneral' id='objGeneral' label='ObjEspecificos' defaultValue={queryData?.Proyecto.objGeneral} required={true} className="input" />
                    </label>
                    <label htmlFor="objEspecificos" className='flex flex-col my-3'>Objetivos Específicos
                        <textarea name='objEspecificos' id='objEspecificos' label='Objetivos Específicos' defaultValue={queryData?.Proyecto.objEspecificos} required={true} className="input" />
                    </label>

                    <Input
                        label='Presupuesto:'
                        type='number'
                        name='presupuesto'
                        defaultValue={queryData?.Proyecto.presupuesto}
                        required={true}
                    />
                    {/* <DropDown
                    label='Estado de la persona:'
                    name='estado'
                    defaultValue={queryData.Usuario.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                /> */}
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={mutationLoading}
                        text='Confirmar'
                    />
                </form>
            ) : (
                <div>No autorizado</div>
            )}
        </div>
    );

};

export default EditarProyecto
