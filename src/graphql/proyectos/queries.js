// Templates de gql en Apollo
import { gql } from "@apollo/client";

const GET_PROYECTOS = gql`
    query Proyectos {
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
  }
}
`

const PROYECTOS_BY_LIDER = gql`
query ListarProyectosByLider($lider: String, $estado: Enum_EstadoProyecto) {
  listarProyectosByLider(lider: $lider, estado: $estado) {
    _id
    nombre
    objGeneral
    objEspecificos
    presupuesto
    estado
    fase
  }
}
#{ AND: [{ rated: "PG-13" }, { runtime_lt: 120 }] }) 
`

export { PROYECTOS_BY_LIDER, GET_PROYECTOS, GET_PROYECTO }


