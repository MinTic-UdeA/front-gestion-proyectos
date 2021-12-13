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

const EDITAR_PROYECTO = gql`
mutation Mutation($_id: String!, $nombre: String!, $objGeneral: String!, $objEspecificos: String!, $presupuesto: Float!) {
  editarProyecto(_id: $_id, nombre: $nombre, objGeneral: $objGeneral, objEspecificos: $objEspecificos, presupuesto: $presupuesto) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    lider {
      _id
    }
  }
}
`


export { CREAR_PROYECTO, EDITAR_PROYECTO }

