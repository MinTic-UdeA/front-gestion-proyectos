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
  mutation aprobarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto) {
  aprobarProyecto(_id: $_id, estado: $estado, fase: $fase) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`

const DESACTIVAR_PROYECTO = gql`
 mutation desactivarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto) {
  aprobarProyecto(_id: $_id, estado: $estado, fase: $fase) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`
const TERMINAR_PROYECTO = gql`
 mutation terminarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto) {
  terminarProyecto(_id: $_id, estado: $estado, fase: $fase) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`
const REACTIVAR_PROYECTO = gql`
 mutation reactivarProyecto($_id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto) {
  reactivarProyecto(_id: $_id, estado: $estado, fase: $fase) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`
export { CREAR_PROYECTO, EDITAR_PROYECTO, APROBAR_PROYECTO, DESACTIVAR_PROYECTO, TERMINAR_PROYECTO, REACTIVAR_PROYECTO }

