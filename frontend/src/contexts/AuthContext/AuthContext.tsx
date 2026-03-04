import { createContext } from 'react';

export type AuthContextType = {
  username: string | null;
  full_name: string | null;
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
  full_name: null,
  token: null,
  adminRights: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});
