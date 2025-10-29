import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { RegPage } from "./pages/RegPage";

import './App.css'
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { ModalProvider } from "./contexts/ModalContext/ModalProvider";
import { AdminPage } from "./pages/AdminPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/admin', element: <AdminPage /> }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <AuthPage /> },
      { path: '/auth/reg', element: <RegPage /> }
    ]
  }
]);

function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router}/>
    </ModalProvider>
  )
}

export default App
