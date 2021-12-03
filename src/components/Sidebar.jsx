import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLinks = () => {
  return (
    <ul className='mt-4'>
      <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-list' />
      <SidebarRoute to='/perfil' title='Perfil' icon='fas fa-user-cog' />
      <SidebarRoute to='/proyectos' title='Proyectos' icon='far fa-lightbulb' />
      <SidebarRoute to='/inscripciones' title='Inscripciones' icon='fas fa-plus' />
      <SidebarRoute to='/avances' title='Avances' icon='fas fa-angle-double-right' />
    </ul>
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
