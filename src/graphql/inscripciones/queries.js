import { gql } from "@apollo/client";

const GET_INSCRIPCIONES = gql`
query Query($lider: String!) {
  listarInscripciones(lider: $lider) {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
    }
    estudiante {
      _id
      correo
    }
  }
}
`
export { GET_INSCRIPCIONES }