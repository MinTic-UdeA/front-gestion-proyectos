import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import { useUser } from 'context/userContext';
import PrivateComponent from './PrivateComponent';

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-red-700'>
        <div className='flex items-center'>
          <i className='fas fa-sign-out-alt' />
          <span className='text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const SidebarLinks = () => {
  const { userData } = useUser();
  return (
    <div className="flex flex-col">
      <ul className='mt-4'>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-list' />
        </PrivateComponent>

        <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
          <SidebarRoute to='/perfil' title='Perfil' icon='fas fa-user-cog' />
        </PrivateComponent>

        <PrivateComponent roleList={["ADMINISTRADOR"]}>
          <SidebarRoute to='/proyectosadmin' title='Proyectos' icon='far fa-lightbulb' />
        </PrivateComponent>

        
        <PrivateComponent roleList={["LIDER"]}>
          <SidebarRoute to='/proyectoslider' title='Proyectos' icon='far fa-lightbulb' />
        </PrivateComponent>

        
        <PrivateComponent roleList={["ESTUDIANTE"]}>
          <SidebarRoute to='/proyectosestudiante' title='Proyectos' icon='far fa-lightbulb' />
        </PrivateComponent>

        <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
          <SidebarRoute to='/inscripciones' title='Inscripciones' icon='fas fa-plus' />
        </PrivateComponent>

        <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
          <SidebarRoute to='/avances' title='Avances' icon='fas fa-angle-double-right' />
        </PrivateComponent>
        <Logout />
      </ul>
      <div className="mt-40 p-2 text-1xl text-white self-center">Rol: {userData.rol}</div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      {/*  <img src='logo.png' alt='Logo' className='h-16' /> */}
      <span className='mt-5 text-xl text-blue-500 font-bold text-center'>ProjectTracker</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-2'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-gray-800'
            : 'sidebar-route text-white-900 hover:text-blue-200 hover:bg-gray-800'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

// me permite importar en otro archivo con el nombre que yo quiera
export default Sidebar;
