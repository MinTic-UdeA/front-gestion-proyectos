import React, { useEffect } from 'react';
import Input from 'components/Input';
/* import { Enum_Rol } from 'utils/enums';
import DropDown from 'components/Dropdown'; */
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
// import { toast } from 'react-toastify'
import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';


const Login = () => {

    const navigate = useNavigate()

    // const { setToken } = useAuth()

    const { form, formData, updateFormData } = useFormData();

    const [login, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(LOGIN)

    const submitForm = (e) => {
        e.preventDefault();
        console.log("enviar datos al backend", formData)
        login({
            variables: formData
        })

    };

    useEffect(() => {
        if (mutationData) {
            if (mutationData.login.token) {
                setToken(mutationData.login.token);
                navigate('/')
            }
        }
    }, [mutationData, navigate, setToken])


    return (
        <div>
            <div className='flex flex-col items-center justify-center w-full h-full p-10'>
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
        </div>
    )
}

export default Login
