import { createContext } from 'react';

export type AuthContextType = {
  username: string | null;
  token: string | null;
  email: string | null;
  adminRights: boolean | null;
  login: (username: string, password: string) => void;
  register: (username: string, email: string, fullName: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  username: null,
  email: null,
  token: null,
  adminRights: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});
