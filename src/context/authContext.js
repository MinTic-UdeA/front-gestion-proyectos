// funcion que me deje autenticar en toda la app. Lo ponemos en APP.JSX
import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

