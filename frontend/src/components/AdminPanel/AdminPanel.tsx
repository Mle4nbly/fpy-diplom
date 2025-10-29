import { useContext, useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { UsersList } from "./UsersList"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import type { UserType } from "../../types/types"

export const AdminPanel = () => {
  const {token} = useContext(AuthContext)
  const {getData, sendData} = useApi(token) 
  
  const [users, setUsers] = useState<UserType[] | null>(null)

  useEffect(() => {
    getUsersList();
  }, [])

  const getUsersList = async () => {
    const response = await getData('/users');

    if (response) setUsers(response);
  }

  if (!users?.length) return <p>No users...</p>;

  return (
    <>
      <div className="container container-header">
        <h3 className="title">Панель администратора</h3>
      </div>
      <section className="container">
        <UsersList users={users}/>
      </section>
    </>
  )
}