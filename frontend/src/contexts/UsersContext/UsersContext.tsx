import { createContext } from "react";
import type { UserType } from "../../types/apiTypes";

export type UsersContextType = {
  users: UserType[] | null,
  loading: boolean,
  error: string | null,
  getUsersList: () => void,
  deleteUser: (id: number) => void,
  changeUserRights: (id: number, newRights: boolean) =>  void
}

export const UsersContext = createContext<UsersContextType>({
  users: [],
  loading: false,
  error: '',
  getUsersList: () => {},
  deleteUser: () => {},
  changeUserRights: () => {},
})