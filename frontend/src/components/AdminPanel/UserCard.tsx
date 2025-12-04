import { useRef, useState } from "react";
import type { UserType } from "../../types/apiTypes"
import { Dropdown } from "../UI/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";

export interface UserCardProps extends UserType {
  onChangeRights: (id: number, newRights: boolean) => void,
  onDelete: (id: number) => void,
}

export const UserCard = ({id, username, files_count, total_size, is_admin, onChangeRights, onDelete}: UserCardProps) => {
  const [adminRights, setAdminRights] = useState(is_admin);
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const btnRef = useRef<HTMLButtonElement | null>(null)

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
        {`${username}`} <span style={{color: '#ff7878', fontWeight: '600'}}>{is_admin ? 'Админ' : ''}</span>
      </td>
      <td className="user-files-cell">
        {files_count}
      </td>
      <td className="user-size-cell">
        {total_size ? `${(total_size / 1024 / 1024).toFixed(2)} MB` : '0 MB'}
      </td>
      <td>
        <button ref={btnRef} type="button" className="btn btn-secondary btn-dropdown" onClick={() => setIsDropdownOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
        </button>
        {isDropdownOpen && btnRef ? 
          <Dropdown
            btnRef={btnRef}
            onClose={() => setIsDropdownOpen(false)}
          >
            <li>
              <button className="dropdown-item" onClick={handleChangeRights}>
                {adminRights ? 'Ограничить доступ' : 'Предоставить доступ'}
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleDelete}>
                Удалить пользователя
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => navigate(`/admin/${username}`)}>
                Посмотреть хранилище
              </button>
            </li>
          </Dropdown> : ''
        }
      </td>
    </tr>
  )
} 