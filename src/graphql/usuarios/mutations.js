import { gql } from "@apollo/client";

const EDITAR_USUARIO = gql`mutation EditarUsuario($nombre: String!, $apellido: String!, $identificacion: String!, $correo: String!, $_id: String!) {
    editarUsuario(nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo, _id: $_id) {
      nombre
      apellido
      identificacion
      correo
    }
  }
`
export { EDITAR_USUARIO }