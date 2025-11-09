import { useContext, useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { UsersList } from "./UsersList"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import type { UserType } from "../../types/apiTypes"
import { UsersProvider } from "../../contexts/UsersContext/UsersProvider"
import { UsersContext } from "../../contexts/UsersContext/UsersContext"

export const AdminPanel = () => {
  const {token} = useContext(AuthContext)

  const {users, deleteUser, changeUserRights, getUsersList} = useContext(UsersContext)

  useEffect(() => {
    getUsersList();
  }, [])

  if (!users?.length) return <p>No users...</p>;

  return (
    <>
      <div className="container container-header">
        <h3 className="title">Панель администратора</h3>
      </div>
      <section className="container">
        <UsersList users={users} onChangeRights={changeUserRights} onDelete={deleteUser}/>
      </section>
    </>
  )
}