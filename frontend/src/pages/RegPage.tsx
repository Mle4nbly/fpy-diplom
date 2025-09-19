import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegPage = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const {register} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(username, password, email, name);
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h4 className="mb-4 text-center">Регистрация</h4>
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
              type="email"
              name="email"
              value={email}
              className="form-control"
              placeholder="Введите email"
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-primary w-100">
            Создать аккаунт
          </button>
          <button type="button" className="btn btn-outline-primary w-100 mt-3" onClick={() => navigate('/auth')}>
            Есть аккаунт?
          </button>
        </form>
      </div>
    </div>
  );
}