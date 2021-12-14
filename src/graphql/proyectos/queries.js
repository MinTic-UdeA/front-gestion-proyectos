// Templates de gql en Apollo
import { gql } from "@apollo/client";

const GET_PROYECTOS = gql`
query Query {
  Proyectos {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      correo
    }
  }
}
`
const GET_PROYECTO = gql`
query Proyecto($_id: String!) {
  Proyecto(_id: $_id) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    estado
    fase
  }
}
`

const PROYECTOS_BY_LIDER = gql`
query ListarProyectosByLider($_id: String) {
  listarProyectosByLider(_id: $_id) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    fechaInicio
    fechaFin
    estado
  }
}
`


export { PROYECTOS_BY_LIDER, GET_PROYECTOS, GET_PROYECTO }


