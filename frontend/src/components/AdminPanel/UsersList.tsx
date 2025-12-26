import type { UserType } from "../../types/apiTypes"
import { UserCard } from "./UserCard"

export interface UsersListProps {
  users: UserType[],
  onChangeRights: (id: number, newRights: boolean) => void,
  onDelete: (id: number) => void
}

export const UsersList = ({users, onChangeRights, onDelete}: UsersListProps) => {
  return (
    <table className="table">
      <thead>
        <tr className="header-row">
          <th className="cell-container">
            <span className="cell-content">Имя</span>
          </th>
          <th className="cell-container col-uploaded">
            <span className="cell-content">Загружено</span>
          </th>
          <th className="cell-container col-size">
            <span className="cell-content">Размер</span>
          </th>
          <th className="cell-container col-actions">
            <span className="cell-content cell-content--end">Действия</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
          <UserCard key={user.id} id={user.id} username={user.username} total_size={user.total_size} is_admin={user.is_admin} files_count={user.files_count} onChangeRights={onChangeRights} onDelete={onDelete}/>
        )}
      </tbody>
    </table>
  )
}