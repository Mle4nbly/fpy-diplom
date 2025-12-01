import { useContext } from "react"
import { AdminPanel } from "../../components/AdminPanel/AdminPanel"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { Navigate } from "react-router-dom"

export const AdminPage = () => {
  const {adminRights} = useContext(AuthContext);

  if (!adminRights) {
    return <Navigate to={'/'}></Navigate>
  }

  return (
    <AdminPanel />
  )
}