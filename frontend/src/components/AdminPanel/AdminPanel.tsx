import { useContext, useEffect } from 'react';
import { UsersList } from './UsersList';
import { UsersContext } from '../../contexts/UsersContext/UsersContext';

export const AdminPanel = () => {
  const { users, deleteUser, changeUserRights, getUsersList } = useContext(UsersContext);

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  if (!users?.length) return <p>No users...</p>;

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
