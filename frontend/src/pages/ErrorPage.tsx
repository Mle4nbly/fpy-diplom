import { useNavigate } from "react-router-dom"

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-header">
          <h1 className="error-title">404</h1>
          <h3 className="error-description">Page not found</h3>
        </div>
        <div className="error-footer">
          <button className="btn btn-text btn-light" onClick={() => navigate("/")}>Вернуться на домашнюю</button>
        </div>
      </div>
    </div>
  )
}