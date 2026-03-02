import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { ApiError } from '../utils/ApiError';
import { OverlayLoader } from '../shared/ui/loader/OverlayLoader';

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

  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      await login(values.username, values.password);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError('Неверный логин или пароль');
      }
    } finally {
      setLoading(false)
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
          {formError && 
            <div className='form-error-message'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
              <span>{formError}</span>
            </div>
          }
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
                <div className='form-error-message'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>{fieldsErrors.username}</span>
                </div>
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
                <div className='form-error-message'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>{fieldsErrors.password}</span>
                </div>
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
        {loading ? <OverlayLoader/> : ''}
      </div>
    </div>
  );
};
