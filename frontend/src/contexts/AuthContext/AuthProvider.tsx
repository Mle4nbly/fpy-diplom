import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({children}: {children: ReactNode}) => { 
  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('token');

    return token ? token : '';
  });

  const {getData, sendData} = useApi(token);

  const [adminRights, setAdminRights] = useState(false);

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }

    getMeData();
  }, [token, navigate]);

  const getMeData = async () => {
    const response = await getData('/users/me');

    if (response) {
      setUsername(response.username);
      setAdminRights(response.is_admin);
    };
  }

  const register = async (username: string, email: string, fullName: string, password: string) => {
    const response = await sendData('POST', '/users/register', {username, email, fullName, password})

    if (response) {
      setToken(response.token)
      localStorage.setItem('token', response.token)
    };
  };

  const login = async (username: string, password: string) => {
    const response = await sendData('POST', '/users/login', {username, password})    
    console.log(token);
    
    if (response) {
      setToken(response.token)
      localStorage.setItem('token', response.token)
    };
  };

  const logout = async () => {
    const response = await sendData('POST', '/users/logout')

    if (response) {
      setUsername('');
      setToken('');
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{token, username, adminRights, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}