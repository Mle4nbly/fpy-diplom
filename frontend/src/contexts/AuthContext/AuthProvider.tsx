import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({children}: {children: ReactNode}) => { 
  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('token');

    return token ? token : '';
  });

  const [username, setUsername] = useState(() => {
    const username = localStorage.getItem('username');

    return username ? username : '';
  });

  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, [token, navigate]);

  const register = async (username: string, email: string, fullName: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, 
          email, 
          full_name: fullName, 
          password
        })
      })

      if (!response.ok) throw new Error('Ошибка регистрации')
      const jsonData = await response.json();

      setUsername(jsonData.username);
      setToken(jsonData.token);

      localStorage.setItem('token', jsonData.token);
      localStorage.setItem('username', jsonData.username)
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      if (!response.ok) throw new Error('Ошибка авторизации')
      const jsonData = await response.json();

      setUsername(jsonData.username);
      setToken(jsonData.token);

      localStorage.setItem('token', jsonData.token);
      localStorage.setItem('username', jsonData.username)
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUsername('');
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{token, username, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}