import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import type { FormErrorsType, FormValuesType } from './LoginPage';
import { ApiError } from '../../utils/ApiError';

export const RegPage = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<null | HTMLInputElement>(null);

  const { register } = useContext(AuthContext);

  const [values, setValues] = useState<FormValuesType>({
    username: '',
    password: '',
    email: '',
    name: '',
  });
  const [fieldsErrors, setFieldsErrors] = useState<FormErrorsType>({});
  const [formError, setFormError] = useState<null | string>(null);

  const validate = () => {
    const errors: FormErrorsType = {};

    if (!values.username.trim()) {
      errors.username = 'Логин обязателен';
    } else if (!/^[\w.@+-]+/.test(values.username)) {
      errors.username = 'Допустимы буквы, цифры и символы . @ + - _';
    }

    if (!values.password.trim()) {
      errors.password = 'Пароль обязателен';
    } else if (values.password.length < 6) {
      errors.password = 'Минимум 6 символов';
    }

    if (!values.name?.trim()) {
      errors.name = 'Имя обязательно';
    } else if (!/^[A-Za-zА-Яа-яЁё]+(?:\s+[A-Za-zА-Яа-яЁё]+)*$/.test(values.name)) {
      errors.name = 'Допустимы только буквы';
    }

    const emailInput = emailInputRef.current;

    if (!values.email?.trim()) {
      errors.email = 'Email обязателен';
    } else if (emailInput?.validity.typeMismatch) {
      errors.email = 'Введите корректный email';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0 || !values.email || !values.name) {
      setFieldsErrors(validationErrors);
      return;
    }

    try {
      await register(values.username, values.email, values.name, values.password);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError('Что-то пошло не так.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormError(null);

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldsErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h3 className="title">Регистрация</h3>
        </div>
        <form noValidate autoComplete="off" className="auth-form" onSubmit={handleSubmit}>
          {formError && <span className="form-error-message">{formError}</span>}
          <div className="fields-container">
            <div className="form-group">
              <input
                className={`form-control ${fieldsErrors.email || formError ? 'form-error' : ''}`}
                type="email"
                name="email"
                placeholder="Эл. почта"
                ref={emailInputRef}
                value={values.email}
                onChange={(e) => handleChange(e)}
                readOnly
                formNoValidate={false}
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
              {fieldsErrors.email && (
                <span className="form-error-message">{fieldsErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <input
                className={`form-control ${fieldsErrors.name || formError ? 'form-error' : ''}`}
                type="text"
                name="name"
                placeholder="Полное имя"
                value={values.name}
                onChange={(e) => handleChange(e)}
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
              {fieldsErrors.name && <span className="form-error-message">{fieldsErrors.name}</span>}
            </div>
            <div className="form-group">
              <input
                className={`form-control ${fieldsErrors.username || formError ? 'form-error' : ''}`}
                type="text"
                name="username"
                placeholder="Логин"
                value={values.username}
                onChange={(e) => handleChange(e)}
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
              {fieldsErrors.username &&
                <span className="form-error-message">{fieldsErrors.username}</span>
              }
            </div>
            <div className="form-group">
              <input
                className={`form-control ${fieldsErrors.password || formError ? 'form-error' : ''}`}
                type="password"
                name="password"
                placeholder="Пароль"
                value={values.password}
                onChange={(e) => handleChange(e)}
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
              {fieldsErrors.password && (
                <span className="form-error-message">{fieldsErrors.password}</span>
              )}
            </div>
          </div>
          <div className="auth-footer">
            <button type="submit" className="btn btn-text btn-light">
              Зарегистрироваться
            </button>
            <button
              type="button"
              onClick={() => navigate('/auth/login')}
              className="btn btn-text btn-dark"
            >
              Есть аккаунт?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
