import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Index from 'pages/Index';
import "styles/globals.css";
import "styles/tabla.css"
import IndexUsuarios from 'pages/usuarios';
import IndexPerfil from 'pages/perfil';
import IndexProyectos from 'pages/proyectos';
import IndexAvances from 'pages/avances';
import IndexInscripciones from 'pages/inscripciones';
import EditarUsuario from 'pages/usuarios/editar';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
// import { AuthContext } from 'context/authContext';

// import PrivateRoute from 'components/PrivateRoute';

// poder agregar funcionalidades como los tokens que vamos a tener que mandar para el backend
// const httpLink = createHttpLink("https://c4devops.herokuapp.com/graphql")

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
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
    }
  }
  
  return (

    < ApolloProvider client={client}>
      {/* <AuthContext.Provider value={{ setToken, authToken, setAuthToken }} > */}
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='/perfil' element={<IndexPerfil />} />
                <Route path='/proyectos' element={<IndexProyectos />} />
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
      {/* </AuthContext.Provider> */}
    </ApolloProvider>
  );
}

export default App;
