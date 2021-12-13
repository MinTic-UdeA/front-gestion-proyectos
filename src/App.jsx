import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import Index from 'pages/Index';
import "styles/globals.css";
import "styles/tabla.css"
import IndexUsuarios from 'pages/usuarios';
import IndexPerfil from 'pages/perfil';
import IndexAvances from 'pages/avances';
import IndexInscripciones from 'pages/inscripciones';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import NuevoProyecto from 'pages/proyectos/nuevo';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode'
import ProyectosLider from 'pages/proyectos/proyectosLider';

// poder agregar funcionalidades como los tokens que vamos a tener que mandar para el backend
const httpLink = createHttpLink({uri: "http://localhost:4000/graphql"})

// esta en la documentacion de Apollo
const authLink = setContext((_, { headers }) => {
  // crea el contexto y roba el token del localstorage
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

function App() {
  
  const [userData, setUserData] = useState({});

  // estado que me va a recibir el token
  const [authToken, setAuthToken] = useState("")
  
  // setea el estado y guarda el token en el local Storage
  const setToken = (token) => {
    setAuthToken(token)
    if (token) {
      localStorage.setItem("token", JSON.stringify(token))
    } else {
      localStorage.removeItem("token")
    }
  }

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
        estado: decoded.estado
      })
    }
  }, [authToken])
  
  return (

    < ApolloProvider client={client}>
      <AuthContext.Provider value={{ setToken, authToken, setAuthToken }} >
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                {/* <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} /> */}
                <Route path='/perfil/' element={<IndexPerfil />} />
                <Route path='/proyectos' element={<ProyectosLider />} />
                <Route path='/proyectos/nuevo' element={<NuevoProyecto />} />
                <Route path='/avances' element={<IndexAvances />} />
                <Route path='/inscripciones' element={<IndexInscripciones />} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
