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

const PROYECTOS_BY_LIDER = gql`
query ListarProyectosByLider($lider: String) {
  listarProyectosByLider(lider: $lider) {
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

export { PROYECTOS_BY_LIDER , GET_PROYECTOS }


