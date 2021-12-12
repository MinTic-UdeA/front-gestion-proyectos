// Templates de gql en Apollo
import { gql } from "@apollo/client";

const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $fechaInicio: Date!, $fechaFin: Date!, $lider: String!, $objGeneral: String, $objEspecificos: String) {
  crearProyecto(nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, lider: $lider, objGeneral: $objGeneral, objEspecificos: $objEspecificos) {
    _id
    nombre
    lider {
      _id
    }
  }
}
`
export { CREAR_PROYECTO }

