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
// import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';

const Register = () => {
    
    const { setToken } = useAuth()
    // const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData();
    const [registrar, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(REGISTRAR);

    const submitForm = (e) => {
        e.preventDefault();
        registrar({ variables: formData });
    };

    // recibe el token en el mutationData y se guarda en el localStorage
    useEffect(() => {
        if (mutationData) {
            if (mutationData.registrar.token) {
                setToken(mutationData.registrar.token);
            }
        }
    }, [mutationData, setToken]);

    useEffect(() => {
        if (mutationError) {
            toast.error('No se pudo registrar el usuario');
        }
    }, [mutationError]);


    return (
        <div className='flex flex-col h-full w-full items-center justify-center bg-blue-100'>
            <h1 className='text-3xl my-4 font-semibold'>Regístrate</h1>
            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                <div className='grid grid-cols-2 gap-5'>
                    <Input label='Nombre:' name='nombre' type='text' required />
                    <Input label='Apellido:' name='apellido' type='text' required />
                    <DropDown label='Registre su rol:' name='rol' required={true} options={Enum_Rol} />
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
        </div>
    )
}

export default Register
