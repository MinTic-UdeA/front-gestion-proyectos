import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';



const Login = () => {

    const { setToken } = useAuth()
    const navigate = useNavigate()
    const { form, formData, updateFormData } = useFormData();
    const [login, { data: mutationData, loading: mutationLoading }] = useMutation(LOGIN)

    const submitForm = (e) => {
        e.preventDefault();
        login({ variables: formData })
    };

    useEffect(() => {
        if (mutationData) {
            if (mutationData.login.token) {
                setToken(mutationData.login.token);
                navigate('/')
            }
        }
    }, [mutationData, navigate, setToken])

    if (mutationLoading) return <div className="mx-16 my-8 text-3xl text-gray-800"> ... Cargando la página </div>

    return (
        <div className='flex flex-col h-full w-full items-center justify-center bg-blue-100'>
                <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
                <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                    <Input name='correo' type='email' label='Correo' required={true} />
                    <Input name='password' type='password' label='Contraseña' required={true} />
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
                        text='Iniciar Sesión'
                    />
                </form>
                <span>¿No tienes una cuenta?</span>
                <Link to='/auth/register'>
                    <span className='text-blue-700'>Regístrate</span>
                </Link>
        </div>
    )
}

export default Login
