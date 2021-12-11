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

export { GET_PROYECTOS }
