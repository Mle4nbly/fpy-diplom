import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { ApiError } from '../../utils/ApiError';

export type FormValuesType = {
  username: string;
  password: string;
  email?: string;
  name?: string;
};

export type FormErrorsType = Partial<Record<keyof FormValuesType, string>>;

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [values, setValues] = useState<FormValuesType>({
    username: '',
    password: '',
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

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldsErrors(validationErrors);
      return;
    }

    try {
      await login(values.username, values.password);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError('Неверный логин или пароль');
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
          <h3 className="title">Авторизация</h3>
        </div>
        <form autoComplete="off" className="auth-form" onSubmit={handleSubmit}>
          {formError && <span className="form-error-message">{formError}</span>}
          <div className="fields-container">
            <div className="form-group">
              <input
                className={`form-control ${fieldsErrors.username || formError ? 'form-error' : ''}`}
                type="text"
                name="username"
                placeholder="Логин"
                value={values.username}
                onChange={(e) => handleChange(e)}
              />
              {fieldsErrors.username && (
                <span className="form-error-message">{fieldsErrors.username}</span>
              )}
            </div>
            <div className="form-group">
              <input
                className={`form-control ${fieldsErrors.password || formError ? 'form-error' : ''}`}
                type="password"
                name="password"
                placeholder="Пароль"
                value={values.password}
                onChange={(e) => handleChange(e)}
              />
              {fieldsErrors.password && (
                <span className="form-error-message">{fieldsErrors.password}</span>
              )}
            </div>
          </div>
          <div className="auth-footer">
            <button type="submit" className="btn btn-text btn-light">
              Войти
            </button>
            <button
              type="button"
              onClick={() => navigate('/auth/reg')}
              className="btn btn-text btn-dark"
            >
              Нет аккаунта?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
