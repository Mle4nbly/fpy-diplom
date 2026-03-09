import { Route, Routes } from 'react-router-dom';
import { FilesManagerPage } from './pages/FilesManagerPage';
import { LoginPage } from './pages/LoginPage';
import { RegPage } from './pages/RegPage';

import './App.css';
import { MainLayout } from './layouts/MainLayout';
import { AdminPage } from './pages/AdminDashboardPage';
import { AdminFilesManagerPage } from './pages/AdminFilesManagerPage';
import { ShareFilePage } from './pages/ShareFilePage';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import { PrivateRoute } from './layouts/PrivateRoute';
import { PublicRoute } from './layouts/PublicRoute';
import { ErrorPage } from './pages/ErrorPage';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/reg" element={<RegPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<FilesManagerPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/:username" element={<AdminFilesManagerPage />} />
          </Route>
        </Route>

        <Route element={<ShareFilePage />} path="/s/:token" />

        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
