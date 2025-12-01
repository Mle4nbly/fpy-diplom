import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { Dropdown } from "../Dropdown/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";

export const UserButton = () => {
  const navigate = useNavigate();
  const url = useLocation().pathname;

  const {username, email, adminRights, logout} = useContext(AuthContext);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const btnRef = useRef<HTMLButtonElement | null>(null)

  const handleAdminClick = () => {
    setDropdownIsOpen(false);
    navigate('/admin');
  }

  const handleClickLogout = () => {
    setDropdownIsOpen(false);
    logout();
  }

  return (
    <button ref={btnRef} className="btn-user ms-auto" onClick={() => setDropdownIsOpen(true)}>
      {username ? username[0].toUpperCase() : 'NaN'}
      {dropdownIsOpen && btnRef &&
        <Dropdown
          btnRef={btnRef}
          onClose={() => setDropdownIsOpen(false)}
        >
          <li>
            <div className="dropdown-header">
              <div className="user-info">
                <span>{username}</span>
                <span style={{fontSize: '10px'}}>{email}</span>
              </div>
            </div>
          </li>
          {adminRights ?
            <button className={url === '/admin' ? "dropdown-btn active" : "dropdown-btn"} onClick={handleAdminClick}>
              Панель админа
            </button> :
            ''
          }
          <li>
            <button className="dropdown-btn" onClick={handleClickLogout}>
              Выйти
            </button>
          </li>
        </Dropdown>
      }
    </button>
  )
}