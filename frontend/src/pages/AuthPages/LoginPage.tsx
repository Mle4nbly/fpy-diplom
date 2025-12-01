import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate()

  const [validated, setValidated] = useState(false);

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const {login, token, username} = useContext(AuthContext)

  useEffect(() => {
    if (token && username) navigate('/home');
  }, [token, username])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form && !form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)

      return;
    }

    login(usernameValue, passwordValue);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "350px" }}>
        <h4 className="mb-4 text-center">Вход</h4>
        <form 
          onSubmit={handleSubmit} 
          className={`needs-validation ${validated ? 'was-validated' : ''}`}
          noValidate
        >
          <div className="mb-3">
            <input 
              type="text"
              name="username"
              value={usernameValue}
              className="form-control"
              placeholder="Введите логин"
              onChange={(e) => setUsernameValue(e.target.value)}
              required
            />
            <div className="invalid-feedback">Заполните поле логина</div>
          </div>
          <div className="mb-3">
            <input 
              type="password"
              name="password"
              value={passwordValue}
              className="form-control"
              placeholder="Введите пароль"
              onChange={(e) => setPasswordValue(e.target.value)}
              required
            />
            <div className="invalid-feedback">Заполните поле пароля</div>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Войти
            </button>
            <Link to="/auth/reg" className="btn btn-outline-primary">
              Создать аккаунт
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}