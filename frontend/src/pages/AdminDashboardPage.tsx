import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';
import { useUsersData } from '../shared/hooks/useUsersData';
import { UsersList } from '../features/admin/ui/AdminUsersList';

export const AdminPage = () => {
  const { adminRights, token } = useContext(AuthContext);

  const { users, deleteUser, changeUserRights } = useUsersData(token)

  if (!adminRights) {
    return <Navigate to={'/'}></Navigate>;
  }

  if (!users?.length) return <p>No users...</p>

  return (
    <section className="page-content-section">
      <div className="title-container">
        <h3 className="title">Панель администратора</h3>
      </div>
      <div className="content-container">
        <UsersList users={users} onChangeRights={changeUserRights} onDelete={deleteUser} />
      </div>
    </section>
  );
};
