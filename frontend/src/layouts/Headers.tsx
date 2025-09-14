import { ToggleSortingPics } from "../components/ui/ToggleSortingPics";
import { SearchField } from "../components/ui/SearchField";
import { AuthButtons } from "../components/ui/AuthButtons";

export const Headers = () => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarMain">
              <SearchField />
              <ToggleSortingPics />
              <AuthButtons />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}