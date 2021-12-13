import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { APROBAR_PROYECTO } from 'graphql/proyectos/mutations';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';
import DropDown from 'components/Dropdown';
import { Enum_EstadoProyecto } from 'utils/enums';
import { Enum_FaseProyecto } from 'utils/enums';

const EditarProyecto = () => {

    const { _id } = useParams();

    const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_PROYECTO, { variables: { _id } });

    useEffect(() => {
        console.log(queryData)
    }, [queryData])

    if (queryLoading) return <div>Cargando....</div>;


    return (
        <>
            <PrivateComponent roleList={["LIDER"]}>
                <EditarProyectoLider proyecto={queryData.Proyecto}></EditarProyectoLider>
            </PrivateComponent>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
                <AprobarProyecto proyecto={queryData.Proyecto}></AprobarProyecto>
            </PrivateComponent>
        </>
    );
};

const EditarProyectoLider = ({proyecto}) => {
    const { form, formData, updateFormData } = useFormData(null);

    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_PROYECTO);

    const submitForm = (e) => {
        e.preventDefault();
        formData.presupuesto = parseFloat(formData.presupuesto);
        editarProyecto({ variables: { _id: proyecto._id, ...formData } });
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
    }, [mutationError]);

    return (<>
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/proyectoslider'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 text-center'>Editar Proyecto</h1>
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
                    defaultValue={proyecto.nombre}
                    required={true}
                />
                <label htmlFor="objGeneral" className='flex flex-col my-3'>Objetivo General
                    <textarea name='objGeneral' id='objGeneral' label='ObjEspecificos' defaultValue={proyecto.objGeneral} required={true} className="input" />
                </label>
                <label htmlFor="objEspecificos" className='flex flex-col my-3'>Objetivos Específicos
                    <textarea name='objEspecificos' id='objEspecificos' label='Objetivos Específicos' defaultValue={proyecto.objEspecificos} required={true} className="input" />
                </label>

                <Input
                    label='Presupuesto:'
                    type='number'
                    name='presupuesto'
                    defaultValue={proyecto.presupuesto}
                    required={true}
                />
                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />
            </form>
        </div>
    </>)
}

const AprobarProyecto = ({proyecto}) => {
    const { form, formData, updateFormData } = useFormData(null);
    const [aprobarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(APROBAR_PROYECTO);
    const submitForm = (e) => {
        e.preventDefault();
        formData.presupuesto = parseFloat(formData.presupuesto);
        aprobarProyecto({ variables: {  _id: proyecto._id, ...formData } });
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
    }, [mutationError]);

    return (<>
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/proyectosadmin'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 text-center'>Editar Proyecto</h1>

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
                    defaultValue={proyecto.nombre}
                    required={true}
                    disabled={true}
                />

                <Input
                    label='Presupuesto:'
                    type='number'
                    name='presupuesto'
                    defaultValue={proyecto.presupuesto}
                    required={true}
                    disabled={true}
                />
                <DropDown
                    label='Estado del proyecto:'
                    name='estado'
                    defaultValue={proyecto.estado}
                    required={true}
                    options={Enum_EstadoProyecto}
                />
                <DropDown
                    label='Estado del proyecto:'
                    name='estado'
                    defaultValue={proyecto.fase}
                    required={true}
                    options={Enum_FaseProyecto}
                />
                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />
            </form>
        </div>
    </>)
}

export default EditarProyecto
