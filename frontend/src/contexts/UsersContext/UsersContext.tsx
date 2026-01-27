import { createContext } from 'react';
import type { UserType } from '../../types/apiTypes';

export type UsersContextType = {
  users: UserType[] | null;
  getUsersList: () => void;
  deleteUser: (id: number) => void;
  changeUserRights: (id: number, newRights: boolean) => void;
};

export const UsersContext = createContext<UsersContextType>({
  users: [],
  getUsersList: () => {},
  deleteUser: () => {},
  changeUserRights: () => {},
});
