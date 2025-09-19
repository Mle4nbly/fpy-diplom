import { ToggleSortingPics } from "../components/ui/ToggleSortingPics";
import { SearchForm } from "../components/ui/SearchForm";
import { AuthButtons } from "../components/ui/AuthButtons";
import { UploadButton } from "../components/ui/UploadButton";

export interface HeadersProps {
  isAuth: boolean,
  view: 'list' | 'grid',
  username: string | null,
  onLogout: () => void,
  onSearch: (newQuery: string) => void,
  onToggleView: (newView: 'list' | 'grid') => void,
  onFileSelect: (file: File) => void,
}

export const Headers = ({ isAuth, view, onLogout, onSearch, onToggleView, onFileSelect, username }: HeadersProps) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="collapse navbar-collapse" id="navbarMain">
        <UploadButton onFileSelect={onFileSelect}/>
        <SearchForm onSearch={onSearch}/>
        <ToggleSortingPics onToggle={onToggleView} view={view}/>
        <AuthButtons 
          username={username}
          isAuth={isAuth}
          onLogout={onLogout}
        />
      </div>
    </nav>
  );
}