// Templates de gql en Apollo
import { gql } from "@apollo/client";

const EDITAR_USUARIO = gql`
mutation editarUsuario($_id: String!, $nombre: String!, $apellido: String!, $identificacion: String!, $correo: String!) {
  editarUsuario(_id: $_id, nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo) {
    _id
    nombre
    apellido
    identificacion
    correo
  }
}
`

const CAMBIAR_ESTADO_USUARIO = gql`
mutation cambiarEstadoUsuario($_id: String!, $estado: Enum_EstadoUsuario!) {
  cambiarEstadoUsuario(_id: $_id, estado: $estado) {
    estado
  }
}
`
export { EDITAR_USUARIO, CAMBIAR_ESTADO_USUARIO }