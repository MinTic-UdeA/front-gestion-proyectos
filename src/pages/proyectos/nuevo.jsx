import React, { useEffect, useState } from 'react';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations'
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { REGISTRAR } from 'graphql/auth/mutations';
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import PrivateRoute from 'components/PrivateRoute';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import { useUser } from 'context/userContext';

const NuevoProyecto = () => {

    const { form, formData, updateFormData } = useFormData();
    const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_PROYECTO);

    const submitForm = (e) => {
        e.preventDefault();
        formData.presupuesto = parseFloat(formData.presupuesto);
        crearProyecto({ variables: formData });
    };

    useEffect(() => {

    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('No se pudo registrar el usuario');
        }
    }, [mutationError]);

//     const { form, formData, updateFormData } = useFormData();

//     const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
//         useMutation(CREAR_PROYECTO);

//     const submitForm = (e) => {
//         e.preventDefault();
//         toast.success("Proyecto creado con éxito")
//         formData.presupuesto = parseFloat(formData.presupuesto);
//         crearProyecto({
//             variables: formData
//         },
//      })
// };

useEffect(() => {
    console.log('data mutation', mutationData);
}, [mutationData]);

console.log(formData)

if (mutationLoading) return <div>...Loading</div>;

return (
    <>
{/* 
        <div className='flex flex-col h-full w-full items-center justify-center bg-blue-100'>
            <h1 className='text-3xl my-4 font-semibold'>Regístrate</h1>
            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                <div className='grid grid-cols-2 gap-5'>
                    <Input label='Nombre:' name='nombre' type='text' required />
                    <Input label='Apellido:' name='apellido' type='text' required />

                    <Input label='Correo:' name='correo' type='email' required />
                    <Input label='Identificación:' name='identificacion' type='text' required />
                    <Input label='Contraseña:' name='password' type='password' required />
                </div>
                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Registrarme'
                />
            </form>
            <span>¿Ya tienes una cuenta?</span>
            <Link to='/auth/login'>
                <span className='text-blue-700'>Inicia sesión</span>
            </Link>
        </div> */}

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
                    <Input name='fechaInicio' label='Fecha de Inicio' required={true} type='date' />
                    <Input name='fechaFin' label='Fecha de Fin' required={true} type='date' />
                </div >
                <div className='mx-10 self-start'>
                    <label htmlFor="objGeneral" className='flex flex-col my-3'>Objetivo General
                        <textarea name='objGeneral' id='objGeneral' required={true} className="input" />
                    </label>
                    <label htmlFor="objEspecificos" className='flex flex-col my-3'>Objetivos Específicos
                        <textarea name='objEspecificos' label='Objetivos Específicos' required={true} className="input" />
                    </label>
                    {/* {queryData && queryData.Usuario ? (
                        <Input name='lider' label='Líder' required={true} type='text' disabled={true} defaultValue={queryData?.Usuario.nombre + " " + queryData?.Usuario.apellido} />
                    ) : (
                        <div>No autorizado</div>
                    )} */}
                </div>
            </div>
            <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
        </form>
    </>
);   
}

export default NuevoProyecto


