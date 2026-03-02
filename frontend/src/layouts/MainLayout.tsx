import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { ViewTypeProvider } from '../contexts/ViewTypeContext/ViewTypeProvider';

export const MainLayout = () => {
  return (
    <ViewTypeProvider>
      <main>
        <div className="page-container">
          <Header />
          <Outlet />
        </div>
      </main>
    </ViewTypeProvider>
  );
};
