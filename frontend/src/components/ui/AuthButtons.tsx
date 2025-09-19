import { Link } from "react-router-dom"

export interface AuthButtonsProps {
  isAuth: boolean,
  onLogout: () => void,
  username: string | null,
}

export const AuthButtons = ({ isAuth, onLogout, username }: AuthButtonsProps) => {
  return (
    <div className="ms-auto">
      {isAuth ? (
        <div className="d-flex align-items-center">
          <h5 className="me-3 mb-0">{username}</h5>
          <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
            Выйти
          </button>
        </div>
      ) : (
        <Link to="/auth" className="btn btn-primary">
          Войти
        </Link>
      )}
    </div>
  )
}