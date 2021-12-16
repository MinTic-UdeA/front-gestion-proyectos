import { gql } from "@apollo/client";

const CREAR_INSCRIPCION = gql`
mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
  crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
    _id
  }
}
`
const APROBAR_INSCRIPCION = gql`
mutation AprobarInscripcion($_id: String!) {
  aprobarInscripcion(_id: $_id) {
    _id
  }
}
`
const RECHAZAR_INSCRIPCION = gql`
mutation RechazarInscripcion($_id: String!) {
  rechazarInscripcion(_id: $_id) {
    _id
  }
}
`
export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION }