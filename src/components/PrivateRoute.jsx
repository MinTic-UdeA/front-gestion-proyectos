import { useUser } from 'context/userContext';
import React from 'react';

const PrivateRoute = ({ roleList, children }) => {

  const { userData } = useUser();

  console.log(userData.estado)

    if (roleList.includes(userData.rol) && userData.estado === "AUTORIZADO") {
      return children;
    }
  
  return <div className='text-3xl text-red-600 m-10'>Autorización denegada para ver este sitio</div>;
};

export default PrivateRoute;