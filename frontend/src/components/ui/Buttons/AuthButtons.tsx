import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"

export const AuthButtons = () => {
  const {token, username, logout} = useContext(AuthContext);

  return (
    <div className="ms-auto">
      {token || username ? (
        <div className="d-flex align-items-center">
          <h5 className="me-3 mb-0">{username}</h5>
          <button className="btn btn-quit btn-outline-danger btn-sm" onClick={logout}>
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