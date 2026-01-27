import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { FileProvider } from '../contexts/FilesContext/FilesProvider';
import { ViewTypeProvider } from '../contexts/ViewTypeContext/ViewTypeProvider';
import { UsersProvider } from '../contexts/UsersContext/UsersProvider';

export const MainLayout = () => {
  return (
    <ViewTypeProvider>
      <FileProvider>
        <UsersProvider>
          <main>
            <div className="page-container">
              <Header />
              <Outlet />
            </div>
          </main>
        </UsersProvider>
      </FileProvider>
    </ViewTypeProvider>
  );
};
