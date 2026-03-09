import { AuthControls } from "../features/auth/ui/AuthControls"

export const LandingPage = () => {

  return (
    <div className="home-page">
      <div className="landing-card">
        <div className="landing-title">
          <span>
            Облачное хранилище для ваших файлов
          </span>
        </div>
        <span>
          Простое облачное хранилище, позволяющее загружать, хранить и скачивать файлы при необходимости.
          Приложение поддерживает управление загруженными файлами через веб-интерфейс.
        </span>
        <div className="landing-footer">
          <AuthControls />
        </div>
      </div>
    </div>
  )
}