import { useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h4 className="mb-4 text-center">Вход</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text"
              name="username"
              value={username}
              className="form-control"
              placeholder="Введите логин"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input 
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
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