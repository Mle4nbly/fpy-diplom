import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { useEffect } from "react"
import { FileProvider } from "../contexts/FilesContext/FilesProvider"
import { ViewTypeProvider } from "../contexts/ViewTypeContext/ViewTypeProvider"
import { AuthProvider } from "../contexts/AuthContext/AuthProvider"

export const MainLayout = () => {
  useEffect(() => {
    const viewType = localStorage.getItem('viewType');

    if (!viewType) localStorage.setItem('viewType', 'LIST');
  }, [])

  return (
    <AuthProvider>
      <ViewTypeProvider>
        <FileProvider>
          <Header />
          <Outlet />
        </FileProvider>
      </ViewTypeProvider>
    </AuthProvider>
  )
}