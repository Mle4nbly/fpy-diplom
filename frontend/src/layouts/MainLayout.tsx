import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { useEffect } from "react"
import { FileProvider } from "../contexts/FilesContext/FilesProvider"
import { ViewTypeProvider } from "../contexts/ViewTypeContext/ViewTypeProvider"
import { AuthProvider } from "../contexts/AuthContext/AuthProvider"
import { UsersProvider } from "../contexts/UsersContext/UsersProvider"

export const MainLayout = () => {
  useEffect(() => {
    const viewType = localStorage.getItem('viewType');

    if (!viewType) localStorage.setItem('viewType', 'LIST');
  }, [])

  return (
    <AuthProvider>
      <ViewTypeProvider>
        <FileProvider>
          <UsersProvider>
            <Header />
            <Outlet />
          </UsersProvider>
        </FileProvider>
      </ViewTypeProvider>
    </AuthProvider>
  )
}