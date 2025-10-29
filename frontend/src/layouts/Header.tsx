import { ToggleSortingButtons } from "../components/ui/Buttons/ToggleSortingButtons";
import { SearchForm } from "../components/ui/Forms/SearchForm";
import { AuthButtons } from "../components/ui/Buttons/AuthButtons";
import { UploadButton } from "../components/ui/Buttons/UploadButton";
import { useContext } from "react";
import { FileContext } from "../contexts/FileContext/FileContext";
import { ViewTypeContext } from "../contexts/ViewTypeContext/ViewTypeContext";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const {uploadFile} = useContext(FileContext)
  const {viewType, setViewType} = useContext(ViewTypeContext)

  return (
    <header className="container">
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="collapse navbar-collapse" id="navbarMain">
          <UploadButton onUpload={uploadFile}/>
          <NavLink to={'/'}>
            <button className="btn btn-outline-secondary ms-3">Главная</button>
          </NavLink>
          <NavLink to={'/admin'}>
            <button className="btn btn-outline-secondary ms-3">Панель админа</button>
          </NavLink>
          <SearchForm />
          <ToggleSortingButtons viewType={viewType} setViewType={setViewType}/>
          <AuthButtons />
        </div>
      </nav>
    </header>
  );
}