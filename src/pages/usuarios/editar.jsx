// vista y edición de 1 usuario
import React, { useEffect } from 'react'
import { GET_USUARIO } from 'graphql/usuarios/queries'
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums'
import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading'
import useFormData from 'hooks/useFormData'

const EditarUsuario = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams()
  const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_USUARIO, { variables: { _id } });
  const [editarUsuario, { data: mutationData, error: mutationError, loading: mutationLoading }] = useMutation(EDITAR_USUARIO)

  const submitForm = (e) => {
    e.preventDefault()
    editarUsuario({ variables: { _id, ...formData } })
  }

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('No se pudo modificar el usuario');
    }
    if (queryError) {
      toast.error('No se pudo consultar el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div className="m-4">Cargando....</div>;

  // submitForm: hacer un submit al formulario
  // formData: obtener toda la informacion de un formulario

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-8'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      
      <h1 className='m-2 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />
        {/* <DropDown
                    label='Estado de la persona:'
                    name='estado'
                    defaultValue={queryData.Usuario.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                /> */}
        {/*  <span>Rol del usuario: {queryData.Usuario.rol}</span> */}
        <ButtonLoading
          disabled={Object.keys(formData).length===0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  )
}

export default EditarUsuario