import React, { useEffect } from 'react';
import Input from 'components/Input';
import { Enum_Rol } from 'utils/enums';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { REGISTRAR } from 'graphql/auth/mutations';
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

const Register = () => {

    const navigate = useNavigate();

    const { form, formData, updateFormData } = useFormData();

    const [registrar, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(REGISTRAR);

    const submitForm = (e) => {
        e.preventDefault();
        console.log("enviar datos al backend", formData)
        registrar({ variables: formData });
    };

    // useEffect(() => {
    //     if (mutationData) {
    //         if (mutationData.registrar.token) {
    //             localStorage.setItem("token", mutationData.registrar.token);
    //             navigate('/')
    //         }
    //     }
    // }, [mutationData, navigate]);

    useEffect(() => {
        if (mutationError) {
          toast.error('No se pudo modificar el usuario');
        }
    
      }, [mutationError]);
    
      if (mutationLoading) return <div className="m-4">Cargando....</div>;

    return (
        <div className='flex flex-col h-full w-full items-center justify-center'>
            <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                <div className='grid grid-cols-2 gap-5'>
                    <Input label='Nombre:' name='nombre' type='text' required />
                    <Input label='Apellido:' name='apellido' type='text' required />
                    <DropDown label='Registre su rol:' name='rol' required={true} options={Enum_Rol} />
                    <Input label='Correo:' name='correo' type='email' required />
                    <Input label='Contraseña:' name='password' type='password' required />
                </div>
                <ButtonLoading
                    disabled={Object.keys(formData).length===0}
                    loading={mutationLoading}
                    text='Registrarme'
                />
            </form>
            <span>¿Ya tienes una cuentaAA?</span>
            <Link to='/'>
                <span className='text-blue-700'>Inicia sesión</span>
            </Link>
        </div>
    )
}

export default Register
