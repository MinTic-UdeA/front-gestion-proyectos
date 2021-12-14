// Templates de gql en Apollo
import { gql } from "@apollo/client";

const CREAR_PROYECTO = gql`
mutation crearProyecto($nombre: String!, $presupuesto: Float!, $lider: String!, $objGeneral: String, $objEspecificos: String) {
  crearProyecto(nombre: $nombre, presupuesto: $presupuesto, lider: $lider, objGeneral: $objGeneral, objEspecificos: $objEspecificos) {
    _id
    lider {
      _id
    }
  }
}  
`

const EDITAR_PROYECTO = gql`
mutation editarProyecto($_id: String!, $nombre: String!, $objGeneral: String!, $objEspecificos: String!, $presupuesto: Float!) {
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

const APROBAR_PROYECTO = gql`
  mutation aprobarProyecto($_id: String!) {
  aprobarProyecto(_id: $_id) {
    _id
  }
}
`

const DESACTIVAR_PROYECTO = gql`
mutation DesactivarProyecto($_id: String!) {
  desactivarProyecto(_id: $_id) {
    _id
  }
}
`
const TERMINAR_PROYECTO = gql`
 mutation terminarProyecto($_id: String!) {
  terminarProyecto(_id: $_id) {
    _id
  
  }
}
`
const REACTIVAR_PROYECTO = gql`
 mutation reactivarProyecto($_id: String!) {
  reactivarProyecto(_id: $_id) {
    _id
   
  }
}
`
export { CREAR_PROYECTO, EDITAR_PROYECTO, APROBAR_PROYECTO, DESACTIVAR_PROYECTO, TERMINAR_PROYECTO, REACTIVAR_PROYECTO }

