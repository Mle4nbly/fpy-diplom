import { ToggleSortingPics } from "../components/ui/ToggleSortingPics";
import { SearchForm } from "../components/ui/SearchForm";
import { AuthButtons } from "../components/ui/AuthButtons";
import { UploadButton } from "../components/ui/UploadButton";

export interface HeadersProps {
  isAuth: boolean,
  view: 'list' | 'grid',
  onLogout: () => void,
  onLogin: () => void,
  onRegister: () => void,
  onSearch: (newQuery: string) => void,
  onToggleView: (newView: 'list' | 'grid') => void,
  onFileSelect: (file: File) => void
}

export const Headers = ({ isAuth, view, onLogin, onLogout, onRegister, onSearch, onToggleView, onFileSelect }: HeadersProps) => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarMain">
              <UploadButton onFileSelect={onFileSelect}/>
              <SearchForm onSearch={onSearch}/>
              <ToggleSortingPics onToggle={onToggleView} view={view}/>
              <AuthButtons 
                isAuth={isAuth}
                onLogin={onLogin}
                onLogout={onLogout}
                onReg={onRegister}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}