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

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const btnRef = useRef<HTMLButtonElement | null>(null)

  const handleChangeRights = () => {
    onChangeRights(id, !adminRights);

    setAdminRights(!adminRights)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const renderCountFileValue = (filesCount: number) => {
    if (filesCount >= 5 || !filesCount) return `${filesCount} файлов`
    if (filesCount == 1) return `${filesCount} файл`
    if (filesCount < 5) return `${filesCount} файла`
  } 

  return (
    <>
      <tr className="body-row">
        <td className="cell-container">
          <div className="cell-content">
            {`${username}`} <span style={{color: '#ff7878', fontWeight: '600'}}>{is_admin ? 'Админ' : ''}</span>
          </div>
        </td>
        <td className="cell-container">
          <div className="cell-content">
            <span>{renderCountFileValue(files_count)}</span>
          </div>
        </td>
        <td className="cell-container">
          <div className="cell-content">
            <span>{total_size ? `${(total_size / 1024 / 1024).toFixed(2)} MB` : '0 MB'}</span>
          </div>
        </td>
        <td className="cell-container">
          <div className="cell-content cell-content--end">
            <button ref={btnRef} type="button" className="btn btn-circle" onClick={() => setDropdownIsOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {dropdownIsOpen && btnRef ? 
        <Dropdown
          buttonRef={btnRef}
          onClose={() => setDropdownIsOpen(false)}
        >
          <li>
            <button className="dropdown-item" onClick={handleChangeRights}>
              {adminRights ? 'Ограничить доступ' : 'Предоставить доступ'}
            </button>
            <button className="dropdown-item" onClick={() => navigate(`/admin/${username}`)}>
              Посмотреть хранилище
            </button>
          </li>
          <li className="dropdown-footer">
            <button className="dropdown-item" onClick={handleDelete}>
              Удалить пользователя
            </button>
          </li>
        </Dropdown> : ''
      }
    </>
  )
} 