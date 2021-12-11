import React, { useEffect } from 'react'
import PrivateRoute from 'components/PrivateRoute';
import { useQuery, useMutation } from '@apollo/client';
import PrivateComponent from 'components/PrivateComponent';
import { useUser } from 'context/userContext';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import { GET_USUARIO } from 'graphql/usuarios/queries'

const IndexPerfil = () => {
 
  const { userData } = useUser()
  console.log(userData._id)
  const { form, formData, updateFormData } = useFormData(null);

  const _id = userData._id

  const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_USUARIO, { variables: { _id: _id } });

  // useEffect(() => {
  // }, [queryData])

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: MutationError }] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    editarUsuario({ variables: { _id, ...formData } })
  }

  useEffect(() => {
    if (mutationData) {
      toast.success("Información actualizada correctamente")
    }
  }, [mutationData])

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={["LIDER", "ESTUDIANTE"]}>
      <div className='flew flex-col w-full h-full items-center justify-center p-8'>
        {queryData && queryData.Usuario ? (
          <>
            <h1 className='m-2 text-3xl text-gray-800 font-normal text-center'>Editar Perfil</h1>
            <form
              onSubmit={submitForm}
              onChange={updateFormData}
              ref={form}
              className='flex flex-col items-center justify-center'
            >
              <Input
                label='Nombre:'
                type='text'
                name='nombre'
                defaultValue={queryData?.Usuario.nombre}
                required={true}
              />
              <Input
                label='Apellido:'
                type='text'
                name='apellido'
                defaultValue={queryData?.Usuario.apellido}
                required={true}
              />
              <Input
                label='Correo:'
                type='email'
                name='correo'
                defaultValue={queryData?.Usuario.correo}
                required={true}
              />
              <Input
                label='Identificación:'
                type='text'
                name='identificacion'
                defaultValue={queryData?.Usuario.identificacion}
                required={true}
              />
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text='Confirmar' />
            </form>
          </>
        ) : (
          <div>No autorizado</div>
        )}
      </div>
    </PrivateRoute>
  )
}
export default IndexPerfil;

