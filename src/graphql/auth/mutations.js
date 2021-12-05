// Templates de gql en Apollo
import { gql } from "@apollo/client";

const REGISTRAR = gql`
 mutation Registrar(
     $nombre: String!, 
     $apellido: String!, 
     $identificacion: String!, 
     $correo: String!, 
     $rol: Enum_Rol!, 
     $password: String!
     ) {
  registrar(
      nombre: $nombre, 
      apellido: $apellido, 
      identificacion: $identificacion, 
      correo: $correo, 
      rol: $rol, 
      password: $password)
}
`
export { REGISTRAR }


