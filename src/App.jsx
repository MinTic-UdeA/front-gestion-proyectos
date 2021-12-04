import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
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

// import PrivateRoute from 'components/PrivateRoute';

// poder agregar funcionalidades como los tokens que vamos a tener que mandar para el backend
// const httpLink = createHttpLink("https://c4devops.herokuapp.com/graphql")

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://c4devops.herokuapp.com/graphql"
})

function App() {
  const [userData, setUserData] = useState({});

  return (

    < ApolloProvider client={client}>

    <Auth0Provider
      domain='misiontic-concesionario.us.auth0.com'
      clientId='WsdhjjQzDLIZEHA6ouuxXGxFONFGAQ4g'
      redirectUri='http://localhost:3000/admin'
      audience='api-autenticacion-concesionario-mintic'
    >
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateLayout />}>
              <Route path='' element={<Index/>} />
              <Route path='/usuarios' element={<IndexUsuarios/>} />
              <Route path='/usuarios/editar/:_id' element={<EditarUsuario/>} />
              <Route path='/perfil' element={<IndexPerfil/>} />
              <Route path='/proyectos' element={<IndexProyectos/>} />
              <Route path='/avances' element={<IndexAvances/>} />
              <Route path='/inscripciones' element={<IndexInscripciones/>} />
            </Route>
            <Route path='auth' element={<AuthLayout />}>
               <Route path='/auth/register' element={<Register/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Auth0Provider>
    </ApolloProvider>
  );
}

export default App;
