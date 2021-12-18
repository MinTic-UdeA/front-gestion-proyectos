import { gql } from "@apollo/client";

const GET_AVANCES = gql`
query Avances($proyectoId: String!) {
  Avances(proyectoId: $proyectoId) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
     
      nombre
    }
    creadoPor {
     
      correo
    }
  }
}
`
export { GET_AVANCES }