import { useState } from "react";
import type { UserType } from "../../types/apiTypes"
import { Dropdown } from "../ui/Dropdown/Dropdown";

export interface UserCardProps extends UserType {
  onChangeRights: (id: number, newRights: boolean) => void,
  onDelete: (id: number) => void,
}

export const UserCard = ({id, username, files_count, total_size, is_admin, onChangeRights, onDelete}: UserCardProps) => {
  const [adminRights, setAdminRights] = useState(is_admin);

  const handleChangeRights = () => {
    onChangeRights(id, !adminRights);

    setAdminRights(!adminRights)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <tr className="file-row">
      <td className="user-name-cell">
        {`${username} ${is_admin ? '(администратор)' : ''}`}
      </td>
      <td className="user-files-cell">
        {files_count}
      </td>
      <td className="user-size-cell">
        {total_size ? total_size : '0'}
      </td>
      <td>
        <Dropdown 
          id={id} 
          items={[
            {
              id: 'rights', 
              label: `${adminRights ? 'Ограничить доступ' : 'Предоставить доступ'}`, 
              action: handleChangeRights},
            {
              id: 'delete',
              label: 'Удалить пользователя',
              action: handleDelete
            }
          ]}
        />
      </td>
    </tr>
  )
} 