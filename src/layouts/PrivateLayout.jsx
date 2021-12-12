import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from 'context/authContext';
import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN } from 'graphql/auth/mutations';
import { useNavigate } from 'react-router';

const PrivateLayout = () => {

  const navigate = useNavigate()

  // revisar si tengo un token en el local storage
  const { setToken, authToken, } = useAuth();

  const [loadingAuth, setLoadingAuth] = useState(true);

  // mutación de validar token -> crear en el back el resolver para validar el token
  const [refreshToken, { data: mutationData, loading: loadingMutation, error: errorMutation }] = useMutation(REFRESH_TOKEN)

  useEffect(() => {
    refreshToken()
  }, [refreshToken])

  useEffect(() => {
    if (mutationData) {
      if (mutationData.refreshToken.token) {
        setToken(mutationData.refreshToken.token);
      } else {
        setToken(null);
        navigate('/auth/login');
      }
      setLoadingAuth(false);
    }
  }, [mutationData, setToken, loadingAuth, navigate]);

  if (loadingMutation || loadingAuth) return <div> ... Loading</div>

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
