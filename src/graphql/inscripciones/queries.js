// Templates de gql en Apollo
import { gql } from "@apollo/client";

const GET_INSCRIPCIONES = gql`
query Query($lider: String!) {
  listarInscripciones(lider: $lider) {
    estado
  }
}
`

export { GET_INSCRIPCIONES }