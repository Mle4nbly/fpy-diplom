import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

export const RegPage = () => {
  const navigate = useNavigate()

  const [validated, setValidated] = useState(false)

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const {register, token, username} = useContext(AuthContext);

  useEffect(() => {
    if (token && username) navigate('/');
  }, [token, username])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)

      return;
    }

    register(usernameValue, emailValue, nameValue, passwordValue);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "350px" }}>
        <h4 className="mb-4 text-center">Регистрация</h4>
        <form 
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-3">
            <input 
              type="text"
              name="name"
              value={nameValue}
              className="form-control"
              placeholder="Введите полное имя"
              onChange={(e) => setNameValue(e.target.value)}
              required           
            />
            <div className="invalid-feedback">Заполните поле полного имени</div>
          </div>
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
              type="email"
              name="email"
              value={emailValue}
              className="form-control"
              placeholder="Введите email"
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            <div className="invalid-feedback">Заполните поле эл. почты</div>
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