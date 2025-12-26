import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { FileProvider } from "../contexts/FilesContext/FilesProvider"
import { ViewTypeProvider } from "../contexts/ViewTypeContext/ViewTypeProvider"
import { AuthProvider } from "../contexts/AuthContext/AuthProvider"
import { UsersProvider } from "../contexts/UsersContext/UsersProvider"

export const MainLayout = () => {

  return (
    <AuthProvider>
      <ViewTypeProvider>
        <FileProvider>
          <UsersProvider>
            <main>
              <div className="home-page">
                <Header />
                <Outlet />
              </div>
            </main>
          </UsersProvider>
        </FileProvider>
      </ViewTypeProvider>
    </AuthProvider>
  )
}