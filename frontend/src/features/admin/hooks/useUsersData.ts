import { useEffect, useState } from "react";
import { useApi } from "../../../shared/hooks/useApi";
import type { UserType } from "../../../types/apiTypes";

export const useUsersData = (token: string | null) => {
  const { getData, sendData } = useApi(token);

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsersList();
  }, [])

  const getUsersList = async () => {
    try {
      setLoading(true);
      const data = await getData('/users')

      setUsers(data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    };
  }
  
  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      const data = await sendData('POST', `/users/${id}`);

      if (data) setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    };
  }

  const changeUserRights = async (id: number, newValue: boolean) => {
    try {
      setLoading(true);
      const data = await sendData(
        'PATCH', 
        `/users/${id}`, 
        JSON.stringify({
          is_admin: newValue
      }))

      if (data) setUsers((prev) => prev.map(u => u.id == id ? {...u, is_admin: newValue} : u));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    };
  }

  return { users, loading, getUsersList, deleteUser, changeUserRights }
}