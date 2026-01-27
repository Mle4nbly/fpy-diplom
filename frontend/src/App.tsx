import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/AuthPages/LoginPage';
import { RegPage } from './pages/AuthPages/RegPage';

import './App.css';
import { MainLayout } from './layouts/MainLayout';
import { AdminPage } from './pages/AdminPages/AdminPage';
import { AdminFilesPage } from './pages/AdminPages/AdminFilesPage';
import { ShareFilePage } from './pages/ShareFilePage/ShareFilePage';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import { PrivateRoute } from './layouts/PrivateRoute';
import { PublicRoute } from './layouts/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<PublicRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/reg" element={<RegPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/:username" element={<AdminFilesPage />} />
          </Route>
        </Route>

        <Route element={<ShareFilePage />} path="/s/:token" />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
