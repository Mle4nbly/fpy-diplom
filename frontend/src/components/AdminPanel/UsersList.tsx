import type { UserType } from "../../types/types"
import { UserCard } from "./UserCard"

export interface UsersListProps {
  users: UserType[],
}

export const UsersList = ({users}: UsersListProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Имя пользователя</th>
          <th>Количество файлов</th>
          <th>Размер файлов</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
          <UserCard key={user.id} id={user.id} username={user.username} total_size={user.total_size} is_admin={user.is_admin} files_count={user.files_count}/>
        )}
      </tbody>
    </table>
  )
}