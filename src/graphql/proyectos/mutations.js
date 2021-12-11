// Templates de gql en Apollo
import { gql } from "@apollo/client";

const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $objGeneral: String!, $objEspecificos: String!, $presupuesto: Float!, $fechaInicio: Date!, $fechaFin: Date!, $estado: Enum_EstadoProyecto) {
  crearProyecto(nombre: $nombre, objGeneral: $objGeneral, objEspecificos: $objEspecificos, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado) {
    _id
   
  }
}
`
export { CREAR_PROYECTO }