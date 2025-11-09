import { createContext } from "react";

export type AuthContextType = {
  username: string,
  token: string,
  adminRights: boolean,
  login: (username: string, password: string) => void,
  register: (username: string, email: string, fullName: string, password: string) => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  username: '',
  token: '',
  adminRights: false,
  login: () => {},
  register: () => {},
  logout: () => {},
})