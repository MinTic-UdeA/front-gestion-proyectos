// Templates de gql en Apollo
import { gql } from "@apollo/client";

const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $lider: String!, $objGeneral: String, $objEspecificos: String) {
  crearProyecto(nombre: $nombre, presupuesto: $presupuesto, lider: $lider, objGeneral: $objGeneral, objEspecificos: $objEspecificos) {
    _id
    lider {
      _id
    }
  }
}
`

export { CREAR_PROYECTO }

