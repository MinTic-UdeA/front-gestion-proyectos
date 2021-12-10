// Templates de gql en Apollo
import { gql } from "@apollo/client";

const EDITAR_USUARIO = gql`
mutation EditarUsuario($_id: String!, $nombre: String!, $apellido: String!, $identificacion: String!, $correo: String!) {
  editarUsuario(_id: $_id, nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo) {
    _id
    nombre
    apellido
    identificacion
    correo
  }
}
`

const APROBAR_USUARIO = gql`
mutation AprobarUsuario($_id: String!) {
  aprobarUsuario(_id: $_id) {
    estado
  }
}
`
export { EDITAR_USUARIO, APROBAR_USUARIO }