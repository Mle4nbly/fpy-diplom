import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useApi } from '../../hooks/useApi';

type UserDataType = {
  username: string;
  email: string;
  is_admin: boolean;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('token');

    return token ? token : null;
  });

  const { getData, sendData } = useApi(token);

  const [userData, setUserData] = useState<UserDataType | null>(null);

  const getMeData = useCallback(async () => {
    try {
      const data = await getData('/users/me');
      if (!data) return;

      const { username, email, is_admin } = data;
      setUserData({ username, email, is_admin });
    } catch {
      setUserData(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  }, [getData, setUserData, setToken]);

  useEffect(() => {
    if (token) {
      getMeData();
    } else {
      setUserData(null);
    }
  }, [token, getMeData]);

  const register = async (username: string, email: string, fullName: string, password: string) => {
    const data = await sendData(
      'POST',
      '/users/register',
      JSON.stringify({ username, email, full_name: fullName, password }),
    );

    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const login = async (username: string, password: string) => {
    const data = await sendData('POST', '/users/login', JSON.stringify({ username, password }));

    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const logout = async () => {
    try {
      const data = await sendData('POST', '/users/logout');

      return data;
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setToken(null);
      setUserData(null);
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username: userData?.username || null,
        email: userData?.email || null,
        adminRights: userData?.is_admin ?? null,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
