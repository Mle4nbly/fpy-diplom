import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { RegPage } from "./pages/AuthPages/RegPage";

import './App.css'
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { AdminPage } from "./pages/AdminPages/AdminPage";
import { AdminFilesPage } from "./pages/AdminPages/AdminFilesPage";

function App() {
  return (
    <Routes>

      <Route element={<AuthLayout/>}>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/reg" element={<RegPage/>}/>
      </Route>

      <Route element={<MainLayout/>}>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/admin/:username" element={<AdminFilesPage/>}/>
      </Route>

      <Route path="/" element={
        localStorage.getItem("token")
          ? <Navigate to={"/home"}/>
          : <Navigate to={"/login"}/>
      } />

    </Routes>
  )
}

export default App
