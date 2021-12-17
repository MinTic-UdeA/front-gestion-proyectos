import { gql } from "@apollo/client";

const CREAR_INSCRIPCION = gql`
mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
  crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
    _id
  }
}
`
const APROBAR_INSCRIPCION = gql`
mutation AprobarInscripcion($_id: String!, $estado: Enum_EstadoInscripcion, $fechaInicio: String) {
  aprobarInscripcion(_id: $_id, estado: $estado, fechaInicio: $fechaInicio) {
    _id
    fechaIngreso
    estado
  }
}
`
export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION }