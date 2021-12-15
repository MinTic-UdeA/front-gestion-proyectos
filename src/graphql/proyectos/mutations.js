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
mutation AprobarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto, $fechaInicio: String) {
  aprobarProyecto(_id: $_id, estado: $estado, fase: $fase, fechaInicio: $fechaInicio) {
    _id
  }
}
`

const DESACTIVAR_PROYECTO = gql`
mutation DesactivarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fechaFin: String) {
  desactivarProyecto(_id: $_id, estado: $estado, fechaFin: $fechaFin) {
    _id
  }
}

`
const TERMINAR_PROYECTO = gql`
mutation TerminarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto, $fechaFin: String) {
  terminarProyecto(_id: $_id, estado: $estado, fase: $fase, fechaFin: $fechaFin) {
    _id
  }
}
`
const REACTIVAR_PROYECTO = gql`
mutation ReactivarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fechaInicio: String) {
  reactivarProyecto(_id: $_id, estado: $estado, fechaInicio: $fechaInicio) {
    _id
  }
}
`
export { CREAR_PROYECTO, EDITAR_PROYECTO, APROBAR_PROYECTO, DESACTIVAR_PROYECTO, TERMINAR_PROYECTO, REACTIVAR_PROYECTO }

