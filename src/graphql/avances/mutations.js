import { gql } from "@apollo/client";

const CREAR_AVANCE = gql`
mutation CrearAvance($descripcion: String!, $proyecto: String!, $creadoPor: String!) {
  crearAvance(descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
  }
}
`

const EDITAR_AVANCE = gql`
mutation EditarAvance($id: String!, $descripcion: String!) {
  editarAvance(_id: $id, descripcion: $descripcion) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
  }
}
`
const CREAR_OBSERVACION = gql`
mutation CrearObservacion($_id: String!, $observacion: String!) {
  crearObservacion(_id: $_id, observacion: $observacion) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
  }
}
`


export { CREAR_AVANCE, EDITAR_AVANCE, CREAR_OBSERVACION }