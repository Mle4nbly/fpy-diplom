import { UserButton } from "../components/UI/Buttons/UserButton";
import { UploadButton } from "../components/UI/Buttons/UploadButton";
import { useContext } from "react";
import { FilesContext } from "../contexts/FilesContext/FilesContext";
import { HomeButton } from "../components/UI/Buttons/HomeButton";

export const Header = () => {
  const {uploadFile} = useContext(FilesContext)

  return (
    <header className="container">
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="collapse navbar-collapse" id="navbarMain">
          <UploadButton onUpload={uploadFile}/>
          <HomeButton />
          <UserButton/>
        </div>
      </nav>
    </header>
  );
}