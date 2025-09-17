export interface AuthButtonsProps {
  isAuth: boolean,
  onLogout: () => void,
  onLogin: () => void,
  onReg: () => void
}

export const AuthButtons = ({ isAuth, onLogout, onLogin, onReg }: AuthButtonsProps) => {

  return (
    <>
      {isAuth ? (
        <div>
          <span className="me-2">Привет, User</span>
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Выйти
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-outline-primary me-2" onClick={onLogin}>
            Войти
          </button>
          <button className="btn btn-primary" onClick={onReg}>Регистрация</button>
        </div>
      )}
    </>
  )
}