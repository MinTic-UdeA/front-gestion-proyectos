import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
          <Outlet />
    </div>
  );
};

export default AuthLayout;