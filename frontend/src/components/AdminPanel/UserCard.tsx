import { useEffect, useState } from "react";
import type { UserType } from "../../types/types"
import { AdminControlButton } from "../ui/Buttons/AdminControlButton"

export interface UserCardProps extends UserType {
  onChangeRights: (id: number, is_admin: boolean) => {};
}

export const UserCard = ({id, username, files_count, total_size, is_admin}: UserCardProps) => {
  const [adminRights, setAdminRight] = useState(is_admin);

  useEffect(() => {
    
    onChangeRights()
  }, [adminRights])

  const toggleAdminRights = () => {
    setAdminRight(!adminRights);

    return;
  }

  return (
    <tr className="file-row">
      <td className="user-name-cell">
        {username}
      </td>
      <td className="user-files-cell">
        {files_count}
      </td>
      <td className="user-size-cell">
        {total_size}
      </td>
      <AdminControlButton onClick={toggleAdminRights} isAdmin={is_admin}/>
    </tr>
  )
} 