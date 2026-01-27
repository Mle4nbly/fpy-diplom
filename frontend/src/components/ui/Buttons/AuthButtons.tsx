import { useNavigate } from 'react-router-dom';

export const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn btn-text btn-dark"
        onClick={() => {
          navigate('/auth/login');
        }}
      >
        Вход
      </button>
      <button
        className="btn btn-text btn-light"
        onClick={() => {
          navigate('/auth/reg');
        }}
      >
        Регистрация
      </button>
    </>
  );
};
