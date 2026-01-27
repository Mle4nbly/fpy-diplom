import { useState, type ReactNode } from 'react';
import { UsersContext } from './UsersContext';
import { useApi } from '../../hooks/useApi';
import type { UserType } from '../../types/apiTypes';

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token') || '';

  const { getData, sendData } = useApi(token);
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsersList = async () => {
    const response = await getData('/users');

    if (response) setUsers(response);
  };

  const deleteUser = async (id: number) => {
    const response = await sendData('DELETE', `/users/${id}`);

    if (response) setUsers((prev) => prev?.filter((u) => u.id !== id));
  };

  const changeUserRights = async (id: number, newRights: boolean) => {
    const response = await sendData('PUT', `/users/${id}`, JSON.stringify({ is_admin: newRights }));

    if (response) {
      setUsers((prev) => prev?.map((u) => (u.id == id ? { ...u, is_admin: newRights } : u)));
    }
  };

  return (
    <UsersContext.Provider value={{ users, getUsersList, deleteUser, changeUserRights }}>
      {children}
    </UsersContext.Provider>
  );
};
