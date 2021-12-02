// importamos el QGL en el cliente
import { gql } from "@apollo/client";

// aqui haremos el query de los usuarios, cargado desde el estudio de Apollo 
const GET_USUARIOS = gql`
    query Usuarios {
        Usuarios {
            _id
            nombre
            apellido
            identificacion
            correo
            rol
            estado
        }
    }
`
export { GET_USUARIOS }

// Lo exportamos para usarlo en /pages/usuarios/index